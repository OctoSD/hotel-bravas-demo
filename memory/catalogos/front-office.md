# Catálogo exhaustivo — Front Office / Recepción

> Sector Core del producto SaaS hotelero **BravasHotel** (nombre de trabajo; nombre comercial definitivo pendiente).
> Namespace técnico: `@octo/bravashotel-front-office`

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Recepción / Front Office |
| **Nombre (es-AR)** | Recepción / Front Office |
| **Nombre (en)** | Front Office / Rooms Division Reception |
| **Código técnico** | `@octo/bravashotel-front-office` |
| **Tipo** | Core — siempre activo en todo tenant |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | `auth`, `timekeeping`, `i18n`, `branding`, `tenant-config`, `event-bus`, `audit-log` |
| **Módulos dependientes de éste** | `housekeeping` (recibe eventos de check-in/out), `admin-cfo` (folio y factura), `commercial` (reservas se originan aquí o se confirman aquí), `guest-experience` (dual-fire en cada evento huésped), `storeroom` (minibar), `security` (incidents log) |
| **Activación default** | Siempre activo |

---

## 2. Propósito del módulo

**Qué resuelve:** Front Office es la cara visible del hotel y el nodo central de operaciones en tiempo real. Resuelve el ciclo completo de presencia física del huésped en el hotel: desde que el huésped llega (check-in) hasta que se va (check-out), incluyendo la gestión de habitaciones disponibles, la asignación de llaves, el cobro de servicios adicionales (folio), la atención de solicitudes y quejas durante la estadía, el control de accesos, la coordinación nocturna (night audit), y la operación de conserjería y bell desk (equipaje, llamadas, traslados). Es además el receptor primario de todas las alertas e incidencias que suceden en el hotel cuando no hay otro sector disponible.

**Qué NO resuelve:**
- La limpieza de habitaciones (es de Housekeeping).
- La venta de nuevas reservas desde canales externos OTA (es de Comercial / channel manager).
- La facturación definitiva con firma digital y envío a AFIP/Verifactu (es de Admin/CFO, aunque FO prepara el folio).
- La atención de quejas que escalan a nivel GX formal (dual-fire dispara a Guest Experience que toma ownership).
- El control de stocks de minibar (registro en FO, reposición en HK, costo en Storeroom).
- La nómina de empleados del sector (es de RRHH).

