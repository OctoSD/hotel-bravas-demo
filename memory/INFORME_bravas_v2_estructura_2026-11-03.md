# INFORME MAESTRO — Hotel Bravas v2
### Funciones, UX y estructura para la aplicación

**Fecha:** 2026-11-03
**Autor:** rol `bravas`
**Para:** Daniel + futuro rol `arquitecto`
**Reemplaza en claridad a:** el consolidado del 31-oct (que queda como anexo técnico)

---

## 0. En una página

Investigamos 6 apps hoteleras durante octubre. De ahí sacamos tres cosas: **(a)** la estructura canónica que tiene un software hotelero profesional (16 módulos en 6 capas), **(b)** las features que vale la pena copiar de cada app, y **(c)** el lenguaje visual que hace que un PMS "parezca de hotel 3-4★ serio".

**Bravas v2** no construye todo eso. Elige **9 módulos de los 16** para los primeros 6-9 meses, se concentra en el gap que ningún competidor cubre en España (compliance nativo automático + UX cloud-moderna + WhatsApp-first), y se expande después.

**Las decisiones de UX ya están tomadas y están corriendo en el demo F2** (`mockup/v2/`): paleta Navy A profesional, tipografía Inter, 3 portales (admin, huésped, empleado), housekeeping con 4 estados cromáticos convencionales del sector.

**Lo que queda por decidir** antes de pasar a F3 (código real): geografía primaria (España vs LATAM), modelo de pricing, nombre definitivo, y modelo de negocio con la clienta española.

---

## 1. Evolución de la investigación — cómo llegamos acá

```
30-oct ───────── 31-oct ───────────── 2-nov ────────── 3-nov
   │                 │                   │                │
   F1 demo          6 investigaciones    F2 demo          INFORME
   navegable        + consolidado        mobile-first     maestro
   HTML estático    (res del 31)         con design       (este doc)
   4 portales                            system v2
   15 pantallas
```

**F1 (30-oct)** — demo navegable publicado en GitHub Pages: 4 portales (huésped, limpieza, cocina, admin), 15 pantallas HTML. Objetivo cumplido: mostrar a la clienta española la idea completa de operación hotelera multi-portal. Resultado: ella vio el flujo pero quedó claro que la UX era "demo", no "producto".

**31-oct — investigación hotelera** — se hicieron 6 reportes de apps de referencia, uno por app, siguiendo el formato de 8 secciones (overview, módulos, UX, features, target+pricing, compliance España, recomendaciones corto plazo, recomendaciones largo plazo). Y un consolidado cruzado. Las 6 apps:

| App | Rol en nuestra investigación |
|---|---|
| **Cloudbeds** (global, 20k alojamientos) | Referencia #1 de UX moderna cloud + arquitectura all-in-one |
| **ThinkReservations** (US, boutique) | Referencia de automation engine + split folios + awards 2026 |
| **PxSol** (Argentina/LATAM, 1.800 alojamientos) | Modelo de ecosistema modular + pricing publicado + competidor directo si vamos LATAM |
| **Omnibees** (LATAM, channel manager líder) | Referencia solo para módulo channel manager + BI benchmarking |
| **Clientify** (NO hotelero, CRM+IA+WhatsApp) | Referencia para inbox omnicanal + IA conversacional |
| **Flexxus** (Argentina, ERP con módulo hotel) | Anti-referencia: lo que NO queremos ser (ERP desktop denso) |

**2-nov — F2** — se construyó el demo F2 (mobile-first, 3 portales, admin modular + RRHH + fichaje QR) adoptando ya las conclusiones de UX del consolidado: paleta Navy A, Inter, housekeeping 4 estados.

**3-nov — este informe** — consolida en formato producto (no research) la estructura final que vamos a armar.

**Lo que aprendimos (3 cosas, en claro):**
1. **Un PMS profesional tiene 16 módulos en 6 capas.** No se pueden construir todos. Hay que elegir.
2. **El look&feel es convención fuerte del sector.** Hay 4 colores de housekeeping que no se discuten, un rack chart que todos tienen, un drawer lateral que es el patrón. Si no los adoptás, "no parecés hotel".
3. **El gap competitivo real en España es compliance automático + UX moderna + WhatsApp-first.** Los globales (Cloudbeds, Mews) tienen UX pero cojean en compliance ES. Los locales (Noray, Tesipro) tienen compliance pero UX densa. Nadie combina ambas.

---

## 2. Las 6 apps en una línea cada una

