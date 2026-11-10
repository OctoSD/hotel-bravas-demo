# Catálogo exhaustivo — Administración / CFO / Finanzas

> Ficha canónica del módulo `@octo/bravashotel-admin-cfo`. Sigue la estructura de 17 secciones del `_TEMPLATE_catalogo_sector.md`. Un developer puede construir este módulo completo leyendo solo este documento.

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Administración / Dirección Financiera |
| **Nombre (es-AR)** | Administración / Gerencia Financiera |
| **Nombre (en)** | Finance & Administration / CFO Office |
| **Código técnico** | `@octo/bravashotel-admin-cfo` |
| **Tipo** | Core (siempre activo en todo tenant) |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | `@octo/bravashotel-front-office` (folio del huésped), `@octo/bravashotel-hr` (nóminas coordinadas), `@octo/bravashotel-storeroom` (facturas de proveedores), todos los módulos Core (centros de coste) |
| **Módulos dependientes de éste** | Todos los módulos Core y Packs (todos tienen al menos un centro de coste y reportan a Admin-CFO) |
| **Activación default** | Siempre activo |

---

## 2. Propósito del módulo

- **Qué resuelve:** Gestiona el ciclo económico-financiero completo del hotel: cierres contables diarios y mensuales, cuentas por cobrar y pagar, tesorería, conciliación bancaria, control de costos por departamento, nóminas (en coordinación con RRHH), facturación electrónica conforme al marco legal de cada país (Verifactu en ES, AFIP WSFE en AR), presupuestos y análisis de desviaciones. Incluye la función de auditoría nocturna (Night Audit): cierre del día contable del hotel, balanceo de cuentas, posting automático de cargos y generación del reporte de ocupación nocturno.

- **Qué NO resuelve:** No es el módulo de nóminas en profundidad (eso es `@octo/bravashotel-hr`); Admin-CFO aprueba y valida los datos de nómina pero no gestiona contratos laborales, turnos ni formación. No gestiona el stock físico de almacén (eso es `@octo/bravashotel-storeroom`), aunque sí registra las facturas y el costo asociado. No hace revenue management ni pricing dinámico de habitaciones (eso es `@octo/bravashotel-commercial`).

- **Métrica principal de éxito del sector:** GOP Margin (Gross Operating Profit %) = (Revenue total − Costos operativos) / Revenue total. Benchmark referencia: >30% para hotel 4* urbano. KPI secundario: cierre del día contable antes de las 06:00 AM por el Night Auditor.

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Jefe del sector | Director Financiero / CFO | Gerente Administrativo-Financiero / CFO | CFO / Director of Finance | 2 | Director General | Administrativo/Contable, Night Auditor | en boutiques chicos, puede ser también el Administrativo |
| Operativo contable | Administrativo / Contable | Administrativo / Contable | Accountant / Finance Clerk | 4 | CFO | — | en hoteles chicos, puede hacer las funciones del Night Auditor diurno |
| Turno especial | Auditor Nocturno | Auditor Nocturno | Night Auditor | 4 | Jefe de Recepción (turno) + CFO (funciones contables) | — | en hoteles medianos es el recepcionista de turno noche con rol extendido; en grandes puede ser rol dedicado |

