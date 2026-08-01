import { renderHome } from '../views/home.js';
import { renderChat } from '../views/chat.js';
import { renderAbout } from '../views/about.js';

const routes = {
  '/': renderHome,
  '/chat': renderChat,
  '/about': renderAbout,
};

function renderNotFound() {
  const app = document.querySelector('#app');
  if (!app) return;
  app.innerHTML = '<h1>404 - Página no encontrada</h1>';
}

export function router() {
  const path = window.location.pathname;
  const render = routes[path] || renderNotFound;
  render();
}

export function navigateTo(path) {
  history.pushState(null, '', path);
  router();
}