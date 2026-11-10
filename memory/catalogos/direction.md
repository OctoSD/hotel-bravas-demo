# Catálogo — Dirección General
> **Nombre del producto:** BravasHotel (placeholder — pendiente nombre comercial definitivo)
> **Versión del catálogo:** v1.0 — 2026-11-10 · **Autor:** bravas

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Dirección General |
| **Nombre (es-AR)** | Dirección General / Gerencia General |
| **Nombre (en)** | General Management / Hotel Management |
| **Código técnico** | `@octo/bravashotel-direction` |
| **Tipo** | Core — siempre activo en todo tenant |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | ninguna — es el módulo raíz |
| **Módulos dependientes de éste** | todos los demás — cada sector reporta a Dirección |
| **Activación default** | Siempre activo |

---

## 2. Propósito del módulo

**Qué resuelve:** la capa de coordinación y visibilidad ejecutiva del hotel. El Director General (DG / GM) necesita ver el estado operativo de todos los sectores en tiempo real, gestionar KPIs estratégicos, comunicarse con sus jefes de departamento, aprobar decisiones cross-sector (upgrades VIP, emergencias, decisiones financieras), y tener una agenda diaria integrada con las operaciones del hotel.

**Qué NO resuelve:** no es un módulo de operaciones — no gestiona habitaciones, ni nóminas, ni pedidos de cocina. Eso lo hace cada sector. La Dirección consume el resumen de todos esos módulos. No reemplaza al Board/dueños (eso es externo al sistema).

**Métrica principal de éxito del sector:** RevPAR (Revenue per Available Room) como indicador integrador de ocupación + precio promedio. Secundario: NPS/satisfacción del huésped, EBITDA mensual.

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Director General | Director General | Director/Gerente General | General Manager (GM) | 1 | Propietario / Board | todos los jefes de dept | — |
| Subdirector Operaciones | Director de Operaciones | Gerente de Operaciones | Director of Operations | 2 | GM | FO + HK + F&B + Mantto | solo en 4-5* grandes |
| Asistente de Dirección | Asistente de Dirección | Asistente de Gerencia | Executive Assistant | 3 | GM | — | frecuente en boutique |

