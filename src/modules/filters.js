// Generic segmented filter: buttons with data-filter="<key>" show only the items
// whose data-group contains that key ("all" shows everything).
export function initFilter(groupSelector, itemSelector) {
    const group = document.querySelector(groupSelector);
    if (!group) return;
    const buttons = group.querySelectorAll('[data-filter]');
    const items = document.querySelectorAll(itemSelector);

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const key = button.dataset.filter;
            buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
            items.forEach((item) => {
                const groups = (item.dataset.group || '').split(' ');
                const show = key === 'all' || groups.includes(key);
                item.hidden = !show;
                item.classList.add('visible');
                if (show) {
                    item.classList.remove('pop');
                    void item.offsetWidth; // restart the entry animation
                    item.classList.add('pop');
                }
            });
        });
    });
}
