# Catálogo exhaustivo — RRHH (Recursos Humanos)

> Ficha canónica del módulo `@octo/bravashotel-hr`. Sigue la estructura de 17 secciones del `_TEMPLATE_catalogo_sector.md`. Un developer puede construir este módulo completo leyendo solo este documento.

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Recursos Humanos / Personas |
| **Nombre (es-AR)** | Recursos Humanos |
| **Nombre (en)** | Human Resources / People & Culture |
| **Código técnico** | `@octo/bravashotel-hr` |
| **Tipo** | Core (siempre activo en todo tenant) |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | `@octo/bravashotel-admin-cfo` (nóminas coordinadas, recibos de sueldo, F931), `@octo/bravashotel-security` (PRL coordinada con Seguridad) |
| **Módulos dependientes de éste** | Todos los módulos Core (cada módulo tiene empleados que pertenecen a RRHH) |
| **Activación default** | Siempre activo |

---

## 2. Propósito del módulo

- **Qué resuelve:** Gestiona el ciclo completo de vida del empleado en el hotel: desde la selección y el alta hasta la baja y liquidación final. Cubre el control de asistencia y fichaje, gestión de turnos (crítico en un sector 24/7 como la hotelería), nóminas mensuales, gestión de vacaciones y licencias, formación obligatoria (PRL en ES / Seguridad e Higiene en AR, manipulación de alimentos, incendios, primeros auxilios), evaluación de desempeño, cumplimiento del convenio colectivo aplicable (Hostelería ES por provincia / CCT Gastronómicos AR), y gestión de incapacidades temporales (bajas médicas). Incluye el Portal M10 del Contador/RRHH externo para gestorías.

- **Qué NO resuelve:** No gestiona la contabilidad de las nóminas (eso lo registra `@octo/bravashotel-admin-cfo`). No gestiona la seguridad física del empleado en el trabajo (eso es `@octo/bravashotel-security`), aunque sí coordina la parte documental de PRL (formaciones, reconocimientos médicos, evaluación de riesgos). No gestiona el channel manager ni las reservas. No hace revenue management.

- **Métrica principal de éxito del sector:** Cobertura de turnos % = turnos cubiertos sin incidencia / turnos totales programados × 100. Target: >95%. KPI secundario de compliance: formaciones PRL al día = 100% de empleados con formaciones vigentes (ninguna caducada o próxima a caducar sin acción tomada).

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Jefe del sector | Director de RRHH / HR Manager | Gerente de RRHH / HR Manager | HR Manager / People & Culture Director | 2 | Director General | Responsable Nóminas, Técnico Selección/Formación | en hoteles chicos, el HR Manager también hace nóminas |
| Responsable Nóminas | Responsable de Nóminas | Responsable de Sueldos | Payroll Specialist | 3-4 | HR Manager | — | en hoteles chicos, es el mismo HR Manager o un Administrativo de Admin-CFO |
| Técnico Selección/Formación | Técnico de Selección y Formación | Técnico de RRHH | HR Generalist / Training Coordinator | 3-4 | HR Manager | — | en hoteles medianos, una persona cubre selección + formación. En grandes puede separarse |

