// js/modules/navbar.js

export function initNavbar() {
    const navbar = document.getElementById('navbar');
    const burgerMenu = document.getElementById('burger-menu');
    const mobileOverlayMenu = document.getElementById('mobile-overlay-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const navLinks = document.querySelectorAll('.nav-link'); // Для десктопа
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link'); // Для мобильного меню

    // Эффект при скролле
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Активная ссылка при скролле и клике
    function updateActiveLink() {
        let currentSectionId = '';
        const sections = document.querySelectorAll('header[id], section[id]'); // Все секции с ID

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Учитываем высоту навбара + небольшой отступ
            if (pageYOffset >= (sectionTop - navbar.offsetHeight - 20)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Обновляем активные классы для десктопных ссылок
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Обновляем активные классы для мобильных ссылок (если они видимы)
        mobileNavLinks.forEach(link => {
            link.classList.remove('active'); // Хотя для мобильного оверлея это может быть не так критично
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Открытие/закрытие мобильного меню
    function toggleMobileMenu() {
        burgerMenu.classList.toggle('active');
        mobileOverlayMenu.classList.toggle('open');
        document.body.classList.toggle('modal-open'); // Блокировка скролла
    }

    // Закрытие мобильного меню при клике на ссылку
    function closeMenuOnLinkClick() {
        if (mobileOverlayMenu.classList.contains('open')) {
            toggleMobileMenu();
        }
    }

    // Инициализация обработчиков
    if (navbar) {
        window.addEventListener('scroll', () => {
            handleScroll();
            updateActiveLink(); // Обновляем активную ссылку при скролле
        });
        handleScroll(); // Первоначальная проверка при загрузке
        updateActiveLink(); // Первоначальная установка активной ссылки
    }

    if (burgerMenu && mobileOverlayMenu && closeMenuBtn) {
        burgerMenu.addEventListener('click', toggleMobileMenu);
        closeMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Закрытие меню при клике на ссылку в мобильном меню
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenuOnLinkClick);
    });

    // Плавный скролл для всех якорных ссылок (включая логотип и футер, если там будут ссылки на секции)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Проверяем, что это действительно ссылка на секцию, а не просто "#"
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    let offset = navbar ? navbar.offsetHeight : 0;
                    // Если навбар не .scrolled, он выше, и отступ должен быть больше
                    // Это важно, если навбар меняет высоту
                    if (navbar && !navbar.classList.contains('scrolled') && href !== '#hero') {
                         // Для hero не нужен доп. отступ, т.к. он 100vh
                    } else if (navbar && navbar.classList.contains('scrolled') && href !== '#hero') {
                         // Уже учтено в offset
                    } else if (href === '#hero'){
                        offset = 0; // Для hero секции скроллим в самый верх
                    }


                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Обновляем активную ссылку сразу после клика (для быстрой реакции)
                    // Немного задержим, чтобы скролл успел начаться
                    setTimeout(() => {
                        navLinks.forEach(l => l.classList.remove('active'));
                        mobileNavLinks.forEach(l => l.classList.remove('active'));
                        const desktopLink = document.querySelector(`.nav-link[href="${href}"]`);
                        const mobileLink = document.querySelector(`.mobile-nav-link[href="${href}"]`);
                        if(desktopLink) desktopLink.classList.add('active');
                        if(mobileLink) mobileLink.classList.add('active'); // Может быть не видно, но консистентно
                    }, 100); // Небольшая задержка
                }
            }
        });
    });
}