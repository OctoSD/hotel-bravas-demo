# Catálogo exhaustivo — Economato / Compras / Almacén

> Sector NUEVO — no estaba en la demo F2.5. Este módulo cubre el ciclo completo de abastecimiento y control de existencias del hotel: pedidos a proveedores, recepción de mercadería, almacenamiento (seco, refrigerado, congelado, bodega-vinos, material HK, material mantenimiento), distribución interna por departamento y control de stock con FIFO para perecederos. Es donde se juega la rentabilidad operativa de F&B y el control de costos del hotel.

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Economato / Compras |
| **Nombre (es-AR)** | Almacén / Compras / Depósito |
| **Nombre (en)** | Purchasing & Storeroom |
| **Código técnico** | `@octo/bravashotel-storeroom` |
| **Tipo** | Core |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | `@octo/bravashotel-admin-cfo` (facturas de proveedores, centros de coste, control presupuestario), `@octo/bravashotel-kitchen` (recetas estándar y escandallo de platos para calcular requisiciones), `@octo/bravashotel-housekeeping` (artículos de limpieza y lencería), `@octo/bravashotel-maintenance` (materiales y repuestos) |
| **Módulos dependientes de éste** | `@octo/bravashotel-kitchen` (consume ingredientes del stock), `@octo/bravashotel-fb-service` (consume bebidas y artículos de bar), `@octo/bravashotel-housekeeping` (consume productos de limpieza y artículos de amenities), `@octo/bravashotel-maintenance` (consume repuestos y materiales técnicos), `@octo/bravashotel-admin-cfo` (informa costos reales vs presupuestado) |
| **Activación default** | Siempre activo (Core), pero en boutique chico puede vivir como sub-función de `admin-cfo` sin portal propio. Se activa con portal propio en el onboarding cuando el hotel indica "Tiene Jefe de Economato" o "Tiene almacén separado" |

---

## 2. Propósito del módulo

- **Qué resuelve:** gestiona el ciclo completo de abastecimiento del hotel, desde que un departamento solicita un artículo hasta que lo recibe en su área. Cubre: la gestión del catálogo de proveedores y artículos, la generación y seguimiento de órdenes de compra, la recepción física de mercadería con control de calidad y cantidad, el almacenamiento diferenciado por tipo (seco, refrigerado, congelado, bodega de vinos, material HK, material de mantenimiento), la distribución interna a los departamentos con imputación a centros de coste, y el control permanente de inventario con FIFO obligatorio para perecederos. Sin este módulo, el hotel no tiene trazabilidad de sus costos de alimentos y bebidas, ni control sobre el stock de artículos de limpieza o materiales técnicos.

- **Qué NO resuelve:** la contabilidad de las facturas de proveedores (eso es `admin-cfo`), la elaboración de recetas y escandallos (eso es `kitchen`, aunque este módulo los consume para calcular requisiciones automáticas), el mantenimiento físico de las cámaras frigoríficas o el control de temperatura IoT (eso es `maintenance`). No gestiona la nómina del personal del economato (eso es `hr`). No gestiona la compra de activos fijos (eso es `admin-cfo`).

- **Métrica principal de éxito del sector:** Food Cost % — costo de alimentos consumidos / ingresos de F&B × 100. Si este porcentaje baja o se mantiene dentro del benchmark con la misma calidad, el módulo cumple su función. También: Beverage Cost % y nivel de merma.

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Jefe del sector | Jefe de Economato | Encargado de Almacén / Encargado de Depósito | Purchasing & Storeroom Manager / Storekeeper | 2 | Director de Operaciones o CFO (según hotel) | Almaceneros, Recibidor de mercadería | en hotel chico: 1 persona cubre todos los sub-roles + puede ser el mismo jefe de administración |
| Jefe de Compras | Jefe de Compras / Responsable de Compras | Jefe de Compras | Purchasing Manager / Buyer | 3 | Jefe de Economato | — | puede fusionarse con el Jefe de Economato en hotel mediano |
| Almacenero | Almacenero | Almacenero / Repositor | Storekeeper / Store Attendant | 4 | Jefe de Economato | — | — |
| Recibidor de mercadería | Recibidor | Recibidor de mercadería | Receiving Clerk | 4 | Jefe de Economato | — | en hotel chico: lo hace el Almacenero |
| Bodeguero | Bodeguero (vinos) | Bodeguero | Wine Cellar Keeper | 4 | Jefe de Economato | — | solo en hoteles con bodega de vinos activa; puede ser el Sommelier en 5* |

