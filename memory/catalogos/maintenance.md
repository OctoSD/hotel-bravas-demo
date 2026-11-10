# Catálogo exhaustivo — Mantenimiento

> Ficha canónica del módulo Mantenimiento para el SaaS multi-tenant Bravas. Sigue la estructura de 17 secciones del `_TEMPLATE_catalogo_sector.md`. El módulo cubre mantenimiento correctivo, preventivo, guardia 24/7, y opcionalmente jardinería y piscina/áreas acuáticas (toggle resort).

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Mantenimiento / Engineering |
| **Nombre (es-AR)** | Mantenimiento / Servicios Técnicos |
| **Nombre (en)** | Maintenance / Engineering |
| **Código técnico** | `@octo/bravashotel-maintenance` |
| **Tipo** | Core (siempre activo en todo tenant) |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | `@octo/bravashotel-housekeeping` (HK reporta averías en habitaciones), `@octo/bravashotel-front-office` (FO reporta averías reportadas por huéspedes), `@octo/bravashotel-storeroom` (Economato provee repuestos y materiales), `@octo/bravashotel-hr` (personal de mantenimiento, turnos) |
| **Módulos dependientes de éste** | `@octo/bravashotel-security` (recibe OTs urgentes de Seguridad — llaves, fire panel), `@octo/bravashotel-housekeeping` (recibe estado de habitaciones bloqueadas por mantenimiento), `@octo/bravashotel-front-office` (recibe estado de habitaciones para disponibilidad), `@octo/bravashotel-guest-experience` (recibe incidencias de averías que afectan al huésped) |
| **Activación default** | Siempre activo |

---

## 2. Propósito del módulo

- **Qué resuelve:** gestionar integralmente las actividades de mantenimiento del hotel: recepción y gestión de órdenes de trabajo (OT) correctivas, ejecución de checklists preventivos programados (calderas, HVAC, ascensores, generadores, equipos de cocina, PCI), control de consumos energéticos (luz, agua, gas), gestión de inspecciones y certificaciones obligatorias, y coordinación con proveedores técnicos externos. Opcionalmente: jardinería y piscina/áreas acuáticas (toggle en onboarding).

- **Qué NO resuelve:** la gestión de proveedores generales del hotel (eso es Economato/Storeroom o Admin-CFO), la construcción u obras mayores de reforma (proyectos de CAPEX son Admin-CFO + Dirección), la seguridad física (eso es Seguridad), el mantenimiento de los vehículos propios del hotel si los tiene (sub-módulo no contemplado en v1).

- **Métrica principal de éxito del sector:** tiempo medio de resolución de OT correctiva (MTTR — Mean Time To Repair) + tasa de completitud de checklists preventivos programados. Objetivo: MTTR <4h para OTs urgentes, >95% de checklists completados a tiempo.

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Jefe del sector | Jefe de Mantenimiento | Jefe de Mantenimiento / Jefe de Servicios Técnicos | Director of Engineering / Chief Engineer | 2 | Director General / Director de Operaciones | Supervisores + técnicos + proveedores | En hoteles chicos puede ser también el técnico polivalente principal |
| Supervisor de turno | Supervisor de Mantenimiento | Supervisor de Mantenimiento | Maintenance Shift Supervisor | 3 | Jefe de Mantenimiento | Técnicos del turno | — |
| Técnico electricista | Técnico Electricista | Técnico Electricista | Electrician | 4 | Supervisor | — | Puede cubrir también automatismos en hoteles chicos |
| Técnico fontanero / plomero | Técnico Fontanero | Plomero / Gasista | Plumber | 4 | Supervisor | — | — |
| Técnico HVAC | Técnico de Climatización | Técnico de HVAC / Climatización | HVAC Technician | 4 | Supervisor | — | — |
| Técnico polivalente | Técnico Polivalente | Técnico Polivalente / Oficial de Mantenimiento | Multi-trade Technician | 4 | Supervisor | — | Perfil más común en 4* medio — cubre electricidad + fontanería básica + carpintería |
| Técnico guardia (nocturno/festivo) | Técnico de Guardia | Técnico de Guardia | On-call Maintenance Technician | 4 | Jefe de Mantenimiento (guardia pasiva) | — | Puede ser un técnico polivalente en rota |
| Jardinero (si toggle activo) | Jardinero / Encargado de Jardines | Jardinero | Groundskeeper / Gardener | 4 | Jefe de Mantenimiento | — | Solo si toggle jardín activo |
| Técnico de piscina (si toggle activo) | Técnico de Piscinas / Socorrista | Encargado de Piscinas / Bañero | Pool Technician / Lifeguard | 4 | Jefe de Mantenimiento | — | Solo si toggle piscina activo; en resorts puede ser equipo separado |

