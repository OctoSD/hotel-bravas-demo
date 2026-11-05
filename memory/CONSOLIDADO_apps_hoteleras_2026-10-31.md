# Consolidado — Arquitectura, UX y features de 6 apps hoteleras

**Fecha:** 2026-10-31
**Rol:** bravas
**Autor:** Claude (opus 4.7)
**Propósito:** síntesis cruzada de las 6 investigaciones individuales para pasar a `arquitecto`. Base para rediseñar Hotel Bravas (demo F1 → v2 con estándares profesionales de hotel 3-4★).

**Apps analizadas:**
1. [Cloudbeds](./investigacion_cloudbeds_2026-10-31.md) — PMS all-in-one global, 20k alojamientos
2. [ThinkReservations](./investigacion_thinkreservations_2026-10-31.md) — PMS boutique US, premio "Hotel PMS of the Year 2026"
3. [Flexxus Hoteles](./investigacion_flexxus_2026-10-31.md) — ERP argentino con módulo hotelero
4. [Clientify](./investigacion_clientify_2026-10-31.md) — CRM+IA+WhatsApp genérico (patrón conversacional)
5. [Omnibees](./investigacion_omnibees_2026-10-31.md) — Channel manager líder LATAM
6. [PxSol](./investigacion_pxsol_2026-10-31.md) — Suite hotelera argentina, 1.800 alojamientos LATAM

---

## 0. Resumen ejecutivo (una página)

**Lo que aprendimos:**
Un software hotelero profesional tiene **~16 módulos agrupados en 6 capas** (operaciones, distribución, monetización, pagos/fiscal, experiencia huésped, back office). Ningún jugador los cubre perfecto — todos tienen gaps. Los dos "wow factor" que ningún competidor en el espacio hispano/mediterráneo resuelve bien son: **(a) UX cloud-moderna real** (los PMS LATAM son densos tipo ERP; los globales son correctos pero sin alma); **(b) compliance España nativo automático** (SES.Hospedajes, Verifactu, INE sin fricción).

**Lo que define que una app "parezca de hotel 3-4★ serio":**
- Paleta sobria (navy/midnight + azul acción + verde success) o cálida (navy + crema/cobre), nunca pasteles saturados.
- Tipografía sans profesional (Host Grotesk / Inter / IBM Plex) + opcional serif editorial para brand.
- **Rack chart** horizontal como pantalla central del admin (filas = habitaciones, columnas = días, barras drag&drop).
- **Housekeeping con 4 estados cromáticos** convencionales del sector (verde=inspected, celeste=clean, azul grisáceo=dirty, naranja=OOS).
- **Drawer lateral** para detalle de reserva (no abrir pantalla nueva).
- **Densidad media-alta pero ordenada** (filas 32-40px, no 64px).
- **Mobile-first** para portales operativos (housekeeping, cocina), desktop-first para admin.

**Lo que va a diferenciar a Bravas v2 vs el resto:**
1. Portales por rol **nativamente separados** (ya lo tenés en F1, hay que sostenerlo con UX adulta).
2. UX cloud-moderna real (nadie en PyME España/LATAM lo hace bien).
3. Compliance España automático (gap de Cloudbeds, PxSol, ThinkReservations, Flexxus — todos cojean acá).
4. WhatsApp-first para huésped (nadie lo tiene profundo salvo Clientify, que no es hotelero).
5. F&B / cocina-salón nativo (ThinkReservations no lo tiene, es ventana abierta).

**Decisiones a tomar antes de construir v2:** geografía primaria (España vs LATAM vs ambas), stack técnico, modelo de pricing (publicado vs quote-based), alcance F2 (demo visual bonito vs backend funcional con fake data vs mock interactivo).

---

## 1. Tabla comparativa de las 6 apps

| App | Tipo | Target | Alcance | Pricing | UX | Compliance ES |
|---|---|---|---|---|---|---|
| **Cloudbeds** | PMS all-in-one | 10-100 hab, global | 4 pilares + 450 integraciones | $120-600/mes opaco | Media-alta, moderna | SES + Verifactu + INE manual |
| **ThinkReservations** | PMS boutique | 1-99 hab, US B&B/boutique | 9 módulos integrados | $10/hab/mes mín $50 | Densa pero legible, "dated" | Cero (US-first) |
| **Flexxus** | ERP con módulo hotel | PyME AR 3-4★ | ERP + POS + apps + 100 impl. hoteleras | Pub. ARS/user/mes | Desktop Office-like, denso | AR AFIP, no ES |
| **Clientify** | CRM+IA+WhatsApp (NO hotelero) | PyMEs hispanas 1-50 agentes | 3 productos + IA transversal | €39-65/seat plan único | Moderna, dashboard-driven | RGPD + ISO 27001 + DPO AEPD |
| **Omnibees** | Channel manager + suite | 20-200 hab + cadenas LATAM | 13 módulos distrib+monetiz | Opaco B2B | Enterprise índigo denso | LGPD + GDPR implícito |
| **PxSol** | Suite all-in-one LATAM | 10-150 hab PyMEs LATAM | 16 módulos modulares | Pub. ARS/mes por módulo | Corporate flat denso | AFIP/SII/Siigo, no ES |