**Variantes por tamaño de hotel:**
- **Boutique chico (20-40 habs):** no hay sector formal. El chef + el recepcionista o el administrador gestionan las compras. Sin catálogo de proveedores ni OC formal. Riesgo alto de descontrol de costos.
- **Boutique urbano medio (40-100 habs):** puede haber 1 persona de economato (multi-rol: compras + recepción + almacén). Puede vivir bajo administración.
- **Urbano 4* mediano (80-150 habs) — TARGET PRIMARIO:** Jefe de Economato + 1-2 almaceneros. Separación entre quien compra y quien recibe (control interno). Integración con F&B y HK activa.
- **5* / resort grande:** Purchasing Manager dedicado + Receiving Clerk + almaceneros por área (almacén seco, cámaras, bodega). Puede incluir Bodeguero para gestión de carta de vinos.

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | no | — |
| Portal Operativo del sector | sí | gestión de proveedores, creación de órdenes de compra, recepción de mercadería, control de stock, distribución interna, inventarios |
| Portal Supervisor/Jefe | sí | aprobación de órdenes de compra, dashboard de stock crítico, control de food cost, alertas de caducidad, valoración de inventario |
| Portal Dirección | sí | food cost %, beverage cost %, nivel de merma, valor total de inventario, deuda con proveedores (integrado con `admin-cfo`) |
| **GX inbox (dual-fire)** | sí | alerta de stock_critico enviada a GX cuando un artículo de consumo de huésped (ej: amenities, bebidas minibar) está por agotarse; alerta de recepción_mercadería_fallida si se rechaza mercadería comprometida para evento con huéspedes |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Gestión del catálogo de artículos | Alta, baja y modificación de artículos en el catálogo maestro: nombre, código interno, unidad de medida, categoría (alimentos secos, frescos, congelados, bebidas, limpieza, amenities, mantenimiento), proveedor(es) habitual(es), precio de referencia, umbral de stock mínimo y máximo | Jefe de Economato | Operativo | manual | eventual (por altas/modificaciones) | core | no |
| 2 | Gestión del catálogo de proveedores | Alta, baja y modificación de proveedores: nombre, NIF/CUIT, dirección, contacto comercial, condiciones de pago (contado / 30 días / 60 días), días de entrega, artículos que suministra, certificaciones de calidad (ej: APPCC, BRC), valoración del proveedor | Jefe de Economato / Jefe de Compras | Operativo | manual | eventual | core | no |
| 3 | Crear requisición interna | Cualquier departamento (Cocina, Bar, HK, Mantenimiento, Recepción) puede generar una solicitud de artículos al Economato, indicando artículo, cantidad, fecha requerida y centro de coste | Chef / Gobernanta / Jefe de Mantenimiento / cualquier jefe de dept | Operativo (desde su propio portal) | manual | diaria | core | no |
| 4 | Revisión y aprobación de requisiciones | Jefe de Economato revisa las requisiciones pendientes: verifica existencia en stock, determina si hay que comprar o si se puede atender desde stock propio, aprueba o rechaza con motivo | Jefe de Economato | Operativo | manual | diaria | core | no |
| 5 | Generación automática de requisición por stock mínimo | Cuando el stock de un artículo cae por debajo del umbral mínimo configurado, el sistema genera automáticamente una requisición de compra pendiente de revisión por el Jefe de Economato | Sistema (automático) | — | automático (stock < mínimo) | continua | core | sí si es artículo crítico de huésped |
| 6 | Crear orden de compra (OC) | Creación de una orden de compra formal: artículo(s), cantidades, proveedor, precio pactado (puede tomarse del catálogo o editarse), fecha de entrega solicitada, centro(s) de coste de destino, condiciones de pago | Jefe de Compras / Jefe de Economato | Operativo | manual / desde requisición aprobada | diaria | core | no |
| 7 | Aprobación de orden de compra | Workflow de aprobación de OC antes de enviarla al proveedor. Umbral configurable por tenant: OC < X€/$ las aprueba el Jefe de Economato; OC > X€/$ requiere aprobación del CFO / Director | Jefe de Economato (hasta umbral) / CFO (sobre umbral) | Supervisión / Operativo | manual | diaria | core | no |
| 8 | Envío de orden de compra al proveedor | Una vez aprobada, la OC se envía al proveedor por email (PDF autogenerado) o mediante integración B2B con el proveedor (EDI / portal proveedor). Queda en estado "Enviada — pendiente de entrega" | Sistema (automático) / Jefe de Compras | — | automático post-aprobación | diaria | core | no |
| 9 | Seguimiento de órdenes de compra | Vista de todas las OC en curso: estado (borrador / enviada / parcialmente recibida / completada / cancelada), fecha de entrega esperada, alertas de OC vencidas sin entrega | Jefe de Economato | Operativo / Supervisión | manual / alertas automáticas | diaria | importante | no |
| 10 | Recepción de mercadería — verificación de cantidad | Al llegar la mercadería, el Recibidor contrasta los artículos recibidos con la OC correspondiente: artículo, cantidad, unidad de medida. Si hay diferencia, se registra como "diferencia de recepción" con motivo (faltante / exceso) | Recibidor / Almacenero | Operativo | manual (al momento de la entrega) | diaria | core | no |
| 11 | Recepción de mercadería — control de calidad | Verificación de calidad de los artículos recibidos: fecha de caducidad / vencimiento, estado del packaging, temperatura de productos frescos y congelados (registro de temperatura), conformidad con especificaciones técnicas pactadas | Recibidor / Jefe de Economato | Operativo | manual | diaria | core | no |
| 12 | Recepción parcial de mercadería | Registrar que solo parte de la OC fue entregada, con detalle de qué artículos se recibieron y cuáles quedan pendientes. La OC queda en estado "parcialmente recibida" | Recibidor | Operativo | manual | eventual | importante | no |
| 13 | Rechazo de mercadería | Si la mercadería no cumple los estándares de calidad (caducidad próxima, mal estado, temperatura incorrecta), se registra el rechazo con motivo, fotos (adjunto) y se notifica al proveedor. La OC puede quedar pendiente para nueva entrega | Recibidor / Jefe de Economato | Operativo | manual | eventual | core | sí si afecta evento/servicio planificado |
| 14 | Alta de mercadería en stock (ingreso al almacén) | Una vez recibida y aprobada, el sistema incrementa el stock del artículo correspondiente con el método FIFO: el lote nuevo se coloca con su fecha de ingreso y fecha de caducidad para garantizar que se consume antes el lote anterior | Sistema (automático post-recepción) | — | automático post-recepción ok | por recepción | core | no |
| 15 | Control FIFO de perecederos | El sistema etiqueta cada lote de perecederos con fecha de ingreso y fecha de caducidad. Las salidas de stock (distribuciones) siempre consumen el lote más antiguo primero. Alertas automáticas de artículos próximos a caducar (configurable: X días antes) | Sistema (automático) + Almacenero | Operativo | automático (caducidad) | continua | core | no |
| 16 | Almacenamiento por tipo de bodega | El sistema registra en qué área física está almacenado cada artículo: Almacén Seco, Cámara Refrigerada (1-5°C), Cámara Congelada (-18°C), Bodega de Vinos (10-14°C), Almacén HK (artículos limpieza + amenities), Almacén Mantenimiento (repuestos + consumibles técnicos). Cada artículo tiene tipo de almacenamiento configurado | Almacenero / Jefe de Economato | Operativo | manual (configuración) + automático (stock) | continua | core | no |
| 17 | Distribución interna — atender requisición aprobada | Cuando hay stock suficiente, el Almacenero prepara el pedido para el departamento solicitante: descuenta del stock, registra la salida con imputación al centro de coste del departamento receptor, y lo entrega | Almacenero | Operativo | manual | diaria | core | no |
| 18 | Distribución interna — transferencia entre departamentos | Un departamento puede devolver artículos al economato o transferirlos a otro departamento (ej: Cocina transfiere botellas de vino al Bar). Se registra el movimiento con doble imputación de centros de coste | Almacenero / Jefe de Economato | Operativo | manual | eventual | importante | no |
| 19 | Registro de merma y deterioro | Registro de artículos dados de baja por caducidad, mal estado, rotura o pérdida. Incluye motivo, cantidad, lote afectado y valor monetario de la baja. Alerta al Jefe de Economato y al CFO cuando la merma supera el umbral definido | Almacenero / Jefe de Economato | Operativo | manual | eventual | core | no |
| 20 | Inventario físico periódico (recuento) | Proceso de recuento físico de existencias para contrastar con el stock teórico del sistema. Genera diferencias (sobrante / faltante). Ajuste de stock previa aprobación del Jefe de Economato y auditoría de Admin-CFO | Almacenero + Jefe de Economato (+ admin-cfo para cierre) | Operativo | manual | mensual (mínimo) | core | no |
| 21 | Inventario de cierre mensual | Inventario especial al final de cada mes para calcular el food cost y beverage cost del período. Genera valoración del stock al precio de costo. Se integra con Admin-CFO para el cierre contable | Jefe de Economato + CFO | Operativo / Supervisión | manual (inicio de mes) | mensual | core | no |
| 22 | Alerta de stock crítico | Cuando el stock de un artículo cae por debajo del umbral mínimo configurado, se genera una alerta visible en el panel del Jefe de Economato y se propone automáticamente una requisición de compra | Sistema (automático) | Supervisión | automático | continua | core | sí si es artículo de consumo de huésped |
| 23 | Alerta de caducidad próxima | X días antes de que un lote de artículos perecederos caduque, el sistema alerta al Almacenero y al Jefe de Economato para que tomen acción (usar inmediatamente, devolver al proveedor o dar de baja) | Sistema (automático) | Supervisión / Operativo | automático | continua | core | no |
| 24 | Consulta de stock actual | Vista en tiempo real del stock de cualquier artículo: cantidad disponible, desglose por lote (con fechas), valoración al precio de costo, ubicación (bodega), último movimiento | Jefe de Economato / Almacenero / Chef (consulta limitada) | Operativo | manual | continua | importante | no |
| 25 | Kardex de artículo | Histórico completo de movimientos de un artículo: ingresos (con OC de origen), salidas (con centro de coste y departamento), ajustes por inventario, bajas por merma. Trazabilidad total para auditoría | Jefe de Economato | Operativo | manual | eventual (consulta / auditoría) | importante | no |
| 26 | Valoración del inventario | Cálculo del valor monetario total del inventario a precio de costo, desglosado por categoría (alimentos, bebidas, limpieza, mantenimiento, amenities). Alimenta el balance de `admin-cfo` | Sistema (automático) | Supervisión / Dirección | automático | diaria (actualización) | importante | no |
| 27 | Control de costos por departamento (centro de coste) | Cada salida de stock queda imputada a un centro de coste (Cocina, Bar, HK, Mantenimiento, Recepción, etc.). Reporte mensual de consumo real vs presupuestado por departamento | Jefe de Economato / CFO | Supervisión / Dirección | automático | mensual | core | no |
| 28 | Food cost report mensual | Informe de costo de alimentos: stock inicial + compras - stock final = costo de alimentos consumidos. Food cost % = costo / ingresos F&B. Desglose por categoría de producto | Jefe de Economato | Supervisión / Dirección | automático | mensual | core | no |
| 29 | Beverage cost report mensual | Ídem para bebidas: costo de bebidas consumidas / ingresos de bebidas. Desglose por tipo (vinos, cervezas, espirituosos, refrescos, aguas) | Jefe de Economato | Supervisión / Dirección | automático | mensual | core | no |
| 30 | Comparativa de precios de proveedores | Vista de precios del mismo artículo en distintos proveedores, histórico de precios de compra, evolución mensual. Permite identificar cuándo un proveedor ha subido precios sin justificación | Jefe de Compras / Jefe de Economato | Supervisión | automático | mensual | importante | no |
| 31 | Evaluación y valoración de proveedores | Scoring periódico de proveedores: puntualidad de entrega, calidad de la mercadería (rechazos / no-conformidades), precio competitivo, respuesta ante incidencias. KPI para decidir cambio de proveedor | Jefe de Economato | Supervisión | manual | mensual/trimestral | importante | no |
| 32 | Integración con escandallo de platos (kitchen) | El módulo `kitchen` define recetas estándar con ingredientes y cantidades. Este módulo usa esas recetas para calcular automáticamente las necesidades de compra según el forecast de servicios de F&B (platos vendidos × ingredientes por receta = necesidad de stock) | Sistema (automático) | Operativo | automático (desde kitchen) | diaria | importante | no |
| 33 | Gestión de bodega de vinos | Funciones específicas para la bodega de vinos: catálogo de referencias (productor, añada, bodega, región), control de temperatura y humedad (registro manual o integración sensor IoT), inventario por referencia, reserva de botellas para servicio, control de movimientos | Bodeguero / Jefe de Economato | Operativo | manual / automático | continua | importante | no |
| 34 | Recepción y control de amenities (HK) | Gestión específica del stock de artículos de acogida para habitaciones (amenities: champú, gel, jabón, etc.) y artículos de limpieza de HK. Monitoreo de consumo real vs estándar por habitación ocupada. Alerta cuando el consumo real supera el estándar | Almacenero / Gobernanta | Operativo | manual / automático | diaria | importante | no |
| 35 | Recepción y control de materiales de mantenimiento | Gestión del stock de repuestos y consumibles técnicos (bombillas, filtros, aceites, piezas mecánicas, herramientas desechables). Integración con `maintenance`: cuando mantenimiento registra un trabajo, descuenta los materiales utilizados del stock | Almacenero / Jefe de Mantenimiento | Operativo | manual / desde maintenance | eventual | importante | no |
| 36 | Devolución de mercadería al proveedor | Proceso de devolución formal: registrar artículo a devolver, cantidad, lote, motivo (defecto, error en pedido, exceso), generación de albarán de devolución. Seguimiento del crédito o reemplazo del proveedor | Jefe de Economato / Jefe de Compras | Operativo | manual | eventual | importante | no |
| 37 | Informe de compras mensual | Resumen de todas las órdenes de compra del mes: total gastado, desglose por proveedor, desglose por categoría, número de OCs, comparativa vs presupuesto mensual de compras | Jefe de Economato | Supervisión / Dirección | automático | mensual | importante | no |
| 38 | Presupuesto de compras por departamento | Definición del presupuesto mensual / trimestral de compras por departamento (Cocina, Bar, HK, Mantenimiento). Alerta cuando el consumo real supera el 80% del presupuesto en el mes en curso | CFO / Director + Jefe de Economato | Supervisión | manual (definición) + automático (control) | mensual | importante | no |
| 39 | Integración con Admin-CFO (facturas y pagos) | Cada OC recibida genera un pasivo contable en `admin-cfo` (cuenta a pagar al proveedor). La factura del proveedor se cruza con la OC y el albarán de recepción (proceso 3-way matching). Solo se paga lo que se recibió según OC | Sistema (automático) + CFO | Operativo / Supervisión | automático post-recepción | por recepción | core | no |
| 40 | Exportación a ERP (Holded / A3) | Exportación mensual o automática de movimientos de stock, valoración de inventario, compras y consumos por centro de coste hacia el ERP contable del tenant | Sistema (automático) | — | automático (mensual cierre) | mensual | importante | no |
| 41 | Gestión de contratos con proveedores preferentes | Registro de condiciones contractuales pactadas: precio fijo por período, descuentos por volumen, exclusividad, fecha de renovación, penalizaciones. Alertas de contratos próximos a vencer | Jefe de Compras / Director | Operativo | manual | eventual | importante | no |
| 42 | Control de temperatura de cámaras (registro manual) | Registro manual diario de temperaturas de las cámaras frigoríficas y congeladoras (obligatorio para compliance APPCC). En modo avanzado: integración con sensores IoT para registro automático y alerta en tiempo real | Almacenero | Operativo | manual / automático (si sensor IoT) | diaria | core (compliance APPCC) | no |