| # | App | Pricing | UX | Qué le robamos |
|---|---|---|---|---|
| 1 | **Cloudbeds** | $120-600/mes opaco | Media-alta, moderna. Midnight navy + dodger blue. | Arquitectura all-in-one, Kiosk Mode, perfil único multi-propiedad, alertas de sentimiento, rack drag&drop |
| 2 | **ThinkReservations** | $10/hab/mes mín $50, publicado | Densa pero legible. Azul celeste US. | Automatic Task Rules, split folios, night audit, rules-based room assignments |
| 3 | **Flexxus** | ARS/user/mes publicado | Desktop Office-like, densa, "años 2000" | Nada de UX. Robamos: back office contable, cargo a habitación desde POS, control de propinas |
| 4 | **Clientify** | €39-65/seat plan único | Moderna startup. Negro + verde turquesa | Inbox 3-columnas + IA en composer + "Superinteligencia" toggle global + transparencia IA |
| 5 | **Omnibees** | B2B opaco | Enterprise índigo denso | Channel manager bidireccional + calculadora ROI inline + BI con benchmarking de mercado |
| 6 | **PxSol** | ARS/mes publicado modular | Corporate flat denso | Modelo de ecosistema modular + comparador tarifa directa vs OTA + páginas /alternativas/ para SEO |

---

## 3. Matriz maestra — funciones por módulo (quién tiene qué + qué tomamos)

**Leyenda:** ✅ fuerte · 〰 parcial · — no tiene · ⭐ función premium del rubro · 🎯 lo tomamos para Bravas v2 · 🔜 lo tomamos pero para F4+

### Capa 1 — Core operativo

| Función | Cloudbeds | ThinkRes | Flexxus | Clientify | Omnibees | PxSol | Bravas v2 |
|---|---|---|---|---|---|---|---|
| ⭐ Rack / tape chart drag&drop | ✅ | ✅ | 〰 | — | ✅ | ✅ | 🎯 |
| ⭐ Reservations + folios | ✅ | ✅ | ✅ | — | ✅ | ✅ | 🎯 |
| ⭐ Split folios (dividir cuenta) | ✅ | ✅ ⭐ | — | — | — | ✅ | 🎯 |
| ⭐ Grupos (bodas, eventos) | ✅ | ✅ | 〰 | — | 〰 | ✅ | 🔜 |
| ⭐ Rules-based room assignments | ✅ | ✅ ⭐ | — | — | — | 〰 | 🔜 |
| ⭐ Perfil único multi-propiedad | ✅ ⭐ | — | — | — | — | — | 🔜 |
| ⭐ CRM huésped 360 (histórico) | ✅ | ✅ | 〰 | ✅ ⭐ | 〰 | ✅ | 🎯 |
| ⭐ Night audit automatizado | 〰 | ✅ ⭐ | 〰 | — | — | ✅ | 🔜 |

**Bravas v2 F3:** rack chart, reservations+folios, split folios, CRM huésped 360. **F4+:** grupos, rules-based assignments, multi-propiedad, night audit.

### Capa 2 — Distribución

| Función | Cloudbeds | ThinkRes | Flexxus | Clientify | Omnibees | PxSol | Bravas v2 |
|---|---|---|---|---|---|---|---|
| ⭐ Booking engine propio | ✅ | ✅ | 〰 | — | ✅ | ✅ | 🎯 |
| ⭐ Channel manager a OTAs | ✅ ⭐ | ✅ | — | — | ✅ ⭐ | ✅ | 🔜 (vía integración, no propio) |
| Rate parity monitor | ✅ | 〰 | — | — | ✅ ⭐ | 〰 | 🔜 |
| Metasearch (Google Hotel Ads) | ✅ | — | — | — | ✅ ⭐ | 〰 | 🔜 F5 |

**Decisión arquitectónica:** NO construimos channel manager propio. Es un juego de volumen (SiteMinder tiene 350+ canales). Lo integramos vía API.

### Capa 3 — Monetización

| Función | Cloudbeds | ThinkRes | Flexxus | Clientify | Omnibees | PxSol | Bravas v2 |
|---|---|---|---|---|---|---|---|
| ⭐ RMS / pricing dinámico con IA | ✅ ⭐ (Signals) | — | — | — | ✅ ⭐ (Bee Price) | ✅ ⭐ (RMS) | 🔜 F5 |
| ⭐ Upsell / cross-sell | ✅ | ✅ | 〰 | — | 〰 | ✅ | 🎯 (reglas) |
| Portal B2B agencias | — | — | — | — | ✅ | 〰 | ❌ no |

**Bravas v2 F3:** upsell con reglas (desayuno, late check-out, parking, spa). RMS con IA queda para F5.

### Capa 4 — Pagos y fiscal (CRÍTICO para España)