**Variantes por tamaño de hotel:**
- Boutique chico (<40 habs): 1 técnico polivalente + proveedores externos para especialidades. No hay guardia nocturna formal (teléfono de emergencias de guardia).
- Urbano 4* mediano: Jefe de Mantenimiento + 2-3 técnicos (electricidad, fontanería, polivalente) + guardia 24/7 en rotación.
- Resort 5* grande: Chief Engineer + 1-2 supervisores de turno + equipo de 8-15 técnicos especializados + jardinería + piscinas.
- En cadenas internacionales grandes (Peninsula, Marriott): Director of Engineering en nivel C con equipo de 20-30 personas.

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | no | — |
| Portal Operativo del sector | sí | lista de OTs activas, checklists del turno pendientes, órdenes prioritarias, registro de consumos energéticos, estado de equipos críticos |
| Portal Supervisor/Jefe | sí | gestión completa de OTs (crear, asignar, seguir, cerrar), calendario de preventivos, gestión de inspecciones y certificaciones, gestión de proveedores técnicos, control de consumos energéticos, reportes de mantenimiento |
| Portal Dirección | sí | KPIs de mantenimiento: MTTR, % checklists completados, habitaciones bloqueadas por mantenimiento, consumos energéticos (€/kWh/m3), próximas inspecciones obligatorias |
| **GX inbox (dual-fire)** | sí | eventos copiados a GX: avería que bloquea una habitación ocupada (impacta al huésped), avería en área común que afecta al servicio (piscina, ascensor, etc.), emergencias técnicas (corte de luz, fuga de agua en zona de huéspedes) |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Recepción de orden de trabajo (OT) correctiva | El sistema recibe una OT desde cualquier sector del hotel (HK, Recepción, Seguridad, F&B, etc.) o desde el propio equipo de mantenimiento. La OT incluye: descripción del problema, ubicación (habitación/área), urgencia, fotos adjuntas, solicitante | Cualquier sector (crea) / Jefe Mantto (recibe) | Operativo + Supervisor/Jefe | manual (desde cualquier sector) / automático (si se integra con BMS) | continua | core | sí (si habitación ocupada o área crítica) |
| 2 | Priorización y asignación de OT | El jefe o supervisor de mantenimiento revisa la OT entrante, le asigna prioridad (urgente/alta/media/baja), la asigna al técnico apropiado según especialidad y disponibilidad de turno | Jefe de Mantenimiento / Supervisor | Supervisor/Jefe | manual (tras recepción OT) | continua | core | no |
| 3 | Ejecución de OT correctiva (técnico en campo) | El técnico ve su lista de OTs asignadas en la app/tablet, ejecuta la reparación, registra: tiempo de trabajo, materiales usados (link a repuestos del Economato), solución aplicada, fotos del antes/después | Técnico | Operativo | manual | continua | core | no |
| 4 | Cierre de OT correctiva | Cuando la reparación está terminada, el técnico cierra la OT en el sistema. Si afectaba a una habitación bloqueada → notifica automáticamente a Recepción y HK para que la habitación vuelva a estar disponible | Técnico / Supervisor | Operativo | manual (reparación completada) | continua | core | sí (si habitación ocupada) |
| 5 | Reporte de OT no resuelta / escalada | Si el técnico no puede resolver la avería con medios propios (requiere proveedor externo especializado), escala la OT al Jefe de Mantenimiento. El jefe contacta al proveedor externo y registra el escalado | Técnico (escala) / Jefe (gestiona) | Operativo + Supervisor | manual | eventual | core | sí (si afecta servicio al huésped) |
| 6 | Creación de OT preventiva programada | El sistema genera automáticamente las OTs preventivas según el calendario de mantenimiento configurado: revisión diaria de HVAC, revisión semanal de piscina (si aplica), revisión mensual de ascensores, revisión trimestral de generadores | Sistema | automático (calendario) | automático | periódica según plan | core | no |
| 7 | Checklist preventivo — HVAC y climatización | Checklist de revisión del sistema de climatización: filtros, unidades de tratamiento de aire, condensadores, niveles de refrigerante, estado de termostatos. Registrado por turno | Técnico HVAC | Operativo | automático (calendario) / manual | semanal / mensual | core | no |
| 8 | Checklist preventivo — calderas y ACS | Revisión de calderas y sistema de agua caliente sanitaria: temperatura de ACS (obligatoria >60°C para Legionella), presiones, estado del quemador, purgas, válvulas de seguridad | Técnico fontanero / polivalente | Operativo | automático (calendario) | mensual / trimestral | core | no |
| 9 | Checklist preventivo — ascensores | Revisión periódica del estado de ascensores y montacargas: funcionamiento, luces de emergencia, puertas, foso, sala de máquinas. Coordina con empresa mantenedora certificada externa (obligatorio ES/AR) | Jefe de Mantenimiento | Supervisor/Jefe | automático (calendario) | mensual (interno) + según contrato empresa mantenedora | core | no |
| 10 | Checklist preventivo — sistema PCI (contra incendios) | Revisión de equipos de protección contra incendios: extintores (carga, fecha), BIE (bocas de incendio equipadas, presión), detectores de humo/calor, rociadores, señalización de salidas. Coordina con empresa PCI | Jefe de Mantenimiento / Técnico | Operativo + Supervisor | automático (calendario) | trimestral (interno) + anual (empresa PCI) | core | no |
| 11 | Checklist preventivo — grupo electrógeno / generador | Revisión del generador de emergencia: nivel de combustible, prueba de arranque semanal, estado de baterías, alternador, cuadro de transferencia automática | Técnico electricista | Operativo | automático (calendario) | semanal (prueba arranque) + mensual (revisión completa) | core | no |
| 12 | Checklist preventivo — instalación eléctrica | Revisión de cuadros eléctricos, protecciones, medición de tensiones, estado de tomas de corriente en zonas críticas (cocina, piscina), estado de alumbrado de emergencia | Técnico electricista | Operativo | automático (calendario) | mensual | core | no |
| 13 | Checklist preventivo — equipos de cocina | Revisión de equipos de cocina: hornos, freidoras, cámaras frigoríficas, lavavajillas industrial. Coordina con fabricante si requiere revisión oficial. Si detecta fallo de temperatura → notifica a Cocina | Técnico polivalente | Operativo | automático (calendario) | mensual | core | no |
| 14 | Checklist preventivo — piscinas y spa (si toggle activo) | Control de calidad del agua de piscina: pH, cloro libre, temperatura, turbidez. Revisión de filtros, bombas, skimmers. Registro conforme normativa (ES: RD 742/2013; AR: normativa municipal). Alerta si parámetros fuera de rango | Técnico de piscina | Operativo | automático (calendario) | diaria (análisis agua) + semanal (revisión equipos) | core (si activo) | sí (si piscina cerrada) |
| 15 | Checklist preventivo — jardinería (si toggle activo) | Revisión y mantenimiento de zonas verdes: poda programada, riego (manual o sistema automático), tratamientos fitosanitarios, estado de jardines y accesos exteriores | Jardinero | Operativo | automático (calendario) | semanal | importante (si activo) | no |
| 16 | Registro de consumo energético — electricidad | Lectura del contador de electricidad (manual o automática si hay integración con BMS/KNX). Registro del consumo en kWh. Sistema calcula consumo por período, costo estimado y tendencia | Técnico / Sistema | Operativo | manual (lectura) / automático (sensor) | diaria | importante | no |
| 17 | Registro de consumo energético — gas | Lectura del contador de gas (manual o automática). Registro en m3. Cálculo de consumo y costo. Alerta si hay variación anormal (posible fuga) | Técnico / Sistema | Operativo | manual / automático | diaria | importante | no |
| 18 | Registro de consumo energético — agua | Lectura del contador de agua. Registro en m3. Cálculo de consumo y costo. Alerta si hay variación anormal (posible fuga o rotura) | Técnico / Sistema | Operativo | manual / automático | diaria | importante | no |
| 19 | Alerta de consumo anómalo | Si el consumo de energía/agua supera un umbral definido (ej: +20% sobre la media del período equivalente), el sistema genera una alerta al Jefe de Mantenimiento y a Dirección para investigación | Sistema | automático | automático | continua | importante | no |
| 20 | Gestión de habitación bloqueada por mantenimiento | Cuando una habitación necesita reparación que impide su ocupación, el técnico/jefe la bloquea en el sistema. La habitación desaparece de los disponibles en Recepción. Al cerrar la OT, la habitación se desbloquea automáticamente | Jefe Mantto / Técnico | Supervisor/Jefe | manual | eventual | core | sí (si habitación estaba ocupada) |
| 21 | Gestión de proveedor técnico externo | Alta y mantenimiento del catálogo de proveedores técnicos: empresa ascensores, empresa PCI, instalador eléctrico autorizado, etc. Seguimiento de visitas, órdenes de servicio, facturas (link a Admin-CFO), certificados entregados | Jefe de Mantenimiento | Supervisor/Jefe | manual | continua | importante | no |
| 22 | Solicitud de visita de proveedor externo | Cuando una OT requiere intervención de proveedor externo, el Jefe de Mantenimiento genera una solicitud de visita: descripción, proveedor asignado, fecha programada. El sistema registra la cita y alerta al Jefe cuando se acerca la fecha | Jefe de Mantenimiento | Supervisor/Jefe | manual | eventual | importante | no |
| 23 | Registro de visita de proveedor externo | Tras la visita del proveedor: registro del trabajo realizado, resultado, materiales usados, número de albarán/factura (link a Admin-CFO), certificado entregado (adjunto PDF) | Jefe de Mantenimiento | Supervisor/Jefe | manual (tras visita) | eventual | importante | no |
| 24 | Gestión del inventario de activos (assets) | Registro del inventario de equipos del hotel: nombre, modelo, número de serie, ubicación, fecha de instalación, proveedor, contrato de mantenimiento, próxima revisión. Cada `asset` tiene su historial de OTs y checklists | Jefe de Mantenimiento | Supervisor/Jefe | manual (setup inicial + altas/bajas) | continua | core | no |
| 25 | Alta de nuevo activo | Cuando se instala un nuevo equipo, se da de alta en el inventario de assets: datos del equipo, garantía, manual técnico adjunto, configuración del plan preventivo | Jefe de Mantenimiento | Supervisor/Jefe | manual | eventual | importante | no |
| 26 | Baja de activo | Cuando un equipo es retirado o sustituido, se da de baja en el inventario. El historial se mantiene (audit trail). Se genera OT de baja para registrar la sustitución | Jefe de Mantenimiento | Supervisor/Jefe | manual | eventual | importante | no |
| 27 | Gestión del calendario de inspecciones obligatorias | El sistema mantiene el calendario de todas las inspecciones obligatorias del hotel con sus fechas de vencimiento: certificado energético, ITE (ES), revisiones de ascensores, revisiones eléctricas (REBT), RITE, habilitaciones municipales (AR). Alertas con 60/30/7 días de antelación | Sistema | automático (alertas) | automático | continua | core | no |
| 28 | Registro de resultado de inspección obligatoria | Tras una inspección, se registra el resultado: fecha, inspector, organismo, resultado (apto/apto con condiciones/no apto), acciones correctoras requeridas, adjunto del certificado. Si es no apto → alerta a Dirección | Jefe de Mantenimiento | Supervisor/Jefe | manual | eventual (tras inspección) | core | no |
| 29 | Gestión de pedidos de repuestos y materiales a Economato | Cuando una OT requiere materiales o repuestos, el técnico solicita al Economato los materiales necesarios. Si el Economato no tiene stock, genera pedido al proveedor | Técnico / Jefe Mantto | Operativo + Supervisor | manual | continua | importante | no |
| 30 | Inventario de repuestos críticos en taller | Gestión del pequeño stock de repuestos de emergencia que mantenimiento tiene en su propio taller (bombillas, fusibles, juntas, tornillería básica). Aviso cuando el stock de un ítem crítico está bajo | Jefe de Mantenimiento | Supervisor/Jefe | manual | continua | importante | no |
| 31 | Apertura de turno de mantenimiento | El técnico de guardia que entra registra su inicio de turno, revisa los partes del turno anterior (OTs abiertas, equipos en fallo), verifica el estado de los sistemas críticos (calderas, HVAC, generador, luces de emergencia) | Supervisor / Técnico guardia | Operativo | manual (inicio de turno) | 2-3 veces al día | core | no |
| 32 | Cierre de turno — parte de novedades | El técnico/supervisor de salida genera el parte de turno: OTs atendidas, OTs pendientes, estado de sistemas, observaciones. Firma digital. El turno entrante lo recibe automáticamente | Supervisor / Técnico guardia | Operativo | manual (fin de turno) | 2-3 veces al día | core | no |
| 33 | Gestión de guardia de mantenimiento (nocturno/festivo) | Configuración del técnico de guardia fuera del horario habitual: quién está de guardia, número de contacto, procedimiento de llamada. Si entra una OT urgente fuera de horario → el sistema alerta automáticamente al técnico de guardia | Jefe de Mantenimiento / Sistema | Supervisor/Jefe | automático (OT urgente fuera de horario) | continua (planificación) | core | sí (si es emergencia que afecta huéspedes) |
| 34 | Reporte mensual de mantenimiento | Informe consolidado mensual: OTs completadas vs abiertas, MTTR promedio, checklists preventivos completados vs programados, consumos energéticos, habitaciones bloqueadas, próximas inspecciones, costos de mantenimiento (repuestos + proveedores externos) | Jefe de Mantenimiento | Dirección | automático (EOM) | mensual | importante | no |
| 35 | Reporte de consumos energéticos por período | Comparativa de consumos (electricidad, agua, gas) por mes, trimestre y año. Visualización de tendencia. Cálculo de costo energético total. Benchmarks vs período equivalente anterior | Jefe de Mantenimiento | Dirección | automático (EOM) | mensual | importante | no |
| 36 | Integración con BMS/SCADA (si disponible) | Si el hotel tiene un sistema de gestión de edificios (BMS: KNX, Siemens Desigo, etc.) o SCADA, recibir datos de temperatura, consumos, estados de equipos automáticamente para alimentar el módulo sin registros manuales | Sistema | automático (API BMS) | automático | continua | importante (si activo) | no |
| 37 | Gestión de OTs urgentes desde Seguridad | El módulo Seguridad puede generar OTs urgentes a Mantenimiento: pérdida de llave maestra (cambio de cilindros), alarma técnica del fire panel, corte de suministro. Estas OTs tienen prioridad máxima y alertan al técnico de guardia | Sistema (desde Seguridad) | automático | automático (desde security event bus) | eventual | core | sí (si es emergencia general) |
| 38 | Certificación de operarios (ES: REBT, RITE / AR: habilitaciones) | Registro de las certificaciones y habilitaciones de los técnicos del equipo: carné de instalador eléctrico autorizado (ES: REBT), carné de instalaciones frigoríficas (ES: RITE), habilitaciones municipales (AR: GCBA). Alertas de vencimiento | Jefe de Mantenimiento | Supervisor/Jefe | manual + alertas automáticas | continua | importante | no |

