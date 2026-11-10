# Catálogo exhaustivo — Seguridad

> Ficha canónica del módulo Seguridad para el SaaS multi-tenant Bravas. Sigue la estructura de 17 secciones del `_TEMPLATE_catalogo_sector.md`.

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Seguridad |
| **Nombre (es-AR)** | Seguridad |
| **Nombre (en)** | Security / Loss Prevention |
| **Código técnico** | `@octo/bravashotel-security` |
| **Tipo** | Core (obligatorio en 4*+) |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | `@octo/bravashotel-hr` (personal interno), `@octo/bravashotel-maintenance` (integración fire panel + alarmas técnicas), `@octo/bravashotel-front-office` (acceso a registros de huéspedes, control de llaves) |
| **Módulos dependientes de éste** | `@octo/bravashotel-hr` (recibe incidentes PRL), `@octo/bravashotel-guest-experience` (recibe eventos de incidentes que impactan al huésped), todos los módulos reciben alertas de emergencia del event bus |
| **Activación default** | Opt-in en onboarding (obligatorio para 4*+; en boutique <40 habs puede desactivarse con advertencia legal) |

---

## 2. Propósito del módulo

- **Qué resuelve:** gestionar integralmente la seguridad física del hotel: vigilancia perimetral, monitoreo CCTV, control de accesos, gestión del panel contra incendios, prevención de pérdidas (loss prevention), coordinación de emergencias y registro de incidentes. Cubre dos modos de operación: "tercerizado" (1 coordinador interno + proveedor externo tipo Prosegur/Securitas/G4S) e "interno" (plantilla completa de vigilantes en nómina del hotel). El modo se configura en el onboarding del tenant.

- **Qué NO resuelve:** gestión de salud laboral/medicina del trabajo (eso es RRHH), mantenimiento de los equipos físicos de seguridad como cámaras o paneles (eso es Mantenimiento), gestión de seguros patrimoniales (eso es Admin-CFO), logística de control de llaves mecánicas de habitaciones (eso es Front Office y Housekeeping para llaves de huésped).

- **Métrica principal de éxito del sector:** tasa de incidentes de seguridad por mes (objetivo: tendencia a cero en pérdidas y zero daños a huéspedes y empleados) + tiempo medio de respuesta ante alarma (objetivo <3 minutos en zonas internas).

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Jefe del sector | Jefe de Seguridad | Jefe de Seguridad | Chief Security Officer / Head of Security | 2 | Director General | Supervisores y vigilantes | En boutiques chicos puede reportar a Director de Operaciones |
| Coordinador (modo tercerizado) | Coordinador de Seguridad | Coordinador de Seguridad | Security Coordinator | 2 | Director General | Proveedor externo (Prosegur/Securitas) | Rol único en modo tercerizado — no hay plantilla interna adicional |
| Supervisor de turno | Supervisor de Seguridad | Supervisor de Seguridad | Security Shift Supervisor | 3 | Jefe de Seguridad | Vigilantes del turno | Solo en modo interno |
| Operador CCTV | Operador de Sala de Control | Operador de Sala de Control | CCTV Operator | 4 | Supervisor de turno | — | Puede combinar con vigilante en hoteles chicos |
| Vigilante | Vigilante de Seguridad | Vigilante de Seguridad | Security Guard | 4 | Supervisor de turno | — | En modo tercerizado este rol lo provee la empresa externa |
| Director de Prevención de Pérdidas | Director de Loss Prevention | Director de Loss Prevention | Director of Loss Prevention | 2 | Director General | Todo el dept | Solo en 5* grandes; reemplaza al Jefe de Seguridad |

