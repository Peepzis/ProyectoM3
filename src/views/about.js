export function renderAbout() {
  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = `
    <section class="about">
      <h1>Sobre He-Man Chat</h1>
      <div class="about__content">
        <p>Esta aplicación es un proyecto educativo desarrollado como parte del curso M3 de Henry.</p>
        <p>Utiliza una SPA (Single Page Application) construida con JavaScript vanilla, sin frameworks externos.</p>
        <h2>Tecnologías</h2>
        <ul>
          <li>HTML5</li>
          <li>CSS3 (Flexbox, Media Queries)</li>
          <li>JavaScript ES6 (Módulos, DOM API)</li>
          <li>Historial API (pushState/popstate)</li>
        </ul>
        <h2>Temática</h2>
        <p>Inspirado en He-Man y los Maestros del Universo, la icónica serie de los años 80 creada por Mattel.</p>
      </div>
    </section>
  `;
}