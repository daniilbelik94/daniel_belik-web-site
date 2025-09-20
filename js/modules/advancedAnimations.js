// js/modules/advancedAnimations.js
// Модуль для продвинутых анимаций и интерактивных эффектов

export function initAdvancedAnimations() {

    
    // Инициализация всех функций
    initParallaxEffects();
    initMouseFollower();
    initTiltEffects();
    initSmoothScrollWithEasing();
    initAdvancedHoverEffects();
    initPerformanceOptimizations();

}

// Parallax эффекты для элементов
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.addEventListener('scroll', () => updateParallax(entry.target));
            }
        });
    });
    
    parallaxElements.forEach(el => observer.observe(el));
}

function updateParallax(element) {
    const speed = element.dataset.parallax || 0.5;
    const rect = element.getBoundingClientRect();
    const scrolled = window.pageYOffset;
    const rate = scrolled * -speed;
    
    element.style.transform = `translateY(${rate}px)`;
}

// Эффект следования мыши для интерактивных элементов
function initMouseFollower() {
    const followerElements = document.querySelectorAll('.hover-tilt, .hover-glow');
    
    followerElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            if (element.classList.contains('hover-tilt')) {
                const tiltX = deltaY * 10; // Максимальный наклон 10 градусов
                const tiltY = deltaX * -10;
                element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }
            
            // Добавляем glow эффект в направлении мыши
            if (element.classList.contains('hover-glow')) {
                const intensity = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 1);
                element.style.boxShadow = `${deltaX * 20}px ${deltaY * 20}px 40px rgba(99, 102, 241, ${0.3 * intensity})`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            element.style.boxShadow = '';
        });
    });
}

// 3D tilt эффекты
function initTiltEffects() {
    const tiltElements = document.querySelectorAll('.hover-tilt');
    
    tiltElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transformStyle = 'preserve-3d';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Убираем smooth scroll из advancedAnimations - он конфликтует с navbar.js
function initSmoothScrollWithEasing() {
    // Отключено - используем простую навигацию из navbar.js
    return;
}

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const change = target - start;
    const startTime = performance.now();
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    function animateScroll(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, start + change * ease);
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }
    
    requestAnimationFrame(animateScroll);
}

// Продвинутые hover эффекты
function initAdvancedHoverEffects() {
    // Ripple эффект для кнопок
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Magnetic эффект для важных элементов
    const magneticElements = document.querySelectorAll('.hero-photo, .benefit-icon-container');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.3; // Сила магнитного эффекта
            element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
}

function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;
    
    // Добавляем CSS анимацию если её нет
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Оптимизация производительности
function initPerformanceOptimizations() {
    // Throttle для скролл событий
    let ticking = false;
    
    function updateAnimations() {
        // Обновляем анимации только когда браузер готов
        updateVisibleAnimations();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    });
    
    // Паузим анимации когда вкладка не активна
    document.addEventListener('visibilitychange', () => {
        const animatedElements = document.querySelectorAll('[class*="animate-"]');
        animatedElements.forEach(el => {
            if (document.hidden) {
                el.style.animationPlayState = 'paused';
            } else {
                el.style.animationPlayState = 'running';
            }
        });
    });
}

function updateVisibleAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('is-visible')) {
            // Добавляем задержку для stagger эффекта
            const delay = element.style.getPropertyValue('--stagger-delay') || 0;
            setTimeout(() => {
                element.classList.add('is-visible');
            }, delay * 100);
        }
    });
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Автоматическая инициализация при загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedAnimations);
} else {
    initAdvancedAnimations();
}
