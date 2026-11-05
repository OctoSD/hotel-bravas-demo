# HILO — Hotel Bravas · rol `bravas`

## Dónde quedamos (última actualización: 2026-11-05 cierre)

**🟢 RETOMAR MAÑANA desde:** Construir **2 nuevos sectores** en la demo F2.5 para completar la visión ERP vertical hotelero — **Administración/Finanzas** y **RRHH como departamento completo**. Daniel decidió la **Opción A (integración)** para N2 real: construimos la visión completa en la demo pero el N2 real integra con Holded/A3/Factorial para contabilidad y nóminas, no duplicamos competidores verticales. En paralelo hay 3 notas abiertas (supervisor + arquitecto + estratega) con la discusión arquitectónica y comercial — ver §Tareas abiertas al cierre abajo.

**Lo que hay que construir mañana (6 archivos nuevos + 3 updates):**
1. `empleado-jefe-admin.html` — Jefe de Administración / CFO del hotel (inbox proveedores, flujo caja, conciliación, impuestos, reporte director).
2. `empleado-jefe-rrhh.html` — Jefe RRHH (fichas empleados, turnos, nóminas, vacaciones, PRL, compliance laboral).
3. `empleado-admin.html` — Administrativo operativo (reporta a Jefe Admin).
4. `empleado-rrhh.html` — Responsable nóminas operativo (reporta a Jefe RRHH).
5. Update `empleado.html` — sumar 2 supervisores + 2 operativos (tier Business pasa de 4/4 a 6/6 departamentos).
6. Update `admin.html` — sumar 2 supervisores más reportando al director.
7. Update `index.html`, badges tier, leyenda si aplica.

**Previo histórico (congelamiento resuelto 2026-11-04):** F2.5 visual estuvo congelado unas horas esperando decisión portfolio-wide de arquitecto + optimización + supervisor sobre escalar doctrina lib-portable Octo (nivel 1) a nivel 2 (paquete npm) o nivel 3 (monorepo Turborepo). **Daniel aprobó Nivel 2** — Bravas es la primera app nativa Nivel 2 del portfolio Octo. Plan técnico completo de arquitecto en `~/casa/arquitectura/docs/analisis-lego-nivel-2-3-2026-11-04.md`.

**Estado actual:**
- F1 live en GitHub Pages (demo 4 portales, 15 pantallas HTML estático).
- F2 live en `/v2/` (demo mobile-first, 3 portales, admin modular + RRHH + fichaje QR).
- **F2.5 arrancado hoy, congelado:** `mockup/v2.5/css/tokens.css` extendido con sistema color por módulo (13 colores pastel + fraunces display + letter-spacing premium + CTA dark tokens). `mockup/v2.5/css/app.css` extendido con componentes PxSol (badge pill, CTA cápsula, hero-cards por módulo con color accent, sticky editable, add-ons toggle, form wizard con campo activo, trust badge, breakdown precios, webinar hero). Los archivos son nuevos y no pisan F2 — si la decisión lego cambia la arquitectura, se descartan sin costo.
- Research hotelero cerrado: 6 investigaciones + consolidado del 31-oct.
- INFORME maestro del 3-nov (`INFORME_bravas_v2_estructura_2026-11-03.md`) — el documento vigente de producto.
- Design system cristalizado en F2: paleta Navy A (`#0F1F3D` + `#2563EB` + `#059669`), Inter, 4 estados cromáticos housekeeping (mint/lightning/dusk/solar).
- Carpeta `Media/` con 7 screenshots PxSol compartidos por Daniel 2026-11-04, analizados y fuente de los 9 patrones visuales F2.5.

**Decisiones ya tomadas:**
- Paleta: Navy A SaaS Profesional (confirmada en `mockup/v2/css/tokens.css`).
- Tipografía: Inter.
- Portales: 3 (admin, huésped, empleado con sub-rol).
- Modelo de datos: 15 entidades canónicas (ver INFORME §6.3).
- Stack: Next.js 16 + Supabase + Vercel (doctrina Octo).
- Compliance España como diferencial principal: SES.Hospedajes + Verifactu + INE + Redsys/Bizum.
- NO construir channel manager propio (se integra vía SiteMinder).

