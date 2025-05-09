// js/modules/hero.js

export function initHeroAnimations() {
    const typewriterTextElement = document.getElementById('typewriter-text');
    if (!typewriterTextElement) return;

    const phrases = [
        "Frontend Entwickler.",
        "Backend Spezialist.",
        "Full-Stack Developer.",
        "UI/UX Enthusiast."
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; 
    const deletingSpeed = 50; 
    const delayBetweenPhrases = 1500; 
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

            const container = typewriterTextElement.closest('.typewriter-container') || typewriterTextElement;
            container.style.minHeight = `${maxHeight}px`;
        }
    }

    function type() {
        const currentPhrase = phrases[currentPhraseIndex];

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
            setTimeout(type, typingSpeed); 
        } else {
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(type, speed);
        }
    }

    if (typewriterTextElement) {
        setMinHeight(); 
        setTimeout(type, delayBetweenPhrases / 2); 
    }
}