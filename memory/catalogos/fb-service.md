# Catálogo exhaustivo — F&B Servicio

> Ficha canónica del módulo F&B Servicio para el SaaS multi-tenant Bravas. Sigue la estructura de 17 secciones del `_TEMPLATE_catalogo_sector.md`. **NOTA CRÍTICA DE SCOPE:** este módulo cubre exclusivamente el SERVICIO al cliente (salón, bar, room service, banquetes). La producción de alimentos pertenece al módulo `@octo/bravashotel-kitchen`. La interfaz entre ambos es la LÍNEA DE PASE: Cocina produce y pone en la línea de pase; Servicio retira y sirve.

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | F&B Servicio / Restauración |
| **Nombre (es-AR)** | A&B Servicio / Salón |
| **Nombre (en)** | F&B Service |
| **Código técnico** | `@octo/bravashotel-fb-service` |
| **Tipo** | Core (siempre activo en todo tenant) |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | `@octo/bravashotel-kitchen` (producción de platos, alérgenos, 86), `@octo/bravashotel-front-office` (PMS: folio del huésped, habitaciones room service), `@octo/bravashotel-admin-cfo` (facturación, TPV fiscal) |
| **Módulos dependientes de éste** | `@octo/bravashotel-kitchen` (recibe pedidos via KDS), `@octo/bravashotel-storeroom` (bar consume stock de bebidas), `@octo/bravashotel-guest-experience` (recibe incidencias de servicio), `@octo/bravashotel-admin-cfo` (exporta cierres de caja, facturación F&B) |
| **Activación default** | Siempre activo |

---

## 2. Propósito del módulo

- **Qué resuelve:** gestionar integralmente el servicio de alimentos y bebidas al cliente: apertura y organización del salón, gestión de reservas de mesa, toma de pedidos, coordinación con cocina vía KDS, servicio en mesa, cobro (integrado con el folio del huésped en PMS o TPV), room service, bar, y opcionalmente banquetes. El módulo es la cara del F&B al huésped.

- **Qué NO resuelve:** la producción de alimentos (eso es `kitchen`), la gestión del stock y los pedidos a proveedores de alimentos (eso es `storeroom`), la contabilidad final y la facturación fiscal (eso es `admin-cfo`), el registro de habitación del huésped (eso es `front-office`).

- **Métrica principal de éxito del sector:** RevPASH (Revenue Per Available Seat Hour): ingresos F&B / (asientos disponibles × horas de servicio). KPI de eficiencia de uso del salón.

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Jefe del sector | Jefe de Sala / Maître | Maître / Jefe de Salón | Maître d'Hôtel / F&B Service Manager | 2 | Director General / Director F&B | Supervisores + todo el equipo de salón | En hoteles chicos puede ser el mismo que supervisa cocina ("jefe de salón unificado") |
| Supervisor de turno de salón | Jefe de Turno / Capitán | Capitán / Jefe de Turno | Captain / Floor Supervisor | 3 | Maître | Mozos/Camareros del turno | — |
| Camarero de salón | Camarero | Mozo / Camarero | Waiter / Server | 4 | Capitán | — | Puede cubrir también barra en hoteles chicos |
| Ayudante de camarero | Ayudante de camarero / Commis | Ayudante de Mozo | Busboy / Commis Waiter | 5 | Camarero | — | — |
| Bartender | Bartender / Barman | Bartender / Barman | Bartender | 4 | Maître / Capitán | Barback | — |
| Barback | Barback / Ayudante de barra | Barback | Barback | 5 | Bartender | — | — |
| Room service attendant | Camarero de Habitaciones | Mozo de Room Service | Room Service Attendant | 4 | Maître / Capitán | — | Suele combinar con camarero de salón en hoteles chicos |
| Sommelier | Sumiller / Sommelier | Sommelier | Sommelier | 4 | Maître | — | Solo en 5* o establecimientos con carta de vinos premium |
| Banquet Manager | Jefe de Banquetes | Jefe de Banquetes | Banquet Manager | 3 | Director F&B / Maître | Equipo de banquetes | Solo si toggle banquetes activo |

