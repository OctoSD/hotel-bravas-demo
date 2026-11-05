# Investigación: Flexxus Hoteles

**Fecha:** 2026-10-31
**Rol:** bravas
**URL base:** https://flexxus.com.ar/software-programa-de-gestion-para-hoteles/
**Investigador:** subagente general-purpose

## 1. Overview

**Flexxus** es una empresa argentina de software con más de 20 años de trayectoria y 5.000+ clientes en el país. Comenzó como ERP generalista para PyMEs y creció cubriendo 23 verticales (minorista, manufactura, agroindustria, construcción, droguerías, hotelería, etc.). Hotelería es uno de sus verticales — no su core, pero sí donde reportan **+100 implementaciones** (Howard Johnson, Wyndham Nordelta, Pulitzer BA, Savoy, Eleton Resort Spa, La Cantera Jungle Lodge, Hotel Saint George, Hotel Provincial Sierra de la Ventana, etc.).

**Lectura clave para Bravas:** Flexxus **NO es un PMS** en sentido estricto. Es un **ERP contable/administrativo con módulo hotelero** que se **integra a PMSs externos** (confirmado por su integración documentada con MiniHotel PMS). El PMS "real" (grilla de habitaciones, channel manager, motor de reservas) lo pone un tercero; Flexxus toma el feed de reservas confirmadas y las convierte en facturas, cuenta corriente, cash flow, impuestos, centros de costo. Esto los posiciona más como *back office hotelero* que como *front office*.

Comercialmente, dos líneas:
- **Order Gestión** (PyME, cloud/web): planes Starter $43.699, Pro $50.660, Advanced $57.621 ARS/mes/usuario (2026).
- **Flexxus Enterprise** (medianas/grandes, modelo híbrido desktop/web): cotización personalizada. Módulo hotelero específico desde ~$22.500 ARS/mes en configuración básica (dato referido).

Tienen oficinas en Buenos Aires, Córdoba, Rosario, Mendoza y San Luis. Soporte 100% argentino, teléfono 0810. **Importante:** la única reseña independiente verificada (ComparaSoftware, 1/5★) describe soporte deficiente y UX compleja — contraste con el marketing que dice "la interfaz más amigable del mercado".

## 2. Arquitectura y módulos

### Qué es específico de hotelería (muy poco)
El vertical hotelero NO tiene módulos exclusivos. Reutiliza el ERP configurado con:
- **Centros de costos** para separar rentabilidad por unidad (restaurante, spa, salón de eventos, habitaciones).
- **Conciliación automática de tarjetas** vía archivo TXT del adquirente (crítico en hoteles donde el 90% cobra con tarjeta).
- **Integración con PMS externos** (ejemplo documentado: MiniHotel). El PMS maneja la grilla; Flexxus recibe las reservas confirmadas y las convierte en comprobantes.
- **Facturación electrónica ARCA/AFIP** para emitir factura A/B/C en el check-out, incluyendo consumos extra (bar, minibar, lavandería).
- **Cash flow** con proyección — vendido como "crítico para hoteles con estacionalidad".

### Módulos horizontales del ERP (25+)
Facturación, Ventas, Compras, Stock, Bancos, Cajas, Cuenta Corriente, Contabilidad, Cash Flow, Centros de Costo, Tareas Internas, Business Intelligence (Power BI), CRM (SuiteCRM OEM), Sueldos y Jornales, Producción, Importaciones, Logística/Reparto, RMA/Reparaciones, Gestión ISO, Presupuesto Contable, Fidelización, Garantías Extendidas, Facturación Masiva, Financiación Propia, API Integraciones, Factura Electrónica.

### Apps complementarias
- **App POS** (Android/iOS nativa) para punto de venta — usable en bar/restaurante del hotel.
- **App Fuerza de Ventas (Viajantes)** — poco relevante para hotel.
- **Plataforma Web para Clientes** (portal autogestión).
- **SabIA** — asistente conversacional con IA para lectura automática de comprobantes.

