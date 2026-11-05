# Investigación: PxSol

**Fecha:** 2026-10-31
**Rol:** bravas
**URL base:** https://www.pxsol.com/es/
**Investigador:** subagente general-purpose

## 1. Overview

**PxSol** es un ecosistema SaaS hotelero argentino fundado en 2009, con sede en **Mendoza**. Opera en 19+ países de LATAM (Argentina, Chile, Colombia, México, Perú, Uruguay, Paraguay) con **1.800+ alojamientos activos**. Su posicionamiento es claro: **"software all-in-one"** para hoteles pymes de LATAM, con el pitch de centralizar operación en una sola base de datos y maximizar ingresos directos reduciendo dependencia de OTAs.

- **Modelo:** modular (podés contratar solo PMS o el combo completo), mensual, sin setup fee, sin permanencia, **15 días de prueba gratis sin tarjeta**.
- **Facturación local:** cobra en moneda local (ARS, CLP, COP, MXN, UYU, PEN, PYG) — diferenciador fuerte contra Cloudbeds/Mews que facturan en USD.
- **Target explícito:** hoteles independientes, apart-hoteles, cabañas, posadas, cadenas chicas y alquileres temporarios.
- **Rating público:** 4.9/5 en Capterra/SoftwareFinder (base chica, mayoría positivas); 100% positivo en reviews públicos pero con quejas recurrentes sobre tiempos de soporte por email.

**Lo que importa para Bravas:** PxSol es el competidor LATAM más maduro y, con las piezas de IA, factura electrónica nativa y pagos locales, es la vara contra la que vamos a ser comparados si vendemos en Argentina.

---

## 2. Arquitectura y módulos

Ecosistema completo, cada módulo contratable por separado. Rutas canónicas bajo `/producto/<modulo>`:

| Módulo | Función |
|---|---|
| **PMS** (`/pms-para-hoteles`) | Core operativo: reservas, recepción, housekeeping, administración, reportes |
| **Motor de Reservas** (`/motor-de-reservas-hoteles`) | Booking engine white-label multi-idioma/multi-moneda, con comparador vs OTAs |
| **Channel Manager** (`/channel-manager-hoteles`) | 200+ canales OTA/B2B sincronizados |
| **CRM** (`/crm-hoteles`) | Perfil 360, segmentación, email marketing, automatizaciones |
| **RMS** (`/rms-para-hoteles`) | Pricing dinámico con **AI Agent** que propone tarifa diaria |
| **POS** (`/pos-para-hoteles`) | Restaurant/bar/spa/room service con KDS, cargo a habitación, factura fiscal |
| **ERP** (`/erp-para-hoteles`) | Compras, inventario, contabilidad, cuentas, cash flow |
| **GDS** (`/gds`) | Sabre, Amadeus, OLA |
| **Pxsol B2B** (`/pxsol-b2b`) | Portal mayorista propio para agencias |
| **Pxsol Pay** (`/soluciones-de-pago`) | Checkout integrado: MercadoPago, Payway, Stripe, PayPal, WebPay |
| **Página Web** (`/pagina-web-hoteles`) | Editor web propio (no WordPress externo) |
| **Hotel Ads** (`/hotel-ads`) | Google Ads, Google Hotel Center, remarketing |
| **Redes Sociales** (`/redes-sociales-hoteles`) | Gestor de contenido social |
| **Huésped+** (`/huesped-gest-app`) | **Guest App web (sin descargas)** vía QR/link: check-in/out, directorio, room service, upsell |
| **Aplicación Conversaciones** (`/aplicacion-conversaciones`) | Bandeja unificada WhatsApp, Messenger, Gmail |
| **Agentes IA** (`/agentes-ia`) | 6 agentes autónomos: reservas, recepción, revenue, operaciones, marketing, experiencia |

**Patrón arquitectónico:** **monolito funcional sobre una sola base de datos** (lo venden como ventaja: "una sola base de datos"), con conectores externos a OTAs, pagos y fiscalización. Los agentes IA tienen **acceso directo al modelo de datos** del hotel (reservas, contactos, WhatsApp, ocupación, reviews), no son chatbots externos — ésta es su jugada reciente más interesante.

