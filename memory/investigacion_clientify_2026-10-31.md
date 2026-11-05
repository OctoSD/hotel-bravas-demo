# Investigación: Clientify (CRM+IA+WhatsApp)

**Fecha:** 2026-10-31
**Rol:** bravas
**URL base:** https://clientify.com/campana/crm-ia-whatsapp
**Investigador:** subagente general-purpose

> **Nota metodológica**: Investigación hecha con WebFetch directo a clientify.com (home, campana/crm-ia-whatsapp, campana/whatsapp, productos/comunicacion, productos/ventas, en/crm/automations) + ayuda.clientify.com (docs oficiales IA) + WebSearch sobre inbox, automatizaciones, compliance. Algunas rutas (/ia/, /caracteristicas/, /automatizaciones/) devolvieron 404 — el sitio reorganizó la IA bajo `/productos/*` y `/campana/*`. Trust Center y cert ISO verificadas por búsqueda.

---

## 1. Overview — qué es Clientify

Clientify es un **CRM todo-en-uno para PYMEs** con sede en Almería (España), fuertemente volcado al mercado hispanohablante (España + LATAM: Buenos Aires, Cali, México mencionados en soporte). Se autodefine como "el CRM con IA y WhatsApp para que no se te escape ni una venta".

**NO es software hotelero** — es un CRM genérico que cubre ciclo completo lead-to-cash. Lo miramos porque encarna de forma madura un patrón que Bravas necesita: **inbox omnicanal + IA conversacional + ficha 360° del contacto**. Es básicamente el "lenguaje visual" que un huésped de hotel esperaría en un portal de chat con el hotel.

**Datos duros:**
- +10.000 clientes en 25 países
- ISO/IEC 27001:2022 certificado
- Meta Business Partner oficial (WhatsApp Cloud API directa, no reseller)
- Google Partner
- Servidores en UE, DPO registrado en AEPD
- Hero de la landing CRM-IA-WhatsApp muestra métricas simuladas de dashboard: €48.250 ventas/mes, 284 leads nuevos, 32,4% conversión — ese es el tono "SaaS dashboard-driven" que proyectan.

**Posicionamiento comercial**: la famosa comparativa "€342/mes con 6 herramientas separadas vs €39/mes todo integrado". Es un ancla fuerte, bien ejecutada.

---

## 2. Arquitectura y módulos

Clientify organiza el producto en **tres grandes productos** (así los llama ellos en el menú) + capa transversal de IA + capa de integraciones.

### 2.1 Comunicación (el inbox omnicanal)
- **Inbox unificado multiagente** (hasta 50+ agentes sobre una misma línea WhatsApp)
- Canales: WhatsApp Business API (Cloud), Instagram DM, Facebook Messenger, Live Chat web, Email, Telefonía IP, comentarios de redes
- Chatbot IA (configurable con plantillas: asistente general, asesor de ventas, soporte)
- Agentes IA que escalan a humano cuando corresponde
- Firma electrónica integrada dentro de la conversación
- Templates aprobados por Meta
- Múltiples líneas WhatsApp por cuenta (una por sede/marca)

### 2.2 Ventas (CRM core)
- Procesos de venta customizables (hasta 25 pipelines)
- Vista Kanban con drag-and-drop entre etapas
- Ficha de contacto 360° (visión integral: historial de conversaciones, deals, actividades, notas, emails)
- Gestión de actividades y tareas
- Agendamiento con links de reserva (tipo Calendly embebido)
- Presupuestos y **propuestas con IA**
- Firma electrónica
- Forecasting y dashboards

### 2.3 Marketing (demand gen + nurturing)
- Automatizaciones con **workflow builder visual**
- Email marketing + A/B testing
- Landing pages (constructor con IA)
- Formularios
- Lead scoring
- WhatsApp Marketing (broadcast segmentado)
- Double opt-in (requerido por RGPD)
- RadarB2B (prospección / enriquecimiento)
- Analítica con export Excel + conector Looker Studio

### 2.4 Capa IA transversal (apodada "Superinteligencia")
Interruptor global que se activa desde el panel principal. Cuando está ON, aparecen botones de IA en toda la UI (fichas, inbox, pipeline). Más abajo lo detallo módulo por módulo.

### 2.5 Integraciones
- 15.000+ apps nativas y vía Zapier
- Conectores destacados: Holded, Shopify, WooCommerce, N8N (automatización técnica), **Claude (conector oficial)**
- API pública y webhooks

---

## 3. UX/UI observado (chat + IA + inbox unificado)

