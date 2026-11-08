# HILO — Hotel Bravas · rol `bravas`

> **Nota sobre el nombre del producto:** "Bravas" es el nombre INTERNO de trabajo. El nombre comercial definitivo está PENDIENTE — Daniel lo decide antes de arrancar código. Cuando lo decida, actualizar esto, el BRIEF y las notas correspondientes.

---

## 🛑 ESTADO AL CIERRE DEL DÍA 2026-11-08 — LEER PRIMERO EN LA PRÓXIMA SESIÓN

### Resumen de una línea

Día grande: pivote estratégico a SaaS AR+ES, 2 investigaciones, modelo oficial decidido (híbrido custom-first + SaaS paralelo, patrón Tile→Soup), reunión arquitectura convocada y pendiente de consolidado del supervisor, **nombre comercial del producto PENDIENTE DE DANIEL**.

### Bloqueantes para arrancar código

1. **Nombre comercial definitivo del producto** → Daniel decide. HASTA ENTONCES NO ARRANCA NADA DE CÓDIGO.
2. **Decisión arquitectónica final** (A SaaS puro / B Custom / C Híbrido) → reunión arquitecto + optimización convocada, pendiente de resultado consolidado por supervisor. La decisión implícita de Daniel ya es "C Híbrido custom-first con cap 3-5" pero el equipo técnico tiene que validar viabilidad concreta y responder: cuántos agentes Opus/Sonnet por opción, techo de escalabilidad, solidez de los slots de extensión.

### Qué pasa en la próxima sesión

Daniel instruyó textualmente: *"Para la próxima sesión, retomamos con nombre definido y arrancamos Fase 0 (catálogo 11 sectores + arquitectura paquetes)."*

**Arrancamos Fase 0 cuando:**
- Nombre del producto definido ✓ (Daniel)
- Consolidado del supervisor con decisión arquitectónica entregado ✓
- Alineación arquitecto sobre solidez de slots ✓

**Fase 0 consiste en:**
1. Catálogo exhaustivo de los 11 sectores base (siguiendo el template canónico ya listo en `memory/catalogos/_TEMPLATE_catalogo_sector.md`).
2. Arquitectura concreta de paquetes `@octo/<producto>-*` (28 módulos + 2 features + 7 servicios infra definidos en `memory/catalogos/_INDEX.md`).
3. Rename global del placeholder "bravas" al nombre definitivo en todos los artefactos (índice, template, doctrina GX, HILO, notas, BRIEF).

---

## Dónde quedamos (última actualización: 2026-11-08 cierre)

**🟢 RETOMAR DESDE:** Bravas pivoteó hoy a **SaaS hotelero completo AR + ES**. Clienta ES deja de ser bloqueante. Target primario = hoteles boutique Capital + costa Argentina 4*. ES queda como segunda geografía desde día 1 del schema. Antes de código N2 real, hay 4 entregables doctrinales (catálogo exhaustivo + mapa geo + slots de extensión + decisión modelo producto). **Reunión pedida a supervisor:** bravas + arquitecto + optimización (notas dejadas en las 3 bandejas). Investigación departamentos completada hoy — scope se amplía de 6 a 11 sectores base + 5 opcionales + 2 transversales.

**20 pantallas F2.5 publicadas a gh-pages hoy** (commit `dfdd8cf` gh-pages, `fd93a8a` main). Link oficial actualizado: `https://octosolucionesdigitales-png.github.io/hotel-bravas-demo/v2.5/`.

### Pivote del 2026-11-08 (claves)

- **Daniel lanza Bravas con o sin clienta ES.** La clienta queda como "segunda opción".
- **Modelo:** SaaS hotelero completo para lanzar primero en Argentina (boutique Capital + costa), con España como segunda geografía desde día 1 del schema.
- **Común vs split:** ~80% común (operatoria interna + flujo huésped), ~20% split (contable, pagos, RRHH/convenio, legal fiscal).
- **BIBLIA aplica:** antes del código, catálogo exhaustivo. Nada de "construir versión básica y mejorar después".

### Hallazgo investigación departamentos (crítico)

De 6 sectores actuales → **11 base + 5 opcionales + 2 transversales**. Faltantes CRÍTICOS para 4* legítimo:
1. **Comercial / Ventas / Revenue Management** — sin esto no hay yield ni OTAs.
2. **F&B Servicio** — separar de Cocina (hoy están mezclados). Maître y Chef son jefes paralelos en 4*.
3. **Economato / Compras / Almacén** — flujo propio donde se juega el costo F&B.
4. **Seguridad** — obligatorio normativa (Ley Seguridad Privada ES / Ley 19.587 AR).

Doc completo: `memory/INVESTIGACION_departamentos_hoteles_2026-11-08.md` (657 líneas).

### Decisiones Daniel cierre 2026-11-08