**Variantes por tamaño de hotel:**
- Boutique chico (<40 habs): 1-2 personas en sala, el chef puede supervisar también el servicio ("jefe de salón unificado"). Sin sommelier, sin banquetes.
- Urbano 4* mediano: Maître + 2-3 camareros por turno + 1-2 bartenders + room service cubierto por rota de camareros.
- Resort 5* grande: Director F&B + Maître por outlet + capitanes + equipo de salón + sommelier + Banquet Manager separado.

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | sí | reserva de mesa en restaurante, menú online, carta de room service, confirmación de pedido de room service |
| Portal Operativo del sector | sí | gestión de mesas (plano del salón), toma de pedidos (comanda), estado de pedidos en KDS, cobro, gestión de room service, estado del bar |
| Portal Supervisor/Jefe | sí | plan de salón para el servicio, asignación de estaciones a camareros, gestión de reservas de salón, reportes de turno, gestión de no-shows, control de TPV |
| Portal Dirección | sí | KPIs de F&B: RevPASH, ticket promedio, cobertura de mesas, comparativa período, ingresos por outlet |
| **GX inbox (dual-fire)** | sí | eventos copiados a GX: queja de servicio por parte del huésped, alérgeno detectado en pedido, no-show de huésped con reserva, huésped VIP en mesa, pedido de room service para suite VIP |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Apertura del salón | Protocolo de apertura: verificación del montaje de mesas, mise en place de salón (manteles, cubertería, cristalería, menaje), revisión del plan de reservas del día, briefing con el maître sobre especialidades y alérgenos del menú del día | Maître / Capitán | Supervisor/Jefe | manual (inicio de servicio) | diaria | core | no |
| 2 | Briefing pre-servicio con cocina | El Maître coordina con el Chef los platos del día, los 86 (agotados), los alérgenos especiales del servicio, las demandas de huéspedes VIP. Registrado en el sistema | Maître | Supervisor/Jefe | manual | diaria | core | no |
| 3 | Gestión del plano de mesas | Visualización del salón en tiempo real: mesas libres, ocupadas, reservadas, bloqueadas para mantenimiento. El Maître asigna mesas a reservas y a walk-ins | Maître / Capitán | Operativo + Supervisor | continuo durante servicio | continua | core | no |
| 4 | Asignación de estaciones a camareros | El Maître asigna qué camarero cubre qué zona del salón (estación). El sistema trackea qué pedidos pertenecen a qué camarero para efectos de cobro y rendimiento | Maître | Supervisor/Jefe | manual al inicio de turno | diaria | importante | no |
| 5 | Recepción y acomodación de walk-in | Cuando un cliente llega sin reserva, el Maître/Capitán verifica disponibilidad en el sistema, asigna mesa, abre la `table` como ocupada | Maître / Capitán | Operativo | manual | continua | core | no |
| 6 | Recepción de huésped con reserva | Al llegar el cliente con reserva, el sistema muestra la reserva, confirma la asignación de mesa, abre la cuenta del servicio. Si es huésped del hotel: link automático al folio del PMS | Maître / Capitán | Operativo | manual (cliente llega) | continua | core | sí (si VIP o huésped especial) |
| 7 | Toma de pedido (comanda) en mesa | El camarero toma el pedido en la mesa usando la tablet/app de Bravas. Ingresa los platos por comensal, registra modificaciones y alérgenos específicos del cliente | Camarero | Operativo | manual | continua | core | no |
| 8 | Validación de alérgenos en pedido | Al ingresar un pedido, el sistema verifica automáticamente si algún plato contiene alérgenos registrados en el perfil del huésped. Alerta en pantalla del camarero y dual-fire a GX y cocina | Sistema | Operativo (automático) | automático (pedido ingresado) | continua | core | sí |
| 9 | Envío de pedido a cocina (KDS) | Una vez confirmado el pedido, se transmite automáticamente al KDS de cocina. Los platos se distribuyen a las partidas correspondientes | Sistema | automático | automático (tras confirmación camarero) | continua | core | no |
| 10 | Seguimiento de pedido en tiempo real | El camarero puede ver en su dispositivo el estado de cada plato en cocina: pendiente / en producción / listo en pase. El sistema notifica cuando los platos de una mesa están listos | Camarero | Operativo | automático (actualización KDS) | continua | core | no |
| 11 | Recogida de platos en línea de pase | El camarero recibe la notificación "platos listos" desde cocina y los recoge en la línea de pase. Confirma recogida en el sistema | Camarero | Operativo | manual (tras notificación KDS) | continua | core | no |
| 12 | Servicio en mesa | El camarero sirve los platos a la mesa correcta, al comensal correcto. Puede agregar notas de servicio en el pedido (ej: "huésped con intolerancia al gluten confirmada al servir") | Camarero | Operativo | manual | continua | importante | no |
| 13 | Gestión de modificaciones en mesa (re-orders) | Un comensal pide adicionales, cambio de plato, o cancela algo ya pedido. El camarero actualiza el pedido y el sistema sincroniza con cocina. Las cancelaciones antes de producir van al KDS como "cancelar" | Camarero | Operativo | manual (petición cliente) | continua | importante | no |
| 14 | Solicitud de cuenta | El comensal pide la cuenta. El camarero genera el `service_check` (cuenta de la mesa) con todos los items consumidos, impuestos aplicados (IVA en ES, IVA/AFIP en AR) y total | Camarero | Operativo | manual (petición cliente) | continua | core | no |
| 15 | Cobro en mesa — cargo a folio del huésped | Si el comensal es huésped del hotel, el cobro se carga al folio del huésped en el PMS (no paga ahora — paga al check-out). El sistema crea un `folio_item` en Front Office | Camarero | Operativo | manual (decisión cliente) | continua | core | no |
| 16 | Cobro en mesa — pago directo (TPV/efectivo) | Si el comensal es cliente externo o quiere pagar en el momento: pago con tarjeta (integración TPV), efectivo (gestión de caja), o voucher corporativo | Camarero | Operativo | manual (decisión cliente) | continua | core | no |
| 17 | Emisión de ticket / factura simplificada | Tras el cobro, el sistema emite el ticket fiscal (integración con módulo Fiscal de Admin-CFO): tiquet de consumidor final o factura simplificada (ES: Verifactu; AR: AFIP WSFE) | Sistema | automático (tras cobro) | automático | continua | core | no |
| 18 | Cierre de mesa | La mesa queda liberada en el sistema: estado cambia de "ocupada" a "libre" o "pendiente de limpieza". Notificación al camarero para preparar la mesa para el próximo cliente | Camarero / Sistema | Operativo | automático (tras cobro) | continua | core | no |
| 19 | Gestión de no-show de reserva | Cuando un cliente con reserva no llega en el tiempo de espera definido (ej: 15 min), el sistema alerta al Maître para liberar la mesa. Registro del no-show | Sistema / Maître | Supervisor/Jefe | automático (temporizador) | eventual | importante | sí |
| 20 | Gestión de reservas de mesa del restaurante | Alta, modificación y cancelación de reservas de mesa: nombre, fecha, hora, número de comensales, notas de preferencia, alérgenos. Integración con motor de reservas externo (Resy, OpenTable) si activo | Maître / Sistema (online) | Supervisor/Jefe + Portal Huésped | manual / automático (reserva online) | continua | core | no |
| 21 | Gestión de reservas online (integración Resy/OpenTable) | Sincronización bidireccional con plataformas de reservas: las reservas hechas por el huésped en Resy/OpenTable aparecen automáticamente en el plan de salón de Bravas | Sistema | automático (webhook/API) | automático | continua | importante | no |
| 22 | Gestión de huésped VIP en restaurante | Cuando un huésped marcado como VIP en el PMS hace una reserva o walk-in, el sistema alerta al Maître y GX con sus preferencias conocidas. Protocolo de bienvenida especial | Sistema / Maître | Operativo + Supervisor | automático (from PMS VIP flag) | eventual | importante | sí |
| 23 | Gestión de petición de room service — recepción | El huésped hace un pedido de room service: via app/portal del huésped, o por teléfono (el operador lo ingresa manualmente). Sistema registra la habitación, el pedido y la hora | Camarero RS / Recepcionista | Operativo + Portal Huésped | manual / automático (app) | continua (24/7 o por horario) | core | no |
| 24 | Coordinación de room service con cocina | El pedido de room service se envía al KDS de cocina (mismo flujo que pedido de salón, con tag "RS" y número de habitación). La cocina produce y notifica cuando está listo | Sistema | automático (via KDS) | automático | continua | core | no |
| 25 | Entrega de room service en habitación | El camarero RS recoge el pedido en cocina, lo monta en el carro de room service, lo lleva a la habitación. Confirma entrega en el sistema. El cargo se carga al folio del huésped | Camarero RS | Operativo | manual (entrega confirmada) | continua | core | no |
| 26 | Cobro de room service (folio) | El consumo de room service se carga automáticamente al folio del huésped en PMS. No requiere acción adicional del camarero si ya se configuró el vínculo habitación-folio | Sistema | automático | automático (tras confirmar entrega) | continua | core | no |
| 27 | Gestión de menú de room service | El Maître configura qué platos están disponibles para room service (puede ser subconjunto del menú del restaurante o menú específico de RS). Horarios de disponibilidad de RS | Maître | Supervisor/Jefe | manual | eventual | importante | no |
| 28 | Gestión de bar / lobby bar | Apertura del bar: mise en place de barra, estado de bebidas, apertura de caja de bar. Toma de consumiciones en barra, envío a panel de bar, cobro. Gestión de inventario de bar (integración con Economato para bebidas) | Bartender / Capitán | Operativo | manual | diaria | core | no |
| 29 | Cierre de caja de bar | Al cierre del bar: cuadre de caja (efectivo vs sistema), exportación de consumos de bar a Admin-CFO, registro de bebidas consumidas para descuento de stock en Economato | Maître / Bartender | Supervisor/Jefe | manual (fin de turno) | diaria | core | no |
| 30 | Gestión de carta de vinos (sommelier) | El Sommelier gestiona la carta de vinos: añade, elimina, actualiza precios. Integración con Economato (stock de bodega). En el servicio: recomienda, presenta y sirve el vino según el pedido | Sommelier / Maître | Supervisor/Jefe | manual | eventual / diaria | importante | no |
| 31 | Gestión de alérgenos al huésped | Cuando el huésped tiene alérgenos registrados o los declara al pedir, el sistema los muestra en la comanda. El camarero informa al huésped de los platos compatibles y de los que contienen su alérgeno. Registro en el pedido | Camarero | Operativo | manual (declaración cliente) / automático (perfil PMS) | continua | core | sí |
| 32 | Gestión de pedidos especiales (sin gluten, vegano, etc.) | Registro de peticiones especiales del comensal: sin gluten, vegano, vegetariano, kosher, halal. Se transmite a cocina con el pedido y se muestra en KDS como instrucción especial | Camarero | Operativo | manual | continua | importante | no |
| 33 | Cierre del salón | Protocolo de cierre: último cobro, cierre de mesas abiertas, cuadre de caja del salón, exportación de ventas a Admin-CFO, revisión de mise en place para el próximo servicio, apagado de equipos de salón | Maître | Supervisor/Jefe | manual (fin de servicio) | diaria | core | no |
| 34 | Reporte de turno F&B | Resumen del turno: cubiertos servidos, ticket promedio, ingresos por mesa/outlet, platos más vendidos, incidencias de servicio, no-shows. Firmado por el Maître | Maître | Supervisor/Jefe + Dirección | automático (fin de turno) | diaria | importante | no |
| 35 | Reporte mensual de F&B Servicio | Consolidado mensual: RevPASH, occupancy del salón, top 10 platos, evolución de ventas por outlet (restaurante, bar, room service), comparativa vs mes anterior y vs presupuesto | Maître / Director F&B | Dirección | automático (EOM) | mensual | importante | no |
| 36 | Gestión de evento de banquetes / salón privado (si toggle activo) | Coordinación de un evento en salón privado: menú confirmado, número de comensales, timing del servicio, montaje específico, equipo de servicio asignado, coordinación con cocina para volumen. Cobro centralizado al organizador | Maître / Banquet Manager | Supervisor/Jefe | manual (trigger desde reserva de evento) | eventual | importante | sí |
| 37 | Configuración de menú activo del día | El Maître (en coordinación con Cocina) activa o desactiva platos del día en el sistema. Los platos inactivos no aparecen en la comanda del camarero | Maître / Sistema | Supervisor/Jefe | manual (inicio de servicio) | diaria | core | no |
| 38 | Gestión de propinas (ES/AR) | En ES: opción de propina integrada en TPV (porcentaje o monto libre, opcional). En AR: las propinas suelen ser en efectivo sin registrar; opción de propina en tarjeta si el TPV lo soporta. Separación de propina del pago de consumo para liquidación correcta | Sistema / Camarero | Operativo | manual (si aplica) | eventual | importante | no |
| 39 | Integración con programa de fidelización | Si el hotel tiene loyalty program (vía Comercial o cadena), el camarero puede registrar el consumo F&B en la cuenta de puntos del huésped. Integración con PMS y módulo de Comercial | Sistema | automático (si loyalty activo) | automático | continua | nice | no |
| 40 | Gestión de queja de servicio en sala | Si el huésped tiene una queja (demora, error en plato, temperatura incorrecta), el camarero la registra en el sistema. Alerta al Maître. Si el Maître considera oportuno: ofrece compensación (cortesía). Dual-fire a GX | Camarero / Maître | Operativo | manual (petición cliente) | eventual | importante | sí |

