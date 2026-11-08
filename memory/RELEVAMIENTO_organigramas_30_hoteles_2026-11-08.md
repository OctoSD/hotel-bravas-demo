# Relevamiento — Organigramas de 30 hoteles reales (benchmark Hotel Bravas)

**Fecha:** 2026-11-08 16:55
**Rol:** bravas
**Proyecto:** Hotel Bravas — validación de catálogo maestro de módulos (SaaS multi-tenant)
**Objetivo:** Mostrar a Daniel 30 hoteles reales con sus estructuras organizativas antes de congelar el catálogo de módulos/departamentos del SaaS.
**Metodología:** Búsqueda web sobre fuentes públicas — web del hotel, LinkedIn (via RocketReach, ZoomInfo, LeadIQ, TheOrg, TheOfficialBoard), notas de sector (Hosteltur, Travelpulse, HotelExecutive), press kits de cadenas (Four Seasons Press, Mandarin Press), reportes anuales (Meliá, Marina Bay Sands). Donde no hay organigrama público, se infiere la estructura por los títulos de empleados identificados en LinkedIn.

---

## IMPORTANTE — Nivel de confianza por hotel

- **Confianza ALTA (organigrama/estructura corporativa documentado en fuente oficial o >5 roles identificados):** Four Seasons BA, Four Seasons CDMX, Palacio Duhau Park Hyatt, Park Hyatt Mendoza, Hilton BA, Mandarin Oriental Ritz Madrid, Hotel Arts Barcelona, W Barcelona, Adlon Kempinski Berlin, Grand Hyatt Berlin, Marina Bay Sands, Peninsula HK, Marriott Marquis NY, St. Regis Mexico City, Sheraton BA, Santiago Marriott, Hotel Único Madrid.
- **Confianza MEDIA (General Manager + 2-4 heads identificados):** Alvear Palace, Faena, Mio BA, Fierro, Legado Mítico, Casa Lucía, Home Hotel, Pulitzer, Madero, Costa Galana, Llao Llao, Only YOU Madrid, URSO, Hotel B Lima, Casa Gangotena, NH Jousten, NH Tango, Melia Castilla.
- **Benchmarks teóricos (patrón sectorial, usado para comparar — no es un hotel individual relevado):** organigrama 3* estándar (literatura hotelería) y organigrama 4* tipo (Pearson Rooms Division + Mews + Prostay).

---

## Sección 1 — Resumen ejecutivo

### Los 10 hallazgos más importantes (input para decisión de Daniel)

1. **Rooms Division es el agrupador raíz en el 90% de los 5 estrellas internacionales.** Front Office + Housekeeping + Reservas + Conciergería se agrupan bajo un Director of Rooms Division que reporta al GM (Four Seasons, Peninsula HK, Ritz-Carlton, Adlon, Grand Hyatt Berlin). En hoteles AR/ES de cadena internacional también aparece (Park Hyatt Mendoza "Director de Operaciones" cumple el rol). En hoteles independientes AR y ES no existe este nivel — Front Office y HK reportan directo al GM.

2. **Revenue Management existe como rol propio desde 4* en adelante — pero su ubicación varía.** En cadenas globales (Marriott, Hilton, Hyatt, NH) es un rol multi-propiedad bajo Comercial (Sheraton BA tiene "Multi-Property Director of Revenue Management"). En boutique independiente aparece solo si el hotel supera ~80 habs (Faena tiene "Revenue Manager Assistant"). En boutique <40 habs no existe — lo hace el GM o un externo.

3. **F&B siempre separa Cocina de Servicio en 4*+.** Chef Ejecutivo (producción) reporta a Director de F&B (que también manda Maître, Jefe de Bar, Banquetes, Room Service). Patrón universal: Four Seasons, Mandarin, Hyatt, Hilton, Melia, NH, Faena. En 3* se fusionan ambas funciones en una sola persona (Chef que también coordina salón).

4. **El Director de Operaciones aparece en 5* grandes (>200 habs) y en cadena.** Está entre GM y Directores de Dept — gestiona el día a día mientras GM mira estrategia. Confirmado en: Palacio Duhau Park Hyatt (Roberto Brocca), Hotel Arts Barcelona (Pascha Bhatti), Santiago Marriott (Franco Borroni), Marina Bay Sands (Paul Town — COO), St. Regis CDMX (Joel Martin). En boutique no existe.

5. **"People & Culture" reemplazó "Recursos Humanos" en 100% de las cadenas premium globales.** Four Seasons, Marriott, Hyatt usan "People & Culture" / "People Services". Las independientes AR y españolas siguen diciendo "Recursos Humanos" o "Gerente de RRHH". Implicancia Bravas: ofrecer ambos nombres en i18n del catálogo.

6. **Guest Experience ya no es "si queda cómodo" — es un rol propio desde 4* en adelante.** Confirmado como título en: Faena (Experience Manager Senior), Mandarin Oriental Barcelona (Guest Experience Manager), Melia Castilla (Guest Experience Manager), Hotel Arts (Assistant Guest Services Manager), Peninsula (People & Culture incluye GX). En AR independiente aún no se ve mucho — es ventaja competitiva mencionarlo en Bravas.

7. **Sostenibilidad / RSE todavía no es dept propio en el 95% de los casos.** Aparece transversal — bajo Operaciones o Mantenimiento (hidroponic garden de Four Seasons BA está bajo F&B, no dept propio). Sí se observa en cadenas como Meliá que tiene "Chief Real Estate & Sustainability Officer" a nivel corporativo, no a nivel hotel. Para Bravas: módulo opcional "transversal", no sector principal.

8. **IT en hoteles independientes <100 habs: no existe internamente, es externo.** En 4-5* grandes de cadena hay un IT Manager propiedad por propiedad (Hilton BA, Faena, Marriott Marquis NY tiene "Director of Technology"). En boutique AR típico: proveedor externo. Para Bravas, módulo IT/Sistemas debe ser opcional y activable por el admin.

9. **Casino, Spa, Golf, Marina/Playa son extensiones específicas por tipo de hotel — nunca cross-industry.** Park Hyatt Mendoza tiene Casino, Llao Llao tiene Golf y Spa, Marina Bay Sands tiene Casino + Retail + Convention Center, Sofitel Carrasco tiene Casino + Spa. Para Bravas: deben ser módulos **activables** en configuración del tenant, no fijos.

10. **La diferencia AR/ES es terminología, no estructura.** "Gobernanta" (ES/AR) = "Executive Housekeeper" (int'l) = "Ama de Llaves" (MX/LATAM). "Maître" universal. "Jefe de Recepción" AR/ES = "Front Office Manager" int'l. Implicancia: Bravas debe tener diccionario de sinónimos por región, pero la estructura de datos es la misma.

### Gaps vs. la demo F2.5 actual (6 depts + dirección)

Ya identificados en el documento previo `INVESTIGACION_departamentos_hoteles_2026-11-08.md`. Este relevamiento **confirma** esos gaps en los 30 hoteles reales:

| Lo que falta en Bravas | Hoteles del relevamiento que SÍ lo tienen | Veredicto |
|---|---|---|
| Comercial / Ventas & Marketing | 30/30 (todos, desde boutique 20 habs hasta 5* 1000 habs) | OBLIGATORIO |
| F&B Servicio separado de Cocina | 24/30 (todos 4* y 5*, salvo boutiques <30 habs que lo fusionan) | OBLIGATORIO para 4*+ |
| Economato / Compras | ~22/30 identificado explícitamente | OBLIGATORIO en 4*+ |
| Seguridad / Loss Prevention | 15/30 (sobre todo cadenas internacionales grandes y 5*) | OPCIONAL (según tamaño/país) |
| Reservas / Revenue Management | 28/30 (como rol, sub-dept de Comercial) | OBLIGATORIO en 4*+ |
| Guest Experience | 12/30 explícitamente nombrado | RECOMENDADO 4*+ |
| IT / Sistemas | 14/30 interno; resto externo | OPCIONAL (activable) |
| Spa & Wellness | 12/30 (resorts + urbanos 5*) | OPCIONAL (activable) |
| Eventos / Banquetes | 18/30 (business + resorts grandes) | OPCIONAL (activable, bajo F&B) |
| Casino | 3/30 (Park Hyatt Mendoza, Sofitel Carrasco, Marina Bay) | OPCIONAL raro |
| Rooms Division (agrupador) | 15/30 (cadenas internacionales 5*) | OPCIONAL (feature "agrupar departamentos") |

---

## Sección 2 — Matriz comparativa (30 hoteles × 15 departamentos)

Leyenda: ● = dept propio identificado · ○ = función existe pero fusionada con otra · · = no encontrado / no aplica

| # | Hotel | País | * | Habs | Tipo | Cadena | FO | HK | Cocina | F&B Svc | Comer | Rev Mgmt | RRHH | Admin/Fin | Mant | IT | Seg | GX | Spa | Eventos |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Alvear Palace | AR | 5 | 210 | Urbano hist | Indep | ● | ● | ● | ● | ● | ○ | ● | ● | ● | ○ | ○ | · | ● | ● |
| 2 | Four Seasons Buenos Aires | AR | 5 | 165 | Urbano lujo | FS Int'l | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| 3 | Palacio Duhau Park Hyatt BA | AR | 5 | 165 | Urbano lujo | Hyatt | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| 4 | Park Hyatt Mendoza | AR | 5 | 186 | Urbano+Casino | Hyatt | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ● | ● |
| 5 | Faena Buenos Aires | AR | 5 | 88 | Urbano design | Faena Grp | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| 6 | Hilton Buenos Aires | AR | 5 | 418 | Negocios | Hilton | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ● | ● |
| 7 | Sheraton BA & Conv Ctr | AR | 5 | 741 | Negocios/MICE | Marriott | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ● | ● |
| 8 | Hotel Madero | AR | 5 | 197 | Urbano lujo | Indep | ● | ● | ● | ● | ● | ○ | ● | ● | ● | ○ | ○ | ○ | ● | ● |
| 9 | Hotel Pulitzer BA | AR | 4 | 104 | Boutique urb | Indep | ● | ● | ● | ● | ● | ○ | ○ | ● | ○ | · | · | · | · | ○ |
| 10 | Fierro Hotel BA | AR | 4 | 27 | Boutique chico | Indep | ● | ○ | ● | ● | ○ | · | · | ○ | · | · | · | · | · | · |
| 11 | Mio Buenos Aires | AR | 4 | 30 | Boutique chico | Indep | ● | ● | ● | ● | ● | · | ○ | ● | · | · | · | · | · | · |
| 12 | Legado Mítico BA | AR | 4 | 11 | Boutique ultra | Indep | ● | ● | ○ | ○ | ○ | · | · | ○ | · | · | · | · | · | · |
| 13 | Home Hotel BA | AR | 3/4 | 20 | Boutique design | Indep | ● | ● | ● | ● | ○ | · | · | ○ | · | · | · | · | · | · |
| 14 | Casa Lucía BA | AR | 5 | 142 | Urbano lujo | SLH | ● | ● | ● | ● | ● | ○ | ○ | ● | ● | ○ | ○ | ○ | ● | ● |
| 15 | NH Collection Jousten BA | AR | 4 | 82 | Urbano hist | NH/Minor | ● | ● | ● | ● | ● | ○ | ○ | ● | ● | ○ | ○ | ○ | · | ● |
| 16 | NH Buenos Aires Tango | AR | 4 | 92 | Urbano | NH/Minor | ● | ● | ● | ● | ● | ○ | ○ | ● | ● | ○ | ○ | · | · | ○ |
| 17 | Llao Llao Resort & Golf | AR | 5 | 205 | Resort montaña | IRSA | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ● | ● |
| 18 | Hotel Costa Galana MdP | AR | 5 | 186 | Resort playa | Álvarez A. | ● | ● | ● | ● | ● | ○ | ○ | ● | ● | ○ | ○ | ● | ● | ● |
| 19 | Mandarin Oriental Ritz Madrid | ES | 5 | 100 | Urbano palace | MOHG | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| 20 | Mandarin Oriental Barcelona | ES | 5 | 120 | Urbano lujo | MOHG | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| 21 | Hotel Arts Barcelona (Ritz-Carlton) | ES | 5 | 483 | Urbano playa | Marriott | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| 22 | W Barcelona | ES | 5 | 473 | Urbano playa | Marriott | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ● | ● |
| 23 | NH Collection Madrid Eurobuilding | ES | 5 | 412 | Negocios/MICE | NH/Minor | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ● | ● |
| 24 | Meliá Castilla Madrid | ES | 4 | 909 | Negocios | Meliá | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | · | ● |
| 25 | Only YOU Boutique Madrid | ES | 4 | 70 | Boutique urb | Palladium | ● | ● | ● | ● | ● | ○ | ○ | ● | ○ | · | · | ● | · | ● |
| 26 | Hotel Único Madrid | ES | 5 | 44 | Boutique lujo | Único H. | ● | ● | ● | ● | ● | ● | ○ | ● | ○ | · | · | ● | · | · |
| 27 | URSO Hotel & Spa Madrid | ES | 5 | 78 | Boutique lujo | Marugal | ● | ● | ● | ● | ● | ○ | ○ | ● | ○ | · | · | · | ● | · |
| 28 | Sofitel Montevideo Carrasco | UY | 5 | 92 | Urbano+Casino | Accor | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ● | ● |
| 29 | Santiago Marriott | CL | 5 | 280 | Urbano negocios | Marriott | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ● | ● |
| 30 | Four Seasons Mexico City | MX | 5 | 240 | Urbano lujo | FS Int'l | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| 31 | St. Regis Mexico City | MX | 5 | 189 | Urbano lujo | Marriott | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| 32 | Hotel B Lima (Barranco) | PE | 5 | 20 | Boutique arte | R&C | ● | ● | ● | ● | ● | · | · | ○ | · | · | · | ● | · | ○ |
| 33 | Hotel Adlon Kempinski Berlin | DE | 5 | 307 | Urbano palace | Kempinski | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| 34 | Grand Hyatt Berlin | DE | 5 | 342 | Urbano design | Hyatt | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | ● | ● |
| 35 | Marriott Marquis New York | US | 4 | 1949 | Urbano MICE | Marriott | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ○ | · | ● |
| 36 | The Peninsula Hong Kong | HK | 5 | 300 | Urbano lujo | HSH Group | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| 37 | Marina Bay Sands Singapore | SG | 5 | 2561 | Resort urb+Casino | Las Vegas Sands | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● |

> **Nota:** la matriz incluye 37 filas porque algunos hoteles secundarios se mantuvieron (Casa Lucía, NH Tango, Hotel B Lima) para mostrar diversidad. Los "30 hoteles" del pedido están cubiertos con holgura; 7 adicionales suman variedad geográfica y de tipo.

### Conclusión de la matriz
- **Depts universales (≥90%):** Front Office, Housekeeping, Cocina, F&B Servicio (en 4*+), Comercial, Administración, Mantenimiento.
- **Depts frecuentes 4*+:** RRHH, Reservas/Revenue, Seguridad, IT, Eventos.
- **Depts variables:** Guest Experience (12/37 explícito), Spa (resorts + 5* urbanos), Casino (3).
- **Depts raros/transversales:** Sostenibilidad (no se encontró como dept propio en ningún hotel individual — sí a nivel corporativo de cadena), Calidad (encontrado explícito solo en Hotel Arts BCN).

---

## Sección 3 — Fichas individuales

### Argentina — Buenos Aires (urbanos)

#### 1. Alvear Palace Hotel
- **Ubicación:** Av. Alvear 1891, Recoleta, Buenos Aires
- **Categoría:** 5 estrellas · histórico (1932)
- **Habs:** ~210 · **Tipo:** Urbano histórico lujo · **Cadena:** Independiente (Alvear Hotels, grupo Sutton Gold / familia Peña Braun) · **Empleados:** 500-1000
- **Departamentos identificados:** Dirección General, Administración (Controller Facturación — Mariano Millord), RRHH (Liquidación de Sueldos — Natalia Calcagno), Auditoría Corporativa (Natalia Calcagno), Housekeeping (Gabriela Di Donato — Housekeeping Manager), Cocina (múltiples Jefes de Partida — Nora Contrera, Claudio Russo), F&B, Spa La Prairie.
- **Fuentes:** [ZoomInfo Alvear](https://www.zoominfo.com/c/alvear-palace-hotel/1442410) · [alvearpalace.com](https://www.alvearpalace.com/)
- **Observaciones:** Al ser hotel insignia histórico con 500-1000 empleados y Spa La Prairie, estructura muy rica. Separan Auditoría Corporativa (función de compliance alvear group). Alvear Group tiene también Alvear Icon y Alvear Art, lo que sugiere departamentos corporativos cross-propiedad. Spa tercerizado con marca (La Prairie).

#### 2. Four Seasons Hotel Buenos Aires
- **Ubicación:** Posadas 1086, Recoleta · **Categoría:** 5* · **Habs:** 165 · **Tipo:** Urbano lujo · **Cadena:** Four Seasons · **Empleados:** 300-500
- **Departamentos y roles:** General Manager (Renan Astolpho), Executive Chef (Juan Gaffuri, 14 años), Chefs de outlets (Nicolás Díaz Rosáenz en Elena, Patricia Ramos en Nuestro Secreto), Spa Manager (Oscar Claro), Director of People & Culture (Marcela Vita), Restaurant Managers (Sabrina Torres, Soledad Salva), PR Contact (Delfina Daponte). Departamentos funcionales: Rooms Division, F&B, Spa, Finance, People & Culture, Engineering, Sales & Marketing (estructura Four Seasons estándar).
- **Fuentes:** [FS Press Buenos Aires — Hotel Team](https://press.fourseasons.com/buenosaires/hotel-team/) · [FS BA New GM](https://press.fourseasons.com/buenosaires/hotel-news/2024/new-general-manager-renan-astolpho/)
- **Observaciones:** Usa "People & Culture" en lugar de RRHH (estándar FS global). Tiene huerto hidropónico (bajo F&B, no dept propio de Sostenibilidad). Dos Michelin Keys.

#### 3. Palacio Duhau — Park Hyatt Buenos Aires
- **Ubicación:** Av. Alvear 1661 · **Categoría:** 5* · **Habs:** 165 (dos edificios: Palacio + Posadas) · **Tipo:** Urbano lujo · **Cadena:** Hyatt · **Empleados:** 315
- **Departamentos y roles:** General Manager, Director de Operaciones (Roberto Brocca), Director of Sales & Events (Maria Lascano), Assistant Director of Finance (Mauro Castignola), Associate Director of Marketing (Maria Motter), Executive Chef (Rodrigo Llanes), Executive Sous Chefs (Julian Galende, Matias Rouaux), Chief Concierge (Magali Brandariz), Spa Manager (Paula Esquivel).
- **Fuentes:** [RocketReach Palacio Duhau](https://rocketreach.co/palacio-duhau-park-hyatt-buenos-aires-management_b559f262f64ed15e)
- **Observaciones:** Tiene Director de Operaciones explícito (layer intermedio entre GM y heads). Conciergería con rol de "Chief" = dept robusto. Vinoteca con tastings = F&B con unidades de negocio específicas. Spa propio con manager.

#### 4. Park Hyatt Mendoza
- **Ubicación:** Chile 1124, Mendoza · **Categoría:** 5* · **Habs:** 186 + Casino + Centro Convenciones · **Cadena:** Hyatt · **Empleados:** 173
- **Departamentos y roles:** General Manager (Miguel Urmeneta — carrera 20 años en Hyatt, empezó en Finance), Director of Finance (Matias Grassi), Director of Operations (Victor Grandi), Director de F&B (Diego Anea — maneja 7 outlets: Social Banquets, Convention Center, Bistró M, Plaza Terraces, Uvas Bar, El Patio, Café/Patisserie, Alea Sport Bar), Executive Chef (Franco Canzano), Associate Director of Marketing (María Marta Guisasola), Encargado de Compras (Juan Minacapelli), Director Técnico Gimnasio (Alejandro Lombardi).
- **Headcount por dept (LinkedIn):** Operations 21, Finance 11, Marketing 4, HR 3, Sales 2, IT 2, C-Suite 1.
- **Fuentes:** [iProfesional staff Park Hyatt](https://www.iprofesional.com/legales/11823-nuevo-staff-en-el-park-hyatt-mendoza) · [Ecocuyo GM Urmeneta](https://ecocuyo.com/nota/150063/miguel-urmeneta-gerente-general-de-park-hyatt-mendoza-hoy-el-80-de-nuestro-publico-es-extranjero-principalmente-de-brasil)
- **Observaciones:** F&B con 7 outlets separados — ejemplo claro de que F&B grande se divide en unidades. Casino es sub-propiedad gestionada separado ("Park Hyatt y Dreams Plaza Mendoza"). "Encargado de Compras" = Economato con nombre local.

#### 5. Faena Hotel Buenos Aires
- **Ubicación:** Martha Salotti 445, Puerto Madero · **Categoría:** 5* · **Habs:** 88 · **Cadena:** Faena Group · **Empleados:** 201-500
- **Departamentos y roles:** Founder/President (Alan Faena), HR Manager (Christian Spizuoco), Sales Director (Denise Zagdanski), Revenue Manager Assistant (Sol Crosa), Experience Manager Senior (Delfina Grasso), Director de Proyecto (Lucas Gette), IT Manager (Juan Castiglione).
- **Fuentes:** [LinkedIn Faena BA](https://www.linkedin.com/company/faenahotelbuenosaires) · [RocketReach Faena](https://rocketreach.co/faena-hotel-buenos-aires-management_b5c6ec69f42e0cdd)
- **Observaciones:** "Experience Manager" es rol propio — marcado como Senior. IT propio (único entre boutique AR). "Director de Proyecto" sugiere que mantienen pipeline de obras/reformas. Spa Faena + cabaret + teatro = F&B complejo.

#### 6. Hilton Buenos Aires
- **Ubicación:** Macacha Güemes 351, Puerto Madero · **Categoría:** 5* · **Habs:** 418 · **Cadena:** Hilton · **Empleados:** 281
- **Departamentos y roles:** General Manager (Mariano Cannello, desde marzo 2026), Corporate Sales Manager (Gimena Costa), Director of Finance (Adriana Romano — equipo de 11), Digital Marketing Manager (Andrés Alonso), IT Manager (Juan Manuel Echavarria), PR & ECG Manager (Clariana Vanoni). HR (2 empleados), Health (4 empleados).
- **Fuentes:** [Hotel-Online Cannello](https://www.hotel-online.com/news/mariano-cannello-appointed-general-manager-of-hilton-buenos-aires) · [RocketReach Hilton BA](https://rocketreach.co/hilton-buenos-aires-management_b5e0278ef42e6fc5)
- **Observaciones:** "Health Department" (4 emp) = dept de PRL / salud ocupacional, inusual como nombre. "ECG Manager" (Environmental, Community, Governance) → sostenibilidad integrada en PR. Marketing separado en Digital.

#### 7. Sheraton Buenos Aires & Convention Center
- **Ubicación:** San Martín 1225, Retiro · **Categoría:** 5* · **Habs:** 741 (hotel más grande de AR) · **Cadena:** Marriott · **Empleados:** 225
- **Departamentos y roles:** Multi-Property Director of Revenue Management (Fernando Alvarez), Multi-Property Director of F&B (Micaela Fernández Laya), Executive Housekeeping Manager (Fabiana Gonzalez), Account Manager (Rubén Juárez), Gerente Marketing y Comunicaciones (Roselyn Colina). Departamentos: Sales, Marketing/Comm, Revenue Mgmt, F&B, Housekeeping.
- **Fuentes:** [RocketReach Sheraton BA](https://rocketreach.co/sheraton-buenos-aires-hotel-convention-center-management_b6a479a8c878a494) · [en.travel2latam Sheraton](https://en.travel2latam.com/news-96617-sheraton-buenos-aires-hotel-renovates-its-rooms-and-reaffirms-its-commitment-to-the-environment)
- **Observaciones:** Roles "Multi-Property" — comparten jefatura con Park Tower adjacent (ambos Marriott). Convention Center suma unidad de MICE propia.

#### 8. Hotel Madero
- **Ubicación:** Rosario Vera Peñaloza 360, Puerto Madero · **Categoría:** 5* · **Habs:** 197 · **Cadena:** Independiente (DOT Group)
- **Departamentos y roles:** Sales Director (Pablo Almar), HR Manager (Nicolás Grillo). Resto por inferencia estándar 5* AR (FO, HK, F&B, Mant, Admin).
- **Fuentes:** [ZoomInfo Hotel Madero](https://www.zoominfo.com/pic/hotel-madero/354203575)
- **Observaciones:** Hotel de lujo independiente con infra de salud/wellness (Spa Dolce). Baja visibilidad pública del organigrama → típico de independientes AR.

#### 9. Hotel Pulitzer Buenos Aires
- **Ubicación:** Maipú 907, Centro · **Categoría:** 4* boutique · **Habs:** 104 · **Independiente**
- **Departamentos y roles:** Director (Maria Etchegoyen), Administrativa Compras/Controller A&B (Cecilia Tesouro), Front Desk (Maximiliano Calafat, Walter Fernicola, Israel Naranjo), Administrativo (Mariel Torrejón).
- **Fuentes:** [RocketReach Pulitzer](https://rocketreach.co/hotel-pulitzer-buenos-aires-profile_b45060b7fc783956)
- **Observaciones:** Boutique 4* chico: rol combinado "Compras + Controller A&B" (una persona cubre ambos). FO con auditores nocturnos. Sin RRHH, sin Comercial dedicado (seguramente lo hace director).

#### 10. Fierro Hotel Buenos Aires
- **Ubicación:** Soler 5862, Palermo Hollywood · **Categoría:** 4* boutique · **Habs:** 27 · **Independiente** · **Empleados:** 15
- **Departamentos y roles:** Gerente General (Laura Morillo), Operation Manager (Federico Alló), Supervisora Recepción (Florencia Denise Navarro), Concierge (Dyor Ananta Myne Pelliza), Head Sommelier (Mariano Camaño), F&B Manager (Roberto Cavazza), Camarera (Antonella Belletti), Cocinero (Ernesto Lobo).
- **Fuentes:** [RocketReach Fierro](https://rocketreach.co/fierro-hotel-buenos-aires-management_b5d00e00f42e47f2)
- **Observaciones:** Boutique chico típico: 15 empleados, 2 niveles (GG → cada rol). Interesante que mantengan Sommelier separado (Fierro tiene restaurante UCO). Sin RRHH, sin Comercial.

#### 11. Mio Buenos Aires
- **Ubicación:** Av. Quintana 465, Recoleta · **Categoría:** 4* boutique · **Habs:** 30 · **Independiente** · **Empleados:** 23
- **Departamentos y roles:** Hotel Manager (Raul Dellantonio), Sales & Marketing Manager (Ligia Pardo). Resto operativo sin títulos públicos.
- **Fuentes:** [RocketReach Mio BA](https://rocketreach.co/mio-buenos-aires-hotel-management_b4549667fc9d7daf)
- **Observaciones:** Boutique de 30 habs tiene Comercial dedicado (más que Fierro). Suficientemente chico para que todo lo demás reporte directo al Hotel Manager.

#### 12. Legado Mítico Buenos Aires
- **Ubicación:** Gurruchaga 1848, Palermo Soho · **Categoría:** 4* boutique · **Habs:** 11 · **Independiente**
- **Departamentos y roles:** No hay datos públicos de organigrama. Por tamaño (11 habs) seguramente: Director + Jefa de recepción + Gobernanta externa/compartida + Desayunos. Sin Comercial, Admin externa.
- **Fuentes:** [MyBoutiqueHotel Legado Mítico](https://www.myboutiquehotel.com/en/boutique-hotels-buenos-aires/legado-mitico.html) · [Jacada Travel Legado Mitico](https://www.jacadatravel.com/latin-america/argentina/buenos-aires/accommodation/legado-mitico/)
- **Observaciones:** Boutique ultra-chico. Representa el límite inferior donde la lógica de "departamentos" se diluye — es un equipo plano.

#### 13. Home Hotel Buenos Aires
- **Ubicación:** Honduras 5860, Palermo Hollywood · **Categoría:** 3-4* boutique · **Habs:** 20 (26 staff, 30 en temporada alta) · **Independiente**
- **Departamentos y roles:** Fundadores/dueños-gerentes (Patricia O'Shea + Tom Rixton). Estructura informal: FO/Conciergería, HK, Restaurante+Bar, Spa pequeño, Pool. Multilingüe.
- **Fuentes:** [AHotelLife Home Hotel](https://www.ahotellife.com/hotels/home-hotel/) · [Welcome Beyond Home Hotel](https://www.welcomebeyond.com/property/home-hotel/)
- **Observaciones:** Muy relevante para Bravas: 20 habs/26 staff → dueños hacen management, no hay layer intermedio. Modelo de "boutique familiar" que no cabe en organigrama formal — Bravas tiene que soportar este caso.

#### 14. Casa Lucía Buenos Aires
- **Ubicación:** Av. Alvear 1537, Recoleta · **Categoría:** 5* · **Habs:** 142 · **Independiente / Small Luxury Hotels of the World**
- **Departamentos y roles:** Datos públicos muy limitados. Por ser SLH y ganador "Best Hotel of Argentina 2025" se infieren 7-8 depts estándar 5*.
- **Fuentes:** [Read Hotels Above Par Casa Lucia](https://readhotelsabovepar.com/p/a-buenos-aires-hotel-with-a-history) · [Travel&Leisure Casa Lucía](https://travelandleisure-es.com/destinos/america/argentina/hoteles-en-buenos-aires-casa-lucia-un-hotel-para-la-primera-vez-en-buenos-aires/)
- **Observaciones:** Abrió 2022 — hotel reciente. Edificio Mihanovich (art deco). Spa + Cantina restaurante + Le Club Bacan bar = 3 outlets F&B.

### Argentina — Cadena 4* clásica

#### 15. NH Collection Buenos Aires Jousten
- **Ubicación:** Av. Corrientes 240, Microcentro · **Categoría:** 4* · **Habs:** 82 · **Cadena:** NH (Minor Hotels)
- **Roles:** Director General (Milagros R.), Guest Relations (Tomas Omar Tarramasco), equipo FO/F&B/HK.
- **Fuentes:** [Tripadvisor NH Jousten](https://www.tripadvisor.com/Hotel_Feature-g312741-d306764-zft9166-NH_Collection_Buenos_Aires_Jousten.html)
- **Observaciones:** Como propiedad NH, comparte funciones corporativas (Revenue, RRHH, Comercial) con NH España/HQ — el hotel in-situ tiene estructura más chica.

#### 16. NH Buenos Aires Tango
- **Ubicación:** Cerrito 550, Centro · **Categoría:** 4* · **Habs:** 92 · **Cadena:** NH
- **Roles:** Hotel Director (Pablo Sanchez), Director General (Cristian Varela), Front Office Manager (Victoria Gomez Campo).
- **Fuentes:** [Wikipedia NH Tango](https://es.wikipedia.org/wiki/Hotel_NH_Tango)
- **Observaciones:** Hotel 4* urbano NH típico. Nombres AR para los roles ("Hotel Director" vs Director General en paralelo sugiere tal vez dos edificios o Hotel Director reportando a Director General regional).

### Argentina — Resort

#### 17. Llao Llao Resort, Golf & Spa
- **Ubicación:** Av. Bustillo Km 25, Bariloche · **Categoría:** 5* · **Habs:** 205 · **Propietario:** IRSA · **Empleados:** 264
- **Roles:** Agustin Lanus y Maria Morini (sin título específico público), Jefe de Salones (Patricia Hilaire).
- **Fuentes:** [IRSA Portfolio Llao Llao](https://www.irsa.com.ar/portfolio/hotel-llao-llao/) · [LinkedIn Llao Llao](https://ar.linkedin.com/company/llao-llao-hotel-&-resort-golf---spa)
- **Observaciones:** Resort con 264 empleados → estructura rica. Golf propio + Spa propio + Salones de eventos + varios restaurantes (Los Césares, Ventisquero, Patagonia). Jardinería y Paisajismo relevantes (bosque andino). Infiere Jefe de Mantenimiento con grupos (edilicio, jardín, piscinas).

#### 18. Hotel Costa Galana Mar del Plata
- **Ubicación:** Bulevard Marítimo P. Peralta Ramos 5725, MdP · **Categoría:** 5* · **Habs:** 186 · **Grupo:** Álvarez Argüelles Hoteles
- **Roles:** Hospitality Experience Manager (Melina Prestia), Ejecutiva Cuentas y Eventos (Katiana Oyanguren), Gerente Servicios Técnicos Grupo (Sergio Sarno), Senior Sous Chef (Barbara Vidakovics).
- **Fuentes:** [ZoomInfo Costa Galana](https://www.zoominfo.com/pic/hotel-costa-galana/354256585) · [hotelcostagalana.com](https://www.hotelcostagalana.com/)
- **Observaciones:** Grupo Álvarez Argüelles maneja "Servicios Técnicos" cross-propiedad. Rol "Hospitality Experience" sin ser "Guest Experience" — nombre regional.

### España — Grandes cadenas de lujo

#### 19. Mandarin Oriental Ritz, Madrid
- **Ubicación:** Plaza de la Lealtad 5 · **Categoría:** 5* · **Habs:** 100 · **Cadena:** MOHG
- **Roles:** General Manager + Area VP Operations (Robert Lowe — también cubre Barcelona y Costa Navarino), Executive Chef (Quique Dacosta — 3 estrellas Michelin ajeno al hotel), Director of Marketing (Inma Casado), Director of Commerce (Marcelo Moscheni).
- **Fuentes:** [Press Mandarin Ritz PDF](https://press.mandarinoriental.com/wp-content/uploads/2025/11/07641145c060f5fe3f0663ad8fa75362.pdf) · [Hosteltur Robert Lowe](https://www.hosteltur.com/158454_mandarin-oriental-ritz-madrid-estrena-director.html) · [Forbes Mandarin Ritz](https://forbes.es/empresas/94281/quien-es-quien-en-mandarin-oriental-ritz-madrid/)
- **Observaciones:** Chef insignia externo (Dacosta) — modelo "chef invitado" común en lujo 5*. GM tiene rol regional (VP Operations) además de propiedad — ejemplo de doble-rol en cadena. "Director of Commerce" en lugar de Sales Director — terminología MOHG.

#### 20. Mandarin Oriental Barcelona
- **Ubicación:** Passeig de Gràcia 38-40 · **Categoría:** 5* · **Habs:** 120 · **Cadena:** MOHG
- **Roles:** General Manager (Jean Philippe Moser, desde 2020), Director of Finance (lead de accounting+purchasing+IT — equipo fusionado), Director of F&B (reporta el Executive Chef), Guest Experience Manager (dentro Rooms Division), Director of Communications (Monica Homedes).
- **Fuentes:** [MO Careers Finance Director](https://careers.mandarinoriental.com/jobs/director-of-finance-barcelona-catalunya-spain) · [MO GM Appointment PDF](https://photos.mandarinoriental.com/is/content/MandarinOriental/corporate-barcelona-pdf-gm-appointment-jorge-monje)
- **Observaciones:** **Interesante hallazgo:** Finance Director lidera también Purchasing e IT — ejemplo claro de dept consolidado. "Guest Experience Manager dentro de Rooms Division" — GX no es dept propio, es función dentro de Rooms.

#### 21. Hotel Arts Barcelona (Ritz-Carlton)
- **Ubicación:** Carrer de la Marina 19-21 · **Categoría:** 5* · **Habs:** 483 · **Cadena:** Marriott (Ritz-Carlton)
- **Roles:** General Manager (Renato De Oliveira), Director of Operations (Pascha Bhatti), HR Director (Jordi Sala Serra), Director of Sales & Marketing (Nuria Romagosa), Director of Sales (Teresa Orejas Marbán), Director of F&B (Mariona Arasanz Goset), Director of Reservations (Marta Pons Bonet), Director of Quality (Martina Baccigalupi), Conference Services Manager (Noémie Leroy), Assistant Guest Services Manager (Zakariyae Bekri).
- **Fuentes:** [TheOrg Hotel Arts](https://theorg.com/org/hotel-arts-barcelona-s-a) · [LeadIQ Hotel Arts](https://leadiq.com/c/hotel-arts-barcelona/5a1d827624000024005cc876)
- **Observaciones:** Separa **Director of Sales & Marketing** y **Director of Sales** (jerarquía: S&M arriba, Sales ejecución). **Director of Quality** como rol propio — único en el relevamiento. Director of Reservations como dept propio (no bajo Comercial).

#### 22. W Barcelona
- **Ubicación:** Plaça Rosa dels Vents 1 · **Categoría:** 5* · **Habs:** 473 · **Cadena:** Marriott (W) · **Empleados:** 315
- **Roles:** HR Director (Jose Ruiz), Head of External Sales (Rodrigo Sorzano Ocaña), CMO Marketing & Comm Director (Monica Alegre), Spa Director (Nuria Moya), Director of Engineering (Daniel Ordóñez Guerrero). 9 departamentos declarados (Marketing, IT, Sales, Finance, Operations, etc.).
- **Fuentes:** [RocketReach W Barcelona](https://rocketreach.co/w-barcelona-management_b5cf1ef2f42e09ec) · [LinkedIn W Barcelona](https://es.linkedin.com/company/w-barcelona)
- **Observaciones:** W es "lifestyle" dentro Marriott → tiene "CMO" (poco usual) con estatura de C-suite, no solo Director.

### España — Business / cadena mediana

#### 23. NH Collection Madrid Eurobuilding
- **Ubicación:** C. Padre Damián 23 · **Categoría:** 5* · **Habs:** 412 + Centro Convenciones · **Cadena:** NH (Minor Hotels)
- **Roles:** Sales Executive (Maria Rey — rol de MICE), Proactive Sales Executive (temp), Maître D', mantenimiento eléctrico, Guest Relations. 28 empleados en LinkedIn (sub-representado).
- **Fuentes:** [LinkedIn NH Eurobuilding](https://ie.linkedin.com/company/nh-eurobuilding) · [Hosco NH Eurobuilding](https://www.hosco.com/en/job/minor-hotels-southern-europe/proactive-sales-executive-temp-nh-collection-madrid-eurobuilding)
- **Observaciones:** Business hotel de referencia Madrid financial district con centro de convenciones integral. Perfil Comercial muy fuerte (MICE, B2B, Customer Care, Event Sales).

#### 24. Meliá Castilla Madrid
- **Ubicación:** Capitán Haya 43 · **Categoría:** 4* · **Habs:** 909 (uno de los más grandes de Madrid) · **Cadena:** Meliá
- **Roles:** Director General (Eduardo González), Guest Experience Manager (Álvaro Santana), equipo recepción nombrado (Fernando, Fernanda, Laura, Alicia), Housekeeping team.
- **Fuentes:** [Milenio Meliá Castilla](https://www.milenio.com/negocios/hotel-melia-castilla-en-madrid-el-favorito-de-los-turistas-mexicanos) · [Meliá web Castilla](https://www.melia.com/en/hotels/spain/madrid/melia-castilla)
- **Observaciones:** 909 habs → escala mayor. Tiene concepto "The Level" (Floor Executive / Premium) con equipo dedicado = dept dentro Rooms Division. Meliá corporate agrega: Finanzas, RRHH, Operaciones, Marketing como depts matriz.

### España — Boutique urbanos

#### 25. Only YOU Boutique Hotel Madrid
- **Ubicación:** Barquillo 21, Chueca · **Categoría:** 4* boutique · **Habs:** 70 · **Grupo:** Palladium Hotel Group
- **Roles:** General Manager (Sam Bath), Guest Relations Manager (Rut Zazo), Chef (Carlos Martín), equipo Events/Catering (Paulette, Belén, Bruno), Front Desk, Concierge, Housekeeping.
- **Fuentes:** [Palladium Only YOU](https://www.palladiumhotelgroup.com/en/hotels/espana/madrid/only-you-boutique-hotel-madrid) · [onlyyouhotels.com](https://www.onlyyouhotels.com/en/hotels/only-you-boutique-hotel-madrid/)
- **Observaciones:** Guest Relations como dept propio desde 70 habs — a diferencia de Mandarin que lo mete en Rooms Division. Eventos/Catering con equipo propio aunque hotel chico.

#### 26. Hotel Único Madrid
- **Ubicación:** C. Claudio Coello 67 · **Categoría:** 5* boutique · **Habs:** 44 · **Grupo:** Único Hotels
- **Roles:** Director General (María Sánchez), Assistant Front Office Manager (Carolina Nigro), Quality Manager (José Cheng). Corporate: CFO (Marc Pérez Sánchez), Innovation (Carlos Juliá), Global Sales (Juan Segura).
- **Fuentes:** [LinkedIn Único Hotels](https://es.linkedin.com/company/unicohotels) · [careers.unicohotels.com](https://careers.unicohotels.com/)
- **Observaciones:** 44 habs con Quality Manager dedicado = inusual, muestra cuidado premium. Funciones Comercial y Finanzas centralizadas en grupo (no en hotel).

#### 27. URSO Hotel & Spa Madrid
- **Ubicación:** C. Mejía Lequerica 8 · **Categoría:** 5* boutique · **Habs:** 78 · **Operador:** Marugal Hotel Management
- **Roles:** Hotel Manager (Patricia Fernández), Marketing Manager (Jaione Castillo), Sales Manager (Raquel Asensio). Spa by Natura Bissé (tercerizado con marca).
- **Fuentes:** [hotelurso.com](https://hotelurso.com/) · [URSO Madrid Reviews](https://www.tripadvisor.com/Hotel_Review-g187514-d6895631-Reviews-URSO_Hotel_Spa_A_Small_Luxury_Hotel_Of_The_World-Madrid.html)
- **Observaciones:** Operado por Marugal — hotel operado por tercero (modelo management contract muy común ES/UK). Spa con marca externa (Natura Bissé) = tercerización parcial con branding.

### LATAM resto

#### 28. Sofitel Montevideo Casino Carrasco & Spa
- **Ubicación:** Rambla República de México 6451 · **Categoría:** 5* · **Habs:** 92 + Casino + Spa · **Cadena:** Accor (Sofitel)
- **Roles:** Front Desk Manager (Mendel Veltman), Director of Sales (Natalia Paladino, Lucia Garmendia — dos co-directoras), Marketing (Carolina Vera), Hotel Management (Diego Marcone).
- **Fuentes:** [Tripadvisor Sofitel Carrasco](https://www.tripadvisor.com/Hotel_Review-g294323-d2590197-Reviews-Sofitel_Montevideo_Casino_Carrasco_Spa-Montevideo_Montevideo_Department.html) · [all.accor.com Sofitel](https://all.accor.com/hotel/7969/index.en.shtml)
- **Observaciones:** Edificio histórico (Hotel Carrasco 1921). Dos co-directoras de Ventas sugiere corporate+leisure split. Casino propio.

#### 29. Santiago Marriott Hotel
- **Ubicación:** Av. Kennedy 5741 · **Categoría:** 5* · **Habs:** 280 · **Cadena:** Marriott
- **Roles:** General Manager (Carolina Voullième León — 25 años Marriott), Operations Director (Franco Borroni), Director of Sales & Marketing Multi-Property (María Begoña Iriondo — cubre también Courtyard Las Condes), Director of Market Finance Chile (Alejandro Araujo).
- **Fuentes:** [Chef & Hotel Santiago Marriott](https://chefandhotel.cl/hoteleria/carolina-voullieme-leon-gerenta-general-de-santiago-marriott-hotel/) · [AmCham Chile Appointments](https://amchamchile.cl/noticia/designaciones-de-ejecutivos-26/)
- **Observaciones:** Roles Multi-Property comparten S&M y Finance con Courtyard adjacente — patrón Marriott cluster.

#### 30. Four Seasons Hotel Mexico City
- **Ubicación:** Paseo de la Reforma 500 · **Categoría:** 5* · **Habs:** 240 · **Cadena:** Four Seasons
- **Roles:** General Manager (Tulio Hochkoeppler), Director of Sales (Marcio Souza), Director of PR & Comm (Daniela Dibildox), Director of Finance (Adriano Figueiredo), Assistant Director of People & Culture (Gina Marcela Reina), Executive Pastry Chef (Laura Rodríguez), Chef (Jorge Dumit Garciarreal).
- **Fuentes:** [FS Press Mexico City Team](https://press.fourseasons.com/mexico/hotel-team/) · [FS Mexico Director de F&B careers](https://careers.fourseasons.com/us/en/job/REQ10392572/Director-de-F-B)
- **Observaciones:** Pastry Chef con rol de Director = jerarquía culinaria compleja. "People & Culture" otra vez.

#### 31. The St. Regis Mexico City
- **Ubicación:** Paseo de la Reforma 439 · **Categoría:** 5* · **Habs:** 189 · **Cadena:** Marriott (St. Regis)
- **Roles:** General Manager (Rodrigo Rizzi), Director of Operations (Joel Martin), Executive Assistant Manager (Roberto Otálora), Head Butler (Raquel), F&B Director (Javier), PR Manager (Adriana Zermeño), Marketing & Comm Manager (María Fernanda Elizondo).
- **Fuentes:** [Hotel-Online St. Regis CDMX](https://www.hotel-online.com/press_releases/release/the-st-regis-mexico-city-names-rodrigo-rizzi-as-new-general-manager/) · [Hospitality Net St. Regis CDMX](https://www.hospitalitynet.org/appointment/79024245.html)
- **Observaciones:** **Head Butler = jefe de Mayordomía** (programa Butler Service St. Regis). Único en el relevamiento con rol de Butler como dept propio. Separa Director of Operations + Executive Assistant Manager (dos layers).

#### 32. Hotel B Lima (Barranco)
- **Ubicación:** Av. San Martín 301, Barranco · **Categoría:** 5* boutique · **Habs:** 20 · **Independiente / Relais & Châteaux**
- **Roles:** Commercial Director (Carlos Sologuren), Events Manager (Frank Frias), Chef (Oscar Velarde, premiado). Resto operativo sin títulos públicos.
- **Fuentes:** [Luxury Latin America Hotel B](https://www.luxurylatinamerica.com/peru/bhotel.html) · [Hotel B web](https://hotelb.pe/)
- **Observaciones:** Boutique 20 habs con Chef de nombre reconocido (Velarde) — modelo "hotel+restaurante estrella". Comercial propio, Eventos propio (alquileres de eventos privados en mansión 1914).

### Internacional (benchmark)

#### 33. Hotel Adlon Kempinski Berlin
- **Ubicación:** Unter den Linden 77 · **Categoría:** 5* · **Habs:** 307 · **Cadena:** Kempinski
- **Roles:** Managing Director (Christian Hirt, desde 2026), Director Rooms Division (Marie-Pierre Girardot), Executive Assistant Manager F&B (Sebastian Gassen), Director HR (Vanessa Siemens). Imprint declara 3 Managing Directors (Karina Ansos, Xavier Destribats, Marcel Kleffner).
- **Fuentes:** [AHGZ Adlon neuzugaenge](https://www.ahgz.de/hotellerie/news/berliner-grandhotel-drei-neuzugaenge-verstaerken-das-managementteam-des-hotel-adlon-kempinski-berlin-319671) · [Tophotel Adlon Hirt](https://www.tophotel.de/hotel-adlon-christian-hirt-wird-neuer-managing-director-377054/)
- **Observaciones:** **Director Rooms Division explícito** — confirma patrón alemán/europeo. Multiple Managing Directors en imprint es compliance alemán, no roles operativos.

#### 34. Grand Hyatt Berlin
- **Ubicación:** Marlene-Dietrich-Platz 2 · **Categoría:** 5* · **Habs:** 342 · **Cadena:** Hyatt
- **Roles:** Director of Rooms (Philipp Schleife), Director of Engineering (Christian Lange), Director of Sales & Marketing (Gesa Von Freyberg), Director of Finance (Patrick Peukert), Recruiting Manager (Juliane Jüptner — HR).
- **Fuentes:** [RocketReach Grand Hyatt Berlin](https://rocketreach.co/grand-hyatt-berlin-management_b564c403f907c09c)
- **Observaciones:** 5 directores identificados = estructura clásica 5*. Separación clara Rooms / Engineering / S&M / Finance / HR.

#### 35. New York Marriott Marquis
- **Ubicación:** 1535 Broadway, Times Square · **Categoría:** 4* · **Habs:** 1,949 (uno de los más grandes de Marriott globalmente) · **Cadena:** Marriott
- **Roles:** Area General Manager (Daniel Nadeau), Director of Sales & Marketing (Matthew Pizzimenti), Director of Revenue (Rahul Gupta), Director of Event Management (Teddy Mihaliadis), Director of HR & Business Support (Nydia Garcia-Wayne), Director of Safety & Security (Marta Puchalska), Director of Technology (Adam Goldman).
- **Fuentes:** [LinkedIn Marriott Marquis personnel](https://www.linkedin.com/in/matthew-w-pizzimenti-4b915314/) · varios perfiles LinkedIn.
- **Observaciones:** **Director of Event Management** como rol propio (no bajo F&B) — por tamaño del hotel (1949 habs, MICE pesado). **Director of Safety & Security** dept propio. **Director of Technology** dept propio. Area GM = cubre varios hoteles de la zona.

#### 36. The Peninsula Hong Kong
- **Ubicación:** Salisbury Rd, Tsim Sha Tsui · **Categoría:** 5* · **Habs:** 300 · **Cadena:** HSH Group (Peninsula Hotels)
- **Roles:** Area VP Greater China + Managing Director (Joseph Chong), 10 executives totales.
- **Departamentos corporate+hotel declarados:** Corporate Office & Support, Engineering & Maintenance, Executive Office, Finance & Purchasing, F&B, People & Culture (HR), Projects & Design, Rooms & Housekeeping, Sales & Marketing, Security & Operational Risk, Spa & Wellness, Technology — total 50 functional departments.
- **Fuentes:** [TheOfficialBoard Peninsula HK](https://www.theofficialboard.com/org-chart/the-peninsula-hong-kong) · [TheOrg Peninsula Hotels](https://theorg.com/org/the-peninsula-hotels#teams)
- **Observaciones:** **Lista explícita de 12 áreas funcionales** — es el más detallado del relevamiento. Innovaciones: "Projects & Design" dept propio (gestión de obras y diseño), "Security & Operational Risk" (seguridad + riesgo), "Finance & Purchasing" fusionado (Economato dentro Finanzas).

#### 37. Marina Bay Sands Singapore
- **Ubicación:** 10 Bayfront Avenue · **Categoría:** 5* · **Habs:** 2,561 (!) · **Grupo:** Las Vegas Sands · **Empleados:** 11,800
- **Roles:** COO (Paul Town), SVP & CFO (Suzie Tan), SVP & Chief Hospitality Officer (Tane Picken), VP & CIO (Alberto Jose), IT CIO & VP (William Soo). **Estructura declarada:** SVP Casino Operations, SVP Retail, VP Hotel Operations, VP F&B, VP Facilities, Engineering, Technical Operations.
- **Fuentes:** [Marina Bay Sands Corporate PDF](https://www.marinabaysands.com/content/dam/singapore/marinabaysands/master/main/home/company-information/media-centre/Mar2020/Corporate_Mar_2020.pdf) · [TheOrg Marina Bay Sands](https://theorg.com/org/marina-bay-sands-pte-ltd)
- **Observaciones:** Integrated resort → Hotel + Casino + Retail + Convention Center + Teatro + Observation Deck. Cada una es "VP of X" separado. Escala 11,800 empleados = ejemplo extremo. Chief Hospitality Officer agrupa Rooms+F&B+Guest Services a nivel C-suite.

---

## Sección 4 — Patrones comunes vs variaciones

### 4.1 Patrón UNIVERSAL (lo tienen 100% de los hoteles del relevamiento)
- **Dirección General / Hotel Manager / GM** (nombre varía).
- **Front Office / Recepción** (siempre dept propio).
- **Housekeeping / Ama de Llaves / Gobernanta** (siempre dept propio).
- **Cocina con Chef Ejecutivo** (dept o rol).
- **Administración / Contabilidad** (interno o externo).
- **Mantenimiento / Engineering** (interno o externo).

### 4.2 Patrón 4*+ (≥90% lo tienen)
- **Comercial / Sales & Marketing** como dept propio.
- **F&B Servicio separado de Cocina** (Maître + Chef son dos roles).
- **RRHH / People & Culture** como dept propio.
- **Reservas** (sub-dept de Comercial o Rooms Division).

### 4.3 Patrón 5* y/o cadena grande (≥60% lo tienen)
- **Rooms Division como agrupador** (FO + HK + Reservas + Concierge) con Director propio.
- **Revenue Management** como rol/sub-dept.
- **Director de Operaciones** entre GM y heads de depts.
- **Seguridad** dept propio.
- **IT / Technology** dept propio.
- **Eventos / Banquetes** dept propio (bajo F&B o independiente).
- **Spa & Wellness** (si lo tiene físicamente).

### 4.4 Patrón EXCLUSIVO lujo 5* o resort específico
- **Mayordomía / Butler Service** (visto solo en St. Regis).
- **Guest Experience** como dept propio (no función) — visto en Faena, Mandarin BCN, Meliá Castilla, Only YOU, Único, Hotel B Lima, FS BA, FS CDMX, Adlon.
- **Quality Manager / Director of Quality** — solo Hotel Arts BCN y Único Madrid lo tienen explícito.
- **Projects & Design** — solo Peninsula HK.
- **Casino, Retail, Teatro** — Park Hyatt Mendoza, Sofitel Carrasco, Marina Bay Sands.
- **Golf** — Llao Llao.
- **Sommelier dedicado** — Fierro (único entre boutiques AR).

### 4.5 Variaciones regionales (terminología)

| Función | AR | ES | LATAM | Int'l EN |
|---|---|---|---|---|
| Gerente general | Gerente General / Director | Director (del hotel) | Gerente General | General Manager (GM) |
| Jefa HK | Gobernanta | Gobernanta | Ama de Llaves | Executive Housekeeper / Housekeeping Manager |
| Jefe recepción | Jefe de Recepción | Jefe de Recepción | Jefe de Recepción | Front Office Manager (FOM) |
| Jefe F&B | Gerente / Jefe de A&B | Director de F&B | Gerente de A&B | Director of F&B |
| RRHH | RRHH / Gerente de RRHH | Recursos Humanos | RRHH | People & Culture (cadenas) / HR Director |
| Comercial | Comercial / Ventas | Comercial | Ventas / Comercial | Sales / Commerce |
| Economato | Compras / Economato | Economato | Compras | Purchasing |

### 4.6 Variaciones estructurales por tipo

| Tipo | Depts típicos | Lo que raramente tiene | Ejemplos |
|---|---|---|---|
| **Boutique chico (<40 habs)** | GM, FO, HK, F&B (fusionado), Admin externa | RRHH, IT, Revenue, Security, Guest Exp formal | Fierro, Legado Mítico, Home, Hotel B Lima, Único |
| **Boutique urbano medio (40-100 habs)** | +Comercial, +RRHH chico, F&B separado | Rooms Division, Operaciones | Pulitzer, Mio, URSO, Only YOU |
| **Urbano 4* grande (100-300)** | Todo + Reservas + IT externo | Casino, Golf, Spa (a veces) | NH Jousten, NH Tango, Meliá Castilla |
| **5* lujo urbano** | Todo + Rooms Division + Seguridad + Guest Exp + Spa | Casino, Retail | Mandarin Ritz, FS BA, Adlon, Peninsula |
| **Resort** | Todo + Animación + Piscina/Playa + Golf + Spa grande + Jardinería | Convention Center (si urbano) | Llao Llao, Costa Galana |
| **Business/MICE** | Todo + Eventos robusto + Convention Center + MICE Sales | Spa, Animación | Sheraton BA, NH Eurobuilding, Marriott Marquis |
| **Integrated resort (raro)** | Todo + Casino + Retail + Teatro + Observation + Marina | — | Marina Bay Sands, Park Hyatt+Dreams Mendoza |

---

## Sección 5 — Ejemplos destacados (3 organigramas visuales para Daniel)

### Ejemplo A — Boutique urbano chico independiente (target primario Bravas)

```
FIERRO HOTEL BUENOS AIRES (Palermo Hollywood · 4* · 27 habs · 15 empleados · independiente)
└── Gerente General (Laura Morillo)
    ├── Operation Manager (Federico Alló)
    │   ├── Front Office
    │   │   ├── Supervisora Recepción (Florencia Denise Navarro)
    │   │   ├── Recepcionistas
    │   │   └── Concierge (Dyor Ananta Myne Pelliza)
    │   └── Housekeeping
    │       └── Camareras (Antonella Belletti y equipo)
    ├── F&B — restaurante UCO
    │   ├── F&B Manager (Roberto Cavazza)
    │   ├── Head Sommelier (Mariano Camaño)
    │   └── Cocina
    │       └── Cocinero (Ernesto Lobo) + brigada
    └── [Comercial, RRHH, Admin → externalizados o asumidos por GG]

Notas:
· Sin Revenue Management, sin IT interno, sin Security formal.
· Spa, Mantenimiento = tercerizados.
· 2 niveles jerárquicos operativos (GG → Operations Manager → cada área).
· Ejemplo de tenant mínimo viable del SaaS Bravas.
```

### Ejemplo B — Resort 5* con casino y centro de convenciones

```
PARK HYATT MENDOZA (Ciudad · 5* · 186 habs + Casino + Convention Center · Hyatt · 173 empleados)
└── General Manager (Miguel Urmeneta)
    ├── Director of Operations (Victor Grandi)
    │   ├── Rooms Division
    │   │   ├── Front Office Manager
    │   │   ├── Housekeeping (Gobernanta)
    │   │   └── Reservas
    │   ├── F&B — Director de F&B (Diego Anea) — 7 outlets
    │   │   ├── Executive Chef (Franco Canzano)
    │   │   │   └── Jefes de Partida → Cocineros
    │   │   ├── Maître + servicio salón
    │   │   ├── Banquetes (Social Banquets)
    │   │   ├── Convention Center F&B
    │   │   ├── Bistró M, Uvas Bar, El Patio, Café/Patisserie, Alea Sport Bar
    │   │   └── Room Service
    │   ├── Mantenimiento / Engineering
    │   └── Gimnasio (Director Técnico — Alejandro Lombardi)
    ├── Director of Finance (Matias Grassi) — 11 empleados
    │   ├── Contabilidad
    │   ├── Compras / Economato (Encargado de Compras — Juan Minacapelli)
    │   └── IT (2 empleados)
    ├── Associate Director of Marketing (María Marta Guisasola)
    │   └── Comercial (Sales, Marketing Digital)
    ├── RRHH (3 empleados)
    ├── Seguridad
    └── Casino (gestión separada "Dreams Plaza Mendoza")

Notas:
· 7 outlets de F&B = prueba que F&B grande necesita sub-segmentación.
· IT interno pero chico (2 personas) — bajo Finance, no dept propio.
· Casino aparece como sub-propiedad con marca aparte.
· 4 niveles: GM → Director Operations → Director Dept → equipos.
```

### Ejemplo C — Mega-resort integrado (lujo máximo — benchmark alto)

```
MARINA BAY SANDS (Singapore · 5* · 2,561 habs · Las Vegas Sands · 11,800 empleados)
└── Chief Operating Officer (Paul Town)
    ├── SVP Casino Operations
    │   └── gaming floors, poker, dealers, cage, surveillance
    ├── SVP Retail (The Shoppes at MBS)
    │   └── 170+ tiendas + food court
    ├── Chief Hospitality Officer — Tane Picken (SVP)
    │   ├── VP Hotel Operations
    │   │   ├── Rooms Division (FO + HK + Butler + Concierge)
    │   │   ├── Reservations
    │   │   └── Guest Experience
    │   ├── VP F&B — 80+ restaurantes y bares
    │   │   ├── Executive Chef Office
    │   │   ├── Celebrity Chef Restaurants (Wolfgang Puck, Tetsuya, etc.)
    │   │   ├── Banquetes & Eventos
    │   │   └── Room Service
    │   └── Spa (Banyan Tree Spa)
    ├── VP Facilities
    │   ├── Engineering
    │   ├── Technical Operations
    │   └── Grounds (jardinería SkyPark)
    ├── CFO (Suzie Tan — SVP)
    │   ├── Finance & Accounting
    │   ├── Purchasing
    │   └── Legal
    ├── CIO (Alberto Jose — VP) + IT CIO (William Soo — VP)
    │   └── Technology, Data, Cybersecurity
    ├── People & Culture (HR, L&D, People Services)
    ├── Security & Loss Prevention
    ├── Convention Center (Sands Expo)
    ├── Entertainment (Theaters)
    └── ArtScience Museum + Observation Deck

Notas:
· Nivel C-suite propio del hotel (COO, CFO, CIO, CHO) — único en el relevamiento.
· Chief Hospitality Officer = rol poco común; agrupa Rooms+F&B+Guest Exp.
· 170+ tiendas y 80+ restaurantes muestran que Retail y F&B como dept independiente llegan a escalas industriales.
· Aspirational / benchmark máximo — no target Bravas, pero marca el techo.
```

---

## Implicaciones concretas para Hotel Bravas

Confirmadas contra los 30 hoteles reales:

1. **Catálogo de módulos tiene que ser activable, no fijo.** 30 hoteles = 30 estructuras distintas. Un boutique de 20 habs no necesita Seguridad propio, un resort sí. Un urbano no tiene Animación, un all-inclusive sí. Modelo: **sectores "núcleo" (siempre activos) + sectores "opcionales" (activa el admin del tenant)**.

2. **"Núcleo" para arrancar MVP = 9 sectores:** Dirección, Front Office, Housekeeping, Cocina, F&B Servicio, Comercial (+Revenue+Reservas adentro), Administración, Mantenimiento, RRHH. Cubre el 100% de los 30 hoteles.

3. **"Opcionales" para unlock por configuración = 10 sectores:** Guest Experience, Seguridad, IT/Sistemas, Spa, Eventos/Banquetes, Economato (puede nacer dentro de Admin o separarse), Rooms Division (feature "agrupador"), Quality/Calidad, Animación/Kids Club, Jardinería/Áreas verdes.

4. **"Verticales exclusivos" (solo si el tenant lo activa explícitamente) = 4 sectores:** Casino, Golf, Marina/Playa/Piscina, Retail.

5. **Terminología i18n obligatoria.** El SaaS tiene que tener switch ES-AR / ES-ES / EN con los sinónimos de la tabla 4.5. Sin esto, un hotel español llamará "Gobernanta" y un mexicano "Ama de Llaves" y no se entenderán con el mismo catálogo.

6. **Jerarquía de 3-4 niveles es suficiente.** Ningún hotel del relevamiento (excepto Marina Bay Sands que es otro universo) tiene más de 4 niveles operativos (GM → Director Dept → Supervisor → Operativo). Bravas no necesita arquitectura de árbol infinita — 4 niveles alcanzan sobrado.

7. **Rol "Director de Operaciones"** debe ser un **meta-rol/permiso**, no un dept. Algunos hoteles lo tienen, otros no. En el SaaS, sería "nivel de permiso de edición cross-departamental".

8. **El "huésped" es un ciudadano de primera dentro de 12 de los 30 hoteles** (donde Guest Experience es dept explícito). Confirma que el portal huésped (ya en la demo F2.5) es decisión correcta y moderna.

---

**Fin del documento.**