- ✅ **Lista de 11 sectores base confirmada.** Dirección, Recepción, HK, Cocina, F&B Servicio (separado), Mantenimiento, CFO, RRHH, Comercial/Revenue, Economato, Seguridad.
- ✅ **Modelo producto = PACK SYSTEM.** Core (los 11 + 2 transversales) + Pack Resort + Pack Eventos + Pack Corporativo. Togglables por hotel en onboarding. Hotel urbano 4\* completo = core completo (es el target primario). Boutique chico = core con módulos en "modo light". Resort = core + Pack Resort. Negocios = core + Pack Eventos + Pack Corporativo. Libertad total: cada hotel suma/saca módulos.
- ✅ **i18n confirmada: 3 locales** (es-ES, es-AR, en diseñado pero no activo).
- ✅ **Scope completo desde día 1** — nada de "básico y mejoro después", según BIBLIA. Arrancamos catálogos de los 11 base + los 3 packs completos.

### Decisión Daniel — Guest Experience 2026-11-08 cierre

- ✅ **GX es sector propio con portal propio en el Core**, tenga o no empleado dedicado el hotel.
- ✅ **Patrón dual-fire:** cada acción del huésped se dispara en el sector operativo (Recepción/HK/F&B/Comercial según) Y entra también al inbox del portal de GX (copia). Palabras: *"cuando dispara uno dispara los dos"*.
- ✅ **Pack "Experience Premium" opcional** para 5\* grandes con Director GX y equipo dedicado.
- Técnicamente implica event bus (`guest_experience_event`) que hace fan-out desde sectores operativos.

### Pendiente Daniel

- **Sostenibilidad:** no se expidió. Provisoriamente queda transversal en Core. Volver a plantear.
- **Backup Vercel** del link público.
- **Prioridad Bravas vs otros proyectos del mes.**

### Relevamiento 37 hoteles entregado 2026-11-08

Doc completo: `memory/RELEVAMIENTO_organigramas_30_hoteles_2026-11-08.md` (555 líneas, 37 fichas, matriz comparativa, 3 organigramas visuales).

**Hallazgos clave:**
- Ningún hotel organizado igual. 37 variantes.
- Universal (37/37): Dirección · FO · HK · Cocina · Admin · Mantto.
- 4\*+ (≥90%): Comercial/Ventas · F&B Servicio separado · RRHH · Reservas → gaps confirmados vs demo.
- Rooms Division como agrupador: 15/37 (cadenas internacionales 5\*). En AR independientes no existe. Solución: feature "agrupador" opcional.
- Revenue Management: 28/37 bajo Comercial. Solo Marriott lo separa.
- Guest Experience como sector propio: 12/37. Rol en ascenso. Validado el camino de Daniel.
- Sostenibilidad: 0/37 como sector individual (solo corporativo de cadena). Confirma transversal.
- Jerarquía: máximo 4 niveles operativos (excepto Marina Bay que es otro universo).
- i18n obligatorio: "Gobernanta" vs "Ama de Llaves", "People & Culture" vs "RRHH".

**Decisiones Daniel sobre el relevamiento:**
- Rooms Division como feature agrupador opcional ✓
- Director de Operaciones como meta-rol de permisos (no sector) ✓
- Verticales (Casino/Golf/Marina/Retail) como 4° nivel opcional ✓
- Core de 11 con flags "tercerizado/subsumido" para Seguridad/Economato ✓

### 🔴 Pregunta estratégica abierta — reunión convocada

Daniel vio el relevamiento y preguntó dos cosas gordas al cierre:

1. *"No sé si el SaaS va a ir. ¿No tendríamos que tener una base y ofrecer una app especializada para cada hotel?"*
2. *"Si somos una agencia de software, qué contras tiene hacer apps para el mercado hotelero, una por cada uno + mantenimiento mensual? Sé sincera."*

Es la decisión más grande del proyecto — pre-condiciona pricing, equipo, arquitectura, valuación.

**Daniel pidió textualmente:** *"decile a supervisor que arme una reunión con todos ustedes ahora para ver estos temas."*

Reunión convocada vía bandeja supervisor:
- `~/casa/bandejas/supervisor/2026-11-08-bravas-pivote-saas-coordinar-reunion.md` (agenda completa)

Convocados: bravas + arquitecto + estratega (nueva incorporación — nota creada) + optimización.

Todos tienen notas actualizadas con el pedido específico de su rol. Bravas queda PAUSADO esperando el resultado de la reunión antes de arrancar catálogos.

### Mi respuesta a Daniel con pros/cons de ambos modelos (resumen)