### Sub-flujos clave (pseudocódigo simple)

```
Función: "Servicio completo en mesa — de la llegada al cobro"
1. Cliente llega al restaurante:
   a. Walk-in: Maître verifica disponibilidad → asigna mesa libre → abre `table` como OCUPADA
   b. Reserva: Maître confirma reserva → asigna mesa pre-asignada → abre `table`
   c. Si es huésped del hotel: Maître link el `table` al folio del huésped vía PMS
   d. Si es VIP: alerta automática a GX inbox (dual-fire)
2. Camarero asignado a la estación se acerca:
   - Presenta el menú del día
   - Verifica si el huésped tiene alérgenos en su perfil PMS → le informa de platos a evitar
3. Camarero toma la comanda en tablet (Bravas app):
   - Plato por comensal (asiento en mesa)
   - Notas de modificación
   - Si declara alérgeno nuevo: lo registra en el pedido + alerta a cocina
4. Sistema valida alérgenos → si hay coincidencia con perfil huésped → alerta visible + dual-fire GX
5. Camarero confirma pedido → se transmite automáticamente al KDS de cocina
6. Cocina produce → marca platos como "listos" en KDS
7. Sistema notifica al camarero: "Mesa 7 — platos listos"
8. Camarero recoge en línea de pase → sirve a la mesa → confirma en sistema
9. Cliente pide cuenta → camarero genera `service_check`:
   - Lista de consumos + precios + IVA (ES) o IVA AR
   - Total a pagar
10. Cliente decide forma de pago:
    - Cargo a habitación → `folio_item` creado en PMS → mesa se cierra
    - Pago directo → TPV/efectivo → factura/ticket fiscal generado
11. Mesa cambia a estado LIBRE
```

