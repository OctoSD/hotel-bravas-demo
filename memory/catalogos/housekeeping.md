# Catálogo exhaustivo — Housekeeping / Gobernanta

> Sector Core del producto SaaS hotelero **BravasHotel** (nombre de trabajo; nombre comercial definitivo pendiente).
> Namespace técnico: `@octo/bravashotel-housekeeping`

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Housekeeping / Gobernanta |
| **Nombre (es-AR)** | Housekeeping / Ama de llaves |
| **Nombre (en)** | Housekeeping / Executive Housekeeper |
| **Código técnico** | `@octo/bravashotel-housekeeping` |
| **Tipo** | Core — siempre activo en todo tenant |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | `front-office` (recibe eventos check-in/out y estado de habitaciones), `auth`, `timekeeping`, `i18n`, `branding`, `tenant-config`, `event-bus`, `audit-log` |
| **Módulos dependientes de éste** | `front-office` (consulta estado de habitaciones para asignar en check-in), `maintenance` (recibe reportes de desperfectos detectados por HK), `storeroom` (pide reposición de lencería y productos de limpieza), `guest-experience` (dual-fire en quejas de limpieza y en inspecciones fallidas) |
| **Activación default** | Siempre activo |

---

## 2. Propósito del módulo

**Qué resuelve:** Housekeeping es el sector que garantiza que las habitaciones y las áreas comunes del hotel estén limpias, ordenadas y en perfectas condiciones para cada huésped. Resuelve el ciclo operativo completo de limpieza: asignación diaria de habitaciones a las camareras de piso, control del avance de limpieza en tiempo real, inspección y supervisión de calidad, gestión de habitaciones en mantenimiento preventivo y correctivo (coordinada con el sector de Mantenimiento), control del stock de lencería y productos de limpieza, coordinación de la lavandería (interna o tercerizada), limpieza de áreas públicas (pasillos, lobby, escaleras, baños comunes, piscina si aplica), y detección y reporte de incidencias (desperfectos en habitaciones, objetos olvidados por huéspedes, minibar consumido). Es además el receptor directo de las notificaciones de check-out para habilitar la limpieza y el canal de retroalimentación hacia Front Office cuando una habitación está lista para ser asignada.

**Qué NO resuelve:**
- La asignación de habitaciones a huéspedes (es de Front Office).
- La reparación técnica de desperfectos (el módulo los detecta y reporta; Mantenimiento los resuelve).
- La gestión del stock de economato general y la compra a proveedores (es de Storeroom/Economato, aunque HK consume de ese stock).
- La gestión de lavandería de ropa de huésped (recoge y entrega, pero la operativa de lavandería de cliente es sub-función propia; si está tercerizada, coordina con proveedor externo).
- La gestión de servicios de spa, piscina o áreas recreativas (si existen, son sus propios módulos opcionales, aunque HK puede proveer limpieza a esas áreas).
- La nómina y contratación del personal de piso (es de RRHH).

**Métrica principal de éxito del sector:**
- **Tasa de habitaciones listas a tiempo** (habitaciones inspeccionadas y en estado LIBRE antes de la hora de check-in estándar): target > 90% de habs listas antes de las 15:00.
- KPIs secundarios: tiempo medio de limpieza por habitación por tipo, índice de habitaciones que requieren re-limpieza (segunda inspección), número de quejas de limpieza por período, consumo de lencería vs benchmark, costo de lavandería por habitación.

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Jefe del sector | Gobernanta | Gobernanta / Ama de llaves | Executive Housekeeper | 2 | Director General / Director de Operaciones | Supervisoras + Camareras + Encargada de Lavandería + Lencería | En hoteles chicos hace también turnos de supervisión directa |
| Supervisora de piso | Supervisora de Pisos | Supervisora de Pisos | Housekeeping Supervisor / Floor Supervisor | 3 | Gobernanta | Camareras de piso de su zona/turno | En hoteles < 60 habs puede no existir; la gobernanta supervisa directamente |
| Camarera de piso | Camarera de pisos | Mucama | Room Attendant / Housekeeping Attendant | 4 | Supervisora / Gobernanta | — | Rol operativo central del sector |
| Encargada de Lavandería | Encargada de Lavandería | Encargada de Lavandería | Laundry Supervisor | 3 | Gobernanta | Operarias de lavandería | Solo si lavandería interna activa; si tercerizada, es punto de contacto con proveedor |
| Operaria de Lavandería | Operaria de Lavandería | Operaria de Lavandería | Laundry Attendant | 4 | Encargada de Lavandería | — | Solo en lavandería interna; en hoteles chicos la misma camarera puede rotar |
| Encargada de Lencería | Encargada de Lencería | Encargada de Lencería | Linen Room Supervisor | 3 | Gobernanta | — | Gestiona el stock y distribución de ropa de cama y toallas; en hoteles chicos es función de la gobernanta |
| Personal de Áreas Públicas | Personal de Áreas Públicas | Personal de Áreas Públicas | Public Area Attendant | 4 | Supervisora / Gobernanta | — | Limpieza de pasillos, lobby, baños comunes, escaleras, restaurante si aplica; en boutique chico: la misma camarera |
| Valet de Lavandería | Valet de Lavandería | Valet de Ropa | Laundry Valet | 4 | Encargada Lavandería | — | Recoge y entrega la ropa de los huéspedes (servicio valet laundry); solo en hoteles 4*+ |

