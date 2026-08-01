# ComicSansCon / He-Man Chat

## Descripción general

ComicSansCon es una aplicación web frontend-only construida como SPA con HTML, CSS y JavaScript puro.

El proyecto está pensado para ejecutarse como una aplicación estática/serveless en Vercel usando Vercel CLI, sin ningún backend tradicional.

## Enfoque del proyecto

- Solo frontend: no existe ni se utiliza ningún servidor Node/Express ni servidor backend en este repositorio.
- Deployment serverless: la app se despliega como sitio estático o aplicación frontend con Vercel.
- El objetivo es que otra IA entienda que todas las modificaciones deben hacerse en el cliente y en la configuración de Vercel, no en un backend personalizado.

## Funcionalidad actual

- Single Page Application (SPA) con rutas internas: `/`, `/chat`, `/about`.
- Navegación client-side usando History API (`pushState` / `popstate`).
- Página de chat con selección de personajes (`He-Man` y `Skeletor`).
- Respuestas simuladas en el frontend con mensajes generados localmente.
- Arquitectura modular: vistas en `src/views`, lógica de navegación en `src/servicios` y estilos en `src/CSS`.

## Alcance actual

- Proyecto educativo, sin backend ni servidor propio.
- Incluye una demostración de chat interactivo en el navegador.
- La lógica de IA o prompts se organiza en `src/API/chatApi.js`, pero el proyecto no usa un backend para procesar solicitudes.
- El deploy debe hacerse con Vercel CLI y la app debe funcionar como frontend estático/serveless.

## Estructura del proyecto

```
ProyectM3/
├─ .env
├─ index.html
├─ README.md
└─ src/
   ├─ API/
   │  └─ chatApi.js
   ├─ CSS/
   │  ├─ about.css
   │  ├─ chat.css
   │  ├─ MediaQueries.css
   │  ├─ navBar.css
   │  └─ styles.css
   ├─ servicios/
   │  ├─ main.js
   │  ├─ navigation.js
   │  └─ router.js
   └─ views/
      ├─ about.js
      ├─ chat.js
      └─ home.js
```

## Archivos importantes

- `index.html`: entrada principal de la aplicación.
- `src/servicios/main.js`: configura el router y la navegación sin recargas.
- `src/servicios/router.js`: define las rutas y renderiza las vistas.
- `src/servicios/navigation.js`: intercepta enlaces y hace navegación SPA.
- `src/views/home.js`: contenido de la página de inicio.
- `src/views/chat.js`: interfaz de chat y simulación de mensajes.
- `src/views/about.js`: información sobre el proyecto.
- `src/API/chatApi.js`: generación de prompts de personaje y puntos de extensión para lógica de IA.

## Vercel / Deployment

El proyecto debe desplegarse como frontend estático/serverless con Vercel. No hay servidor backend local ni procesos de Express.

Pasos básicos:

1. Instalar Vercel CLI si no está instalado:
   ```bash
   npm install -g vercel
   ```
2. Iniciar sesión en Vercel:
   ```bash
   vercel login
   ```
3. Servir localmente:
   ```bash
   vercel dev
   ```
4. Desplegar en producción:
   ```bash
   vercel --prod
   ```

Variables de entorno:

- Si se necesita `GEMINI_API_KEY` u otras variables, debe configurarse en Vercel como variables de entorno.
- En un proyecto frontend-only, los secretos no deben exponerse directamente en los archivos públicos.

## Contexto para otra IA

Esta aplicación se basa en una SPA frontend-only para la experiencia de usuario. Cualquier modificación debe:

- enfocarse en archivos del frontend (`index.html`, `src/**/*.js`, `src/CSS/**/*.css`);
- respetar que no hay backend ni servidor Node en el repositorio;
- considerar Vercel CLI como la herramienta de despliegue local y producción;
- evitar sugerir la creación de una carpeta `backend` o código de servidor en `backend`.

## Posibles mejoras

- Completar la integración de `src/API/chatApi.js` con un servicio externo desde el frontend.
- Añadir validación y manejo de historial de chat en `src/views/chat.js`.
- Mejorar la compatibilidad móvil y el diseño responsivo en `src/CSS`.
- Organizar el flujo de datos para que la app pueda consumir un servicio serverless o API de terceros sin backend propio.
