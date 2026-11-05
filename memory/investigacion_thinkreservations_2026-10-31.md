# Investigación: ThinkReservations

**Fecha:** 2026-10-31
**Rol:** bravas
**URL base:** https://www.thinkreservations.com/request-a-demo
**Investigador:** subagente general-purpose

## 1. Overview

**ThinkReservations** es un PMS cloud fundado en 2012 con sede en Seattle, especializado en propiedades independientes de pequeño y mediano tamaño: B&Bs, inns, hoteles boutique, resorts y propiedades de lujo. Es el PMS mejor rankeado para B&Bs en USA (#2 de 31 en el segmento), y acaba de ganar el **TravelTech Breakthrough Award 2026 "Hotel PMS of the Year"**.

**Tagline oficial:** *"Save time. Increase revenue."*
**Promesa de marca:** *"Boost Direct Bookings with ThinkReservations Hotel Management Software — Everything your property needs, in a single platform."*

**Datos duros:**
- 4.9/5 en Capterra con 120+ reviews.
- 4.8/5 en Hotel Tech Report con 377–420 reviews.
- 97% de recomendación entre 541 hoteles.
- 99.99% uptime declarado.
- Soporte 24/7 US-based con staff ex-industria hotelera.
- Base de clientes: ~613 propiedades, 97% en USA; algo en Canadá, Belice y Centroamérica.
- Es "all-in-one" real: PMS + booking engine + channel manager + website + payments + comms + marketing + accounting bajo un mismo paraguas.

**Posicionamiento de mercado:** Boutique/B&B friendly, no enterprise. Diseñado para operaciones donde el dueño o un general manager pelea cada punto de RevPAR y necesita velocidad operativa, no sofisticación corporativa. Clave: *"simplifica donde otros siguen añadiendo complejidad"* (frase del jurado del premio).

---

## 2. Arquitectura y módulos

Nueve módulos oficialmente separados, pero todos cosen contra el mismo núcleo (una sola base de datos y una sola UI).

### 2.1 Property Management System (PMS) — core
- **Reservation Calendar** (vista principal, formato tape chart).
- Gestión de reservas con **split folios** (dividir cargos entre múltiples huéspedes).
- **Rules-based room assignments** (asignar por piso, repartir ocupación, preferencias del cliente).
- Automatización de tareas por reserva (tasks disparados por condiciones).
- Personalización de emails transaccionales.
- Mobile-friendly (no app nativa iOS, es un contra conocido).

### 2.2 Booking Engine
- Serves inventory live del PMS, cero fricción vendor-to-vendor.
- **Depósitos automáticos** según política.
- **Add-ons/packages** (romance, breakfast, etc.) con tasks derivadas automáticas.
- **Member-only rates** vía login en ThinkTravel.
- Confirmación por SMS al reservar.
- Promociones last-minute, estacionales, weekday-only.

### 2.3 Channel Manager
- 20+ canales: Booking.com, Airbnb, Expedia, VRBO, TripAdvisor, Google Hotel Ads, Kayak, Priceline, Trivago, HotelTonight, Hotels.com, Hotwire, Agoda, Travelocity.
- Sincronización bidireccional real-time de tarifas e inventario.
- Dynamic pricing cross-channel (sube/baja según ocupación y booking window).

### 2.4 Guest Communications ("ThinkMessenger")
- SMS + email + bandeja centralizada staff-huésped-staff.
- **98% open rate / 90s response time / 9% CTR** (métricas que publicitan).
- Portal de **digital check-in** pre-llegada.
- Templates y disparos automáticos (pre-arrival, in-stay, post-checkout).
- Encuestas automáticas post-stay + review requests.

### 2.5 Websites ("ThinkWeb")
- Drag-and-drop builder con templates hoteleros.
- Booking engine embebido (misma UI, cero rebote).
- Personalización por atributo (idioma, país, segmento).
- Multi-idioma, SEO, SSL, ADA, Google AMP, Google Analytics.
- Review widgets, popups promocionales, galerías de fotos.

### 2.6 Payment Processing ("ThinkPayments")
- Core: **Stripe** (PCI-DSS Level 1, tokenización, 3DS).
- Procesadores adicionales: Heartland, Braintree, Authorize.Net, MPI.
- **Apple Pay / Google Pay / BNPL** (buy-now-pay-later).
- Posting a folio desde la misma pantalla de reserva.
- Refunds/adjustments parciales desde la reserva.
- Chargeback evidence bundling automático.
- Dos modelos: Flat Rate y Lodging Interchange Plus.

### 2.7 Accounting
- **Double-entry** real.
- **Chart of Accounts** customizable.
- **Night audit automatizado**.
- **Journal entries** sincronizadas a **QuickBooks**.
- Multi-currency.
- Reportes AR/AP.
- Servicio premium de bookkeeping humano desde $950/mes aparte.

### 2.8 Marketing ("ThinkMarketing")
- Servicio managed (no self-serve): estrategia, blog, social, email, directorios online.
- Reportes mensuales de performance.
- Gift certificates vendibles online.

### 2.9 Marketplace / Integrations
- Canary Technologies (contactless check-in).
- TrustYou (reputation).
- Sojern (travel marketing).
- Triptease (direct-booking parity).
- PriceLabs (revenue management ML).
- Revinate (CRM + email).
- INTELITY (guest experience).
- OpenKey, Diamo (door locks).

**Arquitectura implícita:** Monolito modular SaaS con separación muy nítida de responsabilidades por módulo, pero una sola UI unificada (el gran acierto). Mobile-first para staff en housekeeping, desktop-first para front desk / rate manager.

---

## 3. UX/UI observado

### 3.1 Paleta y estilo del sitio y producto

**Paleta principal (sitio marketing):**
- **Azul celeste/turquesa** como primario (botones, iconos, acentos).
- **Blanco** dominante como fondo.
- **Grises neutros** para divisores y jerarquía secundaria.
- **Negros** para headlines y body text principal.
- Fotografía real de hoteles (muy warm, muchos interiores con luz cálida) para romper el frío del azul.

**Tipografía:** Sans-serif moderna tipo Inter/Poppins. Jerarquía: headlines 32-48px bold, subheads 18-24px, body 14-16px regular.

**Tono general:** Limpio, profesional, no gritón. Mucho whitespace. Cards. Iconografía custom en el mismo azul.

### 3.2 El producto en sí (tape chart / reservation calendar)

Este es el componente estrella y donde la UI tiene identidad propia:

- **Formato tape chart clásico horizontal:** filas = habitaciones (eje Y), columnas = días (eje X). Reservas aparecen como **barras horizontales** que atraviesan los días.
- **Drag-and-drop nativo:** mover reservas de habitación o fecha arrastrando la barra.
- **Safeguards al soltar:** aparece un **borde azul** alrededor de las celdas destino donde la reserva va a caer. Si hay conflicto de precio o doble-booking, el sistema avisa antes de confirmar.
- **Housekeeping column ("H") al extremo izquierdo:** cuadrado **rojo** = habitación sucia, cuadrado **blanco** = habitación limpia. Súper denso, súper legible.
- **Reservas color-coded + iconos:** cada barra tiene color según estado (confirmada, pendiente, OTA source, etc.) y pequeños iconos para payment status, source, tasks pendientes.
- **Legend hover:** pasando el mouse sobre la palabra "Legend" aparece el mapa de colores e iconos. Es un patrón importante: la UI es densa pero descubrible.
- **Vistas custom:** el usuario puede guardar vistas (por tipo de habitación, por piso, por rango de fechas) y alternarlas rápido.
- **Click en una barra abre el detalle de la reserva** en side-panel/modal con todo: folio, pagos, mensajes, tasks, huésped.

### 3.3 Patrones de UX distintivos

1. **Densidad informativa alta pero ordenada.** No es "infantil" ni "card-based moderno aireado"; es un workhorse de operador hotelero. Si Bravas quiere parecer serio, esta es la clave: densidad legible, no esponjosidad de startup.
2. **Un solo plano, no mil pantallas.** La reserva, su folio, su housekeeping, sus mensajes y sus tasks viven todos pegados. Cero rebote.
3. **Automatic Task Rules.** Reglas tipo "si reserva incluye desayuno → crear task 'preparar desayuno' para housekeeping el día X a las 7am". Es un sistema de automatización ligero muy útil, con UI tipo if-this-then-that.
4. **Mobile app para housekeeping específicamente.** Las housekeepers tienen vista de su lista de habitaciones del día, status de cada una, pueden marcar clean/dirty/inspected desde el teléfono.
5. **Night audit automatizado.** Un botón corre el cierre del día, cuadra ingresos, mueve asientos a QuickBooks. No hay planilla Excel paralela.
6. **Centralized messaging inbox.** Todas las conversaciones (SMS + email + comentarios internos de staff) por reserva en un solo thread. Muy tipo Front o Intercom pero para hospedaje.
7. **Legend hover en todas las vistas densas.** Patrón recurrente: la UI se banca ser densa porque la ayuda contextual está a un hover.

### 3.4 Dónde el producto se queda corto (de reviews)

- **UI/UX "feels dated"** vs competidores con IA en 2026. Clean pero no moderno.
- **Dashboard pide a gritos summary charts/graphs.** Los usuarios piden más visual analytics.
- **Sin app nativa iOS.** Es web mobile-friendly.
- **Workflows "algo engorrosos"** en flujos secundarios.
- **Mensajería no 100% real-time.**
- **Re-autenticación frecuente entre dispositivos.**

**Lectura para Bravas:** copiá el **tape chart denso + color-coded + drag&drop + housekeeping marker al margen** y evitá sus errores (sin dashboards gráficos, UI dated). Osea: tomá la arquitectura informativa, modernizá la piel.

---

## 4. Features destacables (top 15)

1. **Tape chart drag-and-drop** con color-coded reservations y housekeeping marker.
2. **Rules-based room assignments** (asigna solo según reglas: piso, preferencia, repartir ocupación).
3. **Automatic task rules** (if-this-then-that para housekeeping, cocina, maintenance).
4. **Split folios** (dividir el cargo entre huéspedes/empresas).
5. **Night audit automatizado + double-entry** con sync a QuickBooks.
6. **Yield management** (reglas automáticas por ocupación y booking window).
7. **Centralized guest messaging** (SMS + email + staff notes por reserva).
8. **Digital check-in portal** pre-llegada (recolecta DNI, firma, preferencias).
9. **Add-ons/packages con tasks derivadas** (vendés desayuno → se crea la task).
10. **Transactional emails** customizables, trigger-based.
11. **Booking engine propio** con direct-rates y member rates.
12. **Channel manager a 20+ OTAs** bidireccional real-time.
13. **Payment processing integrado** (Stripe + PCI L1 + Apple/Google Pay + BNPL + 3DS).
14. **Gift certificates vendibles online**.
15. **Housekeeping mobile app** con asignación de créditos/puntos por habitación.

**Bonus (16-20):** Report suite (RevPAR, ADR, pace, occupancy, source mix), rate shopping, groups management, multi-property (débil pero existe), ThinkWeb builder con AMP + ADA.

---

## 5. Target, pricing y diferenciadores

### 5.1 Target

- **Hoteles independientes pequeños a medianos.** 1-99 habitaciones es el sweet spot.
  - X-small (1-9 habs): 362 clientes.
  - Small (10-49 habs): 228 clientes.
  - Mid (50-99 habs): 23 clientes.
- **Tipologías:** B&B/Inns (559 propiedades, su segmento #1), Boutique (171), Resorts (142), Luxury (118), Vacation Rentals (49).
- **Geografía:** USA-first (593/613), apenas Canadá, Belice, Centroamérica. **Europa: cero footprint.**
- **Perfil de buyer:** dueño-operador o GM que necesita manejar front desk, housekeeping, OTA y accounting él mismo o con equipo chico. No cadena.

### 5.2 Pricing

- **$10/habitación/mes** con **mínimo $50/mes**.
- Sin setup fee.
- Sin trial gratis.
- Soporte incluido; training in-person extra.
- Ejemplos reales:
  - 10 unidades → ~$80/mes efectivos ($8/unidad).
  - 20 unidades → ~$130/mes ($6.50/unidad).
  - 100 unidades → ~$450/mes.
- B&B pequeño reporta all-in de $100-250/mes incluyendo channel manager.
- Bookkeeping humano premium: desde $950/mes aparte.
- No muestran pricing en el sitio: todo es "Request a demo".

### 5.3 Diferenciadores de marketing

1. **"All-in-one real"** vs stacks fragmentados — mismo vendor para PMS + booking + channel + website + payments + comms.
2. **"Simplifies where others complicate"** — frase del award, usada repetidamente.
3. **Soporte 24/7 US-based de ex-hoteleros** (no un call center).
4. **Case studies cuantificados y públicos**: 11% revenue growth (Devonfield), 35% online revenue (Fathoms), 52% total revenue año 1 (Blue Tang), 85% occupancy 2024 (Yara), 30% menos tiempo staff admin (Inn on Main), 17.3% revenue from upsells (Yara).
5. **TravelTech Breakthrough 2026 "Hotel PMS of the Year"**.
6. **Rating 4.8-4.9 estrellas** en todas las plataformas de review.
7. **Direct booking focus** — mensajean fuerte contra la comisión OTA.
8. **Branding** del hotel está primero (member-only rates, ThinkWeb como website del hotel, no co-branded).

---

## 6. Compliance (nota: US-first, mirar qué tiene aplicable)

ThinkReservations está construido US-first, pero varias piezas son transferibles a España/UE:

- **PCI-DSS Level 1** (via Stripe) — directamente aplicable y requerido en EU.
- **3D Secure authentication** — ya cumple SCA (Strong Customer Authentication) de PSD2, requisito europeo obligatorio.
- **Tokenización de tarjetas** vía Stripe infra, nunca en servidores propios.
- **Chargeback evidence bundling automático** — útil contra fraude.
- **ADA compliance** en ThinkWeb — equivale conceptualmente a WAI/AA, pero España requiere además EN 301 549.
- **SSL** por defecto.
- **Daily backups + 99.99% uptime** declarados.
- **Cybersecurity insurance** mencionado en servicios premium.

**Lo que NO tienen y Bravas sí necesita para España:**
- **RGPD** (GDPR): consentimientos granulares, DPO, derecho al olvido, portabilidad, DPA con subprocessors, residencia de datos UE.
- **Registro de viajeros / parte de huéspedes** obligatorio en España (SES.Hospedajes del Ministerio del Interior, antes Mossos/Guardia Civil/Policía Nacional). ThinkReservations no lo contempla porque es US.
- **TicketBAI / Facturae / SII** para facturación según comunidad autónoma.
- **IVA español 10% hospedaje + impuesto turístico municipal/autonómico** (Cataluña, Baleares, etc.).
- **Verifactu** si corresponde al tramo de facturación del hotel.
- **Multi-idioma ES/CA/EU/GL** nativo, no solo via Google Translate.

**Lectura:** Bravas puede copiar la postura técnica (Stripe + PCI L1 + 3DS + tokenización) pero debe sumar toda la capa fiscal-regulatoria española que ThinkReservations ni roza.

---

## 7. Recomendaciones para HOTEL BRAVAS (corto plazo, v2)

### 7.1 Arquitectura inmediata (F2-F3)

**Mantener los 4 portales que ya tienen (huésped, limpieza, cocina/salón, admin)** pero cosiéndolos contra un **modelo de datos único**:
- `Reservation` como entidad raíz: hereda folio, mensajes, tasks, housekeeping state, payment state.
- `Room` con `housekeeping_status` (dirty/clean/inspected/out-of-order) y `assignment_rules`.
- `Task` con `trigger` (reserva, add-on, hora, estado housekeeping) y `assignee` (rol o persona).
- `Message` por reserva, unificando SMS/email/notas internas.

### 7.2 UX/UI — lo que hay que copiar (y mejorar)

1. **Vista central = Tape Chart.** Rack chart horizontal con habitaciones en Y, días en X, barras drag&drop. Esto solo ya convierte "demo infantil" en "software serio". Es LA pantalla que un dueño de hotel 3-4* espera ver.
2. **Housekeeping marker al margen izquierdo:** cuadrado rojo/blanco/amarillo (sucia / limpia / out-of-order). Pattern robado directo.
3. **Color-coded reservations + iconitos** por estado (pago pendiente, OTA source, VIP, grupo).
4. **Legend hover** para no infantilizar la UI con labels larguísimos.
5. **Side panel al clickear una reserva** con todo pegado: folio, pagos, mensajes, tasks, huésped — no otra pantalla.
6. **Automatic task rules** con UI if-this-then-that para housekeeping y cocina. Esto resuelve el portal cocina/salón: "si reserva incluye media pensión → crear task 'cena 20:30 mesa X' para salón".
7. **Mobile app para housekeeping** (PWA o native) con lista plana de habitaciones del día, un botón grande "marcar limpia", foto antes/después opcional.
8. **Centralized messaging inbox por reserva**, estilo Front/Intercom. SMS + WhatsApp (España = WhatsApp obligado) + email + notas de staff en un thread.

### 7.3 Paleta/tipo recomendada para Bravas v2

- **No copiar el celeste de ThinkReservations tal cual**: en España/boutique 3-4\* funciona mejor una paleta tipo **neutro cálido** (crema/piedra/beige) con un **acento oscuro** (navy, verde oliva, burgundy) — remite a hotelería tradicional seria.
- **Tipografía:** una serif editorial para brand/headlines (tipo GT Super, Söhne, o Suisse Serif) + una sans-serif técnica para UI densa (Inter, IBM Plex, Söhne).
- **Densidad:** apuntá a filas de 32-40px en tape chart y tablas, no 56-64px. Operadores quieren ver 15 reservas en pantalla, no 5.
- **Iconografía:** monoline, no filled flat. Lucide o Phosphor, no emojis.

### 7.4 Qué NO copiar

- **Dashboard sin gráficos.** Es un contra documentado. Bravas v2 debería tener desde el día 1 un dashboard con RevPAR, ocupación, pace y revenue por fuente con gráficos (sparklines, barras, donut de source mix).
- **Sin app nativa.** Bravas puede ganar fácil con PWA bien hecha + app nativa en housekeeping.
- **Email de marketing dentro del PMS.** Mejor integrar MailChimp/Brevo que construirlo mal.
- **Soporte 24/7 humano.** Imposible en F2. Mejor documentación impecable + chat 9-21.

### 7.5 Features priorizadas para Bravas v2 (orden)

1. Tape chart con drag&drop y color coding.
2. Housekeeping board + marker en tape chart.
3. Reservation side-panel con folio + pagos + mensajes + tasks pegados.
4. Automatic task rules → alimentan portal cocina/salón.
5. Centralized messaging con WhatsApp Business API + email.
6. Pagos vía Stripe con PCI L1 + 3DS/SCA + Apple/Google Pay.
7. Booking engine propio embebible en el sitio del hotel.
8. Channel manager vía integración (SiteMinder, Hotelbeds, Rentals United) — no construir propio en F2.
9. Night audit + export a software fiscal español (Sage, A3, Holded).
10. Dashboard con gráficos reales desde día 1.

---

## 8. Recomendaciones SaaS hotelero standalone (largo plazo)

Si Bravas va a ser un SaaS vertical hotelero español/europeo serio, la **estructura canónica** destilada de ThinkReservations + aprendizajes del mercado:

### 8.1 Módulos core (todos propios, un solo producto comercial)

1. **PMS** — reservation calendar (tape chart), reservas, folios, split folios, groups, room assignment rules.
2. **Booking Engine** — widget embebible + hosted page, add-ons, member rates, multi-idioma, multi-moneda.
3. **Channel Manager** — bidireccional con 15-20 OTAs vía SiteMinder/Hotelbeds inicialmente, propio en v3+.
4. **Guest Communications** — SMS + **WhatsApp Business API** (crítico en España) + email + unified inbox + templates + flujos automáticos.
5. **Housekeeping** — mobile-first, créditos/puntos por habitación, asignación por reglas, foto evidencia.
6. **F&B / cocina-salón** (diferenciador vs ThinkReservations que no lo tiene) — comandas, mesas, media pensión, allergen tracking, link reserva↔mesa.
7. **Payments** — Stripe/Redsys/Adyen, PCI L1, SCA, tokenización, folio posting, Apple/Google Pay, Bizum.
8. **Accounting** — double-entry, night audit, export Sage/A3/Holded/Contasol, Facturae/Verifactu/TicketBAI.
9. **Reports & Analytics** — RevPAR/ADR/occupancy/pace/source mix con gráficos reales, exportables, programables.
10. **Websites** — opcional, builder con templates boutique, integrado con booking engine, SEO, multi-idioma, AMP.

### 8.2 Capa transversal

- **Automation engine** (task rules) — if-this-then-that cross-módulos. Esto es el pegamento que hace que la operación "fluya sola".
- **Role-based portals** (lo que Bravas ya tiene bien) — huésped / housekeeping / cocina-salón / front desk / admin con un solo modelo de datos abajo.
- **Marketplace de integraciones** — revenue management (PriceLabs, Duetto), door locks (Nuki, SALTO, Omnitec en España), reputation (TrustYou, ReviewPro), CRM (Revinate, Guestline).
- **Mobile apps** — una native para housekeeping, PWA para front desk, SDK/widget para huésped.

### 8.3 Compliance EU/España desde el core (no bolt-on)

- **GDPR nativo:** consentimientos granulares por reserva, DPA con subprocessors, residencia UE (AWS Dublin/Frankfurt o Hetzner), derecho al olvido real (anonymizar sin romper accounting).
- **SES.Hospedajes** (parte de viajeros al Ministerio del Interior) automatizado desde check-in digital.
- **TicketBAI / Verifactu / Facturae / SII** según comunidad autónoma del hotel.
- **IVA 10% hospedaje + impuesto turístico autonómico** (ITP Baleares, ITC Cataluña, etc.) por línea en folio.
- **Multi-idioma ES/CA/EU/GL/EN/FR/DE/PT** en guest-facing surfaces.
- **PSD2 SCA + 3DS** nativo vía Stripe/Redsys/Adyen.

### 8.4 Diferenciadores competitivos propuestos para Bravas (lo que ThinkReservations no tiene y nadie en EU hace bien)

1. **F&B/cocina-salón integrado nativo.** Nadie en el espacio PMS lo tiene decente. ThinkReservations no lo tiene. Es *tu* ventaja.
2. **WhatsApp-first guest communications.** En España el huésped habla por WhatsApp, no SMS.
3. **Compliance fiscal española real** (SES.Hospedajes, Verifactu, impuesto turístico por autonomía).
4. **Portal del huésped de verdad** (no un email + un link): check-in digital, upgrade/add-on in-stay, abrir puerta (door lock integration), llamar al salón, pedir late check-out, pagar extras — todo en una PWA con el branding del hotel.
5. **UX densa y moderna** — la combinación que ThinkReservations no logra: densidad informativa de workhorse hotelero + estética 2026. Es el gap.
6. **AI copilot operativo** — "asistente para front desk" que sugiere upgrades, detecta overbookings, redacta respuestas al huésped, prioriza housekeeping — ThinkReservations ya le llueve este contra en reviews, es ventana abierta.

### 8.5 Modelo de pricing recomendado (largo plazo)

- **Por habitación/mes con mínimo** (como ThinkReservations): claro, predecible, escala con el cliente.
- Rango España 3-4\*: EUR 8-15 por habitación/mes con mínimo EUR 150-200.
- **Add-ons modulares:** channel manager +EUR X, F&B +EUR Y, WhatsApp +EUR Z.
- Setup profesional incluido (como ThinkReservations hace): un onboarding manager que configura todo el primer mes.
- **Sin trial gratis** pero **sí demo guiada de 45 min** (ThinkReservations lo hace y funciona en segmento premium).

---

## Fuentes
- https://www.thinkreservations.com/
- https://www.thinkreservations.com/products
- https://www.thinkreservations.com/solutions/hotels
- https://www.thinkreservations.com/resources/articles/Hotel-PMS-2026-TravelTech-Breakthrough
- https://hoteltechreport.com/operations/property-management-systems/thinkreservations
- https://hoteltechreport.com/operations/hotel-management-software/thinkreservations-hms
- https://hoteltechreport.com/marketing/websites/thinkweb-websites
- https://www.pmscompare.com/pms/thinkreservations
- https://support.thinkreservations.com/support/solutions/articles/48000511649-navigating-the-reservation-calendar
- https://support.thinkreservations.com/support/solutions/articles/48000511530-automatic-task-rules
- https://www.roommaster.com/blog/thinkreservations-pricing
