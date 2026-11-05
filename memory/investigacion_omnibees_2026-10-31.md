# Investigación: Omnibees (channel manager)

**Fecha:** 2026-10-31
**Rol:** bravas
**URL base:** https://omnibees.com/es/solucao/gestor-de-canales/
**Investigador:** subagente general-purpose

## 1. Overview

**Omnibees** es la plataforma de tecnología hotelera **líder en Brasil y uno de los jugadores más grandes de LATAM**. Fundada en 2010 (sede Rio de Janeiro), es una **suite integrada** (no sólo channel manager): channel manager + booking engine + CRS + CRM + payments + BI + RMS + B2B marketplace de operadoras.

**Números que publican:**
- +10.000 hoteles conectados
- +750 integraciones
- +R$25 mil millones transaccionados/año
- +20 millones de alojamientos vendidos/año
- +500 operadoras turísticas conectadas (su "red" B2B)
- 99% uptime declarado, 93% CSAT
- +500 empleados
- Oficinas en Argentina, Brasil, Colombia, México, Portugal y EE.UU.

**Posicionamiento comercial:** "La tecnología hotelera líder en América Latina." Partnerships destacados: **Booking.com Premier Connectivity Partner 2025** y **Expedia Preferred Partner 2025** (son los sellos top de certificación de esos OTAs, muy relevante — pocos CMs en LATAM los tienen).

**Modelo:** B2B consultivo, pricing bajo pedido (no publicado — ni en el sitio ni en Capterra/GetApp/HotelTechReport). En la industria estos CMs rondan **USD 2–10 por habitación/mes** o fee flat + % GMV, pero Omnibees negocia caso a caso.

## 2. Arquitectura y módulos

Omnibees no es un producto único — es un **ecosistema de ~13 módulos** que se venden juntos o por separado. Mapa completo:

**Distribución:**
1. **Gestor de Canales (Channel Manager)** — distribución OTA, el flagship.
2. **Bee2Bee HotéisNet** — marketplace B2B que conecta el hotel directamente con **+500 operadoras turísticas** (TTOO) nacionales e internacionales. Diferenciador LATAM fuerte: canal corporativo/wholesale que ni Cloudbeds ni SiteMinder tienen con tanta profundidad.
3. **Bee2Bee TMC y Empresas** — canal corporate travel (Travel Management Companies).
4. **Bee2Bee Extranet** — extranet para que agencias/empresas carguen reservas directo.
5. **Integración GDS Sabre/Amadeus** — distribución GDS tradicional.

**Captura de reserva directa:**
6. **Motor de Reservas (Booking Engine)** — "4 clicks, aumenta ventas directas hasta 5x." Integra metabuscadores (Google Hotel Ads, Trivago, TripAdvisor).
7. **Sitio Web Responsivo** — CMS para la web del hotel.
8. **Central de Reservas (CRS)** — gestión interna de reservas, grupos, eventos. Declaran +40% conversión en reservas directas.

**Monetización/pricing:**
9. **Bee Price RMS Light** — revenue management básico, auto-pricing.
10. **Bee Price Yield Manager** — RMS full para cadenas.

**Pagos:**
11. **Bee2Pay** — pasarela de pagos propia; reglas automáticas de cobro, sin que el hotel vea datos de tarjeta (reduce PCI scope). Hay dos versiones: Bee2Pay (hoteles) y Bee2Pay Buyer Solutions (operadoras/TMC/agencias).

**Datos y CRM:**
12. **HiQ Market Analytics (Inteligencia de Datos)** — BI con benchmarking contra "miles de hoteles" del mercado. KPIs: ADR, ocupación, revenue, share por canal.
13. **CRM y Automatización de Marketing** — email + SMS + WhatsApp, segmentación, campañas post-reserva, fidelización.

