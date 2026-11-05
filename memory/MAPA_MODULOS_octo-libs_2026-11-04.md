# Mapa de módulos Bravas → paquetes `@octo/*`

**Autor:** bravas
**Fecha:** 2026-11-04
**Contexto:** Daniel aprobó Nivel 2 — Bravas arranca consumiendo paquetes `@octo/*` desde día 1. Arquitecto está montando la infra (registry privado + semver + pipeline publish). Este documento clasifica cada módulo de Bravas en 4 categorías para que arquitecto sepa qué libs crear nuevas, cuáles reusar, y cuáles son específicas del vertical hotelero.

**Base conceptual:** INFORME maestro del 3-nov identifica 16 módulos canónicos del software hotelero. De ahí, Bravas elige **10 construimos + 4 posteriores + 1 descartado**. Este mapa cubre esos 10 + los 4 posteriores (marcados como `fase:2.0`).

---

## Leyenda de categorías

| Tag | Qué significa |
|---|---|
| 🟢 **REUSED** | Paquete `@octo/*` **ya existe** (producción). Bravas lo instala tal cual. 4 libs de Tile ya graduadas. |
| 🔵 **NEW-FROM-DONOR** | `@octo/*` **nuevo** que arquitecto debe crear extrayendo de un proyecto Octo existente (MIBA, Soup, MiTutor, Tile v1.1 en curso). Bravas no es el primer consumidor del concepto, pero sí el primer consumidor del paquete. |
| 🟡 **NEW-BRAVAS-FIRST** | `@octo/*` **nuevo** que Bravas estrena como primer consumidor. Candidato a graduar cuando un segundo proyecto lo use (regla del segundo cliente). |
| 🔴 **BRAVAS-VERTICAL** | Código **específico del vertical hotelero** que vive dentro del repo Bravas, NO se publica como `@octo/*`. Excepción solo si otro vertical hotelero aparece. |

---

## Tabla síntesis — 16 módulos (10 core + 4 fase 2.0 + 2 descartados)

