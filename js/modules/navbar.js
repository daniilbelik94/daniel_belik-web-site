// js/modules/navbar.js

export function initNavbar() {
    const navbar = document.getElementById('navbar');
    const burgerMenu = document.getElementById('burger-menu');
    const mobileOverlayMenu = document.getElementById('mobile-overlay-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const navLinks = document.querySelectorAll('.nav-link'); 
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link'); 
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    function updateActiveLink() {
        let currentSectionId = '';
        const sections = document.querySelectorAll('header[id], section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - navbar.offsetHeight - 20)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        mobileNavLinks.forEach(link => {
            link.classList.remove('active'); 
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    function toggleMobileMenu() {
        burgerMenu.classList.toggle('active');
        mobileOverlayMenu.classList.toggle('open');
        document.body.classList.toggle('modal-open'); 
    }

    function closeMenuOnLinkClick() {
        if (mobileOverlayMenu.classList.contains('open')) {
            toggleMobileMenu();
        }
    }

    // Инициализация обработчиков
    if (navbar) {
        window.addEventListener('scroll', () => {
            handleScroll();
            updateActiveLink(); 
        });
        handleScroll(); 
        updateActiveLink(); 
    }

    if (burgerMenu && mobileOverlayMenu && closeMenuBtn) {
        burgerMenu.addEventListener('click', toggleMobileMenu);
        closeMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenuOnLinkClick);
    });

    // Мгновенная навигация без задержек
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target && href !== '#') {
                e.preventDefault();
                e.stopPropagation(); // Останавливаем всплытие события
                
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Мгновенный переход
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'auto' // Еще быстрее чем instant
                });
            }
        });
    });
}