**Variantes por tamaño de hotel:**
- **Boutique chico (<40 habs):** Admin-CFO lo cubre 1 persona (el dueño o un administrativo externo). Night Audit lo hace el recepcionista de noche. Contabilidad tercerizada a gestoría.
- **Urbano 4* mediano (80-150 habs) — target primario Bravas:** CFO + 1-2 Administrativos/Contables. Night Auditor dedicado (o recepcionista senior entrenado). Integración con ERP externo (Holded ES / A3 AR alternativa).
- **Resort/5*:** Director of Finance + Controller + Accountants + Night Audit dedicado por turno. Puede haber sub-roles de Tesorería y de Cuentas por Pagar/Cobrar separados.

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | sí | Facturas y recibos de la estancia; link de pago; comprobante de cargo |
| Portal Operativo del sector | sí | Pantalla del Administrativo: tareas del día, inbox facturas proveedores, herramientas Holded/Santander/Verifactu |
| Portal Supervisor/Jefe | sí | Dashboard CFO: cash widget, KPIs financieros, conciliación bancaria, centros de coste, compliance deadlines, inbox para aprobar facturas y pagos |
| Portal Dirección | sí | Revenue report diario, budget vs actual, GOP margin, estado de caja, alertas de compliance fiscal |
| **GX inbox (dual-fire)** | sí | Cargo erróneo detectado en folio → copia al inbox de GX para seguimiento de satisfacción del huésped; pago fallido → GX notificado para contacto proactivo |
| Portal Contador Externo (M10) | sí | Portal propio del contador/contadora: acceso de solo lectura + edición config fiscal + aprobación de recibos. Ver §5 función #37 y §10. |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Apertura de cuenta corriente del huésped (folio) | Al hacer check-in, el sistema crea automáticamente un folio (cuenta corriente abierta) para el huésped donde se irán acumulando todos los cargos de la estancia | Sistema / Recepción | FO + Admin | check-in confirmado | por estancia | core | no |
| 2 | Posting de cargos en folio | Registrar en el folio del huésped cada cargo generado durante la estancia: habitación por noche, consumos F&B, spa, minibar, lavandería, llamadas telefónicas, daños | Recepción / Sistema automático | Operativo Admin | automático por noche + manual para extras | continua | core | sí (cargo incorrecto → GX) |
| 3 | Cierre de folio y emisión de factura | Al check-out, cerrar el folio, presentar el detalle al huésped, procesar el pago y emitir factura electrónica conforme a la normativa del país | Recepción / CFO | FO + Admin | check-out | por estancia | core | no |
| 4 | Emisión de factura electrónica (ES — Verifactu) | Generación de factura conforme a la Ley Verifactu 2026 (sistema antifraude ES). Incluye hash de integridad, envío a sistema Verifactu, almacenamiento en libro de registro. Factura simplificada vs completa según importe y cliente | Sistema / CFO | Admin (CFO) | check-out o petición expresa | por operación | core (ES) | no |
| 5 | Emisión de factura electrónica (AR — AFIP WSFE) | Generación de factura tipo A/B/C a través del Web Service de Facturación Electrónica de AFIP. Incluye CAE (Código de Autorización Electrónica), fecha de vencimiento CAE, QR de factura. Tipos: factura A (IVA RI), B (consumidor final o exento), C (monotributistas) | Sistema / CFO | Admin (CFO) | check-out o petición expresa | por operación | core (AR) | no |
| 6 | Emisión de nota de débito / crédito | Generar nota de débito (cargo adicional posterior) o nota de crédito (descuento/devolución) sobre una factura emitida. En AR requiere AFIP WSFE; en ES requiere Verifactu | CFO / Administrativo | Admin | manual o por reclamación | eventual | core | sí (crédito a huésped → GX) |
| 7 | Cobro de estancia — tarjeta / transferencia / efectivo | Registrar el pago del huésped en cualquier medio: tarjeta (TPV físico o pasarela web Redsys/Stripe), transferencia bancaria, efectivo | Recepción / Sistema | FO + Admin | check-out o prepago | por estancia | core | no |
| 8 | Control y cuadre de caja chica | Gestión del fondo fijo de caja chica para gastos menores del hotel. Arqueo periódico (diario o semanal), registro de salidas, reposición de fondo. Alerta si diferencia supera umbral configurable | Administrativo / CFO | Operativo Admin | arqueo manual | diaria/semanal | core | no |
| 9 | Cierre del día contable (Night Audit) | Función central del Night Auditor: (1) verificar que todos los folios abiertos tengan la tarifa correcta aplicada; (2) aplicar posting automático de cargos de habitación (room charge) por la noche; (3) balancear el día contable (ingresos = cobros); (4) generar el reporte diario de gestión (Daily Report): ocupación, ADR, RevPAR, ingresos por departamento; (5) cerrar el día en el PMS; (6) iniciar el nuevo día hotelero | Night Auditor | Operativo Admin + Portal Dirección | automático a hora configurable (default 23:59) + control manual Night Auditor | diaria | core | no |
| 10 | Generación del Daily Report (Informe Diario) | Reporte consolidado del día: habitaciones vendidas, ocupación %, ADR, RevPAR, ingresos por departamento (rooms, F&B, otros), nº de huéspedes, nacionalidades, canales de venta. Se genera automáticamente tras el cierre del Night Audit y se envía al Director y al CFO | Sistema | Portal Dirección + Admin | post Night Audit | diaria | core | no |
| 11 | Conciliación bancaria | Cruzar los movimientos de la cuenta bancaria del hotel con los registros contables del PMS. Identificar cobros no registrados, pagos duplicados, comisiones bancarias. En ES integrado con PSD2/Open Banking (Santander, BBVA, CaixaBank). En AR integrado con BCRA homebanking (BBVA, Galicia, Santander) | CFO / Administrativo | Admin (CFO) | manual diario + automático si tiene Open Banking | diaria | core | no |
| 12 | Gestión de cuentas por cobrar (AR — Accounts Receivable) | Control de folios de crédito (empresas, agencias, grupos que pagan a 30/60 días). Seguimiento de vencimientos, envío de recordatorios, gestión de cobros. Integración con módulo Comercial para contratos de empresa | CFO / Administrativo | Admin | manual + alertas automáticas por vencimiento | continua | core | no |
| 13 | Gestión de cuentas por pagar (AP — Accounts Payable) | Registro, aprobación y pago de facturas de proveedores (alimentos, bebidas, suministros, servicios). Flujo de aprobación configurable: Administrativo ingresa → CFO aprueba → pago ejecutado. Gestión de vencimientos y descuentos por pronto pago | CFO / Administrativo | Admin | recepción de factura proveedor | continua | core | no |
| 14 | Matching factura proveedor vs orden de compra | Cruzar la factura del proveedor con la orden de compra emitida desde Economato. Tres vías: automático si el proveedor envía factura electrónica compatible; semi-automático con OCR del PDF; manual. Alerta si precio facturado difiere de la orden | Sistema / Administrativo | Admin | recepción factura | por factura | importante | no |
| 15 | Pago a proveedor (transferencia SEPA / BCRA) | Ejecutar el pago a proveedor vía transferencia bancaria. En ES: SEPA o transferencia nacional. En AR: transferencia CBU/CVU por homebanking o desde plataforma bancaria integrada. Registro del pago en el libro de pagos y actualización de la AP | CFO | Admin (CFO) | aprobación de factura + fecha vencimiento | por pago | core | no |
| 16 | Control de cheques diferidos (AR) | En Argentina es común pagar a proveedores con cheques diferidos (a 30/60/90 días). Registro de cheques emitidos, control de vencimientos, gestión de rechazos y endosos | CFO / Administrativo | Admin | manual | eventual (AR-only) | core (AR) | no |
| 17 | Costeo de servicios y análisis CMV | Calcular el Costo de Mercadería Vendida (CMV) por departamento (principalmente F&B y Economato). En AR se usa el término CMV; en ES "costo de las ventas". Integración con Economato para el costo de los ingredientes. Alerta si CMV supera umbral (Food Cost > 30% es señal de alerta) | CFO | Admin (CFO) | mensual o por cierre de período | mensual | core | no |
| 18 | Gestión de centros de coste | Asignar cada gasto a su departamento (centro de coste): Rooms, F&B, Cocina, Mantenimiento, Admin, RRHH, Comercial, Housekeeping. Permite ver la rentabilidad real de cada sector. Alerta si un departamento supera su presupuesto | Sistema / CFO | Admin + Portal Dirección | automático + ajuste manual | continua | core | no |
| 19 | Gestión de presupuesto (Budget) | Cargar el presupuesto anual o mensual por departamento y línea de ingreso/gasto. Seguimiento Budget vs Actual en tiempo real. Generación de informe de desviaciones | CFO | Admin (CFO) + Portal Dirección | manual al inicio del período | mensual/anual | core | no |
| 20 | Revenue Report diario | Reporte específico de ingresos del día por categoría: habitaciones (revenue rooms), F&B (desayuno, restaurante, bar, room service), otros (spa, lavandería, teléfono, cargos varios). Enviado automáticamente al Director y al CFO tras el Night Audit | Sistema | Portal Dirección + Admin | post Night Audit | diaria | core | no |
| 21 | Cierre mensual contable | Al final de cada mes: (1) cerrar todos los libros del período; (2) calcular amortizaciones; (3) generar el P&L mensual (cuenta de resultados); (4) preparar el balance; (5) preparar las declaraciones fiscales del período | CFO | Admin (CFO) | fin de mes | mensual | core | no |
| 22 | Declaración IVA — modelo 303 (ES) | Preparar y presentar el modelo 303 (declaración trimestral de IVA). IVA soportado (facturas proveedores) vs IVA repercutido (facturas emitidas). En hostelería: IVA al 10% para alojamiento y restauración (reducido), 21% para actividades accesorias. Integración con Holded o exportación para A-asesor | CFO | Admin (CFO) | trimestral (abril, julio, octubre, enero) | trimestral (ES) | core (ES) | no |
| 23 | Declaración resumen anual IVA — modelo 390 (ES) | Resumen anual de las declaraciones trimestrales de IVA (modelo 303). Cierre del ejercicio fiscal | CFO | Admin (CFO) | enero del año siguiente | anual (ES) | core (ES) | no |
| 24 | Declaración operaciones intracomunitarias — modelo 349 (ES) | Si el hotel tiene proveedores o clientes en la UE con NIF intracomunitario | CFO | Admin (CFO) | trimestral si supera umbral | trimestral (ES) | importante (ES) | no |
| 25 | Declaración anual operaciones terceros — modelo 347 (ES) | Declarar todas las operaciones con proveedores/clientes que superen 3.005,06 € en el año | CFO | Admin (CFO) | febrero | anual (ES) | importante (ES) | no |
| 26 | Declaración retenciones IRPF trabajadores — modelo 111 / 190 (ES) | Modelo 111 (declaración trimestral de retenciones IRPF de trabajadores). Modelo 190 (resumen anual). Integrado con módulo RRHH para las bases de retención de cada empleado | CFO / RRHH | Admin (CFO) | trimestral (111) + enero (190) | trimestral + anual (ES) | core (ES) | no |
| 27 | Impuesto de Sociedades — modelo 200 (ES) | Declaración anual del Impuesto de Sociedades. Requiere el P&L anual y los ajustes fiscales | CFO / Asesoría fiscal | Admin (CFO) | julio del año siguiente | anual (ES) | core (ES) | no |
| 28 | Declaración IVA — AFIP AR | Presentación mensual de IVA en Argentina. IVA crédito fiscal (facturas compra) vs IVA débito fiscal (facturas venta). Alícuotas: 21% general, 10,5% reducida (algunos servicios de alojamiento según resolución), 27% servicios de telecomunicaciones | CFO | Admin (CFO) | mensual | mensual (AR) | core (AR) | no |
| 29 | Ingresos Brutos (IIBB) por provincia — AR | Declaración y pago mensual de IIBB en cada provincia donde el hotel opera. Alícuota variable por provincia (ej: CABA 3%, PBA 3,5%, Córdoba 3%). Convenio multilateral si opera en más de una jurisdicción. Es uno de los impuestos más complejos del sistema tributario AR | CFO | Admin (CFO) | mensual | mensual (AR) | core (AR) | no |
| 30 | Retenciones impositivas AR (Ganancias, IVA, SUSS) | El hotel puede ser agente de retención. Gestión de retenciones practicadas a proveedores (Ganancias Res. General AFIP, retención IVA, retención SUSS). Generación de constancias de retención | CFO / Administrativo | Admin | por pago a proveedor | por operación (AR) | core (AR) | no |
| 31 | F931 — Declaración de aportes patronales (AR) | Declaración mensual de aportes y contribuciones patronales ante AFIP (Sistema de Aportes y Contribuciones). Integrado con RRHH para la base de aportes de cada empleado. Componentes: jubilación SIPA (11% trabajador + 23,5% empleador), obra social OSECAC en gastronomía, ART | CFO / RRHH | Admin (CFO) | mensual (antes del 7/10/13 según terminación CUIT) | mensual (AR) | core (AR) | no |
| 32 | Generación y envío de recibos de sueldo digitales (AR) | Generación de recibos de sueldo en formato digital conforme al Decreto 407/2026 (recibo digital) y normas ART. Envío por email/portal al empleado. Firma digital del empleador | CFO / RRHH | Admin (CFO) | fin de mes tras cierre nómina | mensual (AR) | core (AR) | no |
| 33 | Gestión del período contable (financial_period) | Apertura y cierre formal de períodos contables (mes, trimestre, año). Control de que no se puedan modificar asientos de períodos cerrados. Gestión de ajustes de cierre | CFO | Admin (CFO) | manual | mensual | core | no |
| 34 | Gestión de libro de facturas (registro de facturas ES) | Libro de registro de facturas emitidas y recibidas según obligación fiscal española. Integrado con Verifactu. Exportación para Holded / A3 | CFO | Admin (CFO) | automático por cada factura | continua (ES) | core (ES) | no |
| 35 | Control y aprobación de gastos de caja menor departamental | Los jefes de departamento solicitan reembolso de gastos menores (taxi, compra urgente, propina de proveedor). CFO revisa y aprueba antes de registrar el gasto | CFO | Admin (CFO) | solicitud de jefe de departamento | eventual | importante | no |
| 36 | Preparación de informe para dirección (Management Report) | Informe financiero mensual para el Director General y el propietario del hotel: P&L, cash flow, desviaciones presupuestarias, ranking de costos, proyección. Puede exportarse a PDF o presentarse en el portal de dirección | CFO | Portal Dirección + Admin | fin de mes | mensual | core | no |
| 37 | Portal del Contador Externo (M10) | Portal separado para el contador/contadora externo/a. Permite: ver y exportar asientos, editar la configuración fiscal del tenant (códigos impositivos, alícuotas, cuentas contables), aprobar recibos de sueldo antes del envío, ver el libro de facturas. Es lectura + edición fiscal sin poder tocar operativa hotelera | Contador externo | Portal Contador (M10) | acceso permanente | continua | importante | no |
| 38 | Integración con ERP externo — Holded (ES) | Sincronización automática (outbound) de asientos contables, facturas emitidas/recibidas, pagos y cobros hacia Holded. Holded actúa como la contabilidad oficial del hotel en ES. Reconciliación periódica. Configuración de plan de cuentas según Holded | CFO / Sistema | Admin + integraciones | automático post-cierre + manual si se pide resync | continua (ES) | importante (ES) | no |
| 39 | Integración con ERP externo — A3 / Contabilium (AR) | Sincronización de movimientos contables hacia A3 (alternativa en AR) o Contabilium. Exportación de asientos en formato compatible. En AR el hotel puede también usar Tango Gestión u otro ERP local | CFO / Sistema | Admin + integraciones | automático o exportación manual | continua (AR, opcional) | importante (AR) | no |
| 40 | Alerta de vencimiento de obligaciones fiscales | El sistema mantiene un calendario fiscal per-tenant (ES: 303 trimestral, 111 trimestral, 390 anual, 347 anual, 200 anual; AR: IVA mensual, IIBB mensual, F931 mensual, Ganancias anual). Alerta configurable con X días de anticipación. Visible en el dashboard del CFO | Sistema | Admin (CFO) + Portal Dirección | automático por calendario | continua | core | no |
| 41 | Gestión de tarjetas virtuales y límites de gasto | Si el hotel usa tarjetas virtuales por departamento (ej: HK con límite €500/mes para suministros de limpieza), gestión de los límites, alertas de uso, reconciliación con el extracto | CFO | Admin (CFO) | automático + manual | continua | importante | no |
| 42 | Análisis de rentabilidad por canal de venta | Cruzar ingresos (rooms revenue por canal: web directa, Booking.com, Expedia, grupos, empresa) con el costo de adquisición (comisión OTA, coste de la agencia). Permite saber qué canal es más rentable. Integrado con módulo Comercial | CFO | Admin (CFO) + Portal Dirección | mensual o bajo demanda | mensual | importante | no |
| 43 | Gestión de seguros del hotel | Registro de pólizas vigentes (Responsabilidad Civil, incendio, robo, rotura de maquinaria, empleados). Alertas de vencimiento. Registro de siniestros si aplica | CFO | Admin (CFO) | manual + alertas automáticas | anual/eventual | importante | no |

