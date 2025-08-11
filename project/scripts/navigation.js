// Toggle navigation menu
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const closeButton = document.querySelector('.close-nav');

    toggleButton.addEventListener('click', () => {
        navLinks.classList.add('open');
        toggleButton.setAttribute('aria-expanded', 'true');
    });

    closeButton.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggleButton.setAttribute('aria-expanded', 'false');
    });
});

// ==== Footer Year ====
document.addEventListener('DOMContentLoaded', () => {
    function setFooterYear() {
        document.getElementById('year').textContent = new Date().getFullYear();
    }

    setFooterYear();
});