| Función | Cloudbeds | ThinkRes | Flexxus | Clientify | Omnibees | PxSol | Bravas v2 |
|---|---|---|---|---|---|---|---|
| ⭐ PCI L1 + SCA + 3DS | ✅ | ✅ | 〰 | — | 〰 | ✅ | 🎯 (vía Stripe) |
| ⭐ Apple Pay / Google Pay | ✅ | ✅ | — | — | — | ✅ | 🎯 |
| ⭐ Tokenización de tarjetas | ✅ | ✅ | — | — | — | ✅ | 🎯 |
| **Verifactu ES (fact. electrónica)** | 〰 vía Fiskaly | ❌ | ❌ (AR) | — | ❌ | ❌ | 🎯 ⭐ **DIFERENCIAL** |
| **SES.Hospedajes (RD 933/2021)** | 〰 manual | ❌ | ❌ | — | ❌ | ❌ | 🎯 ⭐ **DIFERENCIAL** |
| **IVA 10% hostelería por línea** | 〰 | — | — | — | — | — | 🎯 ⭐ |
| **Impuesto estancia por CCAA** | 〰 | — | — | — | — | — | 🎯 |
| **INE Encuesta Ocupación automática** | 〰 manual | — | — | — | — | — | 🎯 ⭐ |
| Redsys + Bizum (ES local) | ❌ | ❌ | ❌ | — | — | ❌ | 🎯 ⭐ |
| TicketBAI (País Vasco) | ❌ | ❌ | — | — | — | — | 🔜 F4+ |

**Este bloque es el músculo competitivo real de Bravas.** Ningún competidor global lo hace bien en España, y los locales no tienen UX. Si lo hacemos nativo automático, es el pitch.

### Capa 5 — Operaciones no-habitación

| Función | Cloudbeds | ThinkRes | Flexxus | Clientify | Omnibees | PxSol | Bravas v2 |
|---|---|---|---|---|---|---|---|
| ⭐ Housekeeping 4 estados cromáticos | ✅ ⭐ | ✅ | — | — | — | ✅ | ✅ ya en F2 |
| ⭐ Housekeeping móvil + foto evidencia | ✅ | 〰 | — | — | — | ✅ | 🎯 |
| Housekeeping asignación por reglas | ✅ | ✅ ⭐ | — | — | — | 〰 | 🔜 |
| ⭐ POS F&B + KDS cocina | ✅ (Marketplace) | ❌ ⭐ gap | ✅ | — | — | ✅ | 🎯 ⭐ **DIFERENCIAL** |
| ⭐ Cargo a habitación desde POS | ✅ | — | ✅ ⭐ | — | — | ✅ | 🎯 |
| Mantenimiento + tickets | ✅ | 〰 | 〰 | — | — | 〰 | 🎯 (ligero) |
| **Fichaje empleados QR** | ❌ | ❌ | 〰 | — | — | ❌ | ✅ ya en F2 |
| **RRHH básico (turnos, nómina)** | ❌ | ❌ | ✅ | — | — | ❌ | ✅ ya en F2 |

**Nota F2:** el fichaje QR + RRHH es nuestra apuesta propia (viene del aprendizaje de **Tile** + Bizneo/Naaloo del 31-oct). Ningún competidor hotelero lo integra bien — es un diferencial lateral. Decisión arquitectónica a validar con el arquitecto: ¿sigue como módulo nativo o se externaliza a Tile en modo multi-vertical?

### Capa 6 — Experiencia huésped y crecimiento

| Función | Cloudbeds | ThinkRes | Flexxus | Clientify | Omnibees | PxSol | Bravas v2 |
|---|---|---|---|---|---|---|---|
| ⭐ Guest app PWA sin descarga | ✅ ⭐ (Kiosk) | — | — | — | — | ✅ ⭐ (Huésped+) | 🎯 |
| ⭐ Check-in digital pre-llegada | ✅ | ✅ | — | — | — | ✅ | 🎯 |
| **Firma biométrica (SES.Hospedajes)** | ❌ | ❌ | — | — | — | ❌ | 🎯 ⭐ |
| ⭐ Inbox omnicanal 3-cols staff | ✅ | 〰 | — | ✅ ⭐ | — | ✅ | 🎯 ⭐ |
| ⭐ WhatsApp Business API nativa | ✅ | — | — | ✅ ⭐ | — | ✅ | 🎯 ⭐ **DIFERENCIAL** |
| ⭐ IA en composer (sugerencias) | 〰 | — | — | ✅ ⭐ | — | 〰 | 🎯 |
| ⭐ Chatbot IA 24/7 pre-estancia | ✅ | — | — | ✅ | — | ✅ | 🎯 |
| Alertas de sentimiento | ✅ ⭐ | — | — | 〰 | — | — | 🔜 F4 |
| Reputation (reviews + respuestas IA) | ✅ | — | — | 〰 | — | 〰 | 🔜 F4 |
| Marketing suite (email/WA broadcast) | ✅ | 〰 | — | ✅ ⭐ | — | ✅ | 🔜 F5 |
| Website builder | ✅ | — | — | — | — | ✅ | ❌ no |