### Sub-flujos clave (pseudocódigo simple)

```
Función: "Cierre del día hotelero — Night Audit"
1. Night Auditor accede al portal (turno noche, típicamente 23:30-01:00)
2. Sistema verifica que todos los folios abiertos tienen tarifa de habitación asignada
3. Sistema ejecuta "room charge posting": aplica cargo de habitación (precio × noche) a cada folio abierto
4. Night Auditor revisa la lista de discrepancias (habitaciones ocupadas sin folio, cargos pendientes)
5. Night Auditor resuelve discrepancias manualmente (asocia cargos huérfanos, corrige tarifas)
6. Sistema ejecuta "balanceo del día": verifica que ingresos = cobros + folios abiertos (cuentas por cobrar)
7. Si el balance cierra → Sistema genera el Daily Report (ocupación, ADR, RevPAR, ingresos por dept)
8. Sistema cierra el día contable (período del día)
9. Sistema abre el nuevo día hotelero (fecha +1 en PMS)
10. Night Auditor firma digitalmente el cierre del día
11. Sistema envía el Daily Report automáticamente por email al Director y al CFO
12. Sistema notifica al portal del CFO: "Cierre del día X completado a las HH:MM"
```

```
Función: "Emisión de factura y cobro al check-out (ES con Verifactu)"
1. Recepcionista inicia el proceso de check-out del huésped
2. Sistema muestra el folio completo con todos los cargos desglosados
3. Huésped confirma cargos (o solicita ajuste → flujo de nota de crédito paralelo)
4. Sistema genera factura en formato Verifactu: aplica IVA 10% alojamiento + 10% restauración + 21% accesorios
5. Sistema calcula el hash de integridad de la factura (requisito Verifactu)
6. Sistema envía la factura al registro central Verifactu (AEAT)
7. AEAT devuelve confirmación (o error) → sistema registra en libro de facturas
8. Sistema presenta la factura al huésped (PDF, email, QR)
9. Recepcionista procesa el cobro: TPV / pasarela web / efectivo / transferencia
10. Sistema cierra el folio (estado "COBRADO")
11. Pago registrado en contabilidad → actualiza AR y el cash del día
```