### Sub-flujos clave (pseudocódigo simple)

```
Función: "Ciclo completo de OT correctiva — avería reportada por huésped"
1. Huésped reporta avería a Recepción: "el aire acondicionado de mi habitación no funciona" (Hab. 304)
2. Recepcionista crea OT en Bravas desde el Portal Front Office:
   - Tipo: correctiva
   - Ubicación: habitación 304
   - Descripción: "HVAC no funciona — huésped a bordo"
   - Urgencia: alta (habitación ocupada)
3. Sistema dual-fire: OT urgente en habitación ocupada → alerta en GX inbox
4. Sistema notifica al Jefe de Mantenimiento / Supervisor de turno
5. Supervisor asigna OT al técnico HVAC disponible
6. Técnico ve la OT en su app/tablet → se dirige a Hab. 304
7. Técnico diagnostica: filtro obstruido + válvula termostática bloqueada
8. Técnico registra en app: diagnóstico, materiales usados (filtro → link a Economato, ajuste de válvula → 0 material)
9. Técnico repara, verifica funcionamiento (temperatura correcta)
10. Técnico cierra OT: "reparado — tiempo: 45 min — solución: cambio filtro + desobstrucción válvula"
11. Sistema actualiza: Hab. 304 ya no tiene incidencia de mantenimiento
12. Sistema notifica a Recepción + GX: "Incidencia Hab. 304 resuelta"
13. GX puede seguir up con el huésped: "¿todo bien con el climatizador?"
14. MTTR calculado automáticamente: desde creación OT hasta cierre OT
```

