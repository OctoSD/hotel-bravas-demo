# Resumen ejecutivo — Sesión bravas × Daniel · 2026-11-08

> **Propósito:** este documento condensa TODO lo trabajado hoy entre Daniel y bravas para que arquitecto + optimización tengan contexto completo antes de analizar las 3 opciones arquitectónicas. No omite nada relevante.
>
> **Pregunta central que arquitecto + optimización tienen que responder después de leer esto:**
> *¿Cómo construimos Bravas dado que los 37 hoteles relevados son todos distintos? Opción A (SaaS puro con packs toggleables) · Opción B (Custom por hotel) · Opción C (Híbrido) — cuál es viable, cómo se aplica a hoteles tan distintos, y cuántos agentes IA (Opus/Sonnet) necesita cada opción.*

---

## 1. Punto de partida de la sesión

Bravas venía del cierre del 2026-11-07 con:
- **F2.5 cerrada a 20 pantallas navegables** (admin, huésped, 13 empleados = 6 jefes + 6 operativos + hub).
- **6 sectores cubiertos en la demo:** Dirección, Recepción, Housekeeping, Cocina (con F&B dentro), Mantenimiento, CFO, RRHH.
- **Commit WIP sin pushear** y pendiente decisión Daniel sobre publicar las 20 pantallas a gh-pages.
- **Nota pendiente a supervisor** sobre rol IA de seguridad cross-portfolio.

Modelo mental anterior: Bravas era **demo especulativa esperando feedback de una clienta española** (patrón Tile) antes de avanzar.

---

## 2. Primer pivote del día: Bravas deja de ser demo especulativa

Daniel aclaró al arranque:

- **La clienta ES deja de ser bloqueante.** Si entra, suma. Si no entra, Octo lanza igual.
- **Lanzamiento primero en Argentina** — hoteles boutique en Capital (contactos propios de Daniel) + hoteles de costa Argentina.
- **España queda como segunda geografía** pero contemplada desde el modelo de datos del día 1 — NO "AR primero y después parchamos ES", sino bi-fiscal/bi-legal desde el schema inicial.
- **Lo que es COMÚN AR y ES** (~80% estimado): operatoria interna del hotel + flujo del huésped. Recepción, HK, cocina, mantto, F&B, reservas funcionan igual.
- **Lo que es SPLIT** (~20%): contable, pagos, RRHH/convenio, legal fiscal. AFIP vs Hacienda, modelo 303 vs IVA, convenios laborales distintos.
- **Scope completo desde día 1** — palabras literales: *"Si está en el objetivo, lo hacemos completo de entrada. No construimos una versión básica pensando 'después lo mejoro'."* Alineado con BIBLIA Octo.

---

## 3. Diagnóstico honesto de bravas sobre la demo actual

Mi respuesta a Daniel: la demo F2.5 con 6 sectores **NO es exhaustiva**. Está pensada para storytelling visual, no para operación real de 4\*. Cada pantalla tiene 5-8 funciones representativas, no las 30-50 reales que cada rol tiene en operación.

Ejemplos de lo que ya se ve que falta:

- **Huésped:** registro + estado habitación + solicitudes + pago. Falta: chat 24h, servicio habitación menú completo, llave digital, late-checkout, planchado, parking, bebés/cunas, early-arrival, upselling, encuestas post-estadía, facturación nominativa, impuesto turístico ES, firma digital ley viajero.
- **Housekeeping:** checklist habitación. Falta: inventario minibar por habitación, lost&found, consumos amenities, ropa de cama por ciclo, bloqueo por fumigación, deep cleaning calendarizado, reporte desperfectos → mantenimiento, rotación turnos, carga carro, pedido lavandería, control químicos.
- **Mantenimiento:** la distinción caliente vs interno no está modelada. Falta: preventivo calendarizado, caldera, piscina, ascensores con empresa externa, extintores con vencimiento, licencias hoteleras ES/AR, proveedores recurrentes, histórico por habitación, repuestos stock.
- **Y mismo nivel de "falta exhaustividad" en cocina, recepción, admin/CFO, RRHH.**

Daniel aceptó el diagnóstico y confirmó: **hacerlo exhaustivo AHORA, antes del código**. Apoyó en BIBLIA Octo.

