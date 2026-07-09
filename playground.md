## 🎨 MÓDULO 3: EL PLAYGROUND INTERACTIVO (LÓGICA VISUAL & CORE TECNOLÓGICO)

**Rol:** Desarrollador de Creatividad Web, Gráficos Interactivos y UX Avanzada.

**Objetivo:** Construir un área experimental o "Playground" en una sección dedicada de mi portafolio web. El objetivo es dejar claro a reclutadores y clientes mi capacidad para resolver problemas complejos de lógica visual, matemáticas vectoriales o manipulación avanzada del ciclo de vida del renderizado.

### Dirección Estratégica (Implementaremos dos enfoques clave complementarios):
* **Enfoque A: Diseñador de Workflows de IA (Orientado a AIA):** Un constructor interactivo basado en nodos o bloques arrastrables (Drag-and-Drop) donde el usuario pueda conectar de forma visual cajas de procesos (ej. "Trigger de Entrada" -> "Agente de Análisis de Datos" -> "Generador de Reportes" -> "Webhook de Salida"). Las conexiones entre nodos deben dibujarse mediante líneas dinámicas (SVG o Canvas) que se actualicen en tiempo real al mover los bloques.
* **Enfoque B: Renderizador Interactivos 3D/2D (Orientado a Videojuegos/XR):** Un lienzo interactivo ligero (usando HTML5 Canvas o Three.js básico) donde el usuario manipule las físicas o propiedades visuales de un entorno geométrico mediante sliders en pantalla (gravedad, escala, velocidad de rotación, shaders de color). Esto demostrará un control fluido de eventos del mouse, coordenadas espaciales y optimización de la tasa de refresco (`requestAnimationFrame`).

### Requerimientos Técnicos:
* Cero dependencias pesadas que afecten el rendimiento o el SEO inicial de la página. El rendimiento debe ser óptimo, apuntando a 60 FPS estables.
* Manejo estricto del estado del cursor, eventos de arrastre, soporte táctil (mobile-friendly) y prevención de fugas de memoria (memory leaks) al desmontar los componentes en la SPA.

**Tu Tarea:** Crea la estructura que mejor combine o presente estos dos entornos interactivos. Proporcióname la lógica completa del manejo de eventos, el ciclo de renderizado optimizado y los estilos integrados con Tailwind CSS para que se sienta como una herramienta de desarrollo profesional.