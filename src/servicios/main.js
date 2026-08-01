import { router } from './router.js';
import { setupLinkInterception } from './navigation.js';

// Listener para Back/Forward
window.addEventListener('popstate', () => {
  router(); 
});
setupLinkInterception();

router();