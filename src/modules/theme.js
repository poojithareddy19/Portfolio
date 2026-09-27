// Light / dark theme toggle. The initial theme is applied by an inline script in
// index.html before first paint; this module keeps it in sync afterwards.
const STORAGE_KEY = 'theme';

function readSaved() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
}

export function initTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (!toggle) return;

    const apply = (theme) => {
        root.setAttribute('data-theme', theme);
        toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        themeColor?.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
    };

    apply(root.getAttribute('data-theme') || 'dark');

    toggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        apply(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            /* storage unavailable: theme still changes for this visit */
        }
    });

    // Follow the system setting until the visitor makes a choice
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!readSaved()) apply(e.matches ? 'light' : 'dark');
    });
}
