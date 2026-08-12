import { router } from './router.js';
import { setupLinkInterception, setupMobileMenu } from './navigation.js';

// Listener para Back/Forward
window.addEventListener('popstate', () => {
  router();
});

setupLinkInterception();
setupMobileMenu();

router();