**Variantes por tamaño de hotel:**
- **Boutique chico (20-40 habs):** GM = propietario o gerente único. No hay subdirector. El asistente puede ser recepcionista senior con funciones de coordinación.
- **Urbano 4* (80-150 habs):** GM dedicado profesional + posible subdirector de operaciones. Executive Committee formal (reunión semanal de jefes).
- **Resort 5* / cadena:** GM + Executive Committee (6-8 directores) + cluster GM si es cadena.

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | no directo | — |
| Portal Operativo del sector | sí | dashboard ejecutivo del GM (KPIs en tiempo real de todos los sectores) |
| Portal Supervisor/Jefe | sí | el GM es el jefe máximo — su dashboard de jefe es el más completo |
| Portal Dirección | sí — es el dueño de este portal | reportes consolidados, aprobaciones, agenda |
| **GX inbox (dual-fire)** | sí | el GM recibe escalaciones de Guest Experience (quejas VIP, incidentes graves) |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Dashboard ejecutivo tiempo real | Vista consolidada de ocupación actual, RevPAR del día, satisfacción, incidencias abiertas, cash position | GM | Dirección | automático (live) | continua | core | no |
| 2 | Morning briefing | Reporte automático del cierre del día anterior + preview del día actual (llegadas, salidas, eventos, staff presente) | GM | Dirección | automático (07:00 AM configurable) | diaria | core | no |
| 3 | Revisión de forecast | Comparación budget vs actual por semana/mes. Alertas de desviación | GM | Dirección | automático (lunes) | semanal | core | no |
| 4 | Aprobación de upgrades | GM aprueba o rechaza upgrade de habitación solicitado por Recepción (VIP, cliente frecuente, honeymoon) | GM | Dirección | evento (solicitud FO) | eventual | core | sí |
| 5 | Gestión de incidentes críticos | Incidentes que superan la capacidad del jefe de dept (emergencia médica, incendio, cliente agresivo, fuga de agua grave) | GM | Dirección | evento (escalación) | eventual | core | sí |
| 6 | Comunicación interna con jefes | Chat grupal (Executive Committee) + 1-a-1 con cada jefe de dept | GM | Dirección | manual | continua | core | no |
| 7 | Agenda diaria integrada | Calendario del GM con reuniones, visitas, check-ins VIP, eventos del hotel, deadlines contractuales | GM | Dirección | manual + automático | continua | core | no |
| 8 | Revisión de satisfacción del huésped | Dashboard de NPS, reviews (Google, TripAdvisor, Booking), quejas, cumplidos. Alertas si rating baja | GM | Dirección | automático (nuevo review) | continua | core | sí |
| 9 | Aprobación de compras de alto valor | Órdenes de compra por encima del límite del Economato (configurable por tenant) | GM | Dirección | evento (solicitud Economato) | eventual | core | no |
| 10 | Revisión financiera mensual | P&L del mes, comparativa presupuesto, análisis por departamento, proyección | GM + CFO | Dirección | automático (día 5 de mes siguiente) | mensual | core | no |
| 11 | Configuración del tenant | Activar/desactivar módulos (packs), configurar i18n, cambiar branding, ajustar flags per-tenant | GM / Admin | Dirección (admin) | manual | eventual | core | no |
| 12 | Gestión del perfil del hotel | Nombre del hotel, categoría (estrellas), dirección, horarios, amenities, política de cancelación | GM | Dirección | manual | eventual | core | no |
| 13 | Comunicado a staff | Mensaje general a todo el personal (o por sector) desde Dirección | GM | Dirección | manual | eventual | importante | no |
| 14 | Reporte de estado habitaciones | Mapa visual de habitaciones: ocupada/libre/en limpieza/bloqueada. Resumen de arrivals/departures del día | GM | Dirección | automático (live) | continua | importante | no |
| 15 | Revisión de quejas formales | Quejas recibidas por escrito (email, formulario web). GM firma la respuesta en casos críticos | GM | Dirección | evento (escalación GX) | eventual | importante | sí |
| 16 | Seguimiento de formaciones | Qué empleados tienen formaciones pendientes (PRL vencidos, manipulación alimentos, etc.) | GM | Dirección | automático (alerta) | semanal | importante | no |
| 17 | Revisión de compliance | Alertas de vencimientos: certificaciones, seguros, licencias municipales, permisos, habilitaciones | GM | Dirección | automático (alerta anticipada) | continua | core | no |
| 18 | Gestión de VIPs | Lista de huéspedes VIP con historial, preferencias, próximas estancias. Protocolo de atención personalizado | GM | Dirección | automático (check-in VIP) | eventual | importante | sí |
| 19 | Objetivos por departamento | Definir y trackear KPIs mensuales/anuales por sector (HK: habitaciones tiempo ≤ X min, F&B: ticket promedio, etc.) | GM | Dirección | manual (setting) | mensual | importante | no |
| 20 | Reporte de personal activo | Cuántas personas en cada turno, cobertura por sector, alertas de understaffing | GM | Dirección | automático (live) | continua | importante | no |
| 21 | Decisión de overbooking | Cuando Revenue pide autorización para aceptar reserva sobre ocupación máxima | GM | Dirección | evento (solicitud Comercial) | eventual | core | no |
| 22 | Gestión de emergencias protocolo | Activar protocolo de emergencia (incendio, evacuación, amenaza) que notifica a todos los sectores en cadena | GM | Dirección | manual (pánico) | eventual | core | sí |
| 23 | Firma digital de documentos | Contratos, acuerdos con proveedores, notas de crédito, comunicaciones oficiales (dentro del módulo) | GM | Dirección | manual | eventual | importante | no |
| 24 | Revisión de cuentas por cobrar aging | Facturas pendientes de cobro por cliente (empresas, agencias) con días de aging | GM + CFO | Dirección | automático (semanal) | semanal | importante | no |
| 25 | Benchmarking externo | Comparativa de RevPAR del hotel vs benchmark de plaza (si integración con STR o RateGain) | GM | Dirección | automático (disponible) | semanal | nice | no |
| 26 | Aprobación de descuentos especiales | Autorizar descuento fuera del rango automático de Revenue Management | GM | Dirección | evento (solicitud Comercial) | eventual | core | no |
| 27 | Revisión de auditoría | Leer reporte de auditoría nocturna: balanceo, errores de carga, discrepancias | GM | Dirección | automático (mañana) | diaria | importante | no |
| 28 | Agenda de visitas de inspección | Visitas de inspección sanitaria, municipal, PCI, cadena (si aplica). Recordatorio + checklist previo | GM | Dirección | automático (alerta) | eventual | importante | no |
| 29 | Resumen de canales de venta | Distribución de reservas por canal (Booking.com, Expedia, directo web, teléfono, grupos) del mes | GM | Dirección | automático (mensual) | mensual | importante | no |
| 30 | Alta de nuevos usuarios del sistema | El GM (o admin técnico) da de alta nuevos empleados en el sistema y asigna rol/portal | GM | Dirección (admin) | manual | eventual | core | no |

