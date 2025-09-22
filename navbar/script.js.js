document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('side-menu');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');
    const header = document.getElementById('header');
    const dropdownToggles = document.querySelectorAll('.side-menu .dropdown-toggle');
    const dropdown = document.querySelector('.nav-menu .dropdown');

    // Toggle side menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sideMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    closeBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelectorAll('.side-menu .dropdown').forEach(d => {
            d.classList.remove('active');
        });
    });

    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.querySelectorAll('.side-menu .dropdown').forEach(d => {
            d.classList.remove('active');
        });
    });

    // Toggle dropdowns in side menu (mobile)
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = toggle.closest('.dropdown');
            const isActive = dropdown.classList.contains('active');
            document.querySelectorAll('.side-menu .dropdown').forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                }
            });
            dropdown.classList.toggle('active', !isActive);
        });
    });

    // Close dropdown on click outside in desktop mode
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 768 && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Handle scroll for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});