---

## 4. Primera investigación — Departamentos hoteleros 4-5\*

Bravas lanzó sub-agente para investigar estructura típica de departamentos en hoteles 4\* y 5\* (organigramas reales, qué departamentos nos estamos perdiendo, variantes por tipo).

**Output:** `memory/INVESTIGACION_departamentos_hoteles_2026-11-08.md`

### Hallazgos clave

**Faltantes CRÍTICOS en la demo (todo 4\* los tiene):**

1. **Comercial / Ventas & Marketing / Revenue Management** — sin esto el PMS no se enchufa a OTAs ni hace yield management.
2. **F&B Servicio (salón/bar/room service) — SEPARAR de Cocina.** En la demo mezclamos los dos mundos bajo "Chef Ejecutivo". En 4\* real: Maître y Chef son jefes paralelos.
3. **Economato / Compras / Almacén** — donde se juega el costo F&B. Flujo propio.
4. **Seguridad** — obligatorio normativa (Ley Seguridad Privada ES, Ley 19.587 AR).

**Faltantes IMPORTANTES:**
- IT / Sistemas (toggle interno/externo según tamaño).
- Guest Experience / Calidad (mejor como módulo transversal).
- Conserjería / Bell Desk / Valet (sub-sector de Front Office).

**Opcionales según tipo de hotel:**
- Spa & Wellness · Animación/Kids Club · Eventos/Banquetes · Jardinería/Piscina.

**Diagnóstico de la lista actual:** cubre un hotel 3\* o un boutique chico. **NO cubre un 4\* legítimo.**

### Recomendación final de la investigación

**De 6 sectores pasar a 11 base + 5 opcionales + 2 módulos transversales.**

---

## 5. Decisiones de Daniel post-investigación (primera ronda)

### 5.1 Lista de 11 sectores base — CONFIRMADA

1. Dirección
2. Recepción / Front Office
3. Housekeeping (gobernanta + operativo)
4. **Cocina** (jefe: Chef Ejecutivo — producción)
5. **F&B Servicio** (jefe: Maître — salón, bar, room service) ← NUEVO, separado de Cocina
6. Mantenimiento
7. CFO / Administración
8. RRHH
9. **Comercial / Ventas / Revenue Management** ← NUEVO
10. **Economato / Compras / Almacén** ← NUEVO
11. **Seguridad** ← NUEVO

### 5.2 Modelo producto = PACK SYSTEM — CONFIRMADO

Daniel NO quiere "un producto fijo por tier". Quiere **un core base + packs togglables en onboarding + libertad total** para que cada hotel sume/saque módulos. Palabras suyas: *"quiero tener esta libertad de decir: le agrego este módulo, le saco este módulo."*

Estructura:

```
CORE — todos los hoteles
├─ 11 sectores base
├─ 2 transversales (Guest Experience, Sostenibilidad — pendiente validación Daniel sobre Sostenibilidad)
└─ Infra común: auth, fichaje, i18n, branding per-tenant

PACK RESORT (opt-in)
├─ Spa & Wellness
├─ Animación / Kids Club
├─ Jardinería / Piscina / Áreas verdes
└─ Playa / Deportes acuáticos

PACK EVENTOS (opt-in)
├─ Banquetes / Catering
├─ Salones de convenciones
└─ MICE

PACK CORPORATIVO (opt-in)
├─ Comercial corporativo pesado
├─ Facturación corporativa
└─ Portal self-service empresas
```

Tipos típicos:
- **Boutique urbano chico:** Core con sectores en "modo light".
- **Urbano 4\* 80-150 habs:** Core completo (target primario Bravas AR).
- **Resort costa:** Core + Pack Resort (+ Eventos si aplica).
- **Hotel negocios:** Core + Pack Eventos + Pack Corporativo.
- **Combinaciones libres:** cualquier mix.

**Implicancia técnica:** cada módulo del catálogo (sector o pack) es un paquete `@octo/*` independiente con feature flag. Al dar de alta el hotel, prende/apaga módulos y el bundle se ajusta.

### 5.3 Guest Experience — DECISIÓN DANIEL

