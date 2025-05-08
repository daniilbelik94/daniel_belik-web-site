// js/main.js
import { loadSections } from './modules/sectionLoader.js';
import { initNavbar } from './modules/navbar.js'; 
import { initHeroAnimations } from './modules/hero.js';
import { initSwiper } from './modules/swiperSetup.js';
import { initFaq } from './modules/faq.js';
// import { initScrollAnimations } from './modules/scrollAnimations.js';
import { initKontaktForm } from './modules/formHandler.js';
import { initCookieBanner } from './modules/cookieBanner.js';
import { initBackgroundAnimation } from './modules/backgroundAnimation.js';
import { initScrollAnimations } from './modules/scrollAnimations.js';
function initFooter() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', async () => { // <--- Сделай async
    await loadSections(); // <--- Добавь await, чтобы дождаться загрузки секций
    const modulesToInit = [
        initNavbar,
        initHeroAnimations,
        initSwiper,
        initFaq,
        initKontaktForm,
        initFooter,
        initCookieBanner,
        initBackgroundAnimation,
        initScrollAnimations
    ];
    modulesToInit.forEach(initModule => {
        try {
            if (typeof initModule === 'function') {
                initModule();
            }
        } catch (error) {
            console.error(`Error initializing module: ${initModule.name}`, error);
        }
    });
});