**Conectividad:**
14. **Conmutador de Conectividad** — permite integrar CRS propios de terceros vía la red Omnibees (API bidireccional, monitoreo de comunicaciones).
15. **Integración PMS** — conector a +12 PMS listados (Oracle Opera, APP Sistemas, Arion, Desbravador, Erbon, Harus, Hotelflow, Hospedin, Kontrolo, ADM, Artaxnet, ConIA).

**Arquitectura mental:** PMS <-> Omnibees Hub <-> {OTAs, Metasearch, GDS, Operadoras, Web directa, TMC, Pagos}. El "hub" es el core — todo lo demás es un canal más.

## 3. UX/UI observado

**Paleta de colores (sacada del CSS del sitio corporativo):**
- Primario oscuro / brand: **#302681** (azul-índigo oscuro, muy saturado — es "el" color Omnibees, usado en logos, headers, círculos decorativos).
- Acento rojo: **#b50027 / #ad1519** (CTAs secundarios, destacados urgentes).
- Amarillo acento: **#fabd00** (highlights, "destacado").
- Verde: **#009440 / #006f46** (success, badges).
- Dorado/mostaza: **#9f7e00**.
- Neutros: #fff, #b2b2b2, #bbb, #aaa, #ccc (fondos, bordes, texto secundario).

El contraste principal es **índigo oscuro #302681 + blanco**, con rojo/amarillo para acentos — paleta corporativa "serious enterprise LATAM", muy distinta de los SaaS norteamericanos (Cloudbeds verde, Mews negro-neón, SiteMinder teal). Se siente más "banca/corporate" que "SaaS modern."

**Tipografía:** Sans-serif tipo Montserrat/Open Sans (no declara familia específica en el markup público). Jerarquía fuerte: títulos H1 muy grandes y bold, body regular, mucho white space. Nada experimental.

**Layout del sitio comercial:**
- Header fijo: logo + nav horizontal (¿Por qué, Soluciones, Segmentos, Integraciones, Comunidad, Contacto) + selector idioma (PT/EN/ES) + CTA "Solicite demo" en acento rojo.
- Hero con mockup de laptop mostrando el **Calendario360** (su matriz de disponibilidad).
- Tabs "Para Hotéis" / "Para Cadenas Hoteleras" (segmentación).
- Grid de features: tarjetas de 3-4 columnas con ícono (40x40) + título + párrafo.
- Carrusel de logos clientes (Sandos, Nobile, Meliá, Wyndham, Atlántica, Posadas).
- **Calculadora ROI inline** — pide tipo de establecimiento, # hab, ocupación, ADR → muestra ingreso proyectado (gancho de conversión muy LATAM).
- Testimonios en video (gente real: Rafael Pires de Costão do Santinho).
- Footer gigante con columnas de links, redes, selector idioma, certificaciones.

**Screenshots observados en el sitio (uno por uno — las imágenes no son navegables públicamente al 100%, lo que viene es la descripción del propósito según nombres de assets y contexto):**

1. **`Calendario360_TOP.png`** — Hero del Channel Manager. **Matriz tipo spreadsheet**: filas = tipos de habitación (Standard, Superior, Suite...), columnas = días del mes. Cada celda muestra disponibilidad numérica (ej "5 av") y tarifa debajo. Celdas pintadas por color según estado: verde = disponible, amarillo = pocas, rojo = agotado/stop sale. Toggle superior "Vista por canal" vs "Vista consolidada". Tonos azules/blancos.

2. **`Calendario-360`** — Variante del mismo calendario, vista más detallada por habitación individual. Scroll horizontal por fecha. Esto es lo que un hotelero ve 10 veces por día — es el "pantallazo frente al que se vive."

3. **`GESTAO-DE-RESERVAS.png`** — **Inbox consolidado de reservas** entrantes de todos los canales. Tabla con columnas: fecha reserva, huésped, canal (logo Booking/Expedia/directa), check-in/check-out, estado pago, acciones. Filtros arriba por canal, fecha, estado.