**Métrica principal de éxito del sector:**
- **RevPAR** (Revenue per Available Room) como KPI-estrella: agrupa occupancy + ADR. FO lo mueve directamente via asignación de habitaciones, upgrades, y conversión de walk-ins.
- KPIs secundarios: tiempo medio de check-in (< 3 min target), tasa de upgrades completados, Net Promoter Score de llegada (dual-fire GX).

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Jefe del sector | Jefe de Recepción | Jefe de Recepción | Front Office Manager (FOM) | 2 | Director General / Director de Operaciones | Supervisores + Recepcionistas + Conserjes + Night Auditor | En hoteles chicos hace también turnos operativos |
| Supervisor de turno | Supervisor de Recepción | Supervisor de Recepción | Front Desk Supervisor | 3 | Jefe de Recepción | Recepcionistas del turno | En hoteles medianos; en chicos puede ser el mismo FOM |
| Recepcionista | Recepcionista | Recepcionista | Front Desk Agent / Receptionist | 4 | Supervisor de turno | — | En boutique chico: hace también conserjería y caja |
| Conserje / Botones | Conserje / Botones | Conserje / Botones | Concierge / Bellboy / Porter | 4 | Jefe de Recepción / Supervisor | — | En 5* puede escalar a Chief Concierge con sub-equipo propio (Les Clefs d'Or) |
| Agente de Reservas | Agente de Reservas | Agente de Reservas | Reservations Agent | 4 | Jefe de Recepción (en boutique) o Jefe Comercial (en 4*+) | — | En 4*+ se mueve bajo Comercial; en boutique chico lo hace el recepcionista |
| Auditor Nocturno | Auditor Nocturno | Auditor Nocturno | Night Auditor | 4 | Jefe de Recepción | — | Cubre turno noche; hace funciones de cierre + auditoría diaria |
| Valet / Aparcacoches | Valet | Valet | Valet / Parking Attendant | 4 | Jefe de Recepción | — | Solo en hoteles con parking propio; opcional |

**Variantes por tamaño de hotel:**
- **Boutique chico (< 40 habs):** Un único recepcionista por turno cubre todo: check-in, caja, conserjería, reservas por teléfono, minibar check. Night audit puede hacerlo el jefe o estar tercerizado como "guardianía". Sin supervisor formal.
- **Urbano 4* mediano (80-150 habs):** Jefe de Recepción + 5-8 recepcionistas distribuidos en 3 turnos (mañana/tarde/noche) + 2-3 botones + Night Auditor dedicado. Reservas puede ir migrando hacia Comercial.
- **Resort / 5* grande (200+ habs):** Rooms Division Manager agrupa FO + HK + Reservas + Concierge bajo un Director. FOM reporta a ese Director. Chief Concierge con equipo propio (Les Clefs d'Or si es 5*). Valet dedicado.

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | Sí | Pre-check-in online, consulta estado de habitación, solicitudes durante estadía (almohada extra, taxi, despertador), factura digital, check-out express, valoración de estadía |
| Portal Operativo de Recepción | Sí | Panel de operaciones en tiempo real: rack de habitaciones, colas de check-in/out, folio del huésped, planilla policial/hotelera, llaves, mensajes internos, solicitudes pendientes |
| Portal Supervisor/Jefe | Sí | Vista de turno completo: ocupación del día, rate actual, upgrades disponibles, incidencias abiertas, resumen de folio por huésped, aprobación de descuentos |
| Portal Dirección | Sí | Dashboard RevPAR, occupancy, ADR del día; alertas de overbooking; comparativa semana/mes; picking de reservas VIP |
| **GX inbox (dual-fire)** | Sí | Check-in completado (con nombre huésped, hab, fecha), check-out realizado, solicitud de huésped abierta, queja registrada, upgrade asignado, long-stay flag activado |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Check-in presencial | Búsqueda de reserva, verificación de identidad, carga planilla policial/hotelera, asignación de habitación, emisión de llave, apertura de folio | Recepcionista | Operativo Recepción | Manual — huésped llega mostrador | Continua | Core | Sí |
| 2 | Check-in express / pre-check-in online | El huésped completa sus datos e identidad antes de llegar; llega al mostrador y solo recibe llave | Sistema + Recepcionista (confirmación) | Portal Huésped + Operativo | Automático — huésped lo inicia desde app/email | Continua | Core | Sí |
| 3 | Check-out presencial | Presentar folio al huésped, procesar pago, liberar habitación, emitir factura, notificar a HK | Recepcionista | Operativo Recepción | Manual — huésped llega a caja | Continua | Core | Sí |
| 4 | Check-out express | El huésped revisa y aprueba el folio desde el portal y deja llave sin pasar por mostrador | Sistema + Recepcionista (supervisión) | Portal Huésped + Operativo | Automático — huésped inicia desde app | Continua | Core | Sí |
| 5 | Late check-out | Autorizar estadía extendida (con cargo o sin cargo según disponibilidad y política) | Supervisor / Jefe de Recepción | Operativo Recepción | Manual — huésped solicita o se detecta en mañana de checkout | Diaria | Core | No |
| 6 | Early check-in | Habilitar entrada anticipada si hay habitación disponible (con cargo o cortesía según política) | Supervisor / Jefe de Recepción | Operativo Recepción | Manual — huésped solicita al llegar | Diaria | Importante | No |
| 7 | Asignación de habitación | Cruzar disponibilidad real con tipo reservado + preferencias del huésped + upgrade automático si disponible | Sistema (auto) + Recepcionista (override) | Operativo Recepción | Automático al confirmar check-in | Continua | Core | No |
| 8 | Upgrade de habitación | Ofrecer habitación superior (upsell) al momento del check-in; registrar motivo y tarifa extra si aplica | Recepcionista / Supervisor | Operativo Recepción | Manual — oferta en mostrador | Continua | Importante | Sí |
| 9 | Cancelación de reserva con cargo | Procesar cancelación fuera del período gratuito, calcular penalidad, notificar a Comercial y Admin | Recepcionista / Jefe | Operativo Recepción | Manual o automático (canal externo) | Diaria | Core | No |
| 10 | Walk-in (reserva sin previo aviso) | Verificar disponibilidad en tiempo real, ofrecer tarifa rack, crear reserva exprés, iniciar check-in | Recepcionista | Operativo Recepción | Manual — huésped llega sin reserva | Continua | Core | Sí |
| 11 | No-show | Registrar el no-show, aplicar cargo si política lo indica, liberar habitación a las 24h o según regla del tenant | Recepcionista / Sistema | Operativo Recepción + Sistema | Automático — disparado a hora límite sin check-in | Diaria | Core | No |
| 12 | Gestión de llaves (física / digital) | Emisión de tarjeta o llave digital (NFC/app), duplicado por pérdida, desactivación al check-out | Recepcionista | Operativo Recepción | Manual + automático en check-in/out | Continua | Core | No |
| 13 | Folio del huésped — apertura | Crear cuenta corriente del huésped al hacer check-in; cargar tarifas, tasas, desayuno, extras según reserva | Sistema | Operativo Recepción | Automático — post check-in | Continua | Core | No |
| 14 | Folio del huésped — cargos adicionales | Registrar consumos durante la estadía: minibar, room service, lavandería, parking, llamadas, servicios solicitados | Recepcionista / Sistema (integración POS) | Operativo Recepción | Manual o automático (POS integrado) | Continua | Core | No |
| 15 | Folio del huésped — cierre y cobro | Presentar folio, aplicar descuentos/convenios, procesar pago (efectivo/tarjeta/transferencia/factura empresa), emitir comprobante | Recepcionista | Operativo Recepción | Manual — durante check-out | Continua | Core | No |
| 16 | Emisión de factura legal | Generar factura con datos fiscales del huésped o empresa: en ES vía Verifactu (ley 2026), en AR vía AFIP WSFE | Sistema + Recepcionista (triggerea) | Operativo Recepción + Admin/CFO | Manual — solicita al check-out o durante estadía | Continua | Core | No |
| 17 | Planilla policial / hotelera | ES: parte del viajero (Ley Orgánica 4/2015 — Ley de Seguridad Ciudadana) — envío a Guardia Civil / CNP en < 24h. AR: planilla hotelera (similar a normativa AFIP-equivalente provincial) — datos del huésped, documento, procedencia, destino | Recepcionista / Sistema | Operativo Recepción | Automático — post check-in con datos de identidad | Continua | Core (legal) | No |
| 18 | Gestión de pasaportes / DNIs | Escaneo del documento de identidad del huésped, almacenamiento cifrado conforme RGPD/Ley 25.326, rechazo si es menor sin autorización | Recepcionista | Operativo Recepción | Manual — durante check-in | Continua | Core (legal) | No |
| 19 | Recepción de equipaje / consigna | Registrar bultos dejados antes del check-in o después del check-out, emitir ticket, entregar al huésped | Conserje / Botones | Operativo Recepción | Manual | Continua | Importante | No |
| 20 | Traslado y coordinación de equipaje | Llevar equipaje a la habitación al check-in; recoger equipaje al check-out; coordinar con taxi/transfer | Botones | Operativo Recepción | Manual — solicitado en check-in/out | Continua | Importante | No |
| 21 | Atención de solicitudes durante estadía | Almohadas extra, cuna, plancha, cargador, traslados, reservas restaurante externo, entradas eventos, información turística | Conserje / Recepcionista | Portal Huésped + Operativo Recepción | Manual (teléfono/mostrador) + automático (app huésped) | Continua | Importante | Sí |
| 22 | Registro de queja o incidencia de huésped | Recibir queja, registrar en sistema, categorizar (limpieza / mantenimiento / servicio / facturación / otro), derivar al sector correspondiente, dar seguimiento | Recepcionista / Supervisor | Operativo Recepción | Manual — huésped lo reporta | Continua | Core | Sí |
| 23 | Seguimiento de incidencia hasta resolución | Verificar que el sector responsable resolvió el problema, notificar al huésped, cerrar el ticket | Supervisor / Jefe | Operativo Recepción + Supervisor | Automático (SLA alert) + manual | Continua | Importante | Sí |
| 24 | Cambio de habitación durante estadía | Mover al huésped a otra habitación (por queja, mejora, overbooking de categoría, etc.); coordinar con HK; actualizar llaves y folio | Supervisor | Operativo Recepción | Manual | Eventual | Importante | No |
| 25 | Gestión de overbooking | Detectar si hay más reservas confirmadas que habitaciones disponibles; buscar alternativas (walkout a hotel vecino, upgrade); registrar acción; notificar a Comercial | Jefe de Recepción | Operativo + Supervisor + Jefe | Automático — sistema detecta solapamiento | Eventual | Core | Sí |
| 26 | Walkout (relocation a otro hotel) | Si no hay habitación para el huésped, gestionar traslado a hotel alternativo de igual o superior categoría, cubrir costo diferencial, mantener reserva futura | Jefe de Recepción | Operativo Recepción + Supervisor | Manual — disparado en situación de overbooking | Eventual | Core | Sí |
| 27 | Comunicación interna (mensajería de turno) | Notas de turno, mensajes entre recepcionistas (traspaso de guardia), alertas a HK / Mantto / Seguridad | Recepcionista | Operativo Recepción | Manual | Continua | Importante | No |
| 28 | Traspaso de turno | Resumen del turno: habitaciones pendientes, incidencias abiertas, cobros diferidos, huéspedes VIP llegando, notas importantes | Recepcionista / Supervisor | Operativo Recepción | Manual — fin de turno | Continua (3 veces/día) | Core | No |
| 29 | Rack de habitaciones (mapa de hotel) | Vista en tiempo real del estado de cada habitación: libre/ocupada/en limpieza/bloqueada/mantenimiento; filtrable por tipo y piso | Sistema | Operativo Recepción + Supervisor | Automático — actualización continua | Continua | Core | No |
| 30 | Bloqueo de habitación | Marcar habitación como no disponible (mantenimiento, reforma, reserva especial, cortesía); indicar motivo y fecha de liberación | Supervisor / Jefe / Mantto | Operativo Recepción | Manual | Eventual | Importante | No |
| 31 | Gestión de reservas de grupos | Check-in en bloque de varios huéspedes del mismo grupo (empresa, tour, boda); asignación simultánea; factura grupal o individual | Jefe de Recepción | Operativo Recepción | Manual — coordinado con Comercial | Eventual | Importante | Sí |
| 32 | Gestión de huéspedes VIP | Detectar huésped VIP (recurrente, empresa clave, invitado especial), activar protocolo de bienvenida (amenity, habitación pre-asignada, nota de bienvenida) | Jefe de Recepción / Conserje | Operativo Recepción + GX inbox | Automático — flag en reserva + manual | Continua | Importante | Sí |
| 33 | Despertador / wake-up call | Registrar solicitud de despertador, ejecutar llamada o notificación app a la hora indicada | Recepcionista / Sistema | Operativo Recepción + Portal Huésped | Manual (solicitud) + automático (ejecución) | Diaria | Importante | No |
| 34 | Gestión de llamadas externas entrantes al hotel | Derivar llamada al departamento correcto, tomar mensaje si está ausente, gestionar directorio interno | Recepcionista | Operativo Recepción | Manual | Continua | Importante | No |
| 35 | Cambio de moneda / caja chica | Facilitar cambio de moneda al huésped (donde autorizado por normativa), gestionar caja chica de recepción, cuadre al fin de turno | Recepcionista | Operativo Recepción | Manual | Continua | Importante | No |
| 36 | Apertura y cierre de caja del turno | Recuento de efectivo al inicio y cierre de turno, registrar diferencias, reportar a Admin | Recepcionista | Operativo Recepción | Manual — inicio/fin turno | Continua (por turno) | Core | No |
| 37 | Night audit (cierre contable diario) | Proceso nocturno: cierre del día, posteo automático de tarifas de habitación en todos los folios abiertos, reconciliación de pagos, generación de informe de ocupación y revenue del día, detección de errores | Night Auditor | Operativo Recepción (vista especial) | Automático (programado) + manual (confirmación) | Diaria (madrugada) | Core | No |
| 38 | Generación de reporte diario de ocupación | Informe: habitaciones vendidas, disponibles, bloqueadas, % ocupación, ADR, RevPAR, ingresos del día, llegadas/salidas del día siguiente | Night Auditor / Sistema | Portal Dirección + Supervisor | Automático — post night audit | Diaria | Core | No |
| 39 | Informe de llegadas del día | Lista de reservas con hora estimada de llegada, tipo de habitación, régimen, notas especiales, VIPs | Sistema | Operativo Recepción | Automático — madrugada | Diaria | Core | No |
| 40 | Informe de salidas del día | Lista de huéspedes con check-out pendiente, folios abiertos, huéspedes que extendieron estadía | Sistema | Operativo Recepción | Automático — madrugada | Diaria | Core | No |
| 41 | Control de llaves maestras | Gestión del inventario de llaves maestras, registro de quién tiene qué llave, desactivación si se extravía | Jefe de Recepción | Operativo Recepción | Manual | Diaria / semanal | Core (seguridad) | No |
| 42 | Gestión de objetos perdidos | Registrar objetos encontrados en recepción o reportados por HK, custodiar, contactar al huésped, enviar si lo solicita | Recepcionista / Conserje | Operativo Recepción | Manual | Eventual | Importante | No |
| 43 | Coordinación con Housekeeping en tiempo real | Notificar a HK sobre check-out para habilitar limpieza urgente; recibir notificación de habitación limpia lista para asignar; marcar DND (Do Not Disturb) | Sistema | Operativo Recepción + HK portal | Automático — eventos check-in/out | Continua | Core | No |
| 44 | Alerta de mantenimiento correctivo urgente | Recibir queja de huésped sobre falla técnica (calefacción, WiFi, cañería) y derivar a Mantenimiento con prioridad urgente | Recepcionista | Operativo Recepción | Manual — huésped reporta | Continua | Core | No |
| 45 | Gestión de acceso a áreas premium (club, piso ejecutivo) | Verificar que el huésped tiene acceso habilitado al piso ejecutivo, lounge, sala de reuniones, etc.; activar/desactivar en sistema de llaves | Recepcionista | Operativo Recepción | Manual — durante check-in | Continua | Importante | No |
| 46 | Encuesta de satisfacción al check-out | Enviar link/código de encuesta al huésped al hacer check-out; registrar respuesta cuando llega; derivar a GX si hay nota baja | Sistema | Portal Huésped + GX | Automático — post check-out | Continua | Importante | Sí |
| 47 | Venta de servicios adicionales en mostrador (upsell) | Ofrecer: desayuno, transfer aeropuerto, tour, spa, parking, late check-out, WiFi premium; cargar al folio | Recepcionista | Operativo Recepción | Manual | Continua | Importante | No |
| 48 | Informe de estadísticas de recepción (semanal/mensual) | Resumen de KPIs del sector: tiempos de check-in, upgrades, quejas, upsell vendido, no-shows, cancelaciones | Sistema | Portal Jefe + Dirección | Automático — semanal/mensual | Semanal/mensual | Importante | No |

---

### Sub-flujos clave (pseudocódigo)

#### Flujo 1 — Check-in presencial (el más crítico del sector)

```
Función: Check-in huésped presencial
─────────────────────────────────────
1. Recepcionista busca reserva por: apellido / email / código de confirmación / QR del huésped
2. Sistema muestra detalle de reserva: tipo hab, régimen, fechas, notas, si es VIP, si tiene web check-in
3. Recepcionista solicita documento de identidad del huésped (DNI, pasaporte, cédula)
4. Sistema carga datos en planilla policial/hotelera:
   - ES: parte del viajero (Ley 4/2015) — datos + serie documento + fecha entrada + fecha salida prevista
   - AR: planilla hotelera — datos + nro documento + procedencia + destino + fecha
   - Envío automático a autoridad en < 24h (ES: Guardia Civil / CNP API; AR: depósito local según normativa provincial)
5. Sistema propone habitación óptima (regla: tipo reservado + preferencias guardadas del huésped + upgrade si disponible sin cargo o con cargo si acepta)
   - Si hay upgrade disponible → recepcionista ofrece ("Tenemos disponible la habitación Superior con vista al mar, ¿la prefiere?")
   - Si huésped acepta upgrade con cargo → se agrega al folio
6. Sistema asigna habitación y abre folio del huésped:
   - Carga: tarifa base × noches + regímenes incluidos + tasas (IVA, tasa turística si aplica)
   - Registra: forma de pago comprometida (tarjeta garantía, prepago OTA, crédito empresa)
7. Sistema emite llave:
   - Tarjeta física → recepcionista programa en encoder y entrega
   - Llave digital → sistema envía al móvil del huésped via app / NFC / SMS con link
8. Recepcionista informa al huésped: WiFi, horario desayuno, servicios, número de habitación, cómo pedir cosas
9. Botones toma equipaje y acompaña al huésped a la habitación (si hay botones disponible)
10. Sistema dispara evento "huésped.check_in":
    → HK recibe: "hab 302 — huésped check-in — inspección final si necesaria"
    → GX inbox recibe: "Huésped Juan Pérez, hab 302, check-in 15:03, reserva 3 noches, régimen BB, primer check-in en el hotel" [dual-fire]
    → Rack de habitaciones actualiza: hab 302 pasa de LIMPIA a OCUPADA
11. Si es VIP: Sistema alerta a Jefe de Recepción para protocolo de bienvenida adicional
```

#### Flujo 2 — Check-out con folio y factura

```
Función: Check-out presencial con cobro y factura
─────────────────────────────────────────────────
1. Recepcionista identifica huésped por nombre/habitación/tarjeta
2. Sistema muestra folio completo:
   - Tarifa de habitación × noches (ya posteado por night audit)
   - Cargos adicionales: minibar, room service, lavandería, llamadas, extras pedidos
   - Descuentos/cortesías aplicadas
   - Pagos parciales ya realizados (prepago OTA, garantía)
3. Recepcionista presenta folio al huésped (pantalla giratoria o impresión)
4. Huésped revisa — si hay discrepancia → recepcionista ajusta con supervisor (descuento o crédito si procede, con log de motivo)
5. Huésped confirma folio
6. Proceso de pago:
   - Tarjeta → terminal integrado (TPV) — imprime comprobante
   - Efectivo → recepcionista registra, da vuelto, imprime recibo
   - Factura a empresa → sistema genera pre-factura; Admin/CFO la valida y envía
   - OTA ya cobrado → sistema reconcilia con balance del canal
7. Emisión del comprobante fiscal:
   - ES: factura simplificada (ticket) o completa → Verifactu (obligatorio desde 2026)
   - AR: factura B/C (consumidor) o A (empresa) → sistema envía a AFIP WSFE y recibe CAE
8. Recepcionista recupera llave / desactiva llave digital
9. Sistema dispara evento "huésped.check_out":
   → HK recibe: "hab 302 — check-out realizado — pendiente limpieza" (hab pasa a EN_LIMPIEZA)
   → GX inbox recibe: "Huésped Juan Pérez, hab 302, check-out 11:47, folio $X, estadía 3N" [dual-fire]
   → Rack: hab 302 pasa de OCUPADA a EN_LIMPIEZA
10. Sistema envía encuesta de satisfacción al email/app del huésped (post-stay)
```

#### Flujo 3 — Night Audit (cierre diario)

```
Función: Night Audit
────────────────────
1. Night Auditor verifica que no hay check-ins pendientes (si hay, los completa o los marca como no-show)
2. Sistema ejecuta "posteo de habitaciones":
   → Para cada reserva activa: agrega tarifa de la noche + régimen de desayuno si incluido al folio del huésped
3. Sistema reconcilia pagos del día:
   - Cruzar tarjetas cobradas en TPV vs registros en folio
   - Cruzar cash recibido vs caja cuadrada
   - Cruzar prepagos de OTAs recibidos vs reservas activas
   - Detectar diferencias → alertar a Admin para revisión
4. Sistema cierra el "día hotelero" (business date) y abre el siguiente
5. Sistema genera informes automáticos:
   - Reporte diario de ocupación (habs vendidas / disponibles / bloqueadas + ADR + RevPAR)
   - Reporte de revenue por canal (booking directo / OTA / grupos / etc.)
   - Lista de llegadas del día siguiente con notas
   - Lista de check-outs pendientes del día siguiente
   - Folios con saldo pendiente alto (alerta a supervisor)
6. Night Auditor firma el cierre y deja notas para el turno mañana
7. Sistema envía reporte de cierre a Dirección + Admin/CFO por email automático
```

#### Flujo 4 — Gestión de queja de huésped

```
Función: Gestión de queja / incidencia durante estadía
───────────────────────────────────────────────────────
1. Huésped contacta recepción (mostrador, teléfono, app portal huésped)
2. Recepcionista escucha y registra en sistema:
   - Categoría: limpieza / mantenimiento técnico / ruido / facturación / otro
   - Descripción libre
   - Urgencia: urgente (bloquea la estancia) / importante (incomoda) / menor
3. Sistema dispara según categoría:
   - Limpieza → tarea urgente en portal HK con hab y descripción
   - Mantenimiento → tarea urgente en portal Mantto
   - Facturación → alerta a supervisor FO
   - Ruido (otro huésped) → alerta a Seguridad si aplica
4. Sistema dispara dual-fire GX inbox: "Queja registrada — huésped Juan Pérez hab 302 — categoría: mantenimiento — descripción: calefacción no funciona"
5. SLA: si no hay resolución en X minutos (configurable por tenant) → escala a Supervisor → luego a Jefe
6. Al resolver: sector responsable cierra la tarea; sistema notifica a recepcionista
7. Recepcionista contacta al huésped, confirma resolución, ofrece compensación si políticas del tenant lo indican
8. Sistema cierra la incidencia con tiempo de resolución registrado → KPI para dashboards
```

#### Flujo 5 — Planilla policial / hotelera (compliance)

```
Función: Envío de planilla policial (ES) / hotelera (AR)
─────────────────────────────────────────────────────────
ES — Parte del viajero (Ley Orgánica 4/2015, art. 25):
1. Al hacer check-in, sistema captura:
   - Nombre y apellidos, sexo, nacionalidad, fecha de nacimiento
   - Tipo y número de documento (DNI / NIE / pasaporte / otra)
   - Número de serie del documento (si aplica)
   - País de residencia
   - Fecha de entrada
2. Sistema valida que todos los campos obligatorios están completos (no puede finalizar check-in sin ellos)
3. Dentro de las siguientes 24h → sistema envía automáticamente al Web Service de la DGP / Guardia Civil
   (integración API Hospedajes — sistema TeaSe o equivalente vigente 2026)
4. Sistema registra confirmación de envío en log de auditoría
5. Si el envío falla → alerta roja al Jefe de Recepción; reintento automático cada 30 min; si no resuelve en 3h → alerta a Admin

AR — Planilla hotelera:
1. Al hacer check-in, sistema captura:
   - Nombre y apellidos, nro de documento (DNI / pasaporte)
   - Nacionalidad, fecha de nacimiento
   - Procedencia (ciudad/país de donde viene)
   - Destino declarado (ciudad/país a donde va)
   - Fecha de entrada / fecha de salida prevista
2. Se almacena en la base de datos del hotel (cumplimiento normativa provincial hotelera)
3. Se imprime o exporta en formato estándar para presentación a autoridad si es requerida
4. No hay envío automático centralizado como en ES (depende de la jurisdicción / regulación provincial)
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `reservation` | No (es owner Comercial) | Sí | organization_id, id, guest_id, room_type, check_in_date, check_out_date, status, channel, rate, regime, notes, vip_flag | `custom_fields JSONB` | → `guest`, `room`, `folio`, `channel` |
| `guest` | Sí | No | organization_id, id, full_name, email, phone, document_type, document_number, document_country, nationality, dob, address, language, marketing_optin, stay_history | `custom_fields JSONB`, `loyalty_id`, `vip_level` | → `reservation`, `folio_item`, `complaint`, `request` |
| `room` | No (owner HK) | Sí | organization_id, id, number, floor, type, category, status, features, beds, max_occupancy, notes | `custom_fields JSONB` | → `reservation`, `housekeeping_task`, `maintenance_task` |
| `folio` | Sí | No | organization_id, id, guest_id, reservation_id, open_date, close_date, status (open/closed), total_charged, total_paid, balance, currency | `custom_fields JSONB` | → `folio_item`, `payment`, `invoice` |
| `folio_item` | Sí | No | organization_id, id, folio_id, type (room_charge/service/tax/discount/correction), description, amount, tax_rate, quantity, date, posted_by | — | → `folio` |
| `payment` | Sí (parcial; Admin es co-owner) | No | organization_id, id, folio_id, method (card/cash/transfer/ota/company), amount, currency, reference, gateway_response, date | `custom_fields JSONB` | → `folio`, `invoice` |
| `invoice` | No (owner Admin/CFO) | Sí (inicia la solicitud) | organization_id, id, folio_id, type (simplificada/completa/empresa), fiscal_id, verifactu_ref (ES) / cae_ref (AR), status, pdf_url | — | → `folio`, `payment` |
| `police_report_entry` | Sí | No | organization_id, id, guest_id, reservation_id, document_data JSONB, check_in_date, submitted_at, submission_status, submission_response | — | → `guest`, `reservation` |
| `key` | Sí | No | organization_id, id, room_id, type (card/digital), status (active/inactive), issued_at, deactivated_at, issued_to_guest_id | — | → `room`, `guest` |
| `complaint` | Sí | No | organization_id, id, guest_id, reservation_id, room_id, category, description, urgency, status (open/in_progress/resolved/closed), opened_at, resolved_at, assigned_to_dept, compensation_applied | — | → `guest`, `reservation`, `room` |
| `guest_request` | Sí | No | organization_id, id, guest_id, room_id, type, description, status, created_at, fulfilled_at, assigned_to | — | → `guest`, `room` |
| `shift_note` | Sí | No | organization_id, id, shift_date, shift_type (morning/afternoon/night), author_id, content, related_rooms JSONB | — | — |
| `night_audit_log` | Sí | No | organization_id, id, business_date, executed_at, executed_by, rooms_posted INT, revenue_total, discrepancies JSONB, status (pending/done/with_errors) | — | — |
| `lost_found` | Sí | No | organization_id, id, description, found_location, found_date, found_by, guest_id (nullable), status, delivered_at | — | → `guest` (si se identifica dueño) |

**Diagrama ER simplificado:**

```
guest ──────────< reservation ──────< folio ──────< folio_item
  │                   │                  │
  │                   │                  └──────< payment ──> invoice
  │                   │
  │               police_report_entry
  │
  └──────< complaint
  └──────< guest_request
  └──────< lost_found

reservation ──> room ──────< key
                 │
                 └──────> housekeeping_task  (via event-bus → HK module)
                 └──────> maintenance_task  (via event-bus → Mantto module)
```

---

## 7. Máquinas de estado

```
=== RESERVA (reservation.status) ===

PENDING ──pago/confirmación──> CONFIRMED
CONFIRMED ──check-in──> CHECKED_IN
CONFIRMED ──no-show detectado──> NO_SHOW
CONFIRMED ──cancelación OK gratuita──> CANCELLED_FREE
CONFIRMED ──cancelación con cargo──> CANCELLED_FEE
CHECKED_IN ──check-out realizado──> CHECKED_OUT
CHECKED_OUT ──(terminal)──> [archivado]
NO_SHOW ──(terminal)──> [archivado]

Transiciones autorizadas por rol:
- Sistema: PENDING → CONFIRMED (pago automático o confirmación OTA)
- Recepcionista: CONFIRMED → CHECKED_IN, CONFIRMED → NO_SHOW
- Recepcionista / Supervisor: CONFIRMED → CANCELLED_*, CHECKED_IN → CHECKED_OUT
- Jefe de Recepción: override en estados excepcionales


=== HABITACIÓN (room.status) ===

LIBRE ──check-in asignado──> OCUPADA
OCUPADA ──check-out realizado──> EN_LIMPIEZA
EN_LIMPIEZA ──HK finaliza tarea──> LIMPIA
LIMPIA ──supervisión gobernanta OK──> LIBRE
LIBRE ──bloqueo manual──> BLOQUEADA (mantenimiento, reforma, cortesía)
BLOQUEADA ──desbloqueo manual──> LIBRE
OCUPADA ──falla crítica reportada──> OCUPADA_CON_INCIDENCIA
OCUPADA_CON_INCIDENCIA ──mantto resuelve──> OCUPADA
LIMPIA ──falla detectada en inspección──> EN_LIMPIEZA (re-limpieza)
LIBRE ──out of order──> FUERA_DE_SERVICIO
FUERA_DE_SERVICIO ──mantto OK──> LIBRE

Transiciones autorizadas por rol:
- Recepcionista / Sistema: LIBRE → OCUPADA (check-in), OCUPADA → EN_LIMPIEZA (check-out)
- HK / Gobernanta: EN_LIMPIEZA → LIMPIA, LIMPIA → LIBRE
- Supervisor FO / Jefe: LIBRE → BLOQUEADA, BLOQUEADA → LIBRE
- Mantenimiento: * → FUERA_DE_SERVICIO, FUERA_DE_SERVICIO → LIBRE
- Sistema: OCUPADA_CON_INCIDENCIA (vía complaint de alta prioridad)


=== FOLIO (folio.status) ===

OPEN ──check-out + cobro completo──> CLOSED
OPEN ──transferencia a empresa pendiente──> PENDING_COMPANY_BILLING
PENDING_COMPANY_BILLING ──Admin confirma cobro──> CLOSED
CLOSED ──discrepancia detectada post-cierre──> DISPUTED
DISPUTED ──resolución manual──> CLOSED


=== QUEJA / INCIDENCIA (complaint.status) ===

OPEN ──asignada a dept──> IN_PROGRESS
IN_PROGRESS ──sector resuelve──> RESOLVED
RESOLVED ──FO confirma con huésped──> CLOSED
OPEN / IN_PROGRESS ──SLA superado──> ESCALATED
ESCALATED ──Jefe toma acción──> IN_PROGRESS
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| **Verifactu** | Facturación fiscal ES | Outbound | Obligatoria (ES, 2026) | Envío de tickets y facturas al sistema VeriFactu de AEAT; reemplaza TicketBAI en territorio común |
| **AFIP WSFE** | Facturación fiscal AR | Outbound | Obligatoria (AR) | Web service AFIP para generación de CAE (factura electrónica A/B/C) |
| **API Hospedajes / TeaSe (ES)** | Planilla policial viajeros | Outbound | Obligatoria (ES) | Envío parte del viajero a DGP / Guardia Civil en < 24h (Ley 4/2015) |
| **TPV / Terminal de pago** | Pagos con tarjeta | Bidireccional | Obligatoria | Integración con terminal bancario; proveedores típicos: Redsys (ES), Prisma/FISERV (AR), Stripe (global) |
| **Channel Manager** | Disponibilidad y tarifas | Bidireccional | Importante | SiteMinder (decisión previa); recibe reservas de OTAs y actualiza disponibilidad en tiempo real |
| **Sistema de llaves electrónicas** | Control de acceso | Outbound | Importante | Assa Abloy / Salto / KABA / Dormakaba; activación/desactivación remota de tarjetas RFID o llaves NFC |
| **POS (punto de venta)** | Cargos al folio | Inbound | Importante | Integración con POS del bar/restaurante/spa para cargar consumos directamente al folio del huésped; proveedores: iCG, Lightspeed, Toast |
| **Email / SMS / WhatsApp** | Comunicaciones con huésped | Outbound | Importante | Pre-check-in, confirmación, llave digital, factura, encuesta. Proveedores: Twilio, Sendgrid, WhatsApp Business API |
| **Google / TripAdvisor API** | Encuestas y reseñas | Outbound | Opcional | Envío de link de encuesta post-estadía; gestión de respuesta desde GX (dual-fire) |
| **Contabilidad (Holded / A3 / Sage / Contabilium)** | Asientos contables | Outbound | Opcional (según tenant) | Exporta movimientos de folio y factura para contabilidad; decisión Opción A: Holded (ES) + Contabilium (AR) |
| **CRM externo** | Perfil de huésped | Bidireccional | Opcional | Para cadenas con loyalty program externo (Marriott Bonvoy, NH Rewards, etc.) |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Check-in / check-out básico | ✓ | | | | Flujo idéntico en ambos |
| Rack de habitaciones | ✓ | | | | |
| Folio y cobro | ✓ | | | | |
| Emisión de comprobante fiscal | | | | ✓ | AR: AFIP WSFE (CAE) · ES: Verifactu (2026) |
| Planilla de viajeros / hotelera | | | | ✓ | AR: planilla hotelera provincial · ES: parte del viajero Ley 4/2015 → API Hospedajes |
| Tipos de documento aceptados | | | | ✓ | ES: DNI / NIE / pasaporte · AR: DNI / CUIT / pasaporte / cédula MERCOSUR |
| Tasa turística en factura | | | | ✓ | Muchos municipios ES (Madrid, Barcelona, Sevilla) tienen tasa turística · AR: depende de municipio, menos extendida |
| Protocolo de menores sin acompañante | ✓ | | | | Ambas jurisdicciones exigen autorización pero la normativa específica varía; campo flag en check-in |
| Nomenclatura de roles | | | | ✓ | Mismo rol, distintos nombres: "Recepcionista" (ambos) / "Auditor nocturno" (ambos) / "Botones" (ambos) — ver §11 |
| Formato de fecha/hora | | | | ✓ | ES: DD/MM/AAAA · AR: DD/MM/AAAA — coinciden, pero zona horaria distinta (Europe/Madrid vs America/Argentina/Buenos_Aires) |
| Moneda y formatos numéricos | | | | ✓ | ES: EUR · AR: ARS |
| PRL / Seguridad e Higiene (staff) | | | | ✓ | ES: PRL Ley 31/1995 · AR: SyH Ley 19.587 — impacta en qué campos legales se muestran en portal de RRHH, no en FO directamente |
| Convenio colectivo aplicable | | | | ✓ | ES: Convenio Colectivo de Hostelería (nacional + provincial) · AR: CCT 362/03 Gastronómicos o CCT sector hotelero según jurisdicción |
| Night audit | ✓ | | | | Concepto contable igual en ambas jurisdicciones |
| Check-in express / pre-check-in digital | ✓ | | | | |

---

## 10. Slots de extensión (crítico para N2 + multi-tenant)

### 10.1 Campos custom por entidad

```
guest.custom_fields: JSONB
guest.custom_fields_schema: JSONB
  → ejemplo tenant hotelero boutique: agrega campo "pet_name" (viaja con mascota)
  → ejemplo hotel de negocios: agrega "company_cost_center", "employee_id"

reservation.custom_fields: JSONB
  → ejemplo resort: agrega "transfer_requested", "room_preference" (vista mar/jardín)
  → ejemplo hotel bodas: agrega "event_name", "group_leader_contact"

folio.custom_fields: JSONB
  → ejemplo cliente corporativo: agrega "purchase_order_number" para factura a empresa
```

### 10.2 Workflows custom

Hooks disponibles en Front Office:

```
pre_check_in:
  → tenant puede agregar validación custom antes de completar check-in
  → ejemplo: "si es menor de 18, pedir autorización escaneada obligatoria"
  → ejemplo: "si ha-bitación de tipo suite, enviar alerta al director"

post_check_in:
  → tenant puede disparar acciones custom post check-in
  → ejemplo: enviar email de bienvenida personalizado con nombre del director
  → ejemplo: activar cortesía automática (copa de bienvenida, amenity)
  → ejemplo: enviar push notification a botones

pre_check_out:
  → tenant puede agregar campos a revisar antes de permitir check-out
  → ejemplo: "verificar que minibar fue revisado por HK"

post_check_out:
  → tenant puede disparar acciones custom post check-out
  → ejemplo: enviar encuesta personalizada del tenant (en lugar de la estándar)
  → ejemplo: mandar descuento fidelidad para próxima reserva

pre_night_audit:
  → tenant puede agregar validaciones previas al cierre (folios sin forma de pago, etc.)

post_night_audit:
  → tenant puede enviar el reporte de cierre a destinatarios adicionales custom
```

### 10.3 Integraciones per-tenant

Integraciones que el tenant puede activar/desactivar en configuración:

- **Channel managers:** SiteMinder (default), Dingus, Omnibees, Cubilis, D-EDGE, otro custom
- **Sistemas de llaves:** Assa Abloy Visionline, Salto Systems, KABA, Dormakaba, otro custom
- **TPV / pasarela de pago:** Redsys (ES), Prisma FISERV (AR), Stripe (global), Adyen (global)
- **POS integrado:** iCG (ES/AR), Lightspeed, Toast, otro custom
- **CRM de huéspedes:** propio Bravas (default) o externo (Salesforce, HubSpot, Zoho)
- **Contabilidad:** Holded, A3 Eco, Sage, Contabilium, Bejerman, manual export

### 10.4 Branding/UI per-tenant

- Colores del portal de recepción (color primario, secundario, fondo del rack)
- Logo del hotel en el portal y en las impresiones (factura, folio, ticket)
- Mensaje de bienvenida personalizado en la pantalla del check-in
- Nomenclatura de roles customizable ("botones" → "mozo de equipaje" → lo que el tenant decida)
- Formulario de check-in: qué campos mostrar al huésped en el pre-check-in online

### 10.5 Idiomas

- Diccionario i18n del tenant: puede sobrescribir cualquier string del módulo en es-ES, es-AR o en
- Ejemplo: cambiar "Gobernanta" por "Encargada de Pisos" en su instalación sin tocar el core
- El portal huésped puede servirse en idioma del huésped (en, es-ES, es-AR, fr, pt, de — configurable por tenant)

---

## 11. Nomenclatura i18n (tabla de términos del sector)

| Término técnico | es-ES default | es-AR default | en default | Customizable por tenant |
|---|---|---|---|---|
| `front_office_manager` | Jefe de Recepción | Jefe de Recepción | Front Office Manager | ✓ |
| `front_desk_supervisor` | Supervisor de Recepción | Supervisor de Recepción | Front Desk Supervisor | ✓ |
| `receptionist` | Recepcionista | Recepcionista | Receptionist / Front Desk Agent | ✓ |
| `concierge` | Conserje | Conserje | Concierge | ✓ |
| `bellboy` | Botones / Mozo de equipajes | Botones / Valet | Bellboy / Porter | ✓ |
| `valet` | Valet / Aparcacoches | Valet | Valet / Parking Attendant | ✓ |
| `night_auditor` | Auditor nocturno | Auditor nocturno | Night Auditor | ✓ |
| `reservations_agent` | Agente de Reservas | Agente de Reservas | Reservations Agent | ✓ |
| `check_in` | Check-in | Check-in | Check-in | No (término técnico universal) |
| `check_out` | Check-out | Check-out | Check-out | No |
| `folio` | Cuenta del huésped / Folio | Cuenta del huésped / Folio | Guest Folio / Account | ✓ |
| `room` | Habitación | Habitación | Room | ✓ |
| `room_rack` | Panel de habitaciones | Rack de habitaciones | Room Rack | ✓ |
| `police_report` | Parte del viajero | Planilla hotelera | Guest registration form | No (legal) |
| `no_show` | No-show | No-show | No-show | No |
| `walk_in` | Walk-in | Walk-in | Walk-in | No |
| `late_check_out` | Salida tardía | Salida tardía | Late check-out | ✓ |
| `early_check_in` | Entrada anticipada | Entrada anticipada | Early check-in | ✓ |
| `upgrade` | Mejora de habitación | Upgrade | Upgrade | ✓ |
| `amenity` | Detalle de bienvenida / Cortesía | Amenity / Cortesía | Amenity | ✓ |
| `vip` | VIP | VIP | VIP | No |
| `do_not_disturb` | No molestar | No molestar | Do Not Disturb (DND) | No |
| `night_audit` | Cierre de día / Auditoría nocturna | Auditoría nocturna | Night Audit | ✓ |
| `front_office` | Recepción / Front Office | Recepción / Front Office | Front Office | ✓ |
| `rooms_division` | División de Habitaciones | División de Habitaciones | Rooms Division | ✓ |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| **Ley Orgánica 4/2015 (Seguridad Ciudadana) — art. 25** | ES | Obligación de registro y envío del parte del viajero a las autoridades (DGP / Guardia Civil) en < 24h de cada check-in. El módulo debe garantizar este envío automático y conservar log de confirmación. |
| **RGPD (Reglamento UE 2016/679)** | UE / ES | Datos personales del huésped (documento, DOB, dirección) deben recogerse con base legal, almacenarse cifrados, y tener plazos de retención definidos (mínimo 3 años para libro de registro hotelero en ES). Derecho de acceso y supresión. |
| **Ley 25.326 (Protección de Datos Personales)** | AR | Equivalente AR del RGPD. Los datos del huésped deben almacenarse de forma segura. Base de datos hotelera debe inscribirse ante AAIP si corresponde. |
| **Normativa hotelera provincial AR** | AR | Varias provincias (Buenos Aires, Córdoba, Mendoza) exigen libro de registro de huéspedes y planilla hotelera con datos similares a la ES. Los requisitos varían por provincia; el sistema debe ser configurable. |
| **Verifactu / SIF (Sistema de Verificación de Facturas)** | ES | Obligación desde 2026 de usar software de facturación verificado por AEAT. Todas las facturas emitidas (simplificadas y completas) deben tener registro en Verifactu con hash. |
| **AFIP WSFE (Web Service Factura Electrónica)** | AR | Toda factura emitida a contribuyentes inscriptos (tipo A) y tickets fiscales (tipo B/C) deben obtener CAE de AFIP antes de entregarse al huésped. |
| **Ley 25.065 (Tarjetas de crédito)** | AR | Regula el uso de tarjetas de crédito/débito en comercios; el módulo de pagos debe cumplir límites de retención de datos de tarjeta (PCI-DSS). |
| **PCI-DSS** | Internacional | Standard de seguridad para manejo de datos de tarjeta. El módulo no almacena números completos de tarjeta; toda tokenización vía gateway certificado. |
| **Ley 31/1995 PRL + RD 486/1997** | ES | Aplica a la organización del trabajo del sector (turnos, descansos de los recepcionistas). El módulo de horarios/RRHH lo gestiona, pero FO debe exponer datos de horas trabajadas. |
| **Ley 19.587 / Decreto 351/79 (Seguridad e Higiene)** | AR | Equivalente AR de PRL. Aplica a condiciones de trabajo en el mostrador (iluminación, postura, pausas). |
| **Normativa de accesibilidad** | ES + AR | La interfaz del portal huésped y del portal operativo debe cumplir requisitos de accesibilidad WCAG 2.1 AA. En ES: Real Decreto 1112/2018. |

---

## 13. Dependencias del lifecycle del módulo

**Qué pasa si el módulo se ACTIVA después del hotel ya corriendo:**
- **Datos iniciales requeridos (seed):**
  - Inventario de habitaciones: número, tipo, categoría, features, piso (puede importarse desde CSV o se crea manualmente en onboarding)
  - Tipos de habitación y tarifas base (mínimo una tarifa rack)
  - Configuración de régimenes (solo alojamiento / B&B / media pensión / pensión completa / all-inclusive)
  - Parámetros de planilla policial (ES: credenciales API Hospedajes; AR: configuración provincial)
  - Integración TPV activa (o modo "caja manual")
  - Parámetros de Verifactu (ES) o AFIP (AR): certificado digital, número CUIT/NIF, serie de facturas
- **Flujo de setup inicial:** Wizard en onboarding del tenant → 5 pasos: (1) habitaciones, (2) tarifas, (3) régimenes, (4) facturación, (5) planilla policial
- **Migración de datos:** si el hotel viene de otro PMS, se importan reservas activas y perfiles de huéspedes via CSV estructurado o API; histórico de folios en modo solo lectura

**Qué pasa si el módulo se DESACTIVA:**
- Situación teórica (es Core — no se desactiva en producción)
- Si se desactivara: folios abiertos quedan huérfanos sin poder cerrar; reservas activas quedan sin check-in posible
- Datos irrecuperables: ninguno (todo quedaría en DB)
- Módulos afectados: Housekeeping (no recibe eventos check-in/out), Admin/CFO (no recibe folios), GX (pierde el canal dual-fire principal)
- Procedimiento de archivo: snapshot de DB + export CSV de todos los folios abiertos

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| **Occupancy Rate** | Habs vendidas / Habs disponibles × 100 | Diaria | Dashboard Dirección + Jefe FO | 65-75% urbano 4* · 55-65% resort (temporada media) |
| **ADR (Average Daily Rate)** | Ingresos habitaciones / Habs vendidas | Diaria | Dashboard Dirección + Jefe FO | Varía mucho por mercado y categoría |
| **RevPAR** | ADR × Occupancy Rate | Diaria | Dashboard Dirección | KPI-estrella del sector |
| **Tiempo medio de check-in** | Suma de tiempos check-in / nro de check-ins del día | Diaria | Jefe FO | < 3 minutos (target operativo) |
| **Tasa de no-shows** | No-shows / Total reservas confirmadas × 100 | Semanal/mensual | Jefe FO + Comercial | < 5% es estándar hotelero |
| **Tasa de upgrades completados** | Upgrades asignados / Check-ins totales × 100 | Mensual | Jefe FO + Dirección | Depende de política del tenant |
| **Tasa de walk-ins** | Walk-ins / Total check-ins × 100 | Mensual | Jefe FO + Comercial | Varía por canal de venta |
| **Quejas recibidas en recepción** | Número de complaints abiertos en FO por período | Diaria/semanal | Jefe FO + GX | Cuanto menor mejor; < 2% de estadías |
| **Tiempo medio de resolución de quejas** | Suma (resolved_at - opened_at) / nro complaints | Semanal | Jefe FO + GX | < 30 minutos para urgentes |
| **NPS de llegada** | Puntaje encuesta post check-in (si se usa) | Mensual | Dirección + GX | > 50 es bueno; > 70 es excelente |
| **Revenue por upsell en FO** | Total cargos de upsell (upgrades, desayunos, servicios) vendidos en recepción | Mensual | Jefe FO + Dirección | Depende de política del tenant |
| **Exactitud del night audit** | % de noches con cierre sin discrepancias | Mensual | Admin/CFO + Jefe FO | > 98% |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol que la ve | Función principal | Mockup existente |
|---|---|---|---|---|
| `/front-office/dashboard` | Operativo Recepción | Recepcionista / Supervisor | Vista principal del turno: rack de habitaciones, colas de check-in/out, alertas activas, mensajes de turno | Sí — `mockup/v2.5/empleado-recepcion.html` |
| `/front-office/check-in` | Operativo Recepción | Recepcionista | Flujo paso a paso de check-in: buscar reserva → identidad → planilla policial → asignar hab → emitir llave → abrir folio | Sí — `mockup/v2.5/empleado-front-office.html` |
| `/front-office/check-out` | Operativo Recepción | Recepcionista | Flujo de check-out: presentar folio → ajustes → cobro → factura → liberar hab | Sí — `mockup/v2.5/empleado-front-office.html` |
| `/front-office/room-rack` | Operativo Recepción | Recepcionista / Supervisor | Mapa visual de todas las habitaciones con estado en tiempo real | Sí — `mockup/v2.5/empleado-recepcion.html` |
| `/front-office/folio/:id` | Operativo Recepción | Recepcionista / Supervisor | Vista y edición del folio de un huésped; añadir / eliminar cargos; registrar pagos parciales | No (pendiente) |
| `/front-office/reservations` | Operativo Recepción | Recepcionista / Agente Reservas | Lista de reservas: hoy / próximos días / búsqueda; crear reserva directa | No (parcialmente en mockup FO) |
| `/front-office/walk-in` | Operativo Recepción | Recepcionista | Flujo rápido de reserva-exprés + check-in para walk-in | No (pendiente) |
| `/front-office/complaints` | Operativo Recepción | Recepcionista / Supervisor | Lista de quejas abiertas, asignación a dept, seguimiento, cierre | No (pendiente) |
| `/front-office/requests` | Operativo Recepción | Recepcionista / Conserje | Lista de solicitudes de huéspedes pendientes: conserjería, transporte, amenities | No (pendiente) |
| `/front-office/shift-notes` | Operativo Recepción | Recepcionista / Supervisor | Notas de turno: redactar, ver histórico, traspasar turno | No (pendiente) |
| `/front-office/night-audit` | Operativo Recepción | Night Auditor | Panel de cierre de día: pasos del audit, estados, confirmación, generación de reportes | No (pendiente) |
| `/front-office/lost-found` | Operativo Recepción | Recepcionista | Registro de objetos perdidos y encontrados; buscar propietario; marcar entregado | No (pendiente) |
| `/front-office/keys` | Operativo Recepción | Supervisor / Jefe FO | Gestión de llaves maestras: inventario, registro de custodia, desactivación de emergencia | No (pendiente) |
| `/front-office/manager` | Supervisor/Jefe | Jefe de Recepción / Supervisor | Panel de jefe de turno: métricas del día, upgrades disponibles, alertas, aprobación de descuentos | Sí — `mockup/v2.5/empleado-front-office.html` |
| `/front-office/reports` | Supervisor/Jefe | Jefe de Recepción | Informes: ocupación, ADR, RevPAR, llegadas/salidas del día, upsell, quejas | No (pendiente) |
| `/guest/check-in` | Portal Huésped | Huésped | Pre-check-in online: cargar documentos, confirmar datos, elegir preferencias | Sí — `mockup/v2.5/huesped.html` (parcialmente) |
| `/guest/stay` | Portal Huésped | Huésped | Vista de estadía: estado del folio, hacer solicitudes, activar DND, pedir despertador | Sí — `mockup/v2.5/huesped.html` (parcialmente) |
| `/guest/check-out` | Portal Huésped | Huésped | Check-out express: revisar folio, confirmar, pagar, descargar factura | Sí — `mockup/v2.5/huesped-pago.html` |
| `/direction/front-office-kpis` | Portal Dirección | Director General / Subdirector | KPIs de FO: RevPAR del día, occupancy, ADR, alertas críticas | No (pendiente) |

---

## 16. Riesgos conocidos y preguntas abiertas

**Riesgo 1: Envío de planilla policial en ES — credenciales API Hospedajes por tenant**
El API de la DGP / Guardia Civil (TeaSe o sistema equivalente vigente a 2026) requiere credenciales individuales por establecimiento hotelero. Cada tenant ES debe obtener sus propias credenciales e introducirlas en el onboarding. Si el tenant no las configura, el sistema no puede enviar el parte del viajero, lo que constituye infracción legal. Plan de mitigación: blocker en onboarding para tenants ES — no se puede activar el módulo sin introducir las credenciales. Monitoreo de envíos con alerta automática si falla.

**Riesgo 2: Sincronización de disponibilidad con channel manager en tiempo real**
Si hay un lag entre el check-in en el PMS y la actualización del channel manager (SiteMinder), puede producirse overbooking. Mitigación: usar webhook bidireccional con SiteMinder con prioridad máxima; en caso de error de comunicación, bloquear automáticamente las habitaciones en el channel hasta que se sincronice.

**Riesgo 3: Concurrencia en asignación de habitaciones**
Si dos recepcionistas asignan la misma habitación simultáneamente (en hoteles con alta demanda y múltiples estaciones). Mitigación: lock optimista a nivel de habitación durante el proceso de check-in con timeout de 60 segundos; si se detecta conflicto, mostrar error y pedir reasignación.

**Riesgo 4: Integración con múltiples sistemas de llaves (Assa Abloy / Salto / KABA)**
Cada fabricante tiene su propio SDK. Mantener adaptadores para 3+ fabricantes es costoso. Plan de mitigación: arquitectura de adaptadores con interfaz común; priorizar Assa Abloy Visionline y Salto Systems (los más comunes en el mercado objetivo ES/AR).

**Pregunta abierta 1: ¿El módulo de Reservas vive en Front Office o en Comercial?**
En hoteles boutique, Reservas es sub-función de FO. En hoteles 4* con equipo comercial, Reservas migra bajo Comercial. Decisión a tomar: ¿modelar como sub-módulo de FO con feature-flag que lo "mueve" a Comercial, o como módulo propio? → A resolver por arquitecto + Daniel.

**Pregunta abierta 2: Llaves digitales NFC vs app — alcance v1**
¿El MVP soporta emisión de llave digital vía NFC al móvil del huésped, o solo tarjeta física? La llave digital requiere integración con SDK del fabricante de cerraduras Y app móvil del hotel. Para v1 recomendaría solo tarjeta física + pre-check-in digital sin llave NFC, dejando llave digital para v2. → Decisión de roadmap para Daniel.

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación inicial del catálogo Front Office — 17 secciones completas, 48 funciones, 5 flujos pseudocódigo | bravas |
