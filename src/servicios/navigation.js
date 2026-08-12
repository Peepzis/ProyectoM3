import { navigateTo } from "./router.js";

export function setupLinkInterception() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    const isNewTab = link.target === '_blank';
    const isExternal = link.origin !== window.location.origin;

    if (isModified || isNewTab || isExternal) return;
    if (!href.startsWith('/')) return;

    event.preventDefault();
    navigateTo(href);

    // Si el link se clickeó dentro del menú mobile abierto, lo cerramos
    closeMobileMenu();
  });
}

const toggle = document.querySelector('.navbar__toggle');
const menu = document.querySelector('.navbar__menu');

function closeMobileMenu() {
  if (!toggle || !menu) return;
  menu.classList.remove('navbar__menu--active');
  toggle.setAttribute('aria-expanded', 'false');
}

export function setupMobileMenu() {
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isActive = menu.classList.toggle('navbar__menu--active');
    toggle.setAttribute('aria-expanded', String(isActive));
  });

  // Cierra el menú si se hace click fuera de él
  document.addEventListener('click', (event) => {
    const clickedInsideMenu = menu.contains(event.target);
    const clickedToggle = toggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });
}