**Variantes por tamaño de hotel:**
- **Boutique chico (<40 habs):** No hay dept RRHH formal. El Director/dueño hace las altas/bajas. Nóminas las gestiona la gestoría externa. PRL coordinada externamente. En el sistema: módulo activo en modo simplificado (solo alta/baja empleado + turnos + fichaje).
- **Urbano 4* mediano (80-150 habs) — target primario Bravas:** HR Manager + 1 Responsable de Nóminas. Integración con Factorial ES / Bejerman AR para liquidación. PRL gestionada internamente con proveedor de salud laboral (FREMAP en ES / ART en AR).
- **Resort/5*:** HR Manager + Controller de RRHH + Responsable Nóminas + Técnico Selección + Técnico PRL dedicado. Puede incluir "People & Culture" como nombre del dept (patrón cadenas internacionales Four Seasons, Hyatt).

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | no | RRHH no tiene contacto directo con el portal huésped |
| Portal Operativo del sector (RRHH) | sí | Pantalla del Responsable de Nóminas: tareas del día, alertas bajas médicas, procesos nómina en curso, herramientas (Factorial, Sistema RED, FREMAP / ART) |
| Portal Supervisor/Jefe (HR Manager) | sí | Dashboard RRHH: masa salarial, KPIs (cobertura, PRL, vacaciones), alertas formaciones vencidas, inbox solicitudes (vacaciones, cambios turno, bajas), control de plantilla, 4 integraciones |
| Portal Dirección | sí | Resumen plantilla (total empleados, cobertura por dept, alertas PRL vencidas), coste de personal del mes |
| Portal Empleado (todos los sectores) | sí | Cada empleado ve su perfil: turno actual, vacaciones disponibles, recibos de sueldo, formaciones pendientes, solicitar licencia |
| **GX inbox (dual-fire)** | sí | Empleado de baja que genera vacante en sector crítico → GX notificado si la cobertura cae por debajo de un umbral (riesgo de impacto en servicio al huésped) |
| Portal Contador / Gestoría (M10) | sí | La gestoría externa ve las bases de cotización, puede aprobar los recibos de sueldo antes del envío y descarga los ficheros para el Sistema RED (ES) o SIJP/SIPA (AR). Ver §5 función #38. |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Alta de empleado | Registrar un nuevo empleado en el sistema: datos personales, cargo, departamento, contrato, inicio de relación laboral, salario base, número de Seguridad Social (ES) / CUIL (AR), cuenta bancaria para pago de haberes | HR Manager | Portal HR (Jefe) | Contratación aprobada | eventual | core | no |
| 2 | Baja de empleado | Gestionar la terminación del vínculo laboral: causa de baja (renuncia, despido, fin de contrato, jubilación), fecha, gestión de comunicación con la SS (ES: Sistema RED baja) / AFIP (AR), cálculo de liquidación final | HR Manager | Portal HR (Jefe) | Decisión de baja | eventual | core | no |
| 3 | Gestión del contrato laboral | Registrar el tipo de contrato del empleado: indefinido, temporal, a tiempo parcial, prácticas, formación (ES) / indeterminado, plazo fijo, temporada, pasantía (AR). Control de fecha de vencimiento y renovación | HR Manager | Portal HR (Jefe) | Alta + renovaciones | eventual | core | no |
| 4 | Fichaje de asistencia — QR / PIN | Empleado ficha entrada y salida mediante QR o PIN (módulo `@octo/qr-auth`). Registro de la hora exacta. Alerta si el empleado llega tarde más de X minutos | Empleado | Portal Empleado | inicio/fin turno | diaria (por turno) | core | no |
| 5 | Control de asistencia y ausencias | Monitoreo diario de quién está presente y quién falta. Clasificación de ausencias: justificada (baja médica, vacaciones, licencia), injustificada. Alerta al supervisor del sector si un empleado no fichó y no tiene ausencia registrada | HR Manager / Supervisores | Portal HR (Jefe) + Portal de cada sector | automático al inicio del turno si no hay fichaje | diaria | core | sí (ausencia injustificada en sector crítico → GX) |
| 6 | Gestión de turnos y horarios | Crear y publicar los cuadrantes de turnos por departamento: turno mañana, tarde, noche, partido, 24h (recepción). Reglas: respetar descanso mínimo entre turnos (12h ES por ET, 11h AR por CCT), días libres obligatorios, restricciones de guardia nocturna con adicional. Control de conflictos entre turnos | HR Manager / Jefes de dept | Portal HR + Portal de cada sector | manual semanal/mensual | semanal/mensual | core | no |
| 7 | Solicitud y aprobación de vacaciones | Empleado solicita período de vacaciones desde su portal. HR Manager (o supervisor del dept) aprueba o rechaza según disponibilidad. Sistema verifica que no quede el departamento sin cobertura mínima | Empleado (solicita) + HR Manager/Supervisor (aprueba) | Portal Empleado + Portal HR | solicitud del empleado | eventual | core | no |
| 8 | Control de días de vacaciones acumulados | Calcular los días de vacaciones devengados por cada empleado según su antigüedad y el convenio aplicable. ES: mínimo 30 días naturales (ET art. 38) + días por convenio. AR: 14 días (<5 años) → 21 días (5-10) → 28 días (10-20) → 35 días (>20) según Ley 20.744 art. 150 y CCT Gastronómicos | Sistema | Portal Empleado + Portal HR | automático (acumulación mensual) | mensual | core | no |
| 9 | Gestión de licencias especiales | Registrar y controlar licencias no vacaciones: licencia por matrimonio, nacimiento de hijo, fallecimiento familiar, mudanza, examen, cargo público (AR Ley 20.744 arts. 157-162), licencia por maternidad/paternidad, lactancia | HR Manager | Portal HR | evento del empleado | eventual | core | no |
| 10 | Gestión de horas extras | Registrar las horas trabajadas por encima de la jornada ordinaria. Clasificación: simple (25% recargo ES / 50% recargo AR), doble (100% si es feriado AR). Alerta si un empleado acumula demasiadas horas extras (riesgo burnout + riesgo compliance) | HR Manager / Sistema | Portal HR | automático por fichaje + validación manual | continua | core | no |
| 11 | Control de guardias nocturnas y adicionales (AR) | En CCT Gastronómicos AR (Nº 125/90 y CCT UTGRA), el trabajo nocturno (22:00-06:00 h) genera un adicional convencional. Sistema calcula automáticamente el adicional nocturno por hora sobre el sueldo base y lo envía a la nómina | Sistema / HR Manager | Portal HR | automático por fichaje | mensual | core (AR) | no |
| 12 | Nómina mensual — generación | Al cierre del mes, el sistema calcula la nómina de cada empleado: sueldo base + horas extras + guardias nocturnas + adicionales convencionales + pluses (asistencia, antigüedad, productividad) − deducciones (retenciones IRPF ES / retenciones Ganancias AR, cuota SS empleado ES / aportes jubilación + obra social + ART AR) | HR Manager / Resp. Nóminas | Portal HR + Admin CFO | fin de mes | mensual | core | no |
| 13 | Generación del recibo de sueldo | Crear el recibo de sueldo (payslip) por empleado con todos los conceptos detallados. En ES: firmado digitalmente y enviado al empleado por email (obligación legal). En AR: recibo digital conforme Decreto 407/2026 | HR Manager / Resp. Nóminas | Portal HR + Portal Empleado | tras cierre nómina | mensual | core | no |
| 14 | Envío de recibo de sueldo al empleado | Distribución del recibo de sueldo al empleado por email y/o disponible en su portal. Registro de acuse de recibo (el empleado confirma haberlo recibido). En AR el empleado tiene derecho a firmar la conformidad o hacer reservas en el recibo | Sistema | Portal Empleado | post-generación recibo | mensual | core | no |
| 15 | Integración con Factorial (ES) — nóminas | Sincronización de los datos de nómina (empleados, contratos, bases de cotización, horas, conceptos) hacia Factorial. Factorial ejecuta la liquidación y devuelve los recibos y los ficheros TC1/TC2 (Sistema RED) | Sistema | Portal HR + integraciones | mensual | mensual (ES) | importante (ES) | no |
| 16 | Sistema RED — altas, bajas y cotizaciones (ES) | Comunicación de altas y bajas de empleados a la TGSS mediante el Sistema RED (Remisión Electrónica de Documentos). Presentación mensual de las bases de cotización (ficheros FAN). Integrado con Factorial o directo | HR Manager / Resp. Nóminas | Portal HR | alta/baja empleado + mensual | por evento + mensual (ES) | core (ES) | no |
| 17 | Modelo 111 / 190 — retenciones IRPF trabajadores (ES) | Coordinar con Admin-CFO las retenciones de IRPF practicadas a cada empleado. Datos enviados por HR (tramo de retención por empleado) → Admin-CFO presenta el modelo 111 trimestral y el 190 anual. HR mantiene actualizados los datos de retención de cada empleado | HR Manager / Resp. Nóminas | Portal HR | trimestral (coordinado con Admin CFO) | trimestral + anual (ES) | core (ES) | no |
| 18 | FREMAP / Mutua accidentes laborales (ES) | Gestión de la relación con la mutua colaboradora con la SS (FREMAP u otra). Comunicación de accidentes de trabajo y enfermedades profesionales. Gestión de las bajas IT (Incapacidad Temporal) vía mutua. Seguimiento de los procesos | HR Manager | Portal HR | accidente o baja médica | eventual (ES) | core (ES) | no |
| 19 | Gestión de bajas por IT (Incapacidad Temporal — ES) | Cuando un empleado presenta un parte de baja médica (IT): (1) registrar en el sistema; (2) comunicar a la TGSS vía Sistema RED (parte confirmación o alta); (3) calcular el subsidio IT (60% de la base reguladora días 4-20, 75% a partir del día 21); (4) gestionar la cobertura del turno del empleado; (5) seguimiento del proceso hasta el alta médica | HR Manager | Portal HR | parte médico del empleado | eventual (ES) | core (ES) | sí (si baja en sector crítico → GX) |
| 20 | Gestión de bajas médicas (AR) | Cuando un empleado presenta certificado médico: (1) registrar en el sistema; (2) verificar si es enfermedad inculpable (Ley 20.744 arts. 208-213 — empleador paga el sueldo durante el período de conservación del empleo); (3) si es accidente de trabajo → notificar a la ART; (4) gestionar la cobertura del turno; (5) seguimiento hasta el alta | HR Manager | Portal HR | certificado médico | eventual (AR) | core (AR) | sí (si baja en sector crítico → GX) |
| 21 | ART — Aseguradora de Riesgos del Trabajo (AR) | Gestión de la relación con la ART del hotel. Denuncia de accidentes de trabajo con formulario de denuncia. Seguimiento del proceso de prestaciones médicas y económicas. Control de pagos a la ART (incluidos en F931). Comunicación de las condiciones de trabajo | HR Manager | Portal HR | accidente laboral | eventual (AR) | core (AR) | no |
| 22 | F931 — datos RRHH para AFIP (AR) | Preparar los datos de cada empleado para la declaración mensual F931: CUIL, categoría convencional, remuneración bruta, deducciones, obra social (OSECAC en gastronomía), ART. Estos datos son consumidos por Admin-CFO para presentar el F931 | HR Manager / Resp. Nóminas | Portal HR | fin de mes | mensual (AR) | core (AR) | no |
| 23 | Obra social — OSECAC (AR) | En el sector gastronómico/hotelero AR, la obra social obligatoria es OSECAC (Obra Social Empresas de Alimentación, Comercio, Almacenes). Gestión de afiliaciones de empleados, novedades (altas, bajas, cambio de adherentes), pago de las cuotas (incluido en F931) | HR Manager | Portal HR | alta/baja + mensual | por evento + mensual (AR) | core (AR) | no |
| 24 | Control del convenio colectivo (ES) — tablas salariales por provincia | El Convenio Colectivo de Hostelería ES 2026 tiene tablas salariales distintas por provincia (Barcelona, Madrid, Sevilla, etc.). El sistema tiene cargadas las tablas por provincia/categoría. Alerta si algún empleado tiene un salario por debajo del convenio de su provincia | Sistema / HR Manager | Portal HR | alta empleado + actualización anual convenio | continua (ES) | core (ES) | no |
| 25 | Control del CCT Gastronómicos / UTGRA (AR) | El Convenio Colectivo de Trabajo Nº 125/90 (Gastronómicos) y el CCT UTGRA (Unión Trabajadores Turismo, Hoteleros y Gastronómicos) regulan las condiciones laborales del sector AR. Sistema verifica: categorías convencionales, adicionales obligatorios, jornada máxima, horas nocturnas, pluriempleo (frecuente en gastronomía). Alerta si hay incumplimiento | Sistema / HR Manager | Portal HR | alta empleado + actualización paritaria | continua (AR) | core (AR) | no |
| 26 | Gestión de ERTEs (Expediente de Regulación Temporal de Empleo — ES) | Si el hotel atraviesa un período de baja actividad (temporada baja, crisis), puede activar un ERTE de reducción de jornada o suspensión. El sistema gestiona la documentación, la comunicación a la autoridad laboral, el control de las jornadas reducidas y la coordinación con el SEPE para las prestaciones de los trabajadores | HR Manager | Portal HR | decisión dirección | eventual (ES) | importante (ES) | no |
| 27 | Evaluación de desempeño | Proceso periódico (semestral o anual) de evaluación del empleado por su superior directo. El sistema gestiona el formulario de evaluación, el seguimiento, el histórico por empleado, y los planes de mejora derivados. Resultados alimentan decisiones de promoción y formación | HR Manager / Supervisores | Portal HR | manual (semestral/anual) | semestral/anual | importante | no |
| 28 | Gestión de selección y contratación | Publicar vacantes, recibir candidaturas, gestionar el proceso de selección (filtro CV, entrevistas, decisión), generar la oferta de trabajo, formalizar el contrato. Integrado con portales de empleo (LinkedIn, InfoJobs ES, Bumerán AR) vía ATS básico | HR Manager | Portal HR | vacante generada | eventual | importante | no |
| 29 | Onboarding del empleado nuevo | Protocolo de incorporación del nuevo empleado: (1) preparación del puesto de trabajo + accesos al sistema; (2) entrega de EPI (equipos de protección individual) si aplica; (3) formación inicial de PRL (en las primeras 24h por ley ES); (4) presentación al equipo; (5) checklist de onboarding con firma del empleado | HR Manager + Supervisores | Portal HR + Portal Empleado | alta del empleado | eventual | core | no |
| 30 | Offboarding del empleado | Protocolo de salida del empleado: (1) gestión documental (carta de baja o finiquito); (2) devolución de equipos/acreditaciones/llaves; (3) desactivación de accesos al sistema; (4) liquidación final de vacaciones pendientes + proporcional de pagas extras; (5) carta de recomendación si aplica; (6) encuesta de salida | HR Manager | Portal HR | baja del empleado | eventual | core | no |
| 31 | Liquidación final (finiquito/sueldo anual complementario) | Cálculo del finiquito del empleado al darse de baja: vacaciones no disfrutadas + proporcional de pagas extras (ES: normalmente 2 pagas extra en junio y diciembre; AR: aguinaldo SAC = Sueldo Anual Complementario en junio y diciembre) + indemnización si corresponde (despido improcedente ES / indemnización Ley 20.744 AR) | HR Manager / Resp. Nóminas | Portal HR | baja del empleado | eventual | core | no |
| 32 | PRL — Formación básica obligatoria (ES) | Gestionar que todo empleado reciba la formación básica de Prevención de Riesgos Laborales (PRL) obligatoria por Ley 31/1995 y el Reglamento de los Servicios de Prevención (RSP). Formación inicial en el momento de la incorporación (antes de 30 días). Registro de la formación con firma del empleado. Alerta cuando la formación está próxima a caducar | HR Manager | Portal HR | alta empleado + renovaciones | por alta + renovación | core (ES) | no |
| 33 | PRL — Formación específica por puesto (ES) | Formaciones específicas de PRL según el puesto: manejo de productos químicos (HK/Cocina), movimiento manual de cargas (Cocina/HK/Economato), uso de equipos de trabajo (Mantenimiento), trabajo en altura (Mantenimiento), pantallas de visualización (Admin/Recepción). Registro y control de vigencia por empleado y puesto | HR Manager | Portal HR | alta en puesto + renovaciones | por puesto + renovación (ES) | core (ES) | no |
| 34 | Reconocimientos médicos obligatorios (ES) | Gestionar los reconocimientos médicos periódicos obligatorios (Ley 31/1995 art. 22). Coordinados con el Servicio de Prevención Ajeno (SPA) o con FREMAP. Control de fecha del próximo reconocimiento por empleado. Alerta cuando un reconocimiento está vencido o próximo a vencer | HR Manager | Portal HR | alta empleado + anual | anual/periódico (ES) | core (ES) | no |
| 35 | Formación manipulación de alimentos (global) | Todo empleado que maneja alimentos (Cocina, F&B Servicio, Economato, desayunos HK) debe tener el carné/certificado de Manipulación de Alimentos vigente. Control de vigencia y alerta de caducidad. En ES: según normativa autonómica. En AR: habilitación municipal + SENASA | HR Manager | Portal HR | alta en puesto + renovación | por alta + renovación | core | no |
| 36 | Formación extinción de incendios / evacuación | Certificar que un porcentaje mínimo de la plantilla recibe formación en uso de extintores y protocolos de evacuación. En ES: obligatorio según PRL y normativa de protección civil. En AR: habilitaciones del Gobierno de la Ciudad / municipal. Registro por empleado | HR Manager | Portal HR | manual (anual o según plan) | anual | core | no |
| 37 | Formación primeros auxilios | Certifcar que hay empleados formados en primeros auxilios por turno. En ES: obligatorio si no hay botiquín a cargo de empresa médica. Registro del certificado. | HR Manager | Portal HR | manual | cada 2 años | importante | no |
| 38 | Plan de Igualdad (ES — si >50 trabajadores) | Si el hotel tiene más de 50 trabajadores en ES, está obligado a elaborar y registrar un Plan de Igualdad (Ley Orgánica 3/2007, Real Decreto 901/2020). El módulo gestiona: diagnóstico de situación, medidas, registro oficial en REGCON, seguimiento y renovación cada 4 años | HR Manager | Portal HR | automático cuando plantilla supera 50 | eventual (ES) | importante (ES) | no |
| 39 | Portal de gestoría / RRHH externo (M10) | Portal separado para la gestoría o asesoría laboral externa. Permite: ver las bases de cotización y nóminas del mes, descargar los ficheros para el Sistema RED (ES) / SIJP (AR), aprobar los recibos de sueldo antes del envío al empleado, configurar los conceptos convencionales (tablas salariales). Lectura + configuración sin acceso a operativa hotelera | Gestoría externa | Portal Gestoría (M10) | acceso permanente | continua | importante | no |
| 40 | Comunicación interna — tablón de anuncios | Espacio dentro del portal del empleado para comunicados del hotel: cambios de política, eventos internos, avisos de RRHH, etc. HR Manager publica; empleados consultan. Registro de lectura | HR Manager | Portal Empleado | manual | eventual | nice | no |
| 41 | Control de pluriempleo (AR) | En hotelería y gastronomía AR el pluriempleo es frecuente (un empleado tiene dos trabajos). El sistema registra si el empleado declara otro empleo (impacta en la retención de Ganancias y en las cuotas de obra social). Alerta si las horas totales declaradas superan el límite legal | HR Manager | Portal HR | alta empleado + declaración del empleado | por alta + novedad (AR) | importante (AR) | no |
| 42 | Control de categorías convencionales y escalafón | Todo empleado tiene una categoría convencional según el CCT/Convenio (ej: en CCT Gastronómicos AR: Ayudante de Cocina, Cocinero 1a, Jefe de Cocina, Jefe de Partida, etc.; en Convenio Hostelería ES: empleado de tipo A/B/C/D por categoría). El sistema verifica que el salario del empleado corresponde a su categoría convencional | HR Manager / Sistema | Portal HR | alta + actualización paritaria | continua | core | no |
| 43 | Generación del recibo de sueldo SAC / Aguinaldo (AR) | En AR, el Sueldo Anual Complementario (SAC) se liquida en dos cuotas: 30 de junio y 31 de diciembre. El sistema calcula el 50% del mejor salario del semestre y genera el recibo de SAC específico | HR Manager / Resp. Nóminas | Portal HR + Portal Empleado | 30 de junio + 31 de diciembre (AR) | semestral (AR) | core (AR) | no |
| 44 | Alerta de vencimiento de documentación | Sistema de alertas para documentación con caducidad: contratos temporales (próximos a vencer), reconocimientos médicos (caducados o próximos), formaciones PRL (caducadas), permisos de trabajo (empleados extranjeros en ES), habilitación manipulación alimentos (caducada) | Sistema | Portal HR (Jefe) + Portal Dirección | automático (X días antes de vencimiento) | continua | core | no |
| 45 | Dashboard de cobertura por departamento | Vista en tiempo real de la cobertura de cada departamento para el turno actual y el siguiente: quién está presente, quién faltó, si hay turnos sin cubrir, si algún departamento está por debajo del mínimo operativo | HR Manager | Portal HR (Jefe) | automático (actualiza con fichajes) | continua | core | sí (cobertura < mínimo en turno → GX) |