**Variantes por tamaño de hotel:**
- Boutique chico (<40 habs): seguridad a cargo de Recepción (cámaras básicas) o empresa de alarmas. No hay sector formal.
- Urbano 4* mediano: modo tercerizado (coordinador interno + Prosegur/Securitas 24/7).
- Urbano 5* y resort: modo interno con Jefe de Seguridad + 1-2 supervisores de turno + 4-8 vigilantes + operador CCTV.
- 5* grande / cadena: Director of Loss Prevention como reemplaza al Jefe, con asistente y equipo de prevención de pérdidas específico.

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | no | — |
| Portal Operativo del sector | sí | dashboard de rondas activas, alertas CCTV, estado de zonas de acceso, registro de incidentes, gestión de llaves maestras, estado del fire panel |
| Portal Supervisor/Jefe | sí | listado de incidentes abiertos/cerrados, gestión de patrullas, configuración de zonas de acceso, asignación de guardias, reportes de turno, órdenes de trabajo hacia Mantenimiento |
| Portal Dirección | sí | KPIs de seguridad (incidentes por período, tiempo de respuesta, estado de inspecciones obligatorias), alertas críticas |
| **GX inbox (dual-fire)** | sí | eventos que se copian a GX: cualquier incidente que involucre a un huésped (robo, daño en habitación, conflicto), evacuaciones |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Apertura de turno de seguridad | Recepción del turno: briefing, revisión de incidentes pendientes del turno anterior, asignación de zonas de patrulla, verificación del estado del fire panel | Supervisor de turno | Operativo | manual al inicio de turno | 3 veces al día (turnos 8h) | core | no |
| 2 | Cierre de turno y parte de novedades | Generación automática del reporte de turno: incidentes ocurridos, rondas completadas, estado de accesos, observaciones. Firma digital del supervisor saliente | Supervisor de turno | Operativo | manual al cierre de turno | 3 veces al día | core | no |
| 3 | Ronda de patrulla programada | El vigilante ejecuta una ronda por checkpoints definidos. El sistema requiere confirmación en cada checkpoint (NFC/QR en puntos físicos del hotel). Genera log de ronda | Vigilante | Operativo (móvil) | automático (horario) | cada 1-2 horas 24/7 | core | no |
| 4 | Ronda de patrulla no programada (aleatoria) | El supervisor puede emitir una ronda no programada por zona específica ante sospecha o situación anómala | Supervisor de turno | Operativo | manual | eventual | importante | no |
| 5 | Monitoreo CCTV en tiempo real | Visualización del feed de cámaras desde la sala de control. El operador puede marcar eventos, hacer zoom, cambiar entre cámaras. Sistema puede generar alertas automáticas (movimiento en zonas restringidas fuera de horario) | Operador CCTV | Operativo | continuo | continua 24/7 | core | no |
| 6 | Captura y etiquetado de clip CCTV | Ante un evento, el operador captura un clip de la cámara relevante, lo etiqueta con metadatos (zona, hora, tipo de incidente, descripción) y lo asocia a un registro de incidente | Operador CCTV | Operativo | manual (evento) | eventual | core | no |
| 7 | Registro de incidente de seguridad | Creación de un `security_incident`: tipo de incidente, zona, personas involucradas, descripción, medidas tomadas, adjuntos (fotos, clips). Genera ticket para seguimiento | Vigilante / Supervisor | Operativo | manual (evento) | eventual | core | sí (si involucra huésped) |
| 8 | Gestión y seguimiento de incidente | Asignación del incidente a responsable, cambio de estado (abierto → en investigación → cerrado), notas de seguimiento, adjuntar evidencia adicional, derivación a Dirección o autoridades | Jefe de Seguridad / Supervisor | Supervisor/Jefe | manual | eventual | core | sí (si involucra huésped) |
| 9 | Cierre y archivo de incidente | Cierre formal del incidente: causa raíz, resolución, acciones correctivas tomadas, lección aprendida. El registro queda archivado con audit trail completo | Jefe de Seguridad | Supervisor/Jefe | manual | eventual | core | no |
| 10 | Control de acceso a zonas restringidas | Gestión de quién puede acceder a qué zonas (cocina, back-of-house, sala de servidores, bóveda, sala de control). Integración con sistema de control de accesos (Assa Abloy VISIONLINE / Salto Systems) | Jefe de Seguridad | Supervisor/Jefe | manual / automático | continua | core | no |
| 11 | Emisión y anulación de tarjetas de acceso para empleados | Alta, modificación y baja de tarjetas de acceso del personal. Integración con RRHH (alta de empleado → genera tarjeta automáticamente; baja → revoca accesos) | Jefe de Seguridad | Supervisor/Jefe | automático (via RRHH) / manual | continua | core | no |
| 12 | Visita de proveedor externo / contratista | Registro de entrada y salida de proveedores y contratistas externos. Generación de credencial temporal con acceso limitado a zonas específicas. Firma de acuerdo de visita | Vigilante | Operativo | manual | diaria | importante | no |
| 13 | Control de acceso de huéspedes a zonas premium | Verificar que el huésped tiene derecho a acceder a zonas premium (piscina, lounge ejecutivo, spa). Integración con PMS para validar el tipo de habitación/paquete | Vigilante | Operativo | manual | diaria | importante | no |
| 14 | Gestión de llaves maestras | Registro del inventario de llaves maestras y llaves de seguridad del hotel. Control de quién tiene qué llave, cuándo se entregó y cuándo se devolvió. Alerta si una llave maestra no es devuelta al cierre de turno | Jefe de Seguridad / Supervisor | Operativo y Supervisor/Jefe | manual | continua | core | no |
| 15 | Alta de nueva llave maestra | Registro en inventario de una nueva llave maestra, con código único, zona de acceso, titular autorizado y auditoría de movimientos | Jefe de Seguridad | Supervisor/Jefe | manual | eventual | core | no |
| 16 | Pérdida de llave maestra — protocolo | Al reportarse pérdida de una llave maestra: alerta inmediata a Jefe de Seguridad y Dirección, activación del protocolo de cambio de cilindros en zonas afectadas, generación de OT hacia Mantenimiento, registro del incidente | Jefe de Seguridad | Supervisor/Jefe | manual (reporte de pérdida) | eventual | core | no |
| 17 | Monitoreo del fire panel | Visualización del estado del panel contra incendios en tiempo real: zonas activas, sensores en alarma, estado de rociadores, puertas cortafuegos. Integración con APIs del panel (Bosch, Hochiki) | Operador CCTV / Vigilante | Operativo | continuo | continua 24/7 | core | no |
| 18 | Gestión de alarma de incendio — protocolo de emergencia | Ante alarma del fire panel: activación del protocolo de evacuación, notificación a todos los sectores del hotel (via event bus), coordinación de evacuación por plantas, comunicación con Bomberos, designación de punto de encuentro | Jefe de Seguridad / Supervisor | Operativo | automático (alarma panel) | eventual | core | sí (evacuación afecta a huéspedes) |
| 19 | Gestión de emergencia general (protocolo) | Activación de protocolos para emergencias no-incendio: amenaza de bomba, emergencia médica masiva, corte de suministros críticos, emergencia meteorológica. Notificación a Dirección y autoridades | Jefe de Seguridad / Supervisor | Operativo | manual | eventual | core | sí |
| 20 | Gestión de emergencia médica individual | Respuesta a emergencia médica de huésped o empleado: primeros auxilios por personal entrenado, coordinación con servicio médico / ambulancia, registro del evento | Vigilante / Supervisor | Operativo | manual | eventual | core | sí |
| 21 | Loss prevention — inspección de áreas de riesgo | Rondas e inspecciones específicas en zonas de alta exposición a pérdidas: almacenes, economato, bar, caja de Recepción. Comparativa de inventarios | Jefe de Seguridad | Supervisor/Jefe | manual | semanal | importante | no |
| 22 | Loss prevention — investigación de discrepancia de inventario | Ante discrepancia detectada en Economato/Bar/Tienda: investigación, revisión CCTV, entrevista a empleados, informe de hallazgos | Jefe de Seguridad | Supervisor/Jefe | manual (trigger desde Economato/Admin) | eventual | importante | no |
| 23 | Coordinación PRL con RRHH (ES: prevención de riesgos laborales / AR: Seguridad e Higiene) | Comunicación de incidentes laborales (accidentes de trabajo), coordinación de simulacros de evacuación, actualización del plan de emergencia, revisión de EPIs por sector | Jefe de Seguridad | Supervisor/Jefe | manual / periódico | mensual-trimestral | importante | no |
| 24 | Simulacro de evacuación | Planificación y ejecución de simulacro: definición de escenario, comunicación a todos los sectores, ejecución, medición de tiempos, informe de resultado, plan de mejora | Jefe de Seguridad | Supervisor/Jefe | manual (programado) | semestral (mínimo) | importante | no |
| 25 | Configuración de zonas CCTV | Alta, modificación y baja de zonas de vigilancia: nombre, cámaras asignadas, horarios de vigilancia activa, reglas de alerta automática (movimiento nocturno, zona prohibida, etc.) | Jefe de Seguridad | Supervisor/Jefe | manual | eventual | importante | no |
| 26 | Gestión de archivo y retención de grabaciones CCTV | Control de retención de grabaciones según normativa (LOPD/RGPD en ES: máx 30 días salvo incidente; Ley 25.326 en AR). Eliminación automática al vencer plazo. Gestión de excepciones (retener para investigación) | Jefe de Seguridad | Supervisor/Jefe | automático / manual (excepciones) | continua | core | no |
| 27 | Gestión de solicitud de imágenes CCTV por autoridades | Protocolo para entrega de grabaciones a fuerzas de seguridad o por orden judicial: registro de la solicitud, validación de autorización, copia de clip, registro de entrega, audit trail | Jefe de Seguridad + Dirección | Supervisor/Jefe | manual (solicitud externa) | eventual | core | no |
| 28 | Gestión del proveedor externo de seguridad (modo tercerizado) | Seguimiento del contrato con Prosegur/Securitas/G4S: revisión de servicios prestados, registro de guardias asignados por el proveedor, comunicación de novedades, gestión de incidencias con el proveedor | Coordinador de Seguridad | Supervisor/Jefe | manual | continua | core | no |
| 29 | Configuración del perfil de riesgo del hotel | Definición del nivel de riesgo global y por zona: alto/medio/bajo. Parámetros que afectan la frecuencia de rondas, cobertura CCTV requerida y protocolos activados | Jefe de Seguridad | Supervisor/Jefe | manual (setup inicial + revisiones) | anual / tras incidente grave | importante | no |
| 30 | Gestión de inspecciones y certificaciones obligatorias | Seguimiento de inspecciones periódicas obligatorias: certificación de extintores, revisión de BIE (bocas de incendio equipadas), inspección del sistema de detección. Generación de OT hacia Mantenimiento y alerta a Dirección ante vencimientos | Jefe de Seguridad | Supervisor/Jefe | automático (calendario) | periódica según norma | core | no |
| 31 | Control de zonas de acceso durante eventos especiales | En eventos del hotel (bodas, conferencias, cenas privadas): redefinición temporal de zonas de acceso, credenciales para invitados, coordinación con F&B Servicio y Recepción | Jefe de Seguridad / Supervisor | Supervisor/Jefe | manual (trigger desde F&B/FO) | eventual | importante | no |
| 32 | Reporte de turno diario al Director General | Resumen automático de novedades del día: incidentes, rondas realizadas, estado de alarmas, observaciones del jefe. Se envía cada 24h a Dirección | Jefe de Seguridad | Dirección | automático (EOD) | diaria | importante | no |
| 33 | Reporte mensual de seguridad | Informe consolidado mensual: total de incidentes por tipo y zona, evolución vs mes anterior, estado de llaves maestras, próximas certificaciones, recomendaciones de mejora | Jefe de Seguridad | Dirección | automático (EOM) | mensual | importante | no |
| 34 | Registro de acceso de VIPs y huéspedes especiales | Coordinación con Recepción y GX para registrar las necesidades de seguridad/privacidad de huéspedes VIP: sin divulgación de habitación, acompañamiento en accesos, coordinación con protección privada del huésped | Jefe de Seguridad | Supervisor/Jefe | manual (trigger desde FO/GX) | eventual | importante | sí |
| 35 | Integración con sistema de control de accesos externo | Sincronización del sistema Bravas con el hardware de control de accesos del hotel (Assa Abloy VISIONLINE o Salto Systems): alta/baja/modificación de credenciales, recepción de logs de acceso, alertas de acceso denegado reiterado | Jefe de Seguridad | Supervisor/Jefe | automático (bidireccional) | continua | core | no |

