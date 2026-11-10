# Catálogo exhaustivo — F&B Cocina

> Ficha canónica del módulo F&B Cocina para el SaaS multi-tenant Bravas. Sigue la estructura de 17 secciones del `_TEMPLATE_catalogo_sector.md`. **NOTA CRÍTICA DE SCOPE:** este módulo cubre exclusivamente la PRODUCCIÓN de alimentos y bebidas (kitchen). El servicio al cliente (salón, bar, room service) pertenece al módulo `@octo/bravashotel-fb-service`. La interfaz entre ambos es la LÍNEA DE PASE.

---

## 1. Identificación del módulo

| Campo | Valor |
|---|---|
| **Nombre (es-ES)** | Cocina / F&B Producción |
| **Nombre (es-AR)** | Cocina / A&B Cocina |
| **Nombre (en)** | Kitchen / F&B Production |
| **Código técnico** | `@octo/bravashotel-kitchen` |
| **Tipo** | Core (siempre activo en todo tenant) |
| **Versión del catálogo** | v1.0 — 2026-11-10 |
| **Autor** | bravas |
| **Dependencias de otros módulos** | `@octo/bravashotel-storeroom` (recepción de materias primas, control de stock), `@octo/bravashotel-fb-service` (recibe pedidos vía KDS, informa línea de pase), `@octo/bravashotel-hr` (gestión del personal de cocina) |
| **Módulos dependientes de éste** | `@octo/bravashotel-fb-service` (consume producción, opera sobre recetas), `@octo/bravashotel-storeroom` (Cocina consume stock del economato), `@octo/bravashotel-guest-experience` (recibe alertas de alérgenos comunicadas) |
| **Activación default** | Siempre activo |

---

## 2. Propósito del módulo

- **Qué resuelve:** gestionar integralmente la operación de producción culinaria del hotel: desde la planificación del menú y la mise en place hasta el control de temperatura, la gestión de APPCC, la producción por partidas, el control de mermas y el pedido al economato. El módulo garantiza que la cocina produce con calidad, dentro de los estándares sanitarios obligatorios (APPCC/HACCP) y con visibilidad sobre costos (escandallo de recetas).

- **Qué NO resuelve:** la toma de pedidos de los clientes (eso es `fb-service`), el cobro al huésped (eso es `fb-service` vía POS/folio), la gestión del stock y proveedores del economato (eso es `storeroom`), la gestión de la sala del restaurante o el bar (eso es `fb-service`).

- **Métrica principal de éxito del sector:** food cost real vs food cost teórico (escandallo) por receta y por período. Objetivo: desviación <3-5%.

---

## 3. Roles del sector

| Rol | Título (es-ES) | Título (es-AR) | Título (en) | Nivel jerárquico | Reporta a | Supervisa a | Multi-rol |
|---|---|---|---|---|---|---|---|
| Jefe del sector | Chef Ejecutivo | Chef Ejecutivo | Executive Chef | 2 | Director General / Director F&B | Sous Chef(s) + toda la brigada | En hoteles chicos, es también Sous Chef de su propia cocina |
| Sub-jefe | Sous Chef | Sous Chef | Sous Chef | 3 | Chef Ejecutivo | Jefes de partida | En hoteles chicos, puede cubrir una o dos partidas |
| Jefe de partida caliente | Jefe de Cocina Caliente | Cocinero de Partida Caliente | Chef de Partie (Hot) | 4 | Sous Chef | Cocineros asignados a su partida | — |
| Jefe de partida fría | Jefe de Cocina Fría | Cocinero de Partida Fría | Chef de Partie (Cold) | 4 | Sous Chef | Cocineros asignados a su partida | — |
| Jefe de pastelería | Jefe de Pastelería | Pastelero Jefe | Pastry Chef / Chef Pâtissier | 4 | Sous Chef / Chef Ejecutivo | Pasteleros | En hoteles chicos puede ser el mismo Sous Chef |
| Jefe garde manger | Jefe de Entremetier / Garde Manger | Cocinero Garde Manger | Garde Manger Chef | 4 | Sous Chef | Cocineros fríos | En hoteles chicos fusionado con partida fría |
| Cocinero de línea | Cocinero | Cocinero | Line Cook / Cook | 5 | Jefe de partida | — | — |
| Plonge / Steward | Steward / Fregador | Bachero / Plonge | Kitchen Steward / Dishwasher | 5 | Jefe de partida / Sous Chef | — | Puede rotar entre limpieza de cocina y lavado de vajilla |

**Variantes por tamaño de hotel:**
- Boutique chico (<40 habs): Chef + 1 cocinero. Sin brigada estructurada. El chef hace mise en place, cocina y supervisa el único turno.
- Urbano 4* mediano: Chef Ejecutivo + Sous Chef + 2-3 jefes de partida + 3-5 cocineros + 1-2 plonge.
- Resort 5* grande: Chef Ejecutivo + 2-3 Sous Chefs por outlet + brigada completa por outlet (hasta 15-20 personas en cocina).
- 5* lujo con firma: Chef Ejecutivo titular + posiblemente un "chef invitado" con estrella Michelin (modelo Mandarin Ritz con Dacosta).

---

## 4. Portales del sistema que toca este módulo

