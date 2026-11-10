# Consolidado — Reunión Arquitectura BravasHotel
**Fecha:** 2026-11-10 · **Coordinator:** supervisor + bravas

---

## Resultado de la reunión

La reunión asíncrona convocada el 2026-11-08 concluyó con ACK de los tres roles invitados (bravas, arquitecto, optimización). La pregunta central ("¿cuán sólidos pueden ser los slots de extensión?") fue respondida por arquitecto con confianza. Resumen ejecutivo:

**Decisión técnica FIRME:** Opción C — Híbrido custom-first (cap 3-5 hoteles) + SaaS paralelo.
- Arquitecto confirma que slots sólidos son construibles con el patrón `A → B → C` (slot existente → pack nuevo → feature flag tenant-specific).
- Optimización confirma que 4-5 agentes bien particionados sostienen Fase 1 y Fase 2 sin colapso operativo.
- Las 3 señales de cap son objetivas (infra, operativo, modelo).

---

## 6 Doctrinas técnicas ratificadas (arquitecto)

1. **Custom = deploy dedicado del mismo código.** Nunca fork. Los repos custom son subset del git log del core. Esta es la diferencia entre el modelo C (viable) y el modelo B (infierno operativo).
2. **Regla escalada A→B→C para features fuera de slot.** Slot existente primero, pack nuevo segundo, feature flag tenant-specific solo como último recurso con TTL y plan de absorción obligatorio.
3. **Pipeline de deploy compartido.** Un merge a main del core dispara CI/CD a todos los deploys dedicados + SaaS compartido. Todos comparten el mismo build.
4. **Template repo `bravashotel-tenant-template`.** Un script `provision-tenant.sh <slug> <packs>` levanta en minutos: Supabase propio + Vercel propio + DNS + env vars.
5. **Cap técnico = 3 señales objetivas.** Hard cap infra (5 Supabase + 5 Vercel Pro), hard cap operativo (deploy time), soft cap modelo (>30% features tipo C → rediseñar).
6. **Namespace de paquetes: `@octo/bravashotel-*`** (placeholder `BravasHotel` — renombrar cuando Daniel confirme nombre comercial definitivo).

---

## Números clave de agentes (optimización)

| Fase | Agentes | Composición | Techo cómodo |
|---|---|---|---|
| **Fase 1** (custom + SaaS base) | 4-5 | 1 Opus senior + 2 Sonnet dev + 1 Sonnet onboarding + 1 Sonnet QA (desde mes 3) | 5 customs simultáneos + ~100 tenants SaaS |
| **Fase 2** (SaaS vivo + customs mantenimiento) | 3-4 | 1 Opus parcial 30-40% + 2 Sonnet | ~250 tenants + 5 customs en mantenimiento |

**Punto de inflexión:** 6+ agentes en un solo proyecto se pisan. Máximo 4-5 bien particionados en dominios ortogonales.

---

## Pregunta de namespace respondida

Arquitecto recomendó `@octo/hotel-*` si el nombre comercial no es "Bravas". Daniel confirmó el 2026-11-10 el placeholder **BravasHotel** → se usa `@octo/bravashotel-*` hasta decisión final de nombre.

---

## Desbloqueo de Fase 0

Con esta reunión consolidada y el placeholder confirmado, **todos los bloqueantes de Fase 0 están resueltos:**

- ~~Nombre comercial~~ → placeholder `BravasHotel` ✓  
- ~~Decisión arquitectónica~~ → Opción C confirmada ✓  
- ~~Slots de extensión~~ → arquitecto confirmó viabilidad ✓

**Fase 0 comienza hoy 2026-11-10.**

### Entregables de Fase 0

1. **Catálogos exhaustivos** — 11 sectores core + 2 transversales (13 archivos `.md` en `memory/catalogos/`)
2. **Mapa geográfico** — matriz Común / AR / ES por módulo
3. **Arquitectura de paquetes** — `@octo/bravashotel-*` completa (28 módulos + infra)
4. **Rename global** — reemplazar "bravas" por `BravasHotel` en toda la documentación cuando Daniel confirme el nombre definitivo

---

## Siguiente paso (post Fase 0)

Scaffolding del codebase: Next.js 16 + TypeScript + Tailwind + Supabase + Vercel. Repo `Octo-Soluciones-Digitales/bravashotel` (nombre provisional). Se crea cuando ≥5 catálogos core estén en estado `review`.

---

*Consolidado escrito por: bravas · 2026-11-10 12:07*