```
Función: "Checklist preventivo — sistema PCI (contra incendios)"
1. Sistema genera automáticamente la tarea preventiva el primer lunes de cada mes:
   "Checklist mensual PCI — instalaciones hotel"
2. OT preventiva asignada al Jefe de Mantenimiento / Técnico habilitado
3. Técnico ejecuta el checklist en campo (pantalla de checklist en app):
   - [ ] Extintores zona recepción: fecha, carga OK/NO, precinto OK
   - [ ] Extintores zona cocina: fecha, carga OK/NO, precinto OK
   - [ ] BIE planta 1: manómetro, manguera, boquilla
   - [ ] BIE planta 2: (ídem)
   - [ ] Detectores humo escalera: test manual OK/NO
   - ... (todos los puntos configurados)
4. Para cada ítem: OK = tick, NO conforme = marca + foto + nota
5. Técnico cierra checklist con firma digital
6. Sistema genera PDF del checklist firmado (relevante para inspección oficial)
7. Si algún ítem es NO conforme: se genera OT correctiva automáticamente para ese elemento
8. Si se acerca la revisión anual obligatoria por empresa PCI certificada:
   → alerta 30 días antes al Jefe de Mantenimiento para coordinar visita del proveedor
```

```
Función: "Gestión de inspección obligatoria — ascensores (ES: MINISTERIO / AR: GCBA)"
1. Sistema mantiene el registro del ascensor como `asset` + `inspection_schedule`:
   - Próxima inspección OCA: 2027-02-15 (ES: organismo de control autorizado)
   - Próxima revisión empresa mantenedora: 2026-12-01
2. Sistema genera alertas automáticas:
   - 60 días antes: "Próxima inspección ascensor — OCA — 2027-02-15"
   - 30 días antes: (segunda alerta a Dirección también)
   - 7 días antes: (alerta urgente)
3. Jefe de Mantenimiento coordina con empresa mantenedora certificada:
   - Alta de solicitud de visita en Bravas
   - Fecha confirmada registrada
4. Día de la inspección:
   - Inspector de OCA/GCBA realiza la inspección
   - Jefe de Mantenimiento registra resultado: apto / condicionado / no apto
   - Adjunta certificado PDF en el `inspection_schedule`
5. Si apto: `inspection_schedule` actualizado con nueva fecha de vencimiento
6. Si no apto / condicionado: OT correctiva generada automáticamente + alerta a Dirección
7. Si se acerca fecha límite de subsanación y la OT no está resuelta: alerta escalada
```