| # | Módulo Bravas | Categoría | Paquete propuesto | Donor / primer consumidor | Fase Bravas | Notas |
|---|---|---|---|---|---|---|
| 1 | Autenticación staff por PIN | 🟢 REUSED | `@octo/pin-auth` | Tile (ya graduado) | F3 | Login empleados: recepción, housekeeping, cocina, mantenimiento |
| 2 | Fichaje con QR dinámico + geofence | 🟢 REUSED | `@octo/qr-auth` | Tile (ya graduado) | F3 | Fichaje staff hotelero + posible llave digital huésped (nuevo caso de uso del mismo paquete) |
| 3 | Sincronización offline-first | 🟢 REUSED | `@octo/offline-sync` | Tile (ya graduado) | F3 | Housekeeping móvil (wifi flojo en pisos) + cocina en picos |
| 4 | Panel kiosco tablet | 🟢 REUSED | `@octo/kiosco-panels` | Tile (ya graduado) | F3 | Tablet housekeeping + KDS cocina + tablet recepción check-in |
| 5 | Multi-tenant org + RLS Supabase | 🔵 NEW-FROM-DONOR | `@octo/tenant-rls` | Soup (donor) | F3 | Base multi-hotel. Bravas podría no necesitar multi-tenant si va single-hotel, pero el paquete da margen de evolución |
| 6 | Reservas online (booking engine) | 🔵 NEW-FROM-DONOR | `@octo/booking-engine` | MIBA (donor — booking con disponibilidad por slot/profesional/servicio) | F3 | Adaptar unidad "terapeuta" → "habitación", "servicio" → "tipo de habitación", "slot horario" → "rango noches" |
| 7 | CRM huésped / historial | 🔵 NEW-FROM-DONOR | `@octo/crm-contacts` | MIBA (donor — perfil cliente + historial sesiones) | F3 | Adaptar "sesiones" → "estancias + consumos F&B". Bravas agrega campos ES (DNI/NIE, nacionalidad) |
| 8 | Intake / formulario pre-check-in | 🔵 NEW-FROM-DONOR | `@octo/intake-forms` | MIBA (donor — intake form estructurado con campos custom) | F3 | Bravas agrega templates hotel: hora llegada estimada, preferencias habitación, servicios extra |
| 9 | Asistente WhatsApp IA | 🔵 NEW-FROM-DONOR | `@octo/whatsapp-agent` | MIBA Emily (donor) | F3-F4 | Reentrenar con contexto hotelero (conserjería virtual, respuestas sobre habitación, pedidos F&B) |
| 10 | Chat IA conversacional contexto | 🔵 NEW-FROM-DONOR | `@octo/chat-ai` | MiTutor (donor — chat IA con contexto alumno) | F4 | Prompt engineering vertical hotel. Opcional F3 si se prioriza conserjería virtual embebida en app huésped |
| 11 | RRHH staff + gestión empleados | 🔵 NEW-FROM-DONOR | `@octo/hr-core` | Tile v1.1 (donor — sprint RRHH abierto inspirado Bizneo+Naaloo) | F3-F4 | **Dependencia temporal:** esperar que Tile v1.1 cierre (~2-3 semanas) antes de extraer. Diferencial fuerte sin paralelo en los 6 competidores hoteleros |
| 12 | Checklist tareas housekeeping | 🔵 NEW-FROM-DONOR | `@octo/checklist-tasks` | Tile (donor — checklist procesos + coordinación) | F3 | Adaptar a UI housekeeping-first: lista habitaciones + estados cromáticos + checklist por tipo de limpieza |
| 13 | Portal empleado web/móvil | 🔵 NEW-FROM-DONOR | `@octo/employee-portal` | Tile + Soup (donor) | F3 | **Decisión arquitectura:** resolver cuál de los dos (Tile vs Soup) es el canónico. Ambos tienen portal empleado |
| 14 | Billing / pago pasarela | 🔵 NEW-FROM-DONOR | `@octo/payments` | MiTutor + Soup (donor — MercadoPago) | F4 | Bravas necesita Redsys/Bizum (España) en vez de MercadoPago. El paquete debe abstraer proveedor |
| 15 | PMS core / rack chart / tape chart | 🟡 NEW-BRAVAS-FIRST | `@octo/pms-rack` | Bravas (primer consumidor) | F3 | Vista grilla reservas × fechas × habitaciones. Patrón reutilizable en otros verticales de scheduling (coworking, rent-a-car, cabañas). Candidato a graduar con segundo consumidor |
| 16 | Housekeeping + estados hoteleros | 🟡 NEW-BRAVAS-FIRST | `@octo/housekeeping-states` | Bravas (primer consumidor) | F3 | 4 estados cromáticos (mint/lightning/dusk/solar) + asignación mucamas. Reusable en cualquier vertical con limpieza programada (gimnasios, clínicas, coworking) |
| 17 | F&B / room service / POS integrado | 🟡 NEW-BRAVAS-FIRST | `@octo/f-and-b` | Bravas (primer consumidor) | F4 (fase 2.0) | Patrón "módulo POS integrado al cuarto/cuenta del huésped". Reusable en hoteles + cruceros + resorts. Se construye en fase 2.0 (no F3) |
| 18 | Rate management hotelero | 🔴 BRAVAS-VERTICAL | — | — | F4 | Pricing dinámico por temporada + ocupación + canal. Muy hotel-específico. Si aparece un segundo vertical con pricing dinámico (vuelos, cruceros), se eleva a `@octo/dynamic-pricing` |
| 19 | Channel manager / integración OTAs | 🔴 BRAVAS-VERTICAL | — (integra con SiteMinder externo) | — | F4 | Distribución a Booking/Expedia/Airbnb via SiteMinder. Estrictamente hotelero |
| 20 | Compliance España (SES.Hospedajes + Verifactu + INE) | 🔴 BRAVAS-VERTICAL | — | — | F3 | Regulatorio ES. Si aparece Bravas-UK o Bravas-IT se parametriza como `@octo/eu-hotel-compliance` con adaptadores por país. Por ahora no |
| 21 | Reportes / analytics operativos | 🟡 NEW-BRAVAS-FIRST | `@octo/ops-reports` | Bravas (primer consumidor) | F4 (fase 2.0) | KPIs: RevPAR, ADR, GOP, ocupación. Patrón "dashboard con métricas agregadas" reusable, pero las métricas son hotel-específicas. Separar lib de UI genérica de los KPIs específicos |

---

## Lectura rápida por categoría

### 🟢 REUSED — 4 libs (Tile ya graduadas, publicación como `@octo/*` en curso)
- `@octo/pin-auth`
- `@octo/qr-auth`
- `@octo/offline-sync`
- `@octo/kiosco-panels`

→ **Bravas las instala directas**. Es el camino crítico de día 1 que arquitecto está montando ahora.

### 🔵 NEW-FROM-DONOR — 10 libs nuevas a extraer de proyectos existentes
| Paquete | Donor | Prioridad |
|---|---|---|
| `@octo/booking-engine` | MIBA | 🔥 alta (reservas = corazón PMS) |
| `@octo/crm-contacts` | MIBA | 🔥 alta |
| `@octo/intake-forms` | MIBA | media |
| `@octo/whatsapp-agent` | MIBA Emily | media |
| `@octo/tenant-rls` | Soup | alta (base arquitectónica) |
| `@octo/hr-core` | Tile v1.1 | ⏸ espera cierre v1.1 Tile (2-3 semanas) |
| `@octo/checklist-tasks` | Tile | alta |
| `@octo/employee-portal` | Tile + Soup | 🟡 bloqueado — decidir canónico |
| `@octo/payments` | MiTutor + Soup | media (F4, no F3) |
| `@octo/chat-ai` | MiTutor | media |

