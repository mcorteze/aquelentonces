# Flujo activo — Sofia App
Actualizado: 2026-06-26

## Objetivo principal
Construir la base completa de la app para madres: login seguro, perfil personal, gestión de hijos,
y sistema de paleta de colores. Todo antes de abordar funcionalidades (diario, tareas, etc.).

## Objetivos secundarios
1. **Seguridad**: rutas protegidas, reglas Firestore, datos privados por usuario, sin fugas
2. **Robustez técnica**: TypeScript strict, manejo de errores exhaustivo, sin lógica Firebase en UI
3. **Robustez web**: loading states, empty states, error boundaries, accesibilidad básica
4. **Consistencia UX**: navegación predecible, feedback inmediato, estados visuales claros
5. **Comodidad de la madre**: interfaz limpia, legible, sin ansiedad, confiable y cálida

---

## PLAN COMPLETO

### Bloque 1 — Infraestructura de identidad (ACTUAL)

**1A. Tipos TypeScript ampliados**
- `AppUser` → ya existe, mantener
- `UserProfile` → nombre display, photoURL, temaId, fechaCreacion, ultimoAcceso
- `Child` → id, nombre, fechaNacimiento, avatarEmoji, orden, activo
- `PaletteId` → tipo string literal con los IDs válidos de paleta

**1B. Firestore: estructura y servicios**
```
users/{uid}/
  profile         ← documento único (UserProfile)
  children/
    {childId}     ← documento por hijo (Child)
```
- `userProfileService.ts` → get, create, update
- `childrenService.ts` → getAll, add, update, delete
- Reglas de seguridad: solo el dueño lee/escribe sus datos

**1C. Sistema de paleta de colores**
- `paletteStore.ts` (Zustand) → paletteId activo, setPalette
- `usePalette.ts` → hook que aplica el data-palette al `<html>`
- `src/theme/palettes.css` → todas las paletas como `[data-palette="kelvar"] { ... }`
- Persistencia: se guarda en `users/{uid}/profile.temaId`
- El store se inicializa desde Firestore al autenticar
- Incluir al menos 6 paletas: Kelvar (default), + 5 variantes

**1D. Página Login**
- Rediseño desde cero: bienvenida cálida, texto humano, no técnico
- Google Sign-In como única opción (simple, seguro)
- Manejo explícito de errores por código Firebase (`auth/popup-blocked`, `auth/cancelled-popup-request`, etc.)
- Loading state en el botón durante el flujo OAuth
- Mensaje de privacidad: "Tus datos son privados y solo tú los ves"
- Accesibilidad: focus visible, aria-labels, role correcto

**1E. Página Mi Perfil**
- Foto de perfil (de Google, con referrerPolicy)
- Nombre editable (campo de texto, guardar en Firestore)
- Email (solo lectura, de Google)
- Selector visual de paleta de colores
- Botón cerrar sesión con confirmación visual
- Estado guardando / guardado

**1F. Página Mis Hijos**
- Lista de hijos ya registrados (cards con nombre + emoji + edad calculada)
- Botón "Agregar hijo/a"
- Orden arrastrable (fase futura, por ahora solo orden de creación)
- Estado vacío con mensaje amable

**1G. Página Agregar / Editar Hijo**
- Campo nombre (requerido, max 40 chars)
- Fecha de nacimiento (date picker, no futura)
- Selector de avatar emoji (cuadrícula visual, 20+ opciones)
- Validación inline con mensajes claros
- Guardar → feedback de éxito → volver a lista

**1H. AppLayout con navegación**
- Topbar: logo + nombre de la app + avatar + menu
- Sidebar en desktop/tablet (≥768px): navegación con íconos + labels
- Drawer en móvil (<768px): hamburguesa → sidebar como overlay
- Links: Inicio, Mis Hijos, Mi Perfil
- Indicador de ruta activa
- Avatar con photoURL de Google (con referrerPolicy)