```
Función: "Emisión de factura AR — AFIP WSFE"
1. CFO o sistema inicia la factura (manual o automático post-checkout)
2. Sistema determina tipo de comprobante: A (RI), B (consumidor final/exento), C (monotributo)
3. Sistema construye el JSON del comprobante con los campos requeridos por AFIP WSFE
4. Sistema llama al Web Service de AFIP (FECompTotXRequest → FECAESolicitar)
5. AFIP devuelve CAE y fecha de vencimiento CAE (o error AFIP → flujo de error)
6. Sistema genera la factura con CAE, QR, barras AFIP y todos los datos legales
7. Sistema almacena la factura y el CAE en el libro de facturas
8. Sistema entrega la factura al huésped (PDF, email)
9. Folio se cierra como "FACTURADO"
```

```
Función: "Gestión de cuentas por pagar — AP Workflow"
1. Proveedor entrega factura (física, PDF o electrónica)
2. Administrativo ingresa la factura al sistema (o se importa automáticamente si el proveedor manda e-factura)
3. Sistema cruza contra la orden de compra de Economato (3-way match: OC + recepción + factura)
4. Si match OK → factura pasa al estado PENDIENTE DE APROBACIÓN; si no match → alerta al Jefe de Economato
5. CFO recibe la factura en su inbox con los datos: proveedor, importe, vencimiento, departamento, OC asociada
6. CFO aprueba (o rechaza con comentario)
7. Si aprobada → sistema genera la transferencia/cheque diferido
8. CFO ejecuta el pago desde el portal (integrado con banco vía PSD2 en ES / homebanking API en AR)
9. Sistema registra el pago, actualiza la AP y el libro de pagos
10. Sistema genera retenciones impositivas si el proveedor las requiere (AR)
```

```
Función: "Cierre mensual y declaración fiscal (ES)"
1. CFO cierra el período mensual el último día hábil del mes
2. Sistema bloquea nuevas modificaciones en el período cerrado
3. Sistema genera el P&L del mes: ingresos por línea − costos por línea = resultado
4. CFO revisa y valida el P&L (correcciones → ajustes de período previo)
5. Sistema prepara borrador del modelo 303 (IVA trimestral si es mes de cierre de trimestre): IVA soportado − IVA repercutido = resultado a ingresar/devolver
6. CFO revisa el borrador 303, lo valida y lo exporta a Holded (o lo presenta directamente vía AEAT si tiene certificado digital)
7. Si es mes con modelo 111 (retenciones): sistema prepara el 111 con datos de RRHH (retenciones IRPF trabajadores + honorarios profesionales)
8. CFO firma los modelos y los presenta
9. Sistema registra la presentación y actualiza el calendario fiscal (próximo vencimiento)
10. CFO genera el Management Report del mes y lo publica en el portal de dirección
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `financial_period` | sí | no | id, organization_id, type (day/month/year), start_date, end_date, status (open/closed/audited), closed_by, closed_at | custom_fields JSONB | → `ledger_entry` (todos los asientos del período) |
| `ledger_entry` | sí | no | id, organization_id, period_id, date, account_code, description, debit, credit, source (folio/invoice/payroll/manual), source_id, created_by | custom_fields JSONB | → `financial_period`, → `folio`, → `invoice`, → `payroll` |
| `folio` | sí | consumer de `guest` y `room` | id, organization_id, guest_id, room_id, reservation_id, open_date, close_date, status (open/closed/invoiced/cancelled), total_charges, total_payments, balance, currency | custom_fields JSONB | → `guest`, → `room`, → `folio_item`, → `invoice`, → `payment` |
| `folio_item` | sí | no | id, folio_id, posting_date, type (room_charge/fb/spa/misc/tax), description, amount, tax_rate, department, source, posted_by | custom_fields JSONB | → `folio` |
| `invoice` | sí | no | id, organization_id, folio_id (si está asociado), invoice_type (A/B/C en AR, simplificada/completa en ES), issue_date, due_date, customer_name, customer_tax_id, items JSONB, subtotal, tax_amount, total, currency, status (draft/issued/paid/cancelled), cae (AR), cae_due_date (AR), verifactu_hash (ES), verifactu_status (ES) | custom_fields JSONB | → `folio`, → `payment`, → `ledger_entry` |
| `payment` | sí | no | id, organization_id, folio_id, invoice_id, payment_date, method (card/transfer/cash/check), amount, currency, reference, status (pending/confirmed/failed/refunded), processed_by | custom_fields JSONB | → `folio`, → `invoice` |
| `supplier_invoice` | sí | no | id, organization_id, supplier_id, po_id (orden de compra), invoice_number, issue_date, due_date, items JSONB, subtotal, tax_amount, total, currency, status (pending/approved/paid/disputed), payment_id, approved_by | custom_fields JSONB | → `supplier`, → `purchase_order`, → `payment`, → `ledger_entry` |
| `bank_reconciliation` | sí | no | id, organization_id, period_id, bank_account, statement_date, statement_balance, book_balance, matched_items JSONB, unmatched_items JSONB, status (pending/matched/reviewed), reviewed_by | custom_fields JSONB | → `financial_period` |
| `cost_center` | sí | consumer de sectores | id, organization_id, code, name, department_code, budget_amount, actual_amount, period_id | custom_fields JSONB | → `ledger_entry`, → `financial_period` |
| `budget` | sí | no | id, organization_id, period_id, cost_center_id, revenue_line, budget_amount, actual_amount, variance, variance_pct | custom_fields JSONB | → `cost_center`, → `financial_period` |
| `fiscal_obligation` | sí | no | id, organization_id, country (ES/AR), model_code (303/390/347/349/111/190/200/IVA-AR/IIBB/F931), due_date, status (pending/filed/overdue), filed_at, filed_by, notes | custom_fields JSONB | → `financial_period` |
| `tax_withholding` | sí | no | id, organization_id, supplier_invoice_id (AR), type (ganancias/IVA/SUSS), rate, base_amount, withheld_amount, certificate_number | custom_fields JSONB | → `supplier_invoice` (AR) |

**Diagrama ER simplificado:**

```
financial_period ───< ledger_entry
       │
       ├──< budget ──> cost_center
       │
       └──< bank_reconciliation

