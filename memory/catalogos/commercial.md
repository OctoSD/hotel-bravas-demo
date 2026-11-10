# Catálogo exhaustivo — Comercial / Ventas / Revenue Management / Reservas

> Sector NUEVO — no estaba en la demo F2.5. Este módulo cubre todo el ciclo de generación de ingresos del hotel: ventas B2B, gestión de canales OTA, revenue management / yield dinámico, reservas entrantes, marketing digital y reputación online.

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Comercial / Ventas y Marketing |
| **Nombre (es-AR)** | Comercial / Ventas y Marketing |
| **Nombre (en)** | Sales, Marketing & Revenue Management |
| **Código técnico** | `@octo/bravashotel-commercial` |
| **Tipo** | Core |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | `@octo/bravashotel-front-office` (acceso a disponibilidad de habitaciones), `@octo/bravashotel-admin-cfo` (facturación grupal, contratos), `@octo/bravashotel-guest-experience` (reputación + encuestas post-estadía) |
| **Módulos dependientes de éste** | `@octo/bravashotel-front-office` (recibe reservas creadas aquí), `@octo/bravashotel-admin-cfo` (ingresos por canal, comisiones OTA), `@octo/bravashotel-guest-experience` (encuestas y reputación alimentan la estrategia comercial) |
| **Activación default** | Siempre activo (Core) |

---

## 2. Propósito del módulo

- **Qué resuelve:** gestiona todo el ciclo de generación de ingresos del hotel. Cubre la captación de demanda (marketing digital, reputación online, ventas B2B, agencias, grupos), la distribución multicanal vía channel manager (SiteMinder, ya decidido), el yield dinámico de precios y revenue management (RevPAR, ADR, occupancy), y la gestión operativa de reservas entrantes (confirmación, modificación, cancelación, overbooking). Es el cerebro comercial del hotel: sin él, el PMS no conecta con OTAs ni tiene motor de precios.

- **Qué NO resuelve:** la contabilidad de los ingresos (eso es `admin-cfo`), el check-in físico y la asignación de habitación (eso es `front-office`), la gestión de comentarios individuales de huéspedes post-estadía a nivel operativo (eso es `guest-experience`). Tampoco gestiona banquetes/eventos corporativos complejos (eso es el Pack Eventos, cuando se active). No incluye contratos de tarifa negociada con empresas en su versión core (eso es `corporate-sales` Pack Corporativo).

- **Métrica principal de éxito del sector:** RevPAR (Revenue per Available Room) — combina occupancy y ADR en una sola cifra. Si el RevPAR sube, el módulo cumple su función.

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Jefe del sector | Director Comercial | Gerente Comercial / Jefe de Ventas | Director of Sales & Marketing | 2 | Director General | Revenue Manager, Sales Manager, Marketing Manager, Agente de Reservas | en hotel chico: 1 persona cubre todos los sub-roles |
| Revenue Manager | Revenue Manager | Revenue Manager | Revenue Manager | 3 | Director Comercial | — | en hotel chico: lo hace el Director Comercial o el Director General |
| Jefe de Ventas B2B | Director/Jefe de Ventas | Gerente de Ventas | Sales Manager | 3 | Director Comercial | Ejecutivo de Ventas | puede fusionarse con Director Comercial en hotel mediano |
| Ejecutivo de Ventas | Ejecutivo/Agente de Ventas | Ejecutivo de Ventas | Sales Executive / Account Manager | 4 | Jefe de Ventas | — | — |
| Marketing Manager | Responsable de Marketing | Responsable de Marketing | Marketing Manager | 3 | Director Comercial | Community Manager | puede ser externo en hotel chico |
| Community Manager | Community Manager | Community Manager | Social Media Manager | 4 | Marketing Manager | — | puede ser externo o freelance |
| Jefe de Reservas | Jefe de Reservas | Jefe de Reservas | Reservations Manager | 3 | Director Comercial | Agentes de Reservas | en hotel chico: lo hace el Jefe de Recepción |
| Agente de Reservas | Agente de Reservas | Agente de Reservas | Reservations Agent | 4 | Jefe de Reservas | — | puede ser recepcionista con doble función |

