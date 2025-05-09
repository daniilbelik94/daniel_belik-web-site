// js/modules/backgroundAnimation.js - ИСПРАВЛЕННАЯ ВЕРСИЯ (БЕЗ API ЦВЕТОВ)

export function initBackgroundAnimation() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) {
        console.error('Background canvas element not found.');
        return;
    }
    const ctx = canvas.getContext('2d');
     if (!ctx) { // Добавлена проверка контекста
         console.error('Could not get 2D context from canvas.');
         return;
     }

    let particlesArray = [];
    // Уменьшил кол-во частиц для возможной оптимизации
    const numberOfParticles = 50;
    const connectDistance = 100;
    const cursorConnectDistance = 150;

    const mouse = { x: null, y: null, radius: cursorConnectDistance };

    // --- Функция изменения размера ---
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // --- Класс частицы ---
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
             // Используем CSS переменные напрямую при создании
             this.color = getComputedStyle(document.documentElement).getPropertyValue('--canvas-particle-color').trim() || '#6366f1';
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            this.x += this.speedX;
            this.y += this.speedY;

            this.color = getComputedStyle(document.documentElement).getPropertyValue('--canvas-particle-color').trim() || '#6366f1';
        }
        draw() { // Убрал аргумент context, используем ctx из замыкания
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // --- Инициализация/Пересоздание частиц ---
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // --- Функция конвертации HEX->RGB ---
    // Нужна для connectParticles
    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        const bigint = parseInt(hex, 16);
        if (isNaN(bigint)) return '0, 0, 0'; // Fallback
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }

    // --- Функция соединения частиц ---
    function connectParticles() { // Убрал аргумент context
        let opacityValue = 1;
        // Получаем цвет линии из CSS переменной КАЖДЫЙ кадр (на случай смены темы)
        const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--canvas-line-color').trim() || '#06b6d4';
        const currentLineRgb = hexToRgb(lineColor); // Конвертируем актуальный цвет

        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < connectDistance) {
                    opacityValue = 1 - (distance / connectDistance);
                    ctx.strokeStyle = `rgba(${currentLineRgb}, ${opacityValue})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particlesArray[a].x - mouse.x;
                const dy = particlesArray[a].y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    opacityValue = 1 - (distance / mouse.radius);
                    ctx.strokeStyle = `rgba(${currentLineRgb}, ${opacityValue})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    // --- Основной цикл анимации ---
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // ctx из замыкания
        connectParticles(); // ctx из замыкания
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw(); // ctx из замыкания
        }
        requestAnimationFrame(animate);
    }

    // --- Установка обработчиков событий ---
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });
    // Используем один обработчик resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    // --- Начальная настройка ---
    resizeCanvas(); // Устанавливаем размер
    initParticles(); // Создаем частицы
    animate(); // Запускаем анимацию
} // Конец initBackgroundAnimation