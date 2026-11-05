# Investigación: Cloudbeds

**Fecha:** 2026-10-31
**Rol:** bravas
**URL base:** https://www.cloudbeds.com/es/plataforma-gestion-hotelera/
**Investigador:** subagente general-purpose

## 1. Overview — qué es Cloudbeds

Cloudbeds es una **plataforma unificada de gestión hotelera en la nube** fundada en 2012 en San Diego, hoy presente en más de **20.000 alojamientos en 150+ países**. Su diferenciador es que todos sus módulos (PMS, Channel Manager, Booking Engine, Pagos, Guest Experience, Revenue, Marketing) **comparten una única capa de datos** — se posicionan como "no un PMS más, un motor de crecimiento". Target: hoteles independientes y pequeñas cadenas (3-4 estrellas típicamente), hostels, B&Bs, apartamentos turísticos. Puntuación 4.4/5 en HotelTechReport sobre ~2.144 reviews. 2025-2026 están empujando fuerte su IA propia (**Cloudbeds Signals** — "el primer modelo IA fundacional de la hospitalidad") y su Spring 2026 Compass.

## 2. Arquitectura y módulos del producto

Cloudbeds se estructura en **4 pilares** más la capa IA/API transversal:

### Pilar A — Operaciones (core)
- **PMS (Property Management System)**: calendario rack-chart drag-and-drop, reservas, folios, check-in/out one-click, housekeeping, multi-propiedad, inventario de espacios (habitaciones + salas + cabañas en un solo calendario), gestión de grupos (hasta 4.000 habitaciones, 30 usuarios concurrentes), perfiles unificados de huésped.
- **Payments**: PCI DSS L1, PSD2/SCA, 3D Secure, tokenización, Apple/Google Pay, terminal físico, link de pago, dispute management automático. Dos modelos: Blended Rate (2.9%+$0.30) o Interchange Plus.
- **POS/TPV**: mencionado como módulo pero sin desarrollo profundo (sugiere que es ligero o vía integración).
- **Insights/Reportes**: dashboards con ocupación, ADR, RevPAR, revenue unificado multi-propiedad.

### Pilar B — Distribución
- **Channel Manager**: 450+ OTAs (Booking.com, Airbnb, Vrbo, Expedia, Agoda, Tripadvisor, GDS). Bidireccional 24/7, Express Connect para updates masivos, **sin comisiones**.
- **Booking Engine**: motor de reservas directas sin comisiones, flujo de 2 pasos, widget embebido en web del hotel, multi-idioma/moneda, upsells one-click, enlaces de reserva individuales, motor para grupos multi-propiedad.
- **Marketplace de partners**: 450+ integraciones pre-construidas (keycard, F&B, revenue externos, etc.).

### Pilar C — Experiencia del Huésped (Guest Experience)
- **Inbox unificado**: WhatsApp + SMS + email + chat OTAs en una sola bandeja, hilos linkados a reserva.
- **Chatbot IA**: web + WhatsApp + SMS, respuesta automática pre check-in / durante estancia.
- **Check-in digital**: pre check-in web/móvil + kiosco físico (Kiosk Mode en app).
- **Portal huésped**: self-service para ver reserva, pagar extras, pedir servicios.
- **Tareas y tickets**: "más toallas" se convierte automáticamente en una tarea asignada con contexto de habitación.
- **Alertas de sentimiento**: durante la estancia, si el sentimiento se vuelve negativo → alerta al staff linkada a la reserva.

### Pilar D — Revenue Marketing
- **RMS (Revenue Management)**: pricing dinámico, forecast 90 días, 95% precisión, comp-set, segmentación. Powered by Signals AI.
- **Guest Marketing CRM**: segmentación nativa (tipo habitación, gasto, historial, canal) → campañas sin exportar a Excel. Atribución real por reservas, no clics.
- **Marketing Digital (Amplify)**: metasearch (Google Hotel Ads integrado), PMax, retargeting.
- **Website Builder (CMS)**: sitios auto-generados desde datos del PMS.
- **Reputation Management**: monitoreo reviews multi-canal, respuestas asistidas por IA.

### Capa transversal
- **Cloudbeds Signals AI**: "única IA causal creada para hoteles", 4B+ puntos de datos procesados/hora.
- **API abierta**: 450+ integraciones.
- **Mobile app**: iOS/Android para staff (housekeeping, check-in/out, mensajería, pagos contactless, notificaciones push). Kiosk Mode para self check-in del huésped.
- **Infraestructura**: microservicios en AWS, 99.99% uptime, AES-256, TLS/SSL, SSO.

