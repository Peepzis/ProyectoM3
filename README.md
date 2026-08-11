# ComicSansCon / He-Man Chat

## Cómo levantar el proyecto

1. Instalá Node.js (si no lo tenés) y Vercel CLI de forma global:
   ```bash
   npm install -g vercel
   ```
2. Cloná el repositorio e instalá las dependencias:
   ```bash
   git clone <url-del-repositorio>
   cd ProyectM3
   npm install
   ```
3. Conseguí tu propia clave de API de Gemini en [Google AI Studio](https://aistudio.google.com/app/apikey) (es gratuita). Copiá `.env.example` como `.env` y completá esa clave:
   ```bash
   cp .env.example .env
   ```
   ```env
   GEMINI_API_KEY=tu_clave_aqui
   ```
4. Iniciá el proyecto localmente :
   ```bash
   vercel dev
   ```
   La primera vez te va a preguntar a qué proyecto de Vercel vincular la carpeta. Elegí **"Create a new project"** (no busques uno existente — el proyecto original pertenece a otra cuenta) y aceptá los valores por defecto que te proponga.

   Una vez levantado, abrí la URL local que te indique (normalmente `http://localhost:3000`) y navegá a `/chat`.

5. *(Opcional)* Si además querés probarlo desplegado en producción:
   ```bash
   vercel --prod
   ```
   Para que funcione, primero hay que cargar `GEMINI_API_KEY` en el dashboard de ese nuevo proyecto de Vercel (**Settings → Environment Variables**, aplicada a *Production*) — el `.env` local nunca se sube al servidor, hay que configurarla ahí manualmente.

## Descripción general

ComicSansCon es una aplicación web SPA para chatear con personajes de Masters del Universo, con una experiencia interactiva basada en HTML, CSS y JavaScript puro. El proyecto combina una interfaz de usuario del lado del cliente con una función serverless de Vercel para conectar con Gemini y generar respuestas en estilo de personaje.

## Qué incluye

- SPA con navegación interna en las rutas `/`, `/chat` y `/about`.
- Interfaz de chat con selección de personajes entre He-Man y Skeletor.
- Integración con Gemini a través de una API serverless en Vercel.
- Manejo de historial de conversación para mantener el contexto durante la charla.
- Arquitectura modular con vistas, servicios de navegación y estilos separados.

## Arquitectura actual

- Frontend: HTML, CSS y JavaScript modular.
- Lógica de chat: [src/API/chatApi.js](src/API/chatApi.js) y [src/views/chat.js](src/views/chat.js).
- API serverless: [api/chat.js](api/chat.js).
- Estilos: [src/CSS](src/CSS).

## Estructura del proyecto

```text
ProyectM3/
├─ api/
│  └─ chat.js
├─ index.html
├─ package.json
├─ README.md
├─ .env.example
├─ .gitignore
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

## Requisitos

- Node.js y npm.
- Vercel CLI (`npm install -g vercel`).
- Cuenta en Vercel.
- Una clave de API de Gemini configurada como variable de entorno.

## Variables de entorno

- `GEMINI_API_KEY`: clave usada por la función serverless para consumir la API de Gemini. Se configura en `.env` para desarrollo local y en el dashboard de Vercel para producción. Nunca se expone al navegador.

## Notas importantes

- La lógica de la IA no se ejecuta directamente en el navegador; la llamada se realiza a la función serverless de Vercel (`api/chat.js`), que es la única que tiene acceso a `GEMINI_API_KEY`.
- Los prompts de personalidad para He-Man y Skeletor se definen en [src/API/chatApi.js](src/API/chatApi.js).
- El chat mantiene el historial para que las respuestas se sientan más coherentes.
