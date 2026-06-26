# Flujo activo — Aquelentonces
Actualizado: 2026-06-26

## Tarea actual
Avances completados esta sesión:
1. ✅ Identidad visual interior — LoginScreen y HomePage rediseñados con brand Aquelentonces
2. ✅ Módulo Rutina Diaria — modelo nuevo implementado completo

## Decisiones tomadas (acumuladas)
- 2026-06-26 Paleta definitiva: petróleo #417178, lima #E5FE73, crema #FAF6ED, lavanda #A6B1E7, petróleo oscuro #335B60, verde claro #C0D2C7
- 2026-06-26 Sistema tokens 4 capas: --aq-p-* primitivos | --aq-s-* semánticos | --aq-* estructurales | --sofia-* aliases
- 2026-06-26 Paletas reducidas a 2: aquelentonces (principal) + kelvar (oscuro)
- 2026-06-26 Landing completa v4: arquitectura BackThen, picsum para fotos, tipografía clamp masiva
- 2026-06-26 Lucide React: sistema de iconos único, cero emojis
- 2026-06-26 Fuente: Lexend Deca para todo (display y body)
- 2026-06-26 LoginScreen: rediseñado con layout 2 columnas (panel decorativo petróleo + form crema)
- 2026-06-26 HomePage: rediseñado con cards de colores de marca, sin translateY en hover
- 2026-06-26 Módulo Rutina Diaria: nuevo modelo TaskTemplate + DaySchedule + DayVariation + DailyInstance

## Concepto Rutina Diaria (CRÍTICO)
- TaskTemplate: tarea base con días asignados y variaciones por día
- DailyInstance: registro de que fue completada (se convierte en recuerdo fechado)
- Vista "Hoy": filtra automáticamente por día de la semana
- Vista "Mi rutina": CRUD de templates + asignación de días + variaciones
- Colecciones Firestore: users/{uid}/taskTemplates + users/{uid}/taskInstances

## Estado actual del proyecto (2026-06-26)
- Firebase Auth + Firestore: funcionando
- Landing `/`: COMPLETA v4
- Login `/login`: REDISEÑADO — layout 2 cols, panel petróleo + form, sin emoji
- AppLayout sidebar: petróleo correcto, item activo lima, Lucide icons
- HomePage `/app/inicio`: REDISEÑADO — cards marca, eyebrow, 4 módulos (incluye Diario placeholder)
- Mis Hijos `/app/hijos`: funcional
- Mi Perfil `/app/perfil`: funcional
- DailyTasks `/app/tareas`: REDISEÑADO — tabs Hoy/Mi rutina, CRUD templates, asignación por días, variaciones
- Diario `/app/diario`: ruta creada, redirige a inicio (módulo pendiente de construir)

## Pendiente (orden de prioridad)
- [ ] Push commits a GitHub
- [ ] Módulo Diario de Notas (prioridad 1 del producto)
  - Crear notas de texto con fecha automática
  - Categorías: momento, logro, anécdota, etc.
  - Vista de línea de tiempo
  - Adjuntar foto (opcional, diferido)
- [ ] Sidebar: agregar enlace a Diario en nav
- [ ] Módulo Fotos comentadas
- [ ] Módulo Muro familiar
- [ ] Módulo Calendario

## Contexto crítico
- Zustand: selectores individuales `(s) => s.field` — NUNCA destructuring
- CSS: --aq-s-* o --sofia-* (aliases de --aq-s-*); nunca hex directo en componentes
- Hover: NUNCA translateY — prohibido mover elementos en hover (regla global)
- Firebase project ID: aquelentonces-32783
- Puerto dev: 5173 (bat en Escritorio)
- GitHub: https://github.com/mcorteze/aquelentonces

## Historial
- Sesión anterior: landing v1→v4, sistema tokens 4 capas, paletas, providers fix
- Sesión actual: _flujo-activo.md creado/actualizado, memoria corregida, identidad interior completa, módulo Rutina Diaria completo