**Variantes por tamaño de hotel:**
- **Boutique chico (20-40 habs):** el Director General o el propietario cubre todo Comercial. Puede haber una agencia externa para OTAs. No hay Revenue Manager ni Marketing Manager internos. Reservas las gestiona Recepción.
- **Boutique urbano medio (40-100 habs):** 1-2 personas. Director Comercial cubre ventas + revenue. Marketing puede ser parcialmente externo. Agente de Reservas puede ser Recepcionista con doble función.
- **Urbano 4* mediano (80-150 habs) — TARGET PRIMARIO:** 2-4 personas. Director Comercial + Revenue Manager (puede compartirse con GM). Agente de Reservas dedicado. Marketing con apoyo externo.
- **5* / cadena / resort grande:** Revenue Management como sub-dept propio (a veces multi-property, rol compartido entre varias propiedades de la cadena, como en Sheraton BA y Santiago Marriott). Marketing con equipo completo.

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | sí | motor de reservas direct booking (web + app), confirmaciones por email/SMS, gestión de reserva del huésped (modificar, cancelar) |
| Portal Operativo del sector | sí | dashboard de reservas entrantes, gestión de canales OTA, carga de tarifas y restricciones al channel manager, creación manual de reservas para grupos/empresas, seguimiento de cotizaciones B2B |
| Portal Supervisor/Jefe | sí | análisis de producción por canal, ocupación vs forecast, pipeline de ventas B2B, tracking de reputación online |
| Portal Dirección | sí | KPIs core: RevPAR, ADR, Occupancy%, GOPPAR, TRevPAR; comparativo pick-up vs año anterior; desglose por canal de distribución; ranking de OTAs por comisión |
| **GX inbox (dual-fire)** | sí | eventos enviados: nueva_reserva_confirmada (copia al GX para preparar pre-arrival), cancelacion_reserva (alerta GX), primera_reserva_cliente (trigger para personalización VIP si aplica) |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Configurar tarifas y planes | Crear/editar planes tarifarios (BAR, No reembolsable, B&B, paquetes) con reglas de precios, restricciones (min stay, CTA, CTD) y condiciones de cancelación | Director Comercial / Revenue Manager | Operativo | manual | semanal/según temporada | core | no |
| 2 | Gestionar temporadas y calendarios de precios | Definir temporadas (alta, media, baja, festivos), con rangos de fecha y tarifas diferenciadas por tipo de habitación | Revenue Manager | Operativo | manual | mensual/según estrategia | core | no |
| 3 | Publicar tarifas al channel manager (SiteMinder) | Push automático de disponibilidad, tarifas y restricciones hacia todos los canales OTA conectados vía SiteMinder (ARI: Availability / Rates / Inventory) | Sistema (automático) | — | automático post-cambio de tarifa | continua (push en tiempo real) | core | no |
| 4 | Recibir reservas desde OTAs (Booking.com, Expedia, Hotelbeds) | Ingesta automática vía SiteMinder de reservas confirmadas en OTAs → creación de reserva en el sistema | Sistema (automático) | — | evento OTA | continua | core | sí |
| 5 | Recibir reservas vía motor web (direct booking) | El motor de reservas embebido en la web del hotel envía la reserva al sistema directamente, sin comisión OTA | Sistema (automático) | Portal Huésped | evento web | continua | core | sí |
| 6 | Crear reserva individual manual | Creación manual de una reserva por teléfono, email o visita directa, con asignación de tarifa, habitación, extras y datos del huésped | Agente de Reservas / Recepcionista | Operativo | manual | diaria | core | sí |
| 7 | Confirmar reserva y enviar voucher | Envío automático de email de confirmación con resumen de reserva, condiciones, política de cancelación y link de gestión al huésped | Sistema (automático) | — | automático post-creación | por reserva | core | no |
| 8 | Modificar reserva existente | Cambio de fechas, tipo de habitación, número de pax, extras u otros parámetros de una reserva activa. Incluye sincronización hacia canal original | Agente de Reservas | Operativo | manual | diaria | core | sí si implica cambio de habitación o fecha |
| 9 | Cancelar reserva (manual o desde canal) | Cancelación de reserva con cálculo automático de penalización según política, generación de crédito si aplica y sincronización al canal | Agente de Reservas / Sistema | Operativo | manual o evento canal | diaria | core | sí |
| 10 | Gestionar lista de espera (waitlist) | Cuando no hay disponibilidad en las fechas solicitadas, crear entrada en waitlist y notificar automáticamente al cliente si se libera habitación | Agente de Reservas | Operativo | manual | eventual | importante | sí |
| 11 | Gestionar overbooking | Configurar límite de overbooking por tipo de habitación y fecha, alertar al agente cuando se supera, registrar huéspedes reubicados en hotel alternativo y gastos asociados | Revenue Manager / Agente de Reservas | Operativo | manual / regla automática | eventual | core | sí |
| 12 | Crear cotización grupal | Generación de propuesta formal para grupos (empresas, agencias, eventos) con bloqueo provisional de habitaciones, tarifa grupal, condiciones de pago y vencimiento de la opción | Ejecutivo de Ventas / Jefe de Ventas | Operativo | manual | semanal | core | no |
| 13 | Convertir cotización grupal en reserva bloqueada | Una vez aceptada la cotización, conversión a reserva firme con asignación de bloque de habitaciones y contrato | Ejecutivo de Ventas | Operativo | manual | eventual | core | sí |
| 14 | Gestionar bloque de habitaciones (allotment) | Administrar bloques de habitaciones comprometidos con OTAs, agencias o corporates: ajustar cupo disponible, fecha de release (fecha límite de devolución al general inventory) | Revenue Manager | Operativo | manual | semanal | core | no |
| 15 | Configurar canales de distribución en SiteMinder | Alta/baja de canales OTA conectados, configuración de mapeo de tipos de habitación por canal, tasas de comisión, paridad de precios | Director Comercial / Revenue Manager | Operativo | manual | eventual (onboarding + cambio de canal) | core | no |
| 16 | Monitorear paridad de precios entre canales | Alerta cuando el precio publicado en una OTA difiere del precio publicado en web del hotel (parity violation), con vista comparativa por canal | Revenue Manager | Operativo / Supervisión | automático | continua | importante | no |
| 17 | Ajuste dinámico de precios (yield automático) | Motor de reglas que ajusta automáticamente las tarifas según ocupación actual, pick-up vs forecast y eventos externos configurados. Puede ser manual override en cualquier momento | Revenue Manager / Sistema | Operativo | automático (reglas) + manual override | diaria | core | no |
| 18 | Forecast de ocupación | Proyección de ocupación a 7, 30, 60 y 90 días, basada en reservas on-the-books (OTB), históricos y patrones estacionales | Revenue Manager | Supervisión / Dirección | automático | diaria | core | no |
| 19 | Pick-up report | Reporte diario de nuevas reservas ingresadas en las últimas 24h, 7 días y 30 días, comparado con mismo período año anterior (pace comparison) | Revenue Manager / Director Comercial | Supervisión | automático | diaria | importante | no |
| 20 | Dashboard RevPAR / ADR / Occupancy | Panel de KPIs en tiempo real con RevPAR, ADR, Occupancy rate, TRevPAR y GOPPAR. Desglose por día/semana/mes/año. Comparativa vs budget y vs año anterior | Director Comercial / Dirección | Supervisión / Dirección | automático | continua | core | no |
| 21 | Informe de producción por canal | Análisis mensual de reservas, ingresos, cancelaciones y ADR por canal (Booking, Expedia, Hotelbeds, Web Propia, Teléfono, Grupos, etc.) para evaluar mix de distribución | Director Comercial | Supervisión / Dirección | automático | mensual | importante | no |
| 22 | Gestión de cuentas de empresa / corporate | Alta de empresas con tarifa negociada, condiciones de pago (factura unificada mensual), cupo de habitaciones y procedimiento de reserva (HBT — Hotel Booking Tool o email directo) | Ejecutivo de Ventas / Director Comercial | Operativo | manual | eventual | importante | no |
| 23 | Gestión de agencias de viajes (IATA/IATAN) | Alta de agencias, configuración de comisión (% o neto), tracking de producción por agencia, pago de comisiones (integrado con Admin-CFO) | Ejecutivo de Ventas | Operativo | manual | eventual | importante | no |
| 24 | Creación de paquetes y ofertas especiales | Diseño de paquetes (ej: "Escapada romántica" = habitación + cena + spa) con precio especial, fechas de validez, restricciones y publicación en canales seleccionados | Director Comercial / Revenue Manager | Operativo | manual | mensual/según temporada | importante | no |
| 25 | Gestión de promociones y códigos de descuento | Crear códigos promocionales (promo codes) para campañas de email, redes sociales o partners, con descuento fijo o porcentual, fecha de validez y cupo máximo de usos | Marketing Manager | Operativo | manual | mensual | importante | no |
| 26 | Gestión de precios de bodas y grupos sociales | Proceso específico para grupos sociales (bodas, cumpleaños, bautizos): bloqueo de habitaciones, sala de eventos, menús, coordinación con F&B y Economato. Presupuesto integrado | Ejecutivo de Ventas | Operativo | manual | eventual | importante | sí |
| 27 | Plan de marketing digital | Planificación y seguimiento de acciones de marketing online: campañas SEM (Google Ads), SEO web del hotel, email marketing (newsletters, pre-arrival), redes sociales | Marketing Manager | Operativo | manual | mensual | importante | no |
| 28 | Publicación en redes sociales | Programación y seguimiento de publicaciones en Instagram, Facebook, TikTok, LinkedIn con tracking básico de alcance y engagement | Community Manager / Marketing Manager | Operativo | manual | semanal | importante | no |
| 29 | Monitoreo de reputación online | Seguimiento centralizado de comentarios y puntuaciones en Booking.com, TripAdvisor, Google, Expedia y otras plataformas. Vista consolidada de score promedio y comentarios recientes | Marketing Manager / Director Comercial | Supervisión | automático (ingesta periódica) + manual | diaria | importante | sí |
| 30 | Respuesta a comentarios online | Redacción y publicación de respuestas del hotel a comentarios en OTAs y plataformas de reputación (Booking, TripAdvisor, Google) | Director Comercial / Marketing Manager | Operativo | manual | diaria | importante | no |
| 31 | Encuesta de satisfacción post-estadía | Envío automático de encuesta al huésped 24h después del checkout. Resultados alimentan el módulo Guest Experience y el monitoreo de reputación | Sistema (automático) | — | evento checkout (recibido desde Front Office) | por estadía | importante | sí |
| 32 | NPS / CSAT reporting | Reporte periódico de Net Promoter Score (NPS) y Customer Satisfaction Score (CSAT) por segmento, período y tipo de habitación. Alertas cuando el score cae bajo umbral | Director Comercial | Supervisión / Dirección | automático | semanal/mensual | importante | no |
| 33 | Gestión del motor de reservas web (booking engine) | Configuración del motor de reservas embebido en la web del hotel: tipos de habitación publicados, fotos, descripciones, disponibilidad, precios, upsells y métodos de pago | Director Comercial / Marketing Manager | Operativo | manual | eventual (cambio de producto) | core | no |
| 34 | Upsell automático en reserva web | El motor de reservas propone upgrades de habitación o extras (desayuno, aparcamiento, early check-in) durante el flujo de booking online. Reglas configurables por tipo de tarifa y temporada | Sistema (automático) | Portal Huésped | evento reserva web | por reserva | importante | no |
| 35 | Gestión de no-shows | Registro de huéspedes que no se presentaron, aplicación de cargo de no-show según política de la tarifa, sincronización al canal OTA si aplica | Agente de Reservas / Sistema | Operativo | automático post-fecha de arrival si no hay check-in | diaria | core | sí |
| 36 | Informe de ventas mensual (revenue report) | Cierre mensual de ingresos por habitación, RevPAR, ADR, occupancy, comparativa presupuesto vs real. Exportable para Admin-CFO | Director Comercial | Supervisión / Dirección | automático | mensual | core | no |
| 37 | Gestión de contratos con OTAs (comisiones) | Registro y control de condiciones contractuales con cada OTA: comisión pactada, modelo de pago (OTA collect / hotel collect), condiciones de paridad, fechas de renovación | Director Comercial | Operativo | manual | eventual | importante | no |
| 38 | Alerta de caída de ranking en OTA | Notificación automática cuando el posicionamiento del hotel baja de un umbral definido en Booking.com o Expedia (basado en score de satisfacción + tiempo de respuesta + política de cancelación) | Sistema (automático) / Director Comercial | Supervisión | automático | diaria | importante | no |
| 39 | Integración SiteMinder — diagnóstico y logs | Vista de errores de sincronización con SiteMinder (ARI push fallido, reserva no recibida, mapeo de habitación incorrecto), con historial de eventos para debugging | Director Comercial / IT | Operativo | manual / automático | eventual | core | no |
| 40 | Informe de MICE y eventos (si pack activo) | Si el Pack Eventos está activo, reporte de producción de salones, catering y eventos vinculados a reservas de grupo. Se genera aquí pero la operativa es del pack correspondiente | Director Comercial | Supervisión | automático | mensual | nice | no |

