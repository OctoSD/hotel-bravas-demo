# Catálogo — Sustainability (Sostenibilidad)

> Módulo transversal · Versión v1.0 · 2026-11-10 · Autor: bravas

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Sostenibilidad |
| **Nombre (es-AR)** | Sustentabilidad |
| **Nombre (en)** | Sustainability |
| **Código técnico** | `@octo/bravashotel-sustainability` |
| **Tipo** | Transversal (siempre activo, atraviesa todos los sectores) |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | `front-office` (consumos por habitación), `housekeeping` (agua + residuos), `kitchen` (desperdicios alimentarios), `maintenance` (energía + mantenimiento preventivo), `admin-cfo` (costes energéticos), `storeroom` (proveedores + compras sostenibles) |
| **Módulos dependientes de éste** | `direction` (dashboard sostenibilidad en briefing GM), `guest-experience` (comunicación green al huésped), `commercial` (certificaciones como herramienta de venta) |
| **Activación default** | Siempre activo (Core) — pendiente decisión Daniel: puede quedar como opt-in en boutiques muy pequeños |

---

## 2. Propósito del módulo

- **Qué resuelve:** centraliza la recogida, seguimiento y reporte de indicadores medioambientales del hotel (energía, agua, residuos, CO₂, certificaciones), con alimentación automática desde otros módulos y dashboard en Dirección. Permite al hotel demostrar sostenibilidad a OTAs (filtros ecológicos de Booking/Expedia), certificadoras y reguladores, sin que sea una carga operativa adicional para los empleados.
- **Qué NO resuelve:** no reemplaza al consultor de sostenibilidad externo ni a las auditoras de certificación (ISO 14001, Green Key). No calcula compensaciones de carbono complejas ni gestiona paneles solares/BEMS (Building Energy Management System) a nivel de control industrial.
- **Métrica principal de éxito:** índice de consumo energético por habitación-noche (kWh/habitación-noche) y tasa de residuos segregados (% sobre total generado).

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Responsable Sostenibilidad | Responsable de Sostenibilidad | Responsable de Sustentabilidad | Sustainability Manager | 2 | Director General / Director de Operaciones | Coordinadores de sector | Multi-rol en hoteles medianos: función absorbida por Director de Operaciones o RRHH |
| Coordinador (opcional) | Coordinador Sostenibilidad | Coordinador Sustentabilidad | Sustainability Coordinator | 3 | Responsable de Sostenibilidad | — | Solo en 5\* y cadenas |

