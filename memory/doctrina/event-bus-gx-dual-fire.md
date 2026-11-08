# Doctrina técnica — Event bus Guest Experience · Patrón dual-fire

> Decisión Daniel 2026-11-08: Guest Experience es sector propio con portal propio en el Core (tenga o no empleado dedicado el hotel). Palabras suyas: *"cuando dispara uno dispara los dos"*. Cada acción vinculada a la experiencia del cliente se dispara en el sector operativo responsable Y **también** entra al inbox/cola del portal de GX.
>
> Este documento define cómo se implementa técnicamente ese patrón.

---

## 1. Principio del patrón

En hostelería, la experiencia del huésped se construye en TODOS los sectores: recepción recibe, housekeeping limpia, F&B sirve, comercial vende, mantenimiento arregla. Cada acción que toca al huésped puede afectar su percepción.

**El patrón dual-fire resuelve:**

- Los sectores operativos actúan autónomos (Recepción toma una queja, HK responde a un pedido, F&B atiende un room service).
- El sector GX recibe copia de todo lo relevante, SIN bloquear ni mediar la acción operativa.
- GX puede: observar, agregar comentarios, escalar, generar reportes agregados, cerrar el loop (ej: llamar al huésped post-estadía si hubo queja).

**Lo que el patrón NO es:**

- NO es un sistema donde GX "aprueba" antes de que el sector operativo actúe (eso sería un bloqueo y lo rompe).
- NO es un sistema donde el sector operativo "le pide permiso" a GX.
- NO es un sistema donde todos los eventos se duplican en 2 bases de datos (es un bus con fan-out, no una replicación).

## 2. Modelo técnico

### 2.1 Tipos de eventos

Enum central de eventos `guest_experience_event_type`:

```
guest.checkin
guest.checkout
guest.complaint.filed
guest.complaint.resolved
guest.request.room_service
guest.request.housekeeping
guest.request.maintenance
guest.request.concierge
guest.review.received       (desde OTAs/web)
guest.survey.sent
guest.survey.answered
guest.compensation.granted  (upgrade, voucher, descuento)
guest.loyalty.enrolled
guest.loyalty.redeemed
guest.incident.room_change
guest.incident.overbooking
guest.vip.arrival
guest.special_request.received
```

Esta lista crece a medida que se definen los catálogos de cada sector. Cada sector del catálogo tiene su sección "dual-fire GX" que agrega eventos aquí.

### 2.2 Tabla central `gx_events`

```sql
CREATE TABLE gx_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,                    -- RLS multi-tenant
  event_type guest_experience_event_type NOT NULL,
  source_module TEXT NOT NULL,                -- ej: 'front-office', 'housekeeping'
  source_entity_type TEXT NOT NULL,           -- ej: 'reservation', 'complaint'
  source_entity_id UUID NOT NULL,             -- FK a la entidad que originó el evento
  guest_id UUID,                              -- FK huésped (nullable para eventos agregados)
  payload JSONB NOT NULL,                     -- datos del evento
  severity TEXT NOT NULL,                     -- 'info' | 'warning' | 'critical'
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  acknowledged_at TIMESTAMPTZ,                -- cuando GX lo marca como visto
  acknowledged_by UUID,                       -- quién lo marcó visto
  resolution_notes TEXT,                      -- qué hizo GX al respecto
  closed_at TIMESTAMPTZ                       -- cuando se cierra el loop
);

CREATE INDEX idx_gx_events_tenant_occurred ON gx_events (tenant_id, occurred_at DESC);
CREATE INDEX idx_gx_events_guest ON gx_events (tenant_id, guest_id);
CREATE INDEX idx_gx_events_open ON gx_events (tenant_id) WHERE acknowledged_at IS NULL;

-- RLS: el tenant solo ve sus propios eventos
ALTER TABLE gx_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON gx_events
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);
```

### 2.3 Patrón de emisión (fire)

Cada sector que ejecuta una acción con touchpoint con huésped **emite el evento** usando una función helper:

```typescript
// @octo/bravas-event-bus package
export async function fireGuestEvent(params: {
  tenantId: string;
  eventType: GuestExperienceEventType;
  sourceModule: string;
  sourceEntity: { type: string; id: string };
  guestId?: string;
  payload: Record<string, unknown>;
  severity?: 'info' | 'warning' | 'critical';
}): Promise<void> {
  await supabase.from('gx_events').insert({
    tenant_id: params.tenantId,
    event_type: params.eventType,
    source_module: params.sourceModule,
    source_entity_type: params.sourceEntity.type,
    source_entity_id: params.sourceEntity.id,
    guest_id: params.guestId,
    payload: params.payload,
    severity: params.severity ?? 'info',
  });
}
```

Ejemplo desde Housekeeping cuando atiende un pedido del huésped:

```typescript
// @octo/bravas-housekeeping
async function completeRoomServiceRequest(request: RoomRequest) {
  // acción operativa primaria
  await markRequestCompleted(request.id);
  await notifyGuest(request.guestId, 'completed');
  
  // dual-fire GX (no bloquea)
  await fireGuestEvent({
    tenantId: request.tenantId,
    eventType: 'guest.request.housekeeping',
    sourceModule: 'housekeeping',
    sourceEntity: { type: 'room_request', id: request.id },
    guestId: request.guestId,
    payload: {
      request_type: request.type,
      response_time_minutes: request.responseTime,
      room: request.roomNumber,
    },
    severity: request.responseTime > 30 ? 'warning' : 'info',
  });
}
```