### Sub-flujos clave (pseudocódigo simple)

```
Función: "Recepción y confirmación de reserva desde OTA"
1. Huésped hace reserva en Booking.com / Expedia / Hotelbeds
2. OTA envía notificación a SiteMinder (XML/JSON ARI)
3. SiteMinder traduce formato y hace push al sistema Bravas
4. Sistema crea objeto Reservation con canal="Booking.com", estado="CONFIRMADA"
5. Sistema descuenta disponibilidad del inventario en tiempo real
6. Sistema envía ARI actualizado a todos los canales (para evitar overbooking)
7. Sistema envía email de confirmación al huésped (si la OTA lo permite)
8. Event bus emite evento "nueva_reserva_confirmada" → GX inbox recibe copia (dual-fire)
9. Front Office ve la reserva en su panel de llegadas del día correspondiente
```

```
Función: "Ajuste dinámico de precios (yield automático)"
1. Sistema evalúa diariamente: occupancy actual vs forecast para próximos 7/30/60 días
2. Si occupancy > umbral alto configurado (ej: 80%) → aplica rule "precio +X%"
3. Si occupancy < umbral bajo (ej: 40%) → aplica rule "precio -X% o restricciones más flexibles"
4. Si hay evento externo registrado (congreso, festivo, temporada alta) → aplica pricing rule de evento
5. Revenue Manager recibe alerta diaria con cambios propuestos (modo "sugerencia") o aplicados (modo "automático", configurable por tenant)
6. Revenue Manager puede hacer override manual en cualquier tarifa/fecha
7. Sistema pushea la tarifa actualizada a SiteMinder → propaga a todos los canales
8. Log de cambios de precio queda registrado para auditoría
```

