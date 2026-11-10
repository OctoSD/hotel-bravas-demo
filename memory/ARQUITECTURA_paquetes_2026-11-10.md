# Arquitectura de paquetes `@octo/bravashotel-*`
> **Producto:** BravasHotel (placeholder — pendiente nombre comercial definitivo)  
> **Fecha:** 2026-11-10 · **Autor:** bravas · **Revisado por:** arquitecto (2026-11-10 13:10 — 3 bugs SQL corregidos)  
> **Namespace técnico:** `@octo/bravashotel-*` (renombrar cuando Daniel confirme nombre comercial)  
> **Estado:** spec de referencia aprobada por arquitecto ✅ (pendiente: nombre + GitHub Packages)

---

## 1. Contexto y principios

### Decisiones arquitectónicas base (FIRMES)

1. **Opción C — Híbrido custom-first + SaaS paralelo.** Las 3-5 customs iniciales son deploys dedicados del mismo codebase, NO forks. El core comparte git history con todos los deploys.

2. **N2 architecture (paquetes `@octo/*`).** BravasHotel es la primera app nativa N2: consume libs del catálogo `@octo/*` y construye sus propias libs `@octo/bravashotel-*` que son portables para apps hoteleras futuras.

3. **Stack:** Next.js 16 + TypeScript + Tailwind + Supabase Pro + Vercel Pro. Sin excepciones.

4. **Límite propio/delegado (arquitecto 2026-11-10):**
   - **Bravas posee:** operación hotelera (turnos, fichaje, sectores, flujo huésped, reportes operativos)
   - **Delega a incumbentes:** contabilidad (Holded ES), nóminas (Factorial ES), PRL (Fremap/Asepeyo)

5. **Feature flags:** tabla `tenant_modules` en Supabase + patrón UI `<ModuleGate>`. No plataforma externa hasta 50+ tenants.

6. **Billing modular:** Stripe Billing (subscription items por módulo). Lib `@octo/billing` v1.0.0 ya existe.

---

## 2. Stack de paquetes — mapa completo

### 2.1 Paquetes heredados de `@octo/*` (Ola 1 — ya existen o en pipeline)

Estos paquetes vienen de Tile y están graduados o en proceso de publicación. BravasHotel los consume, no los construye.

| Paquete | Estado | Origen | Qué hace para BravasHotel |
|---|---|---|---|
| `@octo/pin-auth` | publicado v1.0.0 | Tile | Autenticación PIN para empleados en modo kiosko/tablet |
| `@octo/qr-auth` | publicado v1.0.0 | Tile | Autenticación QR para fichaje (empleado escanea QR en tablet del hotel) |
| `@octo/offline-sync` | publicado v1.0.0 | Tile | Sync offline para portales de empleados en áreas sin señal (cocina, sótano, zona piscina) |
| `@octo/kiosco-panels` | publicado v1.0.0 | Tile | Componentes de pantalla tipo kiosko (pantalla en lobby, recepción, cocina) |
| `@octo/billing` | v1.0.0 | Tile | Billing modular con Stripe. Revisar si soporta subscription items múltiples |
| `@octo/tenant-rls` | Ola 2 en pipeline | plan | RLS multi-tenant canónico para Supabase |
| `@octo/hr-core` | Ola 2 en pipeline | Tile v1.1 | Fichas empleados + turnos + fichaje + vacaciones — PRIMERA PRIORIDAD (extiende lo que tiene Tile) |

### 2.2 Paquetes Ola 2 — libs transversales nuevas confirmadas por arquitecto