### 3.1 Paleta y tipografía
Clientify tiene **dos "trajes" visuales** según la sección:

**Marketing / landings:**
- Fondo oscuro casi negro (#1a1a1a aprox) con contraste alto
- Acento verde turquesa (~ #00D084) para CTAs ("Prueba gratis")
- Grises medios para texto secundario
- En home también aparecen gradientes morados/púrpura y naranjas/dorados (#FFD133) para badges y mock-ups
- Verdes (#1BB65D) para estados de éxito/validación
- Tipografía: sans-serif tipo Inter o Helvetica Neue; display bold en titulares, regular en cuerpo; **números grandes y en negrita** (€48.250 ↑23%) estilo "métrica de dashboard"

**Dentro del producto (mock-ups en landings):**
- Fondo claro (blanco / gris muy claro)
- Cards blancas con sombra sutil
- Chips de colores para estados y tags
- Verde para "Ganado", azul para "Contactado", amarillo para "Propuesta"

**Tono de voz**: directo, cercano, con emojis moderados ("Hola, equipo Clientify 👋"), problema→solución, humor suave estilo "sin tarjeta, cancela cuando quieras".

### 3.2 Dashboard principal
Lo que muestran en el hero del producto es un **cockpit comercial** con cuatro grandes KPIs arriba (ventas €, pipeline €, leads nuevos, conversión %), un **pipeline visual Kanban** debajo (columnas Nuevo → Contactado → Propuesta → Ganado, cada card con monto EUR, avatar del comercial y badge de probabilidad), y a la derecha un panel de **actividad reciente** con conversaciones vivas y asignaciones.

Es un layout de 2 columnas: contenido principal + sidebar de actividad. Muy "Pipedrive-meets-HubSpot".

### 3.3 Inbox unificado — layout crítico para Bravas
El patrón visual confirmado del inbox (según landings, blog y screenshots embebidos):

**Layout de 3 columnas clásico:**
- **Columna izquierda**: lista de chats con filtros por estado (abierto / cerrado / congelado), por canal (chip con logo WhatsApp / Insta / FB / LiveChat), por responsable, por atributo/etiqueta. Cada item muestra avatar, nombre, snippet del último mensaje, timestamp, badge no-leído, chip de canal.
- **Columna central**: la conversación. Burbujas estilo WhatsApp (verdes claras para entrante, blancas/grises para saliente). Barra superior con nombre + estado + botones de acción (asignar agente, crear oportunidad, crear tarea, programar videollamada, adjuntar presupuesto). Barra inferior con composer, templates, emoji, adjuntos.
- **Columna derecha**: ficha 360° del contacto. Datos personales, deals abiertos, timeline, notas internas, tags, scoring, botones "Enriquecer", "Ver resumen IA", "Ver precualificación IA", "Preparar reunión".

**Elementos conversacionales distintivos:**
- Notas internas inline en el chat (visibles solo al equipo, no al cliente) — patrón muy útil para hoteles (recepción deja nota para housekeeping dentro del hilo del huésped)
- Asignación de conversación con avatar visible al equipo
- Chip de "respondido por IA" vs "respondido por humano"
- **Sugerencia de respuesta IA** aparece como un bloque gris encima del composer, el agente la revisa y envía (o edita)

### 3.4 Cómo integra IA — mapa de puntos de aparición
Esto es lo más valioso para Bravas. La IA de Clientify no es un chatbot aislado — está **sembrada en toda la UI** mediante un patrón que llaman "Superinteligencia":

| Dónde aparece la IA | Qué hace | Patrón UX |
|---|---|---|
| Interruptor global superior | On/off de "Superinteligencia" | Toggle estilo switch iOS |
| Inbox > composer | Sugerencias de respuesta | Bloque gris flotante encima del input, "Usar" / "Editar" / "Descartar" |
| Ficha de contacto | 3 botones nuevos sobre la actividad: **Ver resumen**, **Ver precualificación (BANT)**, **Preparar reunión** | Botones con icono IA, el resultado se guarda como nota con fecha |
| Pipeline > ficha oportunidad | **Enriquecimiento de deal**: cálido / muy cálido / frío + señales de compra + objeciones detectadas | Badge de temperatura + lista scrolleable |
| Ventas > Propuestas | Generador de propuestas IA (brief → doc) | Wizard de 3 pasos |
| Marketing > Landing Pages | Generador de landings IA | Wizard tipo prompt-to-page |
| Reuniones (Google Meet) | **Agente de reuniones**: extensión Chrome que transcribe y resume | Modal post-meet con resumen + next steps + CTA |
| Analítica | Botón "Generar informe con IA" eligiendo audiencia/objetivo/tono | Form corto, output = reporte Markdown |
| Ajustes > Campos personalizados | "Rellenar con agente IA" en masa | Checkbox al crear el campo |
| Email | **Clasificación automática de bandeja** (la IA más usada según su propia doc) | Chips de categoría en lista |
| Menú lateral izq | **Skills**: tareas pre-hechas ("Arranca el día", "Leads que necesitan atención", "Preparar demo") | Botones grandes en sidebar, estilo "quick actions" |

**Decisión UX importante**: *cada función muestra el consumo de créditos ANTES de ejecutarse*. Transparencia explícita — útil pattern para cualquier SaaS con IA.

### 3.5 Workflow builder (automatizaciones)
Es un **constructor visual tipo árbol**, no un flow horizontal. Nodo raíz = Trigger. Debajo, acciones encadenadas. Triggers disponibles: URL visitada, Tag asignado, Segmento cumplido, Cambio de etapa de oportunidad, Formulario enviado. Acciones: asignar lead, enviar mensaje (WhatsApp / email / SMS), mover oportunidad, esperar X tiempo, condicional, crear tarea.

El layout del canvas no está documentado en pixel-perfect, pero por los mock-ups en la landing /crm/automations es **vertical, con nodos tipo card y conectores**.

### 3.6 Chat UI: patrón confirmado para replicar
- Burbujas estilo WhatsApp (lo que el usuario ya conoce)
- Barra de contexto superior con **datos clave visibles sin scrollear**: nombre, estado conversación, último contacto, etiquetas
- Timeline mezcla mensajes del canal + eventos del CRM (deal creado, propuesta enviada, pago recibido) — esto es muy potente para "ver todo lo que pasó con este contacto en un solo scroll"
- Templates se insertan con `/` o botón, se previsualizan antes de enviar
- Un hilo = un contacto, no un canal. Si el huésped escribió por WhatsApp y por LiveChat, se ve todo junto.

---

## 4. Features destacables (top 15, priorizando IA)

Ordenadas por relevancia para Bravas:

1. **Superinteligencia (toggle IA global)** — un solo switch activa IA en toda la UI. Patrón UX poderoso.
2. **Sugerencias de respuesta IA en inbox** — borrador propuesto encima del composer, con contexto completo del contacto.
3. **Resumen automático de conversación** (botón en ficha) — el agente que agarra un chat largo arranca con contexto resuelto.
4. **Lead scoring con IA** — clasifica deal como cálido / muy cálido / frío + razones.
5. **Chatbot IA 24/7** entrenable con base de conocimiento propia, con "handoff" a humano cuando no sabe o cuando el lead califica.
6. **Agente de reuniones** (transcribe Google Meet + resumen + next steps).
7. **Clasificación automática de emails** por IA.
8. **Inbox omnicanal multiagente** sobre WhatsApp Business API oficial.
9. **Pipeline Kanban drag-and-drop** con hasta 25 procesos de venta configurables.
10. **Timeline unificado contacto 360°** (mensajes de todos los canales + eventos CRM).
11. **Workflow builder visual** (triggers / acciones / condiciones).
12. **WhatsApp Broadcast segmentado** con templates aprobados por Meta.
13. **Propuestas con IA** (brief → documento → firma electrónica integrada).
14. **Enriquecimiento de contacto automático** (RadarB2B + relleno de campos custom con IA).
15. **Conector nativo con Claude** (consultar el CRM desde Claude vía MCP).

---

## 5. Target, pricing y diferenciadores

### Target
- PYMEs hispanohablantes (España + LATAM)
- Verticales que listan explícitamente: PYMES generalistas, Educación, Industria, E-commerce, Tecnología, Agencias, Viajes, Salud, Servicios, Inmobiliarias
- **NO listan hotelería** — es un gap de mercado directo. "Viajes" aparece pero probablemente agencias, no hoteles.
- Equipos de 1 a ~50+ agentes (menciones de clientes con 50+ en WhatsApp)

### Pricing
- **Plan único** (muy inusual en SaaS CRM): €39/mes anual o €65/mes mensual, por seat
- Usuarios ilimitados (seat = persona con acceso ventas/comunicación activo)
- Contactos de marketing ilimitados
- Todas las features del plan en el free trial
- Planes custom para enterprise bajo pedido
- **Modelo de créditos IA**: cada acción IA consume créditos, se muestran antes de ejecutar. En oct 2026 estaba "gratis", en nov 2026 pasaron a planes duplicados (mismo precio, doble créditos).

### Diferenciadores comunicados
1. **Precio bundle agresivo** (comparativa €342 vs €39)
2. **Soporte humano en español 24h** (no bot) — énfasis fuerte
3. **Meta Business Partner oficial** (WhatsApp Cloud API directa, sin reseller)
4. **ISO 27001:2022** certificado
5. **Enfoque LATAM real** (equipos en Buenos Aires, Cali, España)
6. **Migración asistida** desde competidores
7. **Trial sin tarjeta** con 100% de features
8. **Conector Claude** (uno de los primeros CRMs con MCP nativo)

---

## 6. Compliance (RGPD, WhatsApp Business API)

- **RGPD/GDPR**: cumplimiento total declarado, con medidas técnicas y organizativas, DPAs disponibles, mecanismos de transparencia
- **DPO oficial** registrado en AEPD (Agencia Española de Protección de Datos) — email `dpo@clientify.com`
- **ISO/IEC 27001:2022** — SGSI certificado
- **Servidores en UE**
- **Oficina central**: Almería, España
- **Doble opt-in** nativo en marketing (requisito RGPD cumplido en producto)
- **Trust Center público** en clientify.com/en/trust-center
- **Meta Business Partner oficial** — operan WhatsApp Business Cloud API directamente, no vía reseller/BSP tercero. Esto garantiza cumplimiento con políticas de Meta y evita riesgo de ban por intermediación.
- Templates WhatsApp aprobados por Meta antes de uso (flujo estándar WABA)
- Broadcast con segmentación respetando opt-in

---

## 7. Recomendaciones para HOTEL BRAVAS (corto plazo) — portal huésped con chat/IA

Lo accionable para la v2 de Bravas. Patrones a copiar casi tal cual:

**A. Chat del portal huésped — layout 3 columnas (adaptado)**
- Para el **huésped**: una sola columna (chat), responsive, estilo WhatsApp (burbujas verdes/blancas, timestamps, lectura). Tipo WhatsApp Web.
- Para el **recepcionista / staff del hotel**: 3 columnas idéntico a Clientify: lista huéspedes activos → conversación → ficha 360° del huésped (habitación, check-in/out, consumos, preferencias, histórico de estancias, incidencias previas).
- La ficha del huésped equivale a la ficha de contacto de Clientify. Es nuestro "contacto 360°".

**B. Timeline unificado (clave)**
Mezclar en un solo scroll: mensajes del huésped + eventos del PMS (check-in realizado, servicio solicitado, factura emitida, incidencia resuelta, pedido room-service). Clientify lo hace entre canales + CRM; nosotros lo hacemos entre canales + PMS/portales (cocina, limpieza).

**C. Notas internas inline**
Recepción deja nota dentro del hilo del huésped visible solo al staff ("huésped celíaco, avisar cocina"). Patrón directo de Clientify, altísimo valor en hotel.

**D. Sugerencias de respuesta IA**
Bloque gris encima del composer: "Hola María, tu habitación está lista a partir de las 15h, ¿te acerco algo mientras tanto?". Botones Usar / Editar / Descartar. El staff aprueba o edita, no escribe desde cero. Esto baja el costo marginal de atención brutalmente.

**E. Toggle "IA Asistente" global**
Switch arriba a la derecha. Cuando está off, el staff opera manual. Cuando está on, aparecen todos los botones IA en inbox + ficha. Un solo gesto para activar/desactivar — gran UX.

**F. Botones IA en ficha de huésped**
Equivalentes a los tres de Clientify, adaptados:
- "Ver resumen de estancia" (reemplaza "resumen conversación")
- "Ver preferencias" (reemplaza "precualificación BANT")
- "Preparar check-in" (reemplaza "preparar reunión")

**G. Chips de estado conversación**
Abierta / resuelta / escalada / esperando huésped. Igual que Clientify (abierto / cerrado / congelado).

**H. Transparencia de IA**
Mostrar al staff cuándo una respuesta fue generada por IA vs humano (chip pequeño). Y mostrar coste/créditos antes de ejecutar acción pesada — patrón sano.

**I. Paleta recomendada**
Para portal huésped (público): mantener identidad Bravas. Para backoffice staff: podemos ir más cerca de Clientify (fondo claro, acento turquesa/verde para CTA, chips de colores suaves para estados). Tipografía Inter o similar.

**J. Lo que NO copiaría**
- El toggle único "Superinteligencia" global es elegante pero demasiado simplificado para hotel; necesitamos permisos más finos (housekeeping no debería ver IA de pricing)
- La vista Kanban de pipelines no aplica directo; hotel usa calendarios y rack, no pipeline comercial — salvo que montemos un pipeline paralelo de "leads de reserva" (interesante idea).

---

## 8. Recomendaciones SaaS hotelero standalone (largo plazo) — módulo CRM huésped

Si eventualmente lanzamos la app canónica como SaaS hotelero multi-tenant, el **módulo "CRM del huésped"** sería prácticamente un fork del modelo Clientify, especializado:

**A. Arquitectura modular análoga**
- **Comunicación** → Inbox omnicanal huésped (WhatsApp + web chat del portal huésped + email + eventualmente SMS pre-llegada). Multiagente por rol: recepción, concierge, housekeeping, F&B.
- **Operaciones** (reemplaza "Ventas") → Pipeline del ciclo de estancia: pre-llegada → check-in → estancia → check-out → post-estancia. Cada "deal" es una reserva. Drag-and-drop entre etapas con triggers.
- **Marketing** → Fidelización: segmentación, broadcast WhatsApp (ofertas de temporada, cumpleaños, re-engagement de huéspedes dormidos), landing pages de ofertas, email nurturing.

**B. Capa IA transversal específica hotel**
- Resumen de conversación / resumen de estancia
- Scoring de huésped (frecuente / nuevo / VIP / problemático) análogo al scoring BANT
- Sugerencias de up-sell contextuales ("huésped preguntó por restaurantes → sugerir reserva en el restaurante del hotel")
- Clasificación automática de reviews (sentiment)
- Agente IA 24/7 por WhatsApp con base de conocimiento del hotel (horarios, servicios, políticas) y handoff a recepción cuando no sabe
- Resumen automático de reviews para dirección (equivalente al agente de reuniones)
- Enriquecimiento de huésped (si llegó por OTA, buscar perfil social, histórico de otras cadenas si acepta data sharing, idiomas preferidos)

**C. Workflow builder hotelero**
Triggers específicos: check-in realizado, X horas antes del check-out, review publicada <= 3 estrellas, no respondió mensaje en Y horas, consumo acumulado > Z. Acciones: enviar WhatsApp template, asignar a concierge, crear tarea housekeeping, descuento automático, escalar a dirección.

**D. Compliance crítica**
Replicar su stack: ISO 27001, RGPD con DPO, Meta Business Partner directo (clave para WhatsApp en hotel, evita bans por intermediarios). Servidores UE. Doble opt-in. Trust Center público desde el día 1 — es un diferenciador comercial pesado al vender a cadenas que exigen auditoría.

**E. Pricing model aplicable**
Clientify prueba que el bundle único (plan único + per-seat) funciona vs la fragmentación por features. Para hotelero adaptaría a per-room o per-property + seats de staff. Modelo de **créditos IA transparente mostrando consumo antes de ejecutar** es una práctica muy buena a copiar.

**F. Gap de mercado detectado**
Clientify explícitamente lista Educación, Industria, Agencias, Viajes, Salud, Servicios, Inmobiliarias — **NO hotelería**. "Viajes" apunta a agencias de viajes, no a hoteles. Esto confirma el hueco: nadie en el espacio hispano está haciendo CRM+IA+WhatsApp **nativo hotelero**. La oportunidad SaaS largo plazo es real.

---

## Fuentes

- [Clientify home](https://clientify.com)
- [Clientify — Campaña CRM IA WhatsApp](https://clientify.com/campana/crm-ia-whatsapp)
- [Clientify — Campaña WhatsApp](https://clientify.com/campana/whatsapp)
- [Clientify — Producto Comunicación](https://clientify.com/productos/comunicacion)
- [Clientify — Producto Ventas (/crm)](https://clientify.com/crm/)
- [Clientify — Automations (EN)](https://clientify.com/en/crm/automations)
- [Clientify Ayuda — Todo lo que puedes conseguir con la IA de Clientify](https://ayuda.clientify.com/es/articles/17722045-new-todo-lo-que-puedes-conseguir-con-la-ia-de-clientify)
- [Clientify Ayuda — Lanzadores de automatizaciones](https://ayuda.clientify.com/es/articles/11194100-new-lanzadores-de-automatizaciones)
- [Clientify Trust Center](https://clientify.com/en/trust-center)
- [Clientify Blog — Inbox WhatsApp Multiagente](https://clientify.com/blog/comunicacion/inbox-whatsapp)
- [Clientify Blog — Agente IA de Reuniones](https://clientify.com/blog/copiloto-agente-ia-reuniones)
- [Clientify Agente IA — Actas de Reuniones](https://clientify.com/agente-ia/agente-actas-de-reuniones)