```
Función: "Control de consumos energéticos con alerta de anomalía"
1. Cada día, el técnico de apertura registra las lecturas de los contadores:
   - Electricidad: 48.350 kWh (ayer: 48.200 → consumo: 150 kWh)
   - Agua: 1.240 m3 (ayer: 1.235 → consumo: 5 m3)
   - Gas: 920 m3 (ayer: 918 → consumo: 2 m3)
   O bien: si hay integración BMS → lectura automática
2. Sistema almacena en `energy_reading` con timestamp y operador
3. Sistema calcula consumo del día y compara con:
   - Media de los últimos 30 días (mismo día de semana)
   - Media del mismo período del año anterior
4. Si consumo de agua supera +30% sobre la media: alerta al Jefe de Mantenimiento
   "Alerta: consumo de agua anómalo hoy — 5 m3 vs media de 3.2 m3 — posible fuga"
5. Jefe investiga: revisa zonas de mayor consumo, envía técnico a revisar
6. Si se detecta fuga: OT correctiva urgente + reporte a Dirección
7. Sistema genera reportes mensuales con tendencias y costo estimado
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `work_order` | sí | consumer (HK, FO, Security crean) | organization_id, id, tipo (correctiva/preventiva/urgente/mejora), is_capex (bool default false), titulo, descripción, ubicacion_tipo (habitacion/area_comun/exterior/instalacion), ubicacion_id, urgencia (1-crítica/2-alta/3-media/4-baja), estado (recibida/asignada/en_ejecucion/escalada/cerrada/cancelada), creado_por_user_id, asignado_a_user_id, sector_origen, fecha_creacion, fecha_cierre, tiempo_ejecucion_min, solución TEXT, materiales_usados JSONB, fotos_antes JSONB, fotos_despues JSONB, costo_estimado | custom_fields JSONB | → `asset` (si afecta a equipo), → `inspection_schedule`, → `employee` (técnico), → `room` (FO), → `supplier_service` |
| `preventive_checklist` | sí | no | organization_id, id, nombre, descripción, asset_id (si es de equipo específico) / area_id, frecuencia (diaria/semanal/mensual/trimestral/anual), items JSONB (item_id, descripcion, tipo_respuesta: boolean/texto/numero, valor_min, valor_max), próxima_ejecucion_date, última_ejecucion_date, activo (bool), responsable_rol | custom_fields JSONB | → `asset`, → `work_order` (OT generada si fallo) |
| `asset` | sí | no | organization_id, id, nombre, categoría (hvac/caldera/ascensor/generador/pci/piscina/equipo_cocina/otro), marca, modelo, número_serie, ubicación, fecha_instalación, fecha_garantia_fin, proveedor_id, contrato_mantenimiento (bool), manual_tecnico_url, estado (operativo/en_mantenimiento/fuera_de_servicio/baja), próxima_revision_interna, notas | custom_fields JSONB | → `preventive_checklist`, → `work_order`, → `inspection_schedule`, → `supplier_service` |
| `inspection_schedule` | sí | no | organization_id, id, asset_id / instalacion_tipo, nombre_inspección, organismo_inspector (OCA/GCBA/RITE/REBT/municipal/etc), periodicidad_meses, ultima_inspection_date, proxima_inspection_date, resultado_ultima (apto/condicionado/no_apto/pendiente), certificado_url, alertas_dias JSONB (60/30/7), notas_legal | custom_fields JSONB | → `asset`, → `work_order` (si no apto) |
| `energy_reading` | sí | no | organization_id, id, tipo (electricidad/agua/gas), valor, unidad (kwh/m3/litros), fecha_hora, contador_id, lectura_manual (bool), operador_user_id, consumo_calculado (vs lectura anterior), notas | custom_fields JSONB | → `asset` (contador como asset) |
| `supplier_service` | sí | no | organization_id, id, proveedor_id, tipo_servicio, work_order_id (si aplica), fecha_visita, técnico_externo_nombre, trabajo_realizado TEXT, resultado, número_albaran, numero_factura, certificado_adjunto_url, costo, estado (solicitado/confirmado/realizado/facturado) | custom_fields JSONB | → `work_order`, → `asset`, → `inspection_schedule`, → proveedor (Economato/Admin) |

**Diagrama ER simplificado:**

```
work_order ──> asset ──< preventive_checklist
    │              └──< inspection_schedule ──> supplier_service
    ├──> room (FO — habitación bloqueada)
    ├──> employee (técnico asignado)
    └──> supplier_service (proveedor externo)

energy_reading ──> asset (contador)

work_order ←── (creado por) HK, FO, Security (via event bus)
work_order ──> (notifica cierre a) FO, HK, Security, GX
```

---

## 7. Máquinas de estado

```
work_order:
  RECIBIDA ──asignación a técnico──> ASIGNADA
  ASIGNADA ──técnico inicia trabajo──> EN_EJECUCION
  EN_EJECUCION ──requiere proveedor externo──> ESCALADA
  EN_EJECUCION ──reparación completada──> CERRADA
  ESCALADA ──proveedor resuelve──> CERRADA
  ESCALADA ──proveedor confirma visita──> ESPERANDO_PROVEEDOR
  ESPERANDO_PROVEEDOR ──visita realizada + resuelta──> CERRADA
  EN_EJECUCION ──no es posible resolver──> CANCELADA (con motivo)
  RECIBIDA ──cancelación por solicitante──> CANCELADA

Transiciones autorizadas por rol:
- Cualquier sector: RECIBIDA (crear OT)
- Jefe de Mantenimiento / Supervisor: RECIBIDA → ASIGNADA, escalado, cierre
- Técnico: ASIGNADA → EN_EJECUCION, EN_EJECUCION → CERRADA (con validación supervisor)
- Sistema: cierre automático de habitación liberada al cerrar OT

asset:
  OPERATIVO ──OT de mantenimiento iniciada──> EN_MANTENIMIENTO
  EN_MANTENIMIENTO ──OT resuelta──> OPERATIVO
  OPERATIVO ──falla grave / irreparable──> FUERA_DE_SERVICIO
  FUERA_DE_SERVICIO ──sustitución / reparación mayor──> OPERATIVO
  FUERA_DE_SERVICIO ──baja definitiva──> BAJA