| Paquete | Qué hace | Cuando construir |
|---|---|---|
| `@octo/accounting-connector` | Push one-way a Holded (ES) / adapter para Contabilium (AR). Pushea: ventas del día, facturas a proveedores, nómina pagada | F5 Fase 1 (primer hotel con módulo Admin-CFO) |
| `@octo/payroll-connector` | Push a Factorial (ES): empleados, horas trabajadas, conceptos de nómina. Factorial genera nómina + partes TGSS automáticos | F5 Fase 1 (primer hotel ES con HR módulo) |
| `@octo/payroll-connector-ar` | Equivalente AR para AFIP/SIJP. Construir solo cuando haya hoteles AR reales que lo pidan | F5 Fase 2+ (demanda AR) |
| `@octo/hr-core` | Fichas empleados + turnos + fichaje + vacaciones. Extiende Tile v1.1 que ya lo tiene. | PRIMERA PRIORIDAD Ola 2 |
| `@octo/training-tracker` | Tracking formación PRL + revisiones médicas + EPIs por empleado. Reutilizable en restaurante/spa/clínica | F5 junto con HR |
| `@octo/cost-centers` | Centros de costo hoteleros + imputación de gastos/ingresos por sector. RevPAR, GOPPAR, flow-through | F5 Fase 1 |
| `@octo/supplier-inbox` | Inbox de facturas de proveedores + workflow de aprobación (recibir → verificar → aprobar → contabilizar) | F5 Fase 1 |

### 2.3 Paquetes `@octo/bravashotel-*` — verticales hoteleros

Estos paquetes son el core del vertical hotelero. Los construye BravasHotel; en el futuro Octo puede reutilizarlos en otras apps hoteleras.

#### Paquetes Core (siempre activos — 11 sectores + transversales)

| Paquete | Sector | Prioridad | Estado |
|---|---|---|---|
| `@octo/bravashotel-direction` | Dirección General | 1 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-front-office` | Recepción / Front Office | 1 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-housekeeping` | Housekeeping | 1 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-kitchen` | F&B Cocina | 2 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-fb-service` | F&B Servicio | 2 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-maintenance` | Mantenimiento | 2 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-commercial` | Comercial / Revenue / Reservas | 1 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-storeroom` | Economato / Compras | 2 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-admin-cfo` | Administración / CFO | 1 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-hr` | RRHH | 1 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-security` | Seguridad | 2 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-guest-experience` | Guest Experience (transversal) | 1 | catálogo ✓ · código pendiente |
| `@octo/bravashotel-sustainability` | Sostenibilidad (transversal) | 3 | catálogo ✓ · código pendiente |

#### Paquetes de Packs (opt-in por tenant)

| Paquete | Pack | Contenido |
|---|---|---|
| `@octo/bravashotel-spa` | Resort | Spa & Wellness (tratamientos, fitness, piscina spa) |
| `@octo/bravashotel-animation` | Resort | Animación / Kids Club |
| `@octo/bravashotel-grounds` | Resort | Jardinería / Piscina / Áreas verdes |
| `@octo/bravashotel-beach-water` | Resort | Playa / Deportes acuáticos |
| `@octo/bravashotel-banquets` | Eventos | Banquetes / Catering interno |
| `@octo/bravashotel-conventions` | Eventos | Salones de convenciones |
| `@octo/bravashotel-mice` | Eventos | MICE (Meetings · Incentives · Conferences · Exhibitions) |
| `@octo/bravashotel-corporate-sales` | Corporativo | Comercial corporativo (contratos tarifa negociada + cuentas empresa) |
| `@octo/bravashotel-corporate-billing` | Corporativo | Facturación corporativa centralizada |
| `@octo/bravashotel-corporate-portal` | Corporativo | Portal self-service empresas |
| `@octo/bravashotel-gx-premium` | Experience Premium | Guest Experience Premium (Director GX + equipo + analytics avanzadas) |

#### Paquetes de Verticales (opt-in explícito — hoteles raros)

| Paquete | Vertical | Notas |
|---|---|---|
| `@octo/bravashotel-casino` | Casino | Integrado Resort / Park Hyatt-like |
| `@octo/bravashotel-golf` | Golf | Resorts de campo |
| `@octo/bravashotel-marina` | Marina | Resorts costeros |
| `@octo/bravashotel-retail` | Retail interno | Tiendas dentro del hotel |

#### Paquetes de Conectores Fiscales (geo-específicos)

| Paquete | Geografía | Qué hace |
|---|---|---|
| `@octo/bravashotel-accounting-es` | ES | Adapter Holded + Verifactu + modelos 303/347/390 |
| `@octo/bravashotel-accounting-ar` | AR | Adapter Contabilium/Bejerman + AFIP WSFE + RG |
| `@octo/bravashotel-payroll-es` | ES | Adapter Factorial + Sistema RED + convenio hostelería ES |
| `@octo/bravashotel-payroll-ar` | AR | Adapter SIJP/AFIP + convenios gastronómicos AR |
| `@octo/bravashotel-prl-es` | ES | Tracker PRL (Ley 31/1995) + Fremap/Asepeyo |
| `@octo/bravashotel-syh-ar` | AR | Tracker SyH (Ley 19.587) + ART Argentina |
| `@octo/bravashotel-ses-hospedajes-es` | ES | Parte viajero Ministerio Interior (ley 4/2015) |
| `@octo/bravashotel-planilla-policial-ar` | AR | Planilla hotelera policial equivalente AR |

#### Paquetes de Infra (siempre activos)

| Paquete | Qué hace |
|---|---|
| `@octo/bravashotel-event-bus` | Event bus central para dual-fire GX. Fan-out de eventos operativos a suscriptores |
| `@octo/bravashotel-i18n` | Diccionarios i18n de los 3 locales + nomenclatura per-tenant (sobreescritura de strings) |
| `@octo/bravashotel-tenant-config` | Configuración del tenant (packs activos, conectores geo, branding, flags) |
| `@octo/bravashotel-audit-log` | Log de auditoría cross-módulo (quién, qué, cuándo, dónde) |
| `@octo/bravashotel-guest-portal` | Portal del huésped (reserva, check-in, solicitudes, NPS, checkout) |

---

## 3. Arquitectura de módulos — regla de extensión A→B→C

Cuando un hotel custom pide algo que no está en los slots estándar:

```
Prioridad 1 — Slot de extensión (siempre disponible):
  entity.custom_fields: JSONB
  entity.custom_fields_schema: JSONB (define tipos y labels para el tenant)
  workflows: hooks pre_/post_ por función

