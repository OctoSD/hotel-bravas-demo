# Índice de catálogos exhaustivos — Bravas

> Cada sector/módulo del producto Bravas tiene su ficha exhaustiva en esta carpeta. El template canónico está en `_TEMPLATE_catalogo_sector.md`. Cada ficha sigue la misma estructura (17 secciones) para que un developer pueda construir el módulo completo sin preguntar nada.

**Estado del catálogo:** _en construcción. Catálogos arrancan después de la reunión arquitecto + estratega + optimización de 2026-11-08._

---

## Core — 11 sectores base (siempre activos en todo tenant)

| # | Código | Nombre (es-AR) | Ficha | Estado |
|---|---|---|---|---|
| 1 | `direction` | Dirección General | `direction.md` | review ✓ |
| 2 | `front-office` | Recepción / Front Office | `front-office.md` | review ✓ |
| 3 | `housekeeping` | Housekeeping (Gobernanta + operativo) | `housekeeping.md` | review ✓ |
| 4 | `kitchen` | Cocina (Chef Ejecutivo + brigada) | `kitchen.md` | review ✓ |
| 5 | `fb-service` | F&B Servicio (Maître + salón + bar + room service) | `fb-service.md` | review ✓ |
| 6 | `maintenance` | Mantenimiento (correctivo + preventivo + caliente) | `maintenance.md` | review ✓ |
| 7 | `admin-cfo` | Administración / CFO | `admin-cfo.md` | review ✓ |
| 8 | `hr` | RRHH | `hr.md` | review ✓ |
| 9 | `commercial` | Comercial / Ventas / Revenue Management / Reservas | `commercial.md` | review ✓ |
| 10 | `storeroom` | Economato / Compras / Almacén | `storeroom.md` | review ✓ |
| 11 | `security` | Seguridad (PRL ES / SeHyS AR) | `security.md` | review ✓ |

## Módulos transversales (siempre activos, atraviesan sectores)

| # | Código | Nombre | Ficha | Estado |
|---|---|---|---|---|
| T1 | `guest-experience` | Guest Experience (sector propio con portal + dual-fire) | `guest-experience.md` | review ✓ |
| T2 | `sustainability` | Sostenibilidad (provisoriamente transversal, pendiente decisión Daniel) | `sustainability.md` | review ✓ |

## Pack Resort — opt-in por tenant

| # | Código | Nombre | Ficha | Estado |
|---|---|---|---|---|
| R1 | `spa` | Spa & Wellness | `spa.md` | pendiente |
| R2 | `animation` | Animación / Kids Club | `animation.md` | pendiente |
| R3 | `grounds` | Jardinería / Piscina / Áreas verdes | `grounds.md` | pendiente |
| R4 | `beach-water` | Playa / Deportes acuáticos | `beach-water.md` | pendiente (opcional) |

## Pack Eventos — opt-in por tenant

| # | Código | Nombre | Ficha | Estado |
|---|---|---|---|---|
| E1 | `banquets` | Banquetes / Catering interno | `banquets.md` | pendiente |
| E2 | `conventions` | Salones de convenciones | `conventions.md` | pendiente |
| E3 | `mice` | MICE (Meetings · Incentives · Conferences · Exhibitions) | `mice.md` | pendiente |

## Pack Corporativo — opt-in por tenant

| # | Código | Nombre | Ficha | Estado |
|---|---|---|---|---|
| C1 | `corporate-sales` | Comercial corporativo (contratos tarifa negociada + cuentas empresa) | `corporate-sales.md` | pendiente |
| C2 | `corporate-billing` | Facturación corporativa centralizada | `corporate-billing.md` | pendiente |
| C3 | `corporate-portal` | Portal self-service empresas | `corporate-portal.md` | pendiente |

## Pack Experience Premium — opt-in por tenant 5\* grandes

| # | Código | Nombre | Ficha | Estado |
|---|---|---|---|---|
| X1 | `gx-premium` | Guest Experience Premium (Director GX + equipo + analytics avanzadas) | `gx-premium.md` | pendiente |

## Verticales — opt-in explícito (hoteles raros)