**Variantes por tamaño de hotel:**
- **Boutique chico (< 40 habs):** Gobernanta (puede ser propietaria o encargada de confianza) + 2-4 camareras. Sin supervisora de pisos, sin lencería formal, lavandería siempre tercerizada. Personal de áreas públicas = la misma camarera.
- **Urbano 4* mediano (80-150 habs):** Gobernanta + 1-2 supervisoras + 10-20 camareras distribuidas en turnos (mañana/tarde) + lavandería interna con 2-3 personas o tercerizada con coordinadora interna + persona de áreas públicas dedicada.
- **Resort / 5* grande (200+ habs):** Gobernanta (Executive Housekeeper con rango de dirección) + Supervisoras por zona (planta/zona del hotel) + 30-60+ camareras + Lavandería interna con encargada y operarias + Lencería dedicada + áreas públicas con personal propio + floristería (en 5*).

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | No directamente | El huésped no interactúa con HK vía portal. Indirectamente: las solicitudes de amenities/toallas extras se reciben vía Portal Huésped y llegan a HK como tarea |
| Portal Operativo de Housekeeping | Sí | Panel de trabajo de la camarera: lista de habitaciones asignadas con estado, instrucciones especiales (DND, VIP, check-out, bloqueada), botón "empezar limpieza" / "finalizar" / "reportar problema" |
| Portal Supervisor/Jefe | Sí | Vista de gobernanta: estado en tiempo real de todas las habitaciones, progreso del equipo, inspecciones pendientes, incidencias reportadas, resumen de lencería del día, gestión de tareas de lavandería |
| Portal Dirección | Sí | Métricas HK: habitaciones listas a tiempo %, productividad del equipo, costo de lavandería, quejas de limpieza del período |
| **GX inbox (dual-fire)** | Sí | Queja de limpieza recibida, re-limpieza solicitada (segunda inspección fallida), incidencia grave en habitación (desperfecto mayor, hallazgo inusual), inspección completada con nota baja |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Recepción de evento check-out | Recibir notificación de FO cuando un huésped hace check-out; actualizar estado de habitación a EN_LIMPIEZA; agregar la hab a la cola de limpieza del día | Sistema | HK Portal (Operativo) | Automático — event-bus desde FO post check-out | Continua | Core | No |
| 2 | Asignación de habitaciones a camareras | La gobernanta o supervisora distribuye las habitaciones del día entre las camareras disponibles; considera: turno, zona/piso, carga de trabajo, prioridad (check-out first) | Gobernanta / Supervisora | HK Portal (Supervisor) | Manual — inicio de turno | Diaria | Core | No |
| 3 | Generación automática de hoja de trabajo (housekeeping sheet) | Sistema genera la lista de habitaciones asignadas a cada camarera con tipo de tarea (salida / estancia / bloqueada) y notas especiales (VIP, DND, bebé, mascota, horario solicitado) | Sistema | HK Portal (Operativo) | Automático — asignación completada | Diaria | Core | No |
| 4 | Inicio de limpieza de habitación (registro de entrada) | Camarera indica en el sistema que comienza la limpieza de una habitación específica; sistema registra hora de inicio | Camarera | HK Portal (Operativo) — móvil/tablet | Manual — camarera lo marca | Continua | Core | No |
| 5 | Finalización de limpieza de habitación | Camarera indica que terminó la limpieza; sistema registra hora de fin; habitación pasa a estado PENDIENTE_INSPECCIÓN; se genera tarea de inspección para supervisora | Camarera | HK Portal (Operativo) | Manual — camarera lo marca | Continua | Core | No |
| 6 | Inspección de habitación (supervisión de calidad) | Supervisora / Gobernanta verifica la limpieza de la habitación según checklist estándar; aprueba (hab pasa a LIMPIA) o rechaza (hab vuelve a EN_LIMPIEZA con nota) | Supervisora / Gobernanta | HK Portal (Supervisor) | Manual — post limpieza | Continua | Core | No |
| 7 | Re-limpieza (segunda vuelta) | Si la inspección rechaza la habitación, se asigna re-limpieza a la misma camarera u otra disponible; se registra el rechazo | Supervisora | HK Portal (Supervisor) | Manual — post inspección fallida | Eventual | Core | Sí (si es 2ª falla) |
| 8 | Liberación de habitación a Recepción | Tras inspección aprobada, sistema actualiza el estado de la habitación a LIMPIA y notifica a FO que está disponible para asignar; FO puede pasar a LIBRE | Sistema | Bidireccional HK ↔ FO | Automático — post inspección aprobada | Continua | Core | No |
| 9 | Limpieza de estancia (en estadía) | Para habitaciones ocupadas (el huésped no ha salido): limpieza diaria o cada dos días según política del hotel; respetando DND; registrar en sistema | Camarera | HK Portal (Operativo) | Manual (turno mañana / tarde) + automático (carga del día) | Diaria | Core | No |
| 10 | Gestión del "No Molestar" (DND) | Registrar en sistema cuando el huésped activa DND (físico o vía app); camarera salta esa habitación; si DND supera X horas sin contacto → alerta al supervisor | Sistema + Supervisora | HK Portal | Automático — señal DND activada (física o digital) | Continua | Importante | No |
| 11 | DND extendido — verificación de bienestar | Si un huésped lleva > 24h con DND activo sin contacto verificado → supervisora notifica a FO para hacer verificación de bienestar discreta | Supervisora → Jefe FO | HK Portal → alerta FO | Automático — SLA de DND extendido | Eventual | Core (seguridad) | Sí |
| 12 | Limpieza de día libre (day-use) | Habitación asignada para uso del día (sin pernocta); limpieza rápida antes de asignar y al finalizar el uso | Camarera | HK Portal | Trigger manual desde FO | Eventual | Importante | No |
| 13 | Limpieza profunda (deep cleaning) | Limpieza exhaustiva de la habitación: mover muebles, limpiar detrás, lavar cortinas, revisar acabados, retoque de pintura menor; programada rotativamente | Camarera + Supervisora | HK Portal (Supervisor) — programación | Manual — programada semanalmente/mensualmente | Semanal/mensual | Importante | No |
| 14 | Checklist de limpieza por tipo de habitación | El sistema sirve a la camarera el checklist estándar del tenant para ese tipo de habitación (estándar / suite / apartamento / VIP); la camarera confirma cada ítem | Camarera | HK Portal (Operativo) | Automático — al iniciar limpieza | Continua | Importante | No |
| 15 | Checklist de inspección por tipo de habitación | Supervisora sigue el checklist de inspección; si falla un ítem, puede tomar foto y adjuntarla; falla → rechazo automático con ítem fallido registrado | Supervisora | HK Portal (Supervisor) | Automático — al iniciar inspección | Continua | Importante | No |
| 16 | Reporte de desperfecto en habitación | Camarera detecta algo roto, que no funciona o que requiere mantención: registra en sistema con categoría, descripción y foto; sistema crea tarea en portal Mantenimiento | Camarera | HK Portal (Operativo) | Manual — camarera lo detecta durante limpieza | Continua | Core | No |
| 17 | Reporte de desperfecto grave — bloqueo de habitación | Si el desperfecto hace la habitación no habitable (inundación, rotura cama, ventana rota): sistema bloquea automáticamente la habitación y notifica a FO y Mantenimiento | Sistema | HK Portal + FO Portal | Automático — camarera marca "desperfecto grave" | Eventual | Core | Sí |
| 18 | Hallazgo de objetos olvidados | Camarera encuentra objeto del huésped durante limpieza; lo registra con descripción, foto, habitación y fecha; sistema lo pasa a Lost & Found de FO | Camarera | HK Portal (Operativo) | Manual | Continua | Importante | No |
| 19 | Reposición de amenities en habitación | Camarera repone los amenities estándar del hotel (jabones, champú, gel, cappucino, agua, papelería); registra consumo si el tenant lleva control de ello | Camarera | HK Portal (Operativo) | Manual — durante limpieza | Continua | Importante | No |
| 20 | Revisión y registro del minibar | Camarera anota los productos consumidos del minibar; sistema genera cargo automático en el folio del huésped en FO | Camarera | HK Portal (Operativo) | Manual — salidas y cambio de día | Continua | Core | No |
| 21 | Reposición del minibar | Reponer los productos consumidos del minibar desde el stock asignado; registrar los productos utilizados para descuento de stock | Camarera | HK Portal | Manual | Continua | Importante | No |
| 22 | Gestión de solicitudes de limpieza extra (turndown service) | En hoteles 4-5*: preparación de la habitación por la tarde/noche (doblar ropa de cama, poner chocolate, bajar persianas, música); asignación a camarera de turno tarde | Supervisora / Camarera tarde | HK Portal (Supervisor + Operativo) | Manual — programado o solicitado por huésped vía app | Diaria (en hoteles que lo usan) | Importante | No |
| 23 | Solicitudes especiales de huésped (HK) | Atender solicitudes que llegan vía Portal Huésped o FO: toallas extra, almohada extra, cuna, silla bebé, plancha, eliminación de alérgenos, cambio de ropa de cama | Camarera / Supervisora | HK Portal (Operativo) + Portal Huésped | Automático — desde request del huésped vía app/FO | Continua | Importante | No |
| 24 | Preparación habitación VIP | Protocolo especial antes del check-in de un huésped VIP: habitación pre-limpiada con time extra, amenities adicionales, nota de bienvenida, detalles específicos coordinados con Jefe FO y Dirección | Supervisora / Gobernanta | HK Portal (Supervisor) | Manual — flag VIP en reserva disparado a HK | Eventual | Core | Sí |
| 25 | Seguimiento de productividad de camareras | Gobernanta visualiza en tiempo real cuántas habitaciones ha limpiado cada camarera, tiempos promedio, habitaciones pendientes; ajusta asignaciones durante el turno si hay desvíos | Gobernanta | HK Portal (Supervisor) | Automático — datos en tiempo real | Diaria | Importante | No |
| 26 | Resumen del turno de Housekeeping | Al cierre del turno: habitaciones limpias, pendientes, rechazadas, en re-limpieza, bloqueadas; tiempo promedio de limpieza; incidencias del turno | Sistema | HK Portal (Supervisor) + Portal Dirección | Automático — fin de turno | Diaria | Importante | No |
| 27 | Control de stock de lencería y toallas | Inventario de sábanas, fundas, toallas, alfombras de baño, manteles (si aplica); registro de salidas diarias al piso, entradas de lavandería; alerta cuando stock baja de mínimo | Encargada de Lencería / Gobernanta | HK Portal (Supervisor) | Continuo — movimientos manuales + automáticos | Diaria | Core | No |
| 28 | Gestión de lavandería — entrega | Registrar lencería sucia enviada a lavandería (propia o tercerizada): cantidad, tipo de pieza, turno; generar albarán de salida | Encargada de Lavandería / Lencería | HK Portal (Supervisor) | Manual — fin de turno mañana | Diaria | Core | No |
| 29 | Gestión de lavandería — recepción | Registrar lencería limpia recibida de vuelta: cantidad, tipo, calidad (identificar piezas deterioradas, faltantes); actualizar stock de lencería | Encargada de Lavandería / Lencería | HK Portal (Supervisor) | Manual — recepción lencería | Diaria | Core | No |
| 30 | Toggle lavandería interna / tercerizada | Configurar si el hotel tiene lavandería propia (activa sub-módulo con gestión de equipos, turnos de lavandería, consumos de detergente) o tercerizada (activa flujo de albaranes con proveedor externo + seguimiento) | Gobernanta / Admin del tenant | HK Portal (config) + onboarding | Manual — configuración del tenant | Una vez (onboarding) + eventual cambio | Core | No |
| 31 | Gestión de lavandería interna — ciclos de lavado | Si lavandería interna: asignar cargas por turno, controlar programas de lavado (temperatura, detergente), control de producción diaria | Encargada de Lavandería | HK Portal (Lavandería) | Manual — turnos de lavandería | Continua (si interna) | Core (si interna) | No |
| 32 | Gestión de proveedores de lavandería tercerizada | Si tercerizada: registro del proveedor, horarios de recogida/entrega, control de albaranes, gestión de incidencias (ropa mal lavada, faltante, deteriorada), facturación mensual | Gobernanta / Encargada | HK Portal + Admin | Manual | Continua (si tercerizada) | Importante (si tercerizada) | No |
| 33 | Servicio de lavandería de huésped (valet laundry) | Recoger la ropa del huésped, registrar piezas y cliente, enviar a lavandería (interna o externa), entregar limpia; cargar al folio del huésped | Valet de Lavandería / Camarera | HK Portal (Operativo) | Manual — huésped deja bolsa o solicita vía app | Continua (en hoteles que lo ofrecen) | Importante | No |
| 34 | Limpieza de áreas públicas — programación | Crear el plan de limpieza de áreas públicas del día: lobby, pasillos, escaleras, ascensores, baños comunes, sala de desayuno, piscina (si aplica), sala de reuniones, parking | Gobernanta / Supervisora | HK Portal (Supervisor) | Manual — inicio de turno | Diaria | Core | No |
| 35 | Limpieza de áreas públicas — ejecución y registro | Personal de áreas públicas marca inicio y fin de limpieza de cada área; registra incidencias encontradas | Personal Áreas Públicas | HK Portal (Operativo) | Manual | Continua | Core | No |
| 36 | Limpieza de áreas públicas — inspección | Supervisora verifica la limpieza de áreas comunes; aprueba o solicita repaso; registra | Supervisora | HK Portal (Supervisor) | Manual | Diaria | Importante | No |
| 37 | Plan de limpieza semanal | Gobernanta crea el plan de trabajo semanal: deep cleanings programados, rotación de lencería, días de mayor carga (llegadas masivas), cobertura de fines de semana y festivos | Gobernanta | HK Portal (Supervisor) | Manual — fin de semana / inicio semana | Semanal | Importante | No |
| 38 | Gestión de personal de HK — asistencia y turno | Registrar ausencias, llegadas tardías, cobertura de bajas; re-asignar habitaciones si falta personal; alerta si el ratio camarera/habitación supera el límite configurado | Gobernanta | HK Portal (Supervisor) | Manual — inicio turno | Diaria | Core | No |
| 39 | Alerta de habitaciones críticas (priority clean) | Sistema detecta automáticamente las habitaciones más urgentes: check-out realizado + huésped VIP esperando, check-in express solicitado, overbooking pending; las marca como prioridad máxima | Sistema | HK Portal (Operativo + Supervisor) | Automático — evento check-out de FO con flag urgente | Continua | Core | No |
| 40 | Control de llaves y acceso del personal HK | Gestión de llaves / cards de acceso del personal: a qué pisos y habitaciones puede entrar cada persona; registro de accesos; alerta si hay acceso fuera de turno | Gobernanta / Seguridad | HK Portal (Supervisor) + Seguridad | Manual (gestión) + automático (log de accesos del sistema de llaves) | Diaria | Core (seguridad) | No |
| 41 | Informe de incidencias del sector | Resumen periódico de incidencias de HK: desperfectos reportados, objetos olvidados, quejas de limpieza, habitaciones rechazadas en inspección; para revisión de gobernanta y dirección | Sistema | Portal Supervisor/Jefe + Dirección | Automático — semanal/mensual | Semanal/mensual | Importante | No |
| 42 | Gestión de habitaciones bloqueadas | Vista de todas las habitaciones en estado BLOQUEADA con motivo, duración estimada, sector responsable; alerta si el bloqueo supera la fecha estimada de liberación | Gobernanta / Supervisora | HK Portal (Supervisor) | Automático — estado habitación | Continua | Importante | No |
| 43 | Integración con Mantenimiento — habitaciones reparadas | Cuando Mantto completa una reparación en una habitación, HK recibe alerta para realizar limpieza post-reparación antes de liberar la habitación | Sistema | HK Portal (Supervisor) | Automático — event-bus desde Mantto | Eventual | Core | No |
| 44 | Checklist pre-apertura (si el hotel abre tras reforma o cierre) | Lista de verificación completa para asegurarse que todas las habitaciones están en condiciones: HK + Mantto + FO coordinados | Gobernanta | HK Portal (Supervisor) | Manual — evento especial | Eventual (raro) | Importante | No |
| 45 | Inventario de productos de limpieza | Control de stock de productos de limpieza (desinfectantes, limpiacristales, productos baño, bolsas de basura, guantes); alerta cuando baja del mínimo; solicitud automática a Economato | Encargada Lencería / Gobernanta | HK Portal (Supervisor) | Manual + automático (alerta mínimos) | Semanal | Importante | No |
| 46 | Programación de limpieza de equipos de lavandería | Si lavandería interna: mantenimiento preventivo de lavadoras, secadoras, planchas industriales; coordinar con Mantto; registrar en sistema | Encargada Lavandería | HK Portal + Mantto Portal | Manual — programado mensualmente | Mensual (si interna) | Importante | No |
| 47 | Reporte de consumo de lencería y análisis de pérdidas | Informe mensual de lencería: entradas, salidas, piezas deterioradas dadas de baja, faltantes detectados; costo mensual; comparativa vs mes anterior | Sistema | HK Portal (Supervisor) + Dirección | Automático — cierre mensual | Mensual | Importante | No |
| 48 | Protocolo de habitación tras incidente grave | Procedimiento cuando en la habitación hay incidente grave (robo, enfermedad del huésped, fallecimiento, daño severo): bloqueo inmediato, notificación a Dirección + Seguridad, limpieza especial, coordinación con autoridades si aplica | Gobernanta / Dirección | HK Portal + Portal Dirección | Manual — detectado por camarera o FO | Eventual (raro) | Core (crítico) | Sí |