---

## 3. UX/UI observado

> **Caveat honesto:** las landings exponen pocos screenshots de alta resolución del producto real; la mayoría son mockups en notebook/mobile con texturas suaves. La inferencia visual que sigue combina evidencia del marketing + reviews + Behance.

### Marketing site (pxsol.com)
- **Paleta:** azul corporativo como primario + **violeta** como secundario sobre fondos blancos/grises claros. Iconografía SVG flat a dos tonos (azul/violeta).
- **Tipografía:** sans-serif moderna geométrica (no identificada por nombre pero sin serifa, con jerarquías claras y títulos en caja alta). No tiene vibe "serif editorial" tipo Mews.
- **Hero:** ilustraciones de operación hotelera + fotos reales de fachadas de clientes + carrusel de logos. Minimalista pero **corporate/sobrio**, no playful.
- **Densidad del sitio:** media. Mucho texto de marketing con bullets, pocos números grandes dramáticos.
- **Mensaje visual:** "profesional confiable argentino", no "startup cool". Más cerca de Siigo/Alegra que de Linear o Mews.

### Producto (PMS, panel operativo)
Lo que se puede inferir de los mockups y descripciones:
- **Layout:** sidebar lateral de navegación (clásico de PMS LATAM) + área central con grilla.
- **"Plano de ocupación"** = **tape chart / rack chart tradicional**: eje X = días, eje Y = habitaciones, celdas de reserva coloreadas por canal de origen. Es el patrón canónico (idéntico mental model que Opera, Little Hotelier, Loggro).
- **Densidad: alta.** Muchos datos por pantalla — se nota en reviews ("extensas funcionalidades pueden abrumar inicialmente", "gestión de tarifas no es muy user-friendly"). Esto es señal de un UI **optimizado para power users de recepción**, no para primer login.
- **Estilo:** "flat moderno con alma clásica" — iconos planos pero layouts densos tipo panel operativo tradicional. **Más Toggl/Zoho que Linear/Notion.**
- **Multidispositivo:** se muestra en notebook y mobile; existe app móvil pero el core productivo es desktop.
- **No se evidencia dark mode.**

### Booking engine (cara al huésped)
- Cards de habitación con imagen grande + precio + tarifa.
- Selector de fechas inline tipo calendario de doble panel.
- **Elemento diferenciador visible:** comparador integrado "tarifa directa vs Booking/Expedia/Despegar" con ahorro en porcentaje destacado.
- White-label parcial: permite personalizar colores e imagen pero mantiene chasis PxSol.
- Checkout en **dos pasos mobile-first**.

### Contraste con Cloudbeds / Mews (lo que importa para Bravas)
| Dimensión | PxSol | Cloudbeds | Mews |
|---|---|---|---|
| Densidad UI | Alta (power users) | Media | Baja (espaciada) |
| Estilo visual | Flat corporate + layouts clásicos | Flat moderno accesible | Minimal design-forward tipo SaaS premium |
| Idioma primario | Español LATAM nativo | Inglés primero, ES traducido | Inglés primero |
| Mobile-first producto | No | Parcial | Sí |
| "Vibe" | Software profesional serio | Startup internacional amigable | Diseño premium hotelero |

**Lectura para Bravas:** PxSol gana en features y compliance LATAM pero pierde en UI moderna/minimalista. Hay espacio clarísimo para un competidor con el stack completo de PxSol pero con la UX de Mews/Linear.

---

## 4. Features destacables (top 15)

Priorizadas por diferenciación LATAM / impacto en Bravas:

1. **Facturación electrónica nativa integrada en checkout**: emite factura ARCA/AFIP (AR) y SII (Chile) directo desde el PMS sin software intermedio. También soporta Siigo (CO) y FacturaLista. **Esto es el killer feature LATAM.**
2. **MercadoPago nativo** con cuotas en 7 países (ARS, UYU, BRL, CLP, COP, PEN, MXN) — crítico porque el huésped LATAM paga en cuotas.
3. **Payway (AR) y WebPay (CL) nativos** + Stripe y PayPal para USD/internacional.
4. **Precios en moneda local sin exposición cambiaria** (vs Cloudbeds en USD fijo).
5. **6 agentes IA con acceso al modelo de datos interno** (no chatbots externos): reservas, recepción, revenue, operaciones, marketing, experiencia. Modo "shadow" para revisar antes de ejecutar.
6. **RMS con AI agent** que propone tarifa diaria con reasoning y confidence score, aprende de aprobaciones/rechazos. Reclaman +18.7% RevPAR vs sin RMS.
7. **200+ canales OTA integrados**, incluyendo **Despegar, Almundo, BestDay, Pricetravel** (OTAs LATAM clave que a Cloudbeds/Mews les faltan o conectan vía terceros).
8. **ERP completo integrado** (compras, inventario, cuentas por pagar/cobrar, conciliación bancaria) — Cloudbeds no tiene esto, hay que pagar aparte.
9. **POS integrado con KDS y cargo a habitación** + factura fiscal argentina, soporta impresoras fiscales e inventario F&B.
10. **Huésped+ guest app sin descargas** (QR o link, web app con branding del hotel): check-in/out, directorio, pedidos a cocina, upsell automático.
11. **Editor web propio** para construir la página del hotel (no depende de WordPress) con comparador integrado.
12. **Portal B2B propio** (Pxsol B2B) para que el hotel venda a agencias de viaje directamente.
13. **GDS** nativo (Sabre, Amadeus, OLA) — importante para hoteles con negocio corporativo.
14. **Bandeja unificada WhatsApp + Messenger + Gmail** — WhatsApp es canal clave LATAM.
15. **Programa de referidos y "embajadores"** (`/embajadores-de-pxsol`) — jugada de growth loop interesante.

---

## 5. Target, pricing y diferenciadores

### Target
- **Hoteles independientes, apart-hoteles, cabañas, posadas y cadenas pymes** de LATAM.
- Rango estimado: 10-150 habitaciones.
- Agencias de viaje (producto separado en `agencias.pxsol.com`).
- Alquileres temporarios (segmento aparte en la nav principal).

### Pricing — **SÍ PUBLICA PRECIOS** (clave competitiva)
Modelo mensual, sin setup, sin permanencia, descuento anual del 20%. Precios en ARS para Argentina:

| Módulo | Professional | Enterprise |
|---|---|---|
| PMS | **~95.500 ARS/mes** (≈ USD 70-90 según cambio) | ~159.000 ARS/mes |
| Motor de Reservas | ~95.500 ARS | ~159.000 ARS |
| Channel Manager | ~95.500 ARS | ~159.000 ARS |
| CRM | ~95.500 ARS | ~159.000 ARS |
| Sitio Web | ~95.000 ARS | ~156.000 ARS (Custom) |
| **Agentes IA** | **USD 60/mes** (3.000 créditos, 3 agentes) | **USD 200/mes** (30.000 créditos, 6 agentes) |
| Hotel Ads | 160K ARS (Starter) → 1.27M ARS (Enterprise) + inversión Google |

**Un hotel que contrate PMS + Motor + Channel Manager + CRM anda en ~380K ARS/mes (~USD 280-350) antes de IA y Ads.** Es un orden de magnitud más barato que Mews y competitivo con Cloudbeds, pero mucho más caro que Octorate o soluciones low-end.

### Diferenciadores de marketing (frases textuales)
- *"Centralizá la operación de tu hotel y maximizá tus ingresos directos."*
- *"Software para hoteles all in one"*
- *"Tu hotel, impulsado por Inteligencia Artificial"*
- *"La plataforma hotelera all-in-one, en una sola base de datos"*
- *"Tu hotel abierto 24/7"* (apoyando IA)
- *"Más de 1800 alojamientos confían en nuestro ecosistema"*
- *"Pxsol nos profesionalizó"* (testimonial recurrente)