### Lo que NO tiene Flexxus (y SÍ un PMS hotelero real)
- Grilla de habitaciones (room rack / tape chart).
- Channel manager propio (Booking/Expedia/Airbnb).
- Motor de reservas web embebido.
- Tarifas dinámicas / revenue management / BAR / yield.
- Web check-in / self check-in / firma digital del huésped.
- App del huésped (keyless, pedidos a cuarto, mensajería).
- Housekeeping móvil tipo "limpiadora toca el botón verde en el celu".
- F&B integrado profesional (POS restaurante con cuentas de mesa, propinas, divisores).
- KPIs hoteleros estándar (RevPAR, ADR, ocupación, pickup, length of stay).

**Conclusión arquitectónica:** Flexxus llena el back office. Para una suite hotelera profesional hace falta un PMS adelante. Esto es el *mapa* que te ayuda a definir dónde queremos jugar con Bravas.

## 3. UX/UI observado

### Dos productos, dos UIs distintas
Flexxus tiene **dos realidades visuales** mezcladas en el marketing:

**(a) Flexxus Enterprise (producto estrella, legacy desktop/híbrido)**
- Arquitectura **cliente/servidor estilo Windows tradicional**, con cliente nativo (hay un instalador llamado "cliente-de-flexxus-enterprise"). Flexxus 4.0 (release reciente) describe explícitamente:
  - "Menús en blanco con íconos en negro, **diseño inspirado en Office**".
  - **Menú lateral colapsable** izquierdo.
  - **Visor de pantallas** que permite "minimizar/maximizar ventanas individuales o en lote" → confirma paradigma **MDI (Multiple Document Interface)**, muy windows-like, no SPA web moderna.
  - **Grillas con filtros laterales** (panel izquierdo vertical), agrupamiento dinámico por clic en columna → mentalidad planilla/Excel/DevExpress.
  - **Buscador de pantallas** con creación de accesos directos → delata que hay *tantas pantallas* que hace falta buscador para encontrarlas (señal de densidad alta y curva de aprendizaje empinada).
  - **Panel de notificaciones con burbujas rojas** mostrando pendientes.
  - **Barra de botones de acciones unificada** por ventana.
  - Config por usuario: color de empresa, menú por defecto al login, íconos personalizados.

**(b) Order Gestión (PyME, cloud/web real)**
- SaaS web multi-dispositivo (compu/notebook/tablet/celu).
- UI más moderna y plana, orientada a usuario no técnico.
- Precios públicos tipo SaaS por usuario/mes.

### Paleta observada en el sitio corporativo
- **Primario:** azul navy corporativo (tono "ERP serio").
- **Acento:** rojo/naranja en el logo y en algunos CTAs; verde/teal como acento "Potenciado con IA".
- **Fondos:** blanco predominante, grises muy claros para alternar secciones.
- **Tipografía:** sans-serif moderna sin personalidad fuerte (Helvetica/Arial-like, posiblemente Open Sans o Inter).
- **Densidad:** marketing es espacioso y moderno; **el producto Enterprise es denso** (típico ERP, muchas columnas por fila, filtros, grids).

### Patrones de UI que usan
- **Grids/tablas de datos** como centro de todo (al estilo ERP: SAP B1, Tango, Bejerman).
- **Formularios con muchos campos agrupados en tabs/pestañas** dentro de ventana modal o pantalla completa.
- **Árboles de navegación / categorizaciones jerárquicas** (súper rubro → rubro → subrubro).
- **Reportes exportables** a múltiples formatos ("Salidas One Click" — Excel, PDF, TXT).
- **Dashboards BI** sobre Power BI (gráficos de barra, torta, tendencia, filtros interactivos).

### Veredicto estético
Flexxus Enterprise es **ERP argentino tradicional vestido con lavado de cara "Office 365-like"**. No es Linear, no es Notion, no es Lightspeed. Es **Tango Gestión del 2023**. Útil para contrastar: nos dice **cómo NO se verá Bravas**. Nuestra oportunidad es *cloud-modern-first*, pensado mobile para operaciones (limpieza, cocina) y desktop pulido para admin.