---

### Sub-flujos clave (pseudocódigo)

#### Flujo 1 — Ciclo de limpieza post check-out (el más frecuente del sector)

```
Función: Limpieza de habitación por salida de huésped
──────────────────────────────────────────────────────
1. FO registra check-out del huésped en la habitación X
2. Sistema dispara evento "room.check_out" en el event-bus
3. HK recibe el evento: habitación X pasa de OCUPADA → EN_LIMPIEZA
4. Habitación X aparece en la cola de limpieza del día marcada como "salida" (prioridad alta)
5. Gobernanta / Supervisora asigna habitación X a una camarera disponible (manual o automático según configuración)
   - Sistema considera: carga de trabajo actual de cada camarera, piso, zona, si hay habs VIP prioritarias
6. Camarera recibe en su panel/tablet la asignación: "HAB 302 — Salida — Prioridad: alta — Notas: n/a"
7. Camarera llega a la habitación, verifica que no hay huésped, inicia limpieza
8. Camarera marca en la app: "Inicio de limpieza" → sistema registra hora de inicio
9. Camarera sigue el checklist de limpieza del tipo de habitación (servido por el sistema):
   - Retirar ropa sucia de cama y baño → llevar al carro de ropa sucia
   - Vaciar papeleras y minibar de residuos
   - Revisar minibar: registrar consumos en app → sistema carga al folio del huésped (en FO)
   - Limpiar baño completo (inodoro, lavabo, ducha/bañera, espejos, suelos)
   - Limpiar zonas de dormitorio (polvo, suelos, ventanas)
   - Hacer cama con ropa de cama limpia
   - Reponer amenities (jabón, champú, gel, café, agua, papelería según estándar del tenant)
   - Revisar desperfectos: si hay → registrar en app con foto
   - Si hay objetos olvidados del huésped anterior → registrar en app → va a Lost & Found FO
10. Camarera marca "Finalizada limpieza" → sistema registra hora de fin
    → Habitación pasa a PENDIENTE_INSPECCIÓN
    → Supervisora recibe alerta: "Hab 302 lista para inspección"
11. Supervisora va a la habitación y ejecuta el checklist de inspección:
    - Revisa cada ítem del checklist
    - Si aprueba: marca "Inspección OK" → Habitación pasa a LIMPIA
      → FO recibe notificación: "Hab 302 disponible"
      → Rack de habitaciones: LIMPIA → FO puede asignarla
    - Si rechaza: marca qué ítem falló (con foto opcional)
      → Habitación vuelve a EN_LIMPIEZA
      → Camarera recibe alerta: "Re-limpieza requerida — Hab 302 — motivo: [descripción]"
      → Si es 2ª falla → dual-fire GX inbox: "Incidencia calidad HK — hab 302 — 2ª inspección fallida"
12. FO asigna la habitación LIMPIA al próximo huésped en check-in
```