| Portal | ¿Toca? | Qué muestra/hace |
|---|---|---|
| Portal Huésped | no | — |
| Portal Operativo del sector | sí | KDS (kitchen display system): pedidos entrantes desde salón, estado de cada plato, mise en place del día, temperatura logs, prep tasks activas, gestión de partidas |
| Portal Supervisor/Jefe | sí | Panel del Chef/Sous Chef: planificación de menú, escandallos, recetas, control de mermas, pedidos a Economato, registro APPCC, gestión de brigada |
| Portal Dirección | sí | KPIs de cocina: food cost real vs teórico, mermas, rendimiento de partidas |
| **GX inbox (dual-fire)** | sí | Alertas de alérgenos cuando un plato tiene restricción: dual-fire a GX si el huésped tiene alérgeno registrado y pide ese plato |

---

## 5. Catálogo exhaustivo de funciones

| # | Función | Descripción | Rol que ejecuta | Portal donde aparece | Trigger | Frecuencia | Criticidad | Dual-fire GX |
|---|---|---|---|---|---|---|---|---|
| 1 | Apertura de cocina | Protocolo de apertura: verificación de temperaturas (cámaras frías, congeladores), estado de equipos (horno, plancha, frituras), limpieza de superficies, check de mise en place del turno anterior | Sous Chef / Jefe de partida | Operativo | manual (inicio de turno) | diaria | core | no |
| 2 | Briefing de brigada | Reunión rápida al inicio del servicio: platos del día, reservas especiales, alérgenos a tener en cuenta, 86 (platos agotados), novedades del turno | Chef Ejecutivo / Sous Chef | Operativo | manual | diaria | core | no |
| 3 | Mise en place de partida caliente | Preparaciones previas al servicio para la partida caliente: fondos, salsas, cortes, marinados. El sistema muestra lista de mise en place basada en el menú del día y las reservas confirmadas | Jefe de partida caliente + cocineros | Operativo | automático (basado en reservas + menú del día) | diaria | core | no |
| 4 | Mise en place de partida fría | Preparaciones previas para partida fría: ensaladas, ceviches, emplatado de fríos, postres fríos, salsas frías | Jefe de partida fría + cocineros | Operativo | automático (basado en reservas + menú del día) | diaria | core | no |
| 5 | Mise en place de pastelería | Preparaciones de pastelería: masas, bizcochos, cremas, montaje de postres, pan del día | Jefe de pastelería + pasteleros | Operativo | automático (basado en reservas + menú del día) | diaria | core | no |
| 6 | Recepción de pedido desde KDS | Cuando F&B Servicio envía un pedido (mesa o room service), aparece en el KDS de cocina. El sistema distribuye los platos a las partidas correspondientes automáticamente según la receta asignada | Cocineros / Jefe de partida | Operativo (KDS) | automático (via fb-service) | continua durante servicio | core | no |
| 7 | Producción de plato y marcado como listo | El cocinero prepara el plato y lo marca como "listo" en el KDS. El sistema notifica a F&B Servicio que el plato está en la línea de pase | Cocinero / Jefe de partida | Operativo (KDS) | manual (producción completada) | continua durante servicio | core | no |
| 8 | Gestión de la línea de pase | Supervisión de la línea de pase: verificar que los platos de una misma mesa salen juntos, temperatura correcta, presentación correcta, comunicación con sala via KDS | Sous Chef / Jefe de partida | Operativo | manual / continuo durante servicio | continua durante servicio | core | no |
| 9 | Marcar plato como "86" (agotado) | Cuando un ingrediente clave se acaba, el cocinero marca el plato como agotado (86). El KDS notifica automáticamente al portal de F&B Servicio para que el mesero informe al cliente y retire el plato del menú activo | Jefe de partida / Sous Chef | Operativo | manual | eventual durante servicio | core | no |
| 10 | Control de temperatura — registro de equipos fríos | Registro de temperatura de cámaras frigoríficas, congeladores y zonas de trabajo frío. Registro cada turno (mínimo 2 veces al día). Alerta si temperatura sale de rango APPCC | Sous Chef / Jefe de partida | Operativo | manual / automático (si hay sensor conectado) | 2 veces al día mínimo | core | no |
| 11 | Control de temperatura — alimentos críticos | Registro de temperatura de alimentos en puntos críticos de control APPCC: temperatura de cocción (>65°C para aves, >70°C para carne picada), temperatura de servicio (>65°C caliente, <8°C frío) | Cocinero / Jefe de partida | Operativo | manual (sonda) | por cada lote crítico | core | no |
| 12 | Registro de temperatura — `temperature_log` | Generación de un registro digital de temperatura con: equipo/alimento, temperatura medida, operador, resultado (OK / fuera de rango), acción correctiva si aplica. Firmado digitalmente | Sous Chef / Cocinero | Operativo | manual / automático | continua | core | no |
| 13 | Alerta de temperatura fuera de rango | Si una temperatura registrada está fuera del rango APPCC, el sistema genera alerta inmediata al Sous Chef y Chef Ejecutivo con el plato/equipo afectado y sugiere acción correctiva (desechar, recalentar, ajustar equipo) | Sistema / Sous Chef | Operativo + Supervisor | automático | eventual | core | no |
| 14 | Apertura de partida y asignación de cocinero | El Sous Chef asigna qué cocinero trabaja en cada partida para el turno. El sistema registra la asignación para trazabilidad de producción | Sous Chef | Supervisor/Jefe | manual al inicio de turno | diaria | importante | no |
| 15 | Cierre de partida | Al final del servicio, el jefe de partida cierra su partida: verificación de mise en place sobrante, registro de mermas, tapado y etiquetado de elaboraciones (fecha, contenido, alérgenos), limpieza de zona | Jefe de partida | Operativo | manual (fin de servicio) | diaria | core | no |
| 16 | Cierre de cocina | Protocolo de cierre: verificación de apagado de equipos (horno, freidora, hornillas), limpieza general, temperatura de cámaras a OK, check de seguridad (gas, agua), firma del cocinero de guardia | Sous Chef / Jefe de partida | Operativo | manual (fin de turno) | diaria | core | no |
| 17 | Creación de receta / ficha técnica | Alta de nueva receta en el sistema: nombre, categoría, ingredientes con gramajes exactos, proceso de elaboración paso a paso, foto del plato terminado, presentación, tiempo de producción, porciones | Chef Ejecutivo / Sous Chef | Supervisor/Jefe | manual | eventual | core | no |
| 18 | Escandallo de receta | Cálculo automático del coste unitario del plato basado en los ingredientes de la receta y los precios actuales del economato. Genera: food cost teórico, food cost %, precio de venta sugerido (con margen objetivo) | Chef Ejecutivo / Sous Chef | Supervisor/Jefe | automático (tras crear receta) / manual (recalcular) | eventual / mensual | core | no |
| 19 | Actualización de precio de ingrediente | Cuando Economato actualiza el precio de un insumo, todas las recetas que lo usan recalculan automáticamente el escandallo. Alerta si el food cost de algún plato supera el umbral definido | Sistema (automático desde Economato) | Supervisor/Jefe | automático | continua | importante | no |
| 20 | Gestión de alérgenos en receta | Registro de los 14 alérgenos obligatorios (ES/AR) por receta: gluten, crustáceos, huevos, pescado, cacahuetes, soja, lácteos, frutos de cáscara, apio, mostaza, sésamo, sulfitos, moluscos, altramuces. Los alérgenos de la receta se propagan automáticamente al portal de F&B Servicio y al portal del huésped | Chef Ejecutivo / Sous Chef | Supervisor/Jefe | manual al crear/editar receta | eventual | core | sí (si huésped tiene alérgeno registrado) |
| 21 | Alerta de alérgeno — huésped en riesgo | Si un huésped tiene un alérgeno registrado en su perfil (vía PMS) y el mesero ingresa un pedido que lo contiene, el sistema genera alerta en KDS cocina y dual-fire a GX para confirmación antes de producir | Sistema | Operativo (KDS) + GX | automático | eventual | core | sí |
| 22 | Planificación del menú diario / semanal | El Chef define el menú del día o de la semana: platos del día, sugerencias del chef, menú de temporada. El sistema calcula automáticamente el mise en place necesario basado en las reservas confirmadas del restaurante (integración con fb-service) | Chef Ejecutivo | Supervisor/Jefe | manual | diaria / semanal | core | no |
| 23 | Planificación de menú para evento especial | Para banquetes, cenas privadas, o eventos del hotel: creación de menú ad-hoc, confirmación de cantidades por comensal, cálculo de mise en place masivo, pedido adicional a Economato si falta stock | Chef Ejecutivo / Sous Chef | Supervisor/Jefe | manual (trigger desde fb-service o dirección) | eventual | importante | no |
| 24 | Pedido de materias primas a Economato | El chef genera una solicitud de pedido a Economato con los ingredientes necesarios para el período siguiente (día, semana). El sistema puede sugerir el pedido automáticamente basado en el menú planificado y el stock disponible | Chef Ejecutivo / Sous Chef | Supervisor/Jefe | manual / automático (sugerido) | diaria / semanal | core | no |
| 25 | Consumo de stock desde Economato | Al usar un ingrediente en cocina (producción real), el sistema descuenta del stock del Economato. El consumo puede ser manual (el cocinero registra) o automático (basado en pedidos servidos × receta) | Jefe de partida / Sistema | Operativo | manual / automático | continua durante producción | core | no |
| 26 | Registro de merma | Alta de un registro de merma: ingrediente, cantidad descartada, causa (caducidad, error de elaboración, rotura, deterioro), cocinero responsable. Se descuenta del stock del Economato y del food cost real | Jefe de partida / Sous Chef | Operativo | manual | diaria / eventual | core | no |
| 27 | Análisis de mermas por período | Reporte de mermas acumuladas en el período: por ingrediente, por partida, por causa. Comparativa vs período anterior. Alerta si una merma supera umbral definido | Chef Ejecutivo | Supervisor/Jefe + Dirección | automático (EOM) | mensual | importante | no |
| 28 | Gestión de elaboraciones previas (batch cooking) | Registro de elaboraciones en grandes cantidades para múltiples servicios: fondos, salsas madre, masas, pre-cocidos. Etiquetado con fecha de elaboración, fecha de caducidad, cantidad, alérgenos | Sous Chef / Jefe de partida | Operativo | manual | diaria / semanal | importante | no |
| 29 | Control de caducidades en producción | El sistema trackea las fechas de elaboración y caducidad de las preparaciones registradas. Alerta automática cuando una preparación se acerca a su fecha límite o la supera | Sistema | Operativo | automático | continua | core | no |
| 30 | Gestión de fichas de limpieza y desinfección (APPCC) | Registro de los procesos de limpieza y desinfección de equipos y superficies según el plan APPCC del hotel. Frecuencia, producto usado, operador, resultado, firma | Plonge / Jefe de partida | Operativo | manual | diaria / semanal | core | no |
| 31 | Gestión de fichas de proveedores y recepción de materia prima | Registro de la recepción de materias primas: proveedor, producto, lote, fecha de caducidad, temperatura en recepción (cadena de frío), estado del embalaje, aceptado / rechazado | Sous Chef / Jefe de partida | Operativo | manual (recepción de pedido desde Economato) | diaria | core | no |
| 32 | Verificación de cadena de frío | Control de temperatura de materias primas en el momento de recepción. Rechazo automático si la temperatura está fuera del rango APPCC. Registro en `temperature_log` | Sous Chef / Jefe de partida | Operativo | manual (recepción) | diaria | core | no |
| 33 | Gestión del plan APPCC del hotel | Alta y mantenimiento del plan APPCC completo: puntos críticos de control (PCC), límites críticos por punto, procedimientos de seguimiento, acciones correctivas, procedimientos de verificación, registros | Chef Ejecutivo | Supervisor/Jefe | manual (setup inicial + revisiones) | anual / tras auditoría | core | no |
| 34 | Preparación para inspección sanitaria | Generación de un paquete de documentación para inspecciones: registros de temperatura del período, registros de limpieza, plan APPCC, certificaciones de manipulación de alimentos del personal, registros de mermas y caducidades | Chef Ejecutivo | Supervisor/Jefe | manual | eventual (antes de inspección) | core | no |
| 35 | Gestión del personal de cocina — asistencia y turno | El Chef/Sous Chef registra la asistencia del personal de cocina al inicio del turno y puede reportar ausencias. Integración con RRHH para fichaje | Sous Chef | Operativo | manual / automático (fichaje) | diaria | importante | no |
| 36 | Formación de brigada en recetas nuevas | Registro de sesiones de formación interna: receta enseñada, cocineros asistentes, fecha. Garantiza que todos los cocineros que producen un plato conocen la receta estándar | Chef Ejecutivo / Sous Chef | Supervisor/Jefe | manual | eventual | importante | no |
| 37 | Reporte diario de producción | Resumen del servicio: platos producidos por receta, discrepancias con mise en place previsto, alertas de temperatura, mermas del día, estado de stock estimado | Sous Chef | Supervisor/Jefe + Dirección | automático (EOS — end of service) | diaria | importante | no |
| 38 | Reporte mensual de food cost | Comparativa del food cost real (consumo de Economato por cocina) vs food cost teórico (escandallo × platos servidos). Desviaciones por receta. Sugerencias de ajuste de recetas o precios de carta | Chef Ejecutivo | Dirección | automático (EOM) | mensual | core | no |

