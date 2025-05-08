// js/modules/cookieBanner.js

export function initCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies-btn');
    const COOKIE_CONSENT_KEY = 'cookie_consent_given';

    // Проверяем, давал ли пользователь согласие ранее
    if (localStorage.getItem(COOKIE_CONSENT_KEY) === 'true') {
        return; // Согласие уже дано, баннер не показываем
    }

    // Показываем баннер, если нет сохраненного согласия
    if (cookieBanner) {
        // Убираем инлайновый style="display: none;" и используем класс для анимации
        cookieBanner.style.display = 'block'; // Сначала делаем видимым для расчета размеров
        setTimeout(() => { // Небольшая задержка для срабатывания transition
             cookieBanner.classList.add('show');
        }, 100); // Задержка в 100мс
    }

    if (acceptButton && cookieBanner) {
        acceptButton.addEventListener('click', () => {
            localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
            cookieBanner.classList.remove('show');
            // Можно добавить setTimeout, чтобы дождаться анимации скрытия перед display: none,
            // но transform translateY(100%) уже убирает его из вида.
            // Для полного скрытия (если transform не убирает с потока):
            // setTimeout(() => {
            //     cookieBanner.style.display = 'none';
            // }, 500); // Должно соответствовать CSS transition-duration
        });
    }
}