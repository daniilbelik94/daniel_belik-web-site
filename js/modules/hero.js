// js/modules/hero.js

export function initHeroAnimations() {
    const typewriterTextElement = document.getElementById('typewriter-text');
    if (!typewriterTextElement) return;

    const parentParagraph = typewriterTextElement.parentElement;
    if (!parentParagraph || !parentParagraph.classList.contains('hero-subtitle-fixed')) {
        console.error('Typewriter parent element .hero-subtitle-fixed not found or class mismatch.');
        return;
    }

    const phrases = [
        "Frontend Entwickler.",
        "Backend Spezialist.",
        "Full-Stack Developer.",
        "UI/UX Enthusiast."
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingSpeed = 120;
    const deletingSpeed = 120;
    const delayBetweenPhrases = 2000;

    function setMinHeight() {
        let maxHeight = 0;
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.top = '-9999px'; // Далеко за пределами экрана
        tempSpan.style.left = '-9999px';

        const typewriterStyle = getComputedStyle(typewriterTextElement);
        tempSpan.style.fontSize = typewriterStyle.fontSize;
        tempSpan.style.fontFamily = typewriterStyle.fontFamily;
        tempSpan.style.fontWeight = typewriterStyle.fontWeight;
        tempSpan.style.lineHeight = typewriterStyle.lineHeight;
        tempSpan.style.display = typewriterStyle.display; // Должен быть 'inline-block'
        tempSpan.style.paddingLeft = typewriterStyle.paddingLeft;
        tempSpan.style.paddingRight = typewriterStyle.paddingRight;
        tempSpan.style.paddingTop = typewriterStyle.paddingTop;
        tempSpan.style.paddingBottom = typewriterStyle.paddingBottom;
        tempSpan.style.letterSpacing = typewriterStyle.letterSpacing;
        tempSpan.style.wordSpacing = typewriterStyle.wordSpacing;
        tempSpan.style.textTransform = typewriterStyle.textTransform;
        tempSpan.style.whiteSpace = typewriterStyle.whiteSpace || 'normal';


        const parentParaStyle = getComputedStyle(parentParagraph);
        let availableWidth = parseFloat(parentParaStyle.width); // Ширина родителя

        if (parentParaStyle.boxSizing === 'border-box') {
            availableWidth -= (parseFloat(parentParaStyle.paddingLeft) || 0) + (parseFloat(parentParaStyle.paddingRight) || 0);
        }

        tempSpan.style.width = `${availableWidth}px`; // Задаем ширину для tempSpan

        tempSpan.style.boxSizing = typewriterStyle.boxSizing;


        document.body.appendChild(tempSpan);

        phrases.forEach(phrase => {
            tempSpan.textContent = phrase || " "; // Используем пробел, если фраза пустая, для корректного offsetHeight
            if (tempSpan.offsetHeight > maxHeight) {
                maxHeight = tempSpan.offsetHeight;
            }
        });
        document.body.removeChild(tempSpan);

        if (maxHeight > 0) {
            parentParagraph.style.minHeight = `${maxHeight}px`;
        }
    }

    function type() {
        // Логика функции type остается без изменений
        const currentPhrase = phrases[currentPhraseIndex];
        typewriterTextElement.style.opacity = '1';

        if (isDeleting) {
            typewriterTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typewriterTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenPhrases);
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(type, typingSpeed / 2);
        } else {
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(type, speed);
        }
    }

    if (document.fonts) {
        document.fonts.ready.then(() => {
            if (typewriterTextElement && parentParagraph) {
                setMinHeight();
                void parentParagraph.offsetHeight; // Принудительный перерасчет layout
                setTimeout(type, 150); // Небольшая задержка перед стартом анимации
            }
        });
    } else {
        // Fallback для старых браузеров
        if (typewriterTextElement && parentParagraph) {
            setMinHeight();
            void parentParagraph.offsetHeight;
            setTimeout(type, delayBetweenPhrases / 2);
        }
    }
}