### Sub-flujos clave (pseudocódigo simple)

```
Función: "Recepción de pedido y producción desde KDS"
1. Mesero en sala toma pedido (via fb-service portal / POS)
2. Pedido se transmite a KDS de cocina en tiempo real
3. KDS distribuye automáticamente cada plato a la pantalla de la partida responsable:
   - Platos calientes → pantalla partida caliente
   - Platos fríos → pantalla partida fría
   - Postres → pantalla pastelería
4. Jefe de partida / cocinero ve el plato en su pantalla:
   - Número de mesa, hora de pedido, alérgenos del huésped si tiene perfil
   - Si hay alerta de alérgeno → alerta visual/sonora en KDS → dual-fire a GX
5. Cocinero produce el plato
6. Cocinero marca "listo" en KDS (toque en pantalla)
7. KDS notifica a mesero en sala que el plato está en la línea de pase
8. Sous Chef verifica presentación en línea de pase → libera el plato
9. Mesero retira el plato y lo sirve a la mesa
10. Sistema registra: tiempo desde pedido hasta pase (KPI de cocina)
```

```
Función: "Escandallo automático con actualización de precios"
1. Chef crea nueva receta: nombre, ingredientes con gramajes, proceso
2. Sistema consulta precios actuales de Economato por ingrediente
3. Calcula food cost unitario: Σ (gramaje_ingrediente × precio_por_kg / 1000)
4. Calcula food cost %: food_cost_unitario / precio_de_venta_carta × 100
5. Si food_cost % > umbral objetivo (ej: 35%): alerta al Chef con sugerencia
6. Cuando Economato actualiza el precio de un insumo (nuevo contrato de proveedor):
   - Sistema recalcula automáticamente todas las recetas que usan ese ingrediente
   - Si alguna receta supera el umbral: alerta al Chef Ejecutivo y Director F&B
7. Chef puede ajustar: receta (reducir gramaje), precio de venta (actualizar carta), o aceptar desviación
```

