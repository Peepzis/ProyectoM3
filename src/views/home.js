export function renderHome() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = `
     <section class="home">
      <div class="home__hero">
        <span class="home__icon">&#9876;</span>
        <h1>He-Man Chat</h1>
        <p class="home__subtitle">Descubre una conversación épica con los personajes más icónicos de Eternia</p>
        <a href="/chat" class="home__cta">Iniciar Chat</a>
      </div>
      <div class="home__features">
        <div class="home__feature">
          <h3>&#9889; Poder del destino</h3>
          <p>Habla con He-Man, Skeletor y otros personajes en un chat con personalidad propia y tono épico.</p>
        </div>
        <div class="home__feature">
          <h3>&#128172; Conversaciones auténticas</h3>
          <p>La IA responde desde el punto de vista del personaje, manteniendo su estilo, actitud y energía.</p>
        </div>
        <div class="home__feature">
          <h3>&#127942; Experiencia ligera</h3>
          <p>Una SPA sencilla, moderna y rápida para explorar el universo de He-Man sin complicaciones.</p>
        </div>
      </div>
    </section>
  `;
}