### 2.4 Realtime push al portal GX

El portal de Guest Experience se suscribe a la tabla `gx_events` con Supabase Realtime:

```typescript
// @octo/bravas-guest-experience · portal frontend
useEffect(() => {
  const channel = supabase
    .channel(`gx-inbox-${tenantId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'gx_events',
      filter: `tenant_id=eq.${tenantId}`,
    }, (payload) => {
      addToInbox(payload.new);
      if (payload.new.severity === 'critical') playAlert();
    })
    .subscribe();

  return () => { channel.unsubscribe(); };
}, [tenantId]);
```

Resultado: cuando Housekeeping marca el pedido como completado, el portal de GX recibe la entrada en el inbox en tiempo real, sin que HK haga nada especial.

## 3. Qué eventos emite cada sector (base inicial a validar con catálogos)

Esta tabla se expande a medida que se escriben los catálogos exhaustivos. Es provisional.

| Sector emisor | Eventos dual-fire a GX |
|---|---|
| `front-office` | `guest.checkin`, `guest.checkout`, `guest.incident.overbooking`, `guest.incident.room_change`, `guest.complaint.filed`, `guest.vip.arrival`, `guest.compensation.granted`, `guest.special_request.received` |
| `housekeeping` | `guest.request.housekeeping`, `guest.request.room_change` (si HK bloquea habitación), `guest.incident.lost_found` |
| `kitchen` + `fb-service` | `guest.request.room_service`, `guest.complaint.filed` (si es sobre comida), `guest.special_request.received` (alergia, dieta) |
| `maintenance` | `guest.request.maintenance`, `guest.incident.room_change` (si mantto requiere mover al huésped) |
| `commercial` | `guest.review.received`, `guest.loyalty.enrolled`, `guest.loyalty.redeemed`, `guest.vip.arrival` |
| `admin-cfo` | `guest.survey.sent`, `guest.compensation.granted` (si es devolución monetaria) |
| `security` | `guest.incident.*` (temas de seguridad, SOP de emergencia, etc.) |
| `guest-experience` (sí mismo) | `guest.survey.answered`, `guest.complaint.resolved`, cierre de eventos abiertos |

## 4. Patrón de agregación (reportes de GX)

GX no solo lee eventos individuales — también agrega:

- **NPS del hotel** = promedio ponderado de surveys answered en últimos 30 días.
- **Response time housekeeping** = promedio de `response_time_minutes` de eventos `guest.request.housekeeping`.
- **Tasa de quejas por sector** = quejas filed / huéspedes atendidos, por sector operativo.
- **Compensaciones totales** = suma de `payload.amount` de eventos `guest.compensation.granted`.

Esto se calcula on-demand o en jobs programados y se muestra en el dashboard del portal GX.

## 5. Modo "Pack Experience Premium"

Para hoteles 5\* grandes con Director GX + equipo (Pack opcional):

- Se agrega el rol `gx_director` con permisos ampliados.
- Se activan analytics avanzadas (sentiment analysis sobre reviews, trending, prediction de churn).
- Se activan workflows automáticos (ej: cada queja `severity=critical` dispara una llamada automática al huésped).
- Se activan integraciones adicionales (TripAdvisor API, ReviewPro, Medallia).

El Core de GX ya tiene el inbox + dashboard básico. El Pack Premium suma la capa analítica + workflow engine.

## 6. Multi-tenant: aislamiento garantizado

- Tabla única `gx_events` con RLS `tenant_id`.
- Realtime channel por tenant: `gx-inbox-${tenantId}`.
- Eventos NUNCA cruzan tenants (ni siquiera en el modo custom con deploy dedicado, donde el tenant es único pero el aislamiento sigue aplicando).

## 7. Compliance

- Los eventos `gx_events` contienen datos personales del huésped (nombre, habitación, queja).
- Aplicación RGPD (ES) + Ley 25.326 (AR):
  - Retención: 2 años desde `occurred_at` (configurable por tenant según su política de retención).
  - Derecho al olvido: huésped puede solicitar eliminación de eventos relacionados a su `guest_id`.
  - Export de datos del huésped: endpoint `GET /guests/{id}/gx-events-export` con datos propios.

## 8. Preguntas abiertas que la reunión debe resolver

1. **¿GX puede responder al huésped directamente?** ¿O solo puede escalar/comentar/agregar al expediente? Si puede responder, hay que modelar canal de respuesta (email, SMS, in-app chat).
2. **¿Qué eventos requieren ACK explícito de GX vs cuáles se auto-cierran?** Ej: un `guest.checkin` es solo info — se puede auto-cerrar al checkout. Pero una `guest.complaint.filed` queda abierta hasta resolución.
3. **¿Hay eventos que GX puede SUPRIMIR (marcar como no relevante) vs eventos que son auditables siempre?**
4. **¿Qué pasa en hoteles que NO activan el módulo GX** (quizás la Fase 1 custom tiene algún boutique chico donde no hay GX)? Opción A: el módulo es siempre activo en Core, no hay opt-out. Opción B: si no está activo, los eventos no se emiten (ahorro de bloat de la tabla). Recomendación: A — GX siempre activo porque es parte del Core.

## 9. Changelog

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-08 | Creación inicial de la doctrina + schema + patrón de emisión + base de eventos por sector. | bravas |