```
Función: "Control APPCC — registro de temperatura crítica"
1. Cocinero toma temperatura de alimento en punto crítico de control (sonda calibrada)
2. Registra en app/portal: equipo/alimento, temperatura, turno, operador
3. Sistema valida contra límites APPCC configurados:
   - Cocción ave: >65°C por >2 min → OK
   - Servicio caliente: >65°C → OK
   - Refrigeración: 0°C a 8°C → OK
   - Congelación: <-18°C → OK
4. Si dentro de rango: registro guardado con estado "conforme"
5. Si fuera de rango: alerta inmediata al Sous Chef con acción correctiva sugerida
   - Recalentar / cocinar más tiempo
   - Desechar lote
   - Revisar equipo (si es equipo defectuoso → OT Mantenimiento)
6. Sous Chef registra la acción correctiva tomada
7. Todo el registro queda en `temperature_log` con audit trail completo para inspección sanitaria
```

```
Función: "Cierre de cocina con control APPCC y transferencia de stock"
1. Fin del servicio → Jefe de partida inicia cierre de partida
2. Registro de elaboraciones sobrantes: producto, cantidad, fecha de elaboración, caducidad, almacenamiento (cámara fría / congelador)
3. Registro de mermas: producto, cantidad descartada, causa → descuento automático de stock en Economato
4. Verificación de temperaturas de cámaras y congeladores → temperatura_log
5. Limpieza y desinfección de equipos y superficies → registro en APPCC
6. Sous Chef cierra partidas
7. Verificación final: gas cerrado, equipos apagados, puertas de cámaras cerradas, alarma activada
8. Sous Chef firma digitalmente el cierre de cocina
9. Sistema genera reporte fin de servicio: platos producidos, mermas, alertas del turno
```