**Lectura rápida:**
- **Cloudbeds + ThinkReservations** = referencias de UX/UI y arquitectura all-in-one.
- **PxSol** = modelo de ecosistema modular con precios publicados a imitar (y referencia de competidor directo si vamos LATAM).
- **Omnibees** = referencia solo para el módulo channel manager (es su core).
- **Clientify** = referencia para el módulo "comunicaciones con huésped" (chat + IA + WhatsApp).
- **Flexxus** = anti-referencia (lo que NO queremos ser) + referencia de back office.

---

## 2. Arquitectura canónica de un SaaS hotelero (16 módulos / 6 capas)

Síntesis destilada de los 6 reportes. Esta es la **estructura de referencia** que Bravas debería tener en mente a 3-5 años.

```
┌──────────────────────────────────────────────────────────────────┐
│  CAPA 1 — CORE OPERATIVO                                          │
│  1. PMS (reservas, folios, check-in/out, grupos)                 │
│  2. Rack chart / tape chart (disponibilidad temporal)             │
│  3. CRM huésped 360 (perfil único multi-estancia)                │
├──────────────────────────────────────────────────────────────────┤
│  CAPA 2 — DISTRIBUCIÓN                                            │
│  4. Booking Engine white-label                                    │
│  5. Channel Manager (OTAs + GDS + B2B wholesale)                  │
│  6. Rate parity monitor + metasearch (Google Hotel Ads, Trivago)  │
├──────────────────────────────────────────────────────────────────┤
│  CAPA 3 — MONETIZACIÓN                                            │
│  7. RMS / pricing dinámico (ideal: con IA)                        │
│  8. Upsell / cross-sell engine                                    │
│  9. Portal B2B (venta a agencias) — opcional                      │
├──────────────────────────────────────────────────────────────────┤
│  CAPA 4 — PAGOS Y FISCAL (vertical por geografía)                 │
│  10. Pasarela pagos local (Redsys/Bizum ES, MercadoPago LATAM,    │
│      Stripe global, PCI L1, 3DS/SCA)                              │
│  11. Facturación electrónica nativa                               │
│      (Verifactu ES, AFIP AR, SII CL, Siigo CO, etc.)              │
│  12. Conciliación bancaria                                        │
├──────────────────────────────────────────────────────────────────┤
│  CAPA 5 — OPERACIONES NO-HABITACIÓN                               │
│  13. POS F&B con KDS, cargo a habitación, mesas, comandas         │
│  14. Housekeeping móvil (4 estados cromáticos)                    │
│  15. Mantenimiento + tickets                                      │
├──────────────────────────────────────────────────────────────────┤
│  CAPA 6 — EXPERIENCIA Y CRECIMIENTO                               │
│  16. Guest app sin descarga (QR/link, check-in digital,           │
│      upsell, pedidos, mensajería)                                 │
│  17. Inbox omnicanal staff (WhatsApp + email + SMS + chat OTA)    │
│  18. Marketing suite (email, WhatsApp broadcast, campañas, ads)   │
│  19. Reputation (reviews, respuestas IA)                          │
│  20. Website builder — opcional                                   │
└──────────────────────────────────────────────────────────────────┘

┌──── CAPAS TRANSVERSALES ──────────────────────────────────────────┐
│  • Automation engine (if-this-then-that) — pegamento entre        │
│    módulos (ThinkReservations lo llama "Automatic Task Rules")    │
│  • IA transversal con acceso al modelo de datos (patrón PxSol +   │
│    Clientify, no chatbot externo)                                 │
│  • API pública + webhooks desde día 1 (Mews ganó contra           │
│    Cloudbeds con esto; ningún PMS LATAM lo tiene bien)            │
│  • Role-based portals (ya en F1 — mantener)                       │
│  • Audit log inmutable por folio (compliance + disputas)          │
│  • i18n/l10n modular (compliance país = plugin, no hardcoded)     │
└───────────────────────────────────────────────────────────────────┘
```

**Priorización pragmática para Bravas v2 (6 meses):**
1. Capa 1 completa (PMS + rack + CRM 360).
2. Capa 5 completa (POS F&B + housekeeping + mantenimiento).
3. Capa 6 — guest app + inbox omnicanal mínimo (WhatsApp + email).
4. Capa 4 — Verifactu/SES.Hospedajes (si target España) + Stripe/Redsys.
5. Capa 2 — booking engine propio. Channel manager vía integración (SiteMinder/Hotelbeds), NO construir propio.
6. Capa 3 y resto de 6 → fases posteriores.