### Sub-flujos clave (pseudocódigo simple)

```
Función: "Registro y gestión de incidente de seguridad"
1. Vigilante o supervisor detecta incidente (ronda, CCTV, alerta de huésped)
2. Vigilante abre registro `security_incident` en app móvil/portal:
   - tipo: robo / vandalismo / altercado / pérdida / sospecha / accidente
   - zona, hora exacta, descripción
   - personas involucradas (huésped → link a PMS; empleado → link a RRHH; externo)
3. Si involucra huésped → dual-fire: evento al GX inbox automáticamente
4. Supervisor de turno asigna severidad (1-3) y estado "en investigación"
5. Si severidad 3 (grave): notificación inmediata a Jefe de Seguridad y Dirección
6. Jefe de Seguridad coordina respuesta: revisa CCTV, entrevistas, medidas
7. Si requiere actuación policial: registro de denuncia, coordinación con autoridades
8. Cierre: causa raíz + resolución + acciones correctivas + estado "cerrado"
9. Si hay discrepancia de inventario → genera ticket en Economato
```

```
Función: "Protocolo de emergencia — alarma fire panel"
1. Fire panel (Bosch/Hochiki) detecta humo/calor/activación manual → API Bravas
2. Sistema Bravas recibe evento → activa protocolo de emergencia automáticamente
3. Notificación inmediata a: Supervisor de Seguridad, Jefe de Seguridad, Director General
4. Event bus envía alerta a TODOS los portales del hotel (Recepción, HK, Cocina, Mantenimiento)
5. Pantalla en portal de Seguridad muestra plano del hotel con zona en alarma
6. Supervisor dirige evacuación de zona afectada → Vigilantes guían a huéspedes
7. Recepción confirma cuenta de habitaciones evacuadas vs ocupadas (via PMS)
8. Jefe de Seguridad coordina con Bomberos a su llegada
9. Mantenimiento corta suministros según protocolo (gas, HVAC de zona)
10. Sistema registra: hora alarma, hora evacuación completa, zona, resultado
11. Reset del protocolo → regreso a normalidad → informe post-incidente
```