Prioridad 2 — Pack nuevo en el catálogo:
  Si la feature la pedirían ≥2 hoteles del cap 3-5 → se crea un paquete nuevo
  El pack queda disponible para todos los tenants
  Ejemplo: si 2 hoteles piden módulo "Lavandería externa como negocio" → pack nuevo

Prioridad 3 — Feature flag tenant-specific (SOLO como último recurso):
  Requiere:
  - Flag `@octo/bravashotel-core` con TTL explícito + fecha de revisión
  - Decisión documentada arquitecto+bravas
  - Plan de absorción al core o deprecación en release N+1
  Si en 1 hotel aparecen 2+ features tipo C → señal de que ese hotel no es el mercado target
```

---

## 4. Estructura del shell app

```
apps/bravashotel/
├── app/                      # Next.js App Router
│   ├── (admin)/              # Portal Dirección
│   │   └── layout.tsx        # ModuleGate + auth guard GM
│   ├── (employee)/           # Portal Empleado (todos los sectores)
│   │   └── layout.tsx        # ModuleGate + auth guard por sector
│   ├── (guest)/              # Portal Huésped
│   │   └── layout.tsx        # auth anon o link mágico
│   └── api/                  # API routes (con auth guard en cada una)
├── components/
│   └── ModuleGate.tsx        # UI gating de módulos
├── hooks/
│   └── useTenantModules.ts   # lee tenant_modules de Supabase
├── lib/
│   └── supabase.ts           # cliente Supabase singleton
└── package.json              # depende de @octo/bravashotel-*
```

---

## 5. Patrón de deploy custom

Cada hotel custom sigue este pipeline:

```
1. Ejecutar: scripts/provision-tenant.sh <slug> <country> <packs>
   - crea Supabase project propio (nombre: bravashotel-<slug>)
   - crea Vercel project propio (nombre: bravashotel-<slug>)
   - configura env vars (SUPABASE_URL, SUPABASE_ANON_KEY, TENANT_ID, etc.)
   - conecta GitHub repo a Vercel project
   - crea registro en tenant_config con packs habilitados