**Variantes por tamaño de hotel:**
- Boutique / Independiente pequeño: no hay rol dedicado — el GM lleva el dashboard y lo delega a los jefes de sector para que alimenten datos.
- Urbano medio / 4\*: Responsable Sostenibilidad a tiempo parcial, posiblemente compartiendo con otro rol (RRHH o Calidad).
- Resort / 5\* / Cadena: equipo dedicado con coordinadores por área.

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | sí | sección "Nuestro compromiso verde" + tips de sostenibilidad + opción opt-in "no cambio de toallas" |
| Portal Operativo (por sector) | sí (HK, Kitchen, Mantto) | widgets de registro de consumo embebidos en sus portales respectivos — sin abrir un portal nuevo |
| Portal Supervisor/Jefe | sí | acceso al dashboard de indicadores del sector propio |
| Portal Dirección | sí | dashboard global de sostenibilidad: KPIs, alertas de desviación, estado certificaciones |
| Portal Admin | sí | configuración de objetivos, umbrales de alerta, certificaciones activas |
| **GX inbox (dual-fire)** | sí | eventos: certificación ganada/renovada, hito de reducción alcanzado → GX lo convierte en comunicación a huéspedes y OTAs |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Dashboard sostenibilidad GM | Panel resumen con KPIs: kWh/hab-noche, litros agua/hab-noche, kg residuos/hab-noche, CO₂ total, índice vs objetivo, estado certificaciones | Director General | Portal Dirección | Automático (cálculo nocturno) | Diaria | core | no |
| 2 | Registro consumo energético | Captura de lecturas de contadores de electricidad, gas, gasóleo/gasoil por sector o medidor | Responsable Sostenibilidad / Mantto | Portal Mantto (embebido) | Manual o integración IoT | Diaria/semanal | core | no |
| 3 | Registro consumo de agua | Lecturas de contadores de agua (general, piscina, cocina, lavandería, habitaciones si sub-medición) | Responsable Sostenibilidad / Mantto | Portal Mantto (embebido) | Manual o integración IoT | Diaria/semanal | core | no |
| 4 | Registro residuos por fracción | Captura de peso/volumen por fracción: orgánico, papel/cartón, vidrio, plástico, aceite usado, RAEE, peligrosos | Responsable Sostenibilidad / HK / Kitchen | Portal HK + Portal Kitchen (embebido) | Manual (pesaje o estimación) | Semanal | core | no |
| 5 | Cálculo huella de carbono | Cálculo automático CO₂eq a partir de consumos: electricidad (factor red nacional ES/AR), gas natural, gasóleo, vuelos del personal (opcional), residuos | Sistema (automático) | Portal Dirección | Automático mensual | Mensual | core | no |
| 6 | Indicadores por habitación-noche | Normalización de todos los consumos por REVPAR o por habitación-noche disponible (ADR-based) para comparabilidad entre periodos | Sistema (automático) | Portal Dirección | Automático | Diaria | core | no |
| 7 | Objetivos y umbrales de alerta | Configuración de objetivos anuales por KPI y umbrales de alerta (% desviación) que activan notificación a Responsable | Responsable Sostenibilidad / Admin | Portal Admin | Manual | Anual/configurable | core | no |
| 8 | Alertas de desviación | Notificación automática cuando un KPI supera el umbral definido (ej: agua +20% sobre objetivo de la semana) | Sistema (automático) → Responsable Sostenibilidad | Portal Dirección + notif. interna | Automático (cálculo periódico) | Continua | core | no |
| 9 | Gestión de certificaciones | Registro de certificaciones activas (Green Key, ISO 14001, Travelife, Q de Calidad, LEED, etc.) con fecha de expedición, vigencia, organismo certificador, estado (activa/en renovación/vencida) | Responsable Sostenibilidad | Portal Admin | Manual | Según ciclo certificación | importante | sí (ganada/renovada → GX) |
| 10 | Recordatorio renovación certificación | Alerta automática X días antes del vencimiento de cada certificación | Sistema (automático) | Portal Dirección + Portal Admin | Automático (fecha) | Según configuración | importante | no |
| 11 | Generación reporte anual ESG/RSE | Reporte exportable (PDF + Excel) con todos los KPIs del año, evolución vs objetivo, certificaciones, iniciativas implementadas — formato listo para auditora externa | Responsable Sostenibilidad | Portal Admin | Manual | Anual | importante | no |
| 12 | Reporte CSRD (ES — opt-in) | Exportación de datos en formato compatible con la Directiva CSRD 2022/2464 UE para empresas hoteleras en scope | Responsable Sostenibilidad | Portal Admin | Manual | Anual | importante (ES) | no |
| 13 | Reporte GRI (opt-in) | Exportación de indicadores GRI Standards relevantes para hostelería (GRI 302 Energía, GRI 303 Agua, GRI 305 Emisiones, GRI 306 Residuos) | Responsable Sostenibilidad | Portal Admin | Manual | Anual | nice | no |
| 14 | Iniciativas de mejora | Registro de proyectos de mejora sostenible en curso (paneles solares, cambio a LED, compostaje, etc.) con estado, responsable, fecha objetivo, impacto estimado | Responsable Sostenibilidad | Portal Admin | Manual | Continua | importante | no |
| 15 | Benchmarking de proveedores green | Scoring de sostenibilidad de proveedores (criterios: certificación ambiental, packaging, transporte local) — integrado con storeroom | Responsable Sostenibilidad | Portal Admin | Manual/event (nuevo proveedor) | Puntual | nice | no |
| 16 | Consumo de alimentos de proximidad | Registro del % de compras de alimentos de km0 / locales / ecológicos sobre total de compras de cocina | Responsable Sostenibilidad / Chef | Portal Kitchen (embebido) | Manual mensual | Mensual | nice | no |
| 17 | Comunicación verde al huésped | Generación de mensajes pre-estancia y en habitación sobre iniciativas del hotel (opt-in no cambio toallas, ahorro agua, compensación carbono) | Sistema (automático) + GX | Portal Huésped | Evento check-in | Por estancia | importante | sí (→ GX para personalización) |
| 18 | Opt-in huésped "no cambiar toallas" | Preferencia del huésped que activa flag en tarea HK para no cambiar toallas/sábanas (ahorro agua y detergente) | Huésped | Portal Huésped | Manual (huésped) | Por estancia | importante | sí (→ HK task flag) |
| 19 | Reporte energético por sector | Desglose de consumo energético por sector/área (cocina, piscina, climatización, iluminación) si hay sub-medición o estimación por m² | Responsable Sostenibilidad | Portal Dirección | Automático mensual | Mensual | importante | no |
| 20 | Histórico comparativo | Visualización de evolución de KPIs año a año y mes a mes para identificar tendencias estacionales | Responsable Sostenibilidad / GM | Portal Dirección | Automático | Continua | importante | no |
| 21 | Exportación OTA green profile | Exportación de datos de certificaciones en formato JSON para alimentar fichas de sostenibilidad en Booking.com (Travel Sustainable), Expedia (EarthCheck), Google Travel | Responsable Sostenibilidad | Portal Admin | Manual / webhook | Puntual / actualización | importante | no |
| 22 | Revisión periódica de objetivos | Sesión de revisión de objetivos del año con comparativa de logros y ajuste para el siguiente periodo | Director General + Responsable Sostenibilidad | Portal Dirección | Manual (evento) | Anual | importante | no |
| 23 | Registro de incidentes ambientales | Log de incidentes con impacto ambiental (vertidos, fugas de refrigerante, residuos peligrosos mal gestionados) con acción correctiva | Responsable Sostenibilidad | Portal Admin | Manual (evento) | Eventual | importante (legal) | no |