```
Función: "Gestión de llaves maestras"
1. Alta de nueva llave maestra: código único, zonas habilitadas, titular autorizado, fecha de creación
2. Entrega de llave: registro digital de quién la recibe, hora, propósito
3. Devolución: registro digital, hora, estado de la llave
4. Alerta automática: si una llave maestra no es devuelta dentro del tiempo máximo definido (ej: 2h post-turno)
5. Pérdida:
   a. Empleado reporta pérdida → trigger `key_lost_event`
   b. Alerta a Jefe de Seguridad y Dirección General
   c. Sistema genera OT urgente a Mantenimiento: cambio de cilindros en zonas de acceso de la llave
   d. Bloqueo preventivo en control de accesos electrónico de las zonas afectadas
   e. Registro de incidente de seguridad
   f. RRHH notificado (implicaciones disciplinarias)
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `security_incident` | sí | no | organization_id, id, tipo (enum), zona_id, fecha_hora, descripción, severidad (1-3), estado (abierto/en_investigacion/cerrado), reportado_por_user_id, personas_involucradas JSONB, resolución, acciones_correctivas, audit_trail | custom_fields JSONB | → `cctv_zone`, → `guest` (PMS), → `employee` (RRHH), → `work_order` (Mantto) |
| `patrol_log` | sí | no | organization_id, id, vigilante_user_id, turno_id, inicio_datetime, fin_datetime, checkpoints_completados JSONB (checkpoint_id, timestamp, coordenadas GPS), observaciones, estado (completada/incompleta/cancelada) | custom_fields JSONB | → `security_incident` (si se genera en ronda) |
| `cctv_zone` | sí | no | organization_id, id, nombre, descripción, cámaras JSONB (cámara_id, IP, proveedor, estado), horario_vigilancia JSONB, reglas_alerta JSONB, retención_días (default 30), activa (bool) | custom_fields JSONB | → `security_incident` (clips asociados) |
| `access_control_zone` | sí | no | organization_id, id, nombre, descripción, nivel_restricción (1-5), hardware_provider (assa_abloy / salto / otro), credenciales_autorizadas JSONB, horarios_acceso JSONB, log_accesos JSONB | custom_fields JSONB | → `employee` (RRHH), → `guest` (PMS) |
| `key_control` | sí | no | organization_id, id, código_clave, tipo (maestra / zona / servicio), zonas_habilitadas JSONB, titular_actual_user_id, estado (disponible / en_uso / perdida / baja), historial_movimientos JSONB (timestamp, usuario, acción) | custom_fields JSONB | → `security_incident` (si pérdida), → `work_order` (cambio cilindros) |
| `emergency_protocol` | sí | no | organization_id, id, tipo (incendio / evacuación / amenaza_bomba / médica_masiva / otra), pasos JSONB, roles_notificados JSONB, estado_actual (inactivo / activo / drill), activado_por_user_id, activado_datetime, resultado | custom_fields JSONB | → `security_incident`, → todos los módulos (via event bus) |

**Diagrama ER simplificado:**

```
security_incident ───< cctv_zone (clip asociado)
      │
      ├──> employee (RRHH) — involucrado
      ├──> guest (PMS FO) — involucrado
      └──> work_order (Mantto) — acción derivada

