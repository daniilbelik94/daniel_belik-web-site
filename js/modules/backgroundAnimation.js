// js/modules/backgroundAnimation.js

export function initBackgroundAnimation() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) {
        console.error('Background canvas element not found.');
        return;
    }
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const numberOfParticles = 50; // Количество частиц (подберите оптимальное)
    const connectDistance = 100; // Макс. расстояние для соединения линий
    const cursorConnectDistance = 150; // Макс. расстояние для соединения с курсором

    // Мышь
    const mouse = {
        x: null,
        y: null,
        radius: cursorConnectDistance // Радиус влияния мыши
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });
    window.addEventListener('mouseout', () => { // Убираем влияние мыши, когда она вне окна
        mouse.x = null;
        mouse.y = null;
    });

    // Устанавливаем размер Canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Устанавливаем начальный размер

    // Класс для частиц
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1; // Радиус точки
            this.speedX = Math.random() * 1 - 0.5; // Горизонтальная скорость
            this.speedY = Math.random() * 1 - 0.5; // Вертикальная скорость
            // Цвет частиц - используем наши CSS переменные
            this.color = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#6366f1';
        }

        // Обновление позиции
        update() {
            // Отскок от краев
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
            this.x += this.speedX;
            this.y += this.speedY;
        }

        // Отрисовка частицы
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Инициализация частиц
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    initParticles();

    // Анимация
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas

        // Соединяем частицы линиями
        connectParticles();

        // Обновляем и рисуем частицы
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }

        requestAnimationFrame(animate); // Зацикливаем анимацию
    }

    // Функция для соединения частиц
    function connectParticles() {
        let opacityValue = 1;
        // Линии между частицами
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) { // Начинаем с a + 1, чтобы не проверять пары дважды
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectDistance) {
                    opacityValue = 1 - (distance / connectDistance); // Чем дальше, тем прозрачнее линия
                    // Используем наш акцентный цвет --secondary для линий
                    const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary') || '#06b6d4';
                    ctx.strokeStyle = `rgba(${hexToRgb(lineColor)}, ${opacityValue})`; // Функция hexToRgb нужна
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
            // Линии к курсору
            if (mouse.x !== null && mouse.y !== null) {
                 const dx = particlesArray[a].x - mouse.x;
                 const dy = particlesArray[a].y - mouse.y;
                 const distance = Math.sqrt(dx * dx + dy * dy);
                 if (distance < mouse.radius) {
                     opacityValue = 1 - (distance / mouse.radius);
                     const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary') || '#06b6d4';
                     ctx.strokeStyle = `rgba(${hexToRgb(lineColor)}, ${opacityValue})`;
                     ctx.lineWidth = 1;
                     ctx.beginPath();
                     ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                     ctx.lineTo(mouse.x, mouse.y);
                     ctx.stroke();
                 }
            }
        }
    }

    // Вспомогательная функция для конвертации HEX в RGB (для rgba)
    function hexToRgb(hex) {
        // Убираем #
        hex = hex.replace(/^#/, '');
        // Если короткий формат (#RGB), преобразуем в #RRGGBB
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        // Парсим R, G, B
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }


    // Пересоздаем частицы при изменении размера окна, чтобы они распределились по-новому
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles(); // Пересоздаем частицы для нового размера
    });


    // Запускаем анимацию
    animate();
}