#### Flujo 2 — Gestión de habitación ocupada con DND extendido

```
Función: Protocolo DND (Do Not Disturb) extendido
──────────────────────────────────────────────────
1. Huésped activa DND: o cuelga el cartel físico o lo activa vía app portal huésped
2. Sistema registra: "HAB 405 — DND activo desde 09:30"
3. En la hoja de trabajo de la camarera: HAB 405 aparece marcada como "DND — omitir"
4. Sistema monitora el tiempo transcurrido con DND activo:
   - Si DND < 8 horas: normal, no hacer nada
   - Si DND supera el umbral del tenant (configurable, default: 24 horas sin contacto verificado):
     → Sistema genera alerta para Supervisora / Gobernanta
     → Supervisora notifica a Jefe de Recepción: "Huésped en HAB 405 lleva +24h con DND sin contacto"
     → FO intenta contacto discreto: llamada suave, nota bajo la puerta
     → Si no hay respuesta en 2h adicionales → Jefe FO + Seguridad hacen wellness check en puerta
     → Se registra todo en el log de incidencias
5. Cuando el huésped desactiva DND (o sale):
   → HAB 405 vuelve a la cola de limpieza estándar o se registra como "servicio solicitado"
```

#### Flujo 3 — Reporte de desperfecto desde HK

```
Función: Detección y reporte de desperfecto en habitación
──────────────────────────────────────────────────────────
1. Camarera durante limpieza detecta un desperfecto:
   ejemplo: "el grifo del baño gotea" / "la TV no enciende" / "mancha en la moqueta"
2. Camarera abre formulario de reporte en la app:
   - Categoría: fontanería / electricidad / mobiliario / climatización / otro
   - Descripción breve
   - Fotos (cámara del móvil desde la app)
   - Urgencia: urgente (impide uso de habitación) / normal (reparable sin bloquear)
3. Si urgencia = URGENTE:
   → Sistema cambia estado hab a OCUPADA_CON_INCIDENCIA o BLOQUEADA (según si hay huésped)
   → Sistema crea tarea urgente en portal de Mantenimiento: descripción + fotos + habitación
   → FO recibe alerta: "HAB 302 bloqueada — desperfecto urgente — pendiente Mantto"
   → Dual-fire GX inbox: "Incidencia grave HK — HAB 302 — [descripción]"
4. Si urgencia = NORMAL:
   → Sistema crea tarea normal en portal de Mantenimiento: descripción + fotos + habitación
   → La habitación puede estar en servicio pero con incidencia registrada
5. Cuando Mantto resuelve la tarea:
   → Mantto cierra la tarea en su portal
   → HK recibe notificación: "Tarea resuelta — HAB 302 — pendiente limpieza post-reparación"
   → Gobernanta programa limpieza post-reparación si la habitación estuvo bloqueada
   → Tras limpieza + inspección OK: hab vuelve a LIMPIA / LIBRE
```

#### Flujo 4 — Control de lencería y lavandería (interno/tercerizado)

```
Función: Ciclo de lencería diario
──────────────────────────────────
MODO LAVANDERÍA INTERNA:
1. Fin de turno mañana: camareras traen toda la ropa sucia al office de lencería
2. Encargada de Lencería registra en sistema:
   - Número y tipo de piezas entrantes: sábanas, fundas, toallas, albornoces, etc.
   - Sistema descuenta del stock "en limpio" y agrega a "en lavado"
3. Lavandería interna procesa: lavar → secar → planchar → doblar → clasificar
4. Encargada de Lavandería registra piezas listas: cantidad, tipo
   - Sistema actualiza stock: "en lavado" → "en limpio disponible"
   - Piezas deterioradas → registrar como baja con foto → alerta de reposición si stock mínimo
5. Distribución: camareras retiran ropa limpia necesaria para el turno siguiente

MODO LAVANDERÍA TERCERIZADA:
1. Fin de turno mañana: camareras traen ropa sucia al office
2. Encargada registra en sistema: albarán de salida (cantidad y tipo de piezas enviadas al proveedor)
3. Proveedor recoge (hora acordada contractualmente)
4. Al día siguiente: proveedor entrega lencería limpia
5. Encargada verifica cantidad y calidad; registra en sistema: albarán de entrada
   - Diferencias entre enviado y recibido → registrar como incidencia con proveedor
   - Piezas deterioradas → registrar y reclamar al proveedor
6. Sistema actualiza stock y alerta si quedan pocas piezas antes de la próxima entrega
7. Sistema exporta datos de albaranes para Admin (facturación del servicio externo)
```

#### Flujo 5 — Preparación de habitación VIP

