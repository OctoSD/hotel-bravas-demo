# HILO — Hotel Bravas · rol `bravas`

## Dónde quedamos (última actualización: 2026-11-07 cierre)

**🟢 RETOMAR MAÑANA desde:** F2.5 cerrada a 20 pantallas con los 2 sectores nuevos (Admin/CFO + RRHH dept) construidos y navegables. **Pendiente de decisión Daniel:** publicar la actualización a `gh-pages` para que la URL pública refleje las 20 pantallas (hoy la URL pública está en 16 pantallas de 2026-11-05). También pendiente de supervisor la respuesta a la propuesta de rol IA de seguridad cross-portfolio (nota del día en bandeja supervisor).

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
