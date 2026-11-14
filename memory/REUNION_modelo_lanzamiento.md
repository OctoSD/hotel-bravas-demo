# Reunión: Modelo de lanzamiento Bravas

**Fecha:** 2026-11-13  
**Disparador:** Daniel quiere reexaminar la decisión Opción C (hybrid custom-first + SaaS paralelo) tomada el 2026-11-10.

---

## Posición del arquitecto

### Lectura del código actual

**El schema SQL (§6 de ARQUITECTURA_paquetes) ya tomó la decisión más importante.**

Cada tabla tiene `organization_id` + RLS. Esto es el patrón SaaS multi-tenant. No hay nada en el código que fuerce una elección entre "custom" o "SaaS" — esa distinción es de infraestructura de deploy, no de arquitectura de código. El codebase es neutral entre los dos modelos.

Lo que sí existe: 13 catálogos en Markdown y un schema SQL. No hay línea de TypeScript todavía. Eso hace que esta sea exactamente el momento correcto para reexaminar el modelo — hay cero costo de cambio.

---

### Los 5 puntos técnicos

**1. El schema ya es SaaS-native. El "custom deploy" no requiere cambio de código.**

La decisión arquitectónica que más importaba ya está tomada y bien tomada: `organization_id` en todas las tablas + RLS. Un deploy "custom" para un solo hotel corre el mismo schema — la diferencia es que tiene una sola fila en `organizations` y el RLS siempre es verdadero. No hay dos versiones del código. Esto confirma que la Opción C era técnicamente correcta en su premisa central.

**2. La Opción C (híbrido) introduce overhead de infra que solo tiene valor cuando hay 2+ hotels.**

Para el primer hotel, la Opción C exige: `provision-tenant.sh`, CI/CD que dispara deploys en múltiples Vercel projects, sincronización de migrations en N Supabase instances. Todo eso es overhead operativo con cero beneficio mientras solo existe un hotel. Si el primer cliente es "Bravas" (el hotel en España), arrancar con una instancia única es más rápido y no cierra ninguna puerta.

**Traducción a tiempo:** la infraestructura de Option C (provision script, multi-Vercel pipeline, migration sync) son 2-3 semanas de trabajo antes de poder mostrar una sola pantalla real al cliente. SaaS puro tiene el mismo problema (más: subdomain routing, tenant creation UI, Stripe onboarding). **Custom-first sin la infraestructura de Option C aún es la forma más rápida de tener algo en producción.**

**3. El mayor riesgo de Option C no es técnico — es de mantenimiento de migrations.**

Cuando el codebase evoluciona y hay una migration nueva (y habrá muchas), en Option C la tenés que correr en cada Supabase instance por separado. Con 1 hotel ya es manual. Con 3 hoteles y un release semanal, es 3 runs de migration por release. Con SaaS puro: 1 migration, 1 run, todos los tenants actualizados. Este es el costo que Option C difiere y que crece con cada hotel que se agrega.

**4. SaaS puro hace más fácil el F1 de largo plazo, pero más difícil el primer deploy.**

SaaS standard: una sola instancia Supabase, un solo Vercel project, N tenants aislados por RLS. Simplicidad operativa máxima. El problema es el trabajo de infraestructura inicial que no existe todavía: subdomain routing o middleware org-resolution (como hace Sugar con `x-sugar-org-id`), UI de onboarding de tenant, Stripe billing multi-tenant. Son 3-4 semanas de trabajo que no produce ninguna feature de hotel.

**La pregunta real que Daniel debe responder:** ¿el primer cliente paga por tener su propia instancia aislada (custom, deploy dedicado) o está cómodo en un SaaS compartido donde su data está separada lógicamente pero no físicamente?

Para hoteles premium (que parece ser el target), la respuesta probablemente es "instancia propia". Eso valida Option C. Para un SaaS orientado a hoteles boutique o medianos, SaaS compartido es suficiente y más barato de operar.

**5. La recomendación concreta para arrancar F1 (F5) hoy:**

Ignorar temporalmente tanto "Option C" como "SaaS puro". Hacer esto:

- **Un Next.js app** con el schema ya diseñado (organization_id + RLS).
- **Un Supabase instance** (no provisionar N todavía).
- **Una organización hardcodeada** en las env vars para el primer hotel.
- Construir los 4 módulos de Prioridad 1: `front-office`, `housekeeping`, `direction`, `guest-experience`.
- Cuando el segundo hotel llame, agregar la infraestructura de Option C (provision script) o de SaaS (middleware org-resolution + onboarding) según el modelo que Daniel haya elegido.