## 4. Features destacables (top 15)

Ordenadas de más a menos útiles para pensar Bravas:

1. **Centros de costos por unidad de negocio** — ver rentabilidad separada de habitaciones vs. bar vs. spa vs. salón.
2. **Facturación electrónica ARCA/AFIP** integrada (A/B/C automático en check-out).
3. **Cash flow con proyección a futuro** y drill-down de bancos/cajas/cheques/CC con un clic. Vendido como killer-feature para operación estacional.
4. **Conciliación automática con tarjetas de crédito** vía archivo TXT del adquirente — ahorra días/mes a administración.
5. **Balance general mensual con comparativa** sin esperar al cierre contable.
6. **Business Intelligence sobre Power BI** con 15+ dashboards pre-armados, filtros cruzados, alertas por umbrales.
7. **Multimoneda** nativa (relevante LATAM con inflación/USD).
8. **Multisucursal** consolidado — útil para cadenas o complejos con unidades independientes.
9. **Integración con PMSs externos** (MiniHotel, otros) vía API/conectores — reconocen que no son el PMS.
10. **App POS móvil nativa** para operaciones de venta (bar/restaurante).
11. **CRM integrado** (SuiteCRM) con historial de clientes/huéspedes.
12. **Alertas proactivas** (gestor de alertas) y gestor de tareas internas.
13. **Lectura automática de comprobantes con IA** (SabIA) — captura de facturas de proveedores por foto.
14. **Portal web para clientes** (plataforma de autogestión).
15. **Soporte argentino con horario local y 5 oficinas físicas** — diferencial fuerte vs. SaaS gringo con soporte en inglés.

## 5. Target, pricing y diferenciadores

### Target
- **PyMEs argentinas** y empresas medianas tradicionales. Para hoteles: 3-4★ familiares, cadenas regionales, aparts, lodges, complejos de cabañas, resorts. **No** apunta a hoteles de lujo con stack internacional (Opera, Mews).
- Perfil típico: hotel con **administración central argentina**, factura con CUIT, cumple AFIP, usa tarjeta como medio de cobro dominante, tiene restaurante/spa/eventos como unidades extras de negocio, tiene estacionalidad (temporada alta/baja).
- Decisor: contador o gerente administrativo-financiero (no gerente de operaciones ni GM del hotel). Esto explica mucho el DNA del producto.

### Pricing
- **Order Gestión**: Starter $43.699 / Pro $50.660 / Advanced $57.621 ARS/mes/usuario. Hoy (oct 2026) ≈ USD 35-50/usuario/mes al cambio oficial.
- **Enterprise módulo hotelero**: desde ~$22.500 ARS/mes (configuración básica referida). Cotización personalizada el resto. Modelo pseudo-licencia + mantenimiento + implementación cobrada aparte.
- Reseña negativa reporta **cobros adicionales por cada personalización** — modelo "cada ajuste se factura", típico de ERP argentino tradicional.

### Diferenciadores (según su marketing)
- "+20 años de trayectoria, +5.000 clientes" (prueba social).
- "100% argentino" — desarrollo y soporte local.
- "+100 implementaciones hoteleras" (barrera de credibilidad en el nicho).
- Compliance AFIP/ARCA actualizado automáticamente.
- SabIA (IA conversacional) — intento de modernización.
- Oficinas físicas en 5 provincias.

### Diferenciadores reales que detectamos (no de marketing)
- Fuerte en back office financiero y cumplimiento fiscal argentino.
- Ecosistema amplio (POS, viajantes, eCommerce) para empresas multi-canal.
- Débil en operaciones de hotelería real (sin PMS front, sin app huésped, sin housekeeping móvil moderno).

## 6. Compliance (Argentina/LATAM — útil para España?)