Páginas de alternativa dedicadas (SEO play fuerte): `/alternativas/cloudbeds` y `/alternativas/loggro` — ataca frontalmente a sus dos competidores regionales clave.

---

## 6. Compliance LATAM (AFIP, etc.) — y qué le faltaría para España

### Lo que PxSol tiene cubierto
- **Argentina (AFIP/ARCA):** facturación electrónica integrada en el checkout del PMS. Soporta IVA, percepciones, retenciones. Esto es nivel core, no addon.
- **Chile (SII):** emisión electrónica nativa.
- **Colombia:** integración con **Siigo**.
- **Mexico, Uruguay:** mencionados como mercados con facturación cubierta pero menos detalle.
- **Multimoneda** operativa en 7 monedas.
- **Pagos LATAM:** MercadoPago (7 países), Payway (AR), WebPay (CL), Stripe, PayPal.

### Lo que le faltaría para España (gap para Bravas si vendemos en ES)
PxSol no está adaptado a España. Para operar allá hace falta:
- **Verifactu / TicketBAI / SII-IVA** (declaración de IVA en tiempo real a la AEAT en lugar de ARCA).
- **Facturación electrónica B2B obligatoria** (Ley Crea y Crece, FACeB2B).
- **INE/IGE Pernoctaciones**: envío mensual estadístico al Instituto Nacional de Estadística.
- **Partes de viajero a Policía Nacional / Guardia Civil** (SES Hospedajes, antes CheckIn Scheduler) — **esto es el killer compliance España**.
- **Impuesto de estancias turísticas** (Catalunya, Baleares, Comunidad Valenciana, etc.) — distinto por CCAA.
- **Pagos:** Redsys/Bizum son los equivalentes locales, no MercadoPago.
- **GDPR explícito** — PxSol lo cumple en LATAM genéricamente pero no tiene marketing/certificación específica.

**Oportunidad concreta para Bravas:** si queremos jugar en España, el stack de PxSol es inaplicable y hay espacio para un producto equivalente nativo español. Si jugamos en LATAM, PxSol es la competencia dura.

---

## 7. Recomendaciones para HOTEL BRAVAS (corto plazo)

### Qué copiar de PxSol para Bravas v2
1. **Modularidad con precios públicos y transparentes.** No "pedí demo" — publicá los módulos y precios. Es un diferenciador fuerte vs la mayoría del sector.
2. **Rack chart / plano de ocupación** como home del portal admin: eje X días, eje Y habitaciones, celdas coloreadas por canal/estado. Es el patrón canónico que todo recepcionista espera encontrar.
3. **Huésped+ como modelo para el portal huésped de Bravas:** web app sin descarga, acceso por QR/link, branding del hotel, pedidos a cocina, upsell. Esto encaja perfecto con lo que ya mostramos en F1.
4. **Guardar el modelo de "los agentes IA viven dentro del sistema"** — no bolt-on externo. Si Bravas suma IA, que lea el schema interno (reservas, housekeeping, cocina), no que sea un chatbot pegado.
5. **Comparador tarifa directa vs OTA** en el booking engine — barato de implementar y psicológicamente potente.
6. **Páginas /alternativas/cloudbeds, /alternativas/pxsol** desde el día 1 — SEO play probado.

### Qué NO copiar
1. **La densidad de UI del PMS.** Es la queja más repetida en reviews. Bravas puede ganar diferenciándose con una UI tipo Mews/Linear/Notion: espaciada, con "progressive disclosure" (lo complejo solo cuando se necesita).
2. **El estilo marketing "sobrio corporate".** Si Bravas apunta a hoteles chicos modernos, un vibe más cálido y menos "software empresarial" ayuda.
3. **La monolitización en una sola base de datos.** PxSol lo vende como ventaja pero es también su límite técnico (dificulta extender el modelo). Bravas puede ser multi-portal con límites claros y seguir vendiendo "all-in-one" en marketing.