| # | Código | Nombre | Ficha | Estado |
|---|---|---|---|---|
| V1 | `casino` | Casino | `casino.md` | pendiente (vertical raro) |
| V2 | `golf` | Golf | `golf.md` | pendiente (vertical raro) |
| V3 | `marina` | Marina / Deportes náuticos | `marina.md` | pendiente (vertical raro) |
| V4 | `retail` | Retail (tiendas internas) | `retail.md` | pendiente (vertical raro) |

## Features especiales (no son sectores, son modos de operación)

| # | Código | Nombre | Descripción |
|---|---|---|---|
| F1 | `rooms-division-grouping` | Agrupador Rooms Division | feature opcional: agrupa FO + HK + Reservas + Concierge bajo un "Director of Rooms Division" en hoteles que lo usen (patrón 5\* internacional) |
| F2 | `operations-director-role` | Director de Operaciones como meta-rol | permiso cross-departamental entre GM y Directores de Dept. NO es un sector con portal propio |

## Infra común (no son sectores, son servicios transversales)

| Código | Descripción |
|---|---|
| `auth` | Autenticación (PIN + QR + email, patrón `@octo/pin-auth` y `@octo/qr-auth`) |
| `timekeeping` | Fichaje de empleados (patrón `@octo/qr-auth` + fichaje) |
| `i18n` | Internacionalización 3 locales (es-ES, es-AR, en) + nomenclatura customizable por tenant |
| `branding` | Branding per-tenant (logo, colores, nomenclatura) |
| `tenant-config` | Configuración del tenant (qué packs activos, qué flags, etc.) |
| `event-bus` | Event bus central (necesario para dual-fire de GX) |
| `audit-log` | Log de auditoría cross-módulo (quién hizo qué, cuándo, dónde) |

---

## Totales

- **Core:** 11 sectores + 2 transversales = 13 módulos
- **Packs opcionales:** 4 Resort + 3 Eventos + 3 Corporativo + 1 Experience Premium = 11 módulos
- **Verticales raros:** 4 módulos
- **Features:** 2
- **Infra común:** 7 servicios

**Total: 28 módulos funcionales + 2 features + 7 servicios infra** que se publicarán como paquetes `@octo/bravas-*` para que cada tenant active los que necesita.

Un hotel típico activará 13 Core + 1-5 opcionales según su tipo. El bundle resultante se calcula per-tenant en build time.

---

## Changelog

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-08 | Creación del índice con 28 módulos + 2 features + 7 servicios infra. Todos en estado "pendiente" — los catálogos arrancan después de la reunión arquitecto+estratega+optimización. | bravas |
| 2026-11-10 | `front-office.md` y `housekeeping.md` → estado pendiente → draft. 48 funciones + 5 flujos pseudocódigo cada uno. | bravas |
| 2026-11-10 | `admin-cfo.md` y `hr.md` → estado pendiente → draft. Admin-CFO: 43 funciones, 12 entidades, mapa geo fiscal AR+ES completo (Verifactu, AFIP WSFE, IIBB, F931, modelos 303/390/347/349/111/190/200). RRHH: 45 funciones, 10 entidades, mapa geo laboral AR+ES completo (CCT 125/90, Convenio Hostelería ES provincial, Sistema RED, FREMAP, ART, OSECAC, PRL, Plan de Igualdad). | bravas |
| 2026-11-10 | `security.md`, `kitchen.md`, `fb-service.md`, `maintenance.md` → creados en estado draft. Security: 35 funciones, 6 entidades, modo tercerizado/interno, mapa geo ES (Ley 5/2014, TIP, LOPD/RGPD) + AR (Ley 25.326, habilitaciones Ministerio). Kitchen: 38 funciones, 7 entidades, brigada completa, APPCC/HACCP ES+AR, escandallo automático, KDS. FB-Service: 40 funciones, 7 entidades, plano de salón, room service, banquetes toggle, Verifactu/AFIP, RevPASH. Maintenance: 38 funciones, 6 entidades, checklists preventivos, inspecciones obligatorias ES (REBT, RITE, ascensores, PCI, Legionella) + AR (GCBA, Bomberos), consumos energéticos, BMS toggle. | bravas |