### Lo que cubre bien (Argentina)
- **ARCA / ex-AFIP**: facturación electrónica A, B, C integrada. Normas se actualizan automáticamente.
- **IVA, percepciones y retenciones** argentinas.
- **Libros contables, balance general, estado de resultados**.
- **Multimoneda** (ARS + USD, útil ante inflación).
- **Sueldos y Jornales** argentinos (bono, aguinaldo, cargas sociales).
- **Conciliación bancaria y de tarjetas** en pesos.

### Lo que NO cubre
- No se mencionan integraciones con México (SAT/CFDI), Chile (SII), Colombia (DIAN), Perú (SUNAT), Brasil (NFe), ni España (AEAT/Verifactu/TicketBAI/SII).
- Idioma **sólo español rioplatense** — el UX está pensado para Argentina.

### ¿Útil para España?
**Poco directo, pero conceptualmente útil.** Flexxus demuestra el patrón "ERP vertical PyME latino" que es exactamente lo que podría encajar en el perfil PyME hotelera española (3-4★ independiente, 20-80 habitaciones, dueño/familia como administración). España tiene **Verifactu** (obligatorio para 2026-2027), **TicketBAI** en País Vasco, régimen de IVA diferenciado para hostelería y pernoctación, requisitos del INE (parte de viajero), partes a Policía (Mossos/Guardia Civil) y recientemente el Real Decreto que exige transmisión digital de datos de huéspedes a Interior. **Nada de esto cubre Flexxus**, pero el *patrón mental* ("ERP vertical PyME con cumplimiento fiscal nativo") es replicable con compliance español.

**Takeaway para Bravas:** Si vamos España, los módulos de compliance críticos son: Verifactu, parte de viajero al Ministerio del Interior (SES.HOSPEDAJES), IVA reducido 10% hostelería, factura simplificada vs completa, impuesto estancias turísticas por CCAA (ej. ITIBI Cataluña, Baleares, Valencia).

## 7. Recomendaciones para HOTEL BRAVAS (corto plazo)

### Arquitectura v2 (lo que SÍ copiamos de Flexxus)
- **Separación por centros de negocio** desde el día cero: habitaciones, F&B, spa, eventos. Que la demo muestre KPI y P&L por unidad.
- **Portales por rol** bien delimitados (ya lo tenés en F1). Confirmá: Huésped / Limpieza / Cocina+Salón / Admin. Agregá eventualmente Recepción como portal propio aunque hoy conviva con Admin.
- **Dashboard admin con cash flow proyectado** — es la killer feature financiera. En hoteles con estacionalidad vale oro.
- **Multi-propiedad / multi-sucursal** en el modelo de datos aunque la demo F1 muestre un solo hotel. Flexxus lo hace y es diferencial.

### Lo que NO copiamos (de Flexxus)
- UI densa estilo ERP Office — fuera. Bravas v2 tiene que ser **cloud-modern, flat, con mobile-first para operaciones** (housekeeping y cocina en celu, no en Windows).
- Modelo "cliente desktop + lavado web" — fuera. Bravas v2 es **web nativa + PWA + apps móviles** (al menos iOS/Android responsive).
- Paleta azul navy corporativa genérica — ya la tienen 500 ERPs. Bravas puede diferenciarse con una paleta **cálida y hospitality-forward** (ver abajo).

### UX/UI v2 — propuesta concreta
**Paleta sugerida (hospitality 3-4★ serio):**
- Primario: un **verde oscuro bosque** `#1F3A2E` o un **terracota profundo** `#8B3A3A` — tonos "hospitality boutique", no startup bebé.
- Neutros: **marfil cálido** `#FAF7F2` como fondo (no blanco frío), grises cálidos para separadores.
- Acentos: **mostaza suave** `#C9A961` o **cobre** `#B87333` para CTAs y estados.
- Semánticos: verde `#2D7A4F`, ámbar `#C97A1C`, rojo `#B23A3A` (atenuados, no fluor).

