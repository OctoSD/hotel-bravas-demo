# Template — Catálogo exhaustivo de un sector/módulo Bravas

> Este archivo es el template canónico para cada ficha de sector/módulo del catálogo exhaustivo Bravas. Cada sector (Core o Pack) se documenta en un archivo propio siguiendo esta estructura. El objetivo es que un developer, al leer la ficha, pueda construir el módulo completo sin tener que preguntar nada más.

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | — |
| **Nombre (es-AR)** | — |
| **Nombre (en)** | — |
| **Código técnico** | `@octo/bravas-<codigo>` (ej: `front-office`, `housekeeping`, `fb-service`) |
| **Tipo** | Core · Pack Resort · Pack Eventos · Pack Corporativo · Vertical · Transversal |
| **Versión del catálogo** | v1.0 — 2026-11-08 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | lista módulos requeridos para que este funcione |
| **Módulos dependientes de éste** | lista módulos que requieren éste activo |
| **Activación default** | Siempre activo · Opt-in en onboarding · Vertical raro |

## 2. Propósito del módulo

- **Qué resuelve** (1 párrafo claro — qué problema del hotel resuelve).
- **Qué NO resuelve** (límites explícitos — qué queda fuera de scope del módulo).
- **Métrica principal de éxito del sector** (KPI que debe mover).

## 3. Roles del sector

Tabla de roles reales que trabajan en este sector:

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Jefe del sector | ej: "Jefe de Recepción" | ej: "Jefe de Recepción" | ej: "Front Office Manager" | 2 | Director de Operaciones · GM | Supervisores + operativos | puede agrupar en hoteles chicos |
| Supervisor | — | — | — | 3 | Jefe | Operativos | — |
| Operativo | — | — | — | 4 | Supervisor | — | — |

**Variantes por tamaño de hotel:**
- Boutique chico: el rol X lo cumple el Y (multi-rol).
- Urbano medio: separación completa.
- Resort/5\*: roles adicionales.

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | sí/no | — |
| Portal Operativo del sector | sí/no | — |
| Portal Supervisor/Jefe | sí/no | — |
| Portal Dirección | sí/no | reportes consolidados |
| **GX inbox (dual-fire)** | sí/no | ¿qué eventos le mandan copia al inbox de Guest Experience? |

## 5. Catálogo exhaustivo de funciones

**Importante:** este es el núcleo del documento. Tiene que listar **TODAS** las funciones, no 5-8 representativas. Un sector real tiene 30-50 funciones.

Formato:

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | — | — | — | — | manual/automático/evento | continua/diaria/semanal/mensual/eventual | core/importante/nice | sí/no |
| 2 | — | — | — | — | — | — | — | — |
| ... | — | — | — | — | — | — | — | — |

### Sub-flujos clave (pseudocódigo simple)

Para las 3-5 funciones más complejas del sector, pseudocódigo del flujo:

```
Función: ej. "Check-in huésped"
1. Recepcionista busca reserva por nombre/email/código
2. Sistema verifica identidad del huésped → carga planilla policía ES/AR
3. Sistema asigna habitación (regla: upgrade si disponible + preferencia del huésped)
4. Sistema emite llave digital → envía al huésped por SMS/email
5. Sistema abre cuenta corriente del huésped (HotelFolio)
6. HK recibe notificación de habitación "lista para preparación final"
7. GX inbox recibe evento "huésped check-in" (dual-fire)
```

## 6. Entidades de datos

Entidades (tablas) que el módulo crea o toca.

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `reservation` | sí/no | sí/no | id, huésped, habitación, fechas, estado, canal... | `custom_fields JSONB` | → `guest`, `room`, `payment` |
| ... | — | — | — | — | — |

**Diagrama ER simplificado:**

```
reservation ───< payment
    │
    ▼
  guest ──────< folio_item
    │
    ▼
  room ───────< housekeeping_task
```

## 7. Máquinas de estado

Para entidades con ciclo de vida complejo (habitación, reserva, tarea de HK, etc.):

```
room:
  LIBRE ──check-in──> OCUPADA
  OCUPADA ──check-out──> EN_LIMPIEZA
  EN_LIMPIEZA ──limpieza_finalizada──> LIMPIA
  LIMPIA ──supervisión_ok──> LIBRE
  LIBRE ──bloqueo_mantto──> EN_MANTENIMIENTO
  EN_MANTENIMIENTO ──mantto_ok──> LIBRE
  OCUPADA ──reporte_desperfecto──> OCUPADA_CON_INCIDENCIA
  ...

Transiciones autorizadas por rol:
- Recepción: LIBRE → OCUPADA, OCUPADA → EN_LIMPIEZA
- HK: EN_LIMPIEZA → LIMPIA
- Gobernanta: LIMPIA → LIBRE
- Mantto: * → EN_MANTENIMIENTO, EN_MANTENIMIENTO → LIBRE
```

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| Ej: SiteMinder | Channel manager | bidireccional | opcional | si hotel vende por OTAs |
| Ej: Holded | Contabilidad | outbound | opcional (ES) | Opción A ERP |
| Ej: Verifactu | Facturación ES | outbound | obligatorio (ES, ley 2026) | — |
| Ej: AFIP WSFE | Facturación AR | outbound | obligatorio (AR) | — |

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Check-in huésped | ✓ | | | | |
| Planilla autoridad | | | | ✓ | AR: planilla hotelera AFIP · ES: parte viajero ley 4/2015 |
| Emisión factura | | | | ✓ | AR: AFIP WSFE · ES: Verifactu |
| ... | | | | | |