---

## 3. UX/UI — síntesis de patrones a adoptar

### 3.1 Paleta — qué usan y qué proponemos

| App | Paleta primaria | Vibe |
|---|---|---|
| Cloudbeds | Midnight `#001238` + Dodger Blue `#3366FF` + Shamrock `#32C0A0` | SaaS moderno profesional |
| ThinkReservations | Azul celeste/turquesa + blanco + fotos cálidas | Boutique US clean |
| Flexxus | Navy corporate + rojo/naranja acento | ERP argentino tradicional |
| Clientify | Negro #1a1a1a + verde turquesa #00D084 + gradientes | Startup SaaS marketing-driven |
| Omnibees | Índigo oscuro #302681 + rojo #b50027 + amarillo #fabd00 | Enterprise LATAM "banca" |
| PxSol | Azul + violeta sobre blancos | Corporate flat sobrio |

**Patrón del sector:** navy/midnight profundo + un azul acción + un verde success. Es la convención.

**Propuesta Bravas v2 (dos opciones a elegir con Daniel):**

**Opción A — "SaaS Profesional" (más Cloudbeds)**
- Primario: `#0F1F3D` (navy profundo, serio)
- Acción: `#2563EB` (azul vivo)
- Success: `#059669` (verde esmeralda)
- Warning: `#D97706` (ámbar)
- Fondos: `#FFFFFF` + `#F8FAFC` (gris muy claro)
- Vibe: profesional, cloud-moderno, universal

**Opción B — "Boutique Hospitality" (más cálido, diferenciable)**
- Primario: `#1F3A2E` (verde bosque profundo) o `#2D2A24` (marrón café)
- Acción: `#B87333` (cobre) o `#C9A961` (mostaza suave)
- Success: `#2D7A4F`
- Warning: `#C97A1C`
- Fondos: `#FAF7F2` (marfil cálido) + blancos
- Vibe: hospitality establecida, no "SaaS", más Soho House / Ace

**Paleta semántica de housekeeping (OBLIGATORIO adoptar — es la convención del sector):**
- **Verde pastel (`#A7F3D0` o `#86EFAC`)** = Inspeccionada / Lista
- **Celeste (`#BAE6FD` o `#7DD3FC`)** = Limpia
- **Azul grisáceo (`#64748B` o `#475569`)** = Sucia
- **Naranja/amarillo (`#FBBF24` o `#F59E0B`)** = Fuera de servicio / mantenimiento

Esto se usa consistentemente en todas las vistas (tape chart, lista housekeeping, panel detalle). Es el "cómo se ve un PMS profesional".

### 3.2 Tipografía

**Patrón del sector:**
- Headlines: sans-serif moderna o serif editorial.
- UI/body: sans-serif legible.

**Propuesta Bravas v2:**
- **Opción A (SaaS):** `Inter` (free, Google Fonts) o `Host Grotesk` (Fontshare, la de Cloudbeds). Pesos: Light / Regular / Semi-bold / Bold.
- **Opción B (boutique):** combo serif + sans — `Fraunces` o `Instrument Serif` para headlines y brand + `Inter` o `DM Sans` para UI. Esta dupla es el patrón de hoteles de marca.
- **Tamaños UI:** base 14px, headings 18-24px, display 32-48px. Nada mayor a 48 en UI operacional.
- **Densidad de filas:** 32-40px por fila en tape chart y tablas (no 56-64px). El operador quiere ver mucha info de un vistazo.

### 3.3 Layout e Information Architecture (patrón canónico)

Confirmado idéntico en Cloudbeds + ThinkReservations + PxSol + Clientify (en su versión):

```
┌─────────────────────────────────────────────────────────────┐
│ TOP MENU (barra superior fija)                              │
│   [☰ Main Menu]  [Logo]  [Quick actions]    [Account ▾]    │
├──────┬──────────────────────────────────────────────────────┤
│      │                                                       │
│      │                                                       │
│ SIDE │           ÁREA PRINCIPAL                              │
│ NAV  │           (Dashboard / Calendar / Reservas /         │
│      │            Housekeeping / Reports / Settings)         │
│      │                                                       │
│      │                                                       │
└──────┴──────────────────────────────────────────────────────┘

Click en reserva/habitación → se abre DRAWER lateral derecho
(panel ~400-500px) con detalle completo. NO modal. NO pantalla nueva.
```

**Elementos clave:**
- **Main Menu**: hamburguesa arriba izquierda. Módulos como ítems de nav.
- **Top Menu**: barra superior fija con acciones rápidas (nueva reserva, buscar, ir a calendar).
- **Account Menu**: avatar arriba derecha con perfil/settings/help/logout.
- **Dashboard** como landing: widgets de arrivals/departures/in-house/ocupación.
- **Drawer lateral derecho** para detalle: todo en el mismo plano, cero rebote.
- **Legend hover** para explicar colores/iconos sin ensuciar la UI.