### Capas transversales

| Función | Cloudbeds | ThinkRes | Flexxus | Clientify | Omnibees | PxSol | Bravas v2 |
|---|---|---|---|---|---|---|---|
| Automation engine (if-this-then-that) | 〰 | ✅ ⭐ (Task Rules) | — | 〰 | — | 〰 | 🎯 |
| API pública + webhooks | ✅ ⭐ | ✅ | 〰 | ✅ | ✅ | 〰 | 🎯 (día 1) |
| Audit log inmutable | ✅ | ✅ | ✅ | — | — | 〰 | 🎯 |
| IA integrada al modelo de datos | 〰 | — | — | ✅ ⭐ | — | ✅ ⭐ | 🎯 |
| i18n modular (compliance = plugin) | 〰 | — | — | 〰 | 〰 | 〰 | 🎯 |
| Multi-tenant | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🎯 (día 1) |
| Role-based portals | 〰 | 〰 | ✅ | — | 〰 | ✅ | ✅ ya en F2 |
| Realtime sync entre portales | 〰 | 〰 | — | — | — | 〰 | 🎯 ⭐ |

---

## 4. Las "joyas premium" que robamos — una por app

El criterio: función que no es trivial de replicar y que vale la pena copiar casi tal cual.

| # | De dónde | Qué robamos | Dónde va en Bravas |
|---|---|---|---|
| 1 | **Cloudbeds** | **Kiosk Mode** — la misma app staff puede correr en modo kiosko físico para self-check-in. Ahorra hardware caro. | Portal recepción (dentro de admin) + modo "quiosco" fullscreen |
| 2 | **Cloudbeds** | **Perfil único multi-propiedad** — el mismo huésped reconocido en Hotel A y Hotel B. | Modelo `Guest` con `guest_id` global, no por propiedad |
| 3 | **ThinkReservations** | **Automatic Task Rules** — motor if-this-then-that. "Reserva con desayuno → generar task 'preparar desayuno 7am' para cocina". | Capa transversal `TaskRule` — resuelve mitad del portal cocina/salón |
| 4 | **ThinkReservations** | **Split folios** — una reserva, dos huéspedes, un folio para cada uno. | Entidad `Folio` separable, varias por `Reservation` |
| 5 | **Clientify** | **Inbox omnicanal 3-columnas con IA en composer** — izq: lista conversaciones, centro: chat, der: ficha huésped 360. IA sugiere respuestas en bloque gris encima del input. | Inbox del admin — pantalla crítica |
| 6 | **Clientify** | **Toggle IA global ("Superinteligencia")** — switch arriba a la derecha activa/desactiva IA en toda la UI. Transparencia: chip "respondido por IA". | Topbar de admin, consistencia en todas las pantallas con IA |
| 7 | **Omnibees** | **Calculadora ROI inline en landing** — "cuánto más vas a facturar con nosotros". Gran gancho de conversión. | Landing marketing (fase comercial) |
| 8 | **Omnibees** | **BI con benchmarking de mercado** (HiQ) — comparar tu ADR con el de la zona. | Dashboard admin, F5 |
| 9 | **PxSol** | **Modelo de ecosistema modular con pricing publicado** — "€X por módulo activo, publicado en la web". | Pricing de Bravas: landing con calculadora + rangos públicos |
| 10 | **PxSol** | **Comparador tarifa directa vs OTA en booking engine** — "reservá acá y ahorrás €15 vs Booking". | Booking engine propio |
| 11 | **PxSol** | **Páginas /alternativas/<competidor> para SEO** — "Bravas vs Noray", "Bravas vs Cloudbeds". | Fase comercial / marketing |
| 12 | **Cloudbeds** | **Alertas de sentimiento en mensajería** — detecta negatividad en chat huésped y alerta al staff. | Inbox omnicanal, F4 |
| 13 | **ThinkReservations** | **Night audit automatizado** — proceso nocturno que cierra día, concilia, genera estadísticas. | Capa transversal, F4 |

**Lo que explícitamente NO robamos (y por qué):**
- UX densa tipo ERP de Flexxus / Omnibees. Es el patrón que estamos combatiendo.
- Portal B2B agencias (nicho muy chico para fase inicial).
- Website builder (hay competidores mejores — Hostinger/Wix bastan).
- Channel manager propio (volumen imposible — se integra).