Ver chat del cierre. Sinopsis:
- **Agencia (app por hotel + mantenimiento):** pros = entrada fácil al mercado AR, precio alto por venta, diferenciación percibida, flexibilidad total. Contras = no escala, techo lineal con equipo, mantenimiento × N apps = infierno operativo, valuación baja (1-3x revenue), captación de inversión difícil.
- **SaaS:** pros = escala real, MRR predecible, valuación alta (5-15x revenue), apalancamiento producto, equipo chico sostiene mucho, análisis cross-hotel como activo. Contras = entrada difícil al mercado AR (desconfianza al SaaS global), primer año duro (CAC alto), onboarding complicado, competencia establecida (Cloudbeds, Mews), tiempo-to-revenue largo.
- **Recomendación mía:** híbrido — SaaS técnico + 3 tiers de onboarding comercial (Self-Setup / Guided / Enterprise).

---

## ✅ DECISIÓN DANIEL 2026-11-08 cierre — Modelo híbrido "custom-first con cap"

**Modelo oficial Bravas (FIRME):**

1. **Fase 1 — Customs cappeadas:** Apps custom para **3-5 hoteles máximo** (cap duro). Target: boutique chico + urbano medio + posible resort chico para cubrir variedad. Daniel dijo: *"No tomo más de 3-4-5 hoteles como máximo y después me dedico bien"*.
2. **Fase 2 — SaaS puro:** Después del cap de customs, Octo pasa a modo SaaS puro para todo cliente nuevo. Las customs anteriores pueden seguir como deploys dedicados o migrar a tenants compartidos.
3. **En paralelo (todo el tiempo):** SaaS base con todos los módulos (los 11 sectores + packs + i18n + Guest Experience dual-fire + todo lo decidido) se construye. **La custom es el SaaS configurado con deploy dedicado, no una app forkeada.**

**Rationale de Daniel (palabras suyas):**
- Capital rápido para invertir (customs facturan alto desde el día 1)
- Experiencia en terreno (cada hotel enseña)
- La custom funciona como herramienta de venta de la SaaS: *"te lo muestro, me decís que tu estructura es distinta, te lo adapto. O si veo que me equivoqué con la SaaS, le hago una aplicación directa al hotel."*
- Es el **patrón Tile → Soup replicado** (Tile fue custom para Lucia, Soup es el SaaS equivalente).

**Doctrina técnica crítica derivada:**
Las customs NO son apps forkeadas del SaaS. Son **deploys dedicados del MISMO código** (`@octo/bravas-*` paquetes compartidos), con Supabase propio + Vercel propio + branding propio por hotel. Si fueran forks reales caeríamos en el "infierno operativo de agencia" que yo advertí en los contras. Esto hay que lockear en la nota a arquitecto.

### Instrucción Daniel a bravas 2026-11-08

*"Ponete a ver este tema con todas las casas. Desarrollénlo. Chéquenlo véanlo tanto con estratega, con optimización, arquitecto, con los que necesites. Pasale esto ahora a supervisor y pónganse a trabajar."*

### Qué hice al cierre

- ✅ Decisión escrita como FIRME en HILO.
- ✅ Nota a supervisor actualizada con: decisión tomada + nueva agenda de reunión (ya no es "debatir modelo", es "diseñar ejecución del modelo elegido") + urgencia.
- ✅ Nota a arquitecto actualizada con: doctrina técnica "custom = deploy dedicado del SaaS, no fork" + preguntas de implementación.
- ✅ Nota a estratega actualizada con: pricing custom + pricing SaaS + selección de 3-5 clientes custom + migration path.
- ✅ Nota a optimización actualizada con: números concretos bajo el modelo híbrido + viabilidad del cap.
- ⏸ Bravas pausado — espera resultado de la reunión antes de arrancar catálogos. Reunión ya no debate SaaS vs Agencia, debate CÓMO ejecutar el modelo custom-first + SaaS paralelo.

### 🔴 CORRECCIÓN DE BRIEF 2026-11-08 — Daniel re-enfocó la reunión

Daniel aclaró: la reunión NO trata pricing/comercial. Trata **arquitectura técnica**. El pricing lo define él después. Ajustes:

- ✅ **Presentación bravas creada** en `~/casa/bandejas/supervisor/2026-11-08-bravas-presentacion-reunion-arquitectura.md`. 6 secciones. Tesis central: **la pregunta real NO es "¿cuál opción?" sino "¿cuán sólidos pueden ser los slots de extensión?"** porque si son sólidos, A y C son casi la misma arquitectura; si son frágiles, C degenera a B.
- ✅ **Nota a arquitecto actualizada** con la pregunta puntual de Daniel (3 opciones + aplicación concreta + recomendación) sin tocar pricing.
- ✅ **Nota a optimización actualizada** con los puntos específicos: cuántos agentes Opus/Sonnet (no humanos) por opción + techo de escalabilidad + donde cada opción deja de ser rentable (sin tocar precios).
- ✅ **Nota a estratega marcada "no va a esta reunión"** — queda archivada como insumo futuro para cuando Daniel decida arrancar la etapa comercial.
- ✅ **enviar-a supervisor** disparado para avisar que mi presentación está lista.
- ⏸ Bravas pausado esperando el consolidado del supervisor con los análisis de arquitecto + optimización.