## 10. Slots de extensión (crítico para N2 + multi-tenant)

Cada módulo debe exponer estos slots para que el hotel pueda customizar sin tocar core:

### 10.1 Campos custom por entidad

```
entidad.custom_fields: JSONB
entidad.custom_fields_schema: JSONB (define el schema que el tenant usa)
```

### 10.2 Workflows custom

Hooks disponibles por función:
- `pre_<funcion>` — tenant puede agregar validación/transformación antes
- `post_<funcion>` — tenant puede disparar acciones adicionales

Ejemplo:
```
pre_check_in: tenant puede exigir campo custom "motivo del viaje"
post_check_in: tenant puede enviar email de bienvenida personalizado
```

### 10.3 Integraciones per-tenant

Lista de integraciones opcionales que el tenant puede activar:
- Proveedores de contabilidad: Holded, A3, Sage, Contabilium, otro custom
- Proveedores de nómina: Factorial, A3 Nom, Bejerman, otro
- Channel managers: SiteMinder, Dingus, Omnibees, otro

### 10.4 Branding/UI per-tenant

- Colores del módulo
- Logo
- Nomenclatura de roles (ej: "mucama" → "ama de llaves" → custom)

### 10.5 Idiomas

- Diccionario i18n propio del tenant (puede sobre-escribir strings default)

## 11. Nomenclatura i18n (tabla de términos del sector)

Tabla completa de términos que usa el módulo en los 3 locales:

| Término técnico | es-ES default | es-AR default | en default | Customizable por tenant |
|---|---|---|---|---|
| housekeeper | "camarera de pisos" | "mucama" / "camarera" | "room attendant" | ✓ |
| housekeeping_supervisor | "gobernanta" | "ama de llaves" / "gobernanta" | "executive housekeeper" | ✓ |
| ... | — | — | — | — |

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| Ej: RGPD | UE/ES | protección de datos del huésped |
| Ej: Ley 25.326 AR | AR | protección datos personales |
| Ej: PRL Ley 31/1995 | ES | prevención riesgos laborales |
| Ej: APPCC | Internacional | análisis puntos críticos alimentarios |

## 13. Dependencias del lifecycle del módulo

- **Qué pasa si el módulo se ACTIVA después del hotel ya corriendo:**
  - Datos iniciales requeridos (seed)
  - Flujo de setup inicial
  - Migración de datos de otros módulos si aplica

- **Qué pasa si el módulo se DESACTIVA:**
  - Datos que quedan huérfanos
  - Datos irrecuperables
  - Procedimiento de archivo
  - Qué otros módulos quedan afectados

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| Ej: ADR (Average Daily Rate) | revenue habitaciones / habitaciones vendidas | diaria | Dashboard Comercial | — |
| Ej: Occupancy | habitaciones vendidas / habitaciones disponibles | diaria | Dashboard Comercial | 70-75% urbano típico |
| ... | — | — | — | — |

## 15. Pantallas/vistas del módulo

Lista de pantallas que el módulo entrega al frontend (base para rutas, componentes, mockups):

| Pantalla | Portal | Rol que la ve | Función principal | Mockup existente |
|---|---|---|---|---|
| Ej: /front-office/check-in | Operativo | Recepcionista | Dar entrada a huésped | sí/no — mockup/v2.5/empleado-recepcion.html |
| ... | — | — | — | — |

## 16. Riesgos conocidos y preguntas abiertas

- **Riesgo 1:** descripción + plan de mitigación
- **Pregunta abierta 1:** descripción + a quién le toca resolver (arquitecto/estratega/Daniel)

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-08 | Creación inicial del template | bravas |

---

**Uso del template:**
1. Copiar este archivo a `catalogos/<codigo-modulo>.md` (ej: `catalogos/front-office.md`).
2. Llenar todos los campos. Si alguno no aplica, escribir "N/A" con razón corta.
3. Validar contra el relevamiento de 37 hoteles (sección correspondiente).
4. Validar mapa geográfico con fuentes legales reales (no inventar).
5. Validar i18n contra el relevamiento (sección 4.5 del relevamiento tiene tabla de sinónimos).
6. Marcar en el índice `catalogos/_INDEX.md` el estado del módulo (draft/review/done).