### Sub-flujos clave

```
Flujo: escalación de incidente crítico
1. Empleado (cualquier sector) reporta incidente tipo "crítico" en su portal
2. Sistema clasifica: nivel 1 (jefe de dept) / nivel 2 (GM) / nivel 3 (protocolo emergencia)
3. Si nivel 2: notificación push a GM + jefe del sector involucrado
4. GM acepta, comenta y asigna resolución o escala a protocolo de emergencia
5. Incidente queda documentado con timestamp y acciones tomadas
6. Si involucra huésped: GX inbox recibe copia (dual-fire)
7. Cierre del incidente: GM firma el cierre con nota de resolución

Flujo: morning briefing
1. Sistema (02:00 AM) consolida datos del día anterior: ocupación final, ingresos, satisfacción, incidentes
2. Sistema genera reporte automático + preview del día actual (arrivals, departures, eventos en agenda)
3. A las 07:00 AM (configurable) llega notificación push al GM + email
4. GM revisa en su portal, puede agregar comentarios/instrucciones para los jefes
5. Jefes de dept reciben el briefing del GM + tienen acceso al reporte completo
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `tenant` | sí | — | id, name, country, stars, locale, packs_enabled | custom_fields JSONB | → `user` |
| `hotel_user` | sí | — | id, organization_id, name, email, role, sector, status | preferences JSONB | → `organizations`, `sector` |
| `incident` | sí | — | id, organization_id, type, severity, sector_origin, description, status, assignee | custom_fields JSONB | → `organizations`, `hotel_user` |
| `announcement` | sí | — | id, organization_id, title, body, target_sectors, created_by | — | → `organizations` |
| `kpi_snapshot` | sí | — | id, organization_id, date, revpar, adr, occupancy, nps, source | — | → `organizations` |
| `compliance_alert` | sí | — | id, organization_id, type, description, due_date, status | — | → `organizations` |

**Diagrama ER simplificado:**

```
tenant ──< hotel_user
  │
  ├──< incident
  ├──< announcement
  ├──< kpi_snapshot
  └──< compliance_alert
```

---

## 7. Máquinas de estado

```
incident:
  OPEN ──assigned──> IN_PROGRESS
  IN_PROGRESS ──resolved──> PENDING_CLOSE
  PENDING_CLOSE ──gm_sign──> CLOSED
  IN_PROGRESS ──escalated──> ESCALATED
  ESCALATED ──emergency_protocol──> EMERGENCY_ACTIVE
  EMERGENCY_ACTIVE ──resolved──> CLOSED

