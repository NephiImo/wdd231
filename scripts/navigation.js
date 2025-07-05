// Toggle navigation menu
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('primary-nav');
    const menuIcon = document.getElementById('menu-icon');

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('show');

        const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuButton.setAttribute('aria-expanded', !expanded);

        // Toggle icon
        if (navMenu.classList.contains('show')) {
            menuIcon.innerHTML = '&#10006';
        } else {
            menuIcon.innerHTML = '&#9776'
        }
    });
});