### Sub-flujos clave (pseudocódigo simple)

```
Función: "Alta de empleado nuevo en el sistema"
1. HR Manager crea el perfil del empleado: nombre, DNI/pasaporte, CUIL/NSS, fecha de nacimiento, dirección
2. HR Manager asigna: departamento, cargo, categoría convencional, contrato (tipo + fecha inicio + fecha fin si temporal)
3. HR Manager fija el salario: sueldo base conforme a tabla convencional (sistema valida que sea >= mínimo del convenio)
4. HR Manager asigna turno inicial
5. Sistema crea automáticamente las credenciales de acceso del empleado al portal
6. Sistema notifica al Jefe del departamento: "Nuevo empleado incorporado — revisar onboarding"
7. HR Manager genera la checklist de onboarding (entrega EPI, formación PRL inicial, reconocimiento médico si aplica)
8. Sistema comunica el alta a la TGSS vía Sistema RED (ES) / Sistema envía datos para F931 siguiente (AR)
9. Sistema programa las alertas: reconocimiento médico (anual), formación PRL (según tipo), vencimiento contrato si temporal
10. Empleado accede al portal por primera vez → completa su perfil → confirma sus datos con firma electrónica
```

```
Función: "Gestión de baja médica (IT) — ES"
1. Empleado presenta el parte de baja (médico de cabecera del SAS/SNS o FREMAP mutua)
2. HR Manager registra la baja en el sistema: tipo (enfermedad común, accidente no laboral, accidente laboral, enfermedad profesional), fecha inicio, médico
3. Sistema clasifica automáticamente según tipo:
   - Si es enfermedad común → gestionado por SAS/TGSS + mutua FREMAP
   - Si es accidente laboral → notificar a FREMAP (parte de accidente) + al INSS
4. Sistema comunica el parte de baja a TGSS vía Sistema RED (confirmación)
5. Sistema calcula el subsidio IT por días:
   - Días 1-3: a cargo del empleado (no hay subsidio)
   - Días 4-15: a cargo del empleador (60% de la base reguladora)
   - Días 16-20: a cargo del empleador (60%)
   - A partir del día 21: mutua/TGSS paga (75%)
6. Sistema bloquea el turno del empleado como "baja médica" y abre alerta de cobertura
7. HR Manager asigna cobertura del turno (otro empleado disponible o contratación temporal)
8. Sistema envía notificación al Jefe del departamento y a GX (si el dept queda en riesgo de cobertura)
9. Cada 7 días: sistema recuerda a HR Manager verificar si hay parte de continuación o alta
10. Alta médica: HR Manager registra la vuelta, desbloquea el turno, cierra el proceso
```