```
Función: "Room Service — pedido completo"
1. Huésped llega a su habitación y quiere cenar (23:00)
   a. Via app del huésped (Portal Huésped): selecciona platos del menú RS → confirma pedido
   b. Via teléfono: recepcionista/operador ingresa el pedido manualmente en Bravas
2. Sistema verifica:
   - Horario de RS activo (configurado por el hotel)
   - Platos disponibles en menú RS
   - Alérgenos del huésped vs platos pedidos → alerta si hay coincidencia
3. Pedido llega al portal del equipo de room service (Maître/Capitán lo ve)
4. Sistema transmite automáticamente a KDS de cocina con tag "RS - Hab. 304"
5. Cocina produce → marca como listo
6. Camarero RS recoge pedido en cocina → monta en carro de RS
7. Camarero RS va a habitación 304 → entrega → confirma entrega en app
8. Sistema genera automáticamente `folio_item` en PMS: habitación 304, consumo RS, importe, hora
9. No hay pago en el momento — el huésped lo paga al check-out
10. Sistema genera comprobante de pedido RS para el huésped (impreso o digital)
```

```
Función: "Gestión de alérgeno detectado en pedido activo"
1. Camarero ingresa pedido para mesa 12, comensal 1: "Salmón a la plancha"
2. Sistema consulta perfil del huésped en PMS → el huésped tiene registrado: alérgeno "pescado"
3. Sistema genera alerta visible en pantalla del camarero: "⚠️ ALÉRGENO: El huésped tiene alergia a PESCADO. Este plato contiene pescado."
4. Dual-fire automático al GX inbox: "Alerta alérgeno — Mesa 12 — Huésped [nombre] — Pescado"
5. KDS de cocina muestra la alerta en el plato afectado (si ya se transmitió el pedido)
6. Camarero informa al huésped → el huésped confirma o cambia el plato
7. Si cambia el plato: camarero actualiza la comanda → nuevo plato enviado a KDS
8. Cocina cancela producción del plato original si ya había empezado
9. Todo el flujo queda registrado en el `service_order` para trazabilidad
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `table` | sí | no | organization_id, id, outlet_id, nombre/número, capacidad, estado (libre/ocupada/reservada/en_limpieza/bloqueada), coordenadas_plano JSONB, zona (salon_principal/terraza/bar/privado), activa (bool) | custom_fields JSONB | → `table_reservation`, → `service_order` |
| `table_reservation` | sí | no | organization_id, id, table_id, fecha, hora, comensales, nombre_cliente, email, teléfono, notas, alérgenos JSONB, estado (confirmada/cancelada/no_show/completada), fuente (web/telefono/opentable/resy/hotel), guest_id (si es huésped del hotel, link PMS) | custom_fields JSONB | → `table`, → `guest` (PMS FO) |
| `service_order` | sí | no | organization_id, id, table_id, reservation_id (si aplica), camarero_user_id, inicio_datetime, fin_datetime (cierre de mesa), comensales, estado (abierta/en_produccion/servida/cobrada/cerrada), items JSONB (asiento, dish_id, modificaciones, alérgenos_declarados), guest_id (si huésped hotel), folio_cargado (bool), notas_servicio | custom_fields JSONB | → `table`, → `table_reservation`, → `order_item`, → `service_check`, → `folio_item` (PMS FO) |
| `order_item` | sí | no | organization_id, id, service_order_id, dish_id, cantidad, precio_unitario, modificaciones TEXT, alérgenos_confirmados JSONB, estado (pendiente/en_produccion/listo/servido/cancelado), kitchen_order_id (link al pedido en kitchen), notas | custom_fields JSONB | → `service_order`, → `dish` (kitchen), → `kitchen_order` (kitchen) |
| `service_check` | sí | no | organization_id, id, service_order_id, fecha_hora, items JSONB (descripcion, cantidad, precio_unitario, subtotal), descuentos JSONB, impuestos JSONB (IVA_pct, IVA_monto), total, forma_pago (folio/tarjeta/efectivo/voucher), estado (pendiente/pagada/anulada), número_fiscal, número_ticket_tpv | custom_fields JSONB | → `service_order`, → `folio_item` (PMS), → fiscal (admin-cfo) |
| `room_service_order` | sí | no | organization_id, id, habitacion_id, guest_id, fecha_hora_pedido, fecha_hora_entrega, items JSONB (dish_id, cantidad, modificaciones, alérgenos), estado (recibido/en_produccion/en_camino/entregado/cancelado), camarero_rs_user_id, folio_cargado (bool), notas | custom_fields JSONB | → `guest` (PMS FO), → `room` (PMS FO), → `kitchen_order` (kitchen), → `folio_item` (PMS) |
| `banquet_event` | sí (si toggle banquetes activo) | no | organization_id, id, nombre_evento, fecha_inicio, fecha_fin, comensales_confirmados, menú_id (from kitchen), salon_id, organizador_nombre, organizador_contacto, montaje JSONB, equipo_asignado JSONB, estado (cotizacion/confirmado/en_progreso/completado/cancelado), total_facturado | custom_fields JSONB | → `table` (salon_id), → `recipe`/`dish` (kitchen), → `service_check` (cobro) |

**Diagrama ER simplificado:**

```
table_reservation ──> table ──< service_order
                                     │
                              ──< order_item ──> dish (kitchen)
                                     │
                              ──< service_check ──> folio_item (PMS FO)
                                                └──> fiscal (admin-cfo)

