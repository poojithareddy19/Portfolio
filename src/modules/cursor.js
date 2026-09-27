// Cursor micro-interactions: a trailing ring and a card spotlight.
// Only runs for mouse or trackpad users who have not asked for reduced motion.
const INTERACTIVE = 'a, button, input, textarea, label, summary, [data-cursor]';

export function initCursor() {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    initSpotlight();
    if (!finePointer || reducedMotion) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    document.body.append(dot, ring);

    let x = -100;
    let y = -100;
    let ringX = x;
    let ringY = y;
    let running = false;

    const tick = () => {
        ringX += (x - ringX) * 0.18;
        ringY += (y - ringY) * 0.18;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        if (Math.abs(x - ringX) > 0.1 || Math.abs(y - ringY) > 0.1) {
            requestAnimationFrame(tick);
        } else {
            running = false;
        }
    };

    window.addEventListener(
        'pointermove',
        (e) => {
            if (e.pointerType !== 'mouse') return;
            x = e.clientX;
            y = e.clientY;
            document.documentElement.classList.add('has-cursor');
            ring.classList.toggle('is-hover', Boolean(e.target.closest?.(INTERACTIVE)));
            if (!running) {
                running = true;
                requestAnimationFrame(tick);
            }
        },
        { passive: true }
    );
    window.addEventListener('pointerdown', () => ring.classList.add('is-down'));
    window.addEventListener('pointerup', () => ring.classList.remove('is-down'));
    document.addEventListener('mouseleave', () => document.documentElement.classList.remove('has-cursor'));
}

function initSpotlight() {
    document.querySelectorAll('[data-spotlight]').forEach((card) => {
        card.addEventListener(
            'pointermove',
            (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                card.style.setProperty('--my', `${e.clientY - rect.top}px`);
            },
            { passive: true }
        );
    });
}