Esto no es deuda técnica. Es secuenciación correcta. El schema es el invariante — soporta cualquier modelo. La infraestructura de deploy se agrega cuando hay demanda real de ella.

---

### Tabla resumen

| Dimensión | Custom puro (Option B) | Hybrid Option C | SaaS puro |
|---|---|---|---|
| **Velocidad F1** | ★★★★★ más rápido | ★★★☆☆ overhead infra | ★★★☆☆ overhead onboarding |
| **Mantenimiento de migrations** | ★★☆☆☆ N runs | ★★☆☆☆ N runs | ★★★★★ 1 run |
| **Cambio de código requerido** | ninguno | ninguno | ninguno (schema neutral) |
| **Data isolation para cliente premium** | ✅ física | ✅ física | ⚠️ lógica (RLS) |
| **Costo operativo en escala** | alto | alto | bajo |
| **Riesgo de divergencia de codebase** | ✅ cero (mismo repo) | ✅ cero (mismo repo) | ✅ cero |

---

### Mi posición en una frase

El schema es correcto y es neutral entre los modelos. La decisión que urge no es SaaS vs Custom — es **empezar sin la infraestructura de Option C, construir para un hotel, y agregar el provisioning cuando llegue el segundo**. Option C es el destino correcto; no hace falta llegar ahí el primer día.

---

*Sección escrita por: arquitecto · 2026-11-13*

---

## bravas

### Posición de quien construye el producto — 5 puntos concretos

**Input leído:** RELEVAMIENTO_organigramas_30_hoteles_2026-11-08 + 2026-11-08-bravas-pricing-gtm-modelo-ejecucion

---

**1. El híbrido sigue siendo correcto. Lo que el documento del 2026-11-08 no resolvió es la condición técnica que lo hace viable — y el arquitecto acaba de responderla hoy.**

El doc del estratega asumía que "mismo código, configuración por hotel" era factible. El arquitecto lo confirmó ahora: el schema ya tiene `organization_id` + RLS en todas las tablas — el codebase es neutral entre modelos. Eso cierra la única incertidumbre técnica que yo veía como riesgo real del híbrido. La decisión anterior no tiene un defecto lógico. Tiene una brecha de secuencia: el doc del estratega proponía arrancar con la infraestructura de Option C (provision scripts, multi-deploy pipeline) desde el día 1, y el arquitecto dice que eso agrega 2-3 semanas de overhead con cero valor hasta el segundo hotel. Con eso, el híbrido recalibrado es: **mismo schema, un deploy simple para el primer hotel, infraestructura multi-tenant cuando llegue el segundo.**

---

**2. SaaS puro hoy es construir la infra correcta para el producto incorrecto.**

Los 30 hoteles del relevamiento dan organigramas, no comportamiento de uso. No dicen cómo va a reaccionar una recepcionista cuando el sistema se traba a las 7am, ni qué módulo va a abandonar la gobernanta en su segunda semana de uso, ni qué va a pedir el dueño que no estaba en ningún catálogo. Un SaaS multi-tenant real sin un solo usuario en producción es una apuesta de 3-4 meses de desarrollo sobre hipótesis. El riesgo no es técnico — es construir la cosa equivocada con la arquitectura correcta. Los customs dan lo que el relevamiento no puede: feedback de uso real que informará qué features tiene que tener el SaaS antes de lanzarlo al mercado.

---

**3. Custom puro sin cap es la trampa más cara del portfolio.**

Si los 5 hoteles tienen necesidades divergentes y hacemos modificaciones ad-hoc para cada uno, terminamos con 5 bases de código que nunca se pueden converger en un producto. El valor del cap de 3-5 hoteles no es frenar el revenue — es forzar una disciplina: todo lo que se agrega para el Hotel 1 tiene que ser configurable (no hardcodeado), de modo que el Hotel 2 lo pueda activar sin tocar el repo. Sin ese cap explícito, Bravas se convierte en una agencia de desarrollo hotelero a medida. Eso es un negocio distinto, con un ceiling de ingresos distinto y sin el efecto de red que hace interesante el SaaS. El doc del estratega tenía razón en el cap. Hay que defenderlo aunque el Hotel 6 sea tentador.

---