folio ──────────────< folio_item
  │                    (room charge, F&B, spa, etc.)
  │
  ├──> guest (consumer)
  ├──> room (consumer)
  └──> reservation (consumer)
  │
  ├──< invoice ──< payment
  │
  └──< ledger_entry

supplier_invoice ──> supplier
     │           ──> purchase_order (consumer de Economato)
     │
     └──< payment ──< tax_withholding (AR)
```

---

## 7. Máquinas de estado

```
folio:
  OPEN ──checkout_iniciado──> PENDING_INVOICE
  PENDING_INVOICE ──factura_emitida──> INVOICED
  INVOICED ──pago_completo──> CLOSED
  INVOICED ──pago_parcial──> PARTIAL
  PARTIAL ──pago_completado──> CLOSED
  OPEN ──cancelacion_reserva──> CANCELLED
  CLOSED ──nota_credito──> REOPENED_NC (abre nota de crédito, no reabre el folio)

Transiciones autorizadas por rol:
- Sistema: OPEN → PENDING_INVOICE (automático en checkout)
- Recepción: OPEN → OPEN (agrega folio_items)
- CFO/Sistema: PENDING_INVOICE → INVOICED (emisión factura)
- Sistema/Recepción: INVOICED → CLOSED (pago completo)
- CFO: cualquier estado → CANCELLED (con auditoría)

financial_period:
  OPEN ──night_audit_cierra_dia──> DAY_CLOSED
  DAY_CLOSED ──ultimo_dia_mes──> MONTH_CLOSING
  MONTH_CLOSING ──cfr_valida──> MONTH_CLOSED
  MONTH_CLOSED ──cierre_año──> YEAR_CLOSED

  Regla: una vez MONTH_CLOSED no se pueden crear ledger_entry en ese período.
  Solo el CFO puede reabrirlo (con registro de auditoría).

supplier_invoice:
  DRAFT ──ingreso_admin──> PENDING_APPROVAL
  PENDING_APPROVAL ──cfr_aprueba──> APPROVED
  APPROVED ──pago_ejecutado──> PAID
  PENDING_APPROVAL ──cfr_rechaza──> REJECTED
  APPROVED ──disputa_proveedor──> DISPUTED
  DISPUTED ──resuelto──> APPROVED (vuelve al flujo normal)

invoice (factura al huésped):
  DRAFT ──verifactu/afip_ok──> ISSUED
  ISSUED ──pago_confirmado──> PAID
  ISSUED ──plazo_vencido──> OVERDUE
  ISSUED ──anulacion__cfr──> CANCELLED (con nota de crédito obligatoria)
  DRAFT ──error_ws──> ERROR (requiere corrección y reintento)
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| **Verifactu (AEAT)** | Facturación antifraude ES (Ley 2026) | outbound | Obligatoria (ES) | Envío de hash + factura al sistema central AEAT. Sin esto la factura ES no tiene validez legal desde 2026. |
| **AFIP WSFE** | Facturación electrónica AR | outbound (request/response) | Obligatoria (AR) | Web Service FECompTotXRequest para obtener CAE. Requiere certificado digital AFIP del contribuyente. |
| **AFIP WSSS (Sistema SUSS)** | Declaración aportes patronales F931 | outbound | Obligatoria (AR) | Se presenta vía SICOSS (Sistema de Cálculo de Obligaciones de Seguridad Social) o su sucesor. Integrado con RRHH. |
| **Holded** | ERP contabilidad (Opción A — ES) | bidireccional | Recomendada (ES) | Sincronización de asientos, facturas y pagos. Holded es el libro mayor oficial del hotel en ES. |
| **A3 / Contabilium** | ERP contabilidad (AR alternativa) | bidireccional | Opcional (AR) | Exportación de asientos en formato compatible. Muchas gestorías AR usan A3 o Tango. |
| **Factorial / Bizneo** | Nóminas (ES, Opción A) | outbound | Recomendada (ES) | Datos de nómina generados en RRHH → sync a Factorial para liquidación. Factorial devuelve los recibos. Ver módulo HR. |
| **Santander / BBVA / CaixaBank PSD2** | Open Banking — conciliación bancaria (ES) | inbound | Opcional (ES) | Acceso a movimientos bancarios vía PSD2 para conciliación automática. Requiere autorización del banco. |
| **BCRA / Homebanking API (AR)** | Movimientos bancarios AR | inbound | Opcional (AR) | Galicia, BBVA, Santander AR tienen APIs limitadas. Puede ser exportación de extracto manual. |
| **Redsys / Bizum** | Pasarela de pago (ES) | bidireccional | Obligatoria si acepta tarjeta online (ES) | Para cobros de huéspedes por web y/o TPV integrado. |
| **Stripe / Mercadopago (AR)** | Pasarela de pago (AR) | bidireccional | Opcional (AR) | Para cobros online. Mercadopago es el standard de mercado en AR. |
| **GX Event Bus** | Event bus interno | bidireccional | Core | Publica eventos: `folio.charged`, `invoice.issued`, `payment.failed` → GX inbox. |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Apertura y gestión de folios | ✓ | | | | Lógica idéntica en AR y ES |
| Posting de cargos en folio | ✓ | | | | Idéntico |
| Cierre del día — Night Audit | ✓ | | | | Idéntico |
| Daily Report | ✓ | | | | Idéntico |
| Conciliación bancaria | ✓ | | | | La integración bancaria varía (PSD2 ES vs homebanking AR) pero la lógica es la misma |
| Cuentas por cobrar / pagar | ✓ | | | | Idéntico; la denominación "factura" vs "comprobante" varía |
| Emisión de factura electrónica | | | | ✓ | AR: AFIP WSFE + CAE + tipos A/B/C. ES: Verifactu + hash AEAT + factura simplificada/completa |
| IVA — alícuota y declaración | | | | ✓ | AR: 21% general / 10,5% reducido / 27% telecom. ES: 10% hostelería y restauración / 21% accesorios |
| Ingresos Brutos (IIBB) | | ✓ | | | Solo AR. Por provincia. Convenio multilateral. No tiene equivalente en ES |
| Retenciones impositivas (Ganancias/IVA/SUSS) | | ✓ | | | Solo AR. Agente de retención según condición fiscal del proveedor |
| F931 (aportes patronales AFIP) | | ✓ | | | Solo AR. Presentación mensual. Integrado con RRHH. |
| Recibo de sueldo digital (Decreto 407/2026) | | ✓ | | | Solo AR. Pendiente resolución final sobre formato y firma. |
| Cheques diferidos | | ✓ | | | Práctica muy común en AR. No relevante en ES. |
| Modelo 303 / 390 (IVA ES) | | | ✓ | | Solo ES. Trimestral (303) + resumen anual (390). |
| Modelo 111 / 190 (retenciones IRPF ES) | | | ✓ | | Solo ES. Trimestral (111) + resumen anual (190). Integrado con RRHH. |
| Modelo 200 (IS ES) | | | ✓ | | Solo ES. Impuesto de Sociedades anual. |
| Modelo 347 / 349 (ES) | | | ✓ | | Solo ES. 347 = operaciones con terceros. 349 = intracomunitario. |
| Verifactu — sistema antifraude | | | ✓ | | Ley 2026 ES. Obligatorio. Sin equivalente directo en AR (AFIP WSFE cumple rol similar). |
| Libro de registro de facturas (ES) | | | ✓ | | Obligación legal ES. Integrado con Verifactu. |
| Integración Holded | | | ✓ | | Opción A ES. En AR se usa A3 o exportación manual. |
| Integración AFIP sistemas | | ✓ | | | WSFE, WSSS, SICOSS. Solo AR. |
| CMV (Costo de Mercadería Vendida) | | ✓ | | | Terminología AR. En ES se llama "costo de las ventas" o "coste de ventas". Lógica idéntica. |
| Nota de débito/crédito | ✓ | | | | Existe en ambos. En AR requiere WSFE. En ES requiere Verifactu. Nombre y proceso similar. |
| Pasarela de pagos | | | | ✓ | AR: Mercadopago / Redsys muy limitado. ES: Redsys / Bizum / Stripe. |
| Open Banking conciliación | | | | ✓ | ES: PSD2 con bancos grandes. AR: APIs bancarias más limitadas; puede ser manual. |
| Gestión de cheques | | ✓ | | | AR: cheques diferidos comunes. ES: casi no se usan cheques; transferencia SEPA es el standard. |
| Budget vs actual | ✓ | | | | Idéntico |
| Centros de coste | ✓ | | | | Idéntico |
| Portal contador externo (M10) | ✓ | | | | Funciona en ambos; el contador ve las pantallas adaptadas a su país |