### Qué hace bravas desde ahora

1. Arrancar los **catálogos exhaustivos por sector** empezando por los 11 base, un sector por documento en `memory/catalogos/` (crear).
2. Esperar reunión arquitecto + optimización (coordina supervisor) para alinear estimación equipo + cronograma del mes.
3. Cuando Daniel decida sobre módulos transversales, ajustar el plan.

---

## Snapshot 2026-11-07 (anterior)

F2.5 cerrada a 20 pantallas con los 2 sectores nuevos (Admin/CFO + RRHH dept) construidos y navegables. Pendiente de decisión Daniel era publicar la actualización a gh-pages → **resuelto hoy 2026-11-08: publicado**. Supervisor respondió a propuesta rol IA seguridad cross-portfolio: sigue abierto.

**Estado de la URL pública compartible:**
- **Link vivo:** `https://octosolucionesdigitales-png.github.io/hotel-bravas-demo/v2.5/`
- **Qué muestra HOY:** la versión 16 pantallas de ayer (commit gh-pages `004eb07`, publicada 2026-11-05).
- **Qué le falta para estar al día con F2.5:** los 4 archivos nuevos + 3 updates de hoy (están en main pero no en gh-pages, ni siquiera commiteados a main todavía — quedaron en commit WIP del cierre de hoy).

**Archivos entregados hoy (los 6 + 3 del plan de la mañana):**
1. ✅ `mockup/v2.5/empleado-jefe-admin.html` — Elena Pastor · CFO Hotel. Cash widget navy + 4 KPIs + compliance deadlines (303 Q4, 111 IRPF, INE oct vencido, 347 anual) + chat con director + inbox 17 facturas con filtros (Climasur vencida 2 días, Lavandería due-near, Pescadería hold esperando chef, Endesa OK) + conciliación bancaria Santander (11/12 matched) + centros coste 5 depts (F&B over +€620) + 4 integraciones Opción A (Holded, Verifactu, Santander PSD2, Factorial) + firma CFO del día ámbar.
2. ✅ `mockup/v2.5/empleado-jefe-rrhh.html` — Lourdes Molina · HR Manager. Masa salarial €61.420 navy + 4 KPIs + alerta PRL ámbar (3 reconocimientos vencidos) + chat con director + staff count 3 estados (26/12/2) + cobertura 4 depts (HK 83% gap Eva) + 4 solicitudes (baja MC Eva urgente, vacac Rodrigo OK, PRL Marta pdte, cambio turno Nuria) + formación obligatoria convenio ES (incendios OK, manip. 1 late, PRL básico 2 pdte, igualdad 1 pdte) + 4 integraciones Opción A (Factorial, Sistema RED, FREMAP, Convenio Hostelería ES 2026) + firma HR del día.
3. ✅ `mockup/v2.5/empleado-admin.html` — David Torres · Administrativo, reporta a Elena. Shift progress verde finance + chat con Elena + 5 tareas (Climasur urgente con checklist, modelo 303 en curso, concil TRANSF XXX esperando, pescadería pingear Chef, lavandería done) + herramientas rápidas (Holded, Santander, Verifactu) + reporte cierre a Elena.
4. ✅ `mockup/v2.5/empleado-rrhh.html` — Sofía Cabrera · Resp. Nóminas, reporta a Lourdes. Shift progress bronce hr-dept + chat con Lourdes + 5 tareas (baja Eva urgente antes 12h con checklist Sistema RED, nómina noviembre 24/37 en curso, cita Marta PRL jueves, alta Iván recepción, vacac Rodrigo done) + herramientas rápidas (Factorial, Sistema RED, FREMAP, Convenio ES) + reporte cierre a Lourdes.
5. ✅ Update `mockup/v2.5/empleado.html` — tier badge pasa de "4/4 departamentos" a **"6/6 departamentos"**. Agregados 2 cards Supervisión nuevos (`.r-card.sup-admin` gradient esmeralda + `.r-card.sup-rrhh` gradient bronce) y 2 cards Operativo nuevos (`.op-admin` + `.op-rrhh`).
6. ✅ Update `mockup/v2.5/admin.html` — Rafael Delgado (director) ahora tiene **6 supervisores reportando** en vez de 4. Sumadas Elena (`sup-rep` verde con 17 pagar / 11-12 concil / +€4.2k caja) y Lourdes (`sup-rep behind` bronce con 42 plantilla / 6 solicit / 3 PRL late). Heading actualizado a "Reporte de los 6 jefes de departamento."
7. ✅ Update `mockup/v2.5/index.html` — fecha a 2026-11-07, portal Admin ahora dice "PMS + ERP vertical", portal Empleado dice "6 dptos", strip inferior menciona Opción A integración Holded/Factorial.
8. ✅ Update `mockup/v2.5/css/tokens.css` — 2 tokens nuevos: `--lib-finance: #047857` (verde esmeralda, Admin/CFO) + `--lib-hr-dept: #B45309` (bronce, Jefe RRHH dept completo).