inspection_schedule (resultado):
  PENDIENTE ──inspección realizada apto──> APTO
  PENDIENTE ──inspección realizada condicionado──> CONDICIONADO
  PENDIENTE ──inspección realizada no apto──> NO_APTO
  CONDICIONADO ──subsanaciones realizadas + re-inspección apto──> APTO
  NO_APTO ──subsanaciones + re-inspección apto──> APTO
  APTO ──nueva fecha programada automáticamente──> PENDIENTE (siguiente ciclo)
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| BMS KNX (gestión de edificio) | Building Management System | inbound (lecturas automáticas) | Opcional | Si el hotel tiene KNX instalado: lecturas automáticas de consumos, estados de HVAC, alertas de temperatura. Elimina registro manual |
| Siemens Desigo / Honeywell Building | BMS / SCADA | inbound | Opcional | Alternativas a KNX en instalaciones más complejas |
| Domotics / IoT energético | IoT energético | inbound | Opcional | Contadores inteligentes, sensores de agua, etc. |
| `@octo/bravashotel-storeroom` (Economato) | Módulo interno | bidireccional | Obligatorio | OTs solicitan materiales al Economato; Economato descuenta stock de repuestos al asignarlos a una OT |
| `@octo/bravashotel-housekeeping` | Módulo interno | bidireccional | Obligatorio | HK crea OTs al descubrir averías en habitaciones; Mantenimiento notifica a HK cuando habitación queda libre tras reparación |
| `@octo/bravashotel-front-office` | Módulo interno | bidireccional | Obligatorio | FO crea OTs desde reporte de huéspedes; Mantenimiento bloquea/desbloquea habitaciones en el PMS |
| `@octo/bravashotel-security` | Módulo interno | inbound | Obligatorio | Seguridad genera OTs urgentes (llaves, fire panel, emergencias) |
| `@octo/bravashotel-admin-cfo` | Módulo interno | outbound | Importante | Exporta costos de mantenimiento (proveedores + repuestos) para contabilidad; facturas de proveedores técnicos para A/P |
| `@octo/bravashotel-guest-experience` | Módulo interno | outbound (dual-fire) | Obligatorio | OTs en habitaciones ocupadas, emergencias que afectan al huésped |
| `@octo/bravashotel-hr` | Módulo interno | inbound | Obligatorio | Recibe datos de personal de mantenimiento (turnos, roles, certificaciones laborales) |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Gestión de OTs correctivas y preventivas | ✓ | | | | Universal |
| Inventario de activos | ✓ | | | | Universal |
| Consumos energéticos | ✓ | | | | Universal |
| Gestión de proveedores técnicos | ✓ | | | | Universal |
| Jardinería / Piscina (toggle) | ✓ | | | | Universal — toggle según tipo de hotel |
| Inspecciones de ascensores | | | | ✓ | ES: Reglamento de Aparatos de Elevación (RAE) + ITC-AEM 1; inspección periódica por OCA (organismo de control autorizado) según CCAA. AR: habilitación inicial y revisiones periódicas según municipio (GCBA: cada 2 años) |
| Certificado de eficiencia energética | | | ✓ | | ES: RD 390/2021 — edificios deben tener certificado energético vigente. Bravas: registro y vencimiento del certificado en `inspection_schedule` |
| ITE (Inspección Técnica de Edificios) | | | ✓ | | ES: municipios grandes exigen ITE periódica para edificios >50 años. Bravas: registro en calendario de inspecciones |
| REBT (Reglamento Electrotécnico Baja Tensión) | | | ✓ | | ES: RD 842/2002 — instalaciones eléctricas deben ser revisadas periódicamente por instalador autorizado. Carné de electricista REBT obligatorio para los técnicos propios en ES |
| RITE (Instalaciones Térmicas) | | | ✓ | | ES: RD 1027/2007 — HVAC y calderas deben ser revisadas periódicamente. Técnicos de instalaciones frigoríficas necesitan certificado F-Gas para equipos con refrigerantes |
| Legionella — control ACS (agua caliente sanitaria) | | | ✓ | | ES: RD 487/2022 — temperatura de ACS debe mantenerse >60°C para prevenir Legionella; inspecciones periódicas; Bravas: temperatura de ACS en checklist de calderas con límite crítico |
| Revisiones GCBA y habilitaciones municipales | | ✓ | | | AR (CABA): inspecciones municipales periódicas de instalaciones. Habilitación del establecimiento incluye aspectos estructurales y de instalaciones |
| Certificaciones antincendio GCBA Bomberos | | ✓ | | | AR (CABA): certificado de las instalaciones de protección contra incendios emitido por Bomberos o empresa habilitada. Bravas: registro en `inspection_schedule` |
| PRL / SyH — riesgos laborales en mantenimiento | | | | ✓ | ES: Ley 31/1995 PRL + normativas específicas de trabajo en altura, espacios confinados, electricidad. AR: Ley 19.587 SyH + normativas técnicas. Ambos exigen procedimientos de trabajo seguro |
| Certificación F-Gas (refrigerantes) | | | ✓ | | ES: Reglamento UE 517/2014 F-Gas → técnicos que manipulan equipos con HFCs necesitan certificado específico. Bravas: campo certificación en ficha de técnico |
| RIPCI (protección contra incendios) | | | ✓ | | ES: RD 513/2017 — mantenimiento periódico de extintores, BIE, detectores por empresa mantenedora certificada. AR: equivalente con habilitación de empresa PCI por GCBA Bomberos |

---

## 10. Slots de extensión (crítico para N2 + multi-tenant)

### 10.1 Campos custom por entidad

```
work_order.custom_fields: JSONB (ej: "número_de_expediente_OCA", "garantía_del_fabricante_activa")
asset.custom_fields: JSONB (ej: "potencia_kw", "refrigerante_tipo", "certificado_CE_url")
inspection_schedule.custom_fields: JSONB (ej: "número_expediente", "organismo_específico")
energy_reading.custom_fields: JSONB (ej: "tarifa_horaria", "período_punta_valle")
preventive_checklist.custom_fields: JSONB
```

### 10.2 Workflows custom

Hooks disponibles:
- `pre_work_order_close`: tenant puede requerir aprobación del Jefe antes de cerrar una OT de equipos críticos (calderas, ascensores, generador)
- `post_work_order_close` (habitación): trigger automático a HK para preparar la habitación + notificación a FO
- `post_inspection_schedule_non_conforme`: alerta inmediata a Dirección + generación de OT correctiva con fecha límite
- `post_energy_reading_anomaly`: tenant puede enviar SMS/email al director si hay anomalía de consumo
- `pre_asset_baja`: requerir aprobación del Director antes de dar de baja un activo de alto valor
- `post_work_order_create_urgent`: alertar al técnico de guardia por SMS/push si es fuera de horario

### 10.3 Integraciones per-tenant

- BMS/SCADA: KNX, Siemens Desigo, Honeywell, Schneider EcoStruxure, otro
- Contadores inteligentes: Circutor, Fluke, otro IoT compatible
- CMMS externo: si el hotel ya tiene un CMMS (ej: Hippo CMMS, UpKeep, Maintenance Connection) → integración via API para sincronizar OTs
- Gestión de proveedores: integración con el sistema de compras del Economato o Admin-CFO

### 10.4 Branding/UI per-tenant

- Nombre del módulo (ej: "Servicios Técnicos", "Ingeniería", "Engineering")
- Nomenclatura de tipos de OT (el tenant puede añadir categorías propias)
- Mapa del hotel para localización de activos y OTs

### 10.5 Idiomas

- Diccionario i18n del sector (tabla sección 11)
- Términos legales que varían entre ES y AR: "OCA" / "organismo habilitante", "REBT" / "instalación eléctrica habilitada"

---

## 11. Nomenclatura i18n (tabla de términos del sector)