Después de que bravas explicó qué significa "transversal" (capa que atraviesa sectores sin portal propio), Daniel dijo que **GX es sector propio con portal propio en el Core, tenga o no empleado dedicado el hotel.** Más: **Pack "Experience Premium"** opcional para 5\* grandes con Director GX y equipo completo.

**Patrón "dual-fire" requerido** (palabras de Daniel: *"cuando dispara uno dispara los dos"*):

Cada acción vinculada a experiencia del cliente se dispara en el sector operativo responsable **Y también** entra al inbox del portal de GX.

| Acción | Sector operativo primario | Copia a inbox GX |
|---|---|---|
| Encuesta post-estadía enviada | Admin / Recepción | ✓ |
| Reseña online nueva (Booking, Google, TripAdvisor) | Comercial | ✓ |
| Queja del huésped vía app | Recepción (o sector afectado) | ✓ |
| Fidelización — alta/baja | Admin | ✓ |
| Compensación otorgada | Recepción | ✓ |
| Feedback directo en check-out | Recepción | ✓ |

Técnicamente: event bus (`gx_events`) con fan-out desde sectores operativos. Doctrina completa documentada en `memory/doctrina/event-bus-gx-dual-fire.md` (schema SQL + patrón de emisión + Supabase Realtime + compliance RGPD/Ley 25.326).

### 5.4 i18n 3 locales — CONFIRMADO

- `es-ES` (España)
- `es-AR` (LATAM)
- `en` (diseñado pero no activo al arranque)

Con nomenclatura customizable per-tenant encima del locale (ej: un hotel AR puede cambiar "mucama" → "ama de llaves"). Esto va en los slots de extensión.

### 5.5 Separar F&B Servicio de Cocina — CONFIRMADO

(Asumido por default, no contradicho por Daniel.)

---

## 6. Segunda investigación — Relevamiento de 37 hoteles reales

Daniel pidió textualmente: *"puedes hacer un relevamiento de 30 hoteles entre ellos cinco o cuatro y tres estrellas buscando un organigrama, un esquema de jerarquía y cómo está armado... haz el relevamiento y mostrame dos o tres por favor de cómo están armados."*

Sub-agente trabajó y entregó **37 hoteles** (sobrepasó los 30). Output: `memory/RELEVAMIENTO_organigramas_30_hoteles_2026-11-08.md` (555 líneas, 37 fichas, matriz comparativa 30×15 departamentos, 3 organigramas visuales detallados).

### 6.1 Muestra

- **37 hoteles** con organigrama identificado (vía web oficial, LinkedIn/RocketReach/TheOrg/TheOfficialBoard, press kits, escuelas hospitality).
- **Mix categoría:** 26×5\* · 9×4\* · 2×3-4\* boutique.
- **Mix geográfico:** 10 AR (BA + MdP + Bariloche + Mendoza) · 9 ES (Madrid + Barcelona) · 7 LATAM resto (Montevideo, Santiago, CDMX, Lima) · 11 internacional (Berlín, NY, HK, Singapur).
- **Tipos:** boutique urbano · urbano medio · resort · negocios · integrated resort.

### 6.2 Patrones universales (lo tienen 37/37)

- Dirección
- Front Office
- Housekeeping
- Cocina
- Administración
- Mantenimiento

### 6.3 Patrón 4\*+ (≥90% lo tienen)

- Comercial / Ventas
- F&B Servicio separado de Cocina
- RRHH
- Reservas

Esto **confirma empíricamente los 4 faltantes críticos** que había detectado la primera investigación.

### 6.4 Patrones 5\* o cadena grande (≥60%)

- Guest Experience como dept propio (12/37, "en ascenso")
- "Rooms Division" como agrupador FO+HK+Reservas+Concierge (15/37, cadenas internacionales). **En AR independientes NO existe.**
- "Director de Operaciones" como capa intermedia GM↔depts (5/37, 5\* grandes)
- Revenue Management como dept separado (1/37, solo Marriott)
- IT interno (5/37, el resto terceriza o lo mete bajo Finance)
- Seguridad propia (10/37, el resto terceriza)
- Economato separado de Admin (12/37)

### 6.5 Patrones exclusivos (lujo máximo o verticales raros)

- Casino (3/37): Park Hyatt Mendoza, Sofitel Carrasco, Marina Bay Sands.
- Golf (2/37): Llao Llao.
- Retail (3/37): Marina Bay Sands.
- Spa propio (resorts siempre, urbanos 5\* ~80%, urbanos 4\* ~15%).

