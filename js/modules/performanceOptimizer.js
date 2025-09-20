// js/modules/performanceOptimizer.js
// Модуль для оптимизации производительности

export function initPerformanceOptimizer() {
    console.log('⚡ Инициализация оптимизатора производительности...');
    
    // Инициализация всех оптимизаций
    initIntersectionObserver();
    initLazyLoading();
    initImageOptimization();
    initPreloading();
    initCSSContainment();
    initRAFThrottling();
    initMemoryOptimization();
    
    console.log('✅ Оптимизатор производительности инициализирован');
}

// Intersection Observer для анимаций
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px'
    };
    
    // Наблюдатель для элементов с анимациями
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Добавляем класс видимости с учетом stagger
                const delay = element.style.getPropertyValue('--stagger-delay') || 0;
                setTimeout(() => {
                    element.classList.add('is-visible');
                    
                    // GPU ускорение для анимируемых элементов
                    element.classList.add('gpu-accelerated');
                }, delay * 100);
                
                // Прекращаем наблюдение после запуска анимации
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми элементами с анимациями
    document.querySelectorAll('[data-animation]').forEach(el => {
        animationObserver.observe(el);
    });
    
    // Отдельный наблюдатель для тяжелых элементов
    const heavyElementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Активируем тяжелые анимации только когда элемент видим
                if (element.classList.contains('animate-gradient')) {
                    element.style.animationPlayState = 'running';
                }
                
                if (element.classList.contains('animate-morph')) {
                    element.style.animationPlayState = 'running';
                }
            } else {
                // Приостанавливаем анимации когда элемент не видим
                const element = entry.target;
                if (element.classList.contains('animate-gradient')) {
                    element.style.animationPlayState = 'paused';
                }
                
                if (element.classList.contains('animate-morph')) {
                    element.style.animationPlayState = 'paused';
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за тяжелыми анимациями
    document.querySelectorAll('.animate-gradient, .animate-morph, .animate-float').forEach(el => {
        heavyElementsObserver.observe(el);
    });
}

// Lazy loading для изображений и тяжелого контента
function initLazyLoading() {
    // Современный lazy loading для изображений
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    } else {
        // Fallback для старых браузеров
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Lazy loading для iframe
    const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                iframe.removeAttribute('data-src');
                iframeObserver.unobserve(iframe);
            }
        });
    });
    
    document.querySelectorAll('iframe[data-src]').forEach(iframe => {
        iframeObserver.observe(iframe);
    });
}

// Оптимизация изображений
function initImageOptimization() {
    // Добавляем декодирование изображений
    document.querySelectorAll('img').forEach(img => {
        if (!img.loading) {
            img.loading = 'lazy';
        }
        
        if (!img.decoding) {
            img.decoding = 'async';
        }
        
        // Добавляем плейсхолдер пока изображение загружается
        if (!img.complete) {
            img.style.backgroundColor = 'var(--bg-element)';
            img.addEventListener('load', () => {
                img.style.backgroundColor = '';
            });
        }
    });
    
    // WebP support detection и замена
    function supportsWebP() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => resolve(webP.height === 2);
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    // async (params) => {
    //     supportsWebP().then(supported => {
    //         if (supported) {
    //             // Заменяем источники изображений на WebP версии
    //             document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]').forEach(img => {
    //                 const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/, '.webp');
                    
    //                 // Проверяем доступность WebP версии
    //                 fetch(webpSrc, { method: 'HEAD' })
    //                     .then(response => {
    //                         if (response.ok) {
    //                             img.src = webpSrc;
    //                         }
    //                     })
    //                     .catch(() => {
    //                         // Оставляем оригинальный формат если WebP недоступен
    //                     });
    //             });
    //         }
    //     });
    // }
}