| Término técnico | es-ES default | es-AR default | en default | Customizable por tenant |
|---|---|---|---|---|
| maintenance_manager | "Jefe de Mantenimiento" | "Jefe de Mantenimiento / Jefe de Servicios Técnicos" | "Chief Engineer" | ✓ |
| technician | "Técnico de Mantenimiento" | "Técnico de Mantenimiento / Oficial" | "Maintenance Technician" | ✓ |
| work_order | "Orden de Trabajo (OT)" | "Orden de Trabajo (OT)" | "Work Order (WO)" | ✓ |
| preventive_maintenance | "Mantenimiento Preventivo" | "Mantenimiento Preventivo" | "Preventive Maintenance" | ✓ |
| corrective_maintenance | "Mantenimiento Correctivo" | "Mantenimiento Correctivo" | "Corrective Maintenance" | ✓ |
| asset | "Activo / Equipo" | "Activo / Equipo" | "Asset / Equipment" | ✓ |
| checklist | "Checklist / Lista de Verificación" | "Checklist / Lista de Verificación" | "Checklist" | ✓ |
| hvac | "Climatización / HVAC" | "HVAC / Climatización" | "HVAC" | ✓ |
| boiler | "Caldera / ACS" | "Caldera / Termotanque" | "Boiler / Water Heater" | ✓ |
| elevator | "Ascensor" | "Ascensor / Elevador" | "Elevator / Lift" | ✓ |
| generator | "Grupo Electrógeno / Generador" | "Generador / Grupo Electrógeno" | "Generator" | ✓ |
| fire_protection | "PCI (Protección Contra Incendios)" | "Sistema Contra Incendios" | "Fire Protection System" | ✓ |
| energy_reading | "Lectura de Consumo Energético" | "Lectura de Consumo" | "Energy Reading" | ✓ |
| inspection | "Inspección" | "Inspección / Revisión" | "Inspection" | ✓ |
| oca | "OCA (Organismo de Control Autorizado)" | "Organismo Habilitante" | "Authorized Inspection Body" | ✓ |
| landscaping | "Jardinería" | "Jardinería" | "Landscaping / Grounds" | ✓ |
| pool | "Piscina" | "Pileta / Piscina" | "Pool" | ✓ |
| mttr | "TMPR (Tiempo Medio de Reparación)" | "TMPR" | "MTTR (Mean Time To Repair)" | — (término técnico) |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| Reglamento de Aparatos de Elevación (RAE) + ITC-AEM 1 | ES | Ascensores deben ser revisados periódicamente por OCA según CCAA (ej: cada 2 o 4 años según CCAA). Bravas: registro en `inspection_schedule` + alertas de vencimiento |
| RD 390/2021 — Certificación de eficiencia energética de edificios | ES | Edificios del sector terciario deben tener certificado energético vigente; renovación periódica. Bravas: registro y vencimiento del certificado |
| RD 842/2002 — REBT (Reglamento Electrotécnico de Baja Tensión) | ES | Instalaciones eléctricas deben ser revisadas por instalador autorizado cada 5-10 años según tipo. Técnicos propios que intervengan en instalaciones deben tener carné REBT. Bravas: `inspection_schedule` REBT + registro carné técnico |
| RD 1027/2007 — RITE (Reglamento de Instalaciones Térmicas) | ES | Instalaciones de climatización y ACS deben inspeccionarse periódicamente. Técnicos que manipulan refrigerantes necesitan certificado F-Gas. Bravas: checklist HVAC + inspecciones RITE + certificaciones técnicos |
| RD 487/2022 — Legionella | ES | ACS debe mantenerse >60°C en acumulación, >50°C en distribución. Revisiones y analíticas periódicas. Bravas: temperatura ACS en checklist calderas con límite crítico configurado |
| RD 513/2017 — RIPCI (Reglamento de instalaciones PCI) | ES | Extintores, BIE, detectores y rociadores deben ser mantenidos por empresa mantenedora autorizada. Revisiones: trimestrales, anuales, quinquenales. Bravas: `preventive_checklist` + `supplier_service` para empresa PCI + `inspection_schedule` |
| Ley 31/1995 PRL + RD 614/2001 (riesgo eléctrico) + RD 2177/2004 (trabajos en altura) | ES | Procedimientos de trabajo seguro para técnicos de mantenimiento. EPIs obligatorios. Bravas: check de EPIs en OTs de tipo eléctrico/altura |
| Habilitaciones municipales — GCBA | AR (CABA) | El establecimiento hotelero debe tener habilitación municipal vigente que incluye aspectos de instalaciones. Revisiones periódicas de GCBA. Bravas: registro en `inspection_schedule` |
| Certificaciones PCI — GCBA Bomberos | AR (CABA) | Las instalaciones de protección contra incendios deben ser verificadas y habilitadas por empresa certificada ante Bomberos GCBA. Bravas: `supplier_service` + `inspection_schedule` |
| Habilitaciones ascensores — GCBA / Provincia | AR | Revisiones periódicas de ascensores por empresa habilitada ante el organismo provincial o municipal. Bravas: `inspection_schedule` + alertas |
| Ley 19.587 SyH + RD 351/79 — Seguridad e Higiene | AR | Obligaciones de seguridad e higiene en el trabajo para el personal de mantenimiento. Responsable de SyH debe coordinar con el jefe de mantenimiento. Bravas: registro de incidentes laborales (integración con Security/RRHH) |
| Reglamento UE 517/2014 (F-Gas) | ES (UE) | Técnicos que trabajan con equipos de refrigeración con HFCs (aires acondicionados) necesitan certificado F-Gas. Bravas: campo certificación en ficha de técnico con alerta de vencimiento |
| Control de piscinas — RD 742/2013 | ES | Parámetros de calidad del agua de piscinas de uso público. Registros de pH, cloro, temperatura obligatorios. Inspecciones periódicas. Bravas: checklist preventivo de piscina con valores límite configurados (si toggle activo) |
| Control de piscinas — normativa municipal | AR | Cada municipio tiene su normativa de piscinas públicas (CABA, Mar del Plata, Mendoza, etc.). Parámetros de agua, socorristas. Bravas: template de checklist adaptable por municipio |

---

## 13. Dependencias del lifecycle del módulo

**Qué pasa si el módulo se ACTIVA después del hotel ya corriendo:**
- Datos iniciales requeridos (seed): inventario de activos del hotel (equipos, instalaciones), calendario de inspecciones obligatorias vigentes (con fechas de última y próxima inspección), proveedores técnicos contratados, usuarios del equipo de mantenimiento con roles
- Flujo de setup inicial: (1) crear inventario de activos (puede importarse desde Excel), (2) configurar checklists preventivos (Bravas puede traer templates por defecto para los checks estándar), (3) cargar inspecciones obligatorias pendientes, (4) configurar alertas de consumo energético (umbrales), (5) activar toggles opcionales (jardinería, piscina)
- Si el hotel ya tiene un CMMS: posibilidad de importar historial de OTs desde CSV