patrol_log ──────< security_incident (hallazgo en ronda)

key_control ─────< security_incident (pérdida)
                └──> work_order (cambio cilindros)

emergency_protocol ──> (event bus) ──> todos los módulos
access_control_zone ──< employee (credencial)
                    └──< guest (acceso premium)
```

---

## 7. Máquinas de estado

```
security_incident:
  ABIERTO ──asignación supervisor──> EN_INVESTIGACION
  EN_INVESTIGACION ──resolución definitiva──> CERRADO
  EN_INVESTIGACION ──derivación autoridades──> DERIVADO_EXTERNO
  DERIVADO_EXTERNO ──resolución con autoridades──> CERRADO
  CERRADO ──reapertura con causa nueva──> REABIERTO
  REABIERTO ──segunda resolución──> CERRADO

Transiciones autorizadas por rol:
- Vigilante: ABIERTO (crear)
- Supervisor: ABIERTO → EN_INVESTIGACION, notas
- Jefe de Seguridad: EN_INVESTIGACION → CERRADO, → DERIVADO_EXTERNO, → REABIERTO
- Dirección: solo lectura + aprobación de derivación

key_control:
  DISPONIBLE ──entrega a titular──> EN_USO
  EN_USO ──devolución──> DISPONIBLE
  EN_USO ──reporte pérdida──> PERDIDA
  PERDIDA ──protocolo cierre + cambio cilindros──> BAJA
  DISPONIBLE ──baja administrativa──> BAJA