### 3.4 Patrones de pantalla específicos (los que hay que replicar)

**1. Rack chart / Tape chart (pantalla central del admin)**
- Filas: habitaciones agrupadas por tipo. Columna housekeeping (H) al margen izquierdo con cuadrado de color según estado.
- Columnas: días (visibles 14-28 con scroll).
- Reservas: barras horizontales que cruzan días, color según estado + iconos pequeños (pago pendiente, OTA source, VIP, grupo).
- Drag & drop: mover reservas entre habitaciones o fechas, con feedback visual (borde azul en celdas destino, warning si hay conflicto).
- Click: abre drawer lateral con detalle completo (folio, pagos, mensajes, tasks, huésped).

**2. Calendar360 / Matriz ARI (vista de disponibilidad y tarifas)**
Diferente del rack: filas = tipos de habitación (no habitaciones individuales), columnas = días. Cada celda muestra disponibilidad + tarifa, color por estado (verde=disponible, amarillo=pocas, rojo=agotado/stop sale). Toggle "vista por canal" vs "consolidada". Patrón universal de channel manager (Omnibees, SiteMinder, Cloudbeds).

**3. Housekeeping board (vista limpieza)**
- **Desktop:** tabla con habitación / piso / estado (4 colores) / housekeeper asignada / tiempo transcurrido / check-out previsto / notas.
- **Mobile (app housekeeper):** lista plana de habitaciones del día, un botón grande por habitación con el estado actual, tap → siguiente estado. Botón "subir foto" para incidencias. Botón "reportar daño" para mantenimiento.

**4. Inbox omnicanal (patrón 3 columnas de Clientify + Cloudbeds)**
- **Izq (300px):** lista de conversaciones con filtros (canal, estado, responsable). Avatar + nombre + snippet + chip canal + badge no-leído.
- **Centro (flex):** burbujas de chat estilo WhatsApp. Barra superior con nombre + estado + acciones. Barra inferior con composer + templates + emoji + adjuntos. **Sugerencias IA aparecen como bloque gris encima del composer.**
- **Der (350px):** ficha 360 del huésped (reserva actual, histórico, consumos, preferencias, botones IA "ver resumen" / "ver preferencias" / "preparar check-in").
- **Notas internas inline** en el chat (visibles solo al staff).

**5. Portal huésped (3 pantallas máximo)**
- Mobile-first, PWA (no descarga).
- Flujo: QR → login mínimo (número reserva + email) → home con 3-4 acciones principales (ver reserva, pedir servicio, chat, check-out express).
- Burbujas de chat estilo WhatsApp.
- Foto-first para habitaciones y amenities.

**6. KDS cocina (comandas)**
- Tickets grandes tipo card, uno por mesa/habitación.
- Estados color-coded con la paleta semántica (dusk=pendiente, lightning=en preparación, mint=listo).
- Tipografía grande, legible desde distancia.
- Timer por ticket (cuánto hace que entró).
- Mobile-first (tablet montada en cocina).

**7. Dashboard admin**
- Widgets de KPIs grandes: ocupación %, ADR, RevPAR, revenue hoy, pace vs. previo.
- Carrusel arrivals/departures del día (próximos check-ins/outs).
- Gráficos reales (sparklines, barras, donut source mix). **Esto es lo que ThinkReservations no tiene y le llueven críticas.**
- Alertas: habitaciones sin asignar, pagos pendientes, mensajes sin responder.

### 3.5 Elementos UX distintivos (los robamos todos)

- **Automatic Task Rules** (ThinkReservations): if-this-then-that para generar tareas automáticas. Ej: "reserva con desayuno → task 'preparar desayuno 7am' para housekeeping". Este patrón resuelve el portal cocina/salón de Bravas.
- **Sugerencias IA en composer** (Clientify): bloque gris encima del input de chat con "Usar / Editar / Descartar".
- **Toggle IA global** (Clientify "Superinteligencia"): switch arriba a la derecha activa/desactiva IA en toda la UI.
- **Transparencia IA**: chip pequeño "respondido por IA" vs humano; mostrar créditos antes de ejecutar acción pesada.
- **Alertas de sentimiento** (Cloudbeds): detecta negatividad en mensajería → alerta al staff.
- **Kiosk Mode** (Cloudbeds): la misma app staff → kiosco físico de self-check-in. Ahorra hardware.
- **Perfil único multi-propiedad** (Cloudbeds): el mismo huésped en Hotel A y Hotel B = un ID.
- **Split folios** (ThinkReservations): dividir el cargo entre huéspedes/empresas.
- **Rules-based room assignments**: asignación automática por piso, repartir ocupación, preferencias.
- **Comparador tarifa directa vs OTA** (PxSol) en el booking engine.
- **Calculadora ROI inline** (Omnibees) en landing marketing — gran gancho de conversión.
- **Páginas /alternativas/<competidor>** (PxSol): SEO play probado.