### Sub-flujos clave (pseudocódigo simple)

```
Función: "Flujo completo — Requisición → Orden de Compra → Recepción → Stock"
1. Chef crea Requisición desde su portal: artículo "Lomo de res", 15 kg, fecha requerida: mañana, CC: Cocina
2. Sistema verifica stock actual: quedan 2 kg (stock mínimo = 5 kg) → ya hay alerta activa
3. Jefe de Economato recibe la requisición + alerta de stock crítico en su panel
4. Jefe aprueba requisición y crea Orden de Compra para proveedor "Carnes Distribuidora X":
   - artículo: Lomo de res, 20 kg (cantidad estándar del proveedor), precio pactado: $X/kg
   - fecha de entrega: mañana antes de las 10:00
5. OC pasa por aprobación: si monto < umbral → aprueba Jefe Economato. Si > umbral → requiere CFO
6. Sistema envía OC al proveedor por email (PDF firmado digitalmente por el hotel)
7. OC queda en estado "ENVIADA — pendiente entrega"
8. Al día siguiente, proveedor llega con la mercadería
9. Recibidor contrasta: albarán del proveedor vs OC → 20 kg confirmados, temp OK, fecha cad +21 días
10. Sistema ingresa 20 kg al stock de Lomo de res, lote "2026-11-11" con caducidad "2026-12-02"
11. FIFO activado: próxima salida consumirá el lote anterior (si quedaban 2 kg con lote más antiguo) antes del nuevo
12. Sistema genera evento "stock_actualizado" → la requisición del Chef pasa a estado "ATENDIDA"
13. Admin-CFO recibe notificación: nuevo pasivo (factura por pagar a Carnes X, 20 kg × $X/kg)
14. Jefe de Economato verifica la factura vs OC vs albarán (3-way matching) → aprueba pago
```

