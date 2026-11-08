# Investigación — Estructura de departamentos y áreas operativas en hoteles 4 y 5 estrellas

**Fecha:** 2026-11-08 15:28
**Rol:** bravas
**Proyecto:** Hotel Bravas — catálogo maestro de sectores para SaaS multi-tenant
**Objetivo:** Validar y expandir la lista actual de 6 departamentos de la demo contra la realidad hotelera 4-5*, identificar faltantes críticos, y matrizar por tipo de hotel (boutique urbano, urbano 4*, resort playa, negocios).

---

## 1. Resumen ejecutivo (para decisiones rápidas)

### Lo que YA tenemos modelado en la demo F2.5 (6 departamentos + dirección)

1. Recepción / Front Office — jefe de recepción
2. Housekeeping / Gobernanta — gobernanta
3. Cocina / F&B básico — chef ejecutivo
4. Mantenimiento — jefa de mantenimiento
5. Administración / CFO — CFO del hotel
6. RRHH — HR manager
7. Dirección general — director

### Lo que NOS FALTA (prioridad crítica, todo hotel 4* los tiene)

| Dept faltante | Decisión sugerida | Por qué |
|---|---|---|
| **Comercial / Ventas & Marketing** | Crear sector propio | Cualquier 4* tiene al menos 1 persona dedicada a OTAs, grupos, empresas, revenue |
| **Revenue Management / Reservas** | Sub-dept de Comercial (chico) o dept propio (grande) | Integrable con channel manager SiteMinder ya decidido |
| **F&B Servicio (salón/bar/room service)** | Separar de Cocina | Cocina produce; Servicio sirve. Tienen jefes distintos (Maître vs Chef) |
| **Economato / Compras / Almacén** | Sector propio | Flujo distinto: proveedores, pedidos, stock, control FIFO; integra con A&B y HK |
| **Seguridad** | Sector propio | 4-5* 24/7, CCTV, PRL, incendios — en ES obligatorio por normativa |

### Lo que NOS FALTA (importantes — mayoría de 4* los tiene)

- **IT / Sistemas** (en cadenas suele estar en HQ, en independiente es externo o 1 persona)
- **Guest Experience / Calidad** (reputación online, encuestas, loyalty)
- **Conserjería / Bell Desk** (sub-dept de Front Office; en 5* puede ser dept propio)

### Lo que es OPCIONAL (solo si el hotel lo tiene)

- **Spa & Wellness** (resorts 4-5* y algunos urbanos 5*)
- **Animación / Kids Club** (casi exclusivo de resort familiar)
- **Eventos & Banquetes** (hoteles de negocios y resorts con salones; sub-dept de F&B)
- **Piscina / Playa / Deportes** (resorts)
- **Garaje / Valet** (urbanos grandes; sub-dept de Front Office)
- **Jardinería** (resorts y hoteles con áreas verdes grandes; sub-dept de Mantenimiento)
- **Sostenibilidad / RSE** (tendencia 2026, transversal; ISO 14001, EU Green Deal)

**Veredicto estratégico:** la demo actual cubre bien un hotel 3* o un boutique chico. Para apuntar a 4* en Capital y costa argentina, se necesitan como mínimo: **Comercial + F&B Servicio + Economato + Seguridad** como sectores propios, y **Guest Experience** como función transversal (puede vivir dentro de Front Office en N1 y migrar a dept propio en N2 cuando el hotel crece).

---

## 2. Organigrama estándar por categoría

### 2.1 Hotel 3* (benchmark de donde venimos)

Estructura simplificada, muchos roles multi-función:

```
Director / Propietario-gerente
├── Jefe de Recepción (+ reservas + conserjería informal)
├── Gobernanta (+ lavandería interna o tercerizada)
├── Chef (+ salón si hay restaurante propio)
├── Mantenimiento (1-2 personas, muchas veces tercerizado)
└── Administración (contabilidad externa + 1 persona interna)
```

- 2 niveles jerárquicos (director → staff).
- Marketing/ventas: suele hacerlo el director o un externo (agencia OTAs).
- RRHH: no hay dept formal, lo hace admin + gestoría externa.
- Seguridad: cámaras monitoreadas por recepción, no hay dept.
- IT: externo.

### 2.2 Hotel 4* urbano (80-150 habs — target primario Bravas)

Estructura tripartita (FOH / BOH / Admin), con jefes de departamento diferenciados:

```
Director General
│
├── FRONT OF HOUSE (cara al huésped)
│   ├── Jefe de Recepción (Front Office Manager)
│   │   ├── Recepcionistas (turnos 24/7)
│   │   ├── Conserjería / Bell Desk (botones, porteros, telefonía)
│   │   └── Reservas (puede subir a Comercial)
│   ├── Jefe de F&B / Maître (Food & Beverage Service)
│   │   ├── Restaurante / salón (meseros, camareros)
│   │   ├── Bar / lobby bar (bartenders)
│   │   ├── Room service
│   │   └── Banquetes / eventos (si hay salón)
│   └── Director Comercial (Sales & Marketing)
│       ├── Ventas (empresas, agencias, grupos)
│       ├── Revenue Manager (yield, OTAs, channel manager)
│       └── Marketing digital / redes / reputación
│
├── BACK OF HOUSE (operaciones internas)
│   ├── Gobernanta (Executive Housekeeper)
│   │   ├── Camareras de piso
│   │   ├── Lavandería (si es interna)
│   │   ├── Áreas públicas (limpieza común)
│   │   └── Lencería
│   ├── Chef Ejecutivo (Kitchen / Food Production)
│   │   ├── Sous chef(s) por partida
│   │   ├── Cocineros (línea, fría, caliente, pastelería)
│   │   └── Steward (plonge, lavavajillas industrial)
│   ├── Jefe/a de Mantenimiento (Engineering)
│   │   ├── Técnicos (electricidad, HVAC, fontanería)
│   │   └── Jardinería (si aplica)
│   ├── Economato / Compras (en 4* puede fusionarse con Admin)
│   │   ├── Comprador
│   │   ├── Almacén / recepción mercadería
│   │   └── Control de stock + bodega
│   └── Jefe de Seguridad
│       ├── Vigilantes (24/7)
│       ├── CCTV / sala de control
│       └── Fire Panel / PRL
│
└── STAFF / SOPORTE (funciones corporativas)
    ├── CFO / Admin Director
    │   ├── Contabilidad / tesorería
    │   ├── Cuentas por pagar/cobrar
    │   └── Audit nocturno (night auditor — puede estar bajo Front Office)
    ├── HR Manager
    │   ├── Nóminas
    │   ├── Selección / formación
    │   └── PRL (Prevención de Riesgos Laborales)
    ├── IT (puede ser tercerizado o 1 persona + proveedor)
    └── Guest Experience / Calidad (puede vivir bajo Comercial o ser transversal)
```

**Niveles jerárquicos: 3-4** (Director → Jefes de dept → Supervisores → Staff operativo).

### 2.3 Hotel 5* urbano y de lujo (200+ habs, servicio premium)

Lo mismo que 4* **más** especialización fina:

- **Guest Relations** como dept propio (no sub-función) — VIPs, loyalty, concierge Les Clefs d'Or.
- **Revenue Management** como dept propio con director dedicado (no sub-función de Comercial).
- **IT** como dept propio con 2-3 personas (sistemas, red, telefonía, PMS, integraciones).
- **Spa & Wellness** típicamente dept propio con Spa Manager que reporta directo a GM.
- **Catering & Eventos** se separa de F&B operativo (tiene su propio Director of Catering).
- **Chief Concierge** como rol senior (en español "Jefe de Conserjería").
- **Executive Chef** con brigada completa: pastelería, carnicería, panadería, garde manger como sub-brigadas con sous chef cada una.
- **Director of Loss Prevention** (versión senior de Jefe de Seguridad).
- **Banquet Manager** separado de Maître.

**Niveles jerárquicos: 5+** (Director → Executive Committee → Directores de división → Jefes de dept → Supervisores → Staff).

### 2.4 Qué agrega 5* que 4* no tiene (la línea)

- Concierge Les Clefs d'Or certificado.
- Butler service / mayordomo personal.
- Spa + fitness premium como atracción propia (no amenity).
- Múltiples restaurantes con chefs titulares cada uno (signature dining).
- Equipo de Guest Relations dedicado 24/7 con lista VIP.
- Executive Committee formal (GM + 6-8 directores reunión semanal).
- Loyalty program coordinator (si pertenece a cadena).

### 2.5 Qué agrega 4* que 3* no tiene

- Recepción 24/7 con equipo (no 1 persona + timbre nocturno).
- F&B con restaurante operativo no solo desayuno.
- Housekeeping con gobernanta profesional (no "la encargada").
- Marketing/ventas dedicado (no solo el dueño).
- Maître / jefe de salón diferenciado del chef.
- Night auditor dedicado.

---

## 3. Investigación detallada por departamento candidato

Esta sección responde al pedido 2 del brief: validar uno por uno los departamentos candidatos que faltan en la demo.

### 3.1 A&B completo (NO es solo cocina)

**Realidad:** F&B es uno de los departamentos más complejos del hotel 4-5*. Se parte siempre en dos ramas:

- **F&B Production (Cocina)** — produce la comida. Jefe: Chef Ejecutivo. Sub-brigadas: cocina caliente, fría, pastelería, panadería, garde manger, butchery.
- **F&B Service (Salón)** — sirve la comida. Jefe: Maître o F&B Manager. Outlets: restaurante(s), bar(es), room service, banquetes/eventos, catering externo, lobby bar, pool bar (resort).

**Diferencia clave con la demo actual:** la demo tiene "Cocina / F&B básico" bajo un solo jefe (Carlo Rizzo — Chef Ejecutivo). Eso funciona para un hotel chico donde el chef manda sobre cocinero + mesero. Pero en cuanto el hotel tiene un restaurante con 3+ meseros + un bar, aparece un Maître que reporta directo al Director de F&B, paralelo al Chef.