room_service_order ──> guest (PMS FO)
                   └──> kitchen_order (kitchen)
                   └──> folio_item (PMS FO)

banquet_event ──> table (salon)
             └──> recipe/dish (kitchen)
```

---

## 7. Máquinas de estado

```
table:
  LIBRE ──asignación mesa──> OCUPADA
  OCUPADA ──todos los comensales se van + cobro──> PENDIENTE_LIMPIEZA
  PENDIENTE_LIMPIEZA ──mise en place completado──> LIBRE
  LIBRE ──reserva asignada──> RESERVADA
  RESERVADA ──cliente llega──> OCUPADA
  RESERVADA ──no-show (timeout)──> LIBRE (registro de no-show)
  LIBRE ──bloqueo manual──> BLOQUEADA
  BLOQUEADA ──desbloqueo manual──> LIBRE

service_order:
  ABIERTA ──primer pedido confirmado──> EN_PRODUCCION
  EN_PRODUCCION ──todos los platos servidos──> SERVIDA
  SERVIDA ──cliente pide la cuenta──> PENDIENTE_COBRO
  PENDIENTE_COBRO ──cobro completado──> COBRADA
  COBRADA ──cierre de mesa──> CERRADA
  EN_PRODUCCION ──cancelación completa──> CANCELADA

order_item:
  PENDIENTE ──enviado a KDS──> EN_PRODUCCION
  EN_PRODUCCION ──listo en pase──> LISTO
  LISTO ──camarero sirve──> SERVIDO
  EN_PRODUCCION ──cancelación antes de que cocine──> CANCELADO
  PENDIENTE ──86 / agotado──> NO_DISPONIBLE