```
Función: "Control FIFO de perecederos y alerta de caducidad"
1. Almacén tiene 3 lotes de queso Gruyère:
   - Lote A: 5 kg, ingresado 2026-10-20, caduca 2026-11-25
   - Lote B: 8 kg, ingresado 2026-11-01, caduca 2026-12-10
   - Lote C: 10 kg, ingresado 2026-11-08, caduca 2026-12-20
2. Cocina solicita 3 kg de Gruyère
3. Sistema asigna la salida del Lote A (el más antiguo) → stock Lote A: 2 kg restantes
4. Hoy es 2026-11-10. Sistema calcula: Lote A caduca en 15 días (umbral alerta = 7 días antes) → sin alerta aún
5. El 2026-11-18 (7 días antes del 25): sistema genera alerta "CADUCIDAD PRÓXIMA — Lote A Gruyère, 2 kg, caduca 2026-11-25"
6. Jefe de Economato recibe alerta en su panel y en email
7. Jefe indica a Cocina que use el Lote A con urgencia
8. Si el 2026-11-25 todavía queda stock del Lote A: sistema genera "ARTÍCULO CADUCADO — Lote A Gruyère, baja obligatoria"
9. Almacenero registra baja por caducidad: 2 kg Gruyère, motivo "caducidad", valor $Y
10. Merma queda registrada en el informe mensual y se imputa al CC Cocina
```

```
Función: "Distribución interna a departamento con imputación a centro de coste"
1. HK (Gobernanta) crea requisición: 24 botellas de amenities champú 50ml, para mañana
2. Jefe de Economato aprueba — hay stock suficiente en Almacén HK
3. Almacenero prepara el pedido: selecciona 24 botellas (aplica FIFO si hay varios lotes)
4. Sistema registra salida de stock: -24 unidades, CC: Housekeeping
5. HK recibe los artículos y firma la entrega (confirmación de distribución)
6. Sistema actualiza stock visible para Gobernanta en su portal (consulta de stock limitada a HK)
7. Consumo de HK queda registrado para el informe mensual: "amenities: 24 u × $X = $Y, CC Housekeeping"
8. Al cierre del mes, Admin-CFO recibe el consumo total de HK valorado por centro de coste
```

```
Función: "Inventario físico mensual y cálculo de Food Cost"
1. Día 1 del mes: Jefe de Economato inicia proceso de "Inventario mensual — Cierre octubre"
2. Sistema genera lista de todos los artículos activos con stock teórico a contar
3. Almaceneros recuentan físicamente cada área: Almacén Seco, Cámara Refrigerada, Cámara Congelada, Bodega
4. Se ingresan los conteos reales al sistema
5. Sistema compara stock teórico vs stock real → diferencias destacadas (sobrantes / faltantes)
6. Jefe de Economato analiza diferencias > umbral → investiga motivo (error de registro, merma no registrada, robo)
7. Se aprueban los ajustes con justificación — log de auditoría queda registrado
8. Sistema calcula food cost del mes:
   Food Cost = Stock inicial + Compras del mes - Stock final
   Food Cost % = Food Cost / Ingresos F&B × 100
9. Reporte exportado a Admin-CFO para cierre contable del mes
10. Admin-CFO exporta a Holded / A3 (si tenant usa ERP)
```

```
Función: "3-way matching — OC vs Albarán vs Factura"
1. Proveedor entrega mercadería → Albarán de entrega (delivery note)
2. Recibidor carga el albarán en el sistema: artículos, cantidades, precios unitarios
3. Sistema confronta automáticamente: Albarán vs OC aprobada
   - Si coincide todo → Recepción OK, stock actualizado, se genera "Pasivo pendiente" en Admin-CFO
   - Si hay diferencia de cantidad → alerta "DISCREPANCIA: OC 20 kg, albarán 18 kg" → Jefe decide si acepta parcial
   - Si hay diferencia de precio → alerta "PRECIO DIFERENTE: OC $X/kg, albarán $Y/kg" → Jefe debe aprobar o rechazar
4. Semanas después, proveedor envía Factura
5. Sistema confronta Factura vs OC vs Albarán (3-way matching):
   - Si coincide → Factura aprobada automáticamente, Admin-CFO agenda el pago según condiciones (30 días, etc.)
   - Si hay diferencia → Factura en estado "DISPUTA" → Jefe de Compras gestiona con el proveedor
6. Admin-CFO ejecuta el pago en la fecha pactada → marca la OC como "COMPLETAMENTE PAGADA"
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `supplier` | sí | no | id, organization_id, name, tax_id (NIF/CUIT), country, address, city, zip, contact_name, contact_email, contact_phone, payment_terms (days), delivery_days, categories_supplied JSONB, quality_certifications JSONB, status (active/inactive/blacklisted), rating (1-5), notes | `custom_fields JSONB` | → `purchase_order`, `stock_item` |
| `stock_item` | sí | no | id, organization_id, name, internal_code, category (food_dry/food_fresh/food_frozen/beverage/cleaning/amenity/maintenance/other), unit_of_measure, storage_type (dry/refrigerated/frozen/wine_cellar/hk_storage/maintenance_storage), min_stock, max_stock, reorder_qty, avg_cost_price, current_stock (cantidad total disponible), active | `custom_fields JSONB`, `allergens JSONB` (para F&B) | → `stock_lot`, `supplier`, `purchase_order_line`, `distribution_request_line`, `recipe_ingredient` (kitchen) |
| `stock_lot` | sí | no | id, organization_id, stock_item_id, lot_number, received_date, expiry_date, quantity_initial, quantity_remaining, storage_location, unit_cost, purchase_order_line_id | — | → `stock_item`, `purchase_order_line` |
| `purchase_order` | sí | no | id, organization_id, po_number, supplier_id, status (draft/approved/sent/partially_received/completed/cancelled), created_by, created_at, expected_delivery_date, approved_by, approved_at, notes, total_amount | `custom_fields JSONB` | → `supplier`, `purchase_order_line`, `receiving_note`, `supplier_invoice` |
| `purchase_order_line` | sí | no | id, purchase_order_id, stock_item_id, quantity_ordered, unit_of_measure, unit_price, total_price, quantity_received, notes | — | → `purchase_order`, `stock_item`, `stock_lot` |
| `receiving_note` | sí | no | id, organization_id, purchase_order_id, received_by, received_at, status (ok/partial/rejected), delivery_note_number (albarán del proveedor), temperature_check JSONB (para frescos/congelados), quality_check_notes, rejection_reason | `photos JSONB` | → `purchase_order`, `receiving_note_line` |
| `receiving_note_line` | sí | no | id, receiving_note_id, stock_item_id, quantity_expected, quantity_received, quantity_rejected, rejection_reason, lot_number, expiry_date, unit_cost | — | → `receiving_note`, `stock_item` |
| `distribution_request` | sí | no | id, organization_id, requesting_department, requesting_user_id, status (pending/approved/fulfilled/rejected), created_at, required_date, notes | `custom_fields JSONB` | → `distribution_request_line`, `cost_center` |
| `distribution_request_line` | sí | no | id, distribution_request_id, stock_item_id, quantity_requested, quantity_fulfilled, unit_of_measure | — | → `distribution_request`, `stock_item`, `stock_lot` |
| `inventory` | sí | no | id, organization_id, inventory_date, inventory_type (monthly/spot/annual), status (in_progress/completed), created_by, completed_by, completed_at, notes | — | → `inventory_line`, `stock_adjustment` |
| `inventory_line` | sí | no | id, inventory_id, stock_item_id, lot_id, theoretical_qty, physical_qty, difference, unit_cost, difference_value | — | → `inventory`, `stock_item` |
| `stock_adjustment` | sí | no | id, organization_id, stock_item_id, lot_id, adjustment_type (shrinkage/spoilage/breakage/theft/count_correction), quantity, unit_cost, total_value, reason, approved_by, created_at | — | → `stock_item`, `stock_lot`, `inventory` |
| `cost_center` | sí (compartida con admin-cfo) | sí | id, organization_id, name, code, department, budget_monthly, active | — | → `distribution_request`, `purchase_order` (imputa costos) |
| `supplier_invoice` | no (owner: admin-cfo) | sí | id (referencia), supplier_id, purchase_order_id, invoice_number, invoice_date, amount, status, payment_due_date | — | → `purchase_order` (3-way matching) |

**Diagrama ER simplificado:**

```
supplier ───────────────< purchase_order >──────────< purchase_order_line
                               │                              │
                               ▼                              ▼
                        receiving_note >──────< receiving_note_line
                                                              │
                                                              ▼
