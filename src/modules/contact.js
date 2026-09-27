// Contact form: validates input, then opens the visitor's email app with the
// message pre-filled. No third-party service is involved.
const EMAIL = 'poojithareddy1905@gmail.com';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function initContact() {
    initCopyEmail();

    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = document.getElementById('form-status');

    const rules = {
        name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
        email: (v) => (EMAIL_PATTERN.test(v.trim()) ? '' : 'Please enter a valid email address.'),
        message: (v) => (v.trim().length >= 10 ? '' : 'Please write a message of at least 10 characters.'),
    };

    const validateField = (field) => {
        const rule = rules[field.name];
        if (!rule) return true;
        const error = rule(field.value);
        const errorEl = document.getElementById(`${field.id}-error`);
        field.setAttribute('aria-invalid', String(Boolean(error)));
        if (errorEl) errorEl.textContent = error;
        return !error;
    };

    form.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('blur', () => field.value && validateField(field));
        field.addEventListener('input', () => field.getAttribute('aria-invalid') === 'true' && validateField(field));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = [...form.querySelectorAll('input, textarea')];
        const valid = fields.map(validateField).every(Boolean);
        if (!valid) {
            fields.find((f) => f.getAttribute('aria-invalid') === 'true')?.focus();
            status.textContent = 'Please fix the highlighted fields.';
            return;
        }

        const data = new FormData(form);
        const name = data.get('name').trim();
        const subject = data.get('subject').trim() || `Portfolio enquiry from ${name}`;
        const body = `${data.get('message').trim()}\n\n${name}\n${data.get('email').trim()}`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        status.textContent = 'Your email app should open with the message ready to send. If it does not, email me directly at ' + EMAIL + '.';
    });
}

function initCopyEmail() {
    const button = document.getElementById('copy-email');
    if (!button) return;
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(EMAIL);
            button.textContent = 'Copied';
        } catch {
            button.textContent = 'Copy failed';
        }
        setTimeout(() => (button.textContent = 'Copy'), 1800);
    });
}
