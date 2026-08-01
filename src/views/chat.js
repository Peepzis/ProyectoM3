import { fetchCharacterResponse } from '../API/chatApi.js';

export function renderChat() {
  // Solo se usa para el mensaje de bienvenida y el avatar; las respuestas reales vienen de la IA
  const characters = {
    heman: {
      name: 'He-Man',
      avatar: '🦸',
      bienvenida: '¡Por el poder de Grayskull! ¿En qué te ayudo?'
    },
    skeletor: {
      name: 'Skeletor',
      avatar: '💀',
      bienvenida: '¡Nyeeeh! ¿Qué quieres, insecto?'
    }
  };
  let currentCharacter = 'heman';
  let historial = []; // { role: 'user' | 'model', text }

  const app = document.querySelector('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="chatApp" data-character="heman">
      <header class="chatHeader">
        <h1 class="chatTitle">Chat</h1>
        <p class="chatSubtitle">Con tu personaje favorito</p>
      </header>

      <div class="character-cards">
        <div class="character-card character-card--selected" data-character="heman">
          <span class="character-card__avatar">🦸</span>
          <h3>He-Man</h3>
        </div>
        <div class="character-card" data-character="skeletor">
          <span class="character-card__avatar">💀</span>
          <h3>Skeletor</h3>
        </div>
      </div>

      <main class="chatMessages" aria-label="Mensajes">
        <div class="message message--character">Hola, ¿en qué te ayudo?</div>
      </main>

      <form class="chatComposer">
        <input class="chatInput" type="text" placeholder="Escribe un mensaje…" aria-label="Escribe tu mensaje" />
        <button class="chatSend" type="submit">Enviar</button>
      </form>
    </div>
  `;

  // --- Lógica de selección de personaje y cambio de chat ---
  const chatApp = document.querySelector('.chatApp');
  const chatMessages = document.querySelector('.chatMessages');

  // Cambia de personaje al clickear una tarjeta
  document.querySelectorAll('.character-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.character-card').forEach(c =>
        c.classList.remove('character-card--selected'));
      card.classList.add('character-card--selected');

      // Actualiza personaje activo
      currentCharacter = card.dataset.character;
      chatApp.dataset.character = currentCharacter;

      // Reinicia el chat y el historial al cambiar de personaje
      historial = [];
      chatMessages.innerHTML = '';
      const bienvenido = document.createElement('div');
      bienvenido.classList.add('message', 'message--character');
      bienvenido.textContent = characters[currentCharacter].bienvenida;
      chatMessages.appendChild(bienvenido);
    });
  });

  // Referencia al formulario y escucha el envío del formulario
  const form = document.querySelector('.chatComposer');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.querySelector('.chatInput');
    const mensaje = input.value.trim(); // Obtiene lo que escribió el usuario
    if (!mensaje) return;
    input.value = ''; // Limpia el input

    // Crea y agrega el mensaje del usuario
    const div = document.createElement('div');
    div.classList.add('message', 'message--user');
    div.textContent = mensaje;
    chatMessages.appendChild(div);

    // Muestra indicador "Escribiendo..."
    const escribiendo = document.createElement('div');
    escribiendo.classList.add('message', 'message--character', 'escribiendo');
    escribiendo.textContent = 'Escribiendo...';
    chatMessages.appendChild(escribiendo);

    // scroll automático
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Llama a la IA a través de chatApi.js (que a su vez llama a /api/chat)
    const { response, error } = await fetchCharacterResponse(currentCharacter, mensaje, historial);

    escribiendo.remove();

    // Crea y agrega la respuesta real del personaje
    const respuesta = document.createElement('div');
    respuesta.classList.add('message', 'message--character');
    respuesta.textContent = error ? 'Ocurrió un error, intenta de nuevo.' : response;
    chatMessages.appendChild(respuesta);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Solo guarda en el historial si la respuesta fue exitosa
    if (!error) {
      historial.push({ role: 'user', text: mensaje });
      historial.push({ role: 'model', text: response });
    }
  });
}