```
Función: "Creación de cotización grupal y conversión a reserva"
1. Ejecutivo de Ventas recibe solicitud (email / teléfono / formulario web)
2. Ejecutivo crea "Solicitud de grupo" en el sistema: fechas, número de habitaciones, tipo, servicios adicionales (sala, cenas, traslados)
3. Sistema consulta disponibilidad en tiempo real y bloqueo provisional de habitaciones (opción)
4. Sistema genera PDF de cotización con layout del hotel + condiciones + fecha de vencimiento de opción
5. Ejecutivo envía cotización al cliente
6. Si cliente acepta: Ejecutivo confirma en sistema → cotización pasa a estado "ACEPTADA"
7. Sistema crea Reservas individuales vinculadas al grupo o reserva bloqueada (block reservation)
8. Sistema notifica a Front Office (grupo llega en fecha X) y a Admin-CFO (factura grupal pendiente)
9. Event bus emite evento "grupo_confirmado" → GX inbox recibe copia para preparar bienvenida grupal
```

```
Función: "Monitoreo de reputación online y respuesta"
1. Sistema consulta periódicamente (cada 4h) APIs de Booking.com, TripAdvisor, Google Business
2. Nuevos comentarios aparecen en vista unificada de reputación, ordenados por plataforma y puntuación
3. Sistema alerta al Director Comercial / Marketing Manager si aparece comentario con puntuación < umbral (ej: < 7/10 en Booking, < 3 estrellas en Google)
4. Marketing Manager / Director redacta respuesta desde la misma vista del sistema
5. Sistema publica respuesta vía API (donde la plataforma lo permite)
6. Sistema calcula score de reputación promedio consolidado (todas las plataformas pesadas)
7. KPI de reputación aparece en Dashboard de Dirección
8. Event bus emite evento "comentario_negativo" si score < umbral → GX inbox alerta
```

```
Función: "Cierre mensual de Revenue Report"
1. El día 1 de cada mes, sistema genera automáticamente el Revenue Report del mes anterior
2. Métricas calculadas: RevPAR, ADR, Occupancy%, TRevPAR, GOPPAR (si datos F&B disponibles)
3. Comparativa vs budget del mes (si budget cargado) y vs mismo mes año anterior
4. Desglose por canal de distribución (Booking.com, Expedia, Hotelbeds, Web, Teléfono, Grupos, Empresas)
5. Desglose por tipo de habitación
6. Informe de comisiones pagadas a OTAs (integra con Admin-CFO para validación)
7. Director Comercial recibe email con informe + link al portal
8. Director Comercial puede exportar a Excel / PDF para presentar en reunión semanal con GM
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `reservation` | sí (crea) | sí (lee) | id, guest_id, room_type_id, room_id, check_in, check_out, adults, children, channel, channel_reservation_id, rate_plan_id, status, total_amount, currency, created_at, modified_at, notes | `custom_fields JSONB`, `extra_services JSONB` | → `guest`, `room_type`, `room`, `rate_plan`, `channel`, `payment`, `invoice` |
| `rate_plan` | sí | no | id, organization_id, name, code, board_type (RO/BB/HB/FB/AI), cancellation_policy_id, min_stay, max_stay, cta_days, ctd_days, base_price_rules JSONB, active, valid_from, valid_to | `custom_fields JSONB` | → `channel_mapping`, `promotion` |
| `channel` | sí | no | id, organization_id, name, type (OTA/direct/GDS/groups), commission_pct, payment_model (hotel_collect/ota_collect), siteminder_channel_code, active, contract_notes | — | → `reservation`, `rate_plan`, `channel_mapping` |
| `channel_mapping` | sí | no | id, channel_id, our_room_type_id, channel_room_type_code, our_rate_plan_id, channel_rate_plan_code | — | → `channel`, `room_type`, `rate_plan` |
| `ari_log` | sí | no | id, organization_id, channel_id, action (push/pull), payload_type (availability/rate/restriction), status (success/error), error_message, created_at | — | → `channel` |
| `group_quote` | sí | no | id, organization_id, company_name, contact_name, contact_email, event_dates, rooms_requested, services JSONB, status (draft/sent/accepted/rejected/expired), expiry_date, total_amount, notes | `custom_fields JSONB` | → `reservation` (cuando se convierte), `company` |
| `company` | sí | sí (compartida con admin-cfo) | id, organization_id, name, tax_id, address, billing_contact, rate_type (corporate/rack), commission_type, payment_terms, notes | `custom_fields JSONB` | → `reservation`, `group_quote`, `invoice` |
| `promotion` | sí | no | id, organization_id, promo_code, discount_type (pct/fixed), discount_value, valid_from, valid_to, max_uses, used_count, applicable_channels, applicable_rate_plans | — | → `rate_plan` |
| `reputation_review` | sí | no | id, organization_id, platform (booking/tripadvisor/google/expedia), review_id_external, guest_name, score, text, review_date, response_text, response_date, responded_by | — | → `reservation` (si se puede linkear) |
| `marketing_campaign` | sí | no | id, organization_id, name, channel_type (email/sem/social/partner), start_date, end_date, budget, actual_spend, clicks, bookings_attributed, revenue_attributed | — | → `promotion` |
| `revenue_forecast` | sí | no | id, organization_id, date, room_type_id, forecast_occupancy_pct, forecast_adr, forecast_revpar, otb_rooms, otb_revenue | — | → `room_type` |

**Diagrama ER simplificado:**

```
rate_plan ──────────────< channel_mapping >──────────── channel
    │                                                       │
    ▼                                                       ▼
reservation ──────────────────────────────────────> ari_log
    │
    ├──> guest (owner: front-office)
    ├──> room_type / room (owner: front-office)
    ├──> payment / invoice (owner: admin-cfo)
    └──> group_quote (pre-conversión)

company ────────────────< group_quote
   │
   └──────────────────> reservation

reputation_review ←── (ingesta desde OTAs)
promotion ──────────> rate_plan
revenue_forecast ──────────> room_type
```

---

## 7. Máquinas de estado

```
reservation.status:
  TENTATIVA ──confirmación_manual──> CONFIRMADA
  TENTATIVA ──vencimiento_opción──> CANCELADA
  CONFIRMADA ──modificación──> CONFIRMADA (re-confirmada)
  CONFIRMADA ──cancelación_antes_policy──> CANCELADA_SIN_CARGO
  CONFIRMADA ──cancelación_dentro_policy──> CANCELADA_CON_CARGO
  CONFIRMADA ──día_de_llegada_sin_check_in──> NO_SHOW (automático por regla)
  CONFIRMADA ──check_in_realizado──> EN_ESTADÍA (transición a Front Office)
  EN_ESTADÍA ──check_out_realizado──> COMPLETADA (transición a Front Office)
  NO_SHOW ──cargo_aplicado──> CERRADA_NO_SHOW