// Предзагрузка критически важных ресурсов
function initPreloading() {
    // Предзагрузка шрифтов
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
    ];
    
    fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'style';
        link.onload = () => {
            link.rel = 'stylesheet';
        };
        document.head.appendChild(link);
    });
    
    // Предзагрузка важных изображений
    const criticalImages = document.querySelectorAll('.hero-photo, [data-preload]');
    criticalImages.forEach(img => {
        if (img.dataset.src || img.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = img.dataset.src || img.src;
            link.as = 'image';
            document.head.appendChild(link);
        }
    });
    
    // DNS prefetch для внешних ресурсов
    const externalDomains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'cdnjs.cloudflare.com'
    ];
    
    externalDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${domain}`;
        document.head.appendChild(link);
    });
}

// CSS Containment для изоляции стилей
function initCSSContainment() {
    // Добавляем containment для независимых компонентов
    const containers = document.querySelectorAll('.benefit-item, .portfolio-item, .testimonial-item');
    containers.forEach(container => {
        container.style.contain = 'layout style paint';
    });
    
    // Более строгий containment для больших секций
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.querySelector('[data-animation]')) {
            section.style.contain = 'layout style';
        }
    });
}

// RAF throttling для событий скролла
function initRAFThrottling() {
    let ticking = false;
    let lastScrollY = 0;
    
    function updateOnScroll() {
        const scrollY = window.pageYOffset;
        const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
        
        // Оптимизированная обработка параллакса
        updateParallaxElements(scrollY);
        
        // Обновляем navbar только при изменении направления
        if (Math.abs(scrollY - lastScrollY) > 10) {
            updateNavbarVisibility(scrollDirection, scrollY);
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Оптимизированные touch события
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    window.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const diff = touchStartY - touchY;
        
        if (Math.abs(diff) > 5) {
            requestTick();
        }
    }, { passive: true });
}

function updateParallaxElements(scrollY) {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        if (isElementInViewport(element)) {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        }
    });
}

function updateNavbarVisibility(direction, scrollY) {
    const navbar = document.querySelector('nav, .navbar');
    if (!navbar) return;
    
    if (direction === 'down' && scrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else if (direction === 'up' || scrollY < 100) {
        navbar.style.transform = 'translateY(0)';
    }
}

// Оптимизация памяти
function initMemoryOptimization() {
    // Очистка неиспользуемых событий
    const cleanupObservers = new Set();
    
    // Автоматическая очистка при выходе со страницы
    window.addEventListener('beforeunload', () => {
        cleanupObservers.forEach(observer => {
            if (observer && observer.disconnect) {
                observer.disconnect();
            }
        });
        cleanupObservers.clear();
    });
    
    // Throttle resize событий
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Пересчитываем layout только после окончания ресайза
            updateLayoutOnResize();
        }, 250);
    });
    
    // Очистка анимаций при потере фокуса
    document.addEventListener('visibilitychange', () => {
        const animatedElements = document.querySelectorAll('[class*="animate-"]');
        
        if (document.hidden) {
            // Приостанавливаем все анимации
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            // Возобновляем анимации
            setTimeout(() => {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }, 100);
        }
    });
}

function updateLayoutOnResize() {
    // Обновляем размеры контейнеров
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.maxWidth = Math.min(window.innerWidth - 40, 1140) + 'px';
    });
    
    // Обновляем grid layouts
    const grids = document.querySelectorAll('.grid-responsive');
    grids.forEach(grid => {
        const items = grid.children.length;
        const minWidth = 250;
        const maxCols = Math.floor(grid.clientWidth / minWidth);
        const cols = Math.min(items, maxCols);
        
        grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    });
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return rect.top < windowHeight && rect.bottom > 0;
}

// Web Workers для тяжелых вычислений (если нужно)
function createWorker(fn) {
    const blob = new Blob([`(${fn.toString()})()`], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
}

// Service Worker для кэширования (базовая регистрация)
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW зарегистрирован:', registration);
            })
            .catch(error => {
                console.log('SW регистрация неудалась:', error);
            });
    }
}

// Экспорт функций для использования в других модулях
export {
    updateParallaxElements,
    isElementInViewport,
    createWorker,
    registerServiceWorker
};