**Decisiones abiertas (ver INFORME §9):**
1. Geografía primaria (recomendación: España).
2. Modelo de pricing (recomendación: híbrido con calculadora ROI).
3. Próximo entregable: F2.5 visual (recomendado) vs F3 código directo.
4. Nombre definitivo "Bravas".
5. Modelo de negocio con la clienta española.
6. RRHH + fichaje: ¿sigue nativo en Bravas o se externaliza a Tile multi-vertical?

**Pendientes bloqueantes:**
- **Feedback de la clienta española** sobre F1/F2. Sin esto, F2.5 y F3 son especulativos.

**Pendientes no bloqueantes (puedo arrancar cuando Daniel confirme):**
- F2.5 visual: agregar 7-8 pantallas canónicas al mockup/v2/ (rack chart, drawer, inbox, KDS, dashboard admin, housekeeping desktop, compliance ES, portal huésped reducido).
- Carta a `arquitecto` con el INFORME + consolidado como base para plan técnico F3.

## Tareas abiertas al cierre 2026-11-05

**Pendiente de decisión por arquitecto + estratega (nota en sus bandejas del 2026-11-05):**

1. **Expansión a ERP vertical hotelero completo** — Bravas trascendió "PMS" y ahora cubre PMS + admin + RRHH + compliance + revenue + channel. Daniel pide a los 3 roles (supervisor coord + arquitecto técnico + estratega comercial) definir:
   - **Técnico (arquitecto):** ¿Cómo manejamos los módulos admin/finanzas y RRHH? Opción A aprobada por Daniel = integración con herramientas externas (Holded/A3/Factorial). Pero se necesita definir contratos de integración, APIs, qué parte sí construimos propio (centros de costo hotelería específicos, convenio hostelería ES básico), qué delegamos.
   - **Comercial (estratega):** ¿Estrategia de venta → suite completa vs modular? Variantes posibles:
     - **Suite completa**: 1 precio por tier (Starter/Pro/Business/Max), todos los módulos incluidos del tier, decide activación el admin. **Simple** pero rígido.
     - **Modular puro**: precio base + precio por módulo contratado. **Flexible** pero complejo de explicar y de calcular ROI del cliente.
     - **Mixto (paquetes)**: tiers con pack de módulos incluidos + módulos extra opcionales (ej: Business base €349 + módulo RRHH avanzado €80 adicional). Lo que Daniel llama "paquetes con determinados módulos u opción contratas el modulo que necesites".
   - Daniel textual: *"medio complicado pero lo vemos con estratega y arqui"*.

2. **Plan arranque Ola 1 Nivel 2** (paquetes `@octo/*` npm). Arquitecto define ETA inicio basado en plan `analisis-lego-nivel-2-3-2026-11-04.md`. Bravas espera luz verde para empezar a diseñar el código N2 real tras validar demo con clienta española.

3. **Pricing Bravas** — estratega revisa cuando se abra pricing Bravas incorporando la palanca de supervisores (ver nota 2026-11-04 bandeja estratega) + ahora la nueva variable modular vs suite.

## Notas vigentes en bandejas externas

- `~/casa/bandejas/supervisor/2026-11-04-bravas-escalada-lego-nivel-2-3.md` — doc maestro escalada N2 (procesado, N2 aprobado).
- `~/casa/bandejas/supervisor/2026-11-04-bravas-patron-jerarquia-transversal.md` — patrón `@octo/org-hierarchy` transversal portfolio.
- `~/casa/bandejas/supervisor/2026-11-05-bravas-cierre-sesion-f2.5-y-expansion-erp.md` — cierre sesión hoy + expansión ERP + Opción A confirmada.
- `~/casa/bandejas/arquitecto/2026-11-04-bravas-escalada-lego-nivel-2-3.md` — puntero escalada N2.
- `~/casa/bandejas/arquitecto/2026-11-04-bravas-mapa-modulos-octo-libs.md` — mapa 20 módulos Bravas → `@octo/*`.
- `~/casa/bandejas/arquitecto/2026-11-05-bravas-expansion-erp-integracion.md` — opción A integración + preguntas técnicas (nuevo).
- `~/casa/bandejas/estratega/2026-11-04-bravas-jerarquia-como-pricing-tier.md` — palanca supervisores en pricing.
- `~/casa/bandejas/estratega/2026-11-05-bravas-estrategia-venta-modular-vs-suite.md` — estrategia comercial suite vs modular vs mixto (nuevo).
- `~/casa/bandejas/optimizacion/2026-11-04-bravas-escalada-lego-nivel-2-3.md` — puntero escalada N2.