### Qué agregar que PxSol no tiene bien resuelto
- **Portal cocina y housekeeping separados y optimizados para turno** (lo que ya tenemos en F1 va en esa dirección). PxSol los tiene dentro del PMS, no como portales dedicados — hay espacio.
- **Mobile-first real** para recepción (en PxSol es afterthought).
- **Soporte en tiempo real por chat/WhatsApp**, no por email (la queja #1 en reviews).

---

## 8. Recomendaciones SaaS hotelero standalone (largo plazo)

### Estructura canónica que surge de PxSol + contraste con Cloudbeds/Mews
Un SaaS hotelero vertical maduro necesita estos **16 módulos agrupados en 6 capas**:

**Capa 1 — Core operativo:**
1. PMS (reservas, recepción, housekeeping, folio)
2. Rack chart / disponibilidad
3. Perfiles de huésped (CRM 360)

**Capa 2 — Distribución:**
4. Motor de reservas white-label
5. Channel manager (OTAs + GDS + B2B)
6. Rate parity monitor

**Capa 3 — Monetización:**
7. RMS / pricing dinámico (idealmente con IA)
8. Upsell / cross-sell engine
9. Portal B2B propio

**Capa 4 — Pagos y fiscal (crítico y vertical por geografía):**
10. Pasarela de pagos local nativa (MercadoPago en LATAM, Redsys/Bizum en ES, Stripe internacional)
11. Facturación electrónica local nativa (AFIP, SII, Siigo, Verifactu, SES Hospedajes…)
12. Conciliación bancaria

**Capa 5 — Operaciones no-habitación:**
13. POS F&B con KDS y cargo a habitación
14. ERP (compras, inventario, cuentas)

**Capa 6 — Experiencia y crecimiento:**
15. Guest app sin descarga (check-in/out, directorio, pedidos, upsell)
16. Marketing suite (email, campañas, Ads, redes sociales)

### Decisiones arquitectónicas que recomiendo para un SaaS hotelero nuevo
- **Vertical por geografía desde el core**, no "internacional genérico adaptado". El compliance fiscal es tan distinto que es más fácil hacer un producto fuerte en una geografía y después portar que fingir que un producto global sirve en 20 países (que es el error de Cloudbeds en LATAM).
- **Multi-portal con backend compartido**, no monolito single-UI. La UX de un recepcionista, un cocinero y una housekeeper es tan distinta que no caben en la misma pantalla sin dolor. Bravas ya va por este camino — hay que sostenerlo.
- **IA integrada al modelo de datos**, no plug-in externo. El valor es acceso a schema, no al chat.
- **Precios públicos** siempre.
- **Mobile-first para los portales operativos** (housekeeping, cocina, waiters) y desktop-first para admin/recepción con mobile como complemento.
- **API pública desde el día 1** — es lo que Mews ganó contra Cloudbeds y lo que ninguno de los PMS LATAM tiene bien.

---

### Fuentes
- https://www.pxsol.com/es/
- https://www.pxsol.com/sitemap.xml
- https://www.pxsol.com/es-ar/producto/pms-para-hoteles
- https://www.pxsol.com/es-ar/producto/channel-manager-hoteles
- https://www.pxsol.com/es-ar/producto/motor-de-reservas-hoteles
- https://www.pxsol.com/es-ar/producto/rms-para-hoteles
- https://www.pxsol.com/es-ar/producto/pos-para-hoteles
- https://www.pxsol.com/es-ar/producto/erp-para-hoteles
- https://www.pxsol.com/es-ar/producto/crm-hoteles
- https://www.pxsol.com/es-ar/producto/agentes-ia
- https://www.pxsol.com/es-ar/producto/huesped-gest-app
- https://www.pxsol.com/es-ar/producto/soluciones-de-pago
- https://www.pxsol.com/es-ar/integraciones
- https://www.pxsol.com/es-ar/precios
- https://www.pxsol.com/es-ar/alternativas/cloudbeds
- https://www.pxsol.com/blog/pxsol-vs-cloudbeds-comparativa-de-software-hotelero
- https://softwarefinder.com/hotel-management/pxsol