**Nota crítica:** el orden de extracción lo decide arquitecto en coordinación con los roles donor (miba-app, tile, soup, mitutor). El inventario de donantes está en el documento maestro §5 de la bandeja supervisor.

### 🟡 NEW-BRAVAS-FIRST — 4 libs que Bravas estrena
- `@octo/pms-rack` — rack chart + tape chart
- `@octo/housekeeping-states` — 4 estados cromáticos + asignación
- `@octo/f-and-b` — módulo POS integrado al huésped (F4)
- `@octo/ops-reports` — dashboard KPIs (F4)

→ Bravas las construye con **disciplina de lib portable desde línea 1** (reglas §11 REGLAS.md). Graduación cuando aparezca segundo consumidor.

### 🔴 BRAVAS-VERTICAL — 3 módulos específicos
- Rate management hotelero
- Channel manager / integración SiteMinder
- Compliance España

→ Viven dentro del repo Bravas. Si en el futuro aparece un segundo vertical europeo hotelero, el módulo compliance se parametriza y sube a `@octo/eu-hotel-compliance`.

---

## Dependencias temporales y orden sugerido para F3

```
F3 inicio
├── @octo/pin-auth          ✅ ready
├── @octo/qr-auth           ✅ ready
├── @octo/offline-sync      ✅ ready
├── @octo/kiosco-panels     ✅ ready
├── @octo/tenant-rls        ← extraer de Soup (2-3 días)
├── @octo/booking-engine    ← extraer de MIBA (1-2 semanas)
├── @octo/crm-contacts      ← extraer de MIBA (1 semana)
├── @octo/checklist-tasks   ← extraer de Tile (3-5 días)
├── @octo/employee-portal   ⏸ bloqueado decisión canónico Tile vs Soup
├── @octo/hr-core           ⏸ bloqueado cierre Tile v1.1 (2-3 semanas)
├── @octo/intake-forms      ← extraer de MIBA (3-5 días)
├── @octo/pms-rack          ← Bravas construye nuevo
├── @octo/housekeeping-states ← Bravas construye nuevo
├── compliance ES (bravas-vertical) ← construcción Bravas
└── @octo/whatsapp-agent    ← extraer de MIBA Emily (1 semana)

F3 cierre
├── @octo/chat-ai           ← opcional si no entró F3
├── @octo/payments          ← Redsys/Bizum adapter

F4 (post-F3)
├── @octo/f-and-b
├── @octo/ops-reports
├── rate-management (bravas-vertical)
└── channel-manager via SiteMinder (bravas-vertical)
```

---

## Preguntas abiertas para arquitecto

1. **`@octo/employee-portal`** — ¿cuál es el canónico, Tile o Soup? Impacta el trabajo de Bravas (cambia el adapter que uso).
2. **`@octo/payments`** — ¿el abstract-provider pattern se cierra ahora o cada app usa su adapter directo (Bravas-Redsys, Soup-MercadoPago, MiTutor-MercadoPago)?
3. **`@octo/tenant-rls`** — ¿Bravas es multi-tenant desde día 1 (candidato SaaS vertical futuro) o single-tenant por simplicidad del cliente inicial?
4. **Orden de extracción:** ¿arquitecto prioriza extraer todas las libs de MIBA primero, o paraleliza por donor? Impacta cuándo Bravas puede arrancar F3 real.
5. **Namespacing SQL:** las 4 libs de Tile usan prefix `kiosco_`, `offline_`, `pin_auth_`. Las nuevas: `booking_`, `crm_`, `intake_`, `pms_`, `hk_`, `ops_`. Confirmar antes de que arranque la extracción.

---

## Siguiente paso de bravas tras aprobar este mapa

1. Dejar este mapa a disposición de arquitecto (bandeja arquitecto + referencia desde bandeja supervisor).
2. Retomar F2.5 visual con el **rework del dashboard admin alineado a este mapa** — hero-cards con 10 módulos F3 de Bravas marcados por categoría (icono color según `@octo/*` o vertical específico).
3. El sistema de color por módulo que ya está en `mockup/v2.5/css/tokens.css` se actualiza para reflejar estas 20 piezas (algunas se consolidan, otras se agregan).

---

**Firma:** bravas · 2026-11-04