## Historial de sesiones

### 2026-11-05 — Cierre F2.5 + visión ERP detectada
- **Mañana (temprano):** Daniel pidió "retomar desde el principio hacer exhaustivo lo que faltaba". Rework de **admin.html** → dashboard real del Director Rafael Delgado (KPIs globales, rack mini 6 pisos, 3 decisiones con firma, 4 supervisores reportando, Revenue €10.650, Compliance ES visible, Channel Manager mix, Sign-off del día). Rework de los **4 panels operativos** (housekeeping, cocina, recepción, mantenimiento) nivelándolos al patrón supervisor: shift bar navy tier Business + fichaje, progress del turno con bar color-code por rol, chat con supervisor + unread, tareas asignadas por el jefe con avatar quien asignó + cronómetro + checklist, reporte cierre de turno. Regla de color aplicada: fondos navy/blanco, pastel solo en estados cromáticos housekeeping, status pills color-only.
- **Mitad:** Daniel pidió armar la **landing marketing pública** (`landing.html`) para cerrar F2.5. Landing completa: nav sticky con brand "Hotel Bravas" + CTA demo + pill rojo pulsante · hero gradient con título Fraunces XXL "La operación de tu hotel como un lego" + 3 phone-cards mockups rotados · trust bar 4 hoteles ficticios · problema (6 apps + huésped sin respuesta + compliance ES asusta) · 4 hero-cards gradient (jerarquía configurable · WhatsApp IA · compliance ES · lego) · 3 pasos Fraunces · bloque compliance ES verde con 6 items · pricing 4 tiers (Starter €89 · Pro €189 · **Business €349 destacado navy** · Max a medida) · 3 testimonios Fraunces italic · formulario demo navy footer ámbar · footer Octo SD completo.
- **Cierre:** Daniel detectó que lo que armamos trascendió "app para hoteles" y es un **PMS + ERP vertical hotelero**. Faltan 2 sectores: **Administración/Finanzas** (cuentas por pagar/cobrar, flujo caja, conciliación, modelo 303/347 IVA, centros de costo) + **RRHH como departamento** (nóminas convenio hostelería ES, PRL obligatorio, SS, IRPF, formación obligatoria). Discutimos 3 opciones (A integración · B ERP propio · C PMS conservador). Daniel confirmó **Opción A** para N2 real + armar los 2 sectores en la demo para visión completa. También pide a arquitecto + estratega abrir discusión **modular vs suite vs mixto** como estrategia de venta. Mañana retoma bravas con los 6 archivos nuevos + 3 notas a los roles.
- **Estado al cierre:** F2.5 cerrada visualmente en 16 archivos HTML navegables. 2 sectores nuevos pendientes mañana. 3 notas dejadas en bandejas (supervisor, arquitecto, estratega). Commit del día con snapshot del progreso.

### 2026-11-04 — PxSol analysis + bloqueo arquitectónico lego
- Daniel compartió 7 screenshots de PxSol (3 pantallas mockup flujo reserva huésped + 3 pantallas catálogo módulos home + 1 landing webinar).
- Analicé y mapeé **9 patrones visuales tomables** para Bravas: pill-badge sobre foto, micro-label categoría, CTA cápsula negra uppercase, metadata bullets color, sticky top editable, sticky bottom total, hero-cards módulos admin, sistema color por módulo, landing marketing webinar.
- Daniel aprobó incorporar al F2.5. Arranqué: creé `mockup/v2.5/` con tokens.css y app.css extendidos.
- **Giro arquitectónico (mitad de sesión):** al ver que los módulos admin se podían diseñar como "catálogo de piezas", Daniel detectó patrón de fondo y pidió escalar doctrina Octo lib-portable (nivel 1) a nivel 2 (paquete npm) o nivel 3 (monorepo). Inventario específico pedido: qué se puede sacar HOY de MIBA (booking online, intake, historial clientes, WhatsApp Emily) y Tile (fichaje, RRHH v1.1, checklist, coordinación, portal empleado) para que Bravas los combine como legos + agregar lo específico hotelero (PMS, channel manager, compliance ES).
- Confirmación textual Daniel: *"de acá en adelante vamos a operar de esta forma"* + *"la próxima app va a salir en nivel 2/3"*. Decisión portfolio-wide, no solo Bravas.
- Redacté documento maestro `~/casa/bandejas/supervisor/2026-11-04-bravas-escalada-lego-nivel-2-3.md` (pedido textual Daniel + comparativa niveles 1/2/3 + inventario reusable MIBA/Tile/Soup/MiTutor + mapa % reusable por módulo Bravas + 7 preguntas por rol + timeframe + entregable).
- Punteros en `~/casa/bandejas/arquitecto/` y `~/casa/bandejas/optimizacion/` con sus 7 preguntas específicas.
- **F2.5 congelado**. 7 tasks de F2.5 pausadas. Task #8 "redactar brief lego" completada.
- Pendiente de Daniel: avisar vía supervisor a los 3 roles para que arranquen. Yo no tengo acceso a `enviar-a` desde rol bravas.