2. CI/CD compartido:
   - merge a main del core → build en todos los Vercel projects (custom + SaaS)
   - todos comparten el mismo codebase, solo difieren las env vars

3. Supabase schema:
   - schema IDÉNTICO al SaaS compartido
   - diferencia: en SaaS compartido, todas las tablas tienen organization_id (RLS)
   - en deploy custom, organization_id existe pero todos los rows son del mismo org
   - migración custom→SaaS: dump custom + import como tenant en SaaS compartido
```

---

## 6. Schema core de Supabase — tablas transversales

```sql
-- Organizaciones (tenants)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL,          -- 'ES' | 'AR' | 'UY' | ...
  locale TEXT NOT NULL,           -- 'es-ES' | 'es-AR' | 'en'
  stars INTEGER,                  -- 1-5
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Módulos activos por tenant
CREATE TABLE tenant_modules (
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  module TEXT NOT NULL,           -- 'commercial', 'spa', 'hr-advanced', etc.
  enabled BOOLEAN DEFAULT false,
  tier TEXT,                      -- 'standard' | 'premium' | null
  enabled_at TIMESTAMPTZ,
  PRIMARY KEY (organization_id, module)
);

-- Usuarios del sistema
CREATE TABLE hotel_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT NOT NULL,             -- 'gm' | 'dept_head' | 'supervisor' | 'operative' | 'guest'
  sector TEXT,                    -- 'front-office' | 'housekeeping' | etc.
  pin_hash TEXT,                  -- para auth PIN tablet
  status TEXT DEFAULT 'active',
  locale TEXT,                    -- idioma del usuario
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habitaciones
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  number TEXT NOT NULL,
  floor INTEGER,
  type TEXT NOT NULL,             -- 'single' | 'double' | 'suite' | etc.
  capacity INTEGER DEFAULT 2,
  status TEXT DEFAULT 'libre',    -- 'libre' | 'ocupada' | 'en_limpieza' | 'mantenimiento' | 'bloqueada'
  custom_fields JSONB DEFAULT '{}'
);

-- Perfiles de huéspedes (antes de reservations — reservations la referencia)
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  country TEXT,
  document_type TEXT,
  document_number TEXT,
  vip_tier TEXT DEFAULT 'standard',  -- 'standard' | 'silver' | 'gold' | 'platinum' | 'blacklist'
  allergens TEXT[],
  preferences JSONB DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reservas
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id),
  guest_id UUID REFERENCES guests(id),
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  status TEXT DEFAULT 'confirmed', -- 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show'
  channel TEXT,                   -- 'direct' | 'booking' | 'expedia' | 'phone' | 'walk-in'
  rate_plan TEXT,
  rate_amount DECIMAL(10,2),
  currency TEXT DEFAULT 'ARS',   -- AR: ARS | ES: EUR
  notes TEXT,
  custom_fields JSONB DEFAULT '{}'
);

-- RLS: todas las tablas tienen tenant aislado
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Función SECURITY DEFINER para romper recursión infinita en RLS
-- (hotel_users no puede hacer SELECT sobre sí misma desde dentro de su propia policy)
CREATE OR REPLACE FUNCTION get_my_organization_id()
RETURNS UUID
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT organization_id FROM hotel_users WHERE id = auth.uid() LIMIT 1;
$$;