stock_item ──────────────────────────────────────────< stock_lot
    │
    ├──────────< distribution_request_line >──< distribution_request ──> cost_center
    │
    ├──────────< inventory_line >──────────── inventory
    │
    └──────────< stock_adjustment

supplier_invoice (owner: admin-cfo) ──> purchase_order (3-way match)

stock_item ←── recipe_ingredient (owner: kitchen) [consulta para cálculo de necesidades]
```

---

## 7. Máquinas de estado

```
purchase_order.status:
  DRAFT ──aprobación_jefe_economato──> APPROVED (si monto < umbral)
  DRAFT ──aprobación_CFO──> APPROVED (si monto > umbral)
  DRAFT ──rechazo──> REJECTED
  APPROVED ──envío_proveedor──> SENT
  SENT ──recepción_parcial──> PARTIALLY_RECEIVED
  SENT ──recepción_completa──> COMPLETED
  PARTIALLY_RECEIVED ──recepción_del_resto──> COMPLETED
  SENT ──cancelación──> CANCELLED
  APPROVED ──cancelación──> CANCELLED

distribution_request.status:
  PENDING ──revisión_jefe_economato──> APPROVED
  PENDING ──rechazo_jefe_economato──> REJECTED (con motivo)
  APPROVED ──distribución_física──> FULFILLED
  APPROVED ──falta_stock──> ON_HOLD (esperando reposición)

receiving_note.status:
  OK ──ingresa_a_stock──> COMPLETED
  PARTIAL ──ingresa_parcial_a_stock──> COMPLETED_PARTIAL
  REJECTED ──notificación_proveedor──> RETURNED_TO_SUPPLIER

inventory.status:
  IN_PROGRESS ──todos_conteos_cargados──> PENDING_APPROVAL
  PENDING_APPROVAL ──aprobación_jefe──> COMPLETED
  COMPLETED ──genera_ajustes_si_hay_diferencias──> COMPLETED (ajustes aplicados)

stock_lot (ciclo de vida):
  ACTIVE (cantidad_remaining > 0 y no caducado)
  EXPIRY_WARNING (cantidad_remaining > 0, caducidad dentro de X días)
  EXPIRED (caducidad superada)
  DEPLETED (cantidad_remaining = 0, consumido completo)
  WRITTEN_OFF (dado de baja por merma/caducidad/rotura)
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| **Holded** | ERP / Contabilidad | bidireccional | Opcional (ES — Opción A ERP) | exportación de OCs, valoración de inventario, consumos por CC. Importación de presupuestos de compra desde Holded. API REST Holded soporta gestión de compras y almacén |
| **A3 ERP (A3 ERP / A3 Gestión)** | ERP / Contabilidad | bidireccional | Opcional (ES — Opción A ERP alternativa) | misma función que Holded. A3 es más usado en pymes ES con contable externo |
| **Contabilium** | ERP / Contabilidad | outbound | Opcional (AR) | exportación de compras y costos al ERP contable AR |
| **Makro ES** | Proveedor B2B hostelería | outbound (pedidos) | Opcional | Makro tiene portal B2B para hostelería con integración API para pedidos y catálogo de precios. Alta relevancia en ES |
| **Transgourmet / Pavo ES** | Proveedor B2B hostelería | outbound (pedidos) | Opcional | distribuidor mayorista hostelería ES (antes Pavo, ahora Transgourmet). Portal pedidos B2B + catálogo electrónico |
| **La Sirena ES** | Proveedor congelados | outbound (pedidos) | Opcional | distribuidor de congelados para hostelería ES. Pedidos B2B online |
| **Makro AR** | Proveedor B2B hostelería | outbound (pedidos) | Opcional | Makro está presente en AR como principal mayorista hostelero en CABA y GBA |
| **Distribuidoras mayoristas AR** (custom) | Proveedor B2B | outbound (pedidos) | Opcional | integración configurable con distribuidoras locales AR (Lar, Mariano Max, distribuidoras regionales) mediante EDI o email de OC |
| **Sensores IoT de temperatura** | Hardware / IoT | inbound | Opcional (modo avanzado) | integración con sensores de temperatura en cámaras frigoríficas y congeladoras. Registros automáticos en lugar de manuales. Alerta inmediata si temperatura sale de rango. Protocolos: MQTT, REST. Compatible con sensores Sigfox, LoRa, Wi-Fi genéricos |
| **Verifactu** | Facturación ES | outbound | Obligatorio (ES) — delegado a `admin-cfo` | las facturas de proveedores (cuentas a pagar) que genera este módulo se procesan en `admin-cfo` bajo normativa Verifactu. Dato de origen viene de aquí |
| **AFIP WSFE** | Facturación AR | outbound | Obligatorio (AR) — delegado a `admin-cfo` | ídem Verifactu para AR |
| **Email (SMTP)** | Notificaciones | outbound | Obligatoria | envío de OCs a proveedores por email (PDF), alertas de stock crítico, alertas de caducidad, notificaciones de rechazo de mercadería |
| **`@octo/bravashotel-kitchen`** | Módulo interno | bidireccional | Core (interno) | kitchen provee recetas con ingredientes y cantidades. Este módulo las consume para calcular requisiciones automáticas según forecast de producción |
| **`@octo/bravashotel-maintenance`** | Módulo interno | bidireccional | Core (interno) | maintenance registra materiales usados en trabajos. Este módulo descuenta del stock de materiales técnicos. Maintenance puede crear requisiciones de repuestos |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Gestión de proveedores y OC | ✓ | | | | universal |
| Recepción de mercadería y control de calidad | ✓ | | | | |
| Control FIFO de perecederos | ✓ | | | | obligatorio en ambos países por normativa sanitaria |
| Almacenamiento diferenciado por tipo | ✓ | | | | |
| Distribución interna por CC | ✓ | | | | |
| Inventario físico periódico | ✓ | | | | |
| Food Cost / Beverage Cost reporting | ✓ | | | | |
| 3-way matching OC/Albarán/Factura | ✓ | | | | |
| Integración con Holded / A3 | | | ✓ | | ERPs preferentes en ES |
| Integración con Contabilium / ERPs AR | | ✓ | | | ERPs preferentes en AR |
| Makro como proveedor integrado | | | | ✓ | Makro opera en ES y AR con portales B2B distintos (makro.es vs makro.com.ar), mismo concepto pero integración diferente |
| Transgourmet / Pavo como proveedor | | | ✓ | | distribuidor hostelería ES sin equivalente directo en AR |
| Distribuidoras gastronómicas AR (Lar, etc.) | | ✓ | | | |
| Facturación proveedores (IVA/ARCA) | | | | ✓ | AR: facturas en pesos/USD, retenciones impositivas, ARCA (ex-AFIP). ES: IVA soportado tipo general/reducido según producto |
| APPCC compliance (Análisis de Peligros y Puntos Críticos de Control) | | | | ✓ | mismo concepto en AR (HACCP, Código Alimentario Argentino — CAA, SENASA) y ES (APPCC, Reglamento CE 852/2004). El registro de temperatura es obligatorio en ambos pero las normativas de referencia son distintas |
| Nomenclatura "Economato" | | | ✓ | | término estándar en ES |
| Nomenclatura "Almacén" / "Depósito" / "Pañol" | | ✓ | | | términos más usados en AR |
| Ticket de peso / balanza integrada | ✓ | | | | para recepción de productos a granel (carne, pescado, verduras). Integración con balanzas de precisión es hardware-agnóstico en ambos países |
| IVA soportado en facturas de compra | | | | ✓ | AR: IVA 21% / 10.5% / exento según categoría del producto. ES: IVA general 21%, reducido 10% (alimentos elaborados), superreducido 4% (alimentos básicos, pan, leche). La lógica de IVA en facturas de compras debe adaptarse por país |