### 6.6 Variaciones regionales (terminología i18n crítica)

- **AR:** "Mucama" / "Camarera" para housekeeper · "Gobernanta" / "Ama de llaves" · "Mozo" / "Camarero" para F&B · "Almacén / Depósito" · "SeHyS" (Ley 19.587) para PRL.
- **ES:** "Camarera de pisos" · "Gobernanta" (nunca "Ama de llaves") · "Camarero" · "Economato" · "PRL" (Ley 31/1995).
- **MX:** "Ama de llaves" · "Mozo" · "Economato".
- **Internacional (cadena premium):** "Room attendant" · "Executive Housekeeper" · "Server" · "People & Culture" (reemplazó a "RRHH" en 100% de FS/Marriott/Hyatt).

### 6.7 Variaciones por tipo de hotel

- **Boutique 20-40 habs:** 2 niveles jerárquicos planos. Muchas funciones centralizadas en el GM. 6-7 sectores max, mucho multi-rol.
- **Urbano 4\* 80-150 habs:** 11 sectores base + variantes "Rooms Division". 3 niveles típicos.
- **Resort 5\* + Casino/Convention:** 11 + packs Resort + Eventos. 4 niveles. Verticales (Casino) como "sub-propiedad".
- **Integrated resort (Marina Bay):** 6 niveles. C-suite propio (COO, CFO, CIO, Chief Hospitality Officer). No es target Bravas, es techo aspiracional.

### 6.8 Los 3 organigramas destacados (ejemplos reales)

#### Ejemplo A — FIERRO HOTEL BUENOS AIRES (4\* boutique · 27 habs · 15 empleados · independiente · target primario Bravas)

```
└── Gerente General (Laura Morillo)
    ├── Operation Manager (Federico Alló)
    │   ├── Front Office
    │   │   ├── Supervisora Recepción
    │   │   ├── Recepcionistas
    │   │   └── Concierge
    │   └── Housekeeping
    │       └── Camareras
    ├── F&B — restaurante UCO
    │   ├── F&B Manager (Roberto Cavazza)
    │   ├── Head Sommelier
    │   └── Cocina → Cocinero + brigada
    └── [Comercial, RRHH, Admin → externalizados o asumidos por GG]

· Sin Revenue Management, sin IT, sin Security formal
· Spa, Mantenimiento = tercerizados
· 2 niveles jerárquicos
```

#### Ejemplo B — PARK HYATT MENDOZA (5\* · 186 habs + Casino + Convention · Hyatt · 173 empleados)

```
└── General Manager (Miguel Urmeneta)
    ├── Director of Operations (Victor Grandi)
    │   ├── Rooms Division ← agrupador
    │   │   ├── Front Office Manager
    │   │   ├── Housekeeping (Gobernanta)
    │   │   └── Reservas
    │   ├── F&B — 7 outlets
    │   │   ├── Executive Chef → Jefes de Partida → Cocineros
    │   │   ├── Maître + salón
    │   │   ├── Banquetes
    │   │   ├── Convention Center F&B
    │   │   ├── Bistró M, Uvas Bar, El Patio, Café, Alea Sport Bar
    │   │   └── Room Service
    │   ├── Mantenimiento / Engineering
    │   └── Gimnasio
    ├── Director of Finance (11 empleados) → Contabilidad · Compras · IT (2 ppl)
    ├── Associate Director of Marketing → Comercial (Sales + Marketing Digital)
    ├── RRHH (3 empleados)
    ├── Seguridad
    └── Casino (sub-propiedad Dreams Plaza)

· 4 niveles jerárquicos
· 7 outlets F&B
· IT bajo Finance
· Casino como sub-propiedad
```

#### Ejemplo C — MARINA BAY SANDS (Singapore · 5\* · 2,561 habs · 11,800 empleados · benchmark aspiracional)