---

## 5. UX — las 6 paletas comparadas vs la nuestra

### 5.1 Comparativa visual

| App | Primario | Acción | Vibe |
|---|---|---|---|
| Cloudbeds | Midnight `#001238` | Dodger Blue `#3366FF` | SaaS moderno profesional |
| ThinkReservations | Celeste turquesa | Blanco + fotos cálidas | Boutique US clean |
| Flexxus | Navy corporate | Rojo/naranja | ERP argentino "años 2000" |
| Clientify | Negro `#1a1a1a` | Verde turquesa `#00D084` | Startup marketing-driven |
| Omnibees | Índigo `#302681` | Rojo `#b50027` + amarillo | Enterprise LATAM "banca" |
| PxSol | Azul + violeta | Sobre blancos | Corporate flat sobrio |

**Patrón consistente del sector:** navy/midnight profundo + un azul acción + un verde success. Es la convención. Confirmada en Cloudbeds, Flexxus, PxSol.

### 5.2 Nuestra paleta — Navy A SaaS Profesional (YA EN F2)

Confirmada y en producción en `mockup/v2/css/tokens.css`.

```
PRIMARIO
  --navy-900: #0F1F3D  ← color de marca, topbar, botones primarios
  --navy-800: #152a4f
  --navy-700: #1e3a66
  --navy-100: #e6ebf3
  --navy-50:  #f1f4f9

ACCIÓN
  --blue-600: #2563EB  ← CTAs, links, foco
  --blue-500: #3B82F6
  --blue-100: #DBEAFE  ← fondos de highlight

SUCCESS
  --green-600: #059669  ← confirmaciones, estados "OK"
  --green-500: #10B981
  --green-100: #D1FAE5

WARNING
  --amber-600: #D97706  ← alertas, "atención"
  --amber-500: #F59E0B
  --amber-100: #FEF3C7

DANGER
  --red-600: #DC2626  ← errores, cancelaciones
  --red-500: #EF4444
  --red-100: #FEE2E2

NEUTRALS
  --white, --gray-50 ... --gray-900 (escala Tailwind slate)
```

**Por qué esta paleta y no la "Boutique" (verde bosque + cobre):**
- La clienta en España es contacto de un hotel específico, pero el producto apunta a hoteles 3-4★ pyme, no 5★ boutique.
- Navy es la convención del sector — reduce fricción cognitiva en demos a dueños que ya usan Cloudbeds/Noray/Mews.
- Más fácil de replicar y mantener consistencia en 5 portales.

### 5.3 Paleta semántica de housekeeping (YA EN F2 — convención sector)

Esta no se discute. Es la convención visual de todos los PMS profesionales. Está implementada:

```
--hk-mint      #86EFAC  (bg: #DCFCE7)  Inspeccionada / Lista
--hk-lightning #7DD3FC  (bg: #E0F2FE)  Limpia
--hk-dusk      #475569  (bg: #E2E8F0)  Sucia
--hk-solar     #F59E0B  (bg: #FEF3C7)  Fuera de servicio / mantenimiento
```

Se usa consistentemente en tape chart, lista housekeeping, panel detalle de habitación, dashboard de arrivals/departures.

### 5.4 Tipografía (YA EN F2)

**Inter** (free, Google Fonts). Pesos: 400 / 500 / 600 / 700.
- Base UI: **14px**
- Body: 14-15px
- Headings: 18-24px
- Display (hero): 32-48px máximo
- Densidad filas tabla: **32-40px** (no 56-64px — operador quiere ver mucha info de un vistazo)

### 5.5 Layout canónico (confirmado por Cloudbeds + ThinkReservations + PxSol + Clientify)

```
┌─────────────────────────────────────────────────────────────┐
│ TOP MENU navy fija                                           │
│   [☰ Menú]  Logo  [Quick actions]           [Avatar ▾]      │
├──────┬──────────────────────────────────────────────────────┤
│      │                                                       │
│ SIDE │           ÁREA PRINCIPAL                              │
│ NAV  │           Dashboard / Calendar / Reservas /          │
│      │           Housekeeping / Reports / Settings           │
│      │                                                       │
└──────┴──────────────────────────────────────────────────────┘

Click en reserva → DRAWER lateral derecho (~400-500px) con detalle.
NO modal. NO pantalla nueva.
```

### 5.6 Las 7 pantallas canónicas que todo PMS tiene