hotel_user:
  ACTIVE → SUSPENDED (manual GM) → ACTIVE
  ACTIVE → OFFBOARDED (baja de RRHH) [terminal]
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| STR Global / RateGain | Benchmarking RevPAR | inbound | opcional | Comparativa plaza competitiva |
| Google Business API | Reviews | inbound | opcional | Recibir y responder reviews desde el sistema |
| TripAdvisor API | Reviews | inbound | opcional | Recibir reviews |
| Booking.com Partner API | Reputación | inbound | opcional | Ratings y comentarios |
| Email (Resend) | Comunicaciones | outbound | obligatorio | Morning briefing, alertas compliance |
| Push notifications | Alertas móvil | outbound | obligatorio | Incidentes críticos, escalaciones VIP |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Dashboard ejecutivo | ✓ | | | | |
| Morning briefing | ✓ | | | | |
| Gestión de incidentes | ✓ | | | | |
| Compliance alerts | | | | ✓ | AR: AFIP, habilitaciones municipales, ART. ES: AEAT, habilitaciones autonómicas, certificaciones PCI |
| Revisión financiera | | | | ✓ | Términos fiscales diferentes (ver admin-cfo) |
| Firma digital documentos | | | | ✓ | AR: firma digital no obligatoria salvo recibos de sueldo (Decreto 407/2026). ES: firma electrónica (Reglamento eIDAS) |
| Gestión VIPs | ✓ | | | | |
| Protocolo emergencias | | | | ✓ | AR: Bomberos GCBA, Defensa Civil. ES: 112, Protección Civil |

---

## 10. Slots de extensión

### 10.1 Campos custom por entidad

```
tenant.custom_fields: JSONB
  → configuración específica del hotel (layout del dashboard personalizado, 
    campos propios del corporativo si es cadena, etc.)
incident.custom_fields: JSONB
  → tipos de incidente propios del hotel
```

### 10.2 Workflows custom

Hooks disponibles:
- `post_incident_created` — tenant puede configurar escalaciones automáticas a su propio sistema de gestión
- `pre_announcement_sent` — tenant puede agregar aprobadores adicionales
- `post_kpi_snapshot` — tenant puede trigger reportes propios a sistemas externos (BI, cadena)

### 10.3 Integraciones per-tenant

- Sistema de gestión de cadena (PMS central de cadena, ej: Opera Cloud, Cloudbeds central) — webhook outbound
- BI corporativo (PowerBI, Tableau) — export periódico
- Sistema de tickets de mantenimiento externo (si el hotel ya usa uno — ej: Unifocus, HotSOS)

### 10.4 Branding/UI per-tenant

- Nombre del hotel en todos los portales
- Logo del hotel
- Colores primarios (sobreescriben el design system base)
- Nomenclatura del GM ("Director General" / "General Manager" / "Gerente")

### 10.5 Idiomas

- es-ES (default España), es-AR (default Argentina), en (disponible, no activado por default)
- Tenant puede sobreescribir cualquier string del módulo en su diccionario i18n

---

## 11. Nomenclatura i18n

| Término técnico | es-ES default | es-AR default | en default | Customizable |
|---|---|---|---|---|
| general_manager | "Director General" | "Director General" / "Gerente General" | "General Manager" | ✓ |
| operations_director | "Director de Operaciones" | "Gerente de Operaciones" | "Director of Operations" | ✓ |
| executive_committee | "Comité Ejecutivo" | "Comité de Dirección" | "Executive Committee" | ✓ |
| morning_briefing | "Informe de mañana" | "Briefing matutino" | "Morning Briefing" | ✓ |
| incident | "Incidencia" | "Incidente" | "Incident" | ✓ |
| vip_guest | "Huésped VIP" | "Huésped VIP" | "VIP Guest" | ✓ |
| kpi_revpar | "RevPAR" | "RevPAR" | "RevPAR" | no |
| upgrade | "Upgrade de habitación" | "Upgrade de habitación" | "Room Upgrade" | ✓ |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| RGPD / Reglamento UE 2016/679 | UE/ES | datos personales de huéspedes y empleados en logs de incidentes |
| Ley 25.326 AR | AR | protección de datos personales |
| LGPD / normativas locales LATAM | LATAM | según jurisdicción |
| Reglamento eIDAS | UE/ES | firma electrónica válida en documentos |
| Decreto 407/2026 AR | AR | recibos de sueldo digitales con firma digital |
| Ley 24.192 / ordenanzas municipales AR | AR | habilitación de establecimientos, compliance de seguridad |
| LGSS / normativas autonómicas ES | ES | habilitaciones hoteleras, categorización por estrellas |