**Notas críticas §9:**

> **AR — IIBB es el impuesto más complejo del módulo.** Cada provincia tiene alícuota propia y categorías propias. Un hotel en Capital Federal + provincia de Buenos Aires ya tiene 2 jurisdicciones. Si pertenece a cadena multi-provincia: Convenio Multilateral (distribución de base por jurisdicción). Recomendación arquitectónica: configurar las alícuotas por provincia en la tabla `fiscal_config` del tenant, no hardcodear. El Bravas no calcula el CM automáticamente en v1 — exporta los datos y el contador lo hace en su software (Errepar, Bejerman, etc.).

> **ES — Verifactu es obligatorio desde 2026.** El sistema antifraude de la AEAT exige que toda factura tenga un hash de integridad generado por el software de facturación y se reporte al registro central. Sin integración Verifactu, el hotel NO puede emitir facturas legalmente en ES. Esta integración es **bloqueante para el go-live en España**.

> **ES — IVA hostelería:** El tipo reducido del 10% aplica a servicios de alojamiento y restauración. Los servicios "accesorios" (lavandería, llamadas, aparcamiento, spa, minibar — depende de interpretación AEAT) van al 21%. El sistema debe permitir configurar la alícuota por tipo de folio_item, no aplicar un único tipo a toda la factura.

---

## 10. Slots de extensión (crítico para N2 + multi-tenant)

### 10.1 Campos custom por entidad

```
folio.custom_fields: JSONB
  → cada tenant puede agregar: "motivo_visita", "empresa_factura", "observaciones_factura"

invoice.custom_fields: JSONB
  → cada tenant puede agregar: "referencia_cliente", "condicion_pago", "datos_obra"

supplier_invoice.custom_fields: JSONB
  → cada tenant puede agregar: "nro_expediente_compras", "contrato_marco_id"

ledger_entry.custom_fields: JSONB
  → cada tenant puede agregar: "proyecto_id", "nro_expediente"
```

### 10.2 Workflows custom

Hooks disponibles:
- `pre_night_audit` — tenant puede agregar validaciones extra antes del cierre del día (ej: verificar que todos los minibar están registrados)
- `post_night_audit` — tenant puede disparar envío de Daily Report a email personalizado o integración BI propia
- `pre_invoice_issue` — tenant puede agregar campos requeridos en la factura (ej: "referencia del cliente corporativo") antes de emitir
- `post_invoice_issue` — tenant puede enviar la factura a un sistema externo adicional
- `post_payment_confirmed` — tenant puede disparar agradecimiento por email, encuesta satisfacción (dual-fire GX)
- `pre_ap_payment` — tenant puede requerir segunda firma para pagos > umbral configurable

### 10.3 Integraciones per-tenant

Proveedores de contabilidad activables:
- Holded (default ES)
- A3 (AR alternativa)
- Contabilium (AR)
- Sage (ES)
- Tango Gestión (AR)
- Exportación CSV/JSON genérica (para cualquier ERP)

Pasarelas de pago activables:
- Redsys (ES)
- Bizum (ES)
- Stripe (global)
- Mercadopago (AR)
- TPV físico integrado (Ingenico, VeriFone — via Redsys ES / Prisma AR)

Bancos para conciliación bancaria:
- Santander ES (PSD2)
- BBVA ES (PSD2)
- CaixaBank ES (PSD2)
- Santander AR (API homebanking)
- Galicia AR
- BBVA AR
- Exportación de extracto manual (OFX/CSV — fallback universal)

### 10.4 Branding/UI per-tenant

- Logo del hotel en facturas y recibos
- Cabecera de factura personalizada (dirección, CUIT/CIF, teléfono, email)
- Colores del módulo Admin-CFO (default: `--lib-finance: #047857`)
- Nomenclatura: "CFO" vs "Director Financiero" vs "Gerente Administrativo" — customizable
- Pie de factura con texto personalizable (ej: "Gracias por elegir Hotel X")

### 10.5 Idiomas

- Diccionario i18n del módulo con 3 locales: es-ES, es-AR, en
- Tenant puede sobrescribir strings específicos (ej: "Recibo" → "Comprobante de pago")

---

## 11. Nomenclatura i18n (tabla de términos del sector)