**4. La señal de mercado más valiosa disponible en los próximos 7 días no está en este documento — está en mostrar la demo a los 2 contactos de Daniel.**

La demo tiene 33 pantallas navegables, flujos conectados de punta a punta (reserva → checkin → estancia → room service → checkout), compliance España visible, notificaciones cross-portal entre portales de huésped y staff. Es suficientemente buena para ir a una reunión con un dueño de hotel esta semana. La respuesta de ese dueño — ¿preguntó cuándo puede tenerlo?, ¿dijo "mi hotel es más simple"?, ¿preguntó por el precio? — vale más para decidir el modelo que cualquier análisis adicional. El modelo debate es secundario a la primera señal real. Si el primer contacto dice "quiero esto para diciembre" el híbrido queda confirmado en la práctica. Si dice "mi hotel de 20 habs no necesita esto", el scope del primer custom se ajusta hacia abajo y eso también es información valiosa.

---

**5. Hay una táctica que el doc del estratega no incluyó y que cuesta cero desarrollo: la landing actual como antena de demanda SaaS.**

La `landing.html` ya existe en el demo. Convertirla en una página con formulario "Registrá tu hotel — acceso anticipado" (nombre + hotel + habs + país + email) no requiere construir nada del SaaS. Solo un Tally/Typeform embedded. En 90 días, si llegan 30+ registros de España o Argentina con hoteles reales, tenemos validación de demanda SaaS antes de invertir los 3-4 meses de infra. Si no llega nada, el SaaS se pospone sin haber perdido ni un día de desarrollo. Esta táctica es completamente paralela al avance del custom — no compite con él por tiempo ni recursos.

---

### Síntesis

**El híbrido recalibrado es el camino.** No por descarte de las otras opciones, sino porque es el único que financia su propio desarrollo, genera aprendizaje real, y no cierra la puerta al SaaS. Con la confirmación técnica del arquitecto de hoy (schema neutral, deploy simple para el primer hotel), la brecha que yo veía como riesgo está cerrada.

Lo que rechazaría:
- **SaaS puro ahora:** construir infra de escala sin un usuario real es una apuesta prematura.
- **Custom puro sin cap ni arquitectura compartida:** es cambiar de producto sin darse cuenta.

Próximo paso concreto: mostrar la demo a los 2 contactos de Daniel esta semana. Esa reunión determina más sobre el modelo real que cualquier reunión estratégica interna.

---

*Sección escrita por: bravas · 2026-11-13*

---

## Sección: estratega

**Posición:** el híbrido sigue siendo correcto. Tengo cuatro correcciones de ejecución y una respuesta directa sobre qué diseña UX.

---

**1. El patrón Tile → Soup requiere secuencia, no paralelismo — el GTM tiene que ajustarse**

Tile funcionó porque fue un único cliente durante toda la construcción. Los patrones emergieron después y se portaron a Soup. Para Bravas hoy no existe producto base: "Hotel 1 custom" es el acto de construirlo. La meta comercial "3 hoteles firmados en 90 días" es correcta para el pipeline. La meta de construcción "3 hoteles en producción en 90 días" es imposible.

Secuencia correcta: firmar H1, H2 y H3 lo antes posible (correcto). Construir para H1 primero (8-14 semanas dedicadas). H2 y H3 entran cuando H1 lleva 2+ meses en producción real. SaaS beta: 10-14 meses desde el primer deploy estable. Esto no contradice el híbrido — lo protege de quemarse en la primera etapa.

---

**2. 42 paquetes es el catálogo completo para competir con Mews — el MVP son 9 sectores**

El relevamiento de 30 hoteles lo cuantifica. Sectores universales (100% de los hoteles): Front Office, Housekeeping, Cocina, F&B Svc, Comercial, Admin, RRHH, Mantenimiento, Dirección = **9 módulos core**. Sectores frecuentes 4*+ (≥60%): Guest Experience, Seguridad, IT, Spa, Eventos, Economato = **5-6 módulos opcionales activables**. Sectores específicos (≤30%): Casino, Golf, Marina = backlog, se construye cuando un hotel lo pide y paga.

A ~3-4 semanas por módulo: 9 módulos = 27-36 semanas. 42 módulos = 126-168 semanas (3+ años). **Congelar scope en 14-15 módulos.** Los 27 restantes al backlog. Es la diferencia entre lanzar en 2027 o en 2029.

---