---

## 4. Features consolidadas — top 25 (ranking por aparición y peso)

Agrupadas por capa. Las que aparecen en 3+ de las 6 apps analizadas se marcan ★.

### Operación core
1. ★ **Rack chart / tape chart drag&drop con color-coded** (Cloudbeds, ThinkReservations, PxSol, Omnibees)
2. ★ **Housekeeping con 4 estados cromáticos convencionales** (Cloudbeds + estándar sector)
3. ★ **Split folios** (ThinkReservations, Cloudbeds, PxSol)
4. ★ **Rules-based room assignments** (ThinkReservations, Cloudbeds)
5. ★ **Automatic task rules** (ThinkReservations, implícito en PxSol via IA)
6. **Perfil único multi-propiedad** (Cloudbeds)
7. **Night audit automatizado** (ThinkReservations, PxSol)

### Distribución
8. ★ **Channel manager bidireccional 20-450 OTAs** (Cloudbeds, Omnibees, PxSol, ThinkReservations)
9. ★ **Booking engine propio sin comisión** (Cloudbeds, PxSol, Omnibees, ThinkReservations)
10. **Rate parity automática** (Omnibees, Cloudbeds)
11. **Metasearch integrado (Google Hotel Ads)** (Cloudbeds, Omnibees)

### Monetización
12. ★ **RMS con IA / pricing dinámico** (Cloudbeds Signals, PxSol RMS, Omnibees Bee Price)
13. **Upsell / add-ons con tasks derivadas** (ThinkReservations, Cloudbeds, PxSol)

### Pagos y fiscal
14. ★ **PCI L1 + 3DS/SCA + tokenización** (todos los serios)
15. ★ **Apple Pay / Google Pay / BNPL** (Cloudbeds, ThinkReservations, PxSol)
16. **Facturación electrónica nativa** (PxSol AFIP/SII/Siigo, Cloudbeds via Fiskaly, Flexxus AFIP)

### Experiencia huésped
17. ★ **Guest app sin descarga (QR/link)** (Cloudbeds Kiosk, PxSol Huésped+)
18. ★ **Check-in digital pre-llegada** (Cloudbeds, ThinkReservations, PxSol)
19. ★ **Inbox omnicanal (WhatsApp + email + SMS + OTAs)** (Cloudbeds, PxSol, Clientify)
20. **Chatbot IA 24/7** (Cloudbeds, PxSol, Clientify)
21. **Alertas de sentimiento en tiempo real** (Cloudbeds)
22. **Sugerencias de respuesta IA en composer** (Clientify, Cloudbeds)

### Back office + analytics
23. ★ **Dashboard con RevPAR/ADR/ocupación** (todos los PMS)
24. **BI con benchmarking de mercado** (Omnibees HiQ)
25. **Export a software contable local** (Flexxus a varios, ThinkReservations a QuickBooks)

---

## 5. Compliance España — checklist unificado para Bravas

Síntesis de lo que surgió en todos los reportes. Para operar un hotel en España:

| Requisito | Qué es | Prioridad Bravas |
|---|---|---|
| **SES.HOSPEDAJES** | Parte digital de viajeros al Min. Interior (ex Mossos/G.Civil/Policía). RD 933/2021, obligatorio desde dic-2024. Datos: DNI/pasaporte, nacionalidad, nac., dirección, estancia, medio de pago. | 🔴 **CRÍTICO** — gap de Cloudbeds, inexistente en ThinkReservations/PxSol/Flexxus |
| **Verifactu** | Sistema AEAT de facturación electrónica. Obligatorio desde 1-jul-2025. Via Fiskaly o similar. | 🔴 **CRÍTICO** |
| **TicketBAI** | Equivalente a Verifactu pero en País Vasco. Precede a Verifactu. | 🟡 Alto si target incluye País Vasco |
| **SII-IVA (AEAT)** | Suministro Inmediato de Información del IVA. Obligatorio para facturación grande. | 🟡 Alto |
| **INE Encuesta Ocupación** | Reporte mensual estadístico de pernoctaciones. Cloudbeds lo tiene manual. | 🟡 Alto (automatizarlo es diferencial) |
| **Facturación B2B electrónica** | Ley Crea y Crece, FACeB2B. En rollout. | 🟡 Alto |
| **IVA 10% hostelería** | Tipo reducido para pernoctación. Debe ir por línea en folio. | 🔴 **CRÍTICO** |
| **Impuesto estancia turística** | Varía por CCAA (Catalunya, Baleares, C.Valenciana, etc.). | 🟡 Alto |
| **RGPD / GDPR** | DPO en AEPD, DPAs con subprocessors, residencia UE, consentimientos granulares, derecho al olvido. | 🔴 **CRÍTICO** |
| **PSD2 SCA + 3DS** | Autenticación fuerte en pagos. Via Stripe/Redsys/Adyen. | 🔴 **CRÍTICO** |
| **Firma biométrica check-in** | Requerida por SES.Hospedajes. | 🟡 Alto |
| **EN 301 549 (accesibilidad)** | Equivalente ADA pero EU. Para portal público. | 🟢 Medio |

