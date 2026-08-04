export function renderAbout() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = `
    <section class="about">
      <h1>Sobre He-Man Chat</h1>
      <div class="about__content">
        <p>He-Man Chat es un proyecto educativo y creativo desarrollado como parte del curso M3 de Henry, pensado para explorar cómo una aplicación web puede combinar diseño, navegación y conversaciones con personajes.</p>
        <p>La idea principal es ofrecer una experiencia de chat con estilo retro, donde cada personaje mantiene un tono, una actitud y una forma distinta de responder, creando una sensación más inmersiva y divertida.</p>

        <h2>¿Qué hace esta app?</h2>
        <p>Permite elegir entre distintos personajes, como He-Man y Skeletor, y conversar con ellos en un entorno interactivo. La app organiza el historial de mensajes y adapta la respuesta del personaje para que se sienta coherente con su personalidad.</p>
        <p>Además, la interfaz está construida como una SPA con navegación fluida, sin perder la sensación de una experiencia moderna y ligera.</p>

        <h2>Tecnologías</h2>
        <ul>
          <li>HTML5 para la estructura de la aplicación</li>
          <li>CSS3 con Flexbox, Media Queries y estilos temáticos</li>
          <li>JavaScript ES6 con módulos y manipulación del DOM</li>
          <li>Routing básico con historial del navegador</li>
          <li>API de Gemini para generar respuestas inteligentes</li>
          <li>Vercel Serverless functions para mantener la clave API segura</li>
        </ul>

        <h2>Temática</h2>
        <p>Inspirado en He-Man y los Maestros del Universo, la icónica serie de los años 80 creada por Mattel, esta app busca revivir ese universo con una capa moderna de interacción y tecnología.</p>
        <p>Más que una simple demo, es una práctica de frontend, backend ligero y diseño de experiencia de usuario enfocado en la narrativa.</p>
      </div>
    </section>
  `;
}