---

## 6. Entidades de datos

| Entidad | Es owner | Es consumer | Campos core | Campos extensibles | Relaciones |
|---|---|---|---|---|---|
| `recipe` | sí | no | id, nombre, categoría (entrante/principal/postre/etc), subcategoría, porciones, ingredientes JSONB (ingrediente_id, gramaje, unidad), proceso_elaboracion TEXT, foto_url, tiempo_produccion_min, alérgenos JSONB (14 alérgenos booleanos), activa (bool), creado_por_chef_id | custom_fields JSONB, notas_maridaje | → `dish`, → `ingredient` (Economato), → `allergen` |
| `dish` | sí | no | id, recipe_id, nombre_carta, precio_venta, food_cost_unitario (calculado), food_cost_pct (calculado), disponible_hoy (bool), foto_url, descripción_carta, outlet_id | custom_fields JSONB, descripción_es_AR, descripción_en | → `recipe`, → `kitchen_order_item` (fb-service), → `allergen` |
| `allergen` | sí | consumer (fb-service consume) | id, código (gluten/crustaceos/huevos/etc), nombre_es_ES, nombre_es_AR, nombre_en, icono_url | — | → `recipe`, → `dish`, → `guest` (perfil alergias, via PMS) |
| `kitchen_order` | consumer (owner: fb-service) | sí | id, origen (mesa/room_service/banquete), mesa_id, fecha_hora, items JSONB, estado, tiempo_total_pase_segundos | — | → `dish`, → `prep_task`, → `temperature_log` |
| `prep_task` | sí | no | id, tipo (mise_en_place/batch_cooking/elaboracion), nombre, receta_id, cantidad, unidad, turno_fecha, partida (caliente/fria/pasteleria/garde_manger), asignado_a_user_id, estado (pendiente/en_proceso/completada), completado_datetime | custom_fields JSONB | → `recipe`, → `temperature_log` |
| `temperature_log` | sí | no | id, tipo (equipo/alimento/recepcion_materia_prima), referencia_nombre, temperatura_medida, unidad (celsius), limite_min, limite_max, resultado (conforme/no_conforme), operador_user_id, accion_correctiva TEXT, equipo_sonda_id, turno, organization_id | custom_fields JSONB | → `work_order` (Mantto si equipo defectuoso) |
| `waste_log` | sí | no | id, ingrediente_id, cantidad, unidad, causa (caducidad/error_elaboracion/rotura/deterioro/excedente), partida, operador_user_id, fecha_turno, coste_estimado | custom_fields JSONB | → `ingredient` (Economato stock), → `recipe` (receta origen) |

**Diagrama ER simplificado:**

```
recipe ───< dish ───< kitchen_order_item (fb-service)
  │
  ├──< allergen ──> guest (PMS FO)
  └──< ingredient (Economato)

prep_task ──> recipe
          └──> temperature_log

waste_log ──> ingredient (Economato — descuenta stock)

temperature_log ──> work_order (Mantto — equipo defectuoso)
```

---

## 7. Máquinas de estado

```
prep_task:
  PENDIENTE ──inicio de producción──> EN_PROCESO
  EN_PROCESO ──completada──> COMPLETADA
  EN_PROCESO ──cancelada (ingrediente faltante / 86)──> CANCELADA
  PENDIENTE ──86 (plato agotado)──> CANCELADA

dish (disponibilidad):
  DISPONIBLE ──86 manual o stock insuficiente──> NO_DISPONIBLE
  NO_DISPONIBLE ──stock reabastecido / decisión chef──> DISPONIBLE
  DISPONIBLE ──fuera de menú (temporada)──> ARCHIVADO
  ARCHIVADO ──vuelta a carta──> DISPONIBLE

kitchen_order (desde fb-service):
  RECIBIDO ──cocinero acepta──> EN_PRODUCCION
  EN_PRODUCCION ──todos los platos listos──> LISTO_PARA_PASE
  LISTO_PARA_PASE ──mesero retira──> ENTREGADO
  EN_PRODUCCION ──cancelación por cliente (via fb-service)──> CANCELADO
```

---

## 8. Integraciones externas