```
└── Chief Operating Officer (Paul Town)
    ├── SVP Casino Operations · SVP Retail (170+ tiendas)
    ├── Chief Hospitality Officer
    │   ├── VP Hotel Operations (Rooms + Reservations + Guest Experience)
    │   ├── VP F&B — 80+ restaurantes
    │   └── Spa (Banyan Tree)
    ├── VP Facilities (Engineering · Technical · Grounds)
    ├── CFO · CIO · People & Culture
    ├── Security & Loss Prevention
    ├── Convention Center · Entertainment
    └── ArtScience Museum + Observation Deck

· C-suite propio del hotel (único en el relevamiento)
· 6 niveles jerárquicos
· NO target Bravas — techo aspiracional
```

### 6.9 Conclusiones empíricas del relevamiento

1. **Ningún hotel se parece a otro** en los 5 ejes simultáneamente (tamaño, jerarquía, sectores propios, verticalización, terminología).
2. **Jerarquía: máximo 4 niveles operativos** salvo Marina Bay (no es target). Modelo de datos NO necesita árbol infinito.
3. **Sostenibilidad: 0/37** como dept propio en hoteles individuales. Solo aparece a nivel corporativo de cadena. Conclusión: para Bravas = transversal opcional, NO sector principal.
4. **GX en ascenso:** 12/37 como dept propio ya hoy. Decisión de Daniel de incluirlo validada por el mercado.
5. **"People & Culture" ya reemplaza a "RRHH"** en 100% de cadenas premium. Independientes AR/ES siguen con "RRHH". i18n customizable por tenant no es cosmético, es necesidad.
6. **Verticales raros (Casino/Golf/Marina/Retail) nunca cruzan entre hoteles** — son unidades de negocio adosadas con flujos propios. Deben ser modules activables, no features internas.

---

## 7. Decisiones de Daniel post-relevamiento (segunda ronda)

### 7.1 "Rooms Division" como feature agrupador opcional — CONFIRMADO

No es sector nuevo, es **feature "agrupador"** que el tenant activa si su hotel lo usa. Si prende: FO + HK + Reservas quedan bajo un "Director of Rooms Division". Si no prende: cada uno reporta al director.

### 7.2 "Director de Operaciones" como meta-rol de permisos — CONFIRMADO

**NO es un sector con portal propio.** Es un **nivel de permiso de edición cross-departamental** entre GM y Directores de Dept. Aparece en 5/37 (5\* grandes). En boutique no existe.

### 7.3 Verticales (Casino / Golf / Marina / Retail) como 4° nivel opcional — CONFIRMADO

Se diseñan como módulos ultra-opcionales que el tenant activa explícitamente si tiene esa amenity. Base inicial: 4 verticales + abierto a sumar (Spa ya está en Pack Resort, por ejemplo).

### 7.4 Core de 11 con flags "tercerizado" para Seguridad / Economato — CONFIRMADO

Daniel optó por **mantener los 11 en Core** (la recomendación de bravas vs la del relevamiento que sugería moverlos a opcionales). Razón: *"no nos quedemos cortos para el 4\* urbano completo"*. En hoteles chicos donde Seguridad y Economato están tercerizados o subsumidos, se activan en "modo tercerizado" (flag) o "modo embebido en otro sector" (sub-función).

---

## 8. La pregunta estratégica más grande del día

Después de ver el relevamiento (37 hoteles organizados TODOS distinto), Daniel preguntó textualmente:

> *"No sé si el SaaS va a ir. ¿No tendríamos que tener una base y ofrecer una app especializada para cada uno de los hoteles? Porque todos tienen las cosas organizadas de diferentes formas. ¿Nosotros les imponemos nuestro organigrama o nos adaptamos?"*

Y más explícito:

> *"Si somos una agencia de software, qué le ves de contra hacer apps para el mercado hotelero, una app por cada uno y mantenimiento ingreso mensual? Sé sincera, marcame los puntos pro y cons en ambos casos."*

Bravas presentó análisis sincero de pros/cons de los 2 modelos extremos + un modelo híbrido.

### 8.1 Análisis SaaS único (modelo A)

**Pros:**
- Escala real (mismo producto, N clientes, costo marginal bajo).
- MRR predecible, valuación alta (5-15x revenue), captación inversión posible.
- Mejora del producto beneficia a todos.
- Equipo chico sostiene mucho (100 hoteles con 4-5 personas posible).
- Independencia del fundador, benchmark cross-hotel como activo, expansión geográfica fácil.