```
Función: "Cierre de nómina mensual (ES con Factorial)"
1. Día 25-28 del mes: HR Manager revisa el resumen de incidencias del mes: ausencias, horas extras, bajas IT, cambios de categoría, nuevas incorporaciones y bajas
2. HR Manager valida en el sistema las incidencias y genera el fichero de incidencias de nómina
3. Sistema sincroniza con Factorial: empleados, contratos, bases, conceptos, incidencias
4. Factorial ejecuta el cálculo de nómina y devuelve:
   - Recibos de sueldo por empleado (PDF)
   - Fichero TC1 (cotización a la SS)
   - Fichero TC2 (relación nominal de cotizantes)
   - Fichero SEPA (transferencias bancarias a empleados)
5. HR Manager + Resp. Nóminas revisan los recibos (muestra aleatoria o todos)
6. Si hay error → corregir incidencia → resincronizar con Factorial
7. Si OK → HR Manager aprueba la nómina
8. Sistema envía los datos de retenciones IRPF a Admin-CFO para el modelo 111
9. Sistema envía los datos de bases de cotización a Admin-CFO para el F931/TC1 (integrado en ES con Sistema RED)
10. Sistema notifica a la gestoría externa (M10) para su revisión y aprobación
11. Gestoría aprueba los recibos en el Portal M10
12. Sistema distribuye los recibos a los empleados por email + portal
13. Sistema ejecuta las transferencias bancarias (SEPA XML) vía banco
```

```
Función: "Control de formaciones PRL — alerta y seguimiento (ES)"
1. Sistema mantiene para cada empleado el registro de formaciones con fecha, tipo y vigencia:
   - PRL básica (40h, vigencia sin caducidad pero recomendada renovación cada 5 años)
   - PRL específica por puesto (variable por puesto)
   - Manipulación de alimentos (3 años por normativa autonómica promedio)
   - Incendios/evacuación (anual)
   - Primeros auxilios (cada 2 años)
2. Sistema genera alerta 60 días antes del vencimiento: "X empleados tienen formación Y venciendo en 60 días"
3. HR Manager recibe alerta en su dashboard con la lista de empleados afectados
4. HR Manager programa la formación (proveedor externo, online o in-company)
5. Tras completar la formación: HR Manager registra la asistencia + sube el certificado/acta de formación
6. Sistema actualiza la fecha de vigencia y cierra la alerta
7. Si una formación caducó sin renovar: alerta roja en el dashboard del HR Manager + en el Portal de Dirección
8. Alerta roja equivale a riesgo de incumplimiento Ley 31/1995 (sanción ITSS inspección laboral)
```

```
Función: "Liquidación final — Offboarding del empleado (AR)"
1. HR Manager registra la baja con causa: renuncia / despido sin justa causa / despido con justa causa / fin de contrato / jubilación
2. Sistema calcula la liquidación final:
   a. Vacaciones no disfrutadas (días devengados − días tomados × valor día)
   b. Proporcional SAC del semestre en curso (semanas trabajadas / 26 × mejor salario semestral / 2)
   c. Indemnización por antigüedad si aplica (Ley 20.744 art. 245: 1 mes por año de servicio, o fracción > 3 meses, tomando el mejor salario del último año como base, con tope convencional)
   d. Preaviso no otorgado si aplica
3. HR Manager revisa el cálculo y lo aprueba
4. Sistema genera el recibo de sueldo final (recibo "liquidación final") con firma del empleador
5. Empleado recibe el recibo → puede firmar conformidad o interponer reservas
6. HR Manager registra la baja en el sistema → desactiva accesos del empleado
7. Sistema notifica a Admin-CFO la liquidación para el pago y el asiento contable
8. Sistema comunica la baja a AFIP (vía F931 del mes correspondiente)
9. HR Manager genera la DDJJ de baja ante OSECAC y ART
10. Empleado devuelve equipos y acreditaciones → HR Manager confirma en checklist de offboarding
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `employee` | sí | no | organization_id, id, organization_id, first_name, last_name, national_id (DNI/pasaporte), country_tax_id (CUIL/NSS), birth_date, hire_date, termination_date, department_id, position_id, status (active/on_leave/terminated), bank_account, email | custom_fields JSONB | → `contract`, → `shift`, → `attendance`, → `payroll`, → `leave_request`, → `training`, → `evaluation` |
| `contract` | sí | no | organization_id, id, employee_id, organization_id, type (indefinido/temporal/parcial/temporada/pasantia), start_date, end_date, salary_base, currency, collective_agreement_code (ES: hosteleria_<provincia> / AR: CCT-125-90 / CCT-UTGRA), category_code, working_hours_week, country | custom_fields JSONB | → `employee` |
| `shift` | sí | no | organization_id, id, organization_id, employee_id, department_id, date, start_time, end_time, type (morning/afternoon/night/full/split), status (scheduled/confirmed/completed/missed/covered), covered_by (employee_id si aplica) | custom_fields JSONB | → `employee`, → `attendance` |
| `attendance` | sí | no | organization_id, id, organization_id, employee_id, shift_id, clock_in, clock_out, total_minutes, overtime_minutes, night_minutes (AR — para adicional nocturno), status (present/absent_justified/absent_unjustified), notes | custom_fields JSONB | → `employee`, → `shift` |
| `payroll` | sí | no | organization_id, id, organization_id, period_month, period_year, status (draft/approved/paid), total_gross, total_deductions, total_net, employee_count, approved_by, approved_at | custom_fields JSONB | → `payslip`, → `financial_period` (Admin-CFO) |
| `payslip` | sí | no | organization_id, id, organization_id, payroll_id, employee_id, period_month, period_year, gross_salary, deductions JSONB (conceptos detallados: IRPF/Ganancias, SS empleado/aportes, otros), net_salary, payment_date, status (draft/sent/confirmed), signature_employee, signature_employer | custom_fields JSONB | → `payroll`, → `employee` |
| `leave_request` | sí | no | organization_id, id, organization_id, employee_id, type (vacation/sick/maternity/paternity/special/unjustified), start_date, end_date, days, reason, status (pending/approved/rejected/cancelled), approved_by, approved_at | custom_fields JSONB | → `employee` |
| `training` | sí | no | organization_id, id, organization_id, employee_id, type (prl_basic/prl_specific/food_handling/fire/first_aid/convention/other), date, expiry_date, provider, certificate_url, status (pending/completed/expired), notes | custom_fields JSONB | → `employee` |
| `evaluation` | sí | no | organization_id, id, organization_id, employee_id, evaluator_id, period, score (numérico o escala), strengths, areas_improvement, goals_next_period, status (draft/completed/acknowledged), completed_at | custom_fields JSONB | → `employee` |
| `position` | sí | no | organization_id, id, organization_id, department_id, title_es_ES, title_es_AR, title_en, hierarchy_level, min_salary (por convenio), max_salary | custom_fields JSONB | → `employee`, → `department` |

**Diagrama ER simplificado:**

```
employee ──────< contract (histórico de contratos)
    │
    ├──< shift ──< attendance (fichajes por turno)
    │
    ├──< payslip ──> payroll (nómina del mes)
    │
    ├──< leave_request (vacaciones, bajas)
    │
    ├──< training (formaciones y certificados)
    │
    └──< evaluation (evaluaciones periódicas)

