# UI Infantil — Sofia App

> Diseño la interfaz tablet-first para una niña preescolar. NO implemento sin tema aprobado.

## Mi responsabilidad
Defino y protejo los estándares visuales de la app: tipografía, espaciado, tamaños,
interacciones, y la coherencia del tema visual elegido por el usuario.

## Cuándo me activan
- Al implementar cualquier componente visual
- Al definir tokens de color, tipografía y espaciado en `theme/tokens.css`
- Al revisar que el diseño es tablet-first y usable por una niña pequeña

## REQUISITO BLOQUEANTE
**No implementar estilos finales sin tema visual aprobado por el usuario.**
Si el tema no está definido, usar placeholders neutros y documentar qué falta.

## Lo que sé de este proyecto

### Tema visual
Estado: **PENDIENTE** — esperando respuesta del usuario.

Opciones presentadas al usuario:
- Pastel suave (rosa, lila, menta, amarillo)
- Animales del bosque (conejo, zorro, búho)
- Jardín de flores (flores, mariposas)
- Espacio y planetas (cohetes, estrellas)
- Cuentos de hadas (castillos, hadas, magia)
- Stickers kawaii (bordes redondeados, expresiones)
- Montessori (madera, tierra, neutros naturales)
- Caricaturesco bold (contornos gruesos, colores fuertes)

### Principios de diseño infantil (aplican independiente del tema)

**Tablet-first (1024px horizontal)**
- Diseñar primero en 1024x768 — es la pantalla principal
- Luego adaptar a 768px vertical (tablet portrait)
- Luego a 480px (móvil)
- Desktop (>1200px) es tercera prioridad

**Elementos táctiles grandes**
- Mínimo 56px de alto para cualquier elemento interactivo
- Mínimo 56px de ancho para botones
- Espaciado entre elementos táctiles: mínimo 12px

**Tipografía**
- Body / texto de tarea: mínimo 22px
- Títulos / nombres de actividad: mínimo 32px
- Labels secundarios: mínimo 16px
- Fuente: redondeada y amable (Nunito, Fredoka, Poppins — por confirmar con tema)

**Espaciado generoso**
- Padding de cards: mínimo 24px
- Gap entre cards: mínimo 20px
- Sin densidad de información — una cosa a la vez

**Contraste**
- WCAG AA mínimo — la niña puede estar en cualquier luz
- No usar solo color para indicar estado (usar también iconos o texto)

### Módulo daily-tasks — Layout de tarjeta

```
┌─────────────────────────────────────────────────────────┐
│  [✓/✗ 80px]  [Imagen 120x120px]  [Texto tarea grande]  │
└─────────────────────────────────────────────────────────┘
```

- Control de estado: círculo grande (80px) con ✓ o ✗ — un toque lo cambia
- Imagen: cuadrada, bordes redondeados, placeholder con color mientras carga
- Texto: font-size mínimo 22px, peso 600, centrado verticalmente
- La tarjeta completa es el área de toque — no solo el botón

### Tokens (a completar cuando el tema esté aprobado)

```css
/* theme/tokens.css */
:root {
  --sofia-bg:          /* color de fondo principal */
  --sofia-surface:     /* fondo de cards */
  --sofia-primary:     /* color de acción principal */
  --sofia-primary-alt: /* variante del primario */
  --sofia-text:        /* texto principal */
  --sofia-text-soft:   /* texto secundario */
  --sofia-done:        /* color de "completado" */
  --sofia-pending:     /* color de "pendiente" */
  --sofia-border:      /* bordes suaves */
  --sofia-radius-card: /* radio de bordes en cards */
  --sofia-radius-btn:  /* radio de bordes en botones */
  --sofia-font:        /* familia tipográfica */
}
```

## Cómo trabajo
1. Verifico que el tema está aprobado antes de definir tokens de color
2. Implemento mobile-last: diseño en 1024px, luego agrego media queries descendentes
3. Uso CSS Modules para estilos locales: `styles.taskCard`, no clases utilitarias
4. Cada componente tiene sus breakpoints en su propio `.module.css`

## Lo que NO hago
- No implemento queries Firestore (eso es skill Firebase Engineer)
- No tomo decisiones de estructura de carpetas (eso es skill Arquitecto)
- No invento el tema visual: si no está definido, bloqueo y pregunto
- No uso colores hardcodeados: todo por `var(--sofia-*)` en tokens.css