```
Función: Protocolo habitación VIP pre-check-in
────────────────────────────────────────────────
1. Reserva con flag VIP llega a HK con antelación (configurado en Comercial / FO al confirmar la reserva)
2. HK recibe alerta: "Huésped VIP — [Nombre] — Hab 501 Suite — llegada prevista 16:00"
3. Gobernanta asigna la habitación VIP a la mejor camarera disponible con tiempo extra asignado
4. Camarera realiza limpieza VIP siguiendo el checklist ampliado:
   - Limpieza estándar completa
   - Amenities premium (según estándar VIP del tenant: champán, frutas, flores, notas personalizadas)
   - Configuración personalizada: temperatura del cuarto, almohadas específicas, preferencias guardadas del huésped
   - Minibar completo y verificado
   - Lencería de mayor calidad si el tenant lo distingue
5. Gobernanta realiza inspección personal (no delega en supervisora para VIP)
6. Gobernanta aprueba y FO recibe: "Hab 501 — VIP ready"
7. FO coordina la bienvenida adicional (ver flujo check-in FO)
8. Dual-fire GX inbox: "Habitación VIP lista — Hab 501 — pendiente llegada [Nombre]"
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `housekeeping_task` | Sí | No | organization_id, id, room_id, type (checkout/stayover/deep/vip/special), status (pending/in_progress/done/inspected/rejected), assigned_to, started_at, finished_at, inspection_result (pass/fail), inspection_notes, rejection_reason, priority (high/normal/low) | `checklist_responses JSONB`, `custom_fields JSONB` | → `room`, `hk_staff_member`, `maintenance_task` (si genera desperfecto) |
| `room` | No (owner FO) | Sí | organization_id, id, number, floor, type, status, features | — | → `housekeeping_task` |
| `maintenance_report` | Sí (HK crea, Mantto es co-owner) | No | organization_id, id, room_id, reported_by (hk_staff_id), category, description, urgency, photos JSONB[], status, reported_at, resolved_at | `custom_fields JSONB` | → `room`, `maintenance_task` (Mantto module) |
| `hk_staff_member` | Sí | No | organization_id, id, full_name, role (camarera/supervisora/gobernanta/laundry), floor_zone, shift, status (active/on_leave/off), tasks_today INT | `custom_fields JSONB` | → `housekeeping_task`, `timekeeping_record` |
| `linen_stock` | Sí | No | organization_id, id, item_type (sheet/pillowcase/towel/bathmat/bathrobe/tablecloth/other), quantity_clean, quantity_dirty, quantity_in_laundry, minimum_stock, unit_cost | — | → `linen_movement` |
| `linen_movement` | Sí | No | organization_id, id, item_type, quantity, direction (out_dirty/in_clean/write_off/new_stock), date, shift, operator_id, notes | — | → `linen_stock` |
| `laundry_order` | Sí | No | organization_id, id, date, type (internal/external), items JSONB (tipo+cantidad), sent_at, received_at, status, provider_id (si external), discrepancies JSONB | — | → `linen_movement`, `laundry_provider` |
| `laundry_provider` | Sí | No | organization_id, id, name, contact, pickup_schedule, delivery_schedule, contract_ref, active | — | → `laundry_order` |
| `cleaning_product_stock` | Sí | No | organization_id, id, product_name, category, quantity, unit, minimum_stock, supplier_ref | — | → `cleaning_product_movement` |
| `cleaning_product_movement` | Sí | No | organization_id, id, product_id, quantity, direction (use/restock), date, operator_id | — | → `cleaning_product_stock` |
| `hk_incident` | Sí | No | organization_id, id, room_id, type (dnd_extended/double_rejection/vip_issue/grave), description, status, created_at, resolved_at, escalated_to | — | → `room`, `hk_staff_member` |
| `guest_laundry_service` | Sí | No | organization_id, id, guest_id, room_id, folio_id, items_description, picked_up_at, delivered_at, amount_charged, status | — | → `guest` (FO), `folio_item` (FO) |
| `hk_shift_summary` | Sí | No | organization_id, id, date, shift, rooms_cleaned INT, rooms_rejected INT, rooms_pending INT, avg_clean_time_minutes, incidents INT, notes | — | — |

**Diagrama ER simplificado:**

```
hk_staff_member ──────< housekeeping_task ──────> room (from FO)
                                │
                                └──────> maintenance_report ──> room

linen_stock ──────< linen_movement
linen_stock ◄───── laundry_order ──────> laundry_provider

cleaning_product_stock ──────< cleaning_product_movement

room ──────< hk_incident

guest (from FO) ──────< guest_laundry_service ──────> folio_item (from FO)
```

---

## 7. Máquinas de estado

```
=== TAREA DE HOUSEKEEPING (housekeeping_task.status) ===

PENDING ──asignada a camarera──> ASSIGNED
ASSIGNED ──camarera inicia──> IN_PROGRESS
IN_PROGRESS ──camarera finaliza──> AWAITING_INSPECTION
AWAITING_INSPECTION ──supervisora inspecciona, aprueba──> INSPECTED_OK
AWAITING_INSPECTION ──supervisora inspecciona, rechaza──> REJECTED
REJECTED ──asignada re-limpieza──> IN_PROGRESS
INSPECTED_OK ──(terminal: hab pasa a LIMPIA)──>
PENDING ──bloqueada (hab bloqueada)──> ON_HOLD
ON_HOLD ──hab desbloqueada──> PENDING

Regla especial:
- Si REJECTED por segunda vez → ESCALATED (alerta gobernanta + dual-fire GX)

Transiciones autorizadas por rol:
- Sistema: PENDING (auto, post check-out de FO)
- Gobernanta / Supervisora: PENDING → ASSIGNED, ON_HOLD ↔ PENDING
- Camarera: ASSIGNED → IN_PROGRESS, IN_PROGRESS → AWAITING_INSPECTION
- Supervisora / Gobernanta: AWAITING_INSPECTION → INSPECTED_OK / REJECTED


=== HABITACIÓN (room.status) — HK como actor ===

(La máquina de estado completa está en front-office.md §7; aquí el rol de HK)

EN_LIMPIEZA ──HK finaliza tarea──> LIMPIA (pending inspección interna)
LIMPIA ──FO confirma OK──> LIBRE (FO hace el último paso de LIMPIA → LIBRE)
OCUPADA_CON_INCIDENCIA ──mantto resuelve + HK limpia──> OCUPADA (o LIMPIA si era check-out)
BLOQUEADA ──HK hizo limpieza post-reparación + inspección──> LIMPIA → FO → LIBRE

Transiciones donde HK es el actor:
- EN_LIMPIEZA → LIMPIA: gobernanta/supervisora marca inspección aprobada
- OCUPADA con queja limpieza → EN_LIMPIEZA parcial (re-limpieza urgente)


=== REPORTE DE DESPERFECTO (maintenance_report.status) ===

OPEN ──enviado a Mantto──> ASSIGNED_TO_MAINTENANCE
ASSIGNED_TO_MAINTENANCE ──Mantto resuelve──> RESOLVED
RESOLVED ──HK limpieza post-reparación──> PENDING_HK_CLEANUP
PENDING_HK_CLEANUP ──HK limpieza completa e inspección OK──> CLOSED

OPEN ──urgente, hab bloqueada──> HAB_BLOCKED + ASSIGNED_TO_MAINTENANCE (simultáneo)


=== STOCK DE LENCERÍA (linen_stock) — alerta ===

NORMAL ──movimiento reduce stock bajo mínimo──> ALERTA_MÍNIMO
ALERTA_MÍNIMO ──reposición recibida──> NORMAL
ALERTA_MÍNIMO ──stock llega a cero──> CRÍTICO
CRÍTICO ──reposición urgente recibida──> NORMAL
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| **Front Office Module** | Interna (event-bus) | Bidireccional | Obligatoria | Recibe eventos check-in/out, DND, solicitudes de huésped. Envía estado de habitaciones, listo-para-asignar. Esta es la integración más crítica del módulo. |
| **Maintenance Module** | Interna (event-bus) | Bidireccional | Obligatoria | Envía reportes de desperfecto. Recibe notificación de reparación completa para limpiar y liberar. |
| **Storeroom / Economato** | Interna (event-bus) | Bidireccional | Importante | HK solicita reposición de lencería y productos de limpieza. Storeroom valida y despacha. |
| **Guest Experience** | Interna (event-bus / dual-fire) | Outbound | Importante | Eventos de calidad: inspección fallida × 2, queja de limpieza, incidencia grave, hab VIP lista. |
| **Sistema de control de accesos / llaves** | Externo (API fabricante) | Inbound (logs) | Importante | Log de accesos del personal HK a habitaciones; útil para auditoría y seguridad. Mismo fabricante que FO (Assa Abloy / Salto). |
| **Proveedor de lavandería tercerizada** | Externo (email/fax/portal proveedor) | Bidireccional | Opcional (si tercerizada) | Envío de albaranes de salida y recepción. Algunos proveedores tienen portal propio; integración manual si no hay API. |
| **Contabilidad (Holded / A3 / Sage / Contabilium)** | Externo | Outbound | Opcional | Exporta costos de lavandería (externa) y consumo de lencería/productos para asientos contables. |
| **WhatsApp / SMS / notificaciones push** | Externo (Twilio / similar) | Outbound | Opcional | Notificaciones push a las tablets/móviles de las camareras (si el tenant usa app nativa). En versión básica: las notificaciones van vía browser/PWA. |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Ciclo de limpieza (check-out / estancia) | ✓ | | | | Idéntico en ambas geografías |
| Inspección y control de calidad | ✓ | | | | |
| Gestión de lencería y lavandería | ✓ | | | | |
| Áreas públicas | ✓ | | | | |
| Toggle lavandería interna/tercerizada | ✓ | | | | |
| Nomenclatura "camarera de pisos" / "mucama" | | | | ✓ | ES: "camarera de pisos" · AR: "mucama" (término más usado) — ver §11 |
| Nomenclatura "gobernanta" / "ama de llaves" | | | | ✓ | ES: "gobernanta" (estándar) · AR: "gobernanta" o "ama de llaves" (ambos en uso) |
| PRL — fichas de seguridad de productos químicos | | | | ✓ | ES: Ley 31/1995 + Real Decreto 374/2001 (agentes químicos) exige ficha de seguridad de cada producto de limpieza en el local. AR: Ley 19.587 / Dec. 351/79 — requisitos similares pero reglamentación distinta. |
| Protocolo de riesgos musculoesqueléticos | | | | ✓ | ES: NTP específicas del INSST para camareras de piso. AR: Resolución SRT sobre riesgos ergonómicos — misma problemática, marco regulatorio distinto. |
| Control de pesos máximos por carro | | | | ✓ | ES: RD 487/1997 (manipulación manual de cargas) — límite 25 kg. AR: Decreto 351/79 Anexo I — límite similar pero sin especificidad de hostelería. |
| Gestión de residuos | | | | ✓ | ES: Ley 7/2022 de Residuos — separación por categorías obligatoria. AR: normativa municipal (CABA, Córdoba, etc.) varía. |
| Toxicología de productos de limpieza | ✓ | | | | Fichas de seguridad MSDS son internacionales |
| Certificación APPCC | ✓ | | | | Si HK gestiona mantelería de restaurante → APPCC aplica para contacto con alimentos |
| Minibar — tipos de IVA en cargo al folio | | | | ✓ | ES: IVA 10% alimentos, 21% bebidas alcohólicas — diferenciación en el folio. AR: IVA 21% general; exención para productos básicos — según tipo de producto. |
| Protocolo de menores y habitaciones | ✓ | | | | Ambas: si camarera detecta menor sin adulto en hab → protocolo de alerta a FO |

