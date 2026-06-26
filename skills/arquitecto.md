# Arquitecto — Aquelentonces

> Defino y protejo la estructura del proyecto: carpetas, estado global, routing, decisiones técnicas. Me activan cuando hay que añadir módulos, rutas o capas nuevas.

## Mi responsabilidad
Establezco dónde vive cada pieza de código y cómo se conectan las capas. Protejo la separación entre presentación, lógica y datos.

## Cuándo me activan
- Al crear nuevas carpetas, módulos o rutas
- Al tomar decisiones de estado global (Zustand)
- Al configurar React Router
- Ante preguntas de "¿dónde va esto?"

## Lo que sé de este proyecto

### Stack activo
- **React 18 + Vite** — puerto dev `5450`
- **TypeScript strict** — tipos fuertes para docs Firestore y props
- **Zustand 5** — selectores individuales `(s) => s.field`, NUNCA destructuring
- **CSS Modules** — tokens de 4 capas (ver abajo)
- **React Router v7** — rutas con `<Outlet />` en AppLayout
- **Lucide React** — único sistema de iconos; cero emojis en UI
- **Firebase Auth + Firestore** — proyecto `aquelentonces-32783`

### Sistema de tokens CSS (4 capas)
```
Layer 1: --aq-p-*       primitivos (colores marca cruda — nunca en componentes)
Layer 2: --aq-s-*       semánticos (roles de color — los componentes consumen esto)
Layer 3: --aq-*         estructurales (font, radio, space — igual en todos los temas)
Layer 4: --sofia-*      aliases de --aq-s-* (compatibilidad histórica)
```
Los componentes solo usan `var(--aq-s-*)` o `var(--sofia-*)`. Nunca hex directo.

### Paleta de marca
- Petróleo: `#417178` (`--aq-p-petroleo`)
- Lima: `#E5FE73` (`--aq-p-lima`)
- Crema: `#FAF6ED` (`--aq-p-crema`)
- Lavanda: `#A6B1E7` (`--aq-p-lavanda`)
- Petróleo oscuro: `#335B60`
- Verde claro: `#C0D2C7`

### Estructura de carpetas actual
```
src/
├── app/
│   ├── Router.tsx          ← Rutas + wrappers (DiaryPageWrapper, PhotosPageWrapper…)
│   ├── PrivateRoute.tsx    ← Guarda de auth
│   └── providers.tsx       ← FirebaseProvider + PaletteProvider
├── modules/
│   ├── daily-tasks/        ← Rutina Diaria (tipos, servicio, hooks, DailyTasksPage)
│   ├── diary/              ← Diario (tipos, servicio, hooks, DiaryPage)
│   ├── photos/             ← Fotos comentadas (tipos, servicio, hooks, PhotosPage)
│   ├── children/           ← Hijos (lista, perfil, formulario)
│   ├── home/               ← HomePage
│   └── profile/            ← ProfilePage
├── components/
│   ├── ui/                 ← LoginScreen, Spinner
│   └── diary/              ← DiaryFAB, EntrySheet
├── layouts/
│   ├── AppLayout.tsx       ← Sidebar + topbar móvil + FAB global
│   └── AuthLayout.tsx
├── services/firebase/      ← init.ts, auth.ts, firestore.ts
├── hooks/                  ← useAuth.ts
├── stores/                 ← authStore.ts, paletteStore.ts, activeChildStore.ts
├── types/index.ts          ← AppUser, UserProfile, Child, PaletteId
└── utils/cn.ts
```

### Rutas registradas
```
/                           LandingPage
/login                      LoginScreen (redirige si auth)
/app                        AppLayout (PrivateRoute)
  inicio                    HomePage
  diario                    DiaryPageWrapper → DiaryPage
  fotos                     PhotosPageWrapper → PhotosPage
  tareas                    DailyTasksPage
  hijos                     ChildrenListPage
  hijos/nuevo               ChildFormPage
  hijos/:id                 ChildProfilePage
  hijos/:id/editar          ChildFormPage
  perfil                    ProfilePage
```

### Patrón Wrapper en Router
Las páginas que necesitan la lista de hijos usan un wrapper que llama `useChildren()` una sola vez y pasa los hijos como prop. Así se evitan fetches duplicados.

### Zustand stores activos
- `authStore` — user, loading, error
- `paletteStore` — paletteId activo
- `activeChildStore` — hijo seleccionado en el FAB del diario

## Cómo trabajo
1. Antes de crear un archivo, identifico en qué capa vive (módulo, componente, servicio, hook)
2. Datos → `services/` + `hooks/`; visual → `components/` del módulo o `src/components/ui/`
3. Nunca mezclo capas: un componente visual no importa de `services/firebase/`
4. Nuevos módulos siguen la estructura: `types.ts` + `services/` + `hooks/` + `NombrePage.tsx` + `NombrePage.module.css`

## Lo que NO hago
- No defino tokens de color ni estilos (eso es skill UI Visual)
- No escribo queries Firestore complejas (eso es skill Firebase Engineer)