room_service_order:
  RECIBIDO ──enviado a cocina──> EN_PRODUCCION
  EN_PRODUCCION ──listo en cocina──> LISTO
  LISTO ──camarero RS recoge──> EN_CAMINO
  EN_CAMINO ──entregado en habitación──> ENTREGADO
  RECIBIDO ──cancelado por el huésped antes de producir──> CANCELADO
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| POS iCG (España) | Point of Sale | bidireccional | Opcional (si hotel ya usa iCG) | POS líder en hostelería ES. Si hotel usa iCG: Bravas actúa como backend y sincroniza pedidos. Si no: Bravas es el POS |
| POS Lightspeed | Point of Sale | bidireccional | Opcional | POS cloud usado en boutique-mid scale ES/AR |
| POS Toast | Point of Sale | bidireccional | Opcional | POS líder en EEUU, creciendo en LATAM |
| OpenTable API | Reservas de mesa | bidireccional | Opcional | Plataforma de reservas online; webhooks para confirmación, modificación, cancelación |
| Resy API | Reservas de mesa | bidireccional | Opcional | Alternativa a OpenTable, creciendo en ES y AR premium |
| `@octo/bravashotel-kitchen` | Módulo interno | bidireccional | Obligatorio | Transmite pedidos vía KDS, recibe estado de platos (listo/86/cancelado), comparte catálogo de platos/alérgenos |
| `@octo/bravashotel-front-office` | Módulo interno | bidireccional | Obligatorio | Carga consumos al folio del huésped; recibe estado de habitaciones para room service; comparte perfil del huésped (alérgenos, VIP) |
| `@octo/bravashotel-admin-cfo` | Módulo interno | outbound | Obligatorio | Exporta cierres de caja de salón y bar; transmite facturas y tickets para Verifactu (ES) / AFIP (AR); exporta ventas por outlet para contabilidad |
| `@octo/bravashotel-storeroom` | Módulo interno | bidireccional | Importante | Bar consume stock de bebidas del Economato; pedidos de bebidas del bar generan solicitudes en Economato |
| `@octo/bravashotel-guest-experience` | Módulo interno | outbound (dual-fire) | Obligatorio | Eventos de alerta: alérgeno, VIP en mesa, queja de servicio, no-show |
| Verifactu / SII | Facturación fiscal ES | outbound | Obligatorio (ES) | Registro de tickets/facturas simplificadas en tiempo real |
| AFIP WSFE | Facturación fiscal AR | outbound | Obligatorio (AR) | Emisión de tickets/facturas AFIP (talonario electrónico) |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Gestión de mesas y salón | ✓ | | | | Universal |
| Toma de pedidos y KDS | ✓ | | | | Universal |
| Room service | ✓ | | | | Universal |
| Cargo al folio del huésped | ✓ | | | | Universal |
| Gestión de alérgenos (14) | ✓ | | | | Universal — ver sección compliance |
| Emisión de ticket / factura simplificada | | | | ✓ | ES: Verifactu (ley 11/2021 antifraude, entrada en vigor progresiva 2026). AR: AFIP WSFE (talonario C o B según categoría tributaria) |
| Propinas | | | | ✓ | AR: propina en efectivo frecuente, sin regulación formal; opción de propina en tarjeta si TPV lo soporta. ES: propina en tarjeta menos usual, sin obligación de reportarla; Bravas la registra opcionalmente |
| IVA en factura | | | | ✓ | ES: IVA 10% (alimentos/bebidas restaurante). AR: IVA 21% general; exenciones según tipo de producto. Los tipos se configuran por tenant según país |
| Obligación de carta en 2 idiomas (ES turístico) | | | ✓ | | Algunas CCAA turísticas (Baleares, Canarias) exigen cartas en español + lengua cooficial + idioma turístico relevante. Bravas: campo descripción_en y descripción_idioma_local en `dish` |
| Ticket fiscal obligatorio por consumo | | | | ✓ | ES: Ley antifraude — ticket obligatorio para cualquier consumo >X EUR. AR: Resolución AFIP — ticket fiscal obligatorio en gastronomía |
| Registro de propina para nómina (ES) | | | ✓ | | ES: si propina es voluntaria y va a empleado, puede tener implicaciones para IRPF del trabajador. RRHH debe conocer. Bravas: propina puede marcarse como "asignada a camarero" para liquidación |

---

## 10. Slots de extensión (crítico para N2 + multi-tenant)

### 10.1 Campos custom por entidad

```
table.custom_fields: JSONB (ej: "vista_mar", "accesibilidad_silla_ruedas", "capacidad_alta_silla")
table_reservation.custom_fields: JSONB (ej: "motivo_celebracion", "decoración_especial")
service_order.custom_fields: JSONB
service_check.custom_fields: JSONB (ej: "número_autorizacion_tarjeta")
banquet_event.custom_fields: JSONB (ej: "nombre_empresa", "NIF_empresa", "coordinador_externo")
```

### 10.2 Workflows custom

Hooks disponibles:
- `pre_table_reservation_confirm`: tenant puede exigir un depósito para reservas de grupo (>X personas)
- `post_table_reservation_confirm`: tenant puede enviar email/SMS de confirmación al cliente
- `post_service_order_close`: tenant puede enviar encuesta post-servicio automática al huésped
- `pre_service_check_charge_folio`: tenant puede requerir confirmación del director para cargos >X EUR al folio
- `post_service_check_paid`: tenant puede acumular puntos en loyalty program
- `post_room_service_delivered`: tenant puede enviar mensaje de seguimiento al huésped ("¿todo bien con su pedido?")
- `post_no_show_registered`: tenant puede enviar email de "lamentamos su ausencia" con enlace para nueva reserva

### 10.3 Integraciones per-tenant

- POS: iCG, Lightspeed, Toast, Square, otro custom
- Reservas de mesa: OpenTable, Resy, TheFork/TripAdvisor, Covermanager (ES), otro
- Fidelización: Mews Loyalty, Oracle OPERA Loyalty, propio del hotel