position ──> department (sector/módulo)
  └──────> employee (cargo actual)
```

---

## 7. Máquinas de estado

```
employee:
  ONBOARDING ──setup_completo──> ACTIVE
  ACTIVE ──baja_temporal──> ON_LEAVE (IT, maternidad, ERTE)
  ON_LEAVE ──alta_medica/retorno──> ACTIVE
  ACTIVE ──proceso_baja──> TERMINATION_PROCESS
  TERMINATION_PROCESS ──liquidacion_final_OK──> TERMINATED
  TERMINATED (estado final, solo lectura)

  Transiciones autorizadas por rol:
  - HR Manager: todas
  - Sistema: ACTIVE → ON_LEAVE (automático cuando se registra baja médica)
  - Sistema: ON_LEAVE → ACTIVE (automático cuando se registra alta médica)

shift:
  SCHEDULED ──confirmado──> CONFIRMED
  CONFIRMED ──empleado_ficha_entrada──> IN_PROGRESS
  IN_PROGRESS ──empleado_ficha_salida──> COMPLETED
  CONFIRMED ──empleado_no_ficha──> MISSED
  MISSED ──se_cubre──> COVERED
  SCHEDULED ──HR_cancela──> CANCELLED

  Reglas:
  - Solo HR Manager o Jefe del dept puede cancelar un turno SCHEDULED
  - Un turno MISSED activa alerta de cobertura en el dept

leave_request:
  PENDING ──supervisor_aprueba──> APPROVED
  PENDING ──supervisor_rechaza──> REJECTED
  APPROVED ──empleado_cancela_antes──> CANCELLED
  APPROVED ──período_completado──> COMPLETED
  
  Reglas:
  - No se puede aprobar si el dept queda sin cobertura mínima
  - HR Manager puede aprobar/rechazar cualquier solicitud
  - El supervisor del dept puede aprobar/rechazar las de su dept

training:
  PENDING ──empleado_completa──> COMPLETED
  COMPLETED ──fecha_expirada──> EXPIRED
  EXPIRED ──renovacion_registrada──> COMPLETED (nueva entrada con nueva fecha)

  Sistema genera alertas:
  - 60 días antes del vencimiento: ALERTA_AMARILLA
  - 30 días antes: ALERTA_NARANJA
  - Fecha pasada sin renovar: ALERTA_ROJA
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| **Sistema RED (TGSS)** | Comunicación SS ES — altas, bajas, cotizaciones | outbound | Obligatoria (ES) | Altas y bajas de trabajadores en la TGSS. Presentación mensual FAN (fichero cotizaciones). Requiere usuario RED y certificado digital. |
| **FREMAP / Mutua accidentes** | Mutua colaboradora SS ES | bidireccional | Obligatoria si se elige FREMAP (ES) | Comunicación de partes de baja/alta IT. Accidentes de trabajo. Seguimiento de prestaciones. |
| **Factorial** | Software nóminas (ES) | bidireccional | Recomendada (ES) | Opción A ES. Bravas envía empleados + contratos + incidencias → Factorial calcula nómina + devuelve recibos + ficheros SEPA + TC1/TC2. |
| **A3 Nóminas / Bejerman (AR)** | Software nóminas AR | bidireccional | Recomendada (AR) | Alternativa AR a Factorial. Exportación de datos en formato compatible. Muchas gestorías AR usan A3. |
| **AFIP — SIJP / SIPA** | Registro empleados AR | outbound | Obligatoria (AR) | Alta y baja de trabajadores en el SIPA (Sistema Integrado Previsional Argentino). Integrado con F931. |
| **OSECAC** | Obra social gastronómica AR | outbound | Obligatoria (AR sector gastronomía) | Afiliación de empleados, novedades mensuales, pago de cuotas (vía F931). |
| **ART (proveedor del hotel)** | Aseguradora Riesgos Trabajo AR | bidireccional | Obligatoria (AR) | Denuncia de accidentes de trabajo. Seguimiento de prestaciones. Control de pagos. |
| **GX Event Bus** | Event bus interno | outbound | Core | Publica: `employee.absence.unplanned`, `department.coverage.below_minimum`, `training.expired`. GX inbox los recibe para seguimiento de impacto en servicio. |
| **QR Auth / Timekeeping** | Fichaje QR interno | bidireccional | Core | `@octo/qr-auth` gestiona el fichaje. RRHH consume los datos de asistencia. |
| **REGCON (ES)** | Registro oficial de Planes de Igualdad | outbound | Obligatoria si >50 trabajadores (ES) | Registro del Plan de Igualdad en el Registro de Convenios y Acuerdos Colectivos de Trabajo. |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Alta / baja empleado | ✓ | | | | Lógica idéntica; comunicación a la autoridad laboral varía |
| Comunicación alta/baja a autoridad laboral | | | | ✓ | ES: Sistema RED (TGSS). AR: AFIP SIJP (vía F931 del mes). |
| Control de asistencia y fichaje | ✓ | | | | Idéntico |
| Gestión de turnos y horarios | ✓ | | | | Idéntico; las reglas de descanso mínimo varían (11h AR CCT / 12h ES ET) |
| Descanso mínimo entre turnos | | | | ✓ | ES: 12h (ET art. 34.3). AR: 11h (CCT Gastronómicos). |
| Vacaciones y días acumulados | | | | ✓ | ES: 30 días naturales mínimo por ET. AR: 14→21→28→35 días según antigüedad (Ley 20.744 art. 150). |
| SAC / Aguinaldo | | ✓ | | | Solo AR. Dos cuotas anuales (junio/diciembre). En ES hay 2 pagas extras pero no se llaman SAC. |
| Pagas extras (ES) | | | ✓ | | ES: normalmente 2 pagas extras (junio y navidad) por ET o convenio. Proporcional en la liquidación. |
| Nómina mensual — cálculo | ✓ | | | | La lógica de conceptos varía (AR: adicional nocturno CCT / ES: plus convenio) pero la estructura de cálculo es similar |
| Adicional nocturno convencional | | ✓ | | | CCT Gastronómicos AR establece adicional sobre sueldo por horas 22:00-06:00. En ES depende del convenio provincial. |
| Recibo de sueldo digital | | ✓ | | | Decreto 407/2026 AR hace obligatorio el recibo digital. En ES también es normal pero la norma es distinta. |
| Integración con Factorial | | | ✓ | | Opción A ES. En AR se usa A3/Bejerman. |
| Sistema RED (TGSS) | | | ✓ | | Solo ES. Comunicación de altas, bajas, cotizaciones. |
| Modelos 111 / 190 (IRPF) | | | ✓ | | Solo ES. Coordinado con Admin-CFO. |
| F931 (aportes patronales AFIP) | | ✓ | | | Solo AR. Coordina con Admin-CFO para la presentación. |
| OSECAC (obra social gastronomía) | | ✓ | | | Solo AR sector gastronómico-hotelero. En ES la SS cubre el equivalente. |
| ART (accidentes trabajo) | | ✓ | | | Solo AR. En ES es FREMAP u otra mutua. |
| FREMAP / Mutua accidentes | | | ✓ | | Solo ES. En AR es ART. |
| Bajas IT — cálculo del subsidio | | | ✓ | | ES: fórmula TGSS (% de base reguladora). AR: empleador paga sueldo completo durante período de conservación (arts. 208-213 Ley 20.744). |
| Período de conservación del empleo (AR) | | ✓ | | | Ley 20.744 arts. 208-213: empleado en enfermedad inculpable tiene derecho a conservar el empleo 1-3 meses (según antigüedad). |
| PRL — formaciones obligatorias | | | ✓ | | Ley 31/1995 ES es específica. En AR la norma es Ley 19.587 (Seguridad e Higiene) + Ley 24.557 (ART). Las formaciones son similares pero el marco legal difiere. |
| Reconocimientos médicos periódicos | | | ✓ | | Obligatorios en ES (Ley 31/1995 art. 22). En AR los realiza la ART (examen preocupacional + periódicos si aplica). |
| Plan de Igualdad | | | ✓ | | Obligatorio ES si >50 trabajadores. Sin equivalente directo en AR a nivel empresa privada. |
| ERTEs | | | ✓ | | Solo ES. Expediente de Regulación Temporal de Empleo. En AR existe la "suspensión concertada" (art. 223 bis Ley 20.744) como figura similar pero mucho menos estructurada. |
| CCT Gastronómicos / UTGRA | | ✓ | | | Solo AR. El convenio colectivo aplicable al hotel en AR. |
| Convenio Hostelería ES por provincia | | | ✓ | | Solo ES. Tablas salariales distintas por provincia (Barcelona, Madrid, etc.). |
| Pluriempleo (declaración y control) | | ✓ | | | Frecuente en gastronomía AR. Control de impacto en Ganancias y obra social. |
| Evaluación de desempeño | ✓ | | | | Idéntico |
| Onboarding / Offboarding | ✓ | | | | La documentación varía pero el proceso es similar |
| Manipulación de alimentos | ✓ | | | | Obligatorio en ambos. Normativa diferente (autonómica ES / municipal + SENASA AR). |
| Incendios / evacuación formación | ✓ | | | | Obligatorio en ambos. |
| Portal M10 gestoría externa | ✓ | | | | Funciona en ambos; el contenido del portal se adapta al país. |