1. **Dashboard** (landing con KPIs: ocupación, ADR, RevPAR, arrivals/departures del día, alertas).
2. **Rack chart / tape chart** (filas = habitaciones, columnas = días, barras drag&drop, housekeeping color al margen).
3. **Calendar360 / Matriz ARI** (disponibilidad y tarifas por tipo de habitación × día).
4. **Housekeeping board** (desktop: tabla con 4 estados · mobile: lista + botón grande).
5. **Inbox omnicanal 3 columnas** (lista conv · chat · ficha huésped 360).
6. **KDS cocina** (tickets card grandes, timer, estados cromáticos, tablet-first).
7. **Portal huésped PWA** (3 pantallas: home + reserva + chat).

---

## 6. Estructura final de Bravas v2 — el plano

### 6.1 Portales (3 fusionados en F2 + 2 que vienen en F3)

```
┌─────────────────────────────────────────────────────────────┐
│                      HOTEL BRAVAS                            │
│                                                              │
│  ┌───────────────┐   ┌───────────────┐   ┌────────────────┐│
│  │ 1. HUÉSPED    │   │ 2. EMPLEADO   │   │ 3. ADMIN       ││
│  │ PWA mobile    │   │ PWA mobile    │   │ Desktop + mob  ││
│  │               │   │ ├─ Limpieza   │   │ ├─ Dashboard   ││
│  │ Flujo 3 pant: │   │ ├─ Cocina     │   │ ├─ Calendar    ││
│  │ · Home        │   │ ├─ Recepción  │   │ ├─ Reservas    ││
│  │ · Reserva     │   │ │ (quiosco)   │   │ ├─ Inbox       ││
│  │ · Chat        │   │ └─ Fichaje QR │   │ ├─ Housekeeping││
│  │               │   │               │   │ ├─ RRHH        ││
│  │               │   │               │   │ ├─ Reports     ││
│  │               │   │               │   │ ├─ Compliance  ││
│  │               │   │               │   │ └─ Settings    ││
│  └───────────────┘   └───────────────┘   └────────────────┘│
└─────────────────────────────────────────────────────────────┘

En F2 los 3 portales están unificados. En F3 se mantiene esa
estructura pero el portal "Empleado" se bifurca internamente
según el rol del usuario (limpieza, cocina, recepción).
```

**Decisión F2 vs. consolidado del 31-oct:** el consolidado proponía **5 portales** (huésped, limpieza, cocina, recepción, admin). En F2 Daniel consolidó a **3**, agrupando los 3 operativos en "Empleado" con sub-vista por rol. Mantengo esta decisión — es más simple de vender y el huésped no entiende "5 apps".

### 6.2 Módulos del portal Admin (que ya existe en F2)

El admin es modular tipo PxSol — grid 2x2 de módulos activables.

```
MÓDULOS CORE (siempre activos)
  🏠 Dashboard         KPIs, arrivals/departures, alertas
  📅 Calendar / Rack   Tape chart drag&drop
  📋 Reservas          Lista + CRUD + split folios
  🛎  Housekeeping     Board con 4 estados cromáticos
  💬 Inbox             Omnicanal WhatsApp + email + OTAs
  👥 Huéspedes         CRM 360 con histórico

MÓDULOS BRAVAS (diferenciales)
  👔 RRHH              Empleados, turnos, nómina, fichaje QR
  📱 Guest App         Config del portal huésped (branding, servicios)
  🤖 IA / Automation   Reglas (Task Rules) + prompts configurables

MÓDULOS COMPLIANCE ESPAÑA (CRÍTICOS)
  🇪🇸 SES.Hospedajes   Envío automático al Min. Interior
  📄 Verifactu         Facturación electrónica AEAT
  📊 INE Ocupación     Reporte mensual automático
  💳 Pagos             Stripe + Redsys + Bizum, SCA + 3DS

MÓDULOS CRECIMIENTO (F4+)
  🌐 Booking Engine    Motor de reservas propio
  📈 Reports / BI      ADR, RevPAR, GOP, forecasting
  📣 Marketing         Email + WhatsApp broadcast
  🔗 Channel Manager   Integración SiteMinder (OTAs)
  ⭐ Reputation        Reviews + respuestas IA
```

### 6.3 Modelo de datos canónico — 15 entidades (14 del consolidado + TaskRule)

