export function renderHome() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = `
     <section class="home">
      <div class="home__hero">
        <span class="home__icon">&#9876;</span>
        <h1>He-Man Chat</h1>
        <p class="home__subtitle">Habla con el Maestro del Universo</p>
        <a href="/chat" class="home__cta">Iniciar Chat</a>
      </div>
      <div class="home__features">
        <div class="home__feature">
          <h3>&#9889; Poder ilimitado</h3>
          <p>Conversa con He-Man sobre cualquier tema de Eternia</p>
        </div>
        <div class="home__feature">
          <h3>&#128172; Respuestas reales</h3>
          <p>IA entrenada con el conocimiento del Maestro del Universo</p>
        </div>
        <div class="home__feature">
          <h3>&#127942; Gratis</h3>
          <p>Sin límites, sin registro</p>
        </div>
      </div>
    </section>
  `;
}