**1I. Router y guards**
- `/login` → pública, redirige a `/app` si ya autenticado
- `/app` → redirect a `/app/inicio`
- `/app/inicio` → privada, página de bienvenida con accesos rápidos
- `/app/hijos` → privada, lista de hijos
- `/app/hijos/nuevo` → privada, agregar hijo
- `/app/hijos/:id/editar` → privada, editar hijo
- `/app/perfil` → privada, mi perfil
- `*` → 404 amable o redirect

---

## Decisiones técnicas de esta fase

| Decisión | Elección | Por qué |
|----------|----------|---------|
| Paletas | CSS data-attributes | Sin runtime JS, cambia al instante, hereda en toda la app |
| Avatares | Emojis | Sin dependencia de storage, universales, accesibles |
| Edición de nombre | Input inline con debounce | No requiere modal, feedback inmediato |
| Date picker | `<input type="date">` nativo | Sin librería extra, funciona en tablet táctil |
| Navegación | Sidebar fijo ≥768px, drawer <768px | Tablet-first: sidebar siempre visible en el uso principal |
| Errores Firebase Auth | Mapeo de códigos a mensajes humanos | La madre no debe ver "auth/popup-blocked" |
| Confirmación de logout | Inline (botón cambia a "¿Salir?") | Sin modal, más liviano |

---

## Reglas de UX para esta app (madre)

1. **Sin jerga técnica en la UI**: si algo falla, mensaje en español simple y accionable
2. **Feedback inmediato**: cualquier acción que tome >300ms muestra un indicador
3. **Sin pérdida de datos**: formularios guardan borrador si el usuario sale accidentalmente (fase futura)
4. **Confianza**: mencionar que los datos son privados en lugares clave (login, perfil)
5. **Sin sorpresas de navegación**: el botón de atrás siempre funciona como se espera
6. **Colores como identidad**: la madre elige su paleta y la app se siente "suya"

---

## Stack completo confirmado

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | React | 18 |
| Build | Vite | 6 |
| Lenguaje | TypeScript | strict |
| Estado global | Zustand | 5 |
| Routing | React Router | 7 |
| Auth | Firebase Authentication | 11 |
| DB | Firebase Firestore | 11 |
| Estilos | CSS Modules + tokens CSS | — |
| Fuente | Nunito (Google Fonts) | — |
| Iconos | Emojis + SVG inline | — |
| Hosting | Pendiente (Firebase Hosting o Vercel) | — |

---

## Completado hasta ahora
- [x] Proyecto Vite + TS creado
- [x] Firebase Auth + Firestore + Zustand instalados
- [x] authStore, FirebaseAuthProvider, useAuth
- [x] Tema KELVAR base en tokens.css
- [x] Módulo daily-tasks (base, pendiente de Firebase real)
- [x] LoginScreen, Spinner, AppLayout, AuthLayout básicos
- [x] PrivateRoute, Router base
- [x] Git inicializado, GitHub conectado, primer push ✓

## Pendiente (en orden)
- [ ] **1A** Tipos ampliados (UserProfile, Child, PaletteId)
- [ ] **1B** Firestore: userProfileService, childrenService
- [ ] **1C** Sistema de paletas (store + CSS + persistencia)
- [ ] **1D** Página Login rediseñada
- [ ] **1E** Página Mi Perfil
- [ ] **1F** Página Mis Hijos (lista)
- [ ] **1G** Página Agregar/Editar Hijo
- [ ] **1H** AppLayout con navegación completa
- [ ] **1I** Router con todas las rutas
- [ ] Prueba de build limpio
- [ ] Commit + push a GitHub

## Contexto crítico
- Credenciales Firebase: DIFERIDAS (no implementar hasta que el usuario las provea)
- Tema KELVAR es el default; la madre puede cambiarlo desde Mi Perfil
- La app será usada principalmente desde tablet de la madre, no de la niña
- Funcionalidades futuras: diario (profundo), tareas del día (ya base existe), más módulos
- GitHub: https://github.com/mcorteze/sofia