### 10.4 Branding/UI per-tenant

- Nombre de los outlets (ej: "Restaurante La Palmera", "Bar Lobby", "Terraza")
- Plano del salón personalizado (image map de las mesas)
- Menú en PDF o imagen del hotel (adjunto en portal del huésped)

### 10.5 Idiomas

- Carta en 3 idiomas (es-ES, es-AR, en) + posible idioma local (Baleares, Cataluña)
- Términos "Mozo" vs "Camarero" vs "Mesero" configurables por tenant

---

## 11. Nomenclatura i18n (tabla de términos del sector)

| Término técnico | es-ES default | es-AR default | en default | Customizable por tenant |
|---|---|---|---|---|
| maitre | "Maître / Jefe de Sala" | "Maître / Jefe de Salón" | "Maître d'Hôtel" | ✓ |
| captain | "Jefe de Turno / Capitán" | "Capitán" | "Captain" | ✓ |
| waiter | "Camarero" | "Mozo / Camarero" | "Waiter / Server" | ✓ |
| busboy | "Ayudante de Camarero" | "Ayudante de Mozo" | "Busboy / Commis" | ✓ |
| bartender | "Bartender / Barman" | "Bartender / Barman" | "Bartender" | ✓ |
| room_service_attendant | "Camarero de Habitaciones" | "Mozo de Room Service" | "Room Service Attendant" | ✓ |
| sommelier | "Sumiller" | "Sommelier" | "Sommelier" | ✓ |
| table | "Mesa" | "Mesa" | "Table" | ✓ |
| cover | "Cubierto / Comensal" | "Cubierto / Comensal" | "Cover" | ✓ |
| check / bill | "Cuenta" | "Cuenta" | "Check / Bill" | ✓ |
| room_service | "Servicio en Habitación" | "Room Service" | "Room Service" | ✓ |
| mise_en_place_sala | "Mise en Place de Salón" | "Preparación del Salón" | "Floor Setup" | ✓ |
| no_show | "No presentado" | "No show" | "No-show" | ✓ |
| eighty_six_fb | "Plato agotado" | "Se agotó" | "86'd / Out" | ✓ |
| banquet | "Banquete" | "Banquete" | "Banquet" | ✓ |
| lobby_bar | "Lobby Bar" | "Lobby Bar" | "Lobby Bar" | ✓ |
| revpash | "RevPASH" | "RevPASH" | "RevPASH" | — (término técnico) |
| tip | "Propina" | "Propina" | "Tip / Gratuity" | ✓ |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| Ley 11/2021 de Medidas de Prevención y Lucha contra el Fraude Fiscal (Verifactu) | ES | Obligación de emitir tickets y facturas con trazabilidad en sistema informático certificado (Verifactu). Los sistemas de TPV/POS deben cumplir el reglamento. Bravas: integración con Verifactu en cada `service_check` |
| AFIP RG 3665/2014 y complementarias — Controladores Fiscales | AR | Equipos de TPV en restaurantes deben estar vinculados a controladores fiscales homologados AFIP. Bravas: integración con AFIP WSFE para facturación electrónica de tickets |
| Reglamento (UE) 1169/2011 — Alérgenos en restaurantes | ES (UE) | Obligación de informar al consumidor sobre los 14 alérgenos en los platos. Incluso en cartas digitales. Bravas: gestión de alérgenos en cada plato, comunicación al camarero, alerta automática |
| Reglamento (CE) 852/2004 — APPCC/HACCP en servicio | ES (UE) | El área de servicio (manipulación de alimentos en sala, barra) también entra en scope del APPCC. Control de temperaturas de alimentos servidos. Bravas: temperatura de platos se registra en cocina; si sala detecta problema → alerta a cocina |
| Código Alimentario Argentino — Alérgenos | AR | El CAA ha incorporado la declaración de alérgenos en las cartas. Bravas: misma lista de 14 alérgenos, compatible |
| Ley de protección al consumidor (en ES: LGDCU; en AR: Ley 24.240) | ES + AR | Obligación de informar precios antes del servicio, derecho del consumidor a recibir ticket. Bravas: `service_check` siempre se genera con precios visibles antes de cobrar |
| Horario de establecimientos (CCAA en ES) | ES | Cada CCAA puede tener normativa de horarios de apertura y cierre de bares y restaurantes. Bravas: configuración de horarios de servicio por outlet y por CCAA/municipio |
| Ley 20/2011 del Tabaco (ES) / regulaciones AR | ES + AR | Restricciones de zonas de fumadores en restaurantes y bares. No impacto directo en el módulo pero el plano del salón puede marcar zonas |

---

## 13. Dependencias del lifecycle del módulo

**Qué pasa si el módulo se ACTIVA después del hotel ya corriendo:**
- Datos iniciales requeridos (seed): plano del salón con mesas configuradas, carta de platos (desde kitchen o importación), horarios de los outlets, usuarios del equipo de salón con roles asignados
- Flujo de setup inicial: (1) crear outlets (restaurante, bar, terraza...), (2) configurar mesas con capacidades y plano, (3) activar/desactivar room service y horarios, (4) configurar integración con POS/KDS externo si aplica, (5) configurar formas de pago y TPV