**Pagos locales España (vs LATAM):**
- España: **Redsys** (red bancaria oficial) + **Bizum** (equivalente a transferencia inmediata) + Stripe/Adyen internacional.
- NO MercadoPago (eso es LATAM).

**Pitch competitivo vs Cloudbeds / PxSol / ThinkReservations:**
"Nativamente diseñado para España. SES.Hospedajes automático, Verifactu integrado, INE sin exports manuales, IVA 10% por línea, firma biométrica en check-in digital. Nuestros competidores globales lo adaptaron después — nosotros nacimos acá."

---

## 6. Tabla 3-columnas: Bravas F1 vs industria vs gaps

Esto es lo que `arquitecto` necesita para planificar v2.

### Capa 1 — Core operativo

| Lo que Bravas F1 tiene | Qué hay que renombrar/reorganizar | Qué falta construir |
|---|---|---|
| 4 portales (huésped, limpieza, cocina, admin) ✅ | Modelo de datos subyacente debe unificarse en `Reservation` como entidad raíz | PMS core: rack chart, folios, check-in/out, grupos, split folios |
| Vista admin con historial | "Admin" → separar en **Dashboard** (landing con KPIs) + **Reservations** (lista) + **Calendar** (rack) + **Reports** | CRM huésped 360 con perfil único multi-estancia |
| | | Modelo de habitaciones con tipos, tarifas, rate plans |

### Capa 2 — Distribución

| Tiene | Renombrar | Falta |
|---|---|---|
| — | — | Booking engine propio embebible en web del hotel |
| — | — | Channel manager vía integración (SiteMinder/Hotelbeds). **NO construir propio en F2** |
| — | — | Rate parity monitor |

### Capa 3 — Monetización

| Tiene | Renombrar | Falta |
|---|---|---|
| — | — | RMS/pricing dinámico (v1: reglas; v2: ML) |
| — | — | Upsell engine (add-ons: desayuno, late check-out, parking, spa) |

### Capa 4 — Pagos y fiscal (CRÍTICO)

| Tiene | Renombrar | Falta |
|---|---|---|
| — | — | **Stripe + Redsys/Bizum** con PCI L1 + SCA + Apple/Google Pay |
| — | — | **Verifactu nativo** vía Fiskaly u otro certificador |
| — | — | **SES.Hospedajes automático** |
| — | — | Conciliación bancaria |
| — | — | IVA 10% por línea + impuesto estancia por CCAA |

### Capa 5 — Operaciones no-habitación

| Tiene | Renombrar | Falta |
|---|---|---|
| Portal limpieza (3 pantallas) ✅ | Reemplazar look infantil por 4 estados cromáticos convencionales (mint/lightning/dusk/solar) | Housekeeping con asignación por reglas, foto evidencia, link a mantenimiento |
| Portal cocina (2 pantallas) ✅ | Rediseñar como KDS: tickets card grandes con timer y estados cromáticos | POS completo: comandas, mesas, allergen tracking, cargo a habitación, factura |
| — | — | Mantenimiento + tickets |

### Capa 6 — Experiencia y crecimiento

| Tiene | Renombrar | Falta |
|---|---|---|
| Portal huésped (5 pantallas) ✅ | Reducir a 3 pantallas (home + reserva + chat) + rediseñar paleta | Guest app PWA real: check-in digital, upsell, pedidos a cocina, abrir puerta |
| — | — | **Inbox omnicanal staff**: WhatsApp + email + SMS + OTA chats, 3-columnas, con IA |
| — | — | Chatbot IA pre-estancia |
| — | — | Reputation (reviews, respuestas asistidas) |
| — | — | Marketing suite (email, WhatsApp broadcast) |

### Capas transversales

| Tiene | Renombrar | Falta |
|---|---|---|
| 15 pantallas HTML estáticas | Portear a stack real (Next.js 16 + Supabase o similar) | Automation engine (if-this-then-that) |
| | | API pública + webhooks |
| | | Audit log inmutable |
| | | i18n/l10n modular |
| | | IA transversal integrada al modelo de datos |

**Resumen cuantitativo del gap:**
- F1 cubre ~15% de un PMS profesional (los 4 portales de rol).
- Falta ~85% de la arquitectura canónica.
- 20% de lo que falta es compliance España (que es diferencial fuerte si lo hacemos nativo).

---

## 7. Arquitectura propuesta Bravas v2 — para pasar a `arquitecto`