```
Property           — hotel/propiedad, jerarquía para cadenas
RoomType           — categoría tarifaria (standard, superior, suite)
Room               — habitación física con housekeeping_status
RatePlan           — plan tarifario (BAR, no-reembolsable, pensión completa)
Reservation        — raíz: estados tentativa→confirmada→in-house→checked-out
Folio              — cuenta financiera separable (split folios)
Guest              — perfil único multi-estancia, idiomas, preferencias, DNI
Charge             — cargo atomizado (habitación, F&B, extras, impuestos)
Payment            — medio (tarjeta/efectivo/transferencia/voucher OTA)
HousekeepingTask   — asignación a staff, estado, foto evidencia
MaintenanceTicket  — incidencia, prioridad, asignación
Order              — pedido F&B/spa/room service, items, link a mesa o habitación
Message            — unificado por reserva: SMS/email/WhatsApp/notas internas
StaffMember        — rol multi-portal, idioma, turnos, fichaje
TaskRule           — automation engine (trigger + condiciones + acciones)
```

### 6.4 Stack técnico (confirmado doctrina Octo)

- **Frontend:** Next.js 16 (App Router + Cache Components) + Tailwind + shadcn/ui + Inter
- **Backend:** Vercel Functions / Workflow (para flujos durables: check-in, folios, night audit)
- **DB:** Supabase (Postgres + Auth + Realtime + Storage), multi-tenant por `property_id`
- **Realtime:** Supabase Realtime (housekeeping marca "limpia" → aparece en admin al instante)
- **Pagos:** Stripe (PCI L1, SCA, Apple/Google Pay) + Redsys + Bizum
- **Facturación ES:** Fiskaly (Verifactu) o integración directa AEAT
- **IA:** Claude API (`@anthropic-ai/sdk`) + Vercel AI SDK + MCP a la base de datos
- **WhatsApp:** Meta Business API directa (sin reseller, patrón Clientify)
- **Infra:** Vercel Pro + Supabase + Vercel Blob (fotos housekeeping)
- **Analítica:** Metabase embebido o Cube.dev para BI

### 6.5 Capas transversales (desde día 1)

- **Multi-tenant** por `property_id` — una base de datos, aislamiento por policy en Supabase.
- **API-first** — todo el producto se construye contra la API pública. Nada "solo en frontend".
- **Audit log inmutable** por folio (compliance + disputas).
- **i18n/l10n modular** — compliance España es un plugin, no hardcoded. Portamos a LATAM sin reescribir core.
- **IA integrada al schema**, no bolt-on chatbot externo.
- **Role-based portals** — mismo backend, UIs separadas por rol.

---

## 7. Qué ya tiene F2 vs qué queda para F3+

### 7.1 Lo que YA está en F2 (commit `8ce3d55`, 2-nov)

✅ Paleta Navy A completa (`tokens.css`)
✅ Tipografía Inter 400/500/600/700
✅ 4 estados cromáticos de housekeeping (mint/lightning/dusk/solar)
✅ 3 portales separados (admin, huésped, empleado)
✅ Admin modular con grid 2x2 de módulos
✅ Vista de turnos (shift grid) para RRHH
✅ Fichaje QR
✅ PWA mobile-first (meta theme-color navy, viewport-fit cover)
✅ Iconografía Lucide
✅ Design tokens exportables (radii, shadows, spacing)

### 7.2 Lo que FALTA en F2 (y debería ir en F3 o F2.5 visual)

