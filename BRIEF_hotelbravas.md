# Hotel Bravas — Brief inicial
**Fecha:** 2026-10-30
**Estado:** F1 — Demo navegable en construcción
**Cliente:** Contacto en España (estudiante de desarrollo de apps). Conoce el hotel (trabajó ahí o tiene contactos). Trajo la idea. Daniel le prepara la demo especulativa.
**Modelo de negocio:** A definir — ¿Daniel desarrolla? ¿Ella desarrolla con apoyo? ¿Proyecto Octo? Patrón Tile.

## Visión
App multi-portal para operación hotelera. Conecta huéspedes, empleados (limpieza, cocina, salón) y administración en un flujo de procesos en tiempo real.

## Portales

### Huésped
- Registro: por la app o en front desk (el empleado lo carga y el huésped descarga la app)
- Ve el estado de su habitación en tiempo real (limpieza en curso, terminada)
- Solicita servicios: limpieza, toallas, comida del bar, otros
- Reviews y feedback

### Empleado — Limpieza
- Checklist de tareas del día por habitación
- Actualiza estado (empezando, en curso, terminado)
- El huésped ve el estado en tiempo real

### Empleado — Cocina / Salón
- Recibe pedidos del portal de huésped
- Actualiza estado del pedido

### Admin
- Dashboard completo: qué está pasando en el hotel en tiempo real
- Historial por empleado (quién hizo qué, número de empleado, tiempo que duró)
- Historial por huésped (qué solicitó, cuándo, qué se resolvió)
- Estadísticas para optimización (tiempos, frecuencias, tendencias)

## Synergias — HotelBravas es un ensamblaje de patrones ya probados

No se construye de cero. Se toman piezas que ya existen y funcionan:

| Patrón | Origen | Qué aporta a HotelBravas |
|---|---|---|
| Checklist + tareas por sector + aviso al admin | **Tile** | Portal de limpieza, cocina, salón — flujo de tareas y notificaciones |
| Disponibilidad online + base de datos de clientes | **MIBA** | Reservas de habitaciones, historial de huéspedes (clientes → huéspedes) |
| Formularios de registro + perfiles | **MIBA** | Check-in digital, onboarding del huésped |
| Multi-rol / multi-portal | **Soup + Tile** | 4 portales distintos sobre la misma base |
| Estadísticas y optimización operativa | **Tile (admin)** | Dashboard de admin con historial y métricas |

Este proyecto es la síntesis más completa de todo lo que Octo sabe construir.

## Fases
- **Ahora (F1/F2)**: Demo navegable con los 4 portales y flujo entre ellos
- **Futuro**: Web con disponibilidad de habitaciones, reservas online, chatbot para consultas y derivaciones

## Stack
- Por definir (probablemente Next.js 16 + Supabase, alineado a doctrina Octo)
- Demo puede ser HTML navegable primero

## Demo F1
- **URL pública:** https://octosolucionesdigitales-png.github.io/hotel-bravas-demo/
- **Repo:** https://github.com/octosolucionesdigitales-png/hotel-bravas-demo
- **Pantallas:** 15 (intro + 5 huésped + 3 limpieza + 2 cocina + 4 admin)
- **Stack:** HTML puro navegable, navy + coral, Inter font