**Decisión sugerida para Bravas:**
- **Boutique chico:** dejar Cocina unificada (como está) + 1 operativo "Salón" dentro del mismo sector.
- **4* mediano:** separar en 2 sectores: **F&B Servicio** (maître + meseros + bartenders + room service) y **F&B Cocina** (chef + cocineros).
- **Eventos/banquetes:** sub-sector de F&B Servicio (toggle on/off según el hotel tenga salón de eventos).

**Roles típicos F&B Servicio:** Director/Jefe F&B, Maître, Sommelier (en 5*), Jefe de sector, Camarero/Mesero, Bartender, Barback, Room service attendant, Banquet Manager, Captain, Steward (plonge).

### 3.2 Pisos vs Lavandería (¿lavandería es sub-HK o aparte?)

**Realidad investigada:** Lavandería es **sub-departamento de Housekeeping** en la gran mayoría de los casos (4-5*), bajo la Gobernanta ("Executive Housekeeper"). Las sub-secciones típicas de HK son:

1. Habitaciones (room cleaning) — camareras de piso
2. Áreas públicas (public area cleaning)
3. Lavandería / lencería (laundry & linen) — propia o tercerizada
4. Floristería / decoración (en 5*)

**Excepción:** en hoteles muy grandes (500+ habs) o cuando el hotel vende lavandería como servicio externo (poco común), lavandería puede ser dept propio.

**Decisión para Bravas:** **mantener dentro de HK como sub-sector** (toggle "lavandería interna / tercerizada" en el onboarding del hotel). No crear sector separado.

### 3.3 Seguridad

**Realidad:** Dept propio en **todo** hotel 4-5*. Funciones:

- Vigilancia perimetral + patrullas
- CCTV (monitoreo 24/7)
- Control de accesos
- Fire Panel (sistema de incendios) 24/7
- PRL / prevención de riesgos laborales (coordinación con RRHH)
- Loss Prevention (prevención de pérdidas, antirrobo)
- Gestión de emergencias / evacuación
- Coordinación con fuerzas públicas

**Jefe:** Chief Security Officer / Director of Loss Prevention / Jefe de Seguridad.
**Reporta a:** GM directo (no a otro jefe).

**En Argentina:** usualmente tercerizado a empresa de seguridad (Prosegur, Securitas, G4S). Aun así hay un "coordinador de seguridad" interno que reporta al director.

**En España:** regulado por Ley de Seguridad Privada — los vigilantes deben tener habilitación oficial. En hoteles 4-5* es obligatorio tener servicio de vigilancia con TIP (Tarjeta de Identificación Profesional).

**Decisión para Bravas:** **crear sector "Seguridad"** (crítico). Permitir modo "tercerizado" (solo 1 coordinador interno + conexión a proveedor externo) o "interno" (plantilla completa).

### 3.4 Reservas / Revenue Management / Yield

**Realidad:** Hay 3 cosas distintas acá, aclarar:

- **Reservas (Reservations):** tomar bookings (teléfono, web, OTAs, grupos). Tarea operativa.
- **Yield Management:** ajustar precios día a día para maximizar ingresos por habitación (RevPAR). Táctico, horizonte semanas.
- **Revenue Management:** estrategia global de ingresos (habitación + F&B + spa + eventos). Estratégico, horizonte meses.

**Dónde viven:**

- **Hotel 3* / boutique chico:** Reservas = sub-sector de Recepción. Revenue = lo hace el director con feel.
- **Hotel 4* mediano:** Reservas = sub-sector de Comercial. Revenue Manager = rol de Comercial o compartido con GM.
- **Hotel 5* / cadena:** Revenue Management = dept propio con Director of Revenue Management + analistas.

**Decisión para Bravas:**
- Sector **"Comercial"** (ver 3.5) con sub-funciones Reservas + Revenue.
- En el PMS futuro: módulo Revenue Management que use channel manager SiteMinder (ya decidido) + motor propio de pricing.

### 3.5 Ventas & Marketing / Comercial

**Realidad:** Dept propio **en todo 4-5*** (no está en la demo, ES CRÍTICO).

**Sub-funciones:**
- Ventas B2B: empresas, agencias de viajes, bodas, grupos corporativos
- Ventas OTA: Booking.com, Expedia, Hotelbeds, HRS
- Marketing digital: web, SEM, SEO, redes sociales
- Reputación online / Guest Experience: TripAdvisor, Google, encuestas
- Revenue Management (ver 3.4)
- Loyalty / fidelización (en cadenas)
- Comunicación / PR

**Roles:** Director Comercial / Sales & Marketing Director, Sales Manager, Revenue Manager, Marketing Manager, Community Manager, PR Manager.

**Nomenclatura ES vs AR:**
- ES: "Director Comercial", "Jefe de Ventas", "Director de Ventas y Marketing".
- AR: "Gerente Comercial", "Jefe de Ventas", "Marketing Manager" (inglesismo frecuente).

**Decisión para Bravas:** **crear sector "Comercial"** (crítico). En hoteles chicos, 1 persona cubre todo. En 4* medianos: 2-3 personas con roles diferenciados.

### 3.6 Spa & Wellness

**Realidad:**

- **Resorts 4-5* (playa, montaña):** 100% tiene spa como dept propio. Spa Manager reporta a GM.
- **Urbanos 5*:** 80% tiene spa dept. En Capital Federal: Alvear Palace, Four Seasons, Palacio Duhau, Park Hyatt tienen spa completo.
- **Urbanos 4*:** mixto — algunos tienen spa básico (sauna + masajes a demanda) gestionado por HK o Fitness. Otros no tienen.
- **Boutique chico:** raramente. Pueden tener "wellness amenity" (sauna, jacuzzi) sin personal propio.

**Roles típicos:** Spa Director/Manager, Spa Therapists (masajistas con título), Salon Receptionist, Wellness Host, Fitness Instructor.

**Decisión para Bravas:** **sector "Spa & Wellness" opcional** (toggle en onboarding del hotel). Si se activa, activa sub-sectores: Spa (tratamientos), Fitness (gimnasio), Pool (piscina + playa si aplica).

### 3.7 Animación / Entretenimiento / Kids Club

**Realidad:** Casi **exclusivo de resort familiar all-inclusive**. En urbanos no existe.

**Estructura (resort):**
- Animation Chief / Jefe de animación (reporta a GM)
- Sports Manager (deportes)
- Mini Club Manager (niños 4-12)
- Teen Club Entertainer (13-18)
- Show Animation (noche, espectáculos)
- Day activities (piscina, playa)

**Ratio staffing:** 1 animador / 100-150 huéspedes.

**En costa argentina:** resorts de Pinamar, Cariló, Villa Gesell, Mar del Plata tienen animación en temporada alta (dic-feb). Fuera de temporada: no.

**Decisión para Bravas:** **sector "Animación & Recreación" opcional, estacional**. Para la primera ola de clientes boutique en Capital no es prioritario. Sí lo es si se abre a resorts costa (F3/F4).

### 3.8 Economato / Compras / Almacén

**Realidad:** Dept crítico y muchas veces invisible. Funciones:

- Realizar pedidos a proveedores según previsión + stock real
- Recepción de mercadería (control de calidad + cantidad)
- Almacenamiento: seco, refrigerado, congelado, bebidas (bodega)
- Distribución interna por departamento (cocina, bar, HK, mantto, oficinas)
- Control de salidas e imputación a centros de coste
- Control de stock permanente + inventarios
- Verificación proveedores (calidad, precios, cumplimiento)
- Integración con Cocina (recetas estándar + escandallo de platos)

**Dónde vive:**
- **Hotel 3* / boutique:** lo hace el chef + admin, sin sector formal.
- **Hotel 4*:** dept propio con Economato Manager / Jefe de Compras.
- **Hotel 5*:** dept propio con Purchase Manager + Store Keeper + Receiving Clerk.

**Nomenclatura ES vs AR:**
- ES: "Economato", "Jefe de Economato", "Bodeguero".
- AR: "Compras", "Almacén", "Pañol" (uso coloquial), "Encargado de depósito".

**Decisión para Bravas:** **crear sector "Economato / Compras"** (crítico para 4*). Flujo propio con proveedores, pedidos, stock. Integra con F&B (recetas) y Admin (facturas).

### 3.9 IT / Sistemas

**Realidad:**

- **Boutique chico / 3*:** 100% externo (proveedor PMS + proveedor red + técnico ad-hoc).
- **4* mediano:** 1 persona IT interna + proveedores.
- **5* / cadena:** dept propio con 2-5 personas (IT Manager, Network Admin, Help Desk).

**Roles:** IT Manager, Systems Administrator, Help Desk, PMS Specialist.

**Decisión para Bravas:** **sector "IT" opcional con modo híbrido**. En onboarding del hotel: "¿Tienes IT interno?" → si sí, crea sector + 1 rol. Si no, oculto.

### 3.10 Guest Experience / Calidad / Customer Relations

**Realidad:** Función crítica moderna. Cubre:

- Encuestas post-estadía
- Reputación online (TripAdvisor, Google, Booking)
- Gestión de quejas
- VIP recognition (reconocer huésped recurrente)
- Loyalty program (si cadena)
- Programas de mejora continua

**Dónde vive:**
- **Hotel chico:** parte de Recepción (el jefe de recepción se hace cargo).
- **Hotel 4*:** puede ser sub-función de Comercial o de Dirección.
- **Hotel 5*:** dept propio con Guest Relations Manager + Loyalty Coordinator.

**Decisión para Bravas:** **función transversal**, no sector. Vive como módulo transversal del PMS (todos los sectores alimentan el guest profile). En la demo visual puede aparecer como KPI en dashboard del director + en Comercial.

### 3.11 Sostenibilidad / RSE

**Realidad:** Tendencia 2026 fuerte. En España empuja por EU Green Deal + exigencias de corporate travel (empresas piden hoteles sostenibles). Certificaciones: ISO 14001, Green Key, Biosphere.

**Dónde vive:** rara vez dept propio. Suele ser:
- Función transversal coordinada por un Sustainability Officer (1 persona).
- Comité interdepartamental (Director + Mantto + HK + F&B).

**Decisión para Bravas:** **función transversal / módulo**, no sector. Puede ser un badge/módulo opcional del PMS que atraviesa consumos (luz, agua, residuos, proveedores locales).

### 3.12 Garaje / Valet parking / Botones

**Realidad:**
- **Botones + telefonía + porteros:** sub-sector de Front Office (conserjería).
- **Valet parking:** sub-sector de Front Office (en 4-5* urbanos con parking propio).
- **Garaje operativo** (como estacionamiento rentable): sub-sector de Admin o Comercial.

**Decisión para Bravas:** **sub-sector de Recepción**. No crear sector aparte. En la UI del hotel, dentro del sector Recepción habilitar sub-rol "Conserjería / Botones".

### 3.13 Jardinería / Áreas verdes

**Realidad:** Sub-sector de Mantenimiento en **hoteles con jardín grande** (resorts, hoteles de campo, palacios urbanos tipo Alvear). En urbano chico: no existe.

**Decisión para Bravas:** **sub-sector de Mantenimiento**, toggle en onboarding.

### 3.14 Piscina / Playa / Deportes acuáticos

**Realidad:** En **resorts**. Suele ser:
- Pool: sub-sector de HK (limpieza) + Mantto (agua/filtros) + Seguridad (socorrista).
- Playa / deportes acuáticos: sub-sector de Animación.

**Decisión para Bravas:** opcional, parte del paquete resort (junto con Animación).

---

## 4. Variantes por tipo de hotel

### 4.1 Boutique urbano chico (20-40 habs)

**Ejemplo real AR:** Mine Hotel Boutique (Palermo), L'Adresse (San Telmo), Vain (Palermo) — 20-40 habs cada uno.
**Ejemplo real ES:** Hotel Único, Hotel Alma Barcelona, Praktik Rambla.

**Estructura real:**
- Director/Propietario
- Jefe de Recepción (+ reservas + check-in + concierge informal + night audit)
- Gobernanta (+ 2-4 camareras + lavandería tercerizada)
- Chef + 1 cocinero (desayuno + eventualmente cena)
- Mantenimiento: 1 persona interna + proveedores externos
- Admin: tercerizado a gestoría + 1 recepcionista hace caja
- Marketing/ventas: el dueño + agencia externa OTAs
- Seguridad: cámaras monitoreadas por recepción + alarma

**Total staff:** 10-25 personas.
**Niveles jerárquicos:** 2.

### 4.2 Hotel urbano 4* mediano (80-150 habs) — TARGET PRIMARIO BRAVAS

**Ejemplo real AR:** 725 Continental, Esplendor Buenos Aires, Dazzler Recoleta, Loi Suites.
**Ejemplo real ES:** NH Collection, Catalonia Plaza, Vincci Soho.

**Estructura real:**
- Director General
- Subdirector de Operaciones (en hoteles grandes)
- Jefes de departamento:
  - Jefe de Recepción (+ equipo 5-8 recepcionistas + 2-3 botones)
  - Gobernanta (+ 10-20 camareras)
  - Chef Ejecutivo (+ brigada 5-10)
  - Maître / F&B Service Manager (+ 5-15 meseros/bartenders)
  - Jefe de Mantenimiento (+ 2-3 técnicos)
  - Director Comercial (+ 1-3 personas ventas + 1 revenue)
  - Jefe de Economato (+ 1-2 almaceneros)
  - CFO (+ 1-2 contables)
  - HR Manager (+ 1 nóminas)
  - Jefe de Seguridad (+ vigilantes propios o tercerizados)
  - IT (1 persona o externa)

**Total staff:** 60-120 personas.
**Niveles jerárquicos:** 3-4.

### 4.3 Resort playa 4-5* grande (200+ habs)

**Ejemplo real AR:** Costa Galana (MDQ), Casa Hotel (Pinamar), Sheraton MDQ.
**Ejemplo real ES:** Meliá Alicante, Iberostar resorts, RIU.

**Estructura real = todo lo anterior MÁS:**
- Director de Alimentos & Bebidas (coordina 3-5 outlets F&B)
- Chef por outlet (restaurante principal + buffet + a la carta + pool bar)
- Director de Catering / Eventos (bodas, convenciones)
- Spa Manager + Spa Director (en 5*) + 5-10 terapeutas
- Director de Animación + Mini Club + Teen Club + Sports
- Pool Manager + socorristas
- Jefe de Jardinería (+ 3-5 jardineros)
- Guest Relations Manager (en 5*)
- Revenue Manager dedicado
- IT dept con 2-3 personas

**Total staff:** 150-400 personas.
**Niveles jerárquicos:** 4-5.

### 4.4 Hotel de negocios / convenciones

Similar a 4* urbano **pero** con énfasis en:
- Banquetes & Eventos como sub-dept pesado de F&B (salas de reuniones, ferias, bodas, convenciones)
- Director of Catering & Conferences
- Business Center / sala de reuniones (sub-sector de Front Office)
- Ventas corporativas (empresas) = foco #1 de Comercial
- MICE specialist (Meetings, Incentives, Conferences, Exhibitions)

---

## 5. Matriz final: departamentos × tipo de hotel

Leyenda: ● = dept propio · ◐ = sub-sector de otro · ○ = no aplica normalmente · ⚠ = opcional según hotel

| Departamento | Boutique urbano chico (20-40) | Urbano 4* mediano (80-150) | Resort 4-5* grande (200+) | Hotel negocios/convenciones |
|---|---|---|---|---|
| **Dirección General** | ● | ● | ● | ● |
| **Front Office / Recepción** | ● | ● | ● | ● |
| → Reservas | ◐ FO | ◐ Comercial | ● | ● |
| → Conserjería / Bell Desk | ◐ FO | ◐ FO | ● | ◐ FO |
| → Valet / Parking | ○ | ◐ FO ⚠ | ◐ FO | ◐ FO |
| → Night Audit | ◐ FO | ◐ FO | ◐ FO | ◐ FO |
| **Guest Relations** | ○ (lo hace FO) | ⚠ transversal | ● | ◐ FO/Comercial |
| **Housekeeping / Pisos** | ● | ● | ● | ● |
| → Lavandería | ◐ HK (tercer.) | ◐ HK | ◐ HK o ● | ◐ HK |
| → Áreas públicas | ◐ HK | ◐ HK | ◐ HK | ◐ HK |
| → Floristería | ○ | ○ | ⚠ en 5* | ⚠ |
| **F&B Cocina** | ● (básico) | ● | ● (múltiples) | ● |
| **F&B Servicio (salón/bar/RS)** | ◐ Cocina | ● | ● | ● |
| → Banquetes / Eventos | ○ | ⚠ sub F&B | ● | ● (clave) |
| → Room Service | ◐ F&B Serv | ◐ F&B Serv | ◐ F&B Serv | ◐ F&B Serv |
| → Pool Bar / Lobby Bar | ○ | ⚠ | ● | ⚠ |
| **Mantenimiento / Engineering** | ● | ● | ● | ● |
| → Jardinería | ○ | ⚠ | ● | ⚠ |
| → Piscina | ○ | ⚠ | ● | ⚠ |
| **Ventas & Marketing / Comercial** | ⚠ (dueño) | ● | ● | ● (clave) |
| → Revenue Management | ○ | ◐ Comercial | ● | ● |
| **Economato / Compras** | ◐ Admin | ● | ● | ● |
| **Admin / Finanzas / CFO** | ⚠ (gestoría ext) | ● | ● | ● |
| **RRHH** | ⚠ (gestoría ext) | ● | ● | ● |
| **Seguridad** | ⚠ (cámaras) | ● (tercer.) | ● | ● |
| **IT / Sistemas** | ○ (externo) | ⚠ (1 pers o ext) | ● | ● |
| **Spa & Wellness** | ○ | ⚠ (10-20% lo tiene) | ● | ⚠ |
| **Animación / Kids Club** | ○ | ○ | ● (familiar) | ○ |
| **Sostenibilidad / RSE** | ○ | ⚠ transversal | ⚠ transversal | ⚠ transversal |

---

## 6. Lista concreta de faltantes en la demo con priorización

### 6.1 CRÍTICOS (todo hotel 4* los tiene — sí o sí los necesita Bravas)

#### A. Comercial / Ventas & Marketing / Revenue
- **Por qué crítico:** sin esto el PMS no se conecta a OTAs, no hace yield, no genera negocio. Un hotel 4* lo tiene siempre.
- **Qué hace:** ventas B2B, OTAs, revenue management, marketing digital, reputación online.
- **Roles clave:** Director Comercial, Revenue Manager, Marketing Manager, Sales Rep.
- **Integración N2:** canal manager SiteMinder (ya decidido), motor propio de revenue, Google Business API, TripAdvisor API.

#### B. F&B Servicio (separado de Cocina)
- **Por qué crítico:** Cocina y Salón son dos mundos. Hoy la demo los junta. Un 4* los tiene separados con jefes distintos.
- **Qué hace:** servicio en restaurante, bar, room service, banquetes.
- **Roles clave:** Maître / F&B Manager, Capitán, Mesero, Bartender, Sommelier (5*).
- **Integración N2:** POS (iCG, Lightspeed, Toast), KDS (kitchen display system), integración con PMS (cargar consumos a habitación).

#### C. Economato / Compras / Almacén
- **Por qué crítico:** sin control de stock no hay control de costo F&B. Es el lugar donde se juega la rentabilidad.
- **Qué hace:** proveedores, pedidos, recepción, stock, inventarios, imputación a centros de coste.
- **Roles clave:** Jefe de Economato / Compras, Almacenero, Bodeguero.
- **Integración N2:** integración con Holded/A3 (ya decidido Opción A), integración con proveedores B2B (hostelería), escandallo de platos.

#### D. Seguridad
- **Por qué crítico:** 4-5* lo tiene siempre. Compliance obligatorio ES (Ley Seguridad Privada) y norma HACCP + PRL.
- **Qué hace:** vigilancia, CCTV, control accesos, fire panel, PRL, loss prevention.
- **Roles clave:** Jefe de Seguridad, Vigilante, CCTV Operator.
- **Integración N2:** API cámaras IP (Hikvision, Milestone), fire panel, control de accesos (llaves electrónicas Assa Abloy/Salto).

### 6.2 IMPORTANTES (mayoría de 4* los tiene, en algunos como sub-función)

#### E. Reservas (si no se crea como dept propio)
- **Dónde vive:** sub-sector de Comercial (en 4*) o de Front Office (en boutique).
- **Qué hace:** recibir reservas, confirmar, modificar, cancelar, overbooking.
- **Roles:** Reservations Agent, Jefe de Reservas.

#### F. Conserjería / Bell Desk
- **Dónde vive:** sub-sector de Front Office.
- **Qué hace:** botones, porteros, telefonía, valet, equipaje, información turística.
- **Roles:** Concierge, Botones, Portero.
- **En 5*:** puede ser dept propio con Chief Concierge Les Clefs d'Or.

#### G. IT / Sistemas
- **Dónde vive:** sector propio chico (1 persona) o tercerizado.
- **Qué hace:** PMS, red, telefonía, Wi-Fi, soporte, integraciones.
- **Roles:** IT Manager, Help Desk.
- **Modo:** toggle "interno/externo" en onboarding.

### 6.3 OPCIONALES (según tipo de hotel)

#### H. Spa & Wellness
- **Cuándo:** resorts 4-5* siempre, urbanos 5* 80%, urbanos 4* 10-20%.
- **Qué hace:** masajes, tratamientos, fitness, piscina spa.
- **Roles:** Spa Manager, Spa Therapist, Wellness Host, Fitness Instructor.

#### I. Animación / Kids Club
- **Cuándo:** resorts familiares con all-inclusive.
- **Qué hace:** shows, deportes, mini club, teen club.
- **Roles:** Animation Chief, Sports Manager, Mini Club Leader.

#### J. Eventos & Banquetes
- **Cuándo:** hoteles con salón de eventos (negocios o resort).
- **Dónde vive:** sub-sector de F&B.
- **Roles:** Director of Catering, Banquet Manager, Event Planner.

#### K. Guest Experience / Calidad (transversal)
- **Modo:** módulo transversal del PMS (no sector).
- **Qué hace:** encuestas, reputación online, loyalty, VIP.

#### L. Sostenibilidad / RSE (transversal)
- **Modo:** módulo transversal + badge de certificación.

---

## 7. Nomenclatura: ES (España) vs AR (Argentina/LATAM)

| Rol / Concepto | ES | AR / LATAM | Notas |
|---|---|---|---|
| Executive Housekeeper | **Gobernanta** (femenino tradicional) | **Ama de llaves** / Gobernanta / Jefe de Pisos | Ambos se entienden; "gobernanta" tiene más peso en ES |
| Front Office Manager | **Jefe de Recepción** | Jefe/Gerente de Recepción | Idem |
| F&B Director | **Director de A&B** / Jefe de Restauración | Gerente de A&B / Jefe de Comedor | "A&B" se usa ambos; en ES más "restauración" |
| Maître | **Jefe de Sala** / Maître | Maître / Jefe de Salón | "Maître" (francés) se usa en ambos |
| Camarera de piso | **Camarera de pisos** | **Mucama** (más usado en AR) | Diferencia marcada |
| Camarero de salón | **Camarero** | **Mozo** / Camarero / Mesero | Diferencia marcada |
| Economato | **Economato** (término estándar ES) | **Almacén** / **Depósito** / **Pañol** (coloquial) | AR usa poco "economato" |
| Steward | Steward / Marmitón | Bachero (coloquial) / Steward | Idem |
| Botones | **Botones** / **Mozo de equipajes** | Botones / Valet / Bellboy | Idem |
| Concierge | **Conserje** / Concierge | Concierge (anglicismo) | 5* usa "concierge" en ambos |
| CFO | Director Financiero | Gerente Administrativo-Financiero / CFO | CFO se entiende en ambos |
| HR Manager | **Director de RRHH** | Gerente de RRHH / HR Manager | Idem |
| Revenue Manager | Revenue Manager | Revenue Manager | Inglesismo en ambos |
| Night audit | Auditor nocturno / Turno noche | Auditor nocturno | Idem |
| PRL (prevención riesgos laborales) | PRL (término legal ES) | Seguridad e Higiene / SyH | **Importante:** PRL es terminología legal ES (Ley 31/1995). En AR se llama Seguridad e Higiene (Ley 19.587) |

**Implicación para Bravas multi-tenant ES/AR:** en el onboarding del hotel, flaggear país. Las etiquetas de rol y las plantillas legales (PRL vs SyH, Convenio de Hostelería ES vs CCT Gastronómicos AR) se sirven según el tenant.

---

## 8. Recomendación final para el catálogo maestro Bravas N2

### Catálogo propuesto (expandir de 6 a 11 sectores base + 5 opcionales)

**Base obligatoria (11):**
1. Dirección General
2. Front Office / Recepción (sub: Reservas, Conserjería/Botones, Night Audit)
3. Housekeeping / Pisos (sub: Lavandería, Áreas Públicas)
4. F&B Servicio (sub: Restaurante, Bar, Room Service, Eventos/Banquetes⚠)
5. F&B Cocina (sub: brigada por partidas)
6. Mantenimiento / Engineering (sub: Jardinería⚠, Piscina⚠)
7. **Comercial / Ventas & Marketing** ← NUEVO
8. **Economato / Compras** ← NUEVO
9. Administración / CFO
10. RRHH
11. **Seguridad** ← NUEVO

**Opcionales (toggle en onboarding, 5):**
12. **IT / Sistemas** ← NUEVO (modo interno/externo)
13. **Spa & Wellness** ← NUEVO
14. **Animación / Recreación** ← NUEVO (resort)
15. **Eventos / MICE** (si no se modela como sub de F&B)

**Módulos transversales (no sectores, 2):**
- **Guest Experience / Calidad** ← atraviesa todos los sectores
- **Sostenibilidad / RSE** ← atraviesa todos los sectores

### Patrón técnico sugerido

Cada tenant (hotel) en el onboarding completa:
- Tipo (boutique urbano / urbano 4* / resort / negocios)
- País (ES / AR → trigger de nomenclatura + plantillas legales)
- Toggles opcionales: ¿tiene spa? ¿tiene eventos? ¿tiene animación? ¿tiene IT interno?
- Modo por sector: tercerizado / interno (relevante para Seguridad, Lavandería, IT)

El sistema genera entonces el organigrama visible + los módulos activos para ese tenant.

---

## 9. Fuentes consultadas

- Noray — Organigrama de un hotel: https://www.noray.com/organigrama-de-un-hotel-estructura-y-que-es/
- CESAE — Blog organigrama hotelero: https://www.cesae.es/blog/organigrama-hotelero-como-se-organiza-un-hotel
- Hotelier Lifestyle — Hotel departments & sub-departments: https://www.hotelierlifestyle.com/what-are-the-hotel-departments-and-sub-departments-structure-functions-explained
- SetupMyHotel — Departments that make a hotel: https://setupmyhotel.com/train-my-hotel-staff/securityandloss/765-departments-that-make-a-hotel.html
- The Org Chart — Hotel organizational chart (Rooms/F&B/Sales/Engineering/Admin): https://theorgchart.com/resources/hotel-organizational-chart/
- Zahid Aziz Khan (LinkedIn) — Departmental structure of 5-star luxury hotel: https://www.linkedin.com/pulse/departmental-structure-five-star-luxury-hotel-zahid-aziz-khan
- Prostay — Hotel organizational structure: https://www.prostay.com/blog/hotel-organizational-structure/
- Roommaster — Hotel F&B guide: https://www.roommaster.com/blog/hotel-food-beverage-guide
- Mews — Revenue vs Yield management: https://www.mews.com/en/blog/revenue-management-vs-yield-management
- Hosteltur — Depto. de compras y economato: https://www.hosteltur.com/hosteltur-responde/departamento-compras-economato
- Serinf — Economato del hotel: https://www.serinf.it/es/blog/hospitality-novedades/como-gestionar-el-economato-en-un-hotel/
- Hijiffy — Hotel star ranking: https://www.hijiffy.com/resources/articles/hotel-star-ranking-system
- Yves Preissler (Substack) — Who should operate the wellness club: https://yvespreissler.substack.com/p/who-should-really-operate-the-wellness
- My Heart in Hospitality — Spa & Wellness partnership with hotel: https://www.myheartinhospitality.com/post/spa-wellness-part-1-the-partnership-with-the-hotel-side
- Viva Team Animation — Roles del staff de animación: https://vivateamanimation.com/2021/02/19/what-are-the-roles-that-make-up-an-animation-staff/?lang=en
- Confort Capital (AR) — Organigrama hotel boutique Capital Federal: https://confortcapital.blogspot.com/2012/09/organigrama-y-funciones-de-cada-area.html
- Studocu — Práctica Meliá Hotels International: https://www.studocu.com/es/document/universidad-de-jaen/diseno-y-funcionamiento-de-la-organizacion/practica-5-tema-3-melia-hotels-international/109189988
- Glion Institute — Guest Experience Manager: https://www.glion.edu/magazine/guest-experience-manager/
- The Tourism Institute — Modern hotel structure: https://thetourism.institute/tourism-operations/modern-hotel-structure-organisation-success/
- AHLA + OSAC — Hotel security & safety assessment form: https://gisf.ngo/wp-content/uploads/2020/02/2085-AHLA-and-OSAC-2014-Hotel-Security-and-Safety-Assessment-Form.pdf

---

**Fin del documento.**