---

## 10. Slots de extensión (crítico para N2 + multi-tenant)

### 10.1 Campos custom por entidad

```
housekeeping_task.custom_fields: JSONB
  → ejemplo resort todo-incluido: añadir campo "room_service_tray_removed: bool"
  → ejemplo hotel con gestión de migas (halal/kosher): añadir "diet_protocol_applied: enum"
  → ejemplo hotel ecológico: añadir "eco_amenities_used: bool", "eco_linen_change: bool"

hk_staff_member.custom_fields: JSONB
  → añadir campo de certificación de riesgos laborales (ES/AR) — fecha de formación PRL/SyH
  → añadir "languages_spoken: []" para hoteles internacionales que asignan camarera según idioma del huésped

linen_stock.custom_fields: JSONB
  → ejemplo hotel de lujo: añadir "thread_count", "brand", "age_category" (nuevo/usado/obsoleto)
```

### 10.2 Workflows custom

```
pre_assign_room:
  → tenant puede agregar regla custom de asignación
  → ejemplo: "si hay huésped alérgico al polvo, asignar camarera con formación específica"
  → ejemplo: "si es cliente recurrente platino, asignar gobernanta personalmente"

post_room_cleaned:
  → tenant puede disparar acciones post-limpieza
  → ejemplo: enviar notificación push al huésped en estadía "Su habitación está lista tras el servicio de limpieza"

pre_inspection:
  → tenant puede definir checklist de inspección personalizado (ver 10.6)

post_inspection_fail:
  → tenant puede configurar cuántas fallas disparan un alerta a dirección
  → ejemplo: "si la misma camarera tiene 3 rechazos en un día, notificar a gobernanta"

post_inspection_ok:
  → tenant puede configurar si se notifica automáticamente al huésped que la habitación está lista
  → ejemplo: "enviar push 'Su habitación está lista, puede pasar cuando guste'"

pre_laundry_order:
  → tenant puede agregar validaciones antes de registrar pedido de lavandería
  → ejemplo: "verificar que el stock de limpio no es ya suficiente antes de lanzar pedido"

post_desperfecto_report:
  → tenant puede configurar notificaciones adicionales
  → ejemplo: "si es categoría fontanería, notificar también al seguro del hotel"
```

### 10.3 Integraciones per-tenant

Integraciones que el tenant puede activar:

- **Sistema de llaves / accesos:** mismo que FO — Assa Abloy, Salto, KABA (para logs de acceso del personal HK)
- **Proveedores de lavandería tercerizada:** integración manual (albaranes por email) o API si proveedor lo soporta
- **Contabilidad:** Holded, A3, Sage, Contabilium — exporta costos HK a asientos contables
- **Gestión de residuos / sostenibilidad:** integración con módulo Sostenibilidad (opcional, transversal)
- **App nativa móvil HK:** si el tenant activa la app nativa para camareras (PWA es el default; app nativa es upgrade)

### 10.4 Branding/UI per-tenant

- Nombre del sector customizable: "Gobernanta" / "Ama de llaves" / "Housekeeping" / "Pisos" (lo que el tenant prefiera)
- Nombre del operativo customizable: "Camarera" / "Mucama" / "Room Attendant" / etc.
- Checklist de limpieza e inspección: el tenant define sus propios ítems (sobre la plantilla base) — ver 10.6
- Logo y colores en la app de camarera (si tiene branding interno del hotel)

### 10.5 Idiomas

- Diccionario i18n del tenant: sobrescribe strings en es-ES, es-AR o en
- La app de camarera puede servirse en idioma preferido de la operaria (relevante en hoteles con personal migrante cuyo primer idioma puede ser inglés, rumano, árabe, tagalo, etc.)

### 10.6 Checklists configurables por tenant (extensión especial de HK)

```
checklist_cleaning_template: JSON (definido por tenant por tipo de habitación)
  → Items estándar provistos por Bravas (90% de los hoteles los usan)
  → Items adicionales que el tenant define:
    ejemplo boutique ecológico:
      - "¿Toallas dobladas con origami ecológico? bool"
      - "¿Reemplazados amenities solo los que están casi vacíos? bool"
      - "¿Uso de producto solo eco-certificado? bool"
    ejemplo hotel de negocios:
      - "¿Cable HDMI en cajón verificado? bool"
      - "¿Bloque de notas y bolígrafo reemplazados? bool"
      - "¿Cargadores inalámbricos funcionando? bool"

checklist_inspection_template: JSON (similar, por tipo de habitación)
  → Gobernanta define qué inspecciona y con qué criterio de aprobación/rechazo
```

---

## 11. Nomenclatura i18n (tabla de términos del sector)

