import { fetchCharacterResponse } from '../API/chatApi.js';

export function renderChat() {
  const characters = {
    heman: {
      name: 'He-Man',
      bienvenida: '¡Por el poder de Grayskull! ¿En qué te ayudo?',
      image: '/imagenes/heman.jpg'
    },
    skeletor: {
      name: 'Skeletor',
      bienvenida: '¡Nyeeeh! ¿Qué quieres, insecto?',
      image: '/imagenes/Skeletor.jpg'
    }
  };

  let currentCharacter = 'heman';

  // Un historial independiente por personaje: cambiar de personaje ya no borra la charla del otro
  const historiales = {
    heman: [],
    skeletor: []
  };

  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="chatApp" data-character="heman">
      <header class="chatHeader">
        <h1 class="chatTitle">Chate en vivo</h1>
        <p class="chatSubtitle">Con tu personaje favorito de Eternia</p>
      </header>

      <div class="character-cards">
        <div class="character-card character-card--selected" data-character="heman">
          <img class="character-card__image" src="${characters.heman.image}" alt="${characters.heman.name}">
          <h3>He-Man</h3>
        </div>
        <div class="character-card" data-character="skeletor">
          <img class="character-card__image" src="${characters.skeletor.image}" alt="${characters.skeletor.name}">
          <h3>Skeletor</h3>
        </div>
      </div>

      <main class="chatMessages" aria-label="Mensajes"></main>

      <form class="chatComposer">
        <input class="chatInput" type="text" placeholder="Escribe un mensaje…" aria-label="Escribe tu mensaje" />
        <button class="chatSend" type="submit">Enviar</button>
      </form>
    </div>
  `;

  const chatApp = document.querySelector('.chatApp');
  const chatMessages = document.querySelector('.chatMessages');

  // Dibuja el mensaje de bienvenida (se usa cuando el historial de un personaje está vacío)
  function renderBienvenida() {
    chatMessages.innerHTML = '';
    const bienvenido = document.createElement('div');
    bienvenido.classList.add('message', 'message--character');
    bienvenido.textContent = characters[currentCharacter].bienvenida;
    chatMessages.appendChild(bienvenido);
  }

  // Redibuja todos los mensajes guardados del personaje activo
  function renderHistorial() {
    chatMessages.innerHTML = '';
    const historial = historiales[currentCharacter];

    if (historial.length === 0) {
      renderBienvenida();
      return;
    }

    historial.forEach(turno => {
      const div = document.createElement('div');
      div.classList.add('message', turno.role === 'user' ? 'message--user' : 'message--character');
      div.textContent = turno.text;
      chatMessages.appendChild(div);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  renderHistorial();

  // Cambia de personaje al clickear una tarjeta (ya no borra el historial, solo cambia la vista)
  document.querySelectorAll('.character-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.character-card').forEach(c =>
        c.classList.remove('character-card--selected'));
      card.classList.add('character-card--selected');

      currentCharacter = card.dataset.character;
      chatApp.dataset.character = currentCharacter;

      renderHistorial();
    });
  });

  const form = document.querySelector('.chatComposer');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.querySelector('.chatInput');
    const mensaje = input.value.trim();
    if (!mensaje) return;
    input.value = '';

    const div = document.createElement('div');
    div.classList.add('message', 'message--user');
    div.textContent = mensaje;
    chatMessages.appendChild(div);

    const escribiendo = document.createElement('div');
    escribiendo.classList.add('message', 'message--character', 'escribiendo');
    escribiendo.textContent = 'Escribiendo...';
    chatMessages.appendChild(escribiendo);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Guarda una referencia al personaje activo al momento de enviar,
    // para no mezclar la respuesta si el usuario cambia de personaje mientras espera
    const characterAlEnviar = currentCharacter;
    const { response, error } = await fetchCharacterResponse(
      characterAlEnviar,
      mensaje,
      historiales[characterAlEnviar]
    );

    escribiendo.remove();

    if (!error) {
      historiales[characterAlEnviar].push({ role: 'user', text: mensaje });
      historiales[characterAlEnviar].push({ role: 'model', text: response });
    }

    // Solo repinta si seguimos parados en el mismo personaje que hizo la pregunta
    if (characterAlEnviar === currentCharacter) {
      const respuesta = document.createElement('div');
      respuesta.classList.add('message', 'message--character');
      respuesta.textContent = error ? 'Ocurrió un error, intenta de nuevo.' : response;
      chatMessages.appendChild(respuesta);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
}