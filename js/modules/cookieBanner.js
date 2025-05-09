// js/modules/cookieBanner.js

export function initCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies-btn');
    const COOKIE_CONSENT_KEY = 'cookie_consent_given';

    if (localStorage.getItem(COOKIE_CONSENT_KEY) === 'true') {
        return; 
    }

    if (cookieBanner) {
        cookieBanner.style.display = 'block'; 
        setTimeout(() => { 
             cookieBanner.classList.add('show');
        }, 100); 
    }

    if (acceptButton && cookieBanner) {
        acceptButton.addEventListener('click', () => {
            localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
            cookieBanner.classList.remove('show');

        });
    }
}