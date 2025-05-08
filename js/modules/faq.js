// js/modules/faq.js

export function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) {
        return;
    }

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerContent = item.querySelector('.faq-answer-content'); // Используем этот контейнер

        if (questionButton && answerContent) {
            questionButton.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Опционально: закрыть все другие открытые элементы, если нужен аккордеон "только один открыт"
                 faqItems.forEach(otherItem => {
                     if (otherItem !== item) {
                         otherItem.classList.remove('active');
                         otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                         // Для анимации с max-height:
                         // otherItem.querySelector('.faq-answer-content').style.maxHeight = null;
                         // otherItem.querySelector('.faq-answer-content').style.paddingTop = null;
                         // otherItem.querySelector('.faq-answer-content').style.paddingBottom = null;
                     }
                 });

                item.classList.toggle('active');
                questionButton.setAttribute('aria-expanded', !isActive);

                // Управление max-height для анимации через CSS transition
                 if (item.classList.contains('active')) {
                     // max-height будет применен через CSS класс .active
                 } else {
                     // max-height будет сброшен через отсутствие класса .active
                 }
                // JavaScript не нужен для установки max-height здесь, если CSS настроен правильно
            });
        }
    });
}