### 2026-11-03 — brief del día + INFORME maestro (versión formal)
- Revisé bandeja: 1 pedido (research hotelero) ya cumplido con los 6 reportes + consolidado del 31-oct.
- Daniel pidió un informe maestro consolidando funciones por módulo, apps origen de cada feature premium, UX definida, y estructura final.
- Produje `INFORME_bravas_v2_estructura_2026-11-03.md` (versión Markdown): 10 secciones, matriz maestra de funciones por capa × app, 13 "joyas premium", paleta Navy A, estructura final de 3 portales + 15 entidades + stack.
- Daniel pidió una versión HTML visual: produje `INFORME_bravas_v2_estructura_2026-11-03.html` v1 (con emojis).
- Daniel pidió segunda versión más formal: **reescribí el HTML completo** — sin emojis, con siglas expandidas al primer uso (formato "Nombre (SIGLA)"), nueva sección 1 explicando qué es un software hotelero para no-técnicos, nueva sección 2 con los 16 módulos canónicos detallados uno por uno con decisión por módulo, nueva sección 3 explicando cuáles elegimos y por qué (10 construimos + 4 posteriores + 1 descartado), nueva sección 11 explicando las fases F1-F5 como concepto, glosario de 30+ siglas al final. Tipografía: añadí Fraunces (serif) para encabezados editoriales.
- Fix de bug en tablas: la clase `.mk` tenía `display: inline-block` aplicada a `<td>`, lo que colapsaba las celdas verticalmente. Reescribí el CSS para que `.mk` sobre `<td>` mantenga `table-cell` y solo `span.mk` use `inline-block`. La etiqueta "PREMIUM" ahora es una pastilla naranja al lado del nombre (antes era `<strong>` en vertical-align super).
- Creé este `HILO.md` por primera vez.

**Estado al cierre de la sesión:**
- INFORME HTML final visible y navegable en `memory/INFORME_bravas_v2_estructura_2026-11-03.html`.
- INFORME Markdown queda como fuente técnica paralela.
- No se tocó el prototipo `mockup/v2/`.
- Decisión pendiente para mañana: F2.5 visual (recomendado) vs F3 código directo; y si se delega a `arquitecto` o lo hace bravas.
- Bloqueante real sigue siendo feedback de la clienta española.

### 2026-11-02 — F2 construido
- Commit `8ce3d55 feat(F2): demo navegable mobile-first con admin modular + RRHH + fichaje QR`.
- Adoptó paleta Navy A y 4 estados cromáticos housekeeping del consolidado del 31-oct.
- Fusionó 4 portales de F1 a 3 (admin, huésped, empleado) con sub-rol en empleado.
- Agregó RRHH + fichaje QR como diferencial (sin paralelo claro en los 6 competidores analizados).

### 2026-10-31 — investigación hotelera
- 6 investigaciones individuales + consolidado cruzado (`CONSOLIDADO_apps_hoteleras_2026-10-31.md`).
- Apps: Cloudbeds, ThinkReservations, Flexxus, Clientify, Omnibees, PxSol.
- Hallazgo central: hay 16 módulos canónicos en 6 capas, nadie los cubre perfecto, el gap competitivo real en España es compliance + UX moderna + WhatsApp.

### 2026-10-30 — F1 construido + brief inicial
- Commits `624cd2d` + `050feee` + `843c2de`: demo F1 navegable con 4 portales (huésped, limpieza, cocina, admin), 15 pantallas HTML estático.
- Deploy en GitHub Pages: `https://octosolucionesdigitales-png.github.io/hotel-bravas-demo/`.
- Repo: `octosolucionesdigitales-png/hotel-bravas-demo`.
- BRIEF inicial en `BRIEF_hotelbravas.md`.
