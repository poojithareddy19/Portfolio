// Shows the current local time in Hyderabad (IST) so recruiters can see the time zone at a glance.
export function initClock() {
    const el = document.getElementById('local-time');
    if (!el) return;
    const format = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    const update = () => {
        el.textContent = format.format(new Date());
    };
    update();
    setInterval(update, 30_000);
}