**Notas críticas §9:**

> **AR — CCT Gastronómicos Nº 125/90 y CCT UTGRA.** Estos son los convenios colectivos que rigen para los trabajadores hoteleros y gastronómicos en Argentina. Las paritarias se negocian anualmente (o más frecuentemente en contextos inflacionarios) y actualizan las tablas salariales. El sistema debe permitir actualizar las tablas salariales del CCT sin requerir deploy (tabla de configuración editable por el HR Manager o la gestoría en el Portal M10). El incumplimiento del CCT puede resultar en multas y reclamaciones de los empleados.

> **ES — Convenio Colectivo de Hostelería por provincia.** A diferencia de AR donde hay un CCT nacional, en España cada provincia tiene su propio convenio de hostelería con tablas salariales distintas (el de Barcelona paga más que el de Murcia, por ejemplo). Cuando se da de alta un hotel en ES, el sistema debe preguntar en qué provincia opera para cargar las tablas correctas. Si opera en más de una provincia (cadena), debe poder gestionar cada establecimiento con su convenio propio.

> **AR — OSECAC es LA obra social del sector.** En el sector hotelero-gastronómico argentino, la obra social de encuadramiento es OSECAC (Obra Social Empresas de Alimentación, Comercio, Almacenes). Aunque los empleados pueden solicitar la derivación a otra OS, el empleador cotiza a OSECAC por defecto. El sistema debe generar la declaración de novedades mensual para OSECAC.

> **ES — PRL es obligación legal con sanciones reales.** La Ley 31/1995 y el Real Decreto 39/1997 (Reglamento de los Servicios de Prevención) establecen obligaciones muy concretas con multas de hasta 820.000€ (infracciones muy graves). Un hotel con 1 empleado sin la formación PRL al día está en incumplimiento legal. El módulo RRHH de Bravas debe hacer imposible "olvidar" las formaciones PRL — deben ser alertas no cerrables hasta que se resuelvan.

---

## 10. Slots de extensión (crítico para N2 + multi-tenant)

### 10.1 Campos custom por entidad

```
employee.custom_fields: JSONB
  → cada tenant puede agregar: "talla_uniforme", "idiomas_que_habla", "certificaciones_adicionales", "numero_empleado_interno"

contract.custom_fields: JSONB
  → cada tenant puede agregar: "referencia_expediente_interno", "clausulas_especiales"

training.custom_fields: JSONB
  → cada tenant puede agregar: "proveedor_formacion", "coste_formacion", "nro_certificado_externo"

evaluation.custom_fields: JSONB
  → cada tenant puede agregar: "objetivos_kvp", "competencias_evaluadas", "bono_objetivo"
```

### 10.2 Workflows custom

Hooks disponibles:
- `pre_onboarding` — tenant puede agregar pasos extra al checklist de incorporación (ej: firma de NDA, entrega de uniforme, check de salud específico del puesto)
- `post_hire` — tenant puede disparar notificación a IT para crear cuenta, a HK para preparar uniforme
- `pre_payroll_close` — tenant puede agregar validaciones antes de cerrar la nómina (ej: que todos los turnos estén confirmados)
- `post_payroll_close` — tenant puede disparar exportación automática a su ERP propio
- `pre_termination` — tenant puede exigir checklist de offboarding antes de permitir la baja
- `post_training_expired` — tenant puede escalar la alerta a un nivel superior si la formación lleva más de 30 días vencida

### 10.3 Integraciones per-tenant

Proveedores de nóminas activables:
- Factorial (default ES)
- A3 Nóminas (ES/AR alternativa)
- Bejerman (AR)
- Talentia (ES — cadenas)
- Exportación CSV/JSON genérica

Plataformas de formación (LMS) activables:
- Moodle
- TalentLMS
- LinkedIn Learning (corporativo)
- Exportación manual (sube acta en PDF)

Portales de empleo (ATS básico):
- LinkedIn Jobs (ES/AR)
- InfoJobs (ES)
- Bumerán/ZonaJobs (AR)
- Computrabajo (AR/LATAM)

### 10.4 Branding/UI per-tenant

- Nombre del módulo: "Recursos Humanos" vs "People & Culture" vs "Personas" (en cadenas premium) — customizable
- Logo del hotel en los recibos de sueldo
- Cabecera de recibo de sueldo personalizada (razón social, CUIT/CIF, domicilio fiscal)
- Colores del módulo RRHH (default: `--lib-hr-dept: #B45309` bronce)
- Nomenclatura de roles (ej: "mucama" → "camarera de habitaciones" → custom)

### 10.5 Idiomas

- Diccionario i18n del módulo con 3 locales: es-ES, es-AR, en
- Tenant puede sobrescribir: "Mucama" → "Camarera de habitaciones", "Mozo" → "Camarero", "PRL" → "Seguridad e Higiene"

---

## 11. Nomenclatura i18n (tabla de términos del sector)