Transiciones autorizadas por rol:
- Agente de Reservas: TENTATIVA → CONFIRMADA, CONFIRMADA → CANCELADA, CONFIRMADA → MODIFICADA
- Sistema (automático): CONFIRMADA → NO_SHOW, evento OTA → CONFIRMADA
- Revenue Manager: puede modificar cualquier estado con log de auditoría
- Front Office: CONFIRMADA → EN_ESTADÍA (check-in), EN_ESTADÍA → COMPLETADA (check-out)

group_quote.status:
  DRAFT ──envío_al_cliente──> ENVIADA
  ENVIADA ──aceptación_cliente──> ACEPTADA
  ENVIADA ──rechazo_cliente──> RECHAZADA
  ENVIADA ──vencimiento_opción──> EXPIRADA
  ACEPTADA ──conversión_a_reserva──> CONVERTIDA
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| **SiteMinder** | Channel Manager (ARI + reservas) | bidireccional | **Obligatoria** (si hotel vende por OTAs) | integración CRÍTICA ya decidida. Push de availability/rates/restrictions hacia OTAs. Pull de reservas desde OTAs. Protocolo: API REST + webhooks. Mapeo de room types y rate plans configurable por tenant. SiteMinder soporta 400+ canales (Booking.com, Expedia, Hotelbeds, HRS, etc.) |
| **Booking.com** | OTA | bidireccional (vía SiteMinder) | Opcional (si hotel está en Booking) | comisión típica 15-18%. Modelos hotel-collect y OTA-collect. Extranet de Booking también accesible directamente para la gestión de contenido (fotos, descripciones) — eso se hace fuera del sistema |
| **Expedia** | OTA | bidireccional (vía SiteMinder) | Opcional | comisión típica 20-25%. Incluye Hotels.com, Vrbo, Orbitz, Travelocity (mismo grupo) |
| **Hotelbeds** | Canal B2B / GDS | bidireccional (vía SiteMinder) | Opcional | distribución a agencias de viajes y operadores mayoristas. Relevante para turismo grupal y mercado europeo inbound hacia AR |
| **Google Hotel Ads** | Canal de metabúsqueda | bidireccional (vía SiteMinder o direct connect) | Recomendado | muestra precios en Google Search/Maps. Puede conectar vía SiteMinder o mediante integration directa del booking engine del hotel |
| **TripAdvisor (contenido + reputación)** | Plataforma de reputación | pull | Opcional | ingesta de reviews para módulo de reputación. API de respuesta donde disponible |
| **Google Business Profile** | Plataforma de reputación | pull + push respuesta | Opcional | ingesta de Google Reviews, respuesta desde el sistema via Google My Business API |
| **Motor de reservas web (booking engine)** | Motor de reservas | bidireccional | Recomendado | para direct booking sin comisión OTA. Puede ser propio de Bravas o integrado con proveedor externo (Bookassist, Siteminder BookDirect, etc.). Embebible en la web del hotel |
| **Holded / A3** | Contabilidad/ERP | outbound | Opcional (ES — Opción A ERP) | exportación de ingresos por canal, comisiones OTA, facturación grupal |
| **Verifactu** | Facturación ES | outbound | Obligatorio (ES, ley 2026) | Gestión delegada a `admin-cfo`, pero datos de origen vienen de reservas en este módulo |
| **AFIP WSFE** | Facturación AR | outbound | Obligatorio (AR) | ídem Verifactu, delegado a `admin-cfo` |
| **Email (SMTP/SendGrid/SES)** | Notificaciones | outbound | Obligatoria | confirmaciones de reserva, vouchers, encuestas post-estadía, alertas de no-show |
| **SMS / WhatsApp Business** | Notificaciones | outbound | Opcional | confirmaciones y recordatorios por WhatsApp/SMS. Requiere número de empresa y template aprobado |
| **Mailchimp / Sendinblue / HubSpot** | Email Marketing | bidireccional | Opcional | para campañas de newsletter, pre-arrival journey y post-stay |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Reservas y gestión de canales OTA | ✓ | | | | universal |
| Revenue Management / yield dinámico | ✓ | | | | "Revenue Manager" como anglicismo aceptado en ambos países |
| Motor de direct booking | ✓ | | | | |
| Dashboard RevPAR / ADR / Occupancy | ✓ | | | | métricas internacionales sin variación regional |
| Cotizaciones y grupos | ✓ | | | | |
| Gestión de cuentas corporate | ✓ | | | | |
| Comisiones a agencias | ✓ | | | | |
| Reputación online (Booking, TripAdvisor, Google) | ✓ | | | | mismas plataformas en ambos países |
| Marketing digital | ✓ | | | | |
| Facturación reservas | | | | ✓ | AR: AFIP WSFE, factura electrónica. ES: Verifactu (ley 2026). La lógica de factura es distinta pero los datos de origen (reserva) son iguales |
| Nomenclatura "Director Comercial" | | | ✓ | | título estándar en ES |
| Nomenclatura "Gerente Comercial" / "Jefe de Ventas" | | ✓ | | | títulos más usados en AR |
| Paridad de precios en OTAs (compliance) | ✓ | | | | regulación contractual OTA es igual en ambos países |
| Hotelbeds como canal mayorista relevante | | | ✓ | | Hotelbeds tiene mucho más peso en mercado europeo (ES) que en AR. En AR su equivalente son Despegar y Almundo |
| Despegar / Almundo como OTAs locales | | ✓ | | | OTAs relevantes en mercado AR/LATAM |
| Protección de datos del huésped (reservas) | | | | ✓ | AR: Ley 25.326. ES/UE: RGPD. Mismo dato (nombre, email, tarjeta) debe cumplir norma local |
| Tipo de IVA en precios publicados | | | | ✓ | AR: IVA 21% habitaciones. ES: IVA reducido 10% alojamiento. Reglas fiscales distintas afectan la visualización del precio en el motor de reservas |

---

## 10. Slots de extensión (crítico para N2 + multi-tenant)

### 10.1 Campos custom por entidad

```
reservation.custom_fields: JSONB
  → Ejemplos: "motivo del viaje", "empresa facturadora", "código de convenio corporativo", "preferencias de habitación"
reservation.custom_fields_schema: JSONB (define qué campos exige el tenant)

rate_plan.custom_fields: JSONB
  → Ejemplos: "política de fidelización propia", "tipo de cliente target", "restricción cadena"

company.custom_fields: JSONB
  → Ejemplos: "gestor de cuenta asignado", "contrato firmado (URL)", "límite de crédito"

group_quote.custom_fields: JSONB
  → Ejemplos: "presupuesto total del evento", "coordinador del grupo", "servicios especiales solicitados"
```