**Commit WIP creado al cierre:** ver `git log -1` en la rama main — commit contiene los 7 archivos nuevos/modificados + tokens.css. NO pushado a remoto todavía. NO replicado a gh-pages todavía.

**Decisión pendiente de Daniel (al retomar mañana):**
- Opción A: push a origin/main + push a gh-pages → la URL pública queda actualizada a 20 pantallas. Riesgo: si la clienta española ya estuvo viendo el link con 16 pantallas, la próxima vez verá el cambio sin aviso.
- Opción B: dejar todo en WIP local hasta tener feedback de la clienta española sobre la versión de ayer. Más conservador.
- Opción C: crear un segundo link alternativo (Vercel preview o rama separada) para que el link principal siga en v16 y el de 20 sea aparte. Más trabajo.

**Nota importante dejada en bandeja supervisor hoy:**
`~/casa/bandejas/supervisor/2026-11-07-bravas-rol-ia-seguridad-portfolio.md` — propuesta de rol IA dedicado a seguridad cross-portfolio + 5 puntos abiertos (multi-tenant model, residencia datos ES, Verifactu real, SLA contractual, disaster recovery) que son portfolio-wide, no solo Bravas. Pendiente respuesta supervisor. **Esto NO bloquea F2.5 visual, pero SÍ bloquea F4/F5 (código real)** — no se puede arrancar a construir sin decidir multi-tenant + residencia datos ES.

## Tareas abiertas al cierre 2026-11-07

**Pendiente de decisión por Daniel (al retomar):**
1. Publicar F2.5 20 pantallas a gh-pages (opciones A/B/C arriba).
2. Preguntar a Daniel si ya le pasó el link vivo (16 pantallas) a la clienta española y si hay feedback → eso define si se publica Opción A ya o no.
3. Preguntar si quiere que escriba algún mensaje para la clienta junto con el link.

**Pendiente de decisión por supervisor:**
4. Rol IA de seguridad cross-portfolio — nota 2026-11-07 en bandeja supervisor.

**Pendiente heredado de ayer (siguen vigentes):**
5. Arquitecto + estratega: expansión ERP + Opción A integración técnica (notas 2026-11-05 en bandejas respectivas).
6. Estratega: modular vs suite vs mixto estrategia comercial (nota 2026-11-05).
7. Plan arranque Ola 1 Nivel 2 — arquitecto ETA.
8. Pricing Bravas incorporando palanca supervisores + variable modular vs suite.

**Bloqueantes reales:**
- Feedback de la clienta española sobre F1 / F2 / F2.5 (sigue siendo EL bloqueante).
- Sin OK sobre multi-tenant + residencia datos ES → F4/F5 código real no arranca.

## Pregunta técnica de seguridad y stack (discutida hoy con Daniel)

Daniel preguntó si tenemos el stack técnico y la plataforma para aguantar la operación real que proyecta: **5-6 hoteles de 3 estrellas × ~100 huéspedes/mes en modelo SaaS multi-tenant + 1 app exclusiva premium para hotel individual**.

**Respuesta técnica dada (resumen, el detalle completo está en el chat del día):**

- **Veredicto capacidad:** Supabase Pro + Vercel Pro aguantan 10x lo que planteás. Pico ~300 huéspedes concurrentes · ~50 empleados activos · ~500k requests/mes · ~300 conexiones Realtime WebSocket — todo esto es volumen chico para la infra decidida.
- **Costo infra SaaS 6 hoteles:** ~$50-100/mes total (Supabase Pro $25 + Vercel Pro $20 + Resend gratis hasta 3k).
- **Modelo dual técnico resuelto:** app SaaS multi-tenant en un proyecto + apps exclusivas en deploys separados (mismo código, Supabase propio + Vercel propio + dominio propio + branding propio). Es parte del motivo de Nivel 2 — cada módulo portable desde día 1 permite esto sin dolor.
- **Seguridad base cubierta:** Supabase RLS, Vercel Firewall + Deployment Protection, HTTPS forzado, secrets env vars, backups automáticos Pro.
- **Lo que NO está resuelto y NECESITA supervisor + arquitecto + eventual rol seguridad:** (1) multi-tenant model single-DB+RLS vs schema-per-tenant · (2) residencia datos ES Frankfurt vs provider ES suelo nacional · (3) Verifactu real (ley 2026) · (4) SLA contractual 99.5 vs 99.9 · (5) disaster recovery RTO/RPO portfolio.