### Sub-flujos clave (pseudocódigo simple)

```
Función: "Cierre mensual de indicadores de sostenibilidad"
1. Sistema agrega consumos registrados en el mes (energía, agua, residuos)
2. Sistema obtiene habitaciones-noche vendidas del mes desde front-office
3. Sistema calcula KPIs normalizados (consumo/hab-noche)
4. Sistema aplica factores de emisión para calcular CO₂eq
5. Sistema compara con objetivo del mes → genera alerta si desviación > umbral
6. Sistema genera tarjeta resumen en dashboard GM para briefing del día 1
7. Sistema actualiza histórico comparativo año a año
```

```
Función: "Renovación de certificación Green Key"
1. Sistema envía alerta 90 días antes del vencimiento al Responsable Sostenibilidad
2. Responsable inicia proceso con organismo certificador (externo)
3. Responsable adjunta documentación de auditoría en el registro de la certificación
4. Responsable actualiza estado: "en renovación"
5. Al recibir resolución positiva: actualiza estado "activa", nueva fecha vigencia
6. Sistema dispara evento a GX inbox: "certificación renovada Green Key 20XX"
7. GX genera comunicación a huéspedes (email pre-estancia, widget portal huésped)
```

```
Función: "Opt-in huésped no cambio de toallas"
1. En email pre-check-in, huésped ve opción "Sin cambio de toallas" (ahorro X litros)
2. Huésped activa flag en su portal / responde al email
3. Sistema almacena preferencia en guest_profile.sustainability_prefs
4. HK al generar tarea de limpieza de la habitación: lee el flag
5. Task HK incluye nota: "TOALLAS: NO cambiar (preferencia huésped)"
6. Sistema registra +1 en contador de opt-ins del mes
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `sustainability_config` | Sí | No | organization_id, id, year, energy_target_kwh, water_target_liters, waste_target_kg, co2_target_tons, alert_threshold_pct, certifications_tracking JSONB, updated_at | `custom_fields JSONB` | → `organizations` |
| `energy_reading` | Sí | No | organization_id, id, date, source (electricity/gas/diesel/other), area (hotel/kitchen/pool/laundry/other), value, unit (kwh/m3/liters), meter_id, notes, recorded_by | `custom_fields JSONB` | — |
| `water_reading` | Sí | No | organization_id, id, date, area (hotel_total/pool/kitchen/laundry/other), value_liters, meter_id, notes, recorded_by | `custom_fields JSONB` | — |
| `waste_record` | Sí | No | organization_id, id, date, fraction (organic/paper/glass/plastic/cooking_oil/weee/hazardous/other), weight_kg, volume_liters (opcional), recorded_by, notes | `custom_fields JSONB` | — |
| `sustainability_kpi_snapshot` | Sí | No | organization_id, id, period_month DATE, kwh_per_room_night, liters_per_room_night, kg_waste_per_room_night, co2eq_tons, sold_room_nights INT, occupancy_rate, vs_target_pct JSONB, calculated_at | — | — |
| `certification` | Sí | No | organization_id, id, name, issuing_body, country (ES/AR/global), status (active/renewing/expired), issued_date, valid_until, document_url, notes | `custom_fields JSONB` | — |
| `green_initiative` | Sí | No | organization_id, id, title, description, category (energy/water/waste/biodiversity/supply/mobility/other), status (planned/in_progress/completed/cancelled), owner_user_id, start_date, target_date, estimated_impact, actual_impact, notes | `custom_fields JSONB` | — |
| `environmental_incident` | Sí | No | organization_id, id, date, type (spill/refrigerant_leak/hazardous_waste/other), description, severity (1-3), corrective_action, resolved_at, reported_by | — | — |

**Diagrama ER simplificado:**

```
organizations ─────< sustainability_config (1 por org, versión anual)
              ─────< energy_reading
              ─────< water_reading
              ─────< waste_record
              ─────< sustainability_kpi_snapshot (agregado mensual)
              ─────< certification
              ─────< green_initiative
              ─────< environmental_incident