### 10.2 Workflows custom

```
pre_create_reservation: tenant puede exigir campos adicionales obligatorios (ej: "código empresa" para reservas corporate)
post_create_reservation: tenant puede disparar webhook propio, enviar SMS personalizado, activar pre-arrival journey en su CRM
pre_cancel_reservation: tenant puede bloquear cancelación si hay cargo pendiente o exigir motivo de cancelación
post_cancel_reservation: tenant puede activar flujo de recuperación (email con oferta para re-reservar)
pre_send_group_quote: tenant puede exigir aprobación del Director Comercial antes de enviar
post_accept_group_quote: tenant puede disparar notificación a F&B y Economato para planificación
pre_publish_ari: tenant puede bloquear push a ciertos canales en determinadas fechas (ej: no publicar en OTAs en Navidad — solo direct booking)
post_no_show: tenant puede configurar si aplica cargo automático o requiere aprobación manual
```

### 10.3 Integraciones per-tenant

```
Channel Managers: SiteMinder (default), Dingus, Omnibees, Availpro, YieldPlanet, otro custom
Motor de reservas web: SiteMinder BookDirect, Bookassist, Triptease, D-Edge, Avvio, propio Bravas
CRM / Marketing: Mailchimp, HubSpot, ActiveCampaign, SendGrid, otro
OTAs adicionales: Despegar (AR), Almundo (AR), eDreams (ES), Lastminute.com (ES), Airbnb (nicho)
Gestión de reputación: ReviewPro, TrustYou, Medallia, nativo Bravas
Facturación: Holded (ES Opt-A), A3 (ES Opt-A), Sage, Contabilium, AFIP directo (AR)
```

### 10.4 Branding/UI per-tenant

- Colores del módulo comercial (cabecera del motor de reservas, emails de confirmación)
- Logo del hotel en vouchers y cotizaciones
- Nomenclatura de roles: "Revenue Manager" puede renombrarse como "Responsable de tarifas" si el tenant lo prefiere
- Templates de email de confirmación completamente customizables por tenant
- Idioma del motor de reservas: configurable (es-ES, es-AR, en, fr, pt, otros)

### 10.5 Idiomas

- Diccionario i18n del módulo: tenant puede sobreescribir strings como "Reserva confirmada" → "Su reservación ha sido procesada"
- Motor de reservas: soporta múltiples idiomas simultáneos (el huésped elige al iniciar el flujo de booking)

---

## 11. Nomenclatura i18n (tabla de términos del sector)

| Término técnico | es-ES default | es-AR default | en default | Customizable por tenant |
|---|---|---|---|---|
| `commercial_director` | "Director Comercial" | "Gerente Comercial" | "Director of Sales & Marketing" | ✓ |
| `sales_manager` | "Jefe de Ventas" | "Gerente de Ventas" | "Sales Manager" | ✓ |
| `revenue_manager` | "Revenue Manager" | "Revenue Manager" | "Revenue Manager" | ✓ |
| `reservations_manager` | "Jefe de Reservas" | "Jefe de Reservas" | "Reservations Manager" | ✓ |
| `reservations_agent` | "Agente de Reservas" | "Agente de Reservas" | "Reservations Agent" | ✓ |
| `marketing_manager` | "Responsable de Marketing" | "Responsable de Marketing" | "Marketing Manager" | ✓ |
| `community_manager` | "Community Manager" | "Community Manager" | "Social Media Manager" | ✓ |
| `sales_executive` | "Ejecutivo de Ventas" | "Ejecutivo de Ventas" | "Sales Executive" | ✓ |
| `reservation` | "Reserva" | "Reserva" | "Reservation" | ✓ |
| `booking_channel` | "Canal de distribución" | "Canal de distribución" | "Distribution channel" | ✓ |
| `rate_plan` | "Plan tarifario" | "Plan tarifario" | "Rate plan" | ✓ |
| `revpar` | "RevPAR" | "RevPAR" | "RevPAR" | no (término técnico internacional) |
| `adr` | "ADR (Tarifa Media Diaria)" | "ADR (Tarifa Promedio Diaria)" | "ADR (Average Daily Rate)" | ✓ |
| `occupancy_rate` | "Tasa de ocupación" | "Porcentaje de ocupación" / "Ocupación" | "Occupancy rate" | ✓ |
| `goppar` | "GOPPAR" | "GOPPAR" | "GOPPAR" | no |
| `trevpar` | "TRevPAR" | "TRevPAR" | "TRevPAR" | no |
| `no_show` | "No presentado" / "No-show" | "No-show" | "No-show" | ✓ |
| `overbooking` | "Overbooking" | "Overbooking" | "Overbooking" | no |
| `allotment` | "Cupo" / "Bloque de habitaciones" | "Cupo" / "Bloque" | "Allotment / Room block" | ✓ |
| `channel_manager` | "Channel Manager" | "Channel Manager" | "Channel Manager" | no |
| `direct_booking` | "Reserva directa" | "Reserva directa" | "Direct booking" | ✓ |
| `group_quote` | "Cotización de grupo" | "Cotización de grupo" | "Group quote / Group proposal" | ✓ |
| `corporate_account` | "Cuenta corporativa" / "Empresa" | "Cuenta corporativa" / "Empresa" | "Corporate account" | ✓ |
| `review` | "Comentario" / "Reseña" | "Comentario" / "Reseña" | "Review" | ✓ |
| `reputation_score` | "Puntuación de reputación" | "Puntaje de reputación" | "Reputation score" | ✓ |
| `yield` | "Yield" / "Gestión de rendimiento" | "Yield" | "Yield management" | ✓ |
| `forecast` | "Previsión" | "Pronóstico" / "Proyección" | "Forecast" | ✓ |
| `pick_up` | "Pick-up" | "Pick-up" | "Pick-up" | no |
| `pace_comparison` | "Comparativa de ritmo" | "Comparativa de ritmo" | "Pace comparison" | ✓ |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| **RGPD (Reglamento General de Protección de Datos)** | UE / ES | datos del huésped en reservas (nombre, email, tarjeta, origen): consentimiento explícito requerido para marketing; derecho de acceso, rectificación y eliminación; retención limitada. Base legal para tratamiento de datos de reserva |
| **Ley 25.326 (Protección de Datos Personales)** | AR | equivalente AR del RGPD. Registro del banco de datos ante la DNPDP. Consentimiento para envío de comunicaciones comerciales |
| **CAN-SPAM / CASL / normativa email marketing** | US/CA (internacional) | el envío de newsletters y campañas de email marketing debe incluir opción de baja (unsubscribe) y remitente identificado |
| **Verifactu (Ley antifraude fiscal)** | ES (2026) | los ingresos de reservas que se facturen deben registrarse en el sistema de facturación verificable. Delegado a `admin-cfo` pero los datos de origen vienen de este módulo |
| **AFIP WSFE / ARCA** | AR | facturación electrónica de las reservas. Delegado a `admin-cfo` |
| **IVA en alojamiento** | Split | ES: tipo reducido 10% aplicable a alojamiento. AR: IVA 21% (con exenciones para turistas extranjeros que pagan en divisas — Decreto 1172/2003). La lógica de precio publicado en el motor de reservas debe aplicar el tipo correcto según país del tenant |
| **Paridad de precios (contratos OTA)** | Internacional | Booking.com y Expedia exigen contractualmente que el hotel no publique precios más baratos en otros canales. El módulo debe alertar sobre violaciones de paridad |
| **DSA (Digital Services Act)** | UE / ES | para hoteles con web propia que actúen como intermediarios de reservas online (aplica si se implementa un booking engine complejo con otros proveedores) |
| **NF525 / VeriFactu ES** | ES | ver Verifactu |
| **Reglamento de hospedaje / parte de viajeros** | Split | el nombre, nacionalidad y datos del huésped en la reserva se usan para la planilla de policía / parte de viajero. La conexión a API policial (SES AR, Guardia Civil ES) es responsabilidad de `front-office`, pero los datos se originan aquí |