| Término técnico | es-ES default | es-AR default | en default | Customizable por tenant |
|---|---|---|---|---|
| `cfo` | "Director Financiero" | "Gerente Administrativo-Financiero" | "CFO / Director of Finance" | ✓ |
| `accountant` | "Contable" | "Administrativo/Contable" | "Accountant" | ✓ |
| `night_auditor` | "Auditor Nocturno" | "Auditor Nocturno" | "Night Auditor" | ✓ |
| `folio` | "Cuenta de huésped" | "Cuenta corriente de huésped" | "Guest Folio" | ✓ |
| `invoice` | "Factura" | "Comprobante / Factura" | "Invoice" | ✓ |
| `invoice_simplified` | "Factura simplificada" | N/A (no existe en AR) | "Simplified Invoice" | no |
| `invoice_type_A` | N/A | "Factura A" (IVA RI) | "Invoice Type A" | no |
| `invoice_type_B` | N/A | "Factura B" (consumidor final) | "Invoice Type B" | no |
| `accounts_receivable` | "Cuentas por cobrar" | "Cuentas a cobrar" | "Accounts Receivable (AR)" | ✓ |
| `accounts_payable` | "Cuentas por pagar" | "Cuentas a pagar" | "Accounts Payable (AP)" | ✓ |
| `night_audit_close` | "Cierre nocturno" | "Cierre del día" | "Night Audit Close" | ✓ |
| `daily_report` | "Informe Diario" | "Reporte Diario" | "Daily Report" | ✓ |
| `food_cost` | "Coste de Alimentación" | "CMV Alimentos" | "Food Cost" | ✓ |
| `budget_variance` | "Desviación presupuestaria" | "Desvío presupuestario" | "Budget Variance" | ✓ |
| `vat` | "IVA" | "IVA" | "VAT" | no |
| `income_tax_withholding` | "Retención IRPF" | "Retención Ganancias" | "Income Tax Withholding" | no |
| `social_security_contributions` | "Cotizaciones Seguridad Social" | "Aportes y Contribuciones (AFIP F931)" | "Payroll Taxes" | no |
| `gross_revenues_tax` | N/A | "Ingresos Brutos (IIBB)" | "Gross Revenues Tax" | no |
| `electronic_invoice_code` | "Código Verifactu" | "CAE (AFIP)" | "Electronic Invoice Code" | no |
| `bank_reconciliation` | "Conciliación bancaria" | "Conciliación bancaria" | "Bank Reconciliation" | ✓ |
| `petty_cash` | "Caja chica" | "Caja chica" | "Petty Cash" | ✓ |
| `deferred_check` | N/A | "Cheque diferido" | "Deferred Check" | no |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| **Ley antifraude fiscal / Verifactu (Real Decreto-ley 2024/2025, vigente 2026)** | ES | Toda factura emitida debe incluir hash de integridad y ser reportada al registro central AEAT. Obligatorio para software de facturación desde 2026. Bloqueante para go-live ES. |
| **IVA — Ley 37/1992 y modificaciones** | ES | Obligación de aplicar el tipo correcto (10% hostelería/restauración, 21% accesorios). Presentación modelos 303/390. |
| **IRPF — retenciones trabajadores y profesionales** | ES | Modelos 111 (trimestral) y 190 (anual). El hotel es retenedor. Integrado con HR. |
| **Impuesto de Sociedades — Ley 27/2014** | ES | Modelo 200 anual. El hotel (como S.L. o S.A.) tributa por sus beneficios. |
| **Modelo 347 — operaciones con terceros** | ES | Obligatorio si alguna operación con un tercero supera 3.005,06 €/año. Hoteles siempre lo tienen con sus proveedores principales. |
| **IVA — Ley 23.349 (AR)** | AR | Alícuota general 21%, reducida 10,5%, diferencial 27%. El hotel puede ser Responsable Inscripto (RI) o Exento. Presentación mensual. |
| **Ingresos Brutos (IIBB) — Código Fiscal Provincias** | AR | Impuesto provincial. Alícuota por provincia. Convenio Multilateral si opera en más de una provincia. Presentación mensual por jurisdicción. |
| **Ganancias — Ley 20.628 y modificaciones (AR)** | AR | Retenciones sobre pagos a proveedores (según Resolución General AFIP vigente). Declaración anual (si el hotel es S.A. o S.R.L.). |
| **AFIP WSFE — Resolución General 2485/08 y modificaciones** | AR | Obliga a emitir facturas electrónicas. El hotel debe tener clave fiscal AFIP y certificado digital para usar el WSFE. Bloqueante para go-live AR. |
| **AFIP F931 — SIJP/SIPA/SUSS** | AR | Declaración mensual de aportes patronales. Vencimiento según terminación del CUIT (días 7, 10, 13 del mes siguiente). |
| **Decreto 407/2026 — Recibo digital (AR)** | AR | Obligatoriedad del recibo de sueldo digital con firma digital. Vigente desde 2026 (pendiente resolución complementaria sobre formato). |
| **RGPD / Reglamento 2016/679** | UE/ES | Los datos financieros del huésped (métodos de pago, historial de facturas) son datos personales protegidos. Retención máxima 5 años fiscales, luego anonimizar. |
| **Ley 25.326 de Protección de Datos (AR)** | AR | Equivalente AR del RGPD. Datos financieros del huésped requieren consentimiento y custodia. |
| **PCI DSS** | Global | Si el sistema almacena o transmite datos de tarjetas de crédito, debe cumplir PCI DSS. Recomendación: tokenización via pasarela certificada (Redsys/Stripe/Mercadopago) — el sistema Bravas no almacena PANs. |
| **Normativa contable NIC/NIIF (ES)** | ES | Para hoteles que consoliden con grupo internacional o coticen. No obligatorio para PYME hotelera. |
| **Plan General Contable (PGC) — Real Decreto 1514/2007** | ES | Marco contable para empresas españolas. Holded implementa el PGC. El plan de cuentas del módulo Admin-CFO debe ser compatible. |

---

## 13. Dependencias del lifecycle del módulo

**Qué pasa si el módulo se ACTIVA después del hotel ya corriendo:**
- Datos iniciales requeridos (seed): plan de cuentas contable del tenant, configuración fiscal del país (alícuotas IVA, configuración AFIP/Verifactu), datos bancarios para conciliación, centros de coste de cada departamento activo.
- Flujo de setup inicial: wizard de onboarding fiscal del CFO → (1) seleccionar país, (2) ingresar CUIT/CIF, (3) configurar plan de cuentas, (4) activar/desactivar integraciones externas, (5) activar Portal Contador si se quiere.
- Si el hotel ya tenía folios en el sistema (desde Front Office), el módulo retroactivamente crea ledger_entries dummy para los folios anteriores con estado "legacy" para no romper la contabilidad histórica.