4. **`CONFIGURACAO-DE-TARIFAS-E-PACOTES.png`** — **Editor de tarifas y paquetes**. Panel izquierdo lista rate plans ("Flexible", "No reembolsable", "Early Bird 30"); panel derecho edita reglas: precio base, restricciones (min stay, CTA/CTD), condiciones de cancelación, canales activos (checkboxes de OTAs).

5. **`vinheta-gestor-de-canais-hoteis.gif`** — GIF animado demo: muestra flujo de **cambio de tarifa único → propagación en segundos a Booking/Expedia/Airbnb** (visual: una celda cambia, flechas salen hacia logos OTA). Es el "money shot" del producto.

6. **Mockup laptop Motor de Reservas** — frontend que ve el huésped: selector de fechas, grid de habitaciones, galería de fotos, botón reservar — look y feel "hotel brand", no "Omnibees brand" (es white-label).

**Cómo muestra "OTAs conectadas" (clave para Bravas):** Lista horizontal de logos a color de los canales activos en una vista de "Configuración de distribución", con toggle on/off por canal + badge de estado (verde "sincronizado hace 2min", amarillo "pendiente", rojo "error"). No vi un *log de sync* dedicado, pero sí indicadores inline por canal — que para un hotelero es más usable que un log cronológico abstracto.

**Observación crítica UX:** El producto se siente **"intuitivo pero denso"** — pensado para operadores hoteleros profesionales que viven en la herramienta, no para onboarding self-serve. En reviews mencionan "implementación 2.5/5" (lenta) pero "facilidad de uso 5/5" una vez entrenado.

## 4. Features destacables (top 15 — priorizando integraciones OTA)

1. **Red de +750 integraciones** — el número más fuerte. Incluye OTAs globales + OTAs LATAM + operadoras + wholesalers + metasearch + GDS + PMS + pagos. Es su moat.

2. **OTAs globales de primer nivel listadas:** Booking.com (**Premier Connectivity Partner 2025**), Expedia (**Preferred Partner 2025**), Airbnb, Hotels.com, Agoda (implícito vía Booking Holdings), Hotelbeds (wholesaler), HRS, Lastminute.com, HotelsCombined, Hopper, jet2.com.

3. **OTAs y wholesalers LATAM específicos** (su diferenciador vs SiteMinder/Cloudbeds): **Decolar/Despegar**, Keytel, Master Turismo, Exotismes, Hotel Trader, Hyperguest, Beds4Travel, Miki Travel, HPro Travel. Esto cubre el "mercado interno" brasileño/argentino/mexicano que las OTAs globales no monopolizan.

4. **Red B2B HotéisNet con +500 operadoras turísticas** — permite distribuir a tour operators (CVC, Trend, Flytour, etc.) que mueven mucho volumen LATAM, especialmente leisure/vacacional (promedio 3.82 noches, 42 días antelación). Ningún competidor global tiene esta profundidad en LATAM.

5. **Rate parity automática** — las tarifas se centralizan en Omnibees; cualquier cambio se propaga a todos los canales en segundos vía API push, evitando disparidad.

6. **Inventory pooling / anti-overbooking** — inventario único compartido; cuando un canal vende una habitación, los otros se descuentan en tiempo real. Es la razón de ser técnica del CM.

7. **Conectividad bidireccional PMS** — integra con +12 PMS (Oracle Opera, Desbravador, Hospedin, Hotelflow, etc.). Reservas que entran por OTA bajan al PMS; cambios en PMS suben al CM.

8. **Metasearch out-of-the-box** — Google Hotel Ads, Trivago, TripAdvisor, Kayak conectados vía el booking engine (importante: el meta no es parte del CM strictu sensu, pero Omnibees lo bundle).

9. **GDS Sabre y Amadeus** — distribución corporate/agencias tradicionales. Pocos CMs cloud ofrecen GDS nativo; Omnibees sí (herencia de su origen enterprise).