**Cómo se relacionan**: todo gira en torno a un único "modelo de reserva" (reservation object). Una edición de tarifa en el PMS → aparece en todos los canales al instante. Un pago → actualiza folio sin conciliación. Un mensaje de OTA → entra al inbox linkado a la reserva. Un huésped multi-propiedad → **un solo perfil**.

## 3. UX/UI observado

### Paleta oficial de marca (confirmada)
Fuente: brand guidelines oficiales + logotyp.us + search del design system.

| Nombre oficial | HEX | Uso |
|---|---|---|
| **Midnight / Navy** | `#001238` | Fondos oscuros, headings serios, nav primario, "profundidad y propósito" |
| **Dodger Blue** | `#3366FF` | Color de acción principal, botones, enlaces |
| **Blue (secondary)** | `#1D55CC` | Hover states, acentos secundarios |
| **Base Blue** | `#4DA4FF` | Acentos medios, highlights |
| **Sky** | `#BFDEFF` | Fondos de cards, estados hover suaves |
| **Shamrock (verde)** | `#32C0A0` | Estados positivos, success, confirmados |
| **White** | `#FFFFFF` | Fondo principal |

**Colores de soporte** (categóricos, para gráficos y badges):
- **Tea** (verde más cálido) — positivo
- **Crush** (naranja) — warning / atención
- **Haze** (púrpura) — categoría neutra / insights

### Paleta semántica de HOUSEKEEPING (CRÍTICA para Bravas)
Los nombres son del propio design system de Cloudbeds:
- **Mint** (verde pastel) = **Inspected** (habitación lista, inspeccionada por supervisor)
- **Lightning** (celeste/azul claro) = **Clean** (limpia pero sin inspeccionar)
- **Dusk** (azul grisáceo oscuro) = **Dirty** (requiere limpieza)
- **Solar** (naranja/amarillo) = **Out of service** (fuera de servicio / mantenimiento)

Esta paleta se usa **consistentemente** en la tabla de inspección, la grilla del calendario y los paneles de detalle de unidad.

### Tipografía oficial
- **Host Grotesk** (sans-serif moderna) — headlines, subheads y body. Pesos: Light, Regular, Semi-bold. Es la workhorse del sistema (equivalente a Inter / Satoshi).
- **Stix Two Text** (serif refinada) — para pull-quotes editoriales y materiales de marca más literarios (no para UI operacional).

Para una app operacional, **Host Grotesk cubre el 100%**.

### Layout e Information Architecture del PMS
Confirmado desde el help center:
- **Main Menu**: icono hamburguesa arriba a la izquierda — acceso a módulos (Dashboard, Calendar, Reservations, Housekeeping, Reports, Settings, etc.).
- **Top Menu**: barra superior siempre visible — accesos rápidos: crear reserva, buscar reserva, ir al calendar.
- **Account Menu**: arriba derecha — perfil, settings de propiedad, Help.
- **Dashboard** = landing page por defecto. Muestra arrivals/departures del día, in-house, ocupación en tiempo real, booked overview por rango de fechas.
- **Calendar (rack chart)**: filas = habitaciones agrupadas por tipo, columnas = días. Reservas = barras horizontales que cruzan días. **Drag-and-drop** para mover reservas entre habitaciones y fechas. Click en celda abre **drawer** (panel lateral derecho) sin perder contexto del calendar.
- **Unit detail panel** (dentro del calendar): housekeeping condition, room status, front-desk status, staff asignado, comentarios de la unidad.
- **Reservation Details Drawer**: panel lateral comprehensivo con folio, notas, documentos del huésped, pagos — todo sin salir del calendar.

### Densidad e identidad visual
- Densidad **media-alta operacional, limpia en marketing**. En la web pública: mucho whitespace, hero grandes, mockups abstractos. En la app real: densidad tipo Linear/Mews, no SAP — información compacta pero jerárquica, no abigarrada.
- Botones: pill/radio-rounded, azul primario sobre fondos claros, blancos sobre azul oscuro.
- Cards con sombras suaves, bordes mínimos.
- Iconografía: lineart ligero (stroke 1.5-2px), estilo moderno.
- Tabs y secciones con bordes inferiores, no cajas pesadas.

### Mobile app
iOS (iOS 12.4+) y Android (5.0+). Soporta: housekeeping (actualizar room status desde el móvil), check-in/out, inbox mensajería, dashboard con occupancy meter en tiempo real, notas rápidas, pagos contactless, notificaciones push. **Kiosk Mode**: convierte el iPad/tablet en kiosco de self check-in para el huésped.

