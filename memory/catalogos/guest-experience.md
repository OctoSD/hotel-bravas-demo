# Catálogo — Guest Experience (módulo transversal)
> **Nombre del producto:** BravasHotel (placeholder — pendiente nombre comercial definitivo)
> **Versión del catálogo:** v1.0 — 2026-11-10 · **Autor:** bravas

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Guest Experience |
| **Nombre (es-AR)** | Experiencia del Huésped / Guest Experience |
| **Nombre (en)** | Guest Experience |
| **Código técnico** | `@octo/bravashotel-guest-experience` |
| **Tipo** | Transversal — siempre activo, atraviesa todos los sectores |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | todos los sectores operativos (es consumer de todos); portal huésped (`@octo/bravashotel-guest-portal`) |
| **Módulos dependientes de éste** | ninguno — GX es observer + actor, no es requerimiento de nadie |
| **Activación default** | Siempre activo (el inbox básico está en Core). Pack Experience Premium es opt-in para 5* con Director GX. |

---

## 2. Propósito del módulo

**Qué resuelve:** centraliza la experiencia del huésped a lo largo de toda la estadía. Recibe copias (dual-fire) de todos los eventos operativos que afectan al huésped (check-in, solicitudes, incidentes, check-out, review), actúa como inbox de retroalimentación consolidada, y permite accionar de forma proactiva (sorpresa de bienvenida, upgrade, seguimiento de queja) sin que eso requiera que el Director GX esté al tanto de cada sector en tiempo real.

El patrón técnico es el **event bus con fan-out**: cada acción operativa que toca al huésped lanza un evento al bus; GX tiene una suscripción amplia y recibe copia. Los sectores operativos siguen su flujo normal; GX no los interrumpe.

**Qué NO resuelve:** GX no reemplaza a los sectores operativos (no gestiona habitaciones, ni nóminas, ni pedidos). Tampoco es el canal primario de comunicación con el huésped (eso es el Portal Huésped + notificaciones del módulo correspondiente). GX es el rol que hace que todo eso se sienta "personalizado".

**Métrica principal de éxito:** NPS (Net Promoter Score) post-estadía + tasa de resolución de quejas < 2h.

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Director GX | Director de Guest Experience | Director de Experiencia del Huésped | Director of Guest Experience | 2 | GM | Equipo GX | Solo en Pack Experience Premium (5*) |
| Agente GX | Agente de Guest Experience | Agente de Experiencia | Guest Experience Agent | 3 | Director GX | — | En hoteles sin Director GX, puede ser un recepcionista senior con rol GX habilitado |
| Concierge / Conserje | Conserje | Conserje | Concierge | 3 | Director GX / Jefe FO | — | En 5*: Chief Concierge Les Clefs d'Or |