### 7.1 Decisiones arquitectónicas base (recomendadas)

1. **Multi-tenant desde día 1** (una base de datos, aislamiento por `property_id`). Aunque el primer cliente sea 1 hotel.
2. **API-first con webhooks** — todo el producto se construye contra la API pública. Nada "solo en frontend".
3. **Modular por capas, no monolito single-UI** — 4-5 portales con backend compartido pero UI/UX diferenciadas por rol.
4. **i18n/l10n modular** — compliance España como plugin, para portar a LATAM después sin reescribir core.
5. **Audit log inmutable por folio** — event sourcing o al menos CDC. Crítico para compliance fiscal.
6. **Mobile-first para operaciones** (housekeeping, cocina) + **desktop-first para admin/recepción**.
7. **PWA + apps nativas selectivas** (housekeeping y kiosko). No app nativa para todo.
8. **IA integrada al schema**, no bolt-on chatbot externo (patrón PxSol + Clientify).

### 7.2 Stack técnico sugerido (a validar con arquitecto)

- **Frontend:** Next.js 16 (App Router, Cache Components) + Tailwind + shadcn/ui + Host Grotesk o Inter.
- **Backend:** Next.js API routes o Vercel Functions / Workflow para flujos durables (check-in, folios, night audit).
- **DB:** Supabase (Postgres + Auth + Realtime + Storage). Multi-tenant por `property_id`.
- **Realtime:** Supabase Realtime o Vercel edge para sync entre portales (housekeeping marca "limpia" → aparece en admin al instante).
- **Pagos:** Stripe (PCI L1, SCA, Apple/Google Pay) + Redsys para España + Bizum.
- **Facturación:** Fiskaly (Verifactu) o integración directa AEAT.
- **IA:** Claude API vía @anthropic-ai/sdk o Vercel AI SDK + MCP a la base de datos.
- **WhatsApp:** Meta Business API directa (sin reseller, como Clientify).
- **Infra:** Vercel (Pro) + Supabase + Vercel Blob para fotos housekeeping.
- **Analítica:** Metabase/Cube embebido en el admin.

### 7.3 Modelo de datos canónico mínimo (14 entidades)

```
Property           — hotel/propiedad, jerarquía para cadenas
RoomType           — categoría tarifaria (standard, superior, suite)
Room               — habitación física con housekeeping_status
RatePlan           — plan tarifario (BAR, no-reembolsable, pensión completa)
Reservation        — raíz: estados tentativa→confirmada→in-house→checked-out
Folio              — cuenta financiera de la reserva, separable (split folios)
Guest              — perfil único multi-estancia, idiomas, preferencias, DNI
Charge             — cargo atomizado (habitación, F&B, extras, impuestos)
Payment            — medio (tarjeta/efectivo/transferencia/voucher OTA)
HousekeepingTask   — asignación a staff, estado, foto evidencia
MaintenanceTicket  — incidencia, prioridad, asignación
Order              — pedido F&B/spa/room service, items, link a mesa o habitación
Message            — unificado por reserva: SMS/email/WhatsApp/notas internas
StaffMember        — rol multi-portal, idioma, turnos
TaskRule           — automation engine (trigger + condiciones + acciones)
```

### 7.4 Portales (UI por rol) — 5, no 4

Separar lo que F1 tiene en "admin" en dos portales distintos:

1. **Huésped** — PWA mobile-first, flujo 3 pantallas (home + reserva + chat).
2. **Limpieza** — PWA mobile-first, lista de habitaciones del día con 4 estados cromáticos, botón grande + foto.
3. **Cocina/Salón** — tablet-first (KDS), tickets card grandes con timer y estados.
4. **Recepción** — desktop + mobile, rack chart drag&drop + drawer de reserva + check-in digital.
5. **Admin / Dirección** — desktop, dashboard con KPIs + reports + settings + canales de venta + inbox omnicanal.

(En F1 están Recepción + Admin fundidos en "Admin" — separarlos es la primera cirugía.)

### 7.5 Roadmap F2-F5 propuesto

**F2 — Demo visual rediseñada (1-2 semanas)**
Objetivo: mismo demo navegable pero con look profesional 3-4★.
- Adoptar paleta nueva (A o B).
- Adoptar Host Grotesk / Inter.
- Rediseñar las 15 pantallas actuales con la nueva paleta + los 4 estados cromáticos de housekeeping.
- Agregar rack chart en admin (datos fake).
- Agregar drawer lateral al clickear una reserva.
- Separar recepción vs admin.
- Mantener HTML estático para la demo pero con el nuevo lenguaje.

**F3 — Prototipo funcional con fake data (3-4 semanas)**
Objetivo: portear a Next.js 16 + Supabase con datos reales de 1 hotel ficticio.
- Modelo de datos de las 14 entidades.
- CRUD de reservas desde admin.
- Rack chart con drag&drop real.
- Housekeeping con cambios de estado reales.
- Portal huésped con mock de check-in.
- Deploy en Vercel Pro.