### Marketing site — observaciones
- Hero con headline grande (Host Grotesk Semi-bold), subheadline en Regular, dos CTAs lado a lado ("Agendar demo" primario azul + "Explorar plataforma" ghost).
- Secciones alternadas texto-imagen 50/50.
- Métricas tipo "+25%", "88%", "4B+" en tamaño XL para generar impacto.
- Carrusel de logos de clientes (Bespoke, Preferred, Charlie, Safestay).
- Diagrama "flywheel" circular mostrando cómo los módulos se conectan.
- Badges de premios y certificaciones (HTR, Deloitte, PCI, GDPR) en footer.

## 4. Features destacables (top 15)

1. **Edición única propaga a todo**. Cambiás una tarifa en el PMS y aparece en 450+ canales al instante — único punto de verdad.
2. **Inbox unificado linkado a reserva**. WhatsApp + SMS + email + chat OTAs en una bandeja, con contexto completo del huésped.
3. **Perfil único multi-propiedad**. El mismo huésped en Hotel A y Hotel B = un solo perfil con historial consolidado.
4. **Housekeeping con 4 estados cromáticos**. Mint/Lightning/Dusk/Solar — consistencia en app, calendar y tabla.
5. **Kiosk Mode (self check-in)**. La misma app para staff se convierte en kiosco físico para el huésped — ahorra hardware.
6. **Chatbot IA multicanal**. Web + WhatsApp + SMS, pre-estancia y durante.
7. **Alertas de sentimiento en tiempo real**. Detecta negatividad en mensajería → alerta al staff con contexto de reserva.
8. **Signals AI**. Modelo propio entrenado en datos hoteleros, 95% precisión forecast, 4B+ puntos/hora.
9. **Google Hotel Ads sin Hotel Center**. Launchean metasearch en minutos desde el propio Cloudbeds.
10. **Conciliación automática de pagos**. 90% menos tiempo en reportes de pagos, <1 contracargo/mes promedio.
11. **Website Builder auto-poblado**. El CMS toma datos del PMS (habitaciones, fotos, políticas) y arma el sitio.
12. **Group booking engine multi-propiedad**. Búsqueda across portfolio con disponibilidad real-time, cero overbooking.
13. **Marketplace 450+ integraciones**. API abierta + partners pre-conectados (keycard, F&B, external RMS).
14. **Reporting unificado multi-propiedad**. Ocupación/ADR/RevPAR calculados coherentemente para cadenas.
15. **Compliance España**: integración gratuita a SES.HOSPEDAJES + Verifactu vía Fiskaly + export manual INE (ARCE, ISTAC).

## 5. Target, pricing y diferenciadores

### Target
- **Sweet spot**: hoteles independientes 10-100 habitaciones, hostels, B&Bs, apartamentos turísticos, pequeñas cadenas multi-propiedad.
- **Geografía**: global, pero fuerte en Europa, LATAM, EEUU. Sitio en 5 idiomas (ES/EN/FR/PT-BR/TH).
- **Mal fit**: operaciones no estándar, estructuras tarifarias muy complejas, hoteles de lujo con flujos custom (ahí ganan Opera/Mews).

### Pricing (opaco pero inferible)
- **Modelo quote-based**, no público. 4 planes: **Flex / One / Experience / Enterprise**.
- Rango real observado: **$120-$600+/mes** por propiedad según tamaño.
- Benchmark concreto: **~165 EUR/mes (~$180 USD) para una propiedad de 15 habitaciones** (fuente: comparativa HotelGest 2026).
- **Comisiones**: 0% en Booking Engine y Channel Manager (solo cobra en metasearch, post-estancia).
- **Payments**: 2.9% + $0.30 blended o Interchange Plus.
- **Implementación**: $200 a $5.000+ según complejidad.
- **Add-ons separados**: Revenue Intelligence, Guest CRM, Amplify, Website, Reputation.

### Diferenciadores de marketing / "wow factor"
- **"No es un PMS. Es un motor de crecimiento"** — el posicionamiento rechaza la categoría commodity.
- **"Edita una tarifa y aparece en todas partes. Al instante."** — frase bandera que resume la unificación.
- **"La primera IA fundacional de la hospitalidad"** — Signals como moat competitivo.
- **"Sin comisiones"** — directo al bolsillo del hotelero vs competidores que cobran %.
- **4B+ datos/hora, 95% forecast, 99.99% uptime** — números a tamaño XL en la home.
- **Preferred Partner badges**: Airbnb, Expedia Elite 2026, Booking.com Preferred 2025 — prueba social institucional.