**Contras:**
- Entrada difícil al mercado AR (desconfianza al SaaS global).
- Precio percibido bajo vs "mi app custom".
- Primer año duro (CAC alto, time-to-revenue largo).
- Competencia establecida (Cloudbeds, Mews, PxSol).
- Diseño MUY cuidadoso del producto — si los slots fallan, el modelo cae.
- Onboarding complicado para hoteles AR (no son self-serve).

### 8.2 Análisis Agencia (modelo B)

**Pros:**
- Entrada fácil al mercado AR (cultura local de "agencia que hace apps").
- Precio alto por venta inicial (US$8-20k custom + US$300-800/mes mantenimiento).
- Diferenciación percibida ("mi app única") — argumento de venta brutal.
- Flexibilidad total (hotel raro = lo hacés).
- Barrera de salida alta, retención muy alta.
- Aprendizaje concentrado por cliente.
- Argentina favorece el modelo culturalmente.

**Contras (brutales):**
- **No escala** — 10 clientes = 10× el trabajo. Techo práctico ~30-40 clientes con equipo chico.
- **Mantenimiento × N apps = infierno operativo.** 20 bases de código a mantener.
- Cada feature nueva es trabajo custom, no hay "producto que mejorar".
- Dependencia total del equipo humano.
- Valuación baja (1-3x revenue).
- Captación de inversión casi imposible (VCs invierten SaaS, no agencias).
- Soporte 24/7 complicado (hoteles operan 24/7).
- Compliance acumulado × N hoteles.
- Decisión prácticamente irreversible — una vez con 15 apps, migrar a SaaS es proyecto de 2 años.
- Tokens AI consumidos linealmente con clientes.

### 8.3 Recomendación inicial de bravas (previo a decisión Daniel)

**Modelo híbrido SaaS + Servicios de Implementación:**
- **Técnicamente:** Pack System que ya decidimos. UN producto, N tenants.
- **Comercialmente:** tres tiers de onboarding (Self-Setup / Guided / Enterprise).
- *[Nota 2026-11-08 corrección de brief: el pricing específico queda fuera de scope de la reunión de arquitectura.]*

---

## 9. Decisión de Daniel sobre el modelo (FIRME)

Después de leer los pros/cons, Daniel tomó la decisión. Palabras literales (parafraseadas):

> *"Para empezar y generar experiencia, hacer una app custom para cada uno de los hoteles va a ir bien, es bueno, verlo funcionando. Esto va a ser como se hizo Tile y su Soup — la custom y lo fuimos construyendo al mismo tiempo. La SaaS va a tener que salir unas básica con todos los módulos, eso es seguro. [...] Después en la estrategia de venta seguramente vayamos primero algunas app custom adaptadas a cada uno de los hoteles. [...] Yo me voy a poner un límite: si veo que son varios hoteles, no tomo más de 3-4-5 hoteles como máximo y después me dedico bien."*

### 9.1 Modelo oficial Bravas

**Híbrido "custom-first con cap 3-5" + SaaS paralelo — patrón Tile → Soup replicado.**

1. **Fase 1 — Customs cappeadas:** Apps custom para **3-5 hoteles máximo** (cap duro). Capital rápido + experiencia + validación.
2. **Fase 2 — SaaS puro:** Después del cap, Octo pasa a modo SaaS puro. Las customs pueden quedarse con deploy dedicado premium o migrar a tenant compartido.
3. **En paralelo (todo el tiempo):** SaaS base con todos los módulos (los 11 sectores + packs + GX dual-fire + i18n) se construye alimentándose del aprendizaje de las customs.

### 9.2 Rationale de Daniel

- Capital rápido desde el día 1 (customs facturan alto).
- Experiencia real en terreno (cada hotel enseña).
- La custom funciona como **herramienta de venta** del SaaS: *"te lo muestro, me decís que tu estructura es distinta, te lo adapto. O si veo que me equivoqué con la SaaS, le hago una aplicación directa."*
- Es el **patrón Tile → Soup** que Octo ya probó.

### 9.3 Doctrina técnica CRÍTICA derivada

**Las customs NO son apps forkeadas del SaaS.** Son **deploys dedicados del MISMO código** (`@octo/bravas-*` paquetes compartidos), con Supabase propio + Vercel propio + branding propio por hotel.

