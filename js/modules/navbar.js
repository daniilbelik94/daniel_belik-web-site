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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    let offset = navbar ? navbar.offsetHeight : 0;
                    if (navbar && !navbar.classList.contains('scrolled') && href !== '#hero') {
                    } else if (navbar && navbar.classList.contains('scrolled') && href !== '#hero') {
                    } else if (href === '#hero'){
                        offset = 0; 
                    }


                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    setTimeout(() => {
                        navLinks.forEach(l => l.classList.remove('active'));
                        mobileNavLinks.forEach(l => l.classList.remove('active'));
                        const desktopLink = document.querySelector(`.nav-link[href="${href}"]`);
                        const mobileLink = document.querySelector(`.mobile-nav-link[href="${href}"]`);
                        if(desktopLink) desktopLink.classList.add('active');
                        if(mobileLink) mobileLink.classList.add('active'); 
                    }, 100); 
                }
            }
        });
    });
}