---

## 10. Slots de extensión (crítico para N2 + multi-tenant)

### 10.1 Campos custom por entidad

```
supplier.custom_fields: JSONB
  → Ejemplos: "gestor de cuenta asignado", "frecuencia de pedido preferida", "condición de temperatura de transporte", "certificado de manipulación de alimentos (URL)"

stock_item.custom_fields: JSONB
  → Ejemplos: "marca preferida", "sustituible por (stock_item_id)", "notas de almacenamiento específicas", "proveedor alternativo"
  stock_item.allergens: JSONB (específico F&B — para trazabilidad alérgenos en recetas)

purchase_order.custom_fields: JSONB
  → Ejemplos: "urgente", "aprobado vía WhatsApp (referencia)", "para evento específico (event_id)"

distribution_request.custom_fields: JSONB
  → Ejemplos: "urgente por servicio inminente", "evento vinculado (event_id)"
```

### 10.2 Workflows custom

```
pre_create_purchase_order: tenant puede exigir que toda OC tenga requisición interna aprobada como origen (control de gasto)
post_create_purchase_order: tenant puede disparar notificación al proveedor por canal alternativo (ej: WhatsApp Business)
pre_approve_purchase_order: tenant puede configurar flujo de doble aprobación (Jefe Economato + Director General) para OCs sobre umbral
post_receive_goods: tenant puede disparar notificación al departamento solicitante cuando su mercadería llegó
pre_distribution: tenant puede exigir firma digital del solicitante antes de distribuir
post_stock_minimum_alert: tenant puede configurar quién recibe la alerta (solo Jefe Economato, o también el Chef / GM)
post_expiry_alert: tenant puede configurar escalado de alertas: 7 días → Almacenero, 3 días → Jefe Economato, 1 día → Director Operaciones
pre_inventory_adjustment: tenant puede exigir aprobación del CFO para cualquier ajuste de inventario > umbral de valor
```

### 10.3 Integraciones per-tenant

```
ERP contable: Holded (ES default), A3 (ES alt), Sage (ES), Contabilium (AR), Bejerman (AR), personalizado
Proveedores B2B con integración: Makro ES, Transgourmet/Pavo ES, La Sirena ES, Makro AR, otro custom
Sensores IoT temperatura: Sigfox, LoRa, Wi-Fi genérico (cualquier sensor con REST/MQTT API)
Balanzas de recepción: integración via USB/RS232 o API del fabricante (opcional, modo avanzado)
```

### 10.4 Branding/UI per-tenant

- Nomenclatura del sector: "Economato" (ES default) / "Almacén" / "Depósito" / "Pañol" (AR configurable)
- Nomenclatura del jefe: "Jefe de Economato" / "Encargado de Almacén" / "Encargado de Depósito"
- Colores del módulo en la UI operativa

### 10.5 Idiomas

- Diccionario i18n del módulo permite sobrescribir términos técnicos
- Nota: "FIFO", "APPCC/HACCP", "Food Cost" son términos técnicos internacionales no traducidos

---

## 11. Nomenclatura i18n (tabla de términos del sector)

| Término técnico | es-ES default | es-AR default | en default | Customizable por tenant |
|---|---|---|---|---|
| `storeroom_manager` | "Jefe de Economato" | "Encargado de Almacén" | "Storeroom Manager" | ✓ |
| `purchasing_manager` | "Jefe de Compras" | "Jefe de Compras" | "Purchasing Manager" | ✓ |
| `store_attendant` | "Almacenero" | "Almacenero" | "Store Attendant" | ✓ |
| `receiving_clerk` | "Recibidor" | "Recibidor de mercadería" | "Receiving Clerk" | ✓ |
| `wine_cellar_keeper` | "Bodeguero" | "Bodeguero" | "Wine Cellar Keeper" | ✓ |
| `storeroom` | "Economato" | "Almacén" / "Depósito" | "Storeroom / Storeroom" | ✓ |
| `purchase_order` | "Orden de compra" | "Orden de compra" | "Purchase Order (PO)" | ✓ |
| `requisition` | "Requisición" / "Solicitud de compra" | "Requisición" | "Requisition / Purchase Request" | ✓ |
| `receiving_note` | "Albarán de recepción" | "Remito de recepción" | "Receiving Note / Delivery Receipt" | ✓ |
| `delivery_note` | "Albarán del proveedor" | "Remito del proveedor" | "Delivery Note" | ✓ |
| `stock_item` | "Artículo" / "Producto" | "Artículo" | "Stock Item" | ✓ |
| `stock_lot` | "Lote" | "Lote" | "Stock Lot / Batch" | ✓ |
| `distribution_request` | "Solicitud de distribución" | "Pedido interno" | "Distribution Request" | ✓ |
| `cost_center` | "Centro de coste" | "Centro de costo" | "Cost Center" | ✓ |
| `food_cost` | "Food Cost" / "Coste de alimentos" | "Food Cost" / "Costo de alimentos" | "Food Cost" | no |
| `beverage_cost` | "Beverage Cost" / "Coste de bebidas" | "Beverage Cost" / "Costo de bebidas" | "Beverage Cost" | no |
| `shrinkage` | "Merma" | "Merma" | "Shrinkage / Wastage" | ✓ |
| `fifo` | "FIFO" / "Primeras entradas, primeras salidas" | "FIFO" | "FIFO (First In, First Out)" | no |
| `inventory` | "Inventario" | "Inventario" | "Inventory / Stocktake" | ✓ |
| `three_way_matching` | "Verificación a tres bandas" / "3-way matching" | "Conciliación de 3 vías" / "3-way matching" | "3-way matching" | no |
| `dry_storage` | "Almacén seco" | "Almacén seco" / "Despensa seca" | "Dry Storage" | ✓ |
| `cold_room` | "Cámara frigorífica" | "Cámara frigorífica" / "Cámara fría" | "Cold Room / Walk-in Refrigerator" | ✓ |
| `freezer_room` | "Cámara congeladora" | "Cámara congeladora" | "Freezer Room / Walk-in Freezer" | ✓ |
| `wine_cellar` | "Bodega" | "Bodega" | "Wine Cellar" | ✓ |
| `appcc` | "APPCC" | "HACCP" | "HACCP" | no (término legal — no cambiar) |
| `supplier` | "Proveedor" | "Proveedor" | "Supplier / Vendor" | ✓ |
| `allotment` | N/A en este contexto | N/A | N/A | — |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| **Reglamento CE 852/2004 — Higiene de los alimentos (APPCC)** | UE / ES | exige implantación de sistema APPCC (Análisis de Peligros y Puntos Críticos de Control) en empresas alimentarias. El hotel es empresa alimentaria. El economato debe registrar temperaturas de almacenamiento, mantener trazabilidad de lotes, controlar caducidades. El módulo da soporte documental a este registro |
| **HACCP / Código Alimentario Argentino (CAA)** | AR | equivalente AR del APPCC. Regulado por el CAA (Ley 18.284) y el SENASA (Servicio Nacional de Sanidad y Calidad Agroalimentaria). Mismos requisitos de trazabilidad y control de temperatura que en ES |
| **RGPD** | UE / ES | los datos de proveedores (personas físicas, autónomos) están sujetos al RGPD. Mínimo impacto pero a tener en cuenta para retención de datos de contacto |
| **Ley 25.326 (Protección de Datos Personales)** | AR | ídem RGPD para AR, aplicable a datos de proveedores personas físicas |
| **Normativa de etiquetado — Reglamento UE 1169/2011** | UE / ES | para alimentos servidos en el hotel, la trazabilidad de alérgenos en recetas (vinculada a los ingredientes del economato) es obligatoria. El módulo debe poder registrar alérgenos por artículo para que `kitchen` pueda cumplir esta normativa |
| **Resolución 834/2010 SENASA (AR) — Manipulación de alimentos** | AR | regulación de manipulación, transporte y almacenamiento de alimentos. Aplica al economato: temperaturas, fechas de vencimiento, condiciones de almacenamiento |
| **IVA soportado en facturas de compra** | Split | AR: alícuotas IVA 21% / 10.5% / 0% según categoría de producto. ES: IVA general 21%, reducido 10% (alimentos procesados), superreducido 4% (alimentos básicos). La aplicación del tipo de IVA correcto en las OCs y facturas es responsabilidad de `admin-cfo`, pero los artículos del catálogo deben tener categoría fiscal para facilitar el cálculo |
| **Retenciones impositivas a proveedores (AR)** | AR | en AR, el hotel puede estar obligado a retener Ganancias e IVA al pagar facturas de proveedores según su condición fiscal. Gestionado en `admin-cfo` pero los datos del proveedor (condición AFIP/ARCA) deben estar en el catálogo de proveedores de este módulo |
| **Ley de Residuos de Gestión Especial / RAEE** | Split | para residuos de materiales de mantenimiento (aceites, baterías, fluorescentes): AR — Ley 24.051 y legislación provincial. ES — normativa UE residuos. No impacto directo en el módulo pero justifica el registro de bajas de materiales técnicos para trazabilidad de eliminación |
| **Verifactu (Ley antifraude fiscal)** | ES (2026) | las facturas de compra a proveedores deben quedar registradas en el sistema de facturación verificable. Delegado a `admin-cfo`, pero los datos de OC y recepción de este módulo son el origen de esas facturas |