**Qué pasa si el módulo se DESACTIVA:**
- Los datos financieros (facturas, folios, asientos) NO se pueden eliminar. Son documentos legales con obligación de conservación (5 años fiscal ES, 10 años AR para facturas).
- Datos que quedan huérfanos: `ledger_entry`, `invoice`, `folio`, `supplier_invoice` quedan en modo solo lectura.
- Otros módulos afectados: Front Office (no puede emitir facturas), RRHH (no puede procesar nóminas), Economato (no puede pagar proveedores). En la práctica, Admin-CFO no se puede desactivar si el hotel está operando. Solo se desactivaría si el hotel cierra.
- Procedimiento de archivo: exportar toda la información a CSV/PDF + exportar a Holded/A3 antes de desactivar.

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| **GOP Margin (Gross Operating Profit %)** | (Revenue total − Costos operativos totales) / Revenue total × 100 | Mensual | Portal Dirección + Admin CFO | >30% hotel 4* urbano. >35% resort. <20% = alerta. |
| **RevPAR** | Revenue Rooms / Habitaciones disponibles | Diaria | Portal Dirección | Variable por mercado. CABA: ~$80-120 USD. Madrid urbano: €80-130. |
| **ADR (Average Daily Rate)** | Revenue Rooms / Habitaciones vendidas | Diaria | Portal Dirección | Derivado de la estrategia de pricing (módulo Comercial) |
| **Food Cost %** | CMV Alimentos / Revenue F&B × 100 | Mensual | Admin CFO + Portal Dirección | Benchmark: 28-35%. >35% = revisar proveedores/escandallo. |
| **Cierre del día — tiempo** | Hora de finalización del Night Audit − hora de inicio | Diaria | Admin (CFO) | Target: completar antes de las 06:00 AM. >06:30 = revisar proceso. |
| **Days Sales Outstanding (DSO)** | (Cuentas por cobrar / Revenue) × días del período | Mensual | Admin CFO | Benchmark: <15 días. >30 días = problema de cobro. |
| **Days Payable Outstanding (DPO)** | (Cuentas por pagar / CMV total) × días del período | Mensual | Admin CFO | 30-45 días es saludable. <15 días = se paga muy rápido (oportunidad de mejora). |
| **Budget Variance %** | (Actual − Budget) / Budget × 100 | Mensual | Admin CFO + Portal Dirección | ±5% = normal. >±10% = requiere explicación. |
| **Cash disponible** | Suma de saldos de cuentas bancarias + caja | Diaria | Admin CFO | Debe cubrir al menos 30 días de gastos operativos |
| **Obligaciones fiscales vencidas** | Nº de obligaciones fiscales en estado OVERDUE | Continua | Admin CFO | Target: 0. Cualquier vencido = alerta roja. |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol que la ve | Función principal | Mockup existente |
|---|---|---|---|---|
| `/admin-cfo/dashboard` | Supervisor/Jefe | CFO | Dashboard principal: cash widget navy, 4 KPIs (GOP, RevPAR, Food Cost, DSO), compliance deadlines fiscal, chat con director, inbox facturas pendientes | sí — `mockup/v2.5/empleado-jefe-admin.html` |
| `/admin-cfo/folio/:id` | Supervisor/Jefe + Operativo | CFO, Administrativo, Recepción | Detalle de folio del huésped: listado de items, estado, botón emitir factura | no |
| `/admin-cfo/folios` | Supervisor/Jefe | CFO | Lista de folios abiertos y cerrados del día/semana/mes | no |
| `/admin-cfo/facturas/emitidas` | Supervisor/Jefe | CFO | Libro de facturas emitidas con estado Verifactu/AFIP | no |
| `/admin-cfo/facturas/proveedores` | Supervisor/Jefe + Operativo | CFO, Administrativo | Inbox AP: facturas a aprobar, aprobadas, pagadas | sí — `mockup/v2.5/empleado-jefe-admin.html` (sección) |
| `/admin-cfo/operativo` | Operativo | Administrativo | Pantalla del Administrativo: tareas del día, herramientas rápidas (Holded, Santander, Verifactu), reporte de cierre a CFO | sí — `mockup/v2.5/empleado-admin.html` |
| `/admin-cfo/night-audit` | Operativo (turno noche) | Night Auditor | Panel de Night Audit: lista de tareas de cierre, posting de cargos, balanceo, firma del cierre | no |
| `/admin-cfo/conciliacion-bancaria` | Supervisor/Jefe | CFO | Conciliación bancaria: movimientos del banco vs registro interno, matched/unmatched | sí — `mockup/v2.5/empleado-jefe-admin.html` (sección) |
| `/admin-cfo/centros-coste` | Supervisor/Jefe | CFO | Centros de coste por departamento: budget vs actual, desvíos | sí — `mockup/v2.5/empleado-jefe-admin.html` (sección) |
| `/admin-cfo/presupuesto` | Supervisor/Jefe | CFO | Gestión de presupuesto: carga, seguimiento, análisis de desviaciones | no |
| `/admin-cfo/cierres` | Supervisor/Jefe | CFO | Historial de cierres diarios y mensuales. Botón para abrir/cerrar períodos | no |
| `/admin-cfo/fiscal` | Supervisor/Jefe | CFO | Calendario de obligaciones fiscales: próximos vencimientos, estado de cada declaración | no |
| `/admin-cfo/reportes/daily` | Supervisor/Jefe + Dirección | CFO, Director | Daily Report: último cierre con ocupación, ADR, RevPAR, ingresos por dept | no |
| `/admin-cfo/reportes/management` | Supervisor/Jefe + Dirección | CFO, Director | Management Report mensual: P&L, cash flow, presupuesto vs real | no |
| `/admin-cfo/configuracion-fiscal` | Portal Contador (M10) | Contador externo | Configurar plan de cuentas, alícuotas, integración con ERP externo | no |
| `/admin-cfo/contador` | Portal Contador (M10) | Contador externo | Portal del contador: asientos, facturas, aprobación de recibos | no |

---

## 16. Riesgos conocidos y preguntas abiertas

- **Riesgo 1 — Verifactu bloqueante en ES:** La integración con el sistema Verifactu de AEAT es obligatoria desde 2026 y sin ella el hotel no puede facturar legalmente en España. Este riesgo bloquea el go-live ES. Plan de mitigación: usar un proveedor de middleware certificado Verifactu (ej: Holded ya tiene integración Verifactu certificada — si el hotel usa Holded como ERP, se puede delegar la firma Verifactu a Holded y Bravas sincroniza vía API).

- **Riesgo 2 — Complejidad IIBB en AR:** Ingresos Brutos provincial es el impuesto más complejo del sistema tributario AR para un multi-tenant. Si el sistema Bravas calcula automáticamente IIBB para todos los tenants AR, puede cometer errores costosos (el hotel termina pagando más o menos de lo que debe). Plan de mitigación (v1): Bravas **no calcula** el IIBB automáticamente. Exporta los datos al contador externo vía M10. El cálculo queda en el contador. En v2 se puede agregar un motor de IIBB como feature premium.

- **Riesgo 3 — Certificado digital AFIP:** Para usar el WSFE de AFIP, el hotel necesita un certificado digital instalado en el servidor que firma los requests. Esto es un proceso manual por tenant. No se puede automatizar completamente. Plan de mitigación: el flujo de onboarding incluye una sección de "Configurar AFIP" con instrucciones paso a paso + soporte Bravas para la primera configuración.

- **Riesgo 4 — Formato de recibo de sueldo digital AR (Decreto 407/2026):** El Decreto 407/2026 de recibo digital no tiene resolución complementaria final al momento de redactar este catálogo. El formato exacto puede cambiar. Plan de mitigación: implementar como campo flexible; cuando salga la resolución final, actualizar el template de recibo sin romper datos históricos.

- **Pregunta abierta 1 — ¿El Night Auditor es un rol del módulo Admin-CFO o del módulo Front-Office?** Hoy está en ambos: depende del hotel. En hoteles medianos es un recepcionista que hace funciones contables. Para el sistema, el Night Auditor necesita permisos tanto de Recepción (acceso a folios) como de Admin-CFO (cierre del día contable). Propuesta: role con `permissions: ['front-office.folio.view', 'admin-cfo.night-audit.execute']`. Decisión: arquitecto.

- **Pregunta abierta 2 — ¿Bravas calcula IIBB automáticamente desde v1 o exporta y deja al contador?** Tiene impacto directo en la complejidad del módulo. Ver Riesgo 2. Decisión: Daniel.

- **Pregunta abierta 3 — ¿El módulo Admin-CFO soporta multi-moneda?** Para hoteles AR que cobran en dólares (práctica común en Buenos Aires). Implica tipo de cambio, contabilización en moneda funcional (ARS) y moneda transaccional (USD). Agrega complejidad. Decisión: Daniel (posiblemente feature de v2).

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación inicial del catálogo Admin-CFO (v1.0). 43 funciones, 12 entidades, mapa geo AR+ES completo, 15 pantallas | bravas |