**Tipografía:**
- Títulos: **serif humanista** (Fraunces, Source Serif, Freight Text) para transmitir hospitalidad establecida — contrasta con el sans de todos los ERPs.
- Cuerpo y UI: **sans-serif legible** (Inter, Instrument Sans o DM Sans).
- Esta dupla serif + sans es el patrón de hoteles de marca (Standard, Soho House, Ace).

**Densidad:**
- Admin: densidad media-alta (tablas con filtros, pero con padding generoso — más Linear que SAP).
- Limpieza/Cocina: densidad baja, tipografía grande, botones grandes dedo-gordo, mínimo texto, iconografía clara. Esto es un **tablet/móvil a 2 metros** que la limpiadora mira entre pisos — no una pantalla a 40 cm.
- Huésped: densidad baja, foto-first, mobile-first — más próximo a Airbnb/Hopper que a un ERP.

**Patrones:**
- **Timeline rack / tape chart de habitaciones** horizontal con drag-to-move reservas (lo que Flexxus NO tiene y es la base del PMS).
- **Kanban housekeeping** por estado de habitación (sucia → en limpieza → inspección → lista) en móvil.
- **Comanda cocina con tickets grandes tipo KDS** (Kitchen Display System), estados de preparación.
- **Portal huésped con 3-4 acciones máximo**: ver reserva, pedir servicio, check-out express, chat/mensajería.

**Features top 5 para v2 (priorizadas):**
1. Rack de habitaciones + check-in/out con factura electrónica (SIN esto no es PMS).
2. Housekeeping móvil con estado por habitación y foto de incidencias.
3. Portal huésped con web check-in previo y pedidos.
4. KDS cocina + comanda digital.
5. Dashboard admin con RevPAR/ADR/ocupación + cash flow.

### Qué contar en el pitch vs. Flexxus
- Nosotros somos **front + back integrado**, no back solo.
- Nosotros somos **cloud nativo + mobile-first**, no desktop maquillado.
- Nosotros hablamos **hospitality** (ADR, RevPAR, pickup), no sólo contabilidad.
- Compliance España cubierto nativo (Verifactu, parte viajero) — no un add-on.

## 8. Recomendaciones SaaS hotelero standalone (largo plazo)

### Estructura canónica de una suite hotelera vertical completa
Pensando en Bravas como SaaS a 3-5 años, el stack hotelero profesional se divide en **7 capas**. Marco de dónde juega Flexxus para contraste:

| Capa | Qué incluye | Flexxus | Oportunidad Bravas |
|---|---|---|---|
| 1. **Guest-facing** | Web, motor de reservas directo, app huésped, web check-in, mensajería, upsell pre-stay | NO tiene | Diferenciador fuerte |
| 2. **PMS core** | Rack, reservas, check-in/out, cuentas de habitación, tarjeta en archivo | NO tiene | Base indispensable |
| 3. **Channel manager** | Sync con Booking/Expedia/Airbnb/Hotelbeds, paridad tarifaria | NO tiene | Alta prioridad |
| 4. **Revenue management** | Tarifas dinámicas, BAR, forecast, pickup, pricing automatizado por IA | NO tiene | Diferenciador premium |
| 5. **Operations** | Housekeeping, mantenimiento, F&B/KDS, spa, eventos, inventario | Parcial (POS, inventario genérico) | Oportunidad grande, mobile-first |
| 6. **Back office** | Facturación, contabilidad, RRHH, compras, cash flow, BI | SÍ (su core) | Replicable, no diferenciador |
| 7. **Integraciones** | APIs, OTA, pasarelas pago, puertas inteligentes, telefonía, Wi-Fi marketing, CRM | Parcial (eCommerce, pago, SuiteCRM) | Debe ser API-first |