---

## 13. Dependencias del lifecycle del módulo

**Qué pasa si el módulo se ACTIVA después del hotel ya corriendo:**
- Datos iniciales requeridos (seed): catálogo de artículos inicial (puede importarse por CSV), catálogo de proveedores inicial, configuración de centros de coste (puede importar de `admin-cfo`), umbrales de stock mínimo/máximo por artículo
- Flujo de setup inicial: (1) importar catálogo de artículos o crearlo manualmente, (2) dar de alta proveedores habituales, (3) configurar centros de coste por departamento, (4) realizar inventario inicial (stock de apertura) para que el sistema tenga valores reales, (5) configurar umbrales de alerta, (6) activar flujo de requisiciones con los departamentos
- Migración de datos: si el hotel tenía Excel de stock, se importa como inventario inicial. Los históricos de compras pueden quedar como referencia en documentos adjuntos, no necesariamente migrados al sistema

**Qué pasa si el módulo se DESACTIVA:**
- Datos huérfanos: las OCs pendientes de recepción quedan sin seguimiento. Los datos de stock quedan congelados en su último estado
- Irrecuperables sin el módulo: el seguimiento de caducidades FIFO se interrumpe — riesgo sanitario real. Documentar esto en la advertencia de desactivación
- `kitchen` pierde la capacidad de hacer requisiciones automáticas y de calcular costo de producción basado en stock real
- `admin-cfo` pierde el origen de datos para las cuentas a pagar de proveedores de consumo corriente
- Procedimiento de archivo: mantener el inventario en modo solo-lectura, exportar valoración del inventario al día de desactivación para `admin-cfo`
- Recomendación: este módulo no debería poder desactivarse si hay OCs en estado SENT o PARTIALLY_RECEIVED — el sistema debe impedirlo o advertirlo

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| **Food Cost %** | (Stock inicial + Compras del mes – Stock final) / Ingresos F&B × 100 | Mensual | Dashboard Economato, Portal Dirección | benchmark: 28-35% para restaurante de hotel. <28% = muy eficiente. >38% = problema a investigar |
| **Beverage Cost %** | (Stock bebidas inicial + Compras bebidas – Stock bebidas final) / Ingresos bebidas × 100 | Mensual | Dashboard Economato | benchmark: 20-28% para bebidas en hotel |
| **Merma %** | Valor merma del mes / Valor total compras del mes × 100 | Mensual | Dashboard Economato | benchmark: <3% para un hotel bien gestionado |
| **Rotación de stock** | Costo de artículos consumidos / Valor promedio del inventario | Mensual | Dashboard Economato | benchmark: alimentos frescos deberían rotar 10-15x por mes; secos 2-4x |
| **Valor total de inventario** | Suma de (cantidad × precio de costo) de todos los lotes activos | Diaria | Dashboard Economato, Portal Dirección | referencia: depende del tamaño del hotel. Alerta si sube bruscamente (over-stock) o baja (riesgo desabasto) |
| **Artículos en stock crítico (< mínimo)** | Número de artículos con stock_actual < stock_mínimo | Diaria | Dashboard Economato | meta: 0 artículos en stock crítico al cierre de cada día |
| **Artículos próximos a caducar** | Número de lotes con expiry_date < hoy + X días | Diaria | Dashboard Economato | meta: 0 artículos caducados. Alertas con 7 días de anticipación |
| **Cumplimiento de entrega de proveedores (%)** | OCs recibidas en fecha / OCs enviadas × 100 | Mensual | Dashboard Economato | meta: >90%. Permite evaluar fiabilidad de cada proveedor |
| **Tasa de rechazo de mercadería (%)** | Líneas rechazadas en recepción / líneas totales recibidas × 100 | Mensual | Dashboard Economato | meta: <2%. Incremento sostenido indica problema con proveedor |
| **Lead time promedio de compra** | Días promedio entre creación de OC y recepción completa | Mensual | Dashboard Economato | por proveedor; relevante para ajustar umbrales de stock mínimo |
| **Gasto real vs presupuesto de compras (%)** | Gasto real del mes / Presupuesto del mes × 100 | Mensual | Portal Dirección | meta: 95-105%. Desviaciones > 10% requieren explicación |
| **Días de inventario** | Valor del inventario / (Costo mensual / 30) | Mensual | Dashboard Economato | alimentos frescos: 3-7 días ideal; secos: 15-30 días; bebidas: 30-45 días |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol que la ve | Función principal | Mockup existente |
|---|---|---|---|---|
| `/storeroom/dashboard` | Supervisión | Jefe de Economato, CFO | Panel: alertas de stock crítico, artículos próximos a caducar, OC pendientes de aprobación, food cost del mes en curso | mockup: pendiente |
| `/storeroom/items` | Operativo | Jefe de Economato, Almacenero | Catálogo de artículos: lista, búsqueda, filtros por categoría/tipo almacenamiento, estado de stock actual | mockup: pendiente |
| `/storeroom/items/new` | Operativo | Jefe de Economato | Alta de nuevo artículo en el catálogo | mockup: pendiente |
| `/storeroom/items/:id` | Operativo | Jefe de Economato | Ficha de artículo: detalle, stock actual, lotes activos, kardex de movimientos, historial de precios | mockup: pendiente |
| `/storeroom/suppliers` | Operativo | Jefe de Economato, Jefe de Compras | Catálogo de proveedores: lista, búsqueda, scoring | mockup: pendiente |
| `/storeroom/suppliers/new` | Operativo | Jefe de Economato | Alta de nuevo proveedor | mockup: pendiente |
| `/storeroom/suppliers/:id` | Operativo | Jefe de Compras, Jefe de Economato | Ficha de proveedor: datos, historial de OCs, scoring, artículos suministrados | mockup: pendiente |
| `/storeroom/purchase-orders` | Operativo | Jefe de Economato, Jefe de Compras | Lista de órdenes de compra con filtros (estado, proveedor, fecha, importe) | mockup: pendiente |
| `/storeroom/purchase-orders/new` | Operativo | Jefe de Compras / Jefe de Economato | Creación de nueva OC: artículos, cantidades, proveedor, fecha entrega, CC | mockup: pendiente |
| `/storeroom/purchase-orders/:id` | Operativo | Jefe de Compras, CFO (aprobación) | Detalle de OC: ver / aprobar / enviar / recibir / cancelar | mockup: pendiente |
| `/storeroom/receiving` | Operativo | Recibidor, Almacenero | Lista de OCs en estado "SENT" pendientes de recepción, acceso rápido para registrar llegada de mercadería | mockup: pendiente |
| `/storeroom/receiving/:po_id` | Operativo | Recibidor | Formulario de recepción: contraste OC vs albarán, control de calidad, temperatura, lotes, fechas caducidad | mockup: pendiente |
| `/storeroom/stock` | Operativo | Jefe de Economato, Almacenero | Vista de stock actual: todos los artículos con cantidad disponible, desglose por lote, alertas | mockup: pendiente |
| `/storeroom/stock/:item_id/lots` | Operativo | Almacenero | Lotes activos de un artículo: cantidad, fecha ingreso, caducidad, ubicación, estado FIFO | mockup: pendiente |
| `/storeroom/distribution` | Operativo | Almacenero, Jefe de Economato | Lista de solicitudes de distribución pendientes de atender, aprobadas, en espera | mockup: pendiente |
| `/storeroom/distribution/:id` | Operativo | Almacenero | Atender solicitud de distribución: confirmar artículos a entregar, lote FIFO asignado, firma | mockup: pendiente |
| `/storeroom/requisitions` | Operativo | Jefe de Economato (revisor) + Jefes de depts (solicitantes, vista limitada) | Lista de requisiciones internas entrantes: revisar, aprobar, rechazar, convertir a OC | mockup: pendiente |
| `/storeroom/inventory` | Operativo | Jefe de Economato, Almacenero | Gestión de inventarios: crear nuevo inventario, cargar conteos físicos, ver diferencias | mockup: pendiente |
| `/storeroom/inventory/:id` | Operativo | Jefe de Economato, Almacenero | Detalle del inventario: lista de artículos a contar, carga de cantidades, diferencias, aprobación | mockup: pendiente |
| `/storeroom/reports/food-cost` | Supervisión | Jefe de Economato, CFO, GM | Food cost y beverage cost mensual: cálculo, comparativa histórica, desglose por categoría | mockup: pendiente |
| `/storeroom/reports/purchases` | Supervisión | Jefe de Economato, CFO | Informe mensual de compras: por proveedor, por categoría, vs presupuesto | mockup: pendiente |
| `/storeroom/reports/shrinkage` | Supervisión | Jefe de Economato, CFO | Informe de mermas y bajas: por artículo, por motivo, valor monetario | mockup: pendiente |
| `/storeroom/wine-cellar` | Operativo | Bodeguero, Jefe de Economato | Vista específica de bodega de vinos: referencias, añadas, inventario, temperatura, reservas para servicio | mockup: pendiente |
| `/storeroom/temperature-log` | Operativo | Almacenero | Registro diario de temperaturas de cámaras (manual o desde sensores IoT). Historial y alertas de desvío | mockup: pendiente |