Si fueran forks reales caeríamos en el "infierno operativo de agencia" que bravas advirtió en los contras. **Esta distinción es lo que hace viable el modelo híbrido vs la agencia pura.**

Concretamente:
- UN codebase (`@octo/bravas-*`)
- UN set de módulos (los 11 + packs + GX dual-fire + i18n)
- Deploy por hotel: Supabase propio + Vercel propio + config propia + MISMO código fuente corriendo.
- SaaS compartido futuro: mismo código, Supabase compartida con RLS, N tenants.
- Migration: cuando un custom quiera migrar a SaaS compartido = `export → import` + cambio de deploy. No reescribir nada.

---

## 10. Adelantos técnicos entregados por bravas durante la sesión

1. **Publicación F2.5 20 pantallas a gh-pages** (commit `dfdd8cf`). Link oficial actualizado: `https://octosolucionesdigitales-png.github.io/hotel-bravas-demo/v2.5/`. Verificado HTTP 200 en los 4 archivos nuevos (`empleado-jefe-admin.html`, `empleado-jefe-rrhh.html`, `empleado-admin.html`, `empleado-rrhh.html`) + index con "PMS + ERP vertical · 6 dptos".
2. **Índice completo del catálogo** — `memory/catalogos/_INDEX.md` con **28 módulos funcionales + 2 features + 7 servicios infra** y sus códigos técnicos definidos.
3. **Template canónico del catálogo** — `memory/catalogos/_TEMPLATE_catalogo_sector.md` con 17 secciones por ficha de módulo (identificación, roles, portales, funciones exhaustivas, entidades, estados, integraciones, mapa geográfico, slots, i18n, compliance, lifecycle, KPIs, pantallas).
4. **Doctrina técnica event bus GX dual-fire** — `memory/doctrina/event-bus-gx-dual-fire.md` con enum de 18 tipos de eventos + schema SQL + patrón de emisión + Supabase Realtime + agregaciones + compliance RGPD/Ley 25.326.
5. **HILO.md actualizado** con todas las decisiones del día.
6. **Nota a estratega creada** (para fase comercial futura — archivada hasta que Daniel la active).

---

## 11. Corrección de brief Daniel al cierre (lo que motivó esta reunión)

Daniel aclaró al equipo via supervisor: **la reunión NO trata precios/comercial.** El pricing lo define él después. Trata **arquitectura técnica pura**.

### 11.1 Pregunta central para la reunión

**¿Cómo construimos Bravas dado que los 37 hoteles relevados tienen estructuras completamente distintas?**

Las 3 opciones sobre la mesa:
- **A)** SaaS base único con packs/módulos toggleables (un mismo código, diferentes activaciones según tipo de hotel).
- **B)** Custom para cada hotel (apps dedicadas, posiblemente con código propio por cliente).
- **C)** Híbrido (como la discutimos — customs son deploys dedicados del MISMO código, patrón Tile→Soup).

### 11.2 Lo que Daniel quiere saber

1. Cuál de las 3 opciones es más viable y por qué, dada la diversidad real.
2. Qué tan simple o complejo es cada opción desde lo técnico y operativo.
3. Si van con la opción elegida, cómo se aplica concretamente a hoteles muy distintos entre sí.
4. Cuántos agentes IA (Opus/Sonnet — NO humanos) necesitan por opción + hasta cuántos conviene agregar antes de que deje de ser viable/rentable.

### 11.3 Lo que NO hay que tocar

Precios, rangos, fees, planes comerciales. Daniel los define después con input de estratega.

---

## 12. Tesis técnica central de bravas para la reunión

**La pregunta real NO es "¿cuál opción?" — es "¿cuán sólidos podemos construir los slots de extensión?"**

Si los slots de extensión (campos custom, workflows custom, integraciones per-tenant, nomenclatura per-tenant, branding per-tenant) son **sólidos**:
- Opción A es viable y escalable.
- Opción C es la misma opción A + deploys dedicados para primeros clientes (sin diferencia estructural real).

Si los slots son **frágiles**:
- Opción A falla con el hotel #7 que pide algo no previsto.
- Opción C degenera en opción B (apps separadas de facto).
- Opción B es el fallback inevitable.

