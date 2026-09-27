import { initTheme } from './modules/theme.js';
import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initCursor } from './modules/cursor.js';
import { initFilter } from './modules/filters.js';
import { initContact } from './modules/contact.js';
import { initClock } from './modules/clock.js';

initTheme();
initNav();
initReveal();
initCursor();
initFilter('#project-filters', '.project');
initFilter('#skill-filters', '.skill-group');
initFilter('#timeline-filters', '.tl-item');
initContact();
initClock();

document.getElementById('year').textContent = String(new Date().getFullYear());
window.__portfolioReady = true;