El F2 actual es mobile-first pero no tiene las pantallas canónicas de PMS:
- ❌ **Rack chart / tape chart** desktop (es la pantalla central del admin, prioridad #1)
- ❌ **Drawer lateral derecho** para detalle de reserva
- ❌ **Inbox omnicanal 3-columnas**
- ❌ **KDS cocina** con tickets card grandes
- ❌ **Dashboard admin** con widgets de KPIs reales (ocupación, ADR, RevPAR)
- ❌ **Housekeeping board desktop** con tabla densa
- ❌ **Pantalla "módulos compliance ES"** (SES/Verifactu/INE)
- ❌ **Portal huésped reducido** a 3 pantallas (hoy tiene 5)

**Propuesta:** antes de F3 (código real), hacer un F2.5 visual que agregue estas pantallas canónicas al mockup/v2/ actual. Serían 7-8 pantallas HTML más, ~3-5 días. Ventaja: completa el pitch visual sin meter código todavía.

---

## 8. Roadmap F2 → F5

```
┌─ F1 ──────────┬─ F2 ──────────┬─ F2.5 ────────┬─ F3 ──────────┬─ F4 ──────────┬─ F5 ──────────┐
│ 30-oct        │ 2-nov         │ nov-26        │ ene-feb 27    │ mar-jun 27    │ jul-dic 27    │
│               │               │ (propuesto)   │ (propuesto)   │ (propuesto)   │ (propuesto)   │
├───────────────┼───────────────┼───────────────┼───────────────┼───────────────┼───────────────┤
│ Demo F1       │ Demo F2       │ Demo F2.5     │ Prototipo     │ MVP comerc.   │ Growth        │
│ HTML estático │ HTML + design │ HTML + 7-8    │ Next.js 16 +  │ Pagos reales  │ Channel mgr   │
│ 4 portales    │ system v2     │ pantallas     │ Supabase.     │ Verifactu.    │ (SiteMinder). │
│ 15 pantallas  │ Navy, Inter,  │ canónicas     │ Fake data.    │ SES.Hosp.     │ RMS reglas.   │
│               │ 4 estados HK  │ (rack, drawer,│ CRUD real.    │ Inbox WA Biz. │ Multi-prop.   │
│               │ 3 portales    │ inbox, KDS)   │ 1 hotel fict. │ RGPD. 1 hotel │ Marketplace.  │
│               │ RRHH + QR     │               │               │ piloto real.  │               │
└───────────────┴───────────────┴───────────────┴───────────────┴───────────────┴───────────────┘
```

**F2.5 (próximos 2-3 semanas) — propuesto:**
Agregar al mockup/v2/ actual:
1. Rack chart desktop (admin → calendario) con 10 habitaciones × 14 días, drag visual
2. Drawer lateral de reserva (click sobre barra → panel 400px)
3. Inbox omnicanal 3-cols
4. KDS cocina (vista tablet)
5. Dashboard admin desktop con widgets KPI
6. Housekeeping board desktop (tabla densa + mobile ya existe)
7. Pantallas compliance ES (SES / Verifactu / INE)
8. Reducir portal huésped a 3 pantallas

Resultado: demo F2.5 **completo** para mostrar a la clienta española y a potenciales inversores/socios. Antes de meter código.

---

## 9. Decisiones abiertas que necesitamos cerrar

Antes de arrancar F3 (código):

| # | Decisión | Opciones | Mi recomendación |
|---|---|---|---|
| 1 | **Geografía primaria** | A) España · B) LATAM · C) Ambas | **A — España.** El cliente está ahí, el compliance es diferencial único, LATAM se porta después |
| 2 | **Modelo de pricing** | A) Publicado · B) Quote-based · C) Híbrido | **C — Híbrido.** Calculadora ROI inline + rangos públicos + CTA demo |
| 3 | **Alcance próximo entregable** | A) F2.5 visual · B) F3 funcional · C) Mock Figma | **A — F2.5 visual.** Antes de código, cerrar el look con la clienta |
| 4 | **Stack técnico** | A) Next.js 16 + Supabase + Vercel · B) Vercel services polyglot · C) Astro + Supabase | **A.** Doctrina Octo + lo que mejor conocemos |
| 5 | **Nombre** | "Bravas" tentativo · otro | Confirmar con clienta en próxima iteración |
| 6 | **Modelo de negocio** | A) Daniel desarrolla · B) Clienta desarrolla con Octo · C) Proyecto Octo pleno · D) Joint venture | A definir — depende de qué pasa con la clienta tras ver F2 |
| 7 | **RRHH + Fichaje QR** | A) Nativo en Bravas (como F2) · B) Externalizar a Tile multi-vertical · C) Partnership con Bizneo | A conversar con `arquitecto` y `tile` |

---

## 10. Qué sigue (hoy / esta semana)

1. **Vos decidís:** ¿va F2.5 visual (recomendado) o salto directo a F3?
2. Si F2.5: delego a `arquitecto` o lo hago yo, listando las 7-8 pantallas canónicas con bocetos.
3. Si F3: lo mando a `arquitecto` con el prompt de §9 del consolidado + este informe como anexo.
4. En paralelo: **esperar feedback de la clienta española** sobre F2 actual. Sin eso, cualquier F2.5/F3 es especulativo.

---

## Anexo — índice de archivos

```
~/Desktop/OctoSD/HotelBravas/memory/
├── INFORME_bravas_v2_estructura_2026-11-03.md    ← este archivo (producto)
├── CONSOLIDADO_apps_hoteleras_2026-10-31.md      ← síntesis research (técnico)
├── investigacion_cloudbeds_2026-10-31.md
├── investigacion_thinkreservations_2026-10-31.md
├── investigacion_flexxus_2026-10-31.md
├── investigacion_clientify_2026-10-31.md
├── investigacion_omnibees_2026-10-31.md
└── investigacion_pxsol_2026-10-31.md

~/Desktop/OctoSD/HotelBravas/mockup/
├── index.html + screens/        ← F1 (30-oct)
└── v2/                          ← F2 (2-nov)
    ├── index.html, admin.html, huesped.html, empleado.html
    ├── css/ (tokens.css + app.css)
    └── js/
```