guest_profile.sustainability_prefs ──> (alimenta opt-in en HK task)
```

---

## 7. Máquinas de estado

```
=== CERTIFICACIÓN (certification.status) ===

EXPIRED ──proceso inicio──> RENEWING
RENEWING ──aprobación organismo──> ACTIVE
RENEWING ──denegación──> EXPIRED
ACTIVE ──proximidad vencimiento (90d)──> [alerta] (sigue ACTIVE)
ACTIVE ──vencimiento sin renovación──> EXPIRED
[nuevo] ──primera expedición──> ACTIVE

=== INICIATIVA VERDE (green_initiative.status) ===

PLANNED ──inicio trabajos──> IN_PROGRESS
IN_PROGRESS ──finalización──> COMPLETED
IN_PROGRESS ──cancelación──> CANCELLED
PLANNED ──cancelación──> CANCELLED
COMPLETED ──(terminal)
CANCELLED ──(terminal)
```

---

## 8. Integraciones externas

| Sistema externo | Tipo | Sentido | Descripción |
|---|---|---|---|
| Booking.com Travel Sustainable API | REST API | push (Bravas → Booking) | exporta certificaciones y datos green para badge "Travel Sustainable" en ficha del hotel |
| Expedia EarthCheck | REST API | push | ídem para perfil sostenibilidad en Expedia |
| Google Travel API | REST API | push | datos certificaciones para Google Hotel Search |
| OFE / Contadores IoT (opt-in) | MQTT/REST | pull | integración opcional con medidores inteligentes de energía/agua para alimentación automática de lecturas (evita registro manual) |
| IDAE (ES — opt-in) | Portal web | manual | Plataforma del Instituto para la Diversificación y Ahorro de la Energía — reporte voluntario energético |
| Ministerio Ambiente AR (opt-in) | Portal web | manual | Reporte bajo Ley 25.831 Acceso Información Ambiental — exportación de datos |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | Solo ES | Solo AR | Notas split |
|---|---|---|---|---|
| KPIs energía / agua / residuos | ✓ | — | — | Factores de emisión de CO₂ difieren (red eléctrica ES vs SADI AR) |
| Certificaciones Green Key / ISO 14001 | ✓ | — | — | Proceso similar; organismo diferente por país |
| Certificación Q de Calidad | — | ✓ | — | ICTE España |
| Certificación Travelife | ✓ | — | — | |
| CSRD reporting | — | ✓ | — | Directiva UE 2022/2464; solo aplica a empresas en scope (>500 empleados en 2024, >250 en 2025) |
| Reporte GRI | ✓ | — | — | Estándar global; recomendado no obligatorio |
| Factor emisión CO₂ electricidad | — | Split | Split | ES: REE factor oficial anual. AR: SADI factor CAMMESA por región |
| Ley acceso info ambiental | — | — | ✓ | Ley 25.831 AR — información ambiental pública on demand |
| OFE integración IoT | — | ✓ | — | Operadoras eléctricas con APIs abiertas (REE, Iberdrola, Endesa) |
| Nomeclatura "sustentabilidad" | — | — | ✓ | es-AR usa "sustentabilidad" en lugar de "sostenibilidad" |
| Residuos: normativa específica | — | Split | Split | ES: Plan PNIR / SCRAP de envases. AR: Ley 25.916 residuos sólidos urbanos |

---

## 10. Slots de extensión (crítico para N2 + multi-tenant)

### 10.1 Campos custom por entidad

| Entidad | Slot disponible | Ejemplos de uso |
|---|---|---|
| `sustainability_config` | `custom_fields JSONB` | métricas adicionales no estándar del hotel (ej: colmenas en el tejado, jardín huerto, animales en finca) |
| `energy_reading` | `custom_fields JSONB` | fuente de energía renovable propia (paneles solares kWh generados vs consumidos) |
| `waste_record` | `custom_fields JSONB` | fracciones especiales del hotel (ropa desechada de lavandería, residuos spa, etc.) |
| `certification` | `custom_fields JSONB` | datos específicos del organismo certificador no estándar |
| `green_initiative` | `custom_fields JSONB` | métricas de impacto específicas del proyecto |

### 10.2 Workflows custom

Vía event bus, otros módulos pueden suscribirse a eventos de `sustainability`:
- `certification.renewed` → trigger para actualizar ficha en OTAs (hook externo)
- `kpi.alert_triggered` → notificaciones externas (webhook email/Slack del responsable)
- `opt_in.no_towel_change` → HK module consume este evento para modificar task flag

### 10.3 Integraciones per-tenant

Cada tenant puede activar/desactivar:
- Integración IoT medidores (reemplaza registro manual)
- Reporte CSRD activo/desactivo
- OTAs green profile: qué OTAs reciben datos (Booking, Expedia, Google, todas)
- Factores de emisión custom (si el hotel tiene contrato de energía renovable 100%)

### 10.4 Branding/UI per-tenant

- Nombre del módulo: "Sostenibilidad" (es-ES) / "Sustentabilidad" (es-AR) — override per-tenant para cadenas con nombre propio (ej: "Programa Green Palacio")
- Colores y temática del bloque green en portal huésped: heredan del branding del tenant

### 10.5 Idiomas

| i18n key | es-ES | es-AR | en |
|---|---|---|---|
| sustainability | Sostenibilidad | Sustentabilidad | Sustainability |
| energy | Energía | Energía | Energy |
| waste | Residuos | Residuos | Waste |
| carbon_footprint | Huella de carbono | Huella de carbono | Carbon footprint |
| certification | Certificación | Certificación | Certification |
| green_initiative | Iniciativa verde | Iniciativa verde | Green initiative |

---

## 11. Nomenclatura i18n (tabla de términos del sector)

| Término técnico | es-ES | es-AR | en | Notas |
|---|---|---|---|---|
| `sustainability_config` | configuración sostenibilidad | configuración sustentabilidad | sustainability config | — |
| `energy_reading` | lectura energética | lectura energética | energy reading | — |
| `water_reading` | lectura de agua | lectura de agua | water reading | — |
| `waste_record` | registro de residuos | registro de residuos | waste record | — |
| `sustainability_kpi_snapshot` | resumen KPIs sostenibilidad | resumen KPIs sustentabilidad | sustainability KPI snapshot | — |
| `certification` | certificación | certificación | certification | — |
| `green_initiative` | iniciativa verde | iniciativa verde | green initiative | — |
| `environmental_incident` | incidente ambiental | incidente ambiental | environmental incident | — |
| kWh/hab-noche | kWh por habitación-noche | kWh por habitación-noche | kWh per room night | KPI normalizado |
| L/hab-noche | Litros por habitación-noche | Litros por habitación-noche | Liters per room night | KPI normalizado |
| CO₂eq | Toneladas CO₂ equivalente | Toneladas CO₂ equivalente | CO₂ equivalent tons | — |
| Travel Sustainable | Travel Sustainable (Booking) | Travel Sustainable (Booking) | Travel Sustainable | — |
| Green Key | Green Key | Green Key | Green Key | Nombre propio no se traduce |
| Travelife | Travelife | Travelife | Travelife | Nombre propio no se traduce |

---

## 12. Compliance / Normativa

### España (ES)

| Normativa | Descripción | Impacto en módulo |
|---|---|---|
| Directiva CSRD 2022/2464 UE | Corporate Sustainability Reporting Directive — reporte anual obligatorio para empresas en scope (escalada 2024-2025-2026) | Función #12: exportación datos CSRD. Para hoteleras boutique/pymes: no obligatorio en v1 pero prepararse |
| Real Decreto 235/2013 | Procedimiento básico para certificación de eficiencia energética de edificios | dato informativo en config del hotel (certificado energético del edificio) |
| Ley 7/2022 de residuos y suelos contaminados | Obligaciones de gestión de residuos, registro de productores | función #4: registro residuos por fracción con categorías que cumplen la ley |
| Plan Nacional de Residuos (PNIR) | Objetivos de reciclaje y reducción 2030 | Objetivos alineados en sustainability_config |
| Taxonomía UE (Reglamento 2020/852) | Criterios de sostenibilidad para inversión verde — puede afectar a hoteles que busquen financiación verde | campo informativo; no calcular automáticamente en v1 |

### Argentina (AR)

| Normativa | Descripción | Impacto en módulo |
|---|---|---|
| Ley 25.831 — Acceso Información Ambiental | Información ambiental de carácter público on request | función #13 (export datos) + incidentes ambientales registrados |
| Ley 25.916 — Residuos sólidos urbanos | Marco nacional de gestión de RSU | función #4: fracciones compatibles con la ley |
| Ley 26.473 — Prohibición lámparas incandescentes | Referencia histórica; relevante para verificación en mantenimiento | informativo |
| Resolución CAMMESA | Factor de emisión de CO₂ de la red eléctrica argentina (actualización anual) | función #5: usar factor CAMMESA vigente para AR |
| Protocolos provinciales de RSE | Algunas provincias tienen requisitos adicionales (CABA, Mendoza, Bariloche) | campo "normativa provincial" en sustainability_config |

### Certificaciones hoteleras internacionales

| Certificación | Organismo | Países | Requisito para badge OTA |
|---|---|---|---|
| Green Key | Foundation for Environmental Education | ES, AR, global | Booking.com Travel Sustainable Nivel 3 |
| Travelife Gold | Travelife | ES, AR, global | Booking.com Travel Sustainable |
| ISO 14001 | ISO / AENOR (ES) / IRAM (AR) | Global | — |
| Q de Calidad Turística | ICTE | ES | — |
| LEED Hospitality | USGBC | Global | — |
| Biosphere Tourism | Responsible Tourism Institute | ES principalmente | — |

---

## 13. Dependencias del lifecycle del módulo

```
BEFORE_ACTIVATE:
  - sustainability_config debe tener objetivos del año (o se usan defaults)
  - energy/water meters configurados (mínimo un área)

