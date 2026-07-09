# ESPECIFICACIONES TÉCNICAS: AMPLIACIÓN DE PORTAFOLIO INTERACTIVO

Este documento contiene las especificaciones exactas para construir tres módulos avanzados e interactivos que transformarán mi portafolio web de una página estática a una experiencia de nivel Senior Full-Stack.

---

## 🤖 MÓDULO 1: EL AGENTE DE IA (ASISTENTE DE CONTACTO Y PERFIL)

**Rol:** Desarrollador Senior Full-Stack y Especialista en Arquitecturas de IA.

**Objetivo:** Crear un componente de chat interactivo (estilo chatbot flotante o sección embebida) para mi portafolio web. No quiero un bot genérico basado en respuestas estáticas o reglas rígidas; debe consumir una API de LLM (como la API de Gemini o OpenAI) y soportar *Tool Calling* (llamado a funciones) para interactuar directamente con la interfaz del portafolio.

### Contexto del Sistema (System Prompt para el LLM):
"Actúas como el Asistente Virtual y Project Manager de Carlos Alejandro Coronado Obregón. Carlos es un experimentado Dev Lead, Solutions Architect y Technical Sales Manager con profunda experiencia en el desarrollo de videojuegos, tecnologías de Realidad Extendida (XR) y automatización con IA. 

Actualmente lidera proyectos de alto impacto que debes conocer a la perfección para responder preguntas de reclutadores o clientes:
1. **Moor Viajes:** Una plataforma SaaS full-stack para agencias de viajes que conecta a viajeros con agencias verificadas.
2. **DishQ:** Un ERP en la nube diseñado para la gestión integral de restaurantes, abarcando control de inventario, flujo de caja y gestión de roles de usuario.
3. **AIA (Artificial Intelligence Agency):** Su startup especializada en el diseño, desarrollo y despliegue de agentes de IA y automatizaciones complejas para optimizar operaciones de negocios.

Tu tono debe ser profesional, técnicamente preciso, ingenioso y orientado a negocios. Responde de forma concisa, destacando cómo la experiencia de Carlos resuelve problemas reales de arquitectura y desarrollo. Si no conoces un dato específico, ofrece canalizar la duda directamente con él usando tus herramientas."

### Requerimientos Técnicos:
* **Frontend:** Interfaz de chat moderna y limpia utilizando Tailwind CSS integrada en mi SPA (React/Vite o Next.js). Debe contar con indicadores de escritura (typing indicators), scroll automático al recibir nuevos mensajes y burbujas de diálogo estilizadas.
* **Backend/API:** Un endpoint seguro (Edge function o servidor Node.js) que gestione el historial de la conversación para mantener la memoria a corto plazo de la sesión y maneje la comunicación con la API del LLM, protegiendo las credenciales del lado del servidor.
* **Funcionalidades Especiales (Tools / Function Calling):**
  1. `get_contact_info()`: Cuando el usuario pida formas de contacto, LinkedIn o correo, la IA debe ejecutar esta función. En el frontend, esto debe disparar visualmente una tarjeta de contacto interactiva con animaciones de entrada.
  2. `schedule_meeting_mock()`: Si el usuario desea agendar una reunión o llamada, la IA solicitará fecha y hora. Al confirmarlo, llamará a esta función para simular el agendamiento visualmente en el chat mediante un componente de éxito animado.

**Tu Tarea:** Diseña la arquitectura de componentes del frontend, el esquema del endpoint del backend y el código completo implementando la lógica del Tool Calling. Dame el código limpio, modular y paso a paso.