Esto es lo que motivó la nota de rol IA de seguridad a supervisor del día.

## Estado actual F2.5 (al cierre 2026-11-07)

**Archivos F2.5 en `mockup/v2.5/` — total 20 HTMLs navegables:**

### Hub (2)
- `index.html` — hub principal 3 portales (actualizado hoy)
- `landing.html` — landing marketing pública completa (sin cambios hoy)

### Portal Admin (1)
- `admin.html` — dashboard Director Rafael Delgado (actualizado hoy: 6 supervisores reportando)

### Portal Huésped (4)
- `huesped.html`, `huesped-reserva.html`, `huesped-pago.html`, `huesped-resumen.html`

### Portal Empleado (13)
**Hub empleados (1):**
- `empleado.html` — hub 6/6 departamentos (actualizado hoy)

**Supervisores / Jefes (6):**
- `empleado-front-office.html` — Mario Guerrero (Jefe Recepción)
- `empleado-gobernanta.html` — Carmen Álvarez (Gobernanta)
- `empleado-chef.html` — Carlo Rizzo (Chef Ejecutivo)
- `empleado-jefe-mantenimiento.html` — Isabel Navarro (Jefa Mantto)
- `empleado-jefe-admin.html` — Elena Pastor (CFO) **← NUEVO HOY**
- `empleado-jefe-rrhh.html` — Lourdes Molina (HR Manager) **← NUEVO HOY**

**Operativos (6):**
- `empleado-recepcion.html` — Recepcionista
- `empleado-housekeeping.html` — Carlos Ruiz (HK)
- `empleado-cocina.html` — Cocinero
- `empleado-mantenimiento.html` — Rodrigo Martín (Técnico)
- `empleado-admin.html` — David Torres (Administrativo) **← NUEVO HOY**
- `empleado-rrhh.html` — Sofía Cabrera (Resp. Nóminas) **← NUEVO HOY**

**Tokens design system agregados hoy:**
- `--lib-finance: #047857` + `-bg: #D1FAE5` (verde esmeralda — Admin/CFO hotel, integración Holded/A3)
- `--lib-hr-dept: #B45309` + `-bg: #FEF3C7` (bronce — Jefe RRHH dept completo, convenio hostelería ES)

## Decisiones ya tomadas (base)
- Paleta: Navy A SaaS Profesional
- Tipografía: Inter + Fraunces display
- Portales: 3 (admin, huésped, empleado con sub-rol)
- Modelo datos: 15 entidades canónicas (INFORME §6.3)
- Stack: Next.js 16 + Supabase Pro + Vercel Pro
- Compliance ES diferencial: SES.Hospedajes + Verifactu + INE + Redsys/Bizum
- Channel manager: integración SiteMinder, no propio
- **Opción A ERP (confirmada 2026-11-05):** integrar con Holded/A3/Factorial, no construir contabilidad ni nóminas desde cero. La demo muestra la visión ERP completa pero el N2 real integra.
- **Nivel 2 aprobado (2026-11-04):** Bravas es la primera app nativa N2 del portfolio Octo.

## Decisiones abiertas (ver INFORME §9 + nuevas de hoy)
1. Geografía primaria (recomendación: España)
2. Modelo pricing (recomendación: híbrido con calculadora ROI) + ahora variable modular vs suite vs mixto
3. Próximo entregable: ¿más F2.5 pulido? ¿F3 código? ¿esperar feedback clienta?
4. Nombre definitivo "Bravas"
5. Modelo negocio con clienta española
6. RRHH + fichaje: ¿sigue nativo o se externaliza a Tile multi-vertical?
7. **NUEVO HOY:** Multi-tenant model (single-DB+RLS vs schema-per-tenant)
8. **NUEVO HOY:** Residencia datos ES (Frankfurt Supabase vs provider ES suelo nacional)
9. **NUEVO HOY:** SLA contractual (99.5% vs 99.9%)
10. **NUEVO HOY:** Disaster recovery portfolio (RTO/RPO)
11. **NUEVO HOY:** ¿Creamos rol IA seguridad cross-portfolio? (nota supervisor 2026-11-07)

## Notas vigentes en bandejas externas

### Nuevo hoy (2026-11-07)
- `~/casa/bandejas/supervisor/2026-11-07-bravas-rol-ia-seguridad-portfolio.md` — propuesta rol IA seguridad cross-portfolio + 5 puntos abiertos seguridad (no bloquea F2.5 visual, SÍ bloquea F4/F5 código).