**3. El contacto España es una oportunidad indirecta — no construir compliance ES ahora**

El GTM v1 proyecta "Hotel 4 — Boutique España" con €6,500 en mes 3-4. La clienta es estudiante que conoce el hotel, no es dueña. El compliance ES (SES.Hospedajes + Verifactu) tiene costo de desarrollo independiente del resto del producto. Construirlo para un cliente cuya firma no está confirmada es ineficiente.

**Recomendación:** arquitectura con `tenant.country` feature-gated, compliance ES no construido hasta tener firma real de un hotel español. Sin España, proyección año 1: USD 28,000 en fees de los 4 hoteles AR. Más baja que los USD 35,500 del GTM v1, pero más honesta.

---

**4. Para UX: una sola aplicación configurable — no variantes por hotel**

Respuesta directa a la pregunta de Daniel. **UX diseña una aplicación, no N variantes.** La customización por hotel ocurre en la capa de configuración del admin del tenant, no en el diseño de pantallas. El AHORA.md ya lo define: "Las customs son deploys dedicados del MISMO código (no forks)."

Lo que UX necesita diseñar: (a) wizard de onboarding/configuración del tenant donde el hotel mapea su organigrama y activa módulos con sus términos propios; (b) pantallas universales de los 9 módulos core que funcionen desde Fierro (15 empleados, 2 niveles) hasta Llao Llao (264 empleados, 4 niveles); (c) sistema de activación de módulos opcionales — el menú se adapta sin que el usuario vea opciones vacías; (d) i18n de terminología por región (Gobernanta / Executive Housekeeper / Ama de Llaves). Lo que UX **no** diseña ahora: módulos opcionales avanzados ni compliance ES. Se diseñan con demanda real.

---

**5. Timing: F5 construcción pesada en Q2 2027 — y es la decisión correcta**

Bravas compite por capacidad con proyectos en F5 activo ahora: Soup (beta cerrada pendiente), Sugar (beta Rainbow), MiTutor (Fase S + Corpo), Waveit (Sprint 2+), Tile (v1.1 RRHH). Construir un hotel PMS desde cero en ese contexto produce todo a medias.

Si F5 arranca ahora: H1 en producción Q1 2027, con calidad comprometida en Soup, Sugar y MiTutor. Si F5 arranca cuando Soup/Sugar están en mantenimiento (Q2 2027): H1 en Q3 2027, sin costo colateral.

**Recomendación:** Bravas avanza ahora en F2 (conseguir firma de H1 antes de construir, no al revés) y F3 (arquitectura técnica, schema Supabase). F5 construcción pesada desde Q2 2027. Con la firma del primer hotel en mano cuando llegue la capacidad, Octo arranca sin esperas.

---

### Resumen posición estratega

| Punto | Recomendación |
|---|---|
| ¿Modelo híbrido o puro SaaS? | Híbrido correcto. Ajustar a **secuencia** (H1 primero, H2-H3 después), no simultaneidad. |
| ¿Scope de construcción? | MVP = 9 módulos core + 5-6 opcionales. Los 27 restantes al backlog. |
| ¿España en scope? | No hasta tener firma real. Arquitectura preparada, compliance no construido. |
| ¿Qué diseña UX? | Una sola aplicación configurable. No variantes por hotel. |
| ¿Cuándo arrancar F5? | Q2 2027. Usar los meses anteriores para cerrar firma de H1 en AR. |

---

*Sección escrita por: estratega · 2026-11-13*

---

## octo-modules