| Integración | Tipo | Dirección | Obligatoria/Opcional | Observaciones |
|---|---|---|---|---|
| KDS (Kitchen Display System) — hardware físico | Display hardware / API | bidireccional | Opcional (Bravas puede ser el KDS vía tablet) | Si el hotel ya tiene KDS físico (ej: Rational CPCIS, iKentoo, Copper): integrar via REST/WebSocket. Si no tiene: Bravas Portal en tablet = KDS |
| POS (iCG, Lightspeed, Toast) | Point of Sale | inbound (recibe pedidos) | Opcional (Bravas puede ser el POS para F&B) | Si hotel usa POS externo, los pedidos del salón viajan de POS → Bravas KDS. Si usa Bravas POS integrado en fb-service: nativo |
| `@octo/bravashotel-storeroom` (Economato) | Módulo interno | bidireccional | Obligatorio | Recetas consumen ingredientes del Economato (stock); pedidos de cocina generan solicitudes en Economato; precios actualizados en Economato recalculan escandallos |
| `@octo/bravashotel-fb-service` | Módulo interno | bidireccional | Obligatorio | Recibe pedidos del salón/room service; envía estado de platos (listo/86/cancelado); comparte catálogo de platos/alérgenos |
| `@octo/bravashotel-hr` | Módulo interno | inbound | Obligatorio | Recibe datos de personal de cocina (fichajes, roles, turnos) |
| `@octo/bravashotel-maintenance` | Módulo interno | outbound | Obligatorio | Envía OT cuando un equipo de cocina falla (temperatura fuera de rango por equipo defectuoso, avería) |
| `@octo/bravashotel-guest-experience` | Módulo interno | outbound (dual-fire) | Obligatorio | Alerta de alérgeno del huésped en pedido activo |

---

## 9. Mapa geográfico (Común / AR / ES / Split)

| Funcionalidad | Común | AR-only | ES-only | Split | Observaciones |
|---|---|---|---|---|---|
| Gestión de recetas y escandallos | ✓ | | | | Universal |
| Producción por partidas (brigada) | ✓ | | | | Universal |
| KDS / recepción de pedidos | ✓ | | | | Universal |
| Control de temperatura (APPCC/HACCP) | ✓ | | | | APPCC/HACCP es norma internacional; ambos países la requieren |
| Registro de mermas | ✓ | | | | Universal |
| Gestión de los 14 alérgenos obligatorios | ✓ | | | | ES: Reglamento UE 1169/2011 (14 alérgenos). AR: Resolución SENASA 541/2010 y CONAL — lista compatible, con pequeñas variaciones; usar la lista EU de 14 cubre ambos |
| Certificación de manipuladores de alimentos | | | | ✓ | ES: curso de manipulador de alimentos obligatorio (cada CCAA exige formato y renovación distinta). AR: libreta sanitaria municipal obligatoria para cada empleado de cocina |
| APPCC — validación por autoridad | | | | ✓ | ES: AESAN (Agencia Española de Seguridad Alimentaria) + inspecciones autonómicas + modelos de autocontrol por CCAA. AR: SENASA (habilitación nacional para establecimientos) + habilitaciones municipales (CABA: GCBA/SENASA) |
| Registro sanitario del establecimiento | | | | ✓ | ES: inscripción en Registro General Sanitario de Empresas Alimentarias y Alimentos (RGSEAA). AR: habilitación municipal + SENASA si vende a terceros |
| Etiquetado de alérgenos en carta (obligatorio) | | | ✓ | | ES: Reglamento UE 1169/2011 → información de alérgenos obligatoria en cartas de restaurantes; en AR recomendación sin obligatoriedad legal universal (aunque CABA tiene normativa propia) |
| Libreta sanitaria / carné manipulador | | ✓ | | | AR: libreta sanitaria municipal/provincial obligatoria para todos los manipuladores de alimentos; Bravas: campo en ficha de empleado |

---

## 10. Slots de extensión (crítico para N2 + multi-tenant)

### 10.1 Campos custom por entidad

```
recipe.custom_fields: JSONB (ej: "maridaje_vino", "origen_ingrediente", "certificación_orgánica")
dish.custom_fields: JSONB (ej: "descripción_extendida_en_menu", "precio_temporada_alta")
prep_task.custom_fields: JSONB
temperature_log.custom_fields: JSONB (ej: "número_de_lote", "proveedor")
waste_log.custom_fields: JSONB
```

### 10.2 Workflows custom

Hooks disponibles:
- `pre_recipe_create`: tenant puede exigir campos adicionales obligatorios (ej: "proveedor del ingrediente estrella", "certificado de origen")
- `post_recipe_create`: tenant puede activar revisión del Jefe de F&B antes de publicar receta
- `post_temperature_log_non_conforme`: tenant puede enviar SMS al chef ejecutivo inmediatamente
- `pre_dish_86`: tenant puede requerir confirmación del Sous Chef antes de marcar como agotado
- `post_waste_log_create`: tenant puede notificar al responsable de sostenibilidad

### 10.3 Integraciones per-tenant

- KDS hardware: Rational CPCIS, iKentoo, Copper, otro custom
- POS externo: iCG, Lightspeed, Toast, Square, otro
- Software de gestión de recetas: Apicbase, Galley, CostGuard, otro (importación de recetas)
- Sensor de temperatura IoT: integración con sondas digitales compatibles (HACCP managers)

### 10.4 Branding/UI per-tenant

- Nombre del módulo (ej: "La Cocina", "Kitchen", "Producción")
- Nomenclatura de partidas (el tenant puede renombrar "partida caliente" a "parrilla" si es un asador)
- Foto del plato en KDS (opcional)

### 10.5 Idiomas

- Diccionario i18n del sector (tabla sección 11); "mozo" vs "mesero" vs "camarero" para menciones cruzadas en KDS

---

## 11. Nomenclatura i18n (tabla de términos del sector)