### Heredadas de sesiones anteriores
- `~/casa/bandejas/supervisor/2026-11-04-bravas-escalada-lego-nivel-2-3.md`
- `~/casa/bandejas/supervisor/2026-11-04-bravas-patron-jerarquia-transversal.md`
- `~/casa/bandejas/supervisor/2026-11-05-bravas-cierre-sesion-f2.5-y-expansion-erp.md`
- `~/casa/bandejas/arquitecto/2026-11-04-bravas-escalada-lego-nivel-2-3.md`
- `~/casa/bandejas/arquitecto/2026-11-04-bravas-mapa-modulos-octo-libs.md`
- `~/casa/bandejas/arquitecto/2026-11-05-bravas-expansion-erp-integracion.md`
- `~/casa/bandejas/estratega/2026-11-04-bravas-jerarquia-como-pricing-tier.md`
- `~/casa/bandejas/estratega/2026-11-05-bravas-estrategia-venta-modular-vs-suite.md`
- `~/casa/bandejas/optimizacion/2026-11-04-bravas-escalada-lego-nivel-2-3.md`

## Historial de sesiones

### 2026-11-08 — Pivote estratégico + 2 investigaciones + modelo decidido + reunión convocada

**Mañana:** 
- Brief de estado al arranque. Daniel pivoteó Bravas a SaaS completo AR+ES (clienta ES deja de ser bloqueante). Diagnóstico honesto de bravas: demo F2.5 cubre 3\*/boutique, no 4\* legítimo.
- Lanzada investigación profunda de departamentos hoteleros 4-5\*. Output: `INVESTIGACION_departamentos_hoteles_2026-11-08.md`. Hallazgo: pasar de 6 a 11 sectores base + 5 opcionales + 2 transversales.
- Decisiones Daniel ronda 1: 11 sectores base confirmados, Pack System (Core + Resort + Eventos + Corporativo), Guest Experience como sector propio con portal propio + patrón dual-fire (*"cuando dispara uno dispara los dos"*), Pack Experience Premium opcional, i18n 3 locales (es-ES / es-AR / en diseñado), separación Cocina ↔ F&B Servicio, scope completo desde día 1.

**Mediodía:**
- Daniel pidió relevamiento de 30 hoteles reales con organigramas. Sub-agente trabajó y entregó **37 hoteles** (sobrepasó la meta). Output: `RELEVAMIENTO_organigramas_30_hoteles_2026-11-08.md` (555 líneas, 37 fichas, matriz comparativa, 3 organigramas visuales destacados: Fierro BA · Park Hyatt Mendoza · Marina Bay Sands).
- Hallazgos clave: universales 37/37 (Dirección, FO, HK, Cocina, Admin, Mantto). Del 4\*+ (≥90%): Comercial, F&B Servicio separado, RRHH, Reservas. GX como dept propio: 12/37, en ascenso. Sostenibilidad: 0/37 como dept individual. Rooms Division: 15/37 cadenas internacionales. "People & Culture" ya reemplazó RRHH en cadenas premium. 5 ejes de variación (tamaño 15-11800, perfil, geografía legal, cultura, verticales).
- Decisiones Daniel ronda 2: Rooms Division como **feature agrupador opcional** (no sector), Director de Operaciones como **meta-rol de permisos** (no sector), Verticales (Casino/Golf/Marina/Retail) como **4° nivel opcional**, Core de 11 con **flags "tercerizado"** para Seguridad y Economato en hoteles chicos.

**Tarde:**
- Daniel abrió la pregunta estratégica más grande del día: *"No sé si el SaaS va a ir. ¿Hacemos SaaS único o app custom por hotel?"* + *"Marcame pros y contras sinceros de agencia de software vs SaaS."*
- Bravas presentó análisis pros/cons SaaS vs Agencia con honestidad (sin palmadas BIBLIA): SaaS escala pero entrada AR difícil; Agencia escala lineal, mantenimiento ×N = infierno, valuación baja, decisión irreversible.
- **Decisión Daniel FIRME:** modelo **híbrido "custom-first con cap 3-5" + SaaS paralelo**. Patrón Tile → Soup replicado. Fase 1 = 3-5 apps custom máximo. Fase 2 = SaaS puro. En paralelo = SaaS base construyéndose alimentándose de las customs.
- Doctrina técnica crítica derivada por bravas y aceptada por Daniel: **las customs NO son forks. Son deploys dedicados del MISMO código** (`@octo/<producto>-*`) con Supabase+Vercel+branding propio por hotel. Si fueran forks reales, caeríamos en el infierno operativo de agencia.

