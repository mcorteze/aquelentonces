# Flujo activo — Aquelentonces
Actualizado: 2026-06-26

## Tarea actual
Perfil de hijo expandido completado. Próximo: Módulo Fotos comentadas.

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
- 2026-06-26 "En este día": Firestore IN sobre array de fechas (10 años), lavanda como color de sección, agrupado por año
- 2026-06-26 Perfil de hijo: /app/hijos/:id, ChildProfilePage lavanda + línea de tiempo de entradas propias

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
- HomePage `/app/inicio`: REDISEÑADO — cards marca, eyebrow, 4 módulos
- DailyTasks `/app/tareas`: REDISEÑADO — tabs Hoy/Mi rutina, CRUD templates, asignación por días, variaciones + animación check
- Diario `/app/diario`: COMPLETO — línea de tiempo + FAB global + "En este día" (sección lavanda)
- Mis Hijos `/app/hijos`: lista + cards clicables al perfil
- Perfil de hijo `/app/hijos/:id`: COMPLETO — header lavanda, "El libro de [nombre]", línea de tiempo propia
- Mi Perfil `/app/perfil`: funcional

## Pendiente (orden de prioridad)
- [ ] Módulo Fotos comentadas — subir foto con pie de foto, fecha, hijo asociado
- [ ] Módulo Muro familiar
- [ ] Módulo Calendario
- [ ] Resumen mensual generado (diferido)

## Completado esta sesión
- ✅ Módulo Diario completo: tipos + Firestore + hooks + DiaryPage (línea de tiempo)
- ✅ FAB global: botón + desde cualquier pantalla, EntrySheet animado, 5 tipos con prompts
- ✅ Selector de hijo activo (Zustand store)
- ✅ Sidebar actualizado: enlace a Diario con BookOpen icon
- ✅ Vista "En este día": hook useThisDayEntries + sección lavanda en DiaryPage + agrupado por año
- ✅ Animación check pop (scale spring) en cards de rutina
- ✅ Perfil de hijo expandido: ChildProfilePage, ruta :id, cards ChildrenList navegables
- ✅ Push a GitHub: commits fdc6bd9 + acf0f00

## Contexto crítico
- Zustand: selectores individuales `(s) => s.field` — NUNCA destructuring
- CSS: --aq-s-* o --sofia-* (aliases de --aq-s-*); nunca hex directo en componentes
- Hover: NUNCA translateY — prohibido mover elementos en hover (regla global)
- Firebase project ID: aquelentonces-32783
- Puerto dev: 5173 (bat en Escritorio)
- GitHub: https://github.com/mcorteze/aquelentonces

## Historial
- Sesión anterior: landing v1→v4, sistema tokens 4 capas, paletas, providers fix
- Sesión previa: identidad interior, módulo Rutina Diaria completo, memoria corregida
- Sesión actual: Diario + FAB + "En este día" + animación check + perfil de hijo