---

## 16. Riesgos conocidos y preguntas abiertas

- **Riesgo 1 — FIFO y multi-ubicación:** si el hotel tiene varios almacenes físicos (ej: almacén principal + sub-almacén de cada piso en resort grande), la lógica FIFO debe operar por almacén o de forma global. En la versión core se modela con un solo almacén por tipo. La multi-ubicación sería una extensión de N2+. Mitigación: en onboarding, si el hotel indica "múltiples almacenes" se activa la extensión; si no, default a almacén único por tipo.

- **Riesgo 2 — Integración con sensores IoT de temperatura:** los protocolos de sensores de temperatura son muy variados (Sigfox, LoRa, Bluetooth, Wi-Fi, RS485, ModBUS). Integrar todos es costoso. Mitigación: en la versión core el registro de temperatura es manual. La integración IoT es una extensión opt-in que se activa con un adaptador configurable por marca de sensor.

- **Riesgo 3 — Complejidad del 3-way matching:** el proceso de cruzar OC vs albarán vs factura es sencillo cuando los 3 documentos coinciden, pero las discrepancias son frecuentes en hostelería (proveedor entrega por unidades diferentes, factura incluye items de varias OCs, etc.). Mitigación: el matching debe ser flexible — permitir aprobación manual de discrepancias con justificación, no solo matching exacto.

- **Riesgo 4 — Datos de proveedores en AR con inflación:** en AR, los precios de los artículos cambian frecuentemente por inflación. El precio de referencia en el catálogo de artículos puede quedar obsoleto rápidamente. Mitigación: el precio siempre se toma de la última OC o del albarán de recepción, no del catálogo. El catálogo tiene un precio "de referencia" solo para estimaciones. Alertar cuando el precio de una OC difiere >X% del precio de referencia.

- **Pregunta abierta 1:** ¿El módulo de bodega de vinos es una sub-sección de este módulo o debe ser un sub-módulo separado (`storeroom-wine-cellar`) dado que tiene lógica específica (añadas, referencias, temperaturas particulares)? Para un 4* básico, incluirlo aquí es suficiente. Para un 5* con sommelier y carta extensa, puede necesitar más. → A decidir por arquitecto.

- **Pregunta abierta 2:** ¿La integración con proveedores B2B (Makro, Transgourmet) es API directa o solo email con PDF? Makro tiene API B2B real pero con acuerdos comerciales. Transgourmet tiene portal propio. Para el MVP se sugiere empezar con email (OC en PDF) e ir sumando integraciones B2B reales en N2. → A confirmar con Daniel: ¿hay interés en partnership con Makro ES?

- **Pregunta abierta 3:** ¿El módulo tiene portal propio para que los jefes de departamento (Chef, Gobernanta) creen sus requisiciones, o las requisiciones se crean siempre desde el portal del Economato? Para UX correcta, el Chef debería poder crear requisiciones desde su portal (Cocina) y este módulo las recibe. Implica que `kitchen`, `housekeeping` y `maintenance` tienen un sub-formulario de "crear requisición" que empuja datos a este módulo. → A confirmar con arquitecto (impacta diseño de portales).

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación del catálogo completo v1.0. Sector nuevo (no estaba en demo F2.5). 42 funciones documentadas, 13 entidades de datos (supplier, purchase_order, receiving_note, stock_item, inventory, distribution_request, cost_center y sus líneas), integración Holded/A3/Makro/Transgourmet, control FIFO documentado, mapa geo ES/AR, 24 pantallas. | bravas |