**F4 — MVP comercializable (3-4 meses)**
- Booking engine funcional.
- Pagos reales (Stripe).
- Verifactu nativo (si España).
- SES.Hospedajes automático.
- Inbox WhatsApp Business API.
- Compliance mínimo RGPD.
- 1 hotel piloto real.

**F5 — Growth features**
- Channel manager (via SiteMinder/Hotelbeds).
- RMS con reglas.
- Multi-propiedad.
- Marketplace de integraciones.

---

## 8. Decisiones estratégicas que Daniel debe tomar

Antes de que `arquitecto` empiece a diseñar, estas son las bifurcaciones:

### 8.1 Geografía primaria
- **A) España primero** (cliente actual + mercado maduro + compliance claro + hueco de UX moderna).
- **B) LATAM primero** (más fácil técnicamente, competencia conocida con PxSol/Omnibees, pero el cliente actual está en España).
- **C) Ambas en paralelo** (sobrecarga: dos compliance stacks + dos pagos + dos idiomas).

**Mi recomendación: A — España primero.** El cliente está ahí, el compliance es un diferencial único vs los globales, y LATAM se porta después con el modelo i18n modular.

### 8.2 Modelo de pricing
- **A) Publicado y transparente** (patrón PxSol): "€X/habitación/mes con mínimo €Y, módulos activables".
- **B) Quote-based opaco** (patrón Cloudbeds, Omnibees): "Pedí demo".
- **C) Híbrido**: landing con calculadora + CTA "Agendar demo".

**Mi recomendación: C — híbrido.** Calculadora inline tipo Omnibees + rangos públicos tipo PxSol. En SMB España la opacidad baja conversión.

### 8.3 Alcance F2 (próximo entregable)
- **A) Rediseño visual** del demo F1 actual (misma estructura, nueva piel profesional). 1-2 semanas.
- **B) Prototipo funcional** con fake data en Next.js + Supabase. 3-4 semanas.
- **C) Mock interactivo** con Figma/clickable prototype (ni código, pero más que estático). 1-2 semanas.

**Mi recomendación: A.** Antes de meter código, cerrá el look con la clienta española. Si el visual aprueba, pasás a B. Si no, iteras B sobre el mismo HTML.

### 8.4 Stack técnico
- **A) Next.js 16 + Supabase + Vercel** (alineado doctrina Octo).
- **B) Vercel services (polyglot)** si separamos backend hotelero en Python/Node.
- **C) Astro + Supabase** (si queremos landing + mini-app sin SPA pesada).

**Mi recomendación: A.** Es lo que el equipo Octo mejor conoce. Realtime de Supabase sirve para los portales sincronizados.

### 8.5 Nombre
- "Bravas" sigue tentativo según BRIEF. Decidir ahora porque todo marketing/dominio depende.

### 8.6 Modelo de negocio (patrón Tile)
- ¿Daniel desarrolla? ¿La contacto en España desarrolla con nosotros? ¿Proyecto Octo pleno? → afecta roadmap y pricing.

---

## 9. Qué le pedís a `arquitecto` cuando le pases esto

Sugerencia de prompt para la delegación al rol arquitecto:

> Pasá por `~/Desktop/OctoSD/HotelBravas/memory/CONSOLIDADO_apps_hoteleras_2026-10-31.md` + los 6 reportes individuales. En base a eso:
> 1. Validá la arquitectura de 14 entidades propuesta en §7.3 o proponé alternativa.
> 2. Validá los 5 portales de §7.4 o proponé alternativa.
> 3. Validá el roadmap F2-F5 de §7.5 o proponé alternativa.
> 4. Diseñá el **modelo de datos detallado** (SQL schema) con relaciones y constraints.
> 5. Diseñá el **sitemap** de cada portal con las pantallas canónicas.
> 6. Identificá dependencias críticas (ej: Verifactu requiere Fiskaly contract antes de F4).
> 7. Devolveme un plan en Markdown con fases, estimación y riesgos.
> Decisiones pendientes de Daniel: geografía primaria (A/B/C de §8.1), modelo pricing (§8.2), alcance F2 (§8.3), stack (§8.4), nombre (§8.5), modelo negocio (§8.6). Si bloquean, listalas al final del plan.

---

## Anexo — índice de archivos

```
~/Desktop/OctoSD/HotelBravas/memory/
├── CONSOLIDADO_apps_hoteleras_2026-10-31.md       ← este archivo
├── investigacion_cloudbeds_2026-10-31.md
├── investigacion_thinkreservations_2026-10-31.md
├── investigacion_flexxus_2026-10-31.md
├── investigacion_clientify_2026-10-31.md
├── investigacion_omnibees_2026-10-31.md
└── investigacion_pxsol_2026-10-31.md
```