**Qué pasa si el módulo se DESACTIVA:**
- Datos que quedan: historial de OTs, checklists preventivos, registros de consumo energético, certificados de inspección
- Datos irrecuperables: configuración de alertas automáticas y checklists programados (se debe re-configurar si se reactiva)
- Procedimiento de archivo: exportar OTs abiertas a PDF/CSV con estado actual, exportar calendar de inspecciones obligatorias pendientes a PDF
- Módulos afectados: HK y FO pierden el flujo de OTs correctivas (crítico para operación diaria); Seguridad pierde las OTs urgentes automáticas

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| MTTR (Mean Time To Repair) | AVG(fecha_cierre_OT - fecha_creacion_OT) por prioridad | diaria / mensual | Portal Jefe + Dirección | Objetivo: urgente <2h, alta <4h, media <24h, baja <72h |
| OTs abiertas por prioridad | COUNT(work_order WHERE estado != cerrada/cancelada) GROUP BY urgencia | diaria | Portal Jefe | Objetivo: 0 urgentes, <5 altas |
| % checklists preventivos completados | completados / programados × 100 | mensual | Portal Jefe + Dirección | Objetivo: >95% |
| Habitaciones bloqueadas por mantenimiento | COUNT(rooms WHERE estado=mantenimiento) | diaria | Portal Dirección + FO | Objetivo: <5% del total; alert si >10% |
| Consumo de electricidad (kWh/día y €) | SUM(energy_reading WHERE tipo=electricidad) | diaria / mensual | Portal Jefe + Dirección | Variable; benchmarks por m2 de hotel y ocupación |
| Consumo de agua (m3/habitación ocupada) | SUM(energy_reading WHERE tipo=agua) / habitaciones_ocupadas | diaria / mensual | Portal Jefe + Dirección | Referencia: 200-400 litros/habitación/noche en hotel 4* |
| Inspecciones vencidas o próximas a vencer | COUNT(inspection_schedule WHERE próxima_fecha <= hoy+30) | semanal | Portal Jefe + Dirección (alerta) | Objetivo: 0 vencidas |
| Costo de mantenimiento por OT | total_costo_materiales + costo_proveedores / OTs_cerradas | mensual | Portal Dirección | Variable; referencia: 3-5% del revenue total en 4* |
| Tiempo medio de OT escalada a proveedor externo | AVG(fecha_resolución - fecha_escalada) | mensual | Portal Jefe | Referencia: <5 días hábiles para equipos no urgentes |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol que la ve | Función principal | Mockup existente |
|---|---|---|---|---|
| `/maintenance/dashboard` | Operativo + Supervisor | Jefe / Supervisor / Técnico | Vista general: OTs activas por prioridad, checklists del día, alertas de equipos, consumo energético del día | sí — demo/empleado-jefe-mantenimiento.html (parcial) |
| `/maintenance/work-orders` | Operativo + Supervisor | Todos los roles | Lista de OTs con filtros (estado, prioridad, tipo, fecha) | sí — demo/empleado-mantenimiento.html (parcial) |
| `/maintenance/work-orders/new` | Operativo | Técnico / cualquier sector | Formulario nueva OT correctiva | no |
| `/maintenance/work-orders/:id` | Operativo + Supervisor | Todos los roles | Detalle de OT: descripción, estado, materiales, fotos, timeline | no |
| `/maintenance/checklists` | Operativo | Técnico | Checklists del turno pendientes y en proceso | no |
| `/maintenance/checklists/:id` | Operativo | Técnico | Ejecución del checklist campo a campo con firma digital | no |
| `/maintenance/assets` | Supervisor | Jefe de Mantenimiento | Inventario de activos, estado, próximas revisiones | no |
| `/maintenance/assets/:id` | Supervisor | Jefe de Mantenimiento | Ficha del activo: historial de OTs, checklists, inspecciones | no |
| `/maintenance/inspections` | Supervisor | Jefe de Mantenimiento | Calendario de inspecciones obligatorias, estado, alertas | no |
| `/maintenance/energy` | Supervisor | Jefe de Mantenimiento | Registro y visualización de consumos energéticos: luz/agua/gas | no |
| `/maintenance/suppliers` | Supervisor | Jefe de Mantenimiento | Catálogo de proveedores técnicos, visitas programadas | no |
| `/maintenance/reports` | Supervisor + Dirección | Jefe + Director | Reportes: MTTR, OTs, consumos, costos, checklists | no |
| `/maintenance/pool` | Operativo (si toggle activo) | Técnico de piscina | Registro de parámetros de agua, estado de equipos de piscina | no |
| `/maintenance/grounds` | Operativo (si toggle activo) | Jardinero | Tareas de jardinería del día, registro de trabajos | no |

---

## 16. Riesgos conocidos y preguntas abiertas

- **Riesgo 1 — Variabilidad en normas de inspección por CCAA (ES):** las inspecciones de ascensores, instalaciones eléctricas y térmicas tienen periodicidades distintas según la CCAA. Bravas no puede tener un calendario único para España. Plan de mitigación: configuración por CCAA en tenant config; plantillas de `inspection_schedule` pre-cargadas por CCAA.
- **Riesgo 2 — Integración con BMS heterogéneos:** cada hotel puede tener un BMS diferente (KNX, Honeywell, Schneider, Siemens) o ninguno. Plan de mitigación: modo "sin BMS" (registro manual) como default; adaptadores por BMS como integraciones opcionales de pago.
- **Riesgo 3 — Gestión de rondas de guardia nocturna:** el técnico de guardia nocturna normalmente está en su casa y es activado por teléfono. Bravas necesita una forma de enviarle OTs urgentes que lleguen al móvil aunque no esté en el portal. Plan de mitigación: notificaciones push + SMS para OTs urgentes fuera de horario.
- **~~Pregunta 1 — ¿El módulo debe incluir la gestión de obras menores?~~** ✅ **RESUELTO por arquitecto 2026-11-10:** Sí, incluir categoría `mejora` en `work_order.tipo` con flag `is_capex BOOLEAN DEFAULT false`. Cubre la zona gris sin crear módulo nuevo. Las obras mayores (CAPEX) siguen en Admin-CFO + Dirección. Ya aplicado en §6.
- **~~Pregunta 2 — ¿El módulo de piscina como toggle dentro de Mantenimiento o módulo Resort/Grounds separado?~~** ✅ **RESUELTO por arquitecto 2026-11-10:** Piscina queda como toggle dentro de `@octo/bravashotel-maintenance`. El técnico de piscina reporta al Jefe de Mantenimiento y comparte inventario de activos. Si en el futuro un resort grande necesita `@octo/bravashotel-grounds` con su propio equipo y P&L, se extrae entonces. Principio ODD: no crear módulos para hipotéticos.

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación inicial del catálogo — v1.0 | bravas |
| 2026-11-10 | Preguntas §16 resueltas por arquitecto (mejora/is_capex + piscina como toggle) | bravas |