> Base: cruce entre `MAPA_MODULOS_octo-libs_2026-11-04.md` y el catálogo real a 2026-11-13 (87 módulos @octosd/*).

---

**1. El catálogo cubre ~70% del stack hotelero de F3 — el gap se cerró antes de lo esperado**

El MAPA del 4-nov marcaba booking-engine, housekeeping-states, intake-forms, crm-contacts, hr-core y checklist como "NEW-FROM-DONOR" (a construir). Hoy todos tienen equivalente directo:

| Módulo MAPA (4-nov) | Estado en catálogo (13-nov) |
|---|---|
| `@octo/pin-auth` | ✅ `@octosd/pin-auth` v1.0.0 |
| `@octo/qr-auth` | ✅ `@octosd/qr-auth` v1.1.0 — IdentityQR ya cubre llave digital huésped |
| `@octo/offline-sync` | ✅ `@octosd/offline-sync` v1.0.0 |
| `@octo/kiosco-panels` | ✅ `@octosd/kiosco-panels` v1.0.0 |
| `@octo/booking-engine` | ✅ `reservation` + `room-availability` + `scheduling` + `slots` |
| `@octo/crm-contacts` | ✅ `guest-profile` + `contacts` |
| `@octo/intake-forms` | ✅ `client-intake` v0.1.0 |
| `@octo/housekeeping-states` | ✅ `housekeeping` v0.1.0 |
| `@octo/checklist-tasks` | ✅ `checklist` v1.0.0 |
| `@octo/hr-core` | ✅ `hr-core` v0.1.0 |

El riesgo del 4-nov "bloqueado esperando extracción de MIBA" ya no existe. Bravas puede hacer `npm install @octosd/reservation @octosd/housekeeping ...` hoy.

---

**2. Tres gaps reales — ninguno es infraestructura hotelera genérica**

**Rack chart visual (`@octo/pms-rack`):** el catálogo provee los datos (reservas, disponibilidad, estados) pero no la UI de grilla habitación × fecha. Deliberado: el catálogo es backend TypeScript. Bravas construye el rack chart consumiendo `reservation` + `room-availability`. Cuando un segundo vertical (coworking, rent-a-car) lo necesite, se extrae.

**F&B / room service:** no existe como módulo. El catálogo tiene `orders` + `catalog` + `inventory` + `payments` — las piezas están — pero la integración "cárguelo a la cuenta del cuarto" no está construida. Correctamente F4. Es el primer módulo que Bravas construirá con disciplina de lib portable para después publicarlo como `@octosd/food-service`.

**Compliance AR + ES:** SES.Hospedajes, Verifactu (ES), AFIP/ARCA bilateral (AR). Correctamente BRAVAS-VERTICAL. No publicar hasta que aparezca un segundo hotel europeo.

Lo que no es un gap: `@octo/tenant-rls`. Todos los módulos ya son multi-org nativos. No hace falta un módulo aparte.

---

**3. Los módulos son neutrales entre custom y SaaS — converge con la posición del arquitecto**

El diseño de los 87 módulos es multi-org nativo (org_id en todas las tablas, inject-db pattern). Para Bravas: el primer deploy single-hotel usa los mismos módulos con la misma API que el décimo hotel en un SaaS multi-tenant. No hay dos versiones del código. Si el modelo es "instancia dedicada por hotel" (Option C), los módulos corren en cada instancia sin ningún cambio. Si el modelo es SaaS compartido, corren en una sola instancia con RLS. La neutralidad del catálogo confirma la posición del arquitecto sobre el schema.

---

**4. El costo del catálogo se amortiza en escala — el primer hotel no captura el multiplicador**

Con el primer hotel, Bravas paga el setup pero no aprovecha el efecto de red. Con 5 hoteles instalados, el catálogo vale el 5× con costo marginal casi cero por módulo adicional. Esto refuerza el argumento del cap de 3-5 hoteles custom que menciona bravas: sin escala, el catálogo es overhead; con escala, es la ventaja competitiva. La decisión de cap de los customs es también una decisión de cuándo se activa el valor del catálogo.

---

**5. El gap real de Bravas no son más módulos — es orquestación cross-módulo**

Los módulos individuales están listos. Lo que Bravas tiene que construir es la capa que los conecta:

- Reserva confirmada → `notifications` + `audit-log` + `billing` (pre-autorización)
- Checkout registrado → `housekeeping` (habitación a limpiar) + `checklist` + `billing` (cierre)
- Housekeeping marca "limpia" → `room-availability` (disponible) + `notifications` (alerta recepción)
- Room service pedido → `orders` + `inventory` (minibar) + cargo a cuenta del cuarto

Estos workflows cross-módulo son el IP real de Bravas, no el código de los módulos base. Esta distinción importa: en un modelo custom, la orquestación puede variar entre hoteles. En un modelo SaaS, la orquestación es el producto. Esa es la diferencia de código que sí existe entre ambos modelos — no en los módulos del catálogo, sino en la capa que los une.

---

*Sección escrita por: octo-modules · 2026-11-13*

---

## Sección: optimizacion

**Posición:** La recomendación del arquitecto de "empezar simple" es procesalmente correcta. Mi análisis agrega los 5 riesgos operativos que crecen silenciosamente bajo cada opción y que solo se hacen visibles cuando ya duelen.

---

**1. La velocidad de construcción no es el cuello de botella — es el costo de operación post-lanzamiento**

El arquitecto resolvió la pregunta de velocidad de build. Lo que ese análisis no captura: Opción B no se rompe en la construcción del hotel #2 — se rompe en el soporte del hotel #3 a las 3am cuando hay un checkout masivo y algo falla. Los hoteles operan 24/7. Con un equipo del tamaño de Octo, el cuello de botella no es "cuántas features construimos por mes" — es "cuántos incidentes de producción simultáneos podemos absorber". Opción B con código divergente puede generar 3 incidentes de naturaleza diferente en la misma noche. Opción C con el mismo codebase: si el bug existe en todos, se parchea una sola vez. Para 4-5 agentes, la capacidad de soporte nocturno es 1-2 incidentes simultáneos. Opción B supera ese límite antes del hotel #4.

---

**2. El costo de migrations en N instancias es manejable con una sola regla**

La mitigación concreta para el riesgo de migrations del arquitecto: **migrations siempre aditivas durante toda la Fase 1** (ADD COLUMN, CREATE TABLE — nunca DROP, ALTER TYPE, RENAME). Con esta restricción, una migration que falla en el hotel #3 no bloquea los hoteles #1 ni #2. Sin ella, una migration destructiva que falla a mitad de las N instancias es un incidente de producción de alta severidad en cada release con cambio de schema. Esta regla tiene un costo de largo plazo (schema acumula columnas obsoletas), pero ese costo se paga en la migración al SaaS compartido en Fase 2, no en las operaciones diarias de las customs.

---

**3. El cap necesita una señal operativa además de las señales técnicas**

El arquitecto definió el cap con señales de infra (5 Supabase, 5 Vercel Pro, >30% features tipo C). Esas señales llegan tarde — cuando se activan, ya hay 5 hoteles en producción. La señal operativa que recomiendo agregar: **si el tiempo de soporte y mantenimiento de customs supera el 30% de la capacidad del equipo, el cap se activa**. Esta señal es medible antes del límite técnico y es la que Octo va a sentir primero. Con 3 hoteles en temporada alta simultánea + SaaS base en construcción + features nuevas para customs, el equipo de 4-5 agentes ya está cerca del límite. El hotel #4 no falla en la construcción — falla en el soporte.

---

**4. SaaS compartido vs instancia dedicada: la decisión es de posicionamiento, no de arquitectura**

El arquitecto plantea la duda: ¿los clientes hoteleros quieren isolación física? Desde el proceso de ventas: depende de cómo se presente, no de lo que el cliente "quiere" por default. Un hotel que nunca preguntó por isolación física no va a pedirla si no se la ofrecen. Recomendación práctica: arrancar con SaaS compartido para los primeros 2-3 clients argentinos (hoteles boutique / medianos que no van a preguntar por isolación). Ofrecer instancia dedicada como tier explícito solo cuando un cliente lo pida. Esto no compromete el modelo — es no pagar el overhead de N deploys antes de necesitarlo, y libera capacidad para construir features.

---

**5. El único proceso que distingue Opción C de Opción B disfrazada**

La diferencia entre Opción C viable y Opción B disfrazada es una sola regla: **cada feature tenant-específica (tipo C en la doctrina del arquitecto) tiene un TTL de 90 días con decisión explícita: (a) absorber al core, (b) catalogar como config permanente del tenant, o (c) aceptar que ese tenant es un fork.** Sin esta regla, el camino natural es que el equipo haga el feature flag rápido, el cliente quede feliz, y nadie vuelva a revisar. Con 5 hoteles y 2-3 features tipo C por hotel, el codebase acumula 15 flags sin dueño y el modelo C está degradado a B sin que nadie lo haya decidido. La regla no requiere código ni infraestructura — requiere que Daniel diga "sí" cuando el equipo proponga absorber una feature custom en lugar de dejarla como flag por comodidad.

---

### Mi posición en una frase

Empezar con un hotel y un deploy simple es correcto; arrancar con SaaS compartido para los primeros clientes argentinos es procesalmente más sostenible que N instancias dedicadas; y la única decisión que necesita tomarse hoy — antes del segundo hotel — es la regla de TTL de features tipo C: sin esa regla, Opción C es una promesa sin mecanismo de cumplimiento.

---

*Sección escrita por: optimizacion · 2026-11-13*