| Término técnico | es-ES default | es-AR default | en default | Customizable por tenant |
|---|---|---|---|---|
| executive_chef | "Chef Ejecutivo" | "Chef Ejecutivo" | "Executive Chef" | ✓ |
| sous_chef | "Sous Chef" | "Sous Chef" | "Sous Chef" | ✓ |
| chef_de_partie | "Jefe de Partida" | "Cocinero de Partida" | "Chef de Partie" | ✓ |
| pastry_chef | "Jefe de Pastelería" | "Pastelero Jefe" | "Pastry Chef" | ✓ |
| garde_manger | "Garde Manger" | "Garde Manger" | "Garde Manger" | ✓ |
| kitchen_steward | "Steward / Fregador" | "Bachero / Plonge" | "Kitchen Steward" | ✓ |
| mise_en_place | "Mise en Place" | "Mise en Place" | "Mise en Place" | ✓ |
| pass_line | "Línea de Pase" | "Línea de Pase" | "Pass Line" | ✓ |
| eighty_six | "Plato Agotado (86)" | "Plato Agotado (86)" | "86 / Out of Stock" | ✓ |
| food_cost | "Coste de Alimentos" | "Costo de Alimentos" | "Food Cost" | ✓ |
| recipe | "Receta / Ficha Técnica" | "Receta / Ficha Técnica" | "Recipe" | ✓ |
| escandallo | "Escandallo" | "Escandallo / Costeo de Receta" | "Recipe Costing" | ✓ |
| waste | "Merma" | "Merma / Desperdicio" | "Waste" | ✓ |
| appcc | "APPCC" | "HACCP" | "HACCP" | — (no customizable — término legal) |
| allergen | "Alérgeno" | "Alérgeno" | "Allergen" | ✓ |
| temperature_log | "Registro de Temperaturas" | "Registro de Temperaturas" | "Temperature Log" | ✓ |
| batch_cooking | "Elaboración en Batch" | "Producción en Lote" | "Batch Cooking" | ✓ |

---

## 12. Compliance / Normativa

| Norma | Jurisdicción | Impacto en el módulo |
|---|---|---|
| Reglamento (CE) 852/2004 — APPCC/HACCP | ES (UE) | Obligación de implementar sistema APPCC (Análisis de Peligros y Puntos Críticos de Control) en establecimientos de restauración. Bravas: módulo gestiona el plan APPCC, registros de temperatura, registros de limpieza |
| AESAN — Modelos de autocontrol autonómicos | ES | Cada Comunidad Autónoma puede tener modelo de autocontrol propio (ej: RACSA en Cataluña, MAYA en Andalucía). Bravas: plantillas de APPCC configurables por CCAA |
| Reglamento (UE) 1169/2011 — Información alérgenos | ES (UE) | 14 alérgenos obligatorios en cartas y fichas técnicas. Bravas: gestión de los 14 alérgenos en recetas y propagación a carta y GX |
| SENASA — habilitación de establecimientos gastronómicos | AR | Establecimientos que producen y sirven alimentos para consumo humano deben estar habilitados por SENASA (si elaboran + distribuyen) o por autoridad municipal. Bravas: campo número de habilitación en tenant config |
| GCBA — habilitaciones municipales gastronómicas | AR (CABA) | Habilitación municipal obligatoria para restaurantes en CABA; inspecciones periódicas; Bromatología GCBA. Bravas: registro de habilitación y vencimiento en tenant config |
| Código Alimentario Argentino (CAA) | AR | Marco legal para producción de alimentos. Incluye temperaturas de conservación, manipulación, etiquetado. Bravas: límites APPCC configurados según CAA |
| CONAL — Resolución de alérgenos | AR | El Código Alimentario Argentino ha incorporado normas sobre declaración de alérgenos (en línea con Codex Alimentarius). Bravas: lista de 14 alérgenos compatible |
| Libreta sanitaria / carné de manipulador de alimentos | AR + ES | AR: libreta sanitaria municipal obligatoria para manipuladores. ES: formación en higiene alimentaria obligatoria (certificado por CCAA). Bravas: campo en ficha de empleado (integración con HR) |
| PRL / SyH — riesgos laborales en cocina | ES + AR | Cocina tiene riesgos específicos: quemaduras, cortes, resbalones, exposición a calor. Protocolo de equipos de protección individual (EPI). Bravas: check de EPIs en apertura de cocina; incidentes registrados en Seguridad |

---

## 13. Dependencias del lifecycle del módulo

**Qué pasa si el módulo se ACTIVA después del hotel ya corriendo:**
- Datos iniciales requeridos (seed): catálogo de ingredientes del Economato (mínimo los que usa la cocina), recetas iniciales del menú actual, plan APPCC básico, umbrales de temperatura por equipo y alimento, listado de equipos de cocina para control
- Flujo de setup inicial: (1) importar/crear recetas y fichas técnicas, (2) configurar alérgenos por receta, (3) configurar plan APPCC (puntos críticos de control + límites), (4) configurar partidas de cocina, (5) asignar personal a partidas, (6) configurar integración con KDS/POS si aplica
- Si el hotel ya tiene un Excel de recetas: importador CSV de recetas con columnas estándar

**Qué pasa si el módulo se DESACTIVA:**
- Datos que quedan: recetas (patrimonio del hotel), temperature_logs (historial APPCC), waste_logs, escandallos históricos
- Datos irrecuperables: configuración del plan APPCC activo (se debe re-configurar si se reactiva)
- Procedimiento de archivo: exportar catálogo de recetas a PDF/CSV, exportar registros APPCC del período en curso a PDF firmado
- Módulos afectados: fb-service pierde catálogo de platos activos y alérgenos (crítico — no desactivar sin coordinar)

---

## 14. Métricas / KPIs del sector