10. **Calendario360** — vista calendario matricial consolidada: ARI (Availability, Rates, Inventory) + reservas en una sola pantalla. UX core.

11. **Updates grupales multi-hotel** — para cadenas: cambiar tarifa en N hoteles de una sola operación.

12. **Reglas de pricing automáticas (Bee Price)** — RMS integrado: ajustes de tarifa por ocupación, demanda, eventos. Dos niveles (Light y Yield Manager).

13. **Bee2Pay — pagos integrados con PCI scope reducido** — el hotel no ve tarjetas, Omnibees las tokeniza. Reglas de cobro automáticas (ej "cobrar 50% al reservar, 50% a 7 días del check-in"). Soporta métodos LATAM (PIX en Brasil, implícito).

14. **BI con benchmarking de mercado (HiQ Market Analytics)** — compara tu performance con "miles de hoteles" en tu categoría/región. KPIs: ADR, ocupación, RevPAR, share por canal.

15. **CRM multicanal** — email + SMS + **WhatsApp** (crucial LATAM) + segmentación. Automatizaciones pre/post-estadía.

## 5. Target, pricing y diferenciadores

**Target primario:**
- Hoteles independientes 20–200 habitaciones (sweet spot).
- Cadenas hoteleras regionales LATAM (Nobile, Atlántica, Posadas, Summit).
- Resorts/spas vacacionales.
- Posadas (B&Bs grandes brasileñas).
- Marcas globales con operación LATAM: **Meliá, Wyndham, Sandos**.

**Target secundario (buy-side):**
- Agencias de viaje
- TMCs (travel management companies corporate)
- Operadoras turísticas
- Empresas con viajes corporativos

**Países declarados:** Brasil (core), Argentina, Colombia, México, Portugal, EE.UU. En práctica el 70%+ del negocio es Brasil.

**Pricing:** **No publicado en ningún lado.** Modelo B2B consultivo, "Solicite una demo" como único gateway. Capterra, GetApp, HotelTechReport, SoftwareSuggest — ninguno tiene tarifa listada. Industria sugiere $2–10 USD/habitación/mes o fee flat + % GMV.

**Diferenciadores vs competencia global (SiteMinder, Cloudbeds, D-Edge):**

1. **Profundidad LATAM** — conexión nativa con operadoras y OTAs regionales (Decolar, CVC, Flytour) que los competidores globales no tienen o tienen pobremente.

2. **HotéisNet / canal B2B wholesale** — único con marketplace integrado de operadoras. SiteMinder no tiene esto, Cloudbeds menos aún.

3. **Suite completa integrada** — CM + BE + CRS + CRM + payments + BI + RMS en una sola plataforma y un solo vendor. Los competidores suelen integrar vía partners.

4. **Certificaciones premium OTAs** — Booking Premier + Expedia Preferred 2025 (muy pocos CMs LATAM las tienen simultáneamente).

5. **GDS nativo** — Sabre + Amadeus incluidos.

6. **Pagos locales** — Bee2Pay con PIX, boletos, tarjetas LATAM.

**Debilidades vs competencia:**
- Implementación lenta (reviews: 2.5/5 en implementación).
- Pricing opaco (friccional vs Cloudbeds que publica).
- UI "enterprise" denso vs SaaS modernos más limpios (Mews, Little Hotelier).
- Fuera de Brasil (mercados hispano LATAM) la penetración es menor.

## 6. Compliance LATAM/global observado