**Variantes por tamaño de hotel:**
- **Boutique chico / 3*:** no hay rol GX formal. El jefe de recepción tiene el inbox GX habilitado en su portal.
- **4* mediano:** 1 agente GX, reporta a Comercial o directo al GM.
- **5* / Pack Experience Premium:** Director GX + equipo (2-5 agentes) + chief concierge.

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | sí | el huésped puede enviar solicitudes, calificar la estadía, reportar problemas; esas acciones llegan al inbox GX |
| Portal Operativo del sector | no directo — recibe eventos, no tiene portal propio por default | inbox GX vive dentro del Portal Dirección o como sub-panel en Portal Empleado si hay rol GX habilitado |
| Portal Supervisor/Jefe | sí (si Pack Experience Premium activo) | inbox completo del Director GX |
| Portal Dirección | sí | GM ve el inbox GX consolidado en su dashboard |
| **GX inbox (dual-fire)** | es el dueño de este patrón | recibe todos los eventos con dual-fire marcado en los catálogos de los otros sectores |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal | Trigger | Frecuencia | Criticidad | Dual-fire |
|---|---|---|---|---|---|---|---|---|
| 1 | Inbox unificado de eventos | Vista de todos los eventos con dual-fire: check-in, solicitudes, incidentes, reviews, check-out | Agente GX / GM | GX panel / Admin | automático (event bus) | continua | core | — |
| 2 | Perfil consolidado del huésped | Historial completo: estadías anteriores, preferencias, solicitudes pasadas, quejas, cumplidos, notas del staff | Agente GX | GX panel | acceso manual | eventual | core | — |
| 3 | Notas VIP del huésped | Staff puede agregar notas a un perfil de huésped (preferencia almohada, cumpleaños, motivo de viaje, intolerancia alimentaria) | cualquier rol | cualquier portal | manual | eventual | core | — |
| 4 | Alerta de VIP en check-in | Cuando llega un huésped marcado como VIP, el inbox GX recibe alerta inmediata con el perfil completo + notas del staff | automático | GX panel + Admin | evento (check-in) | eventual | core | sí |
| 5 | Gestión de solicitud del huésped | El huésped solicita algo desde su portal (almohada extra, despertador, taxi, reserva restaurante); GX la recibe, asigna al sector correcto, trackea resolución | Agente GX | GX panel | evento (solicitud huésped) | frecuente | core | — |
| 6 | Respuesta a queja | Queja del huésped (desde portal, en persona, o escalada desde otro sector). GX gestiona: contacta, ofrece solución, documenta. Cierre con firma del agente. | Agente GX / Director GX | GX panel | evento (queja) | eventual | core | — |
| 7 | Encuesta de satisfacción mid-stay | Encuesta rápida enviada al huésped a las 24h de check-in. Si responde negativamente, alerta inmediata a GX. | automático | Portal Huésped (encuesta) | automático (24h post check-in) | por estadía | core | — |
| 8 | Encuesta post-estadía | Email automático al huésped 2h post check-out. Recoge NPS + preguntas por sector. | automático | email (Resend) | automático (check-out) | por estadía | core | — |
| 9 | Seguimiento de encuesta negativa | Si NPS < 7 en la encuesta post-estadía, el agente GX recibe alerta + template de respuesta personalizada para contactar al huésped | Agente GX | GX panel | automático (NPS bajo) | eventual | core | — |
| 10 | Publicación de respuesta a review | Cuando llega un review negativo de TripAdvisor/Google/Booking, GX recibe alerta con borrador de respuesta. El agente edita y publica. | Agente GX / Director GX | GX panel | automático (nuevo review negativo) | eventual | importante | — |
| 11 | Sorpresa de bienvenida | GX puede configurar acciones automáticas para huéspedes especiales (cumpleaños: botella de vino; honeymoon: pétalos + chocolates; VIP: carta manuscrita) | Agente GX | GX panel | automático (flag en perfil + check-in) | eventual | importante | sí |
| 12 | Upgrade proactivo | Antes del check-in (24-48h), GX revisa disponibilidad de categorías superiores y ofrece upgrade pagado por email/whatsapp. | Agente GX / automático | GX panel + Portal Huésped | automático (pre-arrival) | por reserva | importante | — |
| 13 | Comunicación pre-arrival | Email de bienvenida 48h antes del check-in con: horarios, cómo llegar, servicios disponibles, pre-check-in online. | automático | email (Resend) | automático (48h pre check-in) | por reserva | importante | — |
| 14 | Pre-check-in online | El huésped puede hacer el check-in online (rellenar datos, firma digital, adjuntar documento) antes de llegar. Llega al sistema de Recepción. | automático | Portal Huésped | manual (huésped) | por reserva | importante | sí |
| 15 | Gestión de loyalty / huéspedes frecuentes | Tracking de estadías + puntos acumulados (si el hotel tiene programa de fidelización). Upgrade automático cuando llega a un tier. | Agente GX | GX panel | automático (check-in frecuente) | eventual | nice | sí |
| 16 | Blacklist de huéspedes conflictivos | Lista interna de huéspedes con historial de problemas graves (impagos, destrozos, comportamiento agresivo). Alerta a Recepción en reserva. | Director GX / GM | GX panel (restringido) | automático (reserva entrante) | eventual | importante | — |
| 17 | Tracking de resolución de incidentes | Seguimiento del tiempo de resolución de cada incidente con huésped. KPI: % resueltos < 2h. | Agente GX | GX panel | automático (incidente abierto) | continua | importante | — |
| 18 | Reporte semanal de GX | Resumen de NPS de la semana, top quejas por categoría, tiempo promedio de resolución, reviews recibidos, upgrades realizados. | automático | email a GM + Director GX | automático (lunes) | semanal | importante | — |
| 19 | Configuración de triggers de dual-fire | Qué eventos de qué sectores generan copia al inbox GX. Configurable por tenant. Por defecto: todos los marcados en cada catálogo. | GM / Admin | Dirección (settings) | manual | eventual | core | — |
| 20 | Histórico de estadías para análisis | Vista del perfil de huésped con todas sus estadías, notas, preferencias, NPS histórico, gasto acumulado | Director GX / Comercial | GX panel | acceso manual | eventual | importante | — |
| 21 | Integración con channel manager | Cuando llega una reserva de Booking/Expedia, GX recibe una "ficha de huésped pre-cargada" con datos del canal. | automático | GX panel (cola pre-arrival) | automático (nueva reserva) | por reserva | importante | — |
| 22 | Resumen de solicitudes por categoría | ¿Qué piden más los huéspedes? (almohada extra, early check-in, taxi, etc.). Ayuda a anticipar y mejorar servicios. | automático | GX panel (analytics) | automático (semanal) | semanal | nice | — |
| 23 | Gestión de checkout tardío (late check-out) | El huésped solicita late check-out desde su portal. GX valida disponibilidad de la habitación (coordinando con HK) y aprueba/rechaza. | Agente GX | GX panel + Portal Huésped | evento (solicitud) | eventual | importante | sí |
| 24 | Comunicación interna "nota a próxima estadía" | El agente GX puede dejar una nota para ser leída en la próxima estadía del huésped ("el señor García prefiere habitación alta, zona tranquila"). | Agente GX | GX panel | manual | eventual | importante | — |
| 25 | Alertas de huésped con intolerancia/alergia | Cuando check-in de huésped con alergia registrada, GX envía alerta automática a Cocina y F&B Servicio. | automático | Cocina + F&B portales | automático (check-in con flag) | eventual | core | sí |