| Término técnico | es-ES default | es-AR default | en default | Customizable por tenant |
|---|---|---|---|---|
| `executive_housekeeper` | Gobernanta | Gobernanta / Ama de llaves | Executive Housekeeper | ✓ |
| `hk_supervisor` | Supervisora de Pisos | Supervisora de Pisos | Housekeeping Supervisor | ✓ |
| `room_attendant` | Camarera de pisos | Mucama | Room Attendant | ✓ |
| `laundry_supervisor` | Encargada de Lavandería | Encargada de Lavandería | Laundry Supervisor | ✓ |
| `laundry_attendant` | Operaria de Lavandería | Operaria de Lavandería | Laundry Attendant | ✓ |
| `linen_room_supervisor` | Encargada de Lencería | Encargada de Lencería | Linen Room Supervisor | ✓ |
| `public_area_attendant` | Personal de Áreas Públicas | Personal de Áreas Públicas | Public Area Attendant | ✓ |
| `valet_laundry` | Valet de Lavandería | Valet de Ropa | Laundry Valet | ✓ |
| `housekeeping` | Housekeeping / Pisos | Housekeeping / Mucamas | Housekeeping | ✓ |
| `checkout_cleaning` | Limpieza de salida | Limpieza de salida | Checkout cleaning / Departure clean | ✓ |
| `stayover_cleaning` | Limpieza de estancia | Limpieza de estadía | Stayover cleaning | ✓ |
| `deep_cleaning` | Limpieza profunda | Limpieza profunda | Deep cleaning | ✓ |
| `turndown_service` | Servicio de cobertura / Servicio de noche | Servicio de cobertura | Turndown service | ✓ |
| `do_not_disturb` | No molestar | No molestar | Do Not Disturb (DND) | No |
| `linen` | Lencería / Ropa de cama y baño | Lencería / Ropa blanca | Linen | ✓ |
| `amenities` | Amenidades / Artículos de bienvenida | Amenities / Amenidades | Amenities | ✓ |
| `minibar` | Minibar | Minibar | Minibar | No |
| `laundry` | Lavandería | Lavandería | Laundry | ✓ |
| `maintenance_report` | Parte de averías | Parte de averías / Reporte de desperfecto | Maintenance report | ✓ |
| `checklist` | Checklist / Lista de control | Checklist / Lista de control | Checklist | ✓ |
| `inspection` | Inspección | Inspección | Inspection | ✓ |
| `vip_room_setup` | Preparación habitación VIP | Preparación habitación VIP | VIP room setup | ✓ |
| `housekeeper_cart` | Carro de camarera | Carro de mucama | Housekeeping cart | ✓ |
| `prl_training` | Formación PRL | Formación S&H | Health & Safety training | ✓ |
| `public_areas` | Áreas públicas | Áreas públicas | Public areas | ✓ |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| **Ley 31/1995 de Prevención de Riesgos Laborales (PRL)** | ES | Obliga a la evaluación de riesgos del puesto de camarera de pisos: riesgos musculoesqueléticos (sobreesfuerzo, posturas forzadas), riesgos químicos (productos de limpieza), riesgos biológicos (contacto con ropa sucia). El módulo debe permitir registrar la formación PRL de cada empleada y los protocolos de trabajo seguro aplicados. |
| **Real Decreto 487/1997 (Manipulación manual de cargas)** | ES | Límite de 25 kg para manipulación manual de cargas. Relevante para: peso del carro de camarera, transporte de colchones, lencería pesada. El módulo puede incluir recordatorio/alerta en checklists. |
| **Real Decreto 374/2001 (Agentes químicos)** | ES | Obliga a tener y consultar las fichas de datos de seguridad (FDS/MSDS) de todos los productos químicos de limpieza en el lugar de trabajo. El módulo puede alojar documentos adjuntos de FDS por producto del inventario de limpieza. |
| **NTP 1051 / NTP 1052 del INSST (Camareras de Piso)** | ES | Notas Técnicas de Prevención específicas del INSST para camareras de piso: ergonomía, organización del trabajo, pausas. No es normativa con rango de ley pero es estándar de referencia de Inspección de Trabajo. |
| **Convenio Colectivo de Hostelería (nacional + provinciales ES)** | ES | Regula jornada laboral, descansos, complementos salariales, horas extras y categorías profesionales para camareras de piso. Jornada máxima anual, turnos. Impacta en el módulo de RRHH (horas trabajadas, nómina). HK expone horas reales de trabajo al módulo RRHH. |
| **Ley 19.587 / Decreto 351/79 (Higiene y Seguridad en el Trabajo)** | AR | Equivalente AR de PRL. Exige condiciones de trabajo seguras, iluminación adecuada, espacios suficientes, protección de máquinas, ergonomía. La SRT (Superintendencia de Riesgos del Trabajo) fiscaliza. El módulo debe registrar capacitaciones en Seguridad e Higiene del personal de HK. |
| **Resolución SRT 886/2015 (AR) — Enfermedades profesionales HK** | AR | Reconoce enfermedades musculoesqueléticas como profesionales en personal de limpieza y hotelería. Impacta en la ART (Aseguradora de Riesgos del Trabajo) y en registros de incidentes que debe llevar el módulo. |
| **CCT 362/03 Gastronómicos AR + CCT sector hotelero AR** | AR | Los convenios colectivos de trabajo regulan la jornada, descansos, categorías y salarios de las mucamas en Argentina. HK expone datos de horas para liquidación salarial al módulo RRHH. |
| **APPCC / HACCP (si HK gestiona lencería de restaurante)** | Internacional | Si la gobernanta es responsable de los manteles y lencería del restaurante, existe contacto con superficies que tocan alimentos → análisis de puntos críticos de control. El módulo debe permitir separar circuitos de lencería (habitaciones vs restaurante). |
| **RGPD / Ley 25.326** | UE-ES / AR | Datos del personal de HK (camareras) son datos personales protegidos. Registros de acceso a habitaciones pueden considerarse datos sensibles (revelan ubicación del trabajador). Acceso restringido por rol. Plazos de retención definidos. |
| **Ley 7/2022 de Residuos y Suelos Contaminados** | ES | Separación obligatoria de residuos en 5 fracciones. El módulo puede incluir recordatorio de protocolo de separación en los checklists de las camareras. |
| **Normativa municipal de gestión de residuos** | AR (varía) | CABA, Córdoba, Mendoza tienen normativas de separación de residuos. Impacta en los protocolos de vaciado de papeleras en las habitaciones. |

---

## 13. Dependencias del lifecycle del módulo

**Qué pasa si el módulo se ACTIVA después del hotel ya corriendo:**
- **Datos iniciales requeridos (seed):**
  - Inventario de habitaciones (viene de FO si ya está activo; HK hereda el inventario de rooms)
  - Staff de HK: cargar camareras, supervisoras y gobernanta con sus datos, zona/piso, turno
  - Tipos de habitación y checklists estándar (el sistema provee plantillas base; el tenant puede personalizar)
  - Inventario inicial de lencería (stock de apertura ingresado manualmente)
  - Configuración de lavandería: interna o tercerizada; si tercerizada, datos del proveedor
  - Inventario inicial de productos de limpieza (stock de apertura)
  - Parámetros de PRL/SyH: registrar formaciones existentes del personal
- **Flujo de setup inicial:** Wizard en onboarding → 4 pasos: (1) staff de HK, (2) checklists personalizados, (3) lencería inicial, (4) lavandería (interna/tercerizada)
- **Migración de datos:** si el hotel viene de otro sistema, importar historial de incidencias y mantenimiento via CSV; histórico de tareas en modo solo lectura