**Qué pasa si el módulo se DESACTIVA:**
- Datos que quedan: historial de `service_order` y `service_check`, historial de `room_service_order`, reservas completadas
- Datos irrecuperables: `table_reservation` futuras confirmadas (hay que notificar a los clientes)
- Procedimiento de archivo: cancelar reservas futuras con notificación, exportar historial de ventas a Admin-CFO, exportar data fiscal antes del cierre
- Módulos afectados: kitchen pierde el flujo de pedidos desde sala (crítico — no desactivar sin migrar el flujo)

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| RevPASH | ingresos_fb_salón / (asientos_disponibles × horas_servicio) | diaria | Dashboard Dirección + Portal Maître | Variable por tipo hotel; objetivo: >10 EUR/asiento/hora en 4* ES |
| Ticket promedio por comensal | ingresos_salón / cubiertos_servidos | diaria | Portal Maître + Dirección | Variable; referencia 4* AR: 5.000-8.000 ARS por cubierto; ES: 25-45 EUR |
| Ocupación del salón (seat occupancy) | cubiertos_servidos / (asientos_disponibles × turnos) | diaria | Portal Maître | Objetivo: >70% en almuerzo/cena |
| Tasa de no-shows | no_shows / total_reservas × 100 | diaria/mensual | Portal Maître + Dirección | Objetivo: <5%; acciones si supera 10% |
| Tiempo medio de mesa ocupada | AVG(fin_service_order - inicio_service_order) | diaria | Portal Maître | Referencia: 60-90 min almuerzo; 90-120 min cena |
| Tiempo desde pedido hasta servicio | AVG(tiempo desde service_order hasta todos los items SERVIDO) | por servicio | Portal Maître | Objetivo: <20 min para platos principales |
| Ingresos de room service | SUM(room_service_order.total) | diaria/mensual | Portal Dirección | Variable; en 4* ~5-8% del revenue F&B total |
| Platos con alerta de alérgeno | COUNT(service_order con alerta_alérgeno activada) | mensual | GX + Dirección | KPI de trazabilidad; objetivo: 100% alertas resueltas antes de servir |
| Quejas de servicio por turno | COUNT(service_order con queja registrada) | diaria | Portal Maître | Objetivo: 0; alerta si >2 en un turno |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol que la ve | Función principal | Mockup existente |
|---|---|---|---|---|
| `/fb-service/floor` | Operativo | Maître / Capitán / Camarero | Plano del salón: mesas en tiempo real, estado, reservas | no |
| `/fb-service/order/:table_id` | Operativo | Camarero | Comanda activa de una mesa: items, estado KDS, notas | no |
| `/fb-service/check/:service_order_id` | Operativo | Camarero | Cuenta de la mesa lista para cobrar | no |
| `/fb-service/room-service` | Operativo | Camarero RS / Maître | Pedidos de room service activos, estado, entrega | no |
| `/fb-service/bar` | Operativo | Bartender | Panel del bar: consumiciones activas, gestión de barra | no |
| `/fb-service/reservations` | Supervisor | Maître | Agenda de reservas del día/semana, gestión de no-shows | no |
| `/fb-service/banquets` | Supervisor | Maître / Banquet Manager | Gestión de eventos de banquetes (si toggle activo) | no |
| `/fb-service/reports` | Supervisor + Dirección | Maître + Director | KPIs, ingresos por outlet, top platos, comparativas | no |
| `/fb-service/menu` | Supervisor | Maître | Configuración del menú activo del día, activar/desactivar platos | no |
| (Portal Huésped) `/guest/dining` | Portal Huésped | Huésped | Reservar mesa, pedir room service, ver menú | no |

---

## 16. Riesgos conocidos y preguntas abiertas

- **Riesgo 1 — Coexistencia de Bravas POS vs POS externo:** si el hotel ya tiene un POS (iCG, Lightspeed, etc.) con sus propias pantallas táctiles en las que el equipo ya está formado, reemplazarlo puede ser costoso en cambio de hábito. Plan de mitigación: modo "Bravas como backend" donde el POS externo envía pedidos via API y Bravas actúa solo como gestión + KDS + folio.
- **Riesgo 2 — Propinas en AR + liquidación de sueldos:** en AR la propina en efectivo es informar (el empleado la recibe directamente). Si algún cliente paga con tarjeta e incluye propina, puede haber implicaciones de IVA/impuesto. Plan de mitigación: configuración por tenant de cómo gestionar propinas; derivar dudas a Admin-CFO/RRHH.
- **Riesgo 3 — Room service 24/7 vs horarios restringidos:** no todos los hoteles tienen RS las 24h. El sistema debe manejar "RS no disponible en este momento" con elegancia (mensaje al huésped). Plan de mitigación: configuración de horarios de RS por día y outlet; mensaje personalizable de "no disponible".
- **Pregunta abierta 1 — ¿El módulo de Banquetes/Eventos se gestiona desde fb-service o como módulo separado (`banquets`)?** El índice tiene `banquets.md` como módulo separado (Pack Eventos). Propuesta: banquetes simples (cenas privadas en el salón del restaurante) pertenecen a fb-service vía toggle; banquetes complejos (con salón propio, contrato, cotización, AV, etc.) son el módulo separado `banquets`. Decisión: Daniel + arquitecto.
- **Pregunta abierta 2 — ¿El camarero usa app móvil (tablet) o pantalla fija en el salón?** La UX de toma de comanda es muy diferente en tablet portátil vs estaciones fijas. Propuesta: tablet como dispositivo primario (como hacen la mayoría de los POS modernos), con soporte a estaciones fijas como fallback. Decisión: Product/UX.

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación inicial del catálogo — v1.0 | bravas |