---

## 13. Dependencias del lifecycle del módulo

**Si el módulo se ACTIVA** (es el módulo inicial, siempre está desde el setup):
- Seed obligatorio: tenant record, primer usuario GM (admin), configuración idioma/país.
- Flujo de setup: wizard de onboarding del hotel (4 pasos: nombre + categoría + país + primeros módulos activos).

**Si el módulo se DESACTIVA:** no puede desactivarse — es el módulo raíz del tenant. Desactivarlo = eliminar el tenant.

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| RevPAR | Revenue habitaciones / habitaciones disponibles | diaria | Dashboard GM | Varía por plaza. Referencia LATAM: USD 60-150/noche |
| ADR (Average Daily Rate) | Revenue habitaciones / habitaciones vendidas | diaria | Dashboard GM | — |
| Occupancy % | Habitaciones vendidas / disponibles | diaria | Dashboard GM | 70-75% urbano, 80%+ temporada alta |
| NPS (Net Promoter Score) | % promotores − % detractores | continua (cada review) | Dashboard GM + GX | >50 = bueno en hostelería |
| RevPAR Index (MPI) | RevPAR propio / RevPAR plaza | semanal | Dashboard GM (si integración STR) | >1.0 = mejor que la plaza |
| EBITDA | Calculado desde CFO | mensual | Revisión financiera | — |
| Staff ratio | Empleados / habitación disponible | mensual | Dashboard GM | Boutique: 0.5; 5* resort: 1.5+ |
| Incidentes por mes | Count incidentes nivel 2+ | mensual | Dashboard GM | — |
| Compliance alerts open | Count alertas abiertas | continua | Dashboard GM | 0 ideal |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol | Función principal | Mockup existente |
|---|---|---|---|---|
| `/admin` | Dirección | GM | Dashboard ejecutivo con KPIs y estado de todos los sectores | sí — `mockup/v2.5/admin.html` |
| `/admin/incidents` | Dirección | GM | Listado y gestión de incidentes | pendiente |
| `/admin/vips` | Dirección | GM | Lista de VIPs + historial | pendiente |
| `/admin/compliance` | Dirección | GM | Alertas de vencimiento de compliance | pendiente |
| `/admin/settings` | Dirección | GM + Admin | Configuración del tenant (módulos, i18n, branding) | pendiente |
| `/admin/announcements` | Dirección | GM | Redactar y enviar comunicados al staff | pendiente |
| `/admin/reports/financial` | Dirección | GM + CFO | Revisión financiera mensual | pendiente |

---

## 16. Riesgos conocidos y preguntas abiertas

- **Riesgo 1:** el dashboard ejecutivo puede saturarse de información si todos los módulos envían KPIs. Mitigación: diseño con widgets configurables, priorización por rol (GM vs Subdirector).
- **Riesgo 2:** el setup del wizard de onboarding puede volverse largo si hay muchas opciones (packs, idioma, módulos). Mitigación: flujo por defecto "hotel 4* urbano AR/ES" pre-configurado, opciones avanzadas en un paso separado.
- **Pregunta abierta 1:** ¿el GM puede ver en tiempo real los chats internos de otros sectores, o solo los escalados? → arquitecto / Daniel.
- **Pregunta abierta 2:** ¿wizard de onboarding lo gestiona el GM directamente o hay una "sesión de setup" con el equipo BravasHotel? → estratega / Daniel.

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación inicial del catálogo basado en investigación + relevamiento | bravas |