**Esa es la pregunta técnica de fondo que arquitecto tiene que responder.**

El relevamiento muestra que los 37 hoteles varían en 5 ejes estructurales:
1. Tamaño (15-11,800 empleados)
2. Perfil (boutique / urbano / resort / negocios / integrated)
3. Geografía legal (AR / ES / LATAM / internacional)
4. Cultura organizacional (cadena vs independiente)
5. Verticales adosados (casino / golf / spa / marina / retail)

**Cualquier arquitectura tiene que absorber los 5 ejes como ciudadanos de primera clase, no como excepciones.**

---

## 13. Lo que bravas tiene listo para arrancar apenas se cierre la decisión

- ✅ 28 módulos funcionales + 2 features + 7 servicios infra identificados
- ✅ Template canónico de catálogo exhaustivo (17 secciones)
- ✅ Doctrina técnica event bus GX dual-fire
- ✅ Demo F2.5 20 pantallas pública como referencia visual
- ✅ 2 investigaciones completas validadas
- ⏸ **Catálogos exhaustivos** por sector/módulo — arrancan apenas la reunión cierre el modelo y arquitecto confirme la solidez de los slots.

---

## 14. Preguntas abiertas que la reunión debe resolver

### Para arquitecto
1. ¿Qué nivel de solidez pueden tener los slots de extensión bajo cada opción (A/B/C)?
2. ¿Qué pasa si una custom en Fase 1 pide algo que no cabe en los slots? Criterio técnico.
3. ¿Cómo se ejecuta técnicamente "custom = deploy dedicado del SaaS"? Pipeline de deploy.
4. ¿Cuántos paquetes `@octo/bravas-*` resultan del índice (28 módulos + 2 features + 7 infra)? Granularidad.
5. Recomendación arquitectónica + camino menos destructivo si en 6 meses hay que pivotar.

### Para optimización
1. Cuántos agentes Opus + Sonnet por cada opción (A/B/C).
2. Techo práctico de cada opción (cuántos hoteles sostiene Octo con N agentes).
3. Punto de inflexión donde agregar más agentes aumenta coordinación más de lo que acelera entrega.
4. Dónde cada opción deja de ser viable (en términos de capacidad, no precio).

### Para Daniel (después del consolidado del supervisor)
- Decisión definitiva A/B/C con recomendación del equipo técnico.
- Validación de Sostenibilidad como transversal vs sector (pendiente desde el inicio).
- ¿Backup Vercel al link público además de GH Pages?
- Priorización Bravas vs otros proyectos del mes (massageos, miba, etc.).

---

## 15. Apéndice — Insumos de referencia

- `~/Desktop/OctoSD/HotelBravas/memory/HILO.md` — historial completo de bravas con detalle día por día.
- `~/Desktop/OctoSD/HotelBravas/memory/INVESTIGACION_departamentos_hoteles_2026-11-08.md` — 657 líneas, estructura típica 4\*/5\*.
- `~/Desktop/OctoSD/HotelBravas/memory/RELEVAMIENTO_organigramas_30_hoteles_2026-11-08.md` — 555 líneas, 37 hoteles, matriz comparativa, 3 organigramas.
- `~/Desktop/OctoSD/HotelBravas/memory/CONSOLIDADO_apps_hoteleras_2026-10-31.md` — benchmark de 6 apps hoteleras del mercado.
- `~/Desktop/OctoSD/HotelBravas/memory/catalogos/_INDEX.md` — 28 módulos del producto Bravas.
- `~/Desktop/OctoSD/HotelBravas/memory/catalogos/_TEMPLATE_catalogo_sector.md` — template canónico.
- `~/Desktop/OctoSD/HotelBravas/memory/doctrina/event-bus-gx-dual-fire.md` — doctrina técnica GX.
- `~/casa/bandejas/supervisor/2026-11-08-bravas-presentacion-reunion-arquitectura.md` — presentación bravas para la reunión.
- `~/casa/bandejas/arquitecto/2026-11-08-bravas-pivote-saas-completo-catalogo-exhaustivo.md` — nota a arquitecto.
- `~/casa/bandejas/optimizacion/2026-11-08-bravas-capacidad-equipo-mes-saas-completo.md` — nota a optimización.

— bravas, 2026-11-08
