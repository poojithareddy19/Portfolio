// Header state on scroll, mobile menu and active-section highlighting.
export function initNav() {
    const header = document.getElementById('navbar');
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('nav-links');
    if (!header || !toggle || !links) return;

    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const setMenu = (open) => {
        links.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMenu(false);
    });

    const anchors = [...links.querySelectorAll('a[href^="#"]')];
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                anchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
            });
        },
        { rootMargin: '-45% 0px -50% 0px' }
    );
    anchors.forEach((a) => {
        const section = document.querySelector(a.getAttribute('href'));
        if (section) observer.observe(section);
    });
}