emergency_protocol:
  INACTIVO ──activación manual o automática (fire panel)──> ACTIVO
  ACTIVO ──resolución de emergencia──> POST_EVENTO
  INACTIVO ──simulacro programado──> DRILL
  DRILL ──fin simulacro──> INACTIVO
  POST_EVENTO ──informe post-incidente firmado──> INACTIVO
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| Hikvision API (cámaras IP) | Hardware IP / REST API | inbound (recibe feed + eventos) | Opcional (si el hotel usa Hikvision) | Sistema de CCTV más común en 4* AR/ES. Requiere integrador certificado |
| Milestone XProtect (VMS) | Video Management System | bidireccional | Opcional | VMS profesional para instalaciones grandes. Recibe eventos de alarma y permite control desde Bravas |
| Assa Abloy VISIONLINE | Control de accesos | bidireccional | Opcional | Sistema de llaves electrónicas más usado en cadenas hoteleras internacionales |
| Salto Systems (KS / Space) | Control de accesos | bidireccional | Opcional | Alternativa común en boutiques y hoteles independientes ES/AR |
| Bosch Fire Panel API | Fire detection / BMS | inbound (alarmas) | Obligatorio si se usa hardware Bosch | Panel contra incendios; recibe alarmas de zona en tiempo real |
| Hochiki Fire Alarm API | Fire detection / BMS | inbound (alarmas) | Obligatorio si se usa hardware Hochiki | Alternativa a Bosch; común en ES |
| Prosegur / Securitas (modo tercerizado) | Proveedor servicio externo | inbound (partes de guardia) | Obligatorio en modo tercerizado | Protocolo de comunicación manual / email → importación de partes |
| `@octo/bravashotel-hr` | Módulo interno | bidireccional | Obligatorio | Alta de empleado → genera credencial de acceso; baja → revoca accesos; incidente laboral → registro en RRHH |
| `@octo/bravashotel-maintenance` | Módulo interno | outbound | Obligatorio | Pérdida de llave / alarma técnica → genera OT en Mantenimiento |
| `@octo/bravashotel-front-office` | Módulo interno | bidireccional | Obligatorio | PMS: datos de huésped en incidente, estado de habitaciones en evacuación, acceso a zonas premium |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Registro de incidentes | ✓ | | | | Universal |
| Monitoreo CCTV | ✓ | | | | Universal |
| Control de accesos | ✓ | | | | Universal |
| Monitoreo fire panel | ✓ | | | | Universal |
| Protocolos de emergencia | ✓ | | | | Universal |
| Gestión de llaves maestras | ✓ | | | | Universal |
| Retención de grabaciones CCTV | | | | ✓ | ES: LOPD/RGPD → máximo 30 días (Art. 22.3 LOPDGDD); AR: Ley 25.326 → retención proporcional al propósito, 30 días es práctica estándar |
| Aviso al interesado (grabación CCTV) | | | ✓ | | ES: obligatorio cartelería informativa y política de privacidad (RGPD Art. 13); AR: similar pero menos regulado |
| Derechos de acceso a grabaciones (ARCO) | | | ✓ | | ES: derecho de acceso, rectificación, cancelación, oposición (RGPD) ante AEPD; en AR ante AAIP |
| Habilitación de vigilantes (TIP) | | | ✓ | | ES: Ley 5/2014 Seguridad Privada → vigilantes deben tener TIP (Tarjeta de Identificación Profesional) emitida por el Ministerio del Interior; Bravas debe almacenar número de TIP por vigilante |
| Empresa de seguridad habilitada | | | ✓ | | ES: empresa de seguridad privada debe estar inscripta en el Registro de Empresas de Seguridad (RES); Bravas guarda número de autorización del proveedor |
| Contrato con empresa habilitada por Ministerio | | ✓ | | | AR: empresas de seguridad privada deben estar habilitadas por el Ministerio de Seguridad nacional/provincial; Bravas almacena número de habilitación del proveedor |
| Ley 24.192 (grandes establecimientos) | | ✓ | | | AR: aplica a instalaciones de gran afluencia (estadios, hoteles grandes); exige coordinación con policía; en resort grande puede activarse |
| PRL (Plan de prevención de riesgos laborales) | | | ✓ | | ES: Ley 31/1995 PRL → el hotel debe tener plan documentado; Seguridad coordina los simulacros con el responsable de PRL (en RRHH) |
| Seguridad e Higiene (SyH) | | ✓ | | | AR: Ley 19.587 + Ley 24.557 (ART) → coordinación con ART del hotel para incidentes laborales; registro de accidentes ante SRT |
| Libro de novedades digital | | | | ✓ | Ambos países exigen registro de novedades de guardia; Bravas cubre con el `patrol_log` y `security_incident` firmados digitalmente |

---

## 10. Slots de extensión (crítico para N2 + multi-tenant)

### 10.1 Campos custom por entidad

```
security_incident.custom_fields: JSONB
security_incident.custom_fields_schema: JSONB
key_control.custom_fields: JSONB
access_control_zone.custom_fields: JSONB
```

### 10.2 Workflows custom

Hooks disponibles:
- `pre_security_incident_create`: tenant puede exigir campo obligatorio adicional (ej: "número de habitación involucrada")
- `post_security_incident_create`: tenant puede enviar notificación SMS al dueño del hotel
- `post_emergency_protocol_activate`: tenant puede triggear cierre automático de puertas magnéticas (via API externa)
- `post_key_lost`: tenant puede activar notificación al seguro del hotel
- `pre_cctv_clip_export`: tenant puede exigir aprobación del director antes de exportar una grabación

### 10.3 Integraciones per-tenant

- Sistema de CCTV: Hikvision, Milestone, Genetec, Avigilon, otro custom
- Control de accesos: Assa Abloy, Salto, Dormakaba, otro custom
- Fire panel: Bosch, Hochiki, Notifier, Siemens, otro custom
- Proveedor de seguridad tercerizado: Prosegur, Securitas, G4S, otro

### 10.4 Branding/UI per-tenant

- Mapa del hotel (planta) customizable para visualización de zonas CCTV y checkpoints de ronda
- Nomenclatura de zonas (ej: "BOH", "Planta 3 ala sur", customizable)

### 10.5 Idiomas

- Diccionario i18n del sector (ver sección 11); tenant puede sobreescribir "vigilante" por "guardia" o "agente de seguridad" según su contrato

---

## 11. Nomenclatura i18n (tabla de términos del sector)