### Sub-flujos clave

```
Flujo: queja de huésped mid-stay
1. Huésped reporta problema desde Portal Huésped (o en persona a empleado que lo ingresa)
2. Sistema crea `gx_complaint` y notifica al Agente GX en su inbox
3. Agente GX contacta al huésped (mensaje en portal / llamada / visita)
4. Si el problema es operativo (ej: aire acondicionado roto): Agente GX asigna tarea a Mantenimiento
5. Mantenimiento resuelve y cierra su OT
6. Sistema notifica automáticamente al Agente GX que el issue operativo está resuelto
7. Agente GX contacta al huésped para confirmar resolución
8. Agente GX cierra la queja con nota + calificación de resolución (1-5)
9. Si NPS final < 7 → alerta a Director GX / GM

Flujo: pre-arrival experience
1. Reserva confirmada entra al sistema (desde channel manager o reservas directas)
2. Sistema crea `guest_reservation` con estado CONFIRMED
3. 48h antes del check-in: automático envía email de bienvenida + link de pre-check-in
4. Huésped completa pre-check-in (opcional) → datos llegan a Recepción con flag "pre-checked-in"
5. 24h antes: GX revisa perfil + flags (VIP, cumpleaños, honeymoon, alergia)
6. Si hay flag especial: Agente GX activa protocolo correspondiente (sorpresa, nota a Cocina, upgrade)
7. En el check-in: Recepcionista ve el perfil con notas GX → check-in personalizado en segundos
8. Post check-in: GX inbox recibe evento check-in con resumen de habitación asignada + perfil huésped
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `guest_profile` | sí | — | id, organization_id, email, name, phone, country, vip_tier, allergens, notes, blacklist | preferences JSONB, loyalty JSONB | → `reservation`, `gx_complaint` |
| `gx_event` | sí | — | id, organization_id, type, sector_origin, guest_id, payload, resolved_at | — | → `guest_profile` |
| `gx_complaint` | sí | — | id, organization_id, guest_id, description, category, severity, status, assigned_to, resolution | — | → `guest_profile`, `hotel_user` |
| `nps_response` | sí | — | id, organization_id, guest_id, reservation_id, score, comment, channel, timestamp | — | → `guest_profile`, `reservation` |
| `guest_note` | sí | — | id, organization_id, guest_id, content, author_id, stays_valid | — | → `guest_profile` |
| `pre_arrival_task` | sí | — | id, organization_id, reservation_id, task_type, assigned_to, status | — | → `reservation` |

**Diagrama ER simplificado:**

```
guest_profile ──< gx_event
    │
    ├──< gx_complaint
    ├──< nps_response
    ├──< guest_note
    └──< reservation ──< pre_arrival_task
```

---

## 7. Máquinas de estado

```
gx_complaint:
  OPEN → ASSIGNED (agente GX toma la queja)
  ASSIGNED → IN_RESOLUTION (acción en curso, puede delegar a sector operativo)
  IN_RESOLUTION → PENDING_CONFIRMATION (solución aplicada, esperando validación del huésped)
  PENDING_CONFIRMATION → RESOLVED (huésped confirma OK)
  PENDING_CONFIRMATION → REOPENED (huésped no está conforme)
  RESOLVED → CLOSED (agente GX cierra formalmente)

