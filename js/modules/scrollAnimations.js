// js/modules/scrollAnimations.js

export function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');

    if (!animatedElements.length) {
        return; 
    }

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const animationCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const delay = targetElement.dataset.delay || '0ms'; 

                targetElement.style.transitionDelay = delay; 
                targetElement.classList.add('is-visible'); 

                observer.unobserve(targetElement); 
            }
        });
    };

    const observer = new IntersectionObserver(animationCallback, observerOptions);
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}