---

## 13. Dependencias del lifecycle del módulo

**Qué pasa si el módulo se ACTIVA después del hotel ya corriendo:**
- Datos iniciales requeridos (seed): tipos de habitación (ya deben existir en `front-office`), planes tarifarios iniciales (asistente de onboarding), canales OTA a conectar (wizard de SiteMinder)
- Flujo de setup inicial: (1) configurar planes tarifarios y precios, (2) conectar SiteMinder y mapear room types / rate plans, (3) activar canales uno por uno (Booking, Expedia, etc.), (4) configurar motor de direct booking en web del hotel, (5) testear con reserva de prueba
- Migración de datos: si el hotel tenía reservas en otro sistema, se importan históricamente vía CSV o API del sistema anterior (formato estándar HTNG si es compatible). Las reservas históricas no generan ARI push — solo quedan como registro

**Qué pasa si el módulo se DESACTIVA:**
- Datos huérfanos: las reservas confirmadas (futuras) quedan en la base pero sin posibilidad de modificación desde el módulo. Deben gestionarse desde `front-office`
- Irrecuperables: la conexión a SiteMinder se corta → el hotel pierde la sincronización con OTAs hasta que el módulo se reactive. Las OTAs siguen mostrando disponibilidad desactualizada (riesgo de overbooking)
- `front-office` pierde la vista de nuevas reservas entrantes desde canales externos
- Procedimiento de archivo: se mantiene el historial de reservas y revenue reports en modo lectura

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| **RevPAR** (Revenue per Available Room) | Ingresos habitaciones / habitaciones disponibles (también = ADR × Occupancy%) | Diaria | Dashboard Comercial, Portal Dirección | varía mucho por tipo y ubicación; hoteles urbanos AR 4*: ~USD 60-90; ES 4*: ~EUR 80-120 |
| **ADR** (Average Daily Rate / Tarifa Media Diaria) | Ingresos habitaciones / habitaciones vendidas (ocupadas) | Diaria | Dashboard Comercial | referencia: ADR urbano 4* Buenos Aires: USD 100-140. Madrid: EUR 120-160 |
| **Occupancy Rate** (Tasa de Ocupación) | Habitaciones vendidas / habitaciones disponibles × 100 | Diaria | Dashboard Comercial | benchmark: 70-75% urbano típico en temporada media |
| **TRevPAR** (Total Revenue per Available Room) | Ingresos totales del hotel (habs + F&B + spa + extras) / habitaciones disponibles | Diaria/mensual | Dashboard Dirección | siempre > RevPAR; mide el valor total generado por habitación disponible |
| **GOPPAR** (Gross Operating Profit per Available Room) | GOP (ingresos – costos operativos directos) / habitaciones disponibles | Mensual | Dashboard Dirección | más difícil de calcular en tiempo real; requiere datos de costos de `admin-cfo` |
| **Pick-up 7 días** | Reservas ingresadas en los últimos 7 días para próximas 4 semanas vs mismo período año anterior | Diaria | Dashboard Comercial | alerta si pick-up < 70% del año anterior |
| **Producción por canal** | Ingresos / reservas / ADR por canal (Booking, Expedia, Direct, etc.) | Mensual | Dashboard Comercial | meta: incrementar % de reserva directa para reducir comisiones OTA |
| **Comisión OTA promedio (%)** | Total comisiones pagadas a OTAs / ingresos totales OTAs × 100 | Mensual | Dashboard Comercial | benchmark: 15-25% según canal. Meta: mantener mix que no supere 20% promedio |
| **Conversion rate booking engine** | Reservas completadas / sesiones web en el motor de reservas × 100 | Mensual | Dashboard Comercial / Marketing | benchmark: 2-5% es typical; >5% es muy bueno |
| **Reputación score global** | Promedio ponderado de scores en Booking + TripAdvisor + Google | Diaria | Dashboard Comercial, Portal Dirección | meta: >8.5 en Booking, >4.3 en Google, >4.5 en TripAdvisor |
| **NPS** (Net Promoter Score) | % Promotores (9-10) − % Detractores (0-6) en encuesta post-estadía | Mensual | Dashboard Comercial | benchmark: >50 es bueno; >70 es excelente para hoteles boutique |
| **Lead time de reserva** | Días promedio entre fecha de creación de reserva y fecha de check-in | Mensual | Dashboard Comercial | varía por segmento: corporate = 3-7 días, vacacional = 30-90 días, grupos = 90-180 días |
| **Cancelación rate** | Reservas canceladas / reservas totales creadas × 100 | Mensual | Dashboard Comercial | benchmark: 20-35% es típico (influye el mix de tarifas no reembolsables vs flexibles) |
| **No-show rate** | No-shows / reservas totales con llegada prevista × 100 | Mensual | Dashboard Comercial | benchmark: 2-5%. >5% indica problema con política de cancelación |
| **Revenue por segmento** | Ingresos por segmento (leisure, corporate, grupos, OTA, etc.) | Mensual | Dashboard Comercial | para evaluar evolución del mix de negocio |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol que la ve | Función principal | Mockup existente |
|---|---|---|---|---|
| `/commercial/dashboard` | Supervisión | Director Comercial, Revenue Manager, GM | Panel principal: RevPAR, ADR, Occupancy%, pick-up, reputación score | mockup: pendiente |
| `/commercial/reservations` | Operativo | Agente de Reservas, Jefe de Reservas | Lista de reservas con filtros (fecha, canal, estado, apellido), búsqueda, acciones | mockup: pendiente |
| `/commercial/reservations/new` | Operativo | Agente de Reservas | Creación manual de reserva individual: datos huésped, fechas, tipo habitación, tarifa, extras | mockup: pendiente |
| `/commercial/reservations/:id` | Operativo | Agente de Reservas, Jefe de Reservas | Detalle de reserva: ver / editar / cancelar / imprimir voucher | mockup: pendiente |
| `/commercial/rates` | Operativo | Revenue Manager, Director Comercial | Gestión de planes tarifarios: crear, editar, activar/desactivar, copiar | mockup: pendiente |
| `/commercial/rates/calendar` | Operativo | Revenue Manager | Vista de calendario de precios y disponibilidad por tipo de habitación, semanas / 30 días | mockup: pendiente |
| `/commercial/channels` | Operativo | Director Comercial, Revenue Manager | Lista de canales OTA activos, estado SiteMinder, comisión, mapping | mockup: pendiente |
| `/commercial/channels/siteminder` | Operativo | Director Comercial | Panel de integración SiteMinder: estado, logs de ARI, errores, re-push manual | mockup: pendiente |
| `/commercial/yield` | Operativo | Revenue Manager | Motor de yield: reglas de ajuste automático de precios, umbrales, overrides manuales | mockup: pendiente |
| `/commercial/forecast` | Supervisión | Revenue Manager, Director Comercial | Forecast de ocupación a 7/30/60/90 días, pace comparison vs año anterior | mockup: pendiente |
| `/commercial/groups` | Operativo | Ejecutivo de Ventas, Jefe de Ventas | Lista de cotizaciones y grupos, pipeline, estado, pipeline value | mockup: pendiente |
| `/commercial/groups/new` | Operativo | Ejecutivo de Ventas | Creación de cotización grupal con bloques de habitaciones, servicios, PDF | mockup: pendiente |
| `/commercial/groups/:id` | Operativo | Ejecutivo de Ventas, Director Comercial | Detalle de cotización: editar, enviar, confirmar, convertir a reserva | mockup: pendiente |
| `/commercial/companies` | Operativo | Ejecutivo de Ventas, Director Comercial | CRM básico de cuentas corporativas y agencias: ficha, historial, tarifa pactada | mockup: pendiente |
| `/commercial/promotions` | Operativo | Marketing Manager, Director Comercial | Gestión de promociones y códigos de descuento | mockup: pendiente |
| `/commercial/reputation` | Supervisión | Marketing Manager, Director Comercial | Vista consolidada de reputación online: reviews por plataforma, score global, respuestas pendientes | mockup: pendiente |
| `/commercial/reputation/respond/:id` | Operativo | Marketing Manager, Director Comercial | Formulario para redactar y publicar respuesta a un review específico | mockup: pendiente |
| `/commercial/revenue-report` | Supervisión | Director Comercial, GM | Revenue report mensual: métricas, comparativas, desglose por canal y segmento | mockup: pendiente |
| `/commercial/kpis` | Dirección | GM, Director Comercial | Dashboard ejecutivo: RevPAR, ADR, Occupancy, TRevPAR, GOPPAR, NPS, reputación | mockup: pendiente |
| `/booking` | Portal Huésped | Huésped | Motor de reservas web: selección de fechas, tipos de habitación, tarifas, extras, pago | mockup: pendiente |
| `/booking/confirmation` | Portal Huésped | Huésped | Confirmación de reserva con voucher, opción de modificar/cancelar, link de gestión | mockup: pendiente |

