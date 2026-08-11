export function renderNotFound() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = `
    <section class="notFound">
      <span class="notFound__icon">&#9876;</span>
      <h1 class="notFound__title">404</h1>
      <p class="notFound__text">Esta senda no existe en Eternia.</p>
      <a href="/" class="home__cta">Volver al inicio</a>
    </section>
  `;
}