| KPI | Fórmula | Frecuencia | Dónde se ve | Benchmarks |
|---|---|---|---|---|
| Food cost real | coste de materias primas consumidas / ingresos F&B × 100 | mensual | Dashboard Dirección + Portal Chef | Referencia sector: 25-35% |
| Desviación food cost real vs teórico | (food_cost_real - food_cost_teórico) / food_cost_teórico × 100 | mensual | Portal Chef + Dirección | Objetivo: <5% |
| Mermas por período | total_coste_mermas / coste_total_materias_primas × 100 | mensual | Portal Chef + Dirección | Objetivo: <3%; alerta si >5% |
| Alertas APPCC (temperaturas no conformes) | COUNT(temperature_log WHERE resultado=no_conforme) | diaria | Portal Chef (alerta inmediata) | Objetivo: 0 por turno |
| Tiempo medio de pase (cocina → mesa) | AVG(tiempo desde kitchen_order recibido hasta estado listo_para_pase) | por servicio | Portal Chef | Objetivo: <15 min almuerzo/cena estándar |
| Platos marcados como 86 (agotados) | COUNT(dish WHERE disponible_hoy=false AND agotado_hoy=true) | diaria | Portal Chef + fb-service | Variable; gestión de mise en place mejora este KPI |
| Recetas con food cost > umbral | COUNT(recipe WHERE food_cost_pct > umbral_objetivo) | mensual | Portal Chef | Objetivo: 0 (gestionar precio o receta) |
| Cobertura APPCC (registros completados vs requeridos) | registros_completados / registros_requeridos × 100 | semanal | Portal Chef | Objetivo: 100% |

---

## 15. Pantallas/vistas del módulo

| Pantalla | Portal | Rol que la ve | Función principal | Mockup existente |
|---|---|---|---|---|
| `/kitchen/kds` | Operativo | Jefe de partida / Cocinero | KDS: pedidos activos, estado por plato, alertas | sí — demo/empleado-cocina.html (parcial) |
| `/kitchen/kds/pass` | Operativo | Sous Chef | Vista línea de pase: pedidos listos para salir | sí — demo/empleado-chef.html (parcial) |
| `/kitchen/prep` | Operativo | Jefe de partida | Mise en place del turno: tasks pendientes/en proceso/completadas | no |
| `/kitchen/temps` | Operativo | Jefe de partida / Sous Chef | Registro de temperaturas: nuevo log, histórico, alertas | no |
| `/kitchen/waste` | Operativo | Jefe de partida | Registro de mermas: nuevo, listado del turno | no |
| `/kitchen/recipes` | Supervisor | Chef Ejecutivo / Sous Chef | Catálogo de recetas: buscar, ver, editar | no |
| `/kitchen/recipes/new` | Supervisor | Chef Ejecutivo | Alta de receta nueva con escandallo | no |
| `/kitchen/recipes/:id` | Supervisor | Chef Ejecutivo / Sous Chef | Ficha técnica completa: ingredientes, proceso, alérgenos, escandallo | no |
| `/kitchen/menu-plan` | Supervisor | Chef Ejecutivo | Planificación del menú diario/semanal | no |
| `/kitchen/appcc` | Supervisor | Chef Ejecutivo | Gestión del plan APPCC: PCCs, registros, reportes de inspección | no |
| `/kitchen/stock-request` | Supervisor | Chef Ejecutivo / Sous Chef | Pedido de materias primas a Economato | no |
| `/kitchen/reports` | Supervisor + Dirección | Chef Ejecutivo | Food cost real vs teórico, mermas, KPIs del período | no |
| `/kitchen/team` | Supervisor | Chef Ejecutivo | Asignación de brigada por turno y partida | no |

---

## 16. Riesgos conocidos y preguntas abiertas

- **Riesgo 1 — Integración KDS/POS:** hay decenas de sistemas POS en el mercado. La integración con cada uno requiere desarrollo específico. Plan de mitigación: definir "Bravas es el POS + KDS" como opción default para clientes sin POS previo; ofrecer conectores para los 3-5 POS más usados en AR/ES (iCG, Lightspeed, Toast).
- **Riesgo 2 — APPCC en multi-tenant:** cada hotel tiene su propio plan APPCC que puede ser auditado por las autoridades sanitarias. Los registros deben ser exportables en formato legible para inspectores (PDF con firma del chef). Plan de mitigación: generador de PDF de registros APPCC con firma digital.
- **Riesgo 3 — Consumo de stock automático vs manual:** el consumo automático de stock (basado en recetas × platos servidos) solo funciona bien si las recetas son exactas y el sistema POS/KDS captura todos los platos. En la práctica hay discrepancias. Plan de mitigación: modo híbrido (consumo automático + ajuste manual mensual en Economato).
- **Pregunta abierta 1 — ¿El módulo Kitchen incluye el Steward (plonge) o ese rol no tiene portal propio?** Propuesta: el Steward no tiene portal propio; sus tareas de limpieza aparecen como prep_tasks asignadas en la pantalla del jefe de partida. Decisión: Product/UX.
- **Pregunta abierta 2 — ¿El escandallo debe integrarse con el módulo de Comercial para actualizar el precio de carta automáticamente?** Podría generar conflictos si el sistema cambia precios de carta sin intervención del director. Propuesta: el sistema sugiere actualización de precio pero requiere aprobación del Chef + Director F&B. Decisión: Daniel.

---

## 17. Changelog del catálogo

| Fecha | Cambio | Autor |
|---|---|---|
| 2026-11-10 | Creación inicial del catálogo — v1.0 | bravas |
