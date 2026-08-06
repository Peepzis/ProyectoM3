# ComicSansCon / He-Man Chat

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
├─ env.example
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
- Cuenta en Vercel.
- Una clave de API de Gemini configurada como variable de entorno.

## Instalación y ejecución

1. Instala las dependencias (si aplica en tu entorno):
   ```bash
   npm install
   ```
2. Configura la variable de entorno en un archivo `.env` o en Vercel:
   ```env
   GEMINI_API_KEY=tu_clave_aqui
   ```
3. Inicia el proyecto localmente con Vercel:
   ```bash
   npm run dev
   ```

## Despliegue

El proyecto está pensado para desplegarse en Vercel usando funciones serverless. El comando recomendado para desarrollo local es:

```bash
npm run dev
```

Y para producción:

```bash
vercel --prod
```

## Variables de entorno

- `GEMINI_API_KEY`: clave usada por la función serverless para consumir la API de Gemini.

## Notas importantes

- La lógica de la IA no se ejecuta directamente en el navegador; la llamada se realiza a la función serverless de Vercel.
- Los prompts de personalidad para He-Man y Skeletor se definen en [src/API/chatApi.js](src/API/chatApi.js).
- El chat mantiene el historial para que las respuestas se sientan más coherentes.
