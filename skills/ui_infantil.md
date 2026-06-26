# UI Visual — Aquelentonces

> Defino y protejo los estándares visuales de la app. Soy la skill que garantiza coherencia de marca, tokens, comportamiento de hover y accesibilidad.

## Mi responsabilidad
Implementar y custodiar el sistema visual de Aquelentonces: tokens de color, tipografía, componentes visuales, interacciones y responsive.

## Cuándo me activan
- Al implementar cualquier componente visual o página nueva
- Al revisar tokens CSS o definir nuevas variables
- Al evaluar si un hover, animación o color es correcto
- Al añadir un nuevo tema de paleta

## Lo que sé de este proyecto

### Identidad visual
- **Fuente única**: Lexend Deca (Google Fonts) — display y body
- **Tono**: cálida, íntima, femenina pero no rosa — para madres que quieren guardar momentos
- **Referente**: BackThen (backthen.com) — layout limpio, fotos grandes, tipografía bold

### Sistema de tokens (resumen operativo)
```css
/* Consumir siempre vía --aq-s-* o --sofia-* (aliases) */
var(--aq-s-bg)             /* fondo principal */
var(--aq-s-bg-2)           /* fondo secundario / chip */
var(--aq-s-card)           /* fondo de cards */
var(--aq-s-texto-fuerte)   /* texto principal bold */
var(--aq-s-texto)          /* texto cuerpo */
var(--aq-s-texto-suave)    /* texto secundario */
var(--aq-s-texto-tenue)    /* texto muy suave / labels */
var(--aq-s-acento)         /* lima — elemento activo, botón CTA */
var(--aq-s-acento-borde)   /* borde de énfasis */
var(--aq-s-borde)          /* borde normal */
var(--aq-s-borde-suave)    /* borde muy suave */
var(--aq-s-borde-debil)    /* separador / línea */
var(--aq-s-sidebar-bg)     /* fondo sidebar petróleo */
var(--aq-s-cta)            /* lima (mismo que acento) */
var(--aq-radio)            /* border-radius estándar */
var(--aq-radio-sm)         /* border-radius pequeño */
var(--aq-radio-lg)         /* border-radius grande */
var(--aq-radio-pill)       /* border-radius pill */
var(--aq-font)             /* Lexend Deca */
var(--aq-transition)       /* transición estándar */
var(--aq-sombra-sm)        /* sombra pequeña */
var(--aq-sombra)           /* sombra normal */
```

### Paleta de marca (primitivos — para referencia)
| Token | Hex | Uso |
|-------|-----|-----|
| `--aq-p-petroleo` | `#417178` | Sidebar, headers, texto fuerte sobre lavanda |
| `--aq-p-lima` | `#E5FE73` | Acento activo, botones CTA, check completado |
| `--aq-p-crema` | `#FAF6ED` | Fondo claro, cards sobre fondos oscuros |
| `--aq-p-lavanda` | `#A6B1E7` | Secciones especiales ("En este día", perfil hijo) |
| `--aq-p-verde-claro` | `#C0D2C7` | Logros, confirmaciones suaves |
| `--aq-p-petroleo-oscuro` | `#335B60` | Sidebar hover, variante oscura |

### Reglas de hover (irrompibles)
- **NUNCA `translateY` en hover** — los elementos no se mueven ni suben
- Solo `box-shadow`, `opacity`, `border-color` o `background` cambian en hover
- Las transiciones usan `var(--aq-transition)`

### Animaciones permitidas
- `cubic-bezier(0.34, 1.56, 0.64, 1)` — para checks, pops, elementos que "aparecen"
- `cubic-bezier(0.22, 1, 0.36, 1)` — para sheets y overlays (slideUp)
- `cubic-bezier(0.5, 0, 0.5, 1)` — para progress bars

### Temas activos
| ID | Nombre | Descripción |
|----|--------|-------------|
| `aquelentonces` | Principal | Crema + petróleo + lima |
| `kelvar` | Oscuro | Petróleo oscuro como fondo base |

El tema activo se aplica con `data-palette="[id]"` en `<html>`.

### Patrones visuales establecidos
- **Secciones especiales**: fondo `--aq-p-lavanda` (usado en "En este día" y perfil de hijo)
- **Eyebrow labels**: 11-12px, 700-800 weight, letter-spacing 0.12-0.16em, uppercase, color acento
- **Títulos de página**: `clamp(32px, 5vw, 56px)`, weight 900, letter-spacing -2px
- **Cards de entrada**: borde izquierdo 4px de color del tipo, padding 22px 24px
- **FAB global**: 60px círculo, petróleo, bottom-right 28px/32px, z-index 200
- **Estado vacío**: símbolo tipográfico grande (◌) + título bold + texto suave

### Emojis y símbolos
- **Cero emojis** en la UI — nunca `🎉 ✅ 📸`
- **Símbolos tipográficos** permitidos: `◌ ★ ✦ · ◎` (para mood y estados especiales)
- **Iconos**: solo Lucide React, `strokeWidth={2}`, tamaño coherente con contexto

## Cómo trabajo
1. Verifico que el componente usa `var(--aq-s-*)` o `var(--sofia-*)` — nunca hex
2. Reviso que el hover no tenga `translateY`
3. Confirmo que los tamaños responden con `clamp()` en títulos principales
4. En mobile (`max-width: 768px`) — padding reducido, font-size ajustado

## Lo que NO hago
- No escribo queries Firestore
- No tomo decisiones de estructura de carpetas
- No uso hex directo en ningún componente
- No agrego `translateY` en hover bajo ninguna circunstancia
