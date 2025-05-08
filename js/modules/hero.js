// js/modules/hero.js

export function initHeroAnimations() {
    const typewriterTextElement = document.getElementById('typewriter-text');
    if (!typewriterTextElement) return;

    const phrases = [
        "Frontend Entwickler.",
        "Backend Spezialist.",
        "Full-Stack Developer.",
        "UI/UX Enthusiast."
        // Добавь сюда свои варианты или оставь эти для примера
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // Скорость печати
    const deletingSpeed = 50; // Скорость удаления
    const delayBetweenPhrases = 1500; // Задержка перед началом печати новой фразы

    // Установка min-height для контейнера, чтобы избежать "прыжков"
    // Найдем самую длинную фразу и установим высоту на ее основе
    // Это можно сделать и в CSS, если известна максимальная длина, но так динамичнее
    function setMinHeight() {
        let maxHeight = 0;
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.fontSize = getComputedStyle(typewriterTextElement).fontSize;
        tempSpan.style.fontFamily = getComputedStyle(typewriterTextElement).fontFamily;
        document.body.appendChild(tempSpan);

        phrases.forEach(phrase => {
            tempSpan.textContent = phrase;
            if (tempSpan.offsetHeight > maxHeight) {
                maxHeight = tempSpan.offsetHeight;
            }
        });
        document.body.removeChild(tempSpan);
        if (maxHeight > 0) {
            // Устанавливаем непосредственно родителю, если он .typewriter-container
            // или самому элементу, если он и есть контейнер
            const container = typewriterTextElement.closest('.typewriter-container') || typewriterTextElement;
            container.style.minHeight = `${maxHeight}px`;
        }
    }

    function type() {
        const currentPhrase = phrases[currentPhraseIndex];

        if (isDeleting) {
            // Удаление символов
            typewriterTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            // Печать символов
            typewriterTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        // Проверка состояния
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            // Закончили печатать фразу, начинаем удаление после задержки
            isDeleting = true;
            setTimeout(type, delayBetweenPhrases);
        } else if (isDeleting && currentCharIndex === 0) {
            // Закончили удалять фразу, переходим к следующей
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(type, typingSpeed); // Небольшая пауза перед началом новой фразы
        } else {
            // Продолжаем печатать/удалять
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(type, speed);
        }
    }

    // Запускаем только если элемент найден
    if (typewriterTextElement) {
        setMinHeight(); // Устанавливаем min-height
        setTimeout(type, delayBetweenPhrases / 2); // Начинаем анимацию после небольшой задержки
    }
}