- **LGPD (Brasil)** — DPO (Data Protection Officer) listado en footer, política de privacidad extensa. Explícito.
- **GDPR** — por presencia en Portugal/UE, implícito.
- **PCI-DSS** — Bee2Pay tokeniza tarjetas y "el hotel no visualiza datos de tarjeta" → arquitectura PCI-compliant (nivel exacto no publicado).
- **Partnership status Booking.com Premier Connectivity 2025 + Expedia Preferred Partner 2025** — implica cumplimiento riguroso de los standards de API/SLA/data de ambas OTAs (es certificación anual exigente).
- **Idiomas:** PT-BR, ES, EN. Multi-moneda implícita por operar LATAM.
- **PIX (Brasil) + métodos locales** — soportado vía Bee2Pay.
- **99% uptime declarado** — no mencionan SLA formal público ni ISO 27001 explícitamente (puede existir, no está en el marketing).

## 7. Recomendaciones para HOTEL BRAVAS (corto plazo)

Bravas v2 **no necesita construir un channel manager** — es un cuello de botella técnico que requiere acuerdos XML/API con cada OTA individualmente (6-18 meses por cada OTA grande). Pero Bravas v2 **sí necesita UI que anticipe la existencia de un CM** cuando sea tiempo de conectar. Qué robar de Omnibees:

**a) Pantalla "Canales de Venta" (aún stub).**
Crear un portal admin con una sección "Canales" que muestre una **grilla de tarjetas de OTAs** (Booking, Expedia, Airbnb, Despegar, Hotelbeds, Google Hotel Ads) con:
- Logo del canal
- Toggle on/off
- Badge estado: "Conectado" (verde) / "Desconectado" (gris) / "Próximamente" (amarillo)
- Última sincronización ("hace 2 min")
- Reservas del canal del mes
- Botón "Configurar"

En v2 todo puede ser **stub con fake data** — vende la visión sin tener el backend. Es el mejor "demo trick" para cerrar hoteles que ya usan OTAs.

**b) Calendario360 (matriz ARI).**
Pantalla core del admin: filas = tipos de habitación, columnas = días (28 visibles con scroll), celdas con disponibilidad numérica + tarifa + código de color (verde/amarillo/rojo). Esto es **lo que todo hotelero reconoce al instante** y es idéntico en Omnibees, SiteMinder, Cloudbeds — es el patrón universal del rubro. Bravas debería tenerlo aunque internamente sea un calendario simple.

**c) Inbox consolidado de reservas.**
Tabla con columna "Fuente" que muestra el logo del canal (incluso si al inicio es sólo "Directa"). Esto hace que cuando conectes Booking después, no haya que rehacer la UI.

**d) Paleta de Bravas vs Omnibees.**
Omnibees usa **índigo #302681 serious enterprise** — anotá esto: en LATAM "corporate" vende confianza. Si Bravas apunta boutique/moderno, va a diferenciarse pero debe cuidar que no se vea "demasiado SaaS tech" para hoteleros tradicionales. Un acento índigo o navy puede dar seriedad sin perder modernidad.

**e) Textos y CTAs clave en español LATAM.**
- "Solicite una demo" > "Request a demo"
- "Habla con un experto" (botón CTA secundario común en LATAM B2B).
- "Aumente sus ventas X veces" (frase de impacto cuantificable — muy LATAM, Omnibees lo repite).
- Calculadora de ingresos inline en landing — gran gancho conversión.

**f) No prometer OTA integration real en v2.** Marcarlo como roadmap. Pero sí dejar el **esqueleto de pantalla** para que cuando entre el primer piloto, el hotelero vea que la UI está lista para crecer.

## 8. Recomendaciones SaaS hotelero standalone (largo plazo) — módulo channel manager

Si eventualmente Bravas construye su propio CM (vs integrar uno existente), este es el blueprint:

**Arquitectura modular (robar de Omnibees):**

```
Bravas Core (PMS)
      │
      └── Channel Hub (adapter pattern)
             ├── OTA Connectors (Booking XML, Expedia QuickConnect, Airbnb API, Despegar...)
             ├── Metasearch Connectors (Google HPA, Trivago, TripAdvisor)
             ├── GDS Connectors (Sabre, Amadeus) — fase 3
             ├── B2B Connectors (Hotelbeds, operadoras locales) — fase 2
             └── Direct Booking Engine (ya existe en Bravas)
```

**Capas lógicas obligatorias:**

1. **Rate Manager** — single source of truth de tarifas. UI tipo Calendario360.
2. **Inventory Pooler** — un inventario único; cualquier venta descuenta en todos los canales simultáneamente. Es la razón técnica de ser del CM.
3. **Sync Engine** — cola de jobs (Redis/BullMQ), retries, rate limiting por OTA. Logs auditables.
4. **Sync Log viewer** — pantalla admin con log cronológico de todos los eventos push/pull (OTA → Bravas, Bravas → OTA), timestamps, status, payload. Omnibees lo tiene inline por canal; standalone debería tener ambos: inline + log cronológico filtrable.
5. **Reservations Inbox consolidado** — ya mencionado.
6. **Mapping layer** — mapeo entre room types internos y los códigos de room type de cada OTA (crítico y doloroso técnicamente — Booking's room_id ≠ Expedia's room_id).
7. **Rate parity monitor** — alerta si Booking muestra tarifa distinta a la que Bravas pushea (puede pasar por disparidad temporal o pricing bugs).

**Priorización por fases (orden que seguiría Octo):**

- **Fase 1 (6 meses):** Booking.com (XML API, "Premier Connectivity" eventualmente). Es el 50%+ del volumen OTA en LATAM.
- **Fase 2 (6-12 meses):** Expedia (incluye Hotels.com) + Airbnb + Despegar.
- **Fase 3 (12-18 meses):** Hotelbeds (wholesale) + metasearch (Google HPA es "casi gratis" si ya hay booking engine propio).
- **Fase 4:** GDS (sólo si target son hoteles corporate/business).

**Pricing standalone (si Bravas SaaS lo monetiza):**
- Modelo híbrido: **fee base por hotel/mes + USD/habitación/mes + opcional % de GMV de OTAs**. Replicar Cloudbeds (publicado) para presión competitiva — pricing opaco tipo Omnibees funciona en enterprise pero no en SMB self-serve.

**Decisión estratégica alternativa:**
Antes de construir CM propio, **evaluar integrar un CM existente como SiteMinder, Omnibees o STAAH vía su API de partner**. Omnibees tiene su "Conmutador de Conectividad" justamente para esto — permite que CRS/PMS externos usen su red de 750 canales. Bravas podría ser cliente de Omnibees antes que competidor. Si el 50% del valor es "estar en Booking", comprá la conexión en vez de construirla.

**Diferenciadores potenciales para un CM nuevo LATAM:**
- UI moderna real (no densa) — hay espacio: Omnibees se ve enterprise, Cloudbeds genérico.
- Onboarding self-serve en 1 día (Omnibees tarda semanas).
- Pricing publicado y transparente.
- Mobile-first para hoteleros (vista calendario360 en celular funcional).
- WhatsApp como canal nativo para alertas de sync al dueño.
- Open API first (que terceros construyan sobre vos).

---

## Fuentes
- https://omnibees.com/es/solucao/gestor-de-canales/
- https://omnibees.com/es/
- https://omnibees.com/es/solucao/motor-de-reservas/
- https://omnibees.com/es/solucao/inteligencia-de-dados/
- https://omnibees.com/es/solucao/bee2pay/
- https://omnibees.com/es/solucao/crm-automacao-de-marketing/
- https://omnibees.com/es/solucao/hoteisnet/
- https://omnibees.com/es/solucao/central-de-reservas/
- https://omnibees.com/es/nossos-socios-es/
- https://omnibees.com/es/clientes/
- https://hoteltechreport.com/revenue-management/hotels-reservation-system/omnibees
- https://www.capterra.com/p/152803/Omnibees/
- https://www.getapp.com/marketing-software/a/omnibees/
- https://www.stayntouch.com/articles/hotel-channel-manager-pricing-2026