| Término técnico | es-ES default | es-AR default | en default | Customizable por tenant |
|---|---|---|---|---|
| security_officer | "Jefe de Seguridad" | "Jefe de Seguridad" | "Head of Security" | ✓ (ej: "Director of Loss Prevention" en 5*) |
| security_coordinator | "Coordinador de Seguridad" | "Coordinador de Seguridad" | "Security Coordinator" | ✓ |
| security_guard | "Vigilante de Seguridad" | "Vigilante de Seguridad" | "Security Guard" | ✓ (ej: "Guardia" en AR coloquial) |
| cctv_operator | "Operador de Sala de Control" | "Operador de Sala de Control" | "CCTV Operator" | ✓ |
| patrol_log | "Libro de Rondas" | "Parte de Ronda" | "Patrol Log" | ✓ |
| security_incident | "Incidencia de Seguridad" | "Incidente de Seguridad" | "Security Incident" | ✓ |
| master_key | "Llave Maestra" | "Llave Maestra" | "Master Key" | ✓ |
| access_zone | "Zona de Acceso Controlado" | "Zona de Acceso Controlado" | "Access Control Zone" | ✓ |
| fire_panel | "Central de Incendios" | "Panel Contra Incendios" | "Fire Panel" | ✓ |
| emergency_protocol | "Plan de Emergencia" | "Protocolo de Emergencia" | "Emergency Protocol" | ✓ |
| loss_prevention | "Prevención de Pérdidas" | "Prevención de Pérdidas" | "Loss Prevention" | ✓ |
| outsourced_mode | "Seguridad Externalizada" | "Seguridad Tercerizada" | "Outsourced Security" | ✓ |
| prl_coordination | "Coordinación PRL" | "Coordinación SyH (Seguridad e Higiene)" | "Safety Coordination" | ✓ |
| tip_number | "Número TIP" | "N/A (AR)" | "Professional ID Card" | — (ES-only campo) |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| Ley 5/2014 de Seguridad Privada | ES | Los vigilantes de seguridad en hoteles deben tener TIP (Tarjeta de Identificación Profesional) emitida por Ministerio del Interior. Las empresas de seguridad deben estar inscritas en el Registro de Empresas de Seguridad (RES). Bravas: campo TIP obligatorio para cada vigilante en modo interno ES; campo Nº RES obligatorio para proveedor en modo tercerizado ES |
| LOPD / LOPDGDD / RGPD | ES (UE) | CCTV sujeto a RGPD: carteles informativos obligatorios, retención máx 30 días, derecho de acceso del interesado. Bravas: retención automática con límite configurable (default 30 días ES), audit trail de accesos a grabaciones, política de privacidad configurable por tenant |
| Ley 25.326 de Protección de Datos Personales | AR | Protección de datos de personas captadas por CCTV. Retención razonable y proporcional al propósito. Bravas: mismo mecanismo de retención automática |
| Ley 19.587 de Seguridad e Higiene en el Trabajo | AR | El hotel debe tener responsable de Seguridad e Higiene (externo o interno). Coordinación con ART. Bravas: módulo Security coordina con RRHH el registro de accidentes laborales |
| Ley 24.557 de Riesgos del Trabajo (ART) | AR | Registro de accidentes de trabajo y enfermedades profesionales ante SRT. Denuncia ante ART. Bravas: `security_incident` con flag "accidente laboral" genera notificación a RRHH para denuncia ART |
| Ley 31/1995 de Prevención de Riesgos Laborales (PRL) | ES | Plan de prevención obligatorio, evaluación de riesgos, simulacros. Bravas: función simulacro, registro de plan de emergencia, integración con RRHH |
| Ley 24.192 (Régimen Penal y Contravencional) | AR | Aplica a espectáculos deportivos pero su doctrina cubre instalaciones de gran concentración. Para hoteles resort grande: coordinación con fuerzas de seguridad en eventos masivos |
| Reglamento de Instalaciones de Protección Contra Incendios (RIPCI, RD 513/2017) | ES | Revisiones periódicas de extintores, BIE, detectores. Bravas: calendario de inspecciones + integración con OT de Mantenimiento |
| Habilitación empresas de seguridad privada (Ministerio de Seguridad) | AR | Empresas de seguridad contratadas deben estar habilitadas por el Ministerio de Seguridad de la Nación o Provincial. Bravas: campo número de habilitación obligatorio en modo tercerizado AR |

---

## 13. Dependencias del lifecycle del módulo

**Qué pasa si el módulo se ACTIVA después del hotel ya corriendo:**
- Datos iniciales requeridos (seed): plano básico del hotel con zonas nombradas, inventario inicial de llaves maestras, lista de proveedores de seguridad (si modo tercerizado), credenciales de API de hardware (CCTV / accesos / fire panel)
- Flujo de setup inicial: (1) elegir modo operativo (tercerizado / interno), (2) definir zonas de acceso, (3) definir zonas CCTV, (4) cargar llaves maestras existentes, (5) asignar roles al personal de seguridad, (6) configurar integraciones de hardware
- Migración de datos: si el hotel ya tiene un libro de rondas manual, se puede importar CSV de incidentes históricos