-- Policy base: usuarios solo ven su propia organización
CREATE POLICY "tenant_isolation" ON hotel_users
  USING (organization_id = get_my_organization_id());
CREATE POLICY "tenant_isolation" ON tenant_modules
  USING (organization_id = get_my_organization_id());
CREATE POLICY "tenant_isolation" ON rooms
  USING (organization_id = get_my_organization_id());
CREATE POLICY "tenant_isolation" ON reservations
  USING (organization_id = get_my_organization_id());
CREATE POLICY "tenant_isolation" ON guests
  USING (organization_id = get_my_organization_id());
```

---

## 7. Prioridad de construcción (Fase 1)

Orden de construcción de los módulos `@octo/bravashotel-*`:

| Prioridad | Módulo | Por qué |
|---|---|---|
| 1 | `front-office` | corazón del PMS: check-in/check-out, gestión de reservas |
| 2 | `housekeeping` | el flujo más frecuente del día operativo |
| 3 | `direction` | dashboard que consume todos los demás |
| 4 | `guest-experience` | el event bus que atraviesa todo |
| 5 | `admin-cfo` | necesario para el primer cierre mensual |
| 6 | `hr` | necesario para el primer ciclo de nóminas |
| 7 | `commercial` | necesario para conectar OTAs y hacer yield |
| 8 | `kitchen` | necesario para el flujo F&B completo |
| 9 | `fb-service` | par con kitchen |
| 10 | `maintenance` | necesario para el primer reporte de mantenimiento |
| 11 | `storeroom` | integra con kitchen y admin-cfo |
| 12 | `security` | necesario para compliance en primer hotel real |
| 13 | Conectores geo (ES/AR) | según país del primer cliente |

---

## 8. Señales de cap (cuándo parar de tomar customs)

Las tres señales objetivas del arquitecto:

1. **Hard cap infra:** >5 Supabase + 5 Vercel Pro simultáneos → gestión administrativa compleja. No es técnico, es operativo.
2. **Hard cap operativo:** cuando el tiempo de deploy-a-todos-los-customs excede 2h/semana → stop.
3. **Soft cap de modelo:** si >30% de las features de un custom van por el camino C (feature flag) → ese hotel no es el mercado target del SaaS; reevaluar si realmente es un cliente de BravasHotel.

---

## 9. Preguntas abiertas (no bloquean Fase 0, sí bloquean F5)

| # | Pregunta | Para quién | Urgencia |
|---|---|---|---|
| 1 | ¿Infra del custom la cubre Octo (Supabase Pro + Vercel Pro propios) o el cliente paga su cuenta? | Daniel + estratega | F4 |
| 2 | ¿Dominio custom lo gestiona Octo o el cliente delega DNS? | Daniel | F4 |
| 3 | ~~¿Multi-tenant model: single-DB+RLS o schema-per-tenant?~~ **✅ RESUELTO: single-DB+RLS** (arquitecto 2026-11-10 — schema-per-tenant no viable con Supabase Pro, complica migraciones. La arquitectura del §6 ya asume correctamente single-DB+RLS) | arquitecto | F4 |
| 4 | ~~¿Residencia datos ES: Supabase Frankfurt suficiente o necesitamos provider en suelo español?~~ **✅ RESUELTO: Frankfurt suficiente** (arquitecto 2026-11-10 — Alemania es UE, cumple GDPR. No hay requisito legal español de suelo español para hostelería) | arquitecto | F4 |
| 5 | ¿SLA contractual: 99.5% o 99.9%? | estratega + Daniel | F5 |
| 6 | ¿El Pack Experience Premium activa portal propio o mismo Admin con permisos expandidos? | arquitecto + bravas | F5 |
| 7 | ¿Blacklist de huéspedes es per-tenant o compartida entre hoteles del mismo dueño? | Daniel | F5 |

---

*Documento creado: bravas · 2026-11-10 · basado en investigación de 657 líneas + relevamiento 37 hoteles + decisiones arquitecto*