guest_profile.vip_tier:
  STANDARD → SILVER (3+ estadías o gasto acumulado > umbral 1)
  SILVER → GOLD (10+ estadías o gasto > umbral 2)
  GOLD → PLATINUM (25+ estadías o gasto > umbral 3)
  cualquier tier → BLACKLIST (acción manual GM/Director GX, requiere confirmación)
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| TripAdvisor API | Reviews | inbound | opcional | Recibir reviews + publicar respuestas |
| Google Business API | Reviews | inbound | opcional | Recibir reviews + publicar respuestas |
| Booking.com Partner API | Reviews + datos reserva | inbound | opcional | Reviews + pre-carga perfil huésped |
| Resend | Email (encuestas, pre-arrival) | outbound | obligatorio | NPS post-estadía + pre-arrival email |
| WhatsApp Business API | Mensajería | outbound | opcional (futuro v2) | Canal adicional para comunicación con huésped |
| Channel Manager (SiteMinder) | Datos de reserva | inbound | ya decidido | Importa reservas → perfil huésped |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Inbox GX eventos | ✓ | | | | |
| Perfil del huésped | ✓ | | | | |
| Encuestas NPS | ✓ | | | | |
| Gestión datos personales (compliance) | | | | ✓ | AR: Ley 25.326 / ES: RGPD. Requiere consentimiento explícito, derecho de supresión, registro de actividades de tratamiento |
| Pre-check-in online con documento | | | | ✓ | ES: DNI/pasaporte obligatorio (planilla Ministerio Interior). AR: DNI/pasaporte planilla policial provincial |
| Programa de loyalty | ✓ | | | | |
| Respuesta a reviews en español | ✓ | | | | |
| Respuesta a reviews en inglés | ✓ | | | | (en disponible en el módulo de base) |

---

## 10. Slots de extensión

### 10.1 Campos custom por entidad

```
guest_profile.preferences: JSONB
  → preferencias específicas del tenant (almohada tipo, temperatura habitación, diario de bienvenida, etc.)
gx_complaint.custom_fields: JSONB
  → categorías de queja propias del hotel
```

### 10.2 Workflows custom

Hooks disponibles:
- `post_checkin_trigger` — tenant configura qué acciones disparar en check-in para diferentes perfiles (VIP, birthday, honeymoon)
- `pre_checkout_survey_config` — tenant customiza las preguntas de la encuesta NPS
- `post_complaint_resolved` — tenant puede conectar a su sistema de CRM externo

### 10.3 Integraciones per-tenant

- CRM externo (Salesforce, HubSpot, Clientify) — webhook outbound opcional
- Sistema de loyalty de cadena (si hotel pertenece a cadena con su propio programa)
- Encuestas externas (SurveyMonkey, Typeform) como alternativa a las nativas

### 10.4 Branding/UI per-tenant

- El email de pre-arrival y post-estadía se envía con el branding del hotel (logo, colores, nombre)
- El portal de pre-check-in muestra el nombre y logo del hotel

### 10.5 Idiomas

- Encuestas disponibles en es-ES, es-AR, en
- Emails de pre-arrival en el idioma del perfil del huésped (detectado por país de origen)
- Respuestas a reviews en es-ES, es-AR, en

---

## 11. Nomenclatura i18n

| Término técnico | es-ES default | es-AR default | en default | Customizable |
|---|---|---|---|---|
| guest_experience | "Guest Experience" | "Experiencia del Huésped" | "Guest Experience" | ✓ |
| vip_guest | "Huésped VIP" | "Huésped VIP" | "VIP Guest" | ✓ |
| complaint | "Reclamación" | "Queja / Reclamo" | "Complaint" | ✓ |
| nps | "NPS" | "NPS" | "NPS" | no |
| pre_check_in | "Pre check-in" | "Pre check-in" | "Pre Check-in" | no |
| gx_inbox | "Bandeja GX" | "Bandeja de Experiencia" | "GX Inbox" | ✓ |
| loyalty_tier_silver | "Plata" | "Plata" | "Silver" | ✓ |
| loyalty_tier_gold | "Oro" | "Oro" | "Gold" | ✓ |
| loyalty_tier_platinum | "Platino" | "Platino" | "Platinum" | ✓ |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| RGPD / Reglamento UE 2016/679 | UE/ES | datos personales del huésped: consentimiento explícito para encuestas y perfiles, derecho de supresión, registro de actividades de tratamiento, retención máxima de datos |
| Ley 25.326 AR | AR | datos personales: consentimiento, acceso, rectificación, supresión |
| ePrivacy Directive | UE/ES | cookies y comunicaciones electrónicas (encuestas por email requieren opt-in) |
| CAN-SPAM / normativas de email | Internacional | opt-out en cada email de encuesta |