**Cierre:**
- Daniel pidió textualmente: *"decile a supervisor que arme una reunión con todos ustedes ahora para ver estos temas. Ponete a trabajar con estratega, optimización, arquitecto."*
- Bravas golpeó la puerta con `enviar-a supervisor` (después de error de omisión inicial — no había usado el script estando disponible).
- **Corrección de brief Daniel** vía supervisor: la reunión NO trata precios/comercial. Trata arquitectura técnica pura. Pregunta: ¿cómo construir Bravas dado que los 37 hoteles son todos distintos? Opciones A/B/C + aplicación concreta + cuántos agentes Opus/Sonnet por opción. **Estratega queda fuera de esta reunión** (precio = después).
- Bravas armó **presentación para la reunión** (`~/casa/bandejas/supervisor/2026-11-08-bravas-presentacion-reunion-arquitectura.md`) con la tesis central: *"La pregunta real NO es '¿cuál opción?' sino '¿cuán sólidos pueden ser los slots de extensión?'"*
- Bravas armó **resumen ejecutivo completo** (`memory/RESUMEN_REUNION_DANIEL_2026-11-08.md`) de 15 secciones con TODO lo del día para que arquitecto + optimización tengan contexto antes de analizar.
- Daniel aplaudió el día y pidió cierre normal. **Nombre del producto PENDIENTE — él decide antes de arrancar código.** Próxima sesión: Fase 0.

**Entregables técnicos adelantados durante el día:**
- Publicación F2.5 20 pantallas a gh-pages (commit `dfdd8cf`). Link oficial activo y verificado.
- Índice de 28 módulos funcionales + 2 features + 7 servicios infra: `memory/catalogos/_INDEX.md`
- Template canónico del catálogo (17 secciones por ficha): `memory/catalogos/_TEMPLATE_catalogo_sector.md`
- Doctrina técnica event bus GX dual-fire: `memory/doctrina/event-bus-gx-dual-fire.md`

**Notas dejadas en bandejas durante el día:**
- `~/casa/bandejas/supervisor/2026-11-08-bravas-pivote-saas-coordinar-reunion.md` (actualizada en varias rondas, última con el brief corregido)
- `~/casa/bandejas/supervisor/2026-11-08-bravas-presentacion-reunion-arquitectura.md` (presentación bravas)
- `~/casa/bandejas/arquitecto/2026-11-08-bravas-pivote-saas-completo-catalogo-exhaustivo.md` (actualizada con corrección de brief)
- `~/casa/bandejas/optimizacion/2026-11-08-bravas-capacidad-equipo-mes-saas-completo.md` (actualizada con corrección de brief — agentes IA no humanos)
- `~/casa/bandejas/estratega/2026-11-08-bravas-modelo-negocio-saas-vs-agencia.md` (archivada hasta fase comercial futura)

**Aprendizaje operativo bravas 2026-11-08:**
- **Confirmé que bravas tiene acceso a `enviar-a` y otros scripts de `~/bin/`.** Error inicial del día: no los usé, le pasé el ping manualmente a Daniel. Regla operativa interna desde hoy: si algo lo puedo hacer yo (ping entre roles, dejar nota, coordinar), lo hago. Solo escalo lo que requiere decisión de Daniel.

### 2026-11-07 — Expansión ERP completada en demo + propuesta rol seguridad
- **Mañana:** brief de estado + Daniel pidió abrir directo la última demo (le abrí local porque gh-pages v2.5 estaba en 16 pantallas). Detectado que URL pública oficial es `.../v2.5/` no `.../mockup/v2.5/`.
- **Mediodía:** Daniel preguntó si tenemos stack técnico + infra para aguantar la operación real proyectada (5-6 hoteles SaaS + 1 app exclusiva premium). Le armé análisis completo: capacidad OK (10x techo), costo ~$50-100/mes, modelo dual resuelto, seguridad base cubierta, pero 5 puntos abiertos que son portfolio-wide (multi-tenant, residencia datos ES, Verifactu, SLA, disaster recovery). Daniel pidió escalar a supervisor con propuesta de rol IA seguridad dedicado cross-portfolio. Dejé nota en bandeja supervisor.
- **Tarde:** retomé F2.5 con los 6+3 archivos del plan. Construí los 4 roles nuevos (Jefe Admin, Jefe RRHH, Admin operativo, RRHH operativo) + updates empleado.html (6/6 depts), admin.html (6 supervisores reportando), index.html (PMS+ERP vertical). Agregué 2 tokens nuevos (`--lib-finance` verde + `--lib-hr-dept` bronce). Verifiqué visualmente abriendo empleado.html en browser local.
- **Cierre:** 20 HTMLs navegables en F2.5. Daniel pidió cierre de sesión. Commit WIP creado (no pusheado). gh-pages NO actualizado — queda a decisión de Daniel al retomar.

### 2026-11-05 — Cierre F2.5 + visión ERP detectada
[histórico sin cambios — ver versión anterior del HILO para detalle]

### 2026-11-04 — PxSol analysis + bloqueo arquitectónico lego
[histórico sin cambios]

### 2026-11-03 — brief del día + INFORME maestro (versión formal)
[histórico sin cambios]

### 2026-11-02 — F2 construido
[histórico sin cambios]

### 2026-10-31 — investigación hotelera
[histórico sin cambios]

### 2026-10-30 — F1 construido + brief inicial
[histórico sin cambios]