## 6. Compliance España

Cobertura **parcial** — Cloudbeds hace lo mínimo necesario pero no es un software nativo español como Hotelgest, Mastercloud o Noray. Esto es un **gap que Hotel Bravas puede explotar** si el cliente es español.

### Lo que SÍ cubre
- **SES.HOSPEDAJES** (RD 933/2021, obligatorio desde dic 2024): integración **gratuita**, genera dos reportes diarios — *Partes de Viajeros* + *Reservas de Hospedajes* — para Guardia Civil / Policía Nacional / Mossos / Ertzaintza. Datos tomados del PMS (DNI/pasaporte, nacionalidad, fecha nacimiento, dirección, fechas estancia, medio de pago).
- **Verifactu** (obligatorio desde 1 jul 2025): integración vía **Fiskaly** — E-Invoicing + Groups E-Invoicing certificada.
- **INE** (Encuesta Ocupación): **export manual** de reportes ARCE e ISTAC (mensual). *No es automático*.
- **Catalunya**: página dedicada con requisitos autonómicos.
- **GDPR/RGPD**: cifrado AES-256, SSO, política de datos, badges en footer.
- **Partner Chekin**: para reportes policiales como alternativa.

### Lo que NO cubre bien
- Envío automático SES Hospedajes no es nativo — es una integración "best effort". Comparativas españolas lo marcan como punto flojo frente a competidores locales.
- **Llaves electrónicas**: no es feature integrada, requiere integración.
- **INE automático**: no, es manual.
- **Modelo 040/345**: no mencionado.
- **No está diseñado para el marco legal español** — es global primero, España se adaptó después.

## 7. Recomendaciones concretas para HOTEL BRAVAS (corto plazo)

Para pasar el demo F1 de "infantil" a "3-4 estrellas profesional serio":

1. **Adoptá la paleta Cloudbeds o derivada**. Fondo blanco limpio, Midnight `#001238` para headings/nav, Dodger Blue `#3366FF` como acción primaria, Shamrock `#32C0A0` para estados positivos. Rechazá colores saturados o pasteles infantiles.
2. **Housekeeping con los 4 estados Mint/Lightning/Dusk/Solar**. Es LA convención del sector — adoptala idéntica (verde pastel = inspected, celeste = clean, azul grisáceo = dirty, naranja = out of service). Esto solo ya hace que la UI se vea profesional de inmediato.
3. **Tipografía Host Grotesk** (free en Google Fonts como alternativa cercana a Inter o Satoshi — pueden usar directamente Host Grotesk vía Fontshare). Pesos Light/Regular/Semi-bold. Sacar cualquier font redondeada o "friendly" (Comic, Nunito con mucho round).
4. **IA del PMS replicable**: Main Menu lateral (hamburguesa arriba izq) + Top Menu con acciones rápidas (nueva reserva, buscar, calendar) + Account Menu arriba derecha. Dashboard como landing con widgets de arrivals/departures/in-house/occupancy.
5. **Patrón de drawer lateral derecho** para detalles. Click en reserva/habitación → se abre panel sin tapar el contexto. Esto es moderno, replica Linear/Notion, y Cloudbeds lo usa consistentemente.
6. **Calendar rack-chart drag-and-drop** si lo vas a mostrar. Filas = habitaciones agrupadas por tipo, columnas = días, barras horizontales = reservas. Es el visual más icónico del sector — si falta se nota.
7. **Portal Huésped con flujo de 2 pasos**. Minimalista, mobile-first, selector de fechas grande, upsells one-click, pago sin salir del flujo.
8. **Portal Cocina**: pensalo como Kitchen Display con tickets tipo card, estados con colores de la paleta semántica (dusk=pendiente, lightning=en preparación, mint=listo).
9. **Portal Admin / Dashboard**: widgets con KPIs grandes (ocupación %, ADR, RevPAR, revenue hoy) en Host Grotesk Semi-bold tamaño XL. Carrusel de arrivals/departures del día.
10. **Compliance España visible como feature destacado**. SES.HOSPEDAJES, Verifactu, INE — mencionarlos explícitamente en el demo porque es el gap más claro de Cloudbeds para un cliente español. Hacé que esto sea el "wow local" vs Cloudbeds.

## 8. Recomendaciones para APP SaaS hotelera standalone (largo plazo)

Estructura canónica para un vertical hotelero completo tipo Octo-RRHH-pero-para-hoteles:

### Núcleo (MVP)
- **PMS**: calendar rack-chart, reservas, folio, check-in/out, grupos.
- **Housekeeping**: 4 estados cromáticos + app camareras + fotos/notas + mantenimiento + lost & found.
- **Perfil huésped unificado**: un ID por persona, historial multi-estancia, preferencias, documentos (DNI/pasaporte).
- **Multi-propiedad desde día 1**: aunque el cliente arranque con una, la data model tiene que soportar N propiedades.

### Distribución
- **Channel Manager**: Booking.com + Airbnb + Expedia como mínimo. Sync bidireccional, cero overbooking.
- **Booking Engine directo**: widget embebible, multi-idioma (ES/EN mínimo), multi-moneda, mobile-first.
- **Website Builder (nice to have)**: CMS auto-poblado desde el PMS.

### Experiencia del huésped
- **Portal huésped**: pre-check-in (datos DNI, hora llegada), ver reserva, pagar extras, pedir servicios.
- **Mensajería unificada**: WhatsApp (crítico en España) + email + SMS, hilos por reserva.
- **Chatbot IA**: para FAQs y pre-check-in automático.
- **Check-in digital + Kiosk Mode**: self-service en recepción.
- **Portal cocina**: KDS para pedidos de restaurante/room service.
- **Portal limpieza**: ya lo tenés en F1 — reforzarlo con app móvil nativa o PWA.

### Revenue + Marketing
- **RMS/Pricing dinámico**: forecast de demanda, recomendaciones de tarifas. V1 puede ser reglas simples, V2 ML.
- **Guest CRM**: segmentación, campañas email/WhatsApp automatizadas, atribución real.
- **Reputation**: ingesta de reviews multi-portal, respuestas asistidas.
- **Reportería**: ocupación, ADR, RevPAR, GOPPAR, pickup, cancellation rate, no-shows.

### Compliance España (diferencial fuerte)
- **SES.HOSPEDAJES nativo y automático** — no manual, no "export CSV". Cada check-in dispara el envío.
- **Verifactu / factura electrónica** integrada (vía Fiskaly u otro certificador).
- **INE automático**: ARCE/ISTAC generados y enviados sin intervención.
- **Modelo 040/345** cuando aplique.
- **RGPD by design**: consentimientos granulares, derecho al olvido, portabilidad.
- **Firma biométrica** en check-in digital (requerida por SES Hospedajes).

### Infraestructura
- **API pública** desde día 1 — otros SaaS se van a conectar.
- **Mobile apps nativas o PWA**: una app para staff (housekeeping, F&B, recepción), kiosk mode, portal huésped mobile-first.
- **Multi-tenancy sólido**: multi-propiedad, multi-usuario con roles granulares (admin, recepción, limpieza, cocina, revenue manager, propietario).
- **IA transversal**: no un chatbot aislado, sino un copiloto que se integra en pricing, mensajería, operaciones.

### Diferenciadores vs Cloudbeds
- **Compliance España nativo** (su mayor hueco).
- **UX más limpia y moderna** (Cloudbeds tiene legacy, reviews se quejan del calendar).
- **Pricing transparente** (otro hueco de Cloudbeds).
- **Soporte en español real** (los reviews se quejan de respuestas copy-paste).
- **Vertical en español/mediterráneo** vs global generalista.

---

## Fuentes
- https://www.cloudbeds.com/es/plataforma-gestion-hotelera/
- https://www.cloudbeds.com/es/
- https://www.cloudbeds.com/es/property-management-system/
- https://www.cloudbeds.com/es/channel-manager/
- https://www.cloudbeds.com/es/booking-engine/
- https://www.cloudbeds.com/es/pricing/
- https://www.cloudbeds.com/es/features/payments/
- https://www.cloudbeds.com/es/features/
- https://www.cloudbeds.com/government-compliance/spain/
- https://myfrontdesk.cloudbeds.com/hc/en-us/articles/40009042536347-How-to-use-Spain-Police-Report-SES-HOSPEDAJES
- https://www.cloudbeds.com/wp-content/uploads/2025/11/Cloudbeds-Brand-Guidelines.pdf
- https://logotyp.us/logo/cloudbeds/
- https://www.hotelminder.com/partner=Cloudbeds
- https://hotelgest.com/blog/mews-vs-cloudbeds-comparativa-detallada-para-hoteles-en-2026
- https://myfrontdesk.cloudbeds.com/hc/en-us/articles/216540808-Housekeeping-room-conditions
- https://myfrontdesk.cloudbeds.com/hc/en-us/articles/48372183498907-Getting-Started-with-the-New-Cloudbeds-Calendar
- https://apps.apple.com/us/app/cloudbeds/id1671866717