### Modelo de datos canónico mínimo
Entidades centrales que cualquier SaaS hotelero vertical debe tener desde el día uno:
- **Property** (hotel/propiedad), con jerarquía para cadenas/multi-propiedad.
- **Room** y **RoomType** (habitación física y categoría tarifaria).
- **RatePlan** (plan tarifario) con reglas: BAR, no-reembolsable, incluye desayuno, estancia mínima.
- **Reservation** con estados (tentativa, confirmada, in-house, checked-out, no-show, cancelada) y **Folio** (cuenta financiera de la reserva, separable).
- **Guest** con historial multi-reserva, documento, nacionalidad (crítico para parte viajero).
- **Charge** (cargo) atomizado — habitación, F&B, extras, impuestos — todo ligable a folio.
- **Payment** con medio (tarjeta/efectivo/transferencia/voucher OTA).
- **HousekeepingTask** y **MaintenanceTicket** con asignación a staff.
- **Order** (pedido F&B/spa/room service) con items y envío a KDS.
- **StaffMember** con rol multi-portal, idioma, turnos.

### Decisiones arquitectónicas largas
- **Multi-tenant desde día uno** (una base, aislamiento por property_id). Flexxus parece ser single-tenant/instalación — nos abre carril de escalabilidad.
- **API-first con webhooks** — todas las integraciones (channel, pagos, cerraduras, telefonía) usan la misma superficie pública.
- **Event sourcing** o al menos **audit log inmutable** por folio — compliance fiscal + disputas con huéspedes.
- **i18n/l10n fuerte** — compliance por país es modular (Verifactu España, SAT México, AFIP Argentina) como plugins intercambiables, NO hardcodeado como hace Flexxus.
- **Mobile-first SDK** separado para operaciones (housekeeping/cocina) — plataforma dedicada, no una tabla responsive.
- **BI embebido** (Metabase/Cube/propio) con KPIs hoteleros estándar: ocupación, ADR, RevPAR, GOPPAR, length of stay, pickup, pace.

### Pricing modelo SaaS hotelero
Flexxus cobra por usuario/mes + implementación. El estándar hotelero moderno (Mews, Cloudbeds, SiteMinder) es **por habitación/mes**. Para Bravas standalone:
- Modelo PMS: EUR/hab/mes (6-12 EUR/hab/mes es rango competitivo España PyME 3-4★).
- Add-ons: channel manager, revenue, app huésped, F&B, spa — módulos activables.
- Comisión 0 sobre reservas directas (diferenciador vs. OTAs 15-25%).

### Posicionamiento competitivo largo
Mapa competitivo que importa para Bravas:
- **Enterprise global**: Oracle Opera, Mews, Cloudbeds, Agilysys. Mucho dinero, UX mejorando, no PyME-friendly.
- **PyME España**: TesiPro, Noray, Dingus, Avirato. UX de 2010, muy locales.
- **PyME LATAM**: Flexxus, PxSol, MiniHotel, CQR, Zeus. ERP-céntricos, operación floja.
- **Nativo cloud moderno**: Mews (líder claro), Little Hotelier, RoomRaccoon, Hostaway (para short-term).

**Posición Bravas:** *cloud-modern como Mews, operacionalmente mobile-first (nuestra ventaja), con pricing PyME España/LATAM*. El hueco donde ningún jugador está fuerte: hotel 3-4★ familiar/independiente en España, 20-80 habitaciones, con dueño/GM que quiere **todo en un sólo sitio** y staff que opera desde el móvil.

---

## Fuentes
- https://flexxus.com.ar/software-programa-de-gestion-para-hoteles/
- https://flexxus.com.ar/
- https://flexxus.com.ar/software-de-gestion-erp/
- https://flexxus.com.ar/solucion-para-pymes/
- https://flexxus.com.ar/te-presentamos-flexxus-4-0/
- https://flexxus.com.ar/flexxus-enterprise-3-17-ya-esta-disponible/
- https://flexxus.com.ar/software-de-gestion-para-hoteles-claves-crecer/
- https://flexxus.com.ar/clientes/
- https://flexxus.com.ar/business-intelligence/
- https://flexxus.com.ar/integraciones/
- https://minihotel.io/es/integracion/flexxus/
- https://www.comparasoftware.com.ar/flexxus-enterprise