**Qué pasa si el módulo se DESACTIVA:**
- Situación teórica (es Core — no se desactiva en producción)
- Si se desactivara: FO pierde la notificación de habitaciones listas; el rack quedaría desactualizado; Mantto pierde el canal de reportes de desperfecto desde HK
- Datos irrecuperables: ninguno (quedarían en DB)
- Módulos afectados: FO (rack inconsistente), Mantto (pierde reportes), Storeroom (pierde solicitudes de reposición), GX (pierde eventos de calidad)
- Procedimiento de archivo: snapshot de DB de tareas abiertas + export CSV de stock de lencería y productos

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| **% habitaciones listas a tiempo** | Habs inspeccionadas OK antes de las 15:00 / Total habs a limpiar ese día × 100 | Diaria | Portal Gobernanta + Dirección | > 90% es target operativo; < 70% es situación de crisis |
| **Tiempo medio de limpieza por habitación** | Suma de (finished_at - started_at) por tipo / cantidad de tareas | Diaria/semanal | Portal Gobernanta | Estándar: 20-30 min estándar · 45-60 min suite · 10-15 min toque de estancia |
| **Tasa de habitaciones rechazadas en inspección** | Tareas con status REJECTED / Total tareas inspeccionadas × 100 | Semanal | Portal Gobernanta | < 5% es estándar de calidad; > 10% indica problema sistémico |
| **% de habitaciones re-limpiadas 2+ veces** | Tareas con 2+ ciclos rechazados / Total tareas × 100 | Semanal | Portal Gobernanta | < 2%; cada una activa dual-fire GX |
| **Quejas de limpieza recibidas** | Número de complaints de categoría "limpieza" en FO | Semanal/mensual | Portal Gobernanta + GX | < 1% de las estadías activas |
| **Productividad camarera (habs/turno)** | Habs limpias e inspeccionadas OK / turno por camarera | Diaria | Portal Gobernanta | 10-16 habs/turno estándar (urbano); varía por tipo de hab |
| **Tiempo medio de respuesta en solicitudes de huésped (HK)** | (fulfilled_at - created_at) para requests asignadas a HK | Semanal | Portal Gobernanta + GX | < 15 min para toallas / almohadas; < 30 min otros |
| **Costo de lavandería por habitación** | Costo total lavandería del mes / habs-noche del mes | Mensual | Portal Dirección + Admin | Varía mucho según si interna/tercerizada y mercado |
| **Consumo de lencería (piezas dadas de baja/mes)** | Número de piezas deterioradas + faltantes del mes | Mensual | Portal Gobernanta | < 2% del stock total por mes |
| **Stock de lencería días de cobertura** | Stock limpio actual / consumo medio diario | Continuo | Portal Gobernanta | > 2 días de cobertura como mínimo (si tercerizada); > 1 día si interna |
| **Incidentes de PRL/SyH del sector** | Número de accidentes / incidentes laborales del equipo HK | Mensual | Portal RRHH + Dirección | 0 es el target; comparar con SRT/INSST sectorial |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol que la ve | Función principal | Mockup existente |
|---|---|---|---|---|
| `/housekeeping/camarera` | Operativo HK | Camarera de piso | Panel de trabajo diario: lista de habitaciones asignadas, estado, botones de inicio/fin/reporte | Sí — `mockup/v2.5/empleado-housekeeping.html` |
| `/housekeeping/supervisor` | Supervisor HK | Supervisora de Pisos | Vista de zona: estado de habitaciones del turno, inspecciones pendientes, alertas, re-limpiezas | No (pendiente — mockup referido parcialmente en `empleado-gobernanta.html`) |
| `/housekeeping/gobernanta` | Supervisor/Jefe HK | Gobernanta | Panel completo: estado en tiempo real de todas las habs, productividad del equipo, lencería, lavandería, incidencias | Sí — `mockup/v2.5/empleado-gobernanta.html` |
| `/housekeeping/room-status` | Supervisor/Jefe HK | Gobernanta / Supervisora | Mapa visual de todas las habitaciones con su estado HK actual (EN_LIMPIEZA / LIMPIA / PENDIENTE_INSPECCIÓN / BLOQUEADA) | No (pendiente) |
| `/housekeeping/task/:id` | Operativo HK | Camarera / Supervisora | Detalle de tarea: checklist a seguir, campos a completar, reportar desperfecto, foto | No (pendiente) |
| `/housekeeping/inspection/:id` | Supervisor HK | Supervisora / Gobernanta | Checklist de inspección: marcar ítems, agregar nota, foto, aprobar o rechazar | No (pendiente) |
| `/housekeeping/maintenance-report` | Operativo HK | Camarera | Formulario de reporte de desperfecto: categoría, descripción, foto, urgencia | No (pendiente) |
| `/housekeeping/laundry` | Supervisor HK | Gobernanta / Encargada Lavandería | Gestión de lencería: stock actual, enviar a lavandería, recibir de lavandería, registrar bajas | No (pendiente) |
| `/housekeeping/cleaning-products` | Supervisor HK | Gobernanta / Encargada Lencería | Inventario de productos de limpieza: stock, alertas de mínimo, solicitar a Economato | No (pendiente) |
| `/housekeeping/guest-laundry` | Operativo HK | Valet Lavandería / Camarera | Registrar ropa de huésped recogida y entregada; cargar al folio | No (pendiente) |
| `/housekeeping/shift-summary` | Supervisor/Jefe HK | Gobernanta | Resumen del turno: métricas, incidencias, pendientes para turno siguiente | No (pendiente) |
| `/housekeeping/schedule` | Supervisor/Jefe HK | Gobernanta | Planificación semanal: deep cleanings, asignaciones especiales, cobertura de ausencias | No (pendiente) |
| `/housekeeping/vip-setup` | Supervisor/Jefe HK | Gobernanta / Supervisora | Lista de habitaciones VIP del día: estado de preparación, checklist ampliado | No (pendiente) |
| `/housekeeping/incidents` | Supervisor/Jefe HK | Gobernanta | Lista de incidencias activas: DND extendido, rechazos múltiples, hab bloqueada por grave | No (pendiente) |
| `/direction/housekeeping-kpis` | Portal Dirección | Director General / Director Operaciones | KPIs de HK: % listas a tiempo, productividad, costo lavandería, quejas limpieza | No (pendiente) |

---

## 16. Riesgos conocidos y preguntas abiertas

**Riesgo 1: Conectividad en pisos — camareras sin señal WiFi estable**
La app de camarera (PWA en móvil/tablet) requiere conectividad para actualizar el estado de las habitaciones en tiempo real. En hoteles con infraestructura WiFi deficiente, puede haber lagunas de conectividad en los pisos. Mitigación: diseñar la PWA con modo offline-first (guarda las actualizaciones localmente y las sincroniza al recuperar señal); en el peor caso, la supervisora puede actualizar manualmente desde el panel.

**Riesgo 2: Diversidad de dispositivos usados por las camareras**
El perfil tecnológico del personal de piso varía enormemente: desde camareras que solo usan smartphone básico hasta las que usan tablet asignada por el hotel. Mitigación: la interfaz de camarera debe ser extremadamente simple (3-4 botones principales, texto grande, sin menús profundos), optimizada para pantallas de 5-6" y para uso con guantes.

**Riesgo 3: Resistencia al cambio del personal operativo de HK**
Las camareras de piso en muchos hoteles AR/ES llevan años trabajando con listas de papel. La migración a sistema digital requiere formación y voluntad de cambio. Mitigación: diseño de onboarding progresivo; opción de "modo papel" (imprimir la hoja de trabajo desde el sistema) mientras se hace la transición; la gobernanta puede actuar como campeona del cambio.

**Riesgo 4: Precisión del minibar — cargo incorrecto al huésped**
Si la camarera registra incorrectamente el consumo del minibar (ítem que no se consumió o que olvidó registrar), el huésped puede reclamar y dañar la experiencia. Mitigación: flujo de minibar con confirmación doble (camarera registra → supervisora verifica en inspección) para cuentas de más de X importe (configurable por tenant).

**Riesgo 5: Gestión de lavandería tercerizada — dependencia de proveedor único**
Si el proveedor de lavandería falla (huelga, cierre, daños masivos), el hotel puede quedarse sin lencería limpia. Mitigación: el módulo debe poder gestionar fácilmente el cambio a proveedor alternativo; y emitir alertas anticipadas de stock bajo para dar margen de reacción.

**Pregunta abierta 1: ¿Checklists de inspección son responsabilidad de la gobernanta o los define Bravas?**
La decisión de qué se inspecciona y con qué criterio es muy específica de cada hotel (algunos tienen 10 ítems, otros 40). El template base de Bravas puede cubrir los 15-20 ítems universales, pero el sistema debe permitir que la gobernanta personalice los checklists sin ayuda técnica. → Decisión de producto para Daniel: ¿quién crea los checklists custom, la gobernanta directamente en la app o solo el admin técnico del tenant?

**Pregunta abierta 2: ¿La app de camarera es PWA o app nativa?**
Una app nativa da mejor experiencia offline y acceso a cámara nativa, pero requiere publicar en Google Play / App Store y mantener dos codebases. Una PWA es más económica y portable pero con limitaciones en offline y cámara. Para v1 recomendaría PWA. Para v2 (si hay demanda) app nativa. → Decisión de roadmap para Daniel y arquitecto.

**Pregunta abierta 3: ¿El módulo de lavandería interna merece sub-módulo propio con gestión de equipos?**
Si el tenant activa lavandería interna con mucha capacidad (resort con 300 habs y lavandería propia de 10 máquinas), el módulo se vuelve complejo: gestión de programas de lavado, mantenimiento de máquinas, turnos de operarias, consumo de detergente, etc. ¿Incluirlo en el core de HK o como pack opcional? → Decisión arquitectónica para el arquitecto.

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación inicial del catálogo Housekeeping — 17 secciones completas, 48 funciones, 5 flujos pseudocódigo | bravas |
