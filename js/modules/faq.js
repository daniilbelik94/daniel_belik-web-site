// js/modules/faq.js

export function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) {
        return;
    }

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerContent = item.querySelector('.faq-answer-content'); 

        if (questionButton && answerContent) {
            questionButton.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                 faqItems.forEach(otherItem => {
                     if (otherItem !== item) {
                         otherItem.classList.remove('active');
                         otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                         
                     }
                 });

                item.classList.toggle('active');
                questionButton.setAttribute('aria-expanded', !isActive);

                 if (item.classList.contains('active')) {
                 } else {
                 }
            });
        }
    });
}