| Término técnico | es-ES default | es-AR default | en default | Customizable por tenant |
|---|---|---|---|---|
| `hr_manager` | "Director/a de RRHH" | "Gerente de RRHH" | "HR Manager / People & Culture Director" | ✓ |
| `payroll_specialist` | "Responsable de Nóminas" | "Responsable de Sueldos" | "Payroll Specialist" | ✓ |
| `department` | "Departamento" | "Departamento" | "Department" | ✓ |
| `payslip` | "Nómina" | "Recibo de Sueldo" | "Payslip" | ✓ |
| `payroll` | "Nómina mensual" | "Liquidación de sueldos" | "Monthly Payroll" | ✓ |
| `final_settlement` | "Finiquito" | "Liquidación final" | "Final Settlement" | no |
| `holiday_pay` | "Paga extra" | "SAC (Aguinaldo)" | "Holiday Pay / Bonus" | no |
| `overtime` | "Horas extraordinarias" | "Horas extras" | "Overtime" | ✓ |
| `night_shift_bonus` | "Plus noche (convenio)" | "Adicional nocturno (CCT)" | "Night Shift Bonus" | no |
| `leave_vacation` | "Vacaciones" | "Vacaciones" | "Annual Leave / Vacation" | ✓ |
| `sick_leave` | "Baja por IT (Incapacidad Temporal)" | "Baja médica / Enfermedad inculpable" | "Sick Leave" | no |
| `maternity_leave` | "Baja por maternidad" | "Licencia por maternidad" | "Maternity Leave" | ✓ |
| `work_accident` | "Accidente de trabajo" | "Accidente de trabajo (ART)" | "Work Accident" | no |
| `collective_agreement` | "Convenio Colectivo (hostelería provincial)" | "Convenio Colectivo de Trabajo (CCT Gastronómicos)" | "Collective Bargaining Agreement (CBA)" | no |
| `prl` | "PRL (Prevención de Riesgos Laborales)" | "Seguridad e Higiene (SyH)" | "Occupational Health & Safety (OHS)" | no |
| `social_security_es` | "Seguridad Social (SS)" | N/A | "Social Security (Spain)" | no |
| `social_security_ar` | N/A | "AFIP / SIPA / ANSES" | "Social Security (Argentina)" | no |
| `health_insurance_ar` | N/A | "Obra Social (OSECAC)" | "Health Insurance (Argentina)" | no |
| `work_accident_insurance_ar` | N/A | "ART (Aseguradora de Riesgos del Trabajo)" | "Workers' Compensation Insurance (AR)" | no |
| `work_accident_insurance_es` | "Mutua accidentes (FREMAP u otra)" | N/A | "Work Accident Insurance (Spain)" | no |
| `temporary_employment_regulation` | "ERTE" | "Suspensión concertada (art. 223 bis)" | "Temporary Layoff / Furlough" | no |
| `onboarding` | "Incorporación" | "Ingreso / Onboarding" | "Onboarding" | ✓ |
| `offboarding` | "Desvinculación / Baja" | "Egreso / Baja" | "Offboarding" | ✓ |
| `housekeeper_role` | "Camarera de pisos" | "Mucama / Camarera" | "Room Attendant / Housekeeper" | ✓ |
| `waiter_role` | "Camarero" | "Mozo / Camarero" | "Waiter / Server" | ✓ |
| `cook_role` | "Cocinero/a" | "Cocinero/a" | "Cook" | ✓ |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| **Estatuto de los Trabajadores (Real Decreto Legislativo 2/2015)** | ES | Marco general de los derechos laborales en ES. Regula jornada máxima (40h/semana), vacaciones (30 días naturales), pagas extras, preaviso de baja, etc. |
| **Convenio Colectivo de Hostelería ES 2026 (por provincia)** | ES | Tablas salariales, categorías, adicionales, jornadas específicas. Tablas distintas por provincia. El módulo debe soportar multiconvenio por establecimiento. |
| **Ley 31/1995 de Prevención de Riesgos Laborales** | ES | Obligación de formación PRL, evaluación de riesgos, reconocimientos médicos, coordinación con mutua. Incumplimiento: sanciones ITSS hasta 820.000€. |
| **Real Decreto 39/1997 — Reglamento Servicios de Prevención** | ES | Desarrolla la Ley 31/1995. Obliga a designar servicio de prevención (propio o ajeno). |
| **Ley Orgánica 3/2007 — Igualdad efectiva mujeres y hombres** | ES | Plan de Igualdad obligatorio si >50 trabajadores. Registro en REGCON. |
| **Real Decreto 901/2020 — Planes de Igualdad** | ES | Regula el contenido y registro del Plan de Igualdad. |
| **Sistema RED — Reglamento TGSS** | ES | Obligación de comunicar altas/bajas y cotizaciones vía Sistema RED. Certificado digital obligatorio. |
| **Ley 20.744 — Contrato de Trabajo (AR)** | AR | Marco general del derecho laboral AR. Vacaciones (arts. 150-157), licencias (arts. 158-162), enfermedad inculpable (arts. 208-213), indemnizaciones (art. 245), etc. |
| **CCT Nº 125/90 — Gastronómicos (AR)** | AR | Convenio colectivo del sector gastronómico. Aplica a hoteles con servicio de alimentos. Categorías, adicionales, jornadas, horas nocturnas. |
| **CCT UTGRA (AR)** | AR | Convenio de la Unión Trabajadores Turismo, Hoteleros y Gastronómicos. Puede coexistir o complementar el CCT 125/90 según el establecimiento. |
| **Ley 24.241 — SIPA (Jubilación AR)** | AR | Sistema Integrado Previsional Argentino. Aportes del trabajador (11%) y contribuciones del empleador (23,5%) sobre la remuneración. |
| **Ley 23.660 / 23.661 — Obras Sociales (AR)** | AR | Marco legal de obras sociales. OSECAC es la OS de encuadramiento del sector gastronomía. |
| **Ley 24.557 — ART (Riesgos del Trabajo — AR)** | AR | Obligatoriedad de contratar una ART. Procedimiento de accidentes de trabajo y enfermedades profesionales. Cobertura médica y prestaciones dinerarias. |
| **Ley 19.587 — Higiene y Seguridad en el Trabajo (AR)** | AR | Marco de Seguridad e Higiene en AR. Equivalente a la PRL española aunque con menor desarrollo reglamentario. |
| **Decreto 407/2026 — Recibo de Sueldo Digital (AR)** | AR | Obligatoriedad del recibo de sueldo en formato digital desde 2026. Pendiente resolución final sobre formato y firma. |
| **Reglamento (UE) 2016/679 — RGPD** | UE/ES | Los datos laborales del empleado (nóminas, datos de salud, reconocimientos médicos) son datos especialmente protegidos. Base legal: contrato laboral. Deber de información. Retención máxima según obligación legal (4 años a efectos de SS; 10 años nóminas AR). |
| **Ley 25.326 — Protección de Datos (AR)** | AR | Equivalente AR del RGPD. Datos laborales sensibles (médicos, sindicales) requieren tratamiento cuidadoso. |
| **Normativa de manipulación de alimentos** | ES + AR | ES: autonómica (ej: Decreto catalán, madrileño). AR: municipal + SENASA. Obligatorio para todo empleado que trabaje con alimentos. El carné tiene vigencia (variable por comunidad/municipio). |

---

## 13. Dependencias del lifecycle del módulo

**Qué pasa si el módulo se ACTIVA después del hotel ya corriendo:**
- Datos iniciales requeridos (seed): (1) importar la plantilla actual de empleados (CSV con datos básicos); (2) configurar el convenio colectivo del tenant (ES: seleccionar provincia → se cargan tablas salariales; AR: seleccionar CCT 125/90 u otro); (3) configurar la categoría convencional de cada empleado; (4) configurar las integraciones externas (Factorial, Sistema RED, ART/FREMAP); (5) configurar el Portal M10 si hay gestoría externa.
- Flujo de setup inicial: wizard RRHH en el onboarding: (1) país, (2) provinciaSi ES, (3) convenio colectivo, (4) importar empleados, (5) activar/desactivar integraciones.
- Los fichajes históricos (si el hotel ya tenía fichaje QR activo) se retroactivamente asocian a los empleados importados.

**Qué pasa si el módulo se DESACTIVA:**
- Los datos de empleados, nóminas, recibos de sueldo y formaciones NO se pueden eliminar. Son documentos legales con obligación de conservación (10 años nóminas, 4 años datos SS en ES; 10 años en AR).
- Otros módulos afectados: sin RRHH no hay gestión de turnos → el fichaje QR queda sin respaldo. Los departamentos no saben quién tiene que trabajar.
- En la práctica, el módulo RRHH no se desactiva si el hotel está operando. Solo en cierre definitivo del hotel.
- Procedimiento de archivo: exportar toda la información a CSV/PDF + exportar nóminas y recibos en formato legal.

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| **Cobertura de turnos %** | Turnos cubiertos sin incidencia / Turnos totales programados × 100 | Diaria | Portal HR + Portal Dirección | Target: >95%. <90% = alerta de gestión. |
| **Rotación de personal %** | Nº bajas voluntarias año / Plantilla media × 100 | Mensual/Anual | Portal HR + Portal Dirección | Sector hotelero: 15-30% anual (alta por naturaleza estacional). >40% = problema de clima laboral. |
| **Coste de personal / Revenue %** | (Coste total personal mes) / (Revenue total mes) × 100 | Mensual | Portal HR + Admin CFO + Portal Dirección | Benchmark: 30-35% urbano. >40% = muy alto. <25% = puede ser sub-staffing. |
| **Masa salarial mensual** | Suma nóminas brutas del mes | Mensual | Portal HR (Jefe) + Portal Dirección | Referencia interna por budget del tenant. |
| **Horas extras / Horas ordinarias %** | Horas extras mes / Horas ordinarias mes × 100 | Mensual | Portal HR | Target: <5%. >10% = problema de planning de turnos. >20% = riesgo legal y de burnout. |
| **Formaciones PRL vencidas** | Nº empleados con alguna formación PRL en estado EXPIRED | Continua | Portal HR + Portal Dirección | Target: 0. Cualquier formación vencida = incumplimiento legal ES (Ley 31/1995). |
| **Reconocimientos médicos vencidos** | Nº empleados con reconocimiento médico en estado EXPIRED | Continua | Portal HR | Target: 0 (ES). |
| **Absentismo laboral %** | Días de ausencia (justificadas + injustificadas) / Días trabajados totales × 100 | Mensual | Portal HR | Benchmark: <4%. >8% = problema. |
| **Bajas IT activas** | Nº empleados actualmente de baja por IT / enfermedad | Diaria | Portal HR | Variable. Alta en invierno. >5% de la plantilla simultáneo = situación crítica de cobertura. |
| **Tiempo promedio de cobertura de vacante** | Días desde la vacante generada hasta nuevo empleado activo | Eventual | Portal HR | Benchmark: <30 días para operativos; <60 días para mandos. |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol que la ve | Función principal | Mockup existente |
|---|---|---|---|---|
| `/hr/dashboard` | Supervisor/Jefe | HR Manager | Dashboard RRHH: masa salarial (widget navy), 4 KPIs (cobertura, PRL, rotación, horas extras), alertas formaciones vencidas, inbox solicitudes (vacaciones, cambios turno, bajas, PRL), plantilla total + 3 estados (activos/baja/pendientes) | sí — `mockup/v2.5/empleado-jefe-rrhh.html` |
| `/hr/empleados` | Supervisor/Jefe | HR Manager | Lista de empleados con filtros (dept, estado, contrato). Acceso al perfil de cada uno | no |
| `/hr/empleado/:id` | Supervisor/Jefe | HR Manager | Perfil completo del empleado: datos personales, contrato, turnos, vacaciones, nóminas, formaciones, evaluaciones | no |
| `/hr/empleado/:id/perfil` | Portal Empleado | Empleado (el suyo propio) | El empleado ve su propio perfil: turno actual, vacaciones disponibles, formaciones pendientes, últimos recibos de sueldo | no |
| `/hr/turnos` | Supervisor/Jefe | HR Manager + Jefes de dept | Cuadrante de turnos: vista semanal/mensual por departamento. Crear, modificar, publicar turnos | no |
| `/hr/asistencia` | Supervisor/Jefe | HR Manager | Control de asistencia del día: quién está, quién faltó, alertas de ausencia sin justificar | no |
| `/hr/solicitudes` | Supervisor/Jefe | HR Manager | Inbox de solicitudes: vacaciones, cambios de turno, licencias especiales, bajas. Aprobar/rechazar | sí — `mockup/v2.5/empleado-jefe-rrhh.html` (sección solicitudes) |
| `/hr/nominas` | Supervisor/Jefe | HR Manager | Proceso de nómina: lista de empleados, estado del proceso (en curso / aprobada / pagada), acceso a Factorial | sí — `mockup/v2.5/empleado-jefe-rrhh.html` (referencia integraciones) |
| `/hr/nomina/:empleado_id/recibo` | Portal Empleado | Empleado | El empleado descarga su recibo de sueldo del mes | no |
| `/hr/formaciones` | Supervisor/Jefe | HR Manager | Control de formaciones: lista de empleados × formación, estado (OK/vencido/próximo), alertas, registro de nueva formación | sí — `mockup/v2.5/empleado-jefe-rrhh.html` (sección formación convenio) |
| `/hr/operativo` | Operativo | Resp. Nóminas | Pantalla del Responsable Nóminas: tareas del día (baja médica urgente, nómina en curso, cita PRL, alta nuevo empleado), herramientas rápidas (Factorial, Sistema RED, FREMAP, Convenio ES), reporte a HR Manager | sí — `mockup/v2.5/empleado-rrhh.html` |
| `/hr/cobertura` | Supervisor/Jefe | HR Manager | Vista de cobertura en tiempo real por departamento y turno (actual + siguiente) | no |
| `/hr/prl` | Supervisor/Jefe | HR Manager | Panel PRL: reconocimientos médicos (vencidos/próximos), formaciones PRL por empleado, coordinación con FREMAP/ART | no |
| `/hr/convenio` | Supervisor/Jefe | HR Manager | Vista del convenio colectivo: tablas salariales del tenant, alertas de incumplimiento | no |
| `/hr/configuracion-laboral` | Portal Gestoría (M10) | Gestoría externa | La gestoría configura: convenio, tablas salariales, conceptos de nómina. Ve las bases de cotización y descarga ficheros para Sistema RED/AFIP | sí — referenciado en `mockup/v2.5/empleado-rrhh.html` (integración Factorial+Sistema RED) |
| `/hr/igualdad` | Supervisor/Jefe | HR Manager | Plan de Igualdad: estado, diagnóstico, medidas, registro REGCON (ES, >50 trabajadores) | no |
| `/hr/evaluaciones` | Supervisor/Jefe + Supervisores de dept | HR Manager + Jefes | Gestión de evaluaciones de desempeño: en curso, pendientes, historial | no |

---

## 16. Riesgos conocidos y preguntas abiertas

- **Riesgo 1 — Tablas salariales CCT/Convenio desactualizadas:** Los convenios colectivos de hostelería (ES provincial) y el CCT Gastronómicos (AR) se actualizan con frecuencia por paritarias. Si el sistema tiene las tablas hardcodeadas y no se actualizan, el hotel podría pagar por debajo del convenio (riesgo legal grave). Plan de mitigación: las tablas salariales son configuración del tenant, editables por HR Manager o gestoría desde el Portal M10. Bravas publica actualizaciones de tablas como novedades de configuración cuando hay paritarias o nuevos convenios, pero el tenant debe aplicarlas manualmente. No es responsabilidad de Bravas calcular las paritarias futuras.

- **Riesgo 2 — Integración Sistema RED en ES requiere certificado digital:** Similar al riesgo AFIP del módulo Admin-CFO. Para comunicar altas y bajas vía Sistema RED, el hotel necesita un usuario RED y un certificado digital. El proceso de obtención no es inmediato (puede tomar días). Plan de mitigación: incluir en el flujo de onboarding la instrucción para obtener el usuario RED con anticipación. Bravas no puede automatizar esto — es un proceso con la TGSS.

- **Riesgo 3 — Decreto 407/2026 AR — recibo digital sin resolución final:** Al cierre de este catálogo, el Decreto 407/2026 sobre recibo de sueldo digital no tiene resolución complementaria que especifique el formato técnico final (firma digital, repositorio, etc.). Plan de mitigación: implementar el recibo digital en formato PDF firmado digitalmente — es el standard de hecho del mercado AR — y ajustar cuando salga la resolución final.

- **Riesgo 4 — Pluriempleo en AR y duplicación de obra social:** Si un empleado tiene dos trabajos (frecuente en gastronomía AR), la OSECAC se cobra en el trabajo principal. Si el sistema calcula los aportes de OS para el segundo empleador sin tener en cuenta el pluriempleo, puede generar aportes duplicados y reclamos. Plan de mitigación: en el alta del empleado, campo "declara otro empleo" + instrucciones para la gestoría sobre el tratamiento correcto. No calcular automáticamente el descuento en v1.

- **Riesgo 5 — ERTE y la curva de aprendizaje del hotel:** Los ERTEs son procesos complejos que requieren negociación con representantes de trabajadores (si los hay), consulta a autoridad laboral, comunicación al SEPE. Un módulo de RRHH que simplifique demasiado esto puede generar problemas legales. Plan de mitigación: el módulo gestiona la documentación y el seguimiento, pero incluye disclaimers claros de que el proceso ERTE requiere asesoramiento legal externo.

- **Pregunta abierta 1 — ¿Bravas calcula directamente las nóminas (ES/AR) o siempre delega en Factorial/A3?** Si Bravas calcula internamente, tiene control total pero complejidad enorme (retenciones, SS, CCT, IRPF — miles de casuísticas). Si siempre delega, reduce complejidad pero aumenta la dependencia de terceros y el costo para el hotel. Propuesta: v1 siempre delega (Factorial ES / A3 o Bejerman AR). Si un tenant no quiere usar ninguno de esos, se ofrece exportación CSV. El cálculo nativo de nóminas es un proyecto separado de v2 o v3. Decisión: Daniel.

- **Pregunta abierta 2 — ¿El módulo RRHH soporta hotels estacionales (plantilla que entra y sale cada temporada)?** En resorts de costa AR (MDQ, Pinamar) y Baleares ES, la plantilla puede duplicarse entre temporada alta y baja. Las bajas masivas al final de temporada y las altas masivas al inicio requieren flujos distintos (contratos de temporada, comunicaciones masivas a la TGSS/AFIP). Decisión: si es target Resorts (Pack Resort), debe soportarse. Prioridad v1 o v2. Decisión: Daniel.

- **Pregunta abierta 3 — ¿El personal tercerizado (ej: seguridad, limpieza tercerizada) se gestiona en RRHH?** En muchos hoteles, la seguridad y/o la lavandería están tercerizadas. Estos empleados no son del hotel, pero el hotel necesita saber quiénes están en el edificio (control de acceso, formaciones PRL del contratista). ¿Los incluye el módulo RRHH o solo gestiona empleados propios? Decisión: arquitecto/Daniel.

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación inicial del catálogo RRHH (v1.0). 45 funciones, 10 entidades, mapa geo AR+ES completo, 17 pantallas | bravas |