---

## 13. Dependencias del lifecycle del módulo

**Si el módulo se ACTIVA** después del hotel ya corriendo:
- El inbox GX empieza a recibir eventos desde el momento de activación (no hay retroactividad).
- Los perfiles de huéspedes existentes en el PMS no tienen historial GX hasta que haya estadías nuevas.
- Seed inicial opcional: importar perfiles de huéspedes desde sistema anterior (CSV de historial de estadías).

**Si el módulo se DESACTIVA:**
- Los perfiles de huéspedes y el historial GX quedan archivados (no se borran) por 5 años (compliance RGPD/AR).
- Las encuestas en curso se cancelan.
- Los triggers de dual-fire se apagan (los sectores operativos siguen funcionando normalmente).

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| NPS (Net Promoter Score) | % promotores (9-10) − % detractores (0-6) | continua / por estadía | GX panel + Dashboard GM | >50 = bueno en hostelería; >70 = excelente |
| CSAT (Customer Satisfaction) | promedio puntuación encuesta | por estadía | GX panel | >4.2/5 |
| Tasa de resolución quejas < 2h | quejas resueltas < 2h / total quejas | mensual | GX panel | >80% |
| NPS Booking.com | rating promedio Booking.com | continua | GX panel | >8.5/10 |
| NPS TripAdvisor | rating promedio TA | continua | GX panel | >4.0/5 (o equivalente en puntos) |
| NPS Google | rating Google Maps | continua | GX panel | >4.3/5 |
| Tasa pre-check-in online | huéspedes que completaron pre-checkin / total llegadas | mensual | GX panel | — |
| Upgrades realizados / mes | count | mensual | GX panel | — |
| Lifetime value del huésped | suma total gasto × estadías | por perfil | GX panel | — |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol | Función principal | Mockup existente |
|---|---|---|---|---|
| `/gx/inbox` | GX (sub-panel en Admin o propio) | Agente GX / Director GX | Inbox de eventos + solicitudes + quejas | pendiente |
| `/gx/profiles` | GX | Agente GX | Búsqueda y listado de perfiles de huéspedes | pendiente |
| `/gx/profiles/:id` | GX | Agente GX | Perfil completo del huésped con historial | pendiente |
| `/gx/complaints` | GX | Agente GX | Gestión de quejas activas | pendiente |
| `/gx/analytics` | GX | Director GX / GM | NPS, CSAT, reviews, evolución mensual | pendiente |
| `/guest/pre-checkin` | Portal Huésped | Huésped | Formulario de pre-check-in online | pendiente |
| `/guest/survey` | Portal Huésped | Huésped | Encuesta mid-stay + post-estadía | pendiente |

---

## 16. Riesgos conocidos y preguntas abiertas

- **Riesgo 1:** sobrecarga de notificaciones en el inbox GX si hay muchos eventos de dual-fire. Mitigación: filtros configurables (severity, sector, tipo de evento) + resumen diario en vez de notificación individual para eventos de baja prioridad.
- **Riesgo 2:** datos de huéspedes antiguos de un PMS anterior no se migran automáticamente. Mitigación: tool de importación CSV de perfiles al hacer onboarding.
- **Riesgo 3:** integración con TripAdvisor API es restrictiva (requiere aprobación de TA y puede cambiar). Mitigación: diseñar como adapter, con fallback a "copy-paste manual" si la API no está disponible.
- **Pregunta abierta 1:** ¿el Pack Experience Premium activa un portal propio separado para el Director GX, o usa el mismo portal Admin con permisos expandidos? → arquitecto / Daniel.
- **Pregunta abierta 2:** ¿la blacklist es per-tenant o compartida entre todos los tenants de BravasHotel? (hay casos donde un huésped problemático afecta a más de un hotel de la misma cadena) → Daniel.

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación inicial del catálogo. Decisión Daniel 2026-11-08: GX es sector propio con portal propio + patrón dual-fire ("cuando dispara uno dispara los dos") + Pack Experience Premium para 5* | bravas |