DEPENDS_ON (data feed):
  - front-office: sold_room_nights (para normalizar KPIs)
  - housekeeping: opt-in no-towel-change flag (guest_profile.sustainability_prefs)
  - kitchen: waste_record (desperdicios alimentarios) — puede alimentar directamente desde Kitchen portal
  - maintenance: energy_reading (lecturas de contadores de Mantto)

PRODUCES (data/events):
  - sustainability_kpi_snapshot (mensual) → consumido por direction dashboard
  - certification.renewed → event bus → GX inbox
  - kpi.alert_triggered → notificación interna Responsable Sostenibilidad
  - opt_in.no_towel_change → HK module (flag en task)

DEACTIVATE_IMPACT:
  - Dashboard GM pierde bloque sostenibilidad
  - Portal huésped pierde sección green
  - GX no recibe eventos de certificaciones
  - OTAs green profile deja de actualizarse (badge puede perderse)
```

---

## 14. Métricas / KPIs del sector

| KPI | Descripción | Fórmula | Frecuencia | Objetivo típico |
|---|---|---|---|---|
| kWh/hab-noche | Consumo eléctrico normalizado | kWh_total / habitaciones_noche_vendidas | Mensual | <30 kWh (urbano) / <50 kWh (resort) |
| L agua/hab-noche | Consumo agua normalizado | litros_total / habitaciones_noche_vendidas | Mensual | <300 L (urbano) / <500 L (resort) |
| kg residuos/hab-noche | Generación residuos normalizada | kg_total / habitaciones_noche_vendidas | Mensual | <1 kg (objetivo europeo 2030) |
| % residuos segregados | Fracción correctamente separada | kg_segregados / kg_total * 100 | Mensual | >60% (objetivo PNIR ES) |
| CO₂eq/hab-noche | Huella de carbono normalizada | co2_total / habitaciones_noche_vendidas | Mensual | <15 kg CO₂eq (urbano) |
| Certificaciones activas | Nº certificaciones en estado ACTIVE | count(certification WHERE status=ACTIVE) | Tiempo real | ≥1 (Green Key o Travelife) |
| % compras km0 | Alimentos de proximidad | kg_km0 / kg_total_alimentos * 100 | Mensual | >20% (objetivo ODS 2030) |
| Opt-in no toallas (%) | Huéspedes que solicitan no cambio toallas | count(opt_in) / total_check_ins * 100 | Mensual | >15% (benchmark sector) |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol | Descripción |
|---|---|---|---|
| `/sustainability/dashboard` | Dirección | GM / Resp. Sostenibilidad | Panel global con KPIs del mes, historial, alertas, estado certificaciones. Widget en `/direction/dashboard` para el briefing GM |
| `/sustainability/readings` | Admin + Resp. | Resp. Sostenibilidad | Registro manual y listado de lecturas de energía y agua |
| `/sustainability/waste` | Admin + Resp. | Resp. Sostenibilidad | Registro de residuos por fracción |
| `/sustainability/certifications` | Admin | Resp. Sostenibilidad | CRUD certificaciones, alertas vencimiento, adjuntar documentos |
| `/sustainability/initiatives` | Admin + Resp. | Resp. Sostenibilidad | Gestión de proyectos de mejora verde |
| `/sustainability/reports` | Admin | Resp. Sostenibilidad | Generación y descarga de reportes (ESG anual, CSRD, GRI, OTAs export) |
| `/sustainability/config` | Admin | Admin técnico | Configuración de objetivos, umbrales, factores de emisión per-país |
| Widget huésped `/guest/green` | Portal Huésped | Huésped | Sección sostenibilidad del hotel, opt-in no toallas, certificaciones visibles |
| Widget embebido HK | Portal HK | Gobernanta / HK | Contador opt-ins no toallas del día + KPI rápido agua de la semana |
| Widget embebido Mantto | Portal Mantto | Jefe Mantto | Formulario rápido de registro lectura contadores |

---

## 16. Riesgos conocidos y preguntas abiertas

| # | Riesgo / Pregunta | Severidad | Estado |
|---|---|---|---|
| 1 | **¿Es Core o Opt-in?** El catálogo lo modela como Core (siempre activo), pero un hotel boutique pequeño sin ningún empleado dedicado puede percibirlo como carga. ¿Se mantiene Core con modo simplificado (solo dashboard KPIs sin certificaciones) o se hace Opt-in? | Media | Abierta para Daniel |
| 2 | **Factores de emisión CO₂:** los factores nacionales (REE ES, CAMMESA AR) cambian anualmente. ¿Los actualiza el equipo de Bravas en un seed/config o los configura el tenant? | Media | Propuesta: actualización centralizada en cada release anual de Bravas + override per-tenant para contratos de energía renovable |
| 3 | **Integración IoT medidores:** hay decenas de proveedores de contadores inteligentes. En v1 solo registro manual. ¿Se prioriza algún proveedor concreto para la integración IoT en v2? | Baja | Pendiente roadmap v2 |
| 4 | **CSRD scope:** aplica a grandes empresas en 2024-2025. Para hoteleras boutique/pymes no es obligatorio hoy. ¿Se construye el módulo CSRD en v1 o se deja como feature futura? | Baja | Propuesta: modelo de datos preparado en v1, UI de exportación CSRD en v2 |
| 5 | **Multi-edificio / multi-hotel por tenant:** un tenant con varios hoteles bajo la misma organización necesita consumos por hotel + consolidado. ¿El scope de v1 es 1 hotel por tenant o multi-propiedad? | Alta | Dependiente de la decisión de multi-property en arquitectura core (ver arquitecto) |

---

## 17. Changelog del catálogo

| Fecha | Versión | Cambio | Autor |
|---|---|---|---|
| 2026-11-10 | v1.0 | Creación del catálogo completo. 23 funciones, 8 entidades, 17 secciones. | bravas |