---

## 16. Riesgos conocidos y preguntas abiertas

- **Riesgo 1 — Latencia SiteMinder:** un push de ARI fallido puede resultar en overbooking si otra OTA vende la última habitación antes de que se sincronice. Mitigación: alertas inmediatas en `/commercial/channels/siteminder` + política de overbooking controlado (permitir 1-2 habitaciones extra con lógica de walk-out definida). El módulo debe tener un mecanismo de re-push automático con reintentos y notificación de fallo al Revenue Manager.

- **Riesgo 2 — Mapeo de tipos de habitación por canal:** cada OTA tiene sus propios códigos de tipos de habitación. Un mapeo incorrecto puede resultar en que se venda "Suite" cuando corresponde "Habitación doble". El wizard de setup de SiteMinder debe guiar el mapeo con validación antes de activar el canal.

- **Riesgo 3 — Cálculo de GOPPAR en tiempo real:** GOPPAR requiere datos de costos de `admin-cfo` que pueden no estar disponibles en tiempo real (cierres mensuales). Se recomienda calcular GOPPAR mensualmente en modo batch, no en tiempo real.

- **Riesgo 4 — Paridad de precios OTA:** si el tenant activa precios más bajos en un canal que en otro, puede recibir penalizaciones contractuales de Booking/Expedia. El sistema puede alertar pero no puede bloquear — es decisión comercial del tenant. Documentar esto en el onboarding.

- **Pregunta abierta 1:** ¿El motor de reservas web (booking engine) lo construimos nosotros desde cero, o integramos uno de terceros (Bookassist, SiteMinder BookDirect, D-Edge)? Impacta en: build vs buy, PCI compliance de tarjetas en el booking engine, timeline de desarrollo. → A decidir por Daniel + arquitecto.

- **Pregunta abierta 2:** ¿El módulo de reputación online es propio (scraping + API) o integramos ReviewPro / TrustYou? Estos SaaS especializados tienen mejores NLP y analytics de sentiment. → A decidir por Daniel.

- **Pregunta abierta 3:** ¿El Pack Corporativo (`corporate-sales`, `corporate-billing`) es una extensión de este módulo core o un módulo completamente separado? La lógica de tarifas negociadas y contratos corporativos es compleja. Se sugiere empezar con una versión básica de `company` y `corporate_rate` dentro de este módulo, y mover al Pack Corporativo si se necesita más sofisticación. → A confirmar por arquitecto.

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación del catálogo completo v1.0. Sector nuevo (no estaba en demo F2.5). 40 funciones documentadas, 11 entidades de datos, integración SiteMinder detallada, mapa geo ES/AR, 20 pantallas. | bravas |