**Qué pasa si el módulo se DESACTIVA:**
- Datos que quedan: `security_incident` (historial), `patrol_log` (historial), `key_control` (inventario llaves), grabaciones CCTV (hasta retención)
- Datos irrecuperables: configuraciones de hardware (se pierden las reglas de alerta automática en Bravas, no en el hardware físico)
- Procedimiento de archivo: mover incidentes activos a "cerrado administrativo", exportar inventario de llaves a PDF
- Módulos afectados: Mantenimiento pierde integración para OTs de seguridad, RRHH pierde integración de incidentes laborales, GX pierde dual-fire de incidentes con huéspedes

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| Incidentes por mes | COUNT(`security_incident`) WHERE mes = actual | mensual | Dashboard Dirección + Portal Seguridad | Objetivo: tendencia a cero; hoteles 4* urbano: <5/mes |
| Incidentes graves (severidad 3) | COUNT(`security_incident`) WHERE severidad = 3 AND mes = actual | mensual | Dashboard Dirección (alerta si > 0) | Objetivo: 0 por mes |
| Tiempo medio de respuesta ante alarma | AVG(tiempo desde trigger hasta acción registrada) | por turno | Portal Seguridad | Objetivo: <3 min zonas internas, <5 min periferia |
| Cobertura de rondas | rondas_completadas / rondas_programadas × 100 | diaria | Portal Seguridad | Objetivo: >95% |
| Incumplimiento de devolución de llaves maestras | COUNT(key_control WHERE estado=en_uso AND tiempo_entrega > umbral) | diaria | Portal Seguridad | Objetivo: 0 |
| Retención de grabaciones CCTV | % cámaras con grabación continua sin cortes en últimas 24h | diaria | Portal Seguridad | Objetivo: 100% cámaras activas |
| Pérdidas detectadas por Loss Prevention | valor_estimado_discrepancias por período | mensual | Portal Dirección | Variable; referencia del sector: <0.5% del revenue F&B |
| Vigencia de certificaciones y TIPs | COUNT(vigilantes con TIP vencido o próximo a vencer en 30 días) | semanal | Portal Seguridad (alerta automática) | Objetivo: 0 vencidos |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol que la ve | Función principal | Mockup existente |
|---|---|---|---|---|
| `/security/dashboard` | Operativo + Supervisor | Jefe / Supervisor / Operador | Vista general: incidentes activos, estado de rondas, alertas CCTV, estado fire panel | no |
| `/security/incidents` | Operativo + Supervisor | Todos los roles de Seguridad | Lista de incidentes con filtros (estado, tipo, zona, fecha) | no |
| `/security/incidents/new` | Operativo | Vigilante | Formulario nuevo incidente | no |
| `/security/incidents/:id` | Operativo + Supervisor + Jefe | Todos los roles | Detalle de incidente, notas, adjuntos, estado | no |
| `/security/patrols` | Operativo | Vigilante (móvil) | App de rondas: lista de checkpoints, confirmación por NFC/QR | no |
| `/security/patrols/log` | Supervisor | Supervisor / Jefe | Historial de rondas del turno / día | no |
| `/security/keys` | Supervisor | Jefe / Supervisor | Inventario de llaves maestras, estado, historial de movimientos | no |
| `/security/access-zones` | Jefe | Jefe de Seguridad | Configuración de zonas de acceso y credenciales | no |
| `/security/cctv` | Operativo | Operador CCTV | Visualización de zonas CCTV, clips recientes, alertas | no |
| `/security/fire-panel` | Operativo | Operador / Supervisor | Estado del fire panel en tiempo real | no |
| `/security/emergency` | Operativo | Jefe / Supervisor | Activación de protocolos de emergencia | no |
| `/security/reports` | Jefe + Dirección | Jefe de Seguridad + Director | Reportes de turno, mensual, KPIs | no |
| `/security/certifications` | Jefe | Jefe de Seguridad | Calendario de certificaciones y vencimientos de TIP/habilitaciones | no |

---

## 16. Riesgos conocidos y preguntas abiertas

- **Riesgo 1 — Integración de hardware heterogéneo:** cada hotel puede tener cámaras de distinto proveedor, panel de incendios diferente y control de accesos distinto. La integración es cara y puede fallar. Plan de mitigación: definir un "adaptador" por proveedor + API genérica interna; ofrecer modo "sin integración" donde el operador ingresa datos manualmente.
- **Riesgo 2 — CCTV y cumplimiento RGPD/LOPD:** la gestión de grabaciones es un área de cumplimiento estricto. Cualquier fallo puede resultar en sanción de la AEPD (ES). Plan de mitigación: retención automática con hard-limit de 30 días (configurable a menos, no a más), audit trail obligatorio de accesos a grabaciones, generación automática de cartelería informativa para imprimir.
- **Riesgo 3 — Modo tercerizado:** en modo tercerizado, el proveedor (Prosegur/Securitas) tiene sus propios sistemas. La integración puede ser solo vía partes de guardia en papel o email. Plan de mitigación: módulo permite importación manual de partes; en largo plazo, API con proveedores principales.
- **Pregunta abierta 1 — ¿El módulo Security incluye la gestión de Salud Ocupacional/Medicina del Trabajo o eso es 100% RRHH?** La línea entre PRL/SyH y seguridad física es difusa. Propuesta default: incidentes laborales se registran en Security y se copian a RRHH via dual-fire. Decisión: arquitecto + Daniel.
- **Pregunta abierta 2 — ¿Los vigilantes del hotel usan la app de Bravas en móvil o es suficiente el portal web?** Para las rondas con checkpoints NFC/QR, se necesita app móvil nativa o PWA. Decisión: arquitecto de frontend.

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación inicial del catálogo — v1.0 | bravas |
