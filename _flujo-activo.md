# Flujo activo — Aquelentonces
Actualizado: 2026-06-26

## Tarea actual
Módulo Fotos comentadas completado. Sistema en pausa para informe de coordinador.

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
- 2026-06-26 Fotos: mock-first — imageUrl vacío hasta Storage; galería por meses, grid 3 col

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
- AppLayout sidebar: 6 ítems (Inicio, Diario, Fotos, Rutina, Mis hijos, Mi perfil)
- HomePage `/app/inicio`: 5 módulos (incluye Fotos)
- DailyTasks `/app/tareas`: COMPLETO — tabs Hoy/Mi rutina, CRUD templates, animación check
- Diario `/app/diario`: COMPLETO — timeline + FAB global + "En este día"
- Fotos `/app/fotos`: COMPLETO (mock-first) — galería por meses, PhotoSheet, Firestore listo
- Mis Hijos `/app/hijos`: lista clicable → perfil
- Perfil de hijo `/app/hijos/:id`: "El libro de [nombre]" con timeline de entradas
- Mi Perfil `/app/perfil`: funcional

## Pendiente (orden de prioridad)
- [ ] Firebase Storage para Fotos — integrar subida real de imágenes (DIFERIDO)
- [ ] Módulo Muro familiar
- [ ] Módulo Calendario
- [ ] Resumen mensual generado (diferido)

## Completado esta sesión
- ✅ Vista "En este día" (hook + sección lavanda)
- ✅ Animación check pop en rutina
- ✅ Perfil de hijo expandido (ChildProfilePage)
- ✅ Módulo Fotos comentadas (tipos + Firestore + hooks + galería + PhotoSheet)
- ✅ Sidebar actualizado con Camera + Fotos
- ✅ HomePage con 5 módulos
- ✅ Push a GitHub: commits fdc6bd9 + acf0f00 + 079c33d

## Contexto crítico
- Zustand: selectores individuales `(s) => s.field` — NUNCA destructuring
- CSS: --aq-s-* o --sofia-* (aliases de --aq-s-*); nunca hex directo en componentes
- Hover: NUNCA translateY — prohibido mover elementos en hover (regla global)
- Firebase project ID: aquelentonces-32783
- Puerto dev: 5450 (vite.config.ts) — bat en Escritorio/Desarrollo
- GitHub: https://github.com/mcorteze/aquelentonces
- Firebase Storage: DIFERIDO — imageUrl queda vacío hasta integrar

## Historial
- Sesión anterior: landing v1→v4, sistema tokens 4 capas, paletas, providers fix
- Sesión previa: identidad interior, módulo Rutina Diaria completo, memoria corregida
- Sesión actual: Diario + FAB + "En este día" + animación check + perfil hijo + Fotos
