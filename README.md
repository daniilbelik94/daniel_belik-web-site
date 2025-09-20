# 🌟 Daniel Belik - Portfolio Website

Современный portfolio сайт веб-разработчика с продвинутыми анимациями и оптимизацией производительности.

## 🚀 Особенности

- ✨ **Современные анимации** - floating, morphing, stagger эффекты
- 🎨 **Glassmorphism UI** - стеклянные эффекты и размытие
- ⚡ **Высокая производительность** - оптимизированные анимации и lazy loading
- 📱 **Полная адаптивность** - отлично работает на всех устройствах
- ♿ **Доступность** - поддержка screen readers и prefers-reduced-motion
- 🌙 **Темная/светлая тема** - автоматическое переключение
- 🎯 **SEO оптимизация** - structured data и meta теги

## 🛠️ Технологии

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Анимации**: CSS Animations, Intersection Observer API
- **UI/UX**: Modern CSS (Grid, Flexbox, Custom Properties)
- **Оптимизация**: Performance API, WebP, Preloading
- **Инструменты**: Live Server, ESLint, Prettier

## 📦 Установка и запуск

### Предварительные требования

- Node.js 16+
- npm или yarn

### Быстрый старт

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/your-username/daniel-belik-website.git
cd daniel-belik-website

# 2. Установите зависимости
npm install

# 3. Запустите локальный сервер
npm run dev

# 4. Откройте в браузере
# http://localhost:3000
```

### Доступные команды

```bash
# Разработка с live reload
npm run dev

# Запуск сервера
npm start

# Проверка ссылок и ресурсов
npm test

# Валидация кода
npm run validate

# Подготовка к деплою
npm run build
```

## 📁 Структура проекта

```
daniel-belik-website/
├── css/
│   ├── base/           # Базовые стили
│   ├── components/     # Компоненты (кнопки, карточки)
│   ├── sections/       # Стили секций
│   ├── utilities/      # Утилиты и хелперы
│   └── styles.css      # Главный CSS файл
├── js/
│   ├── modules/        # JS модули
│   └── main.js         # Точка входа
├── sections/           # HTML секции
├── img/               # Изображения и иконки
├── test/              # Тесты и проверки
└── index.html         # Главная страница
```

## 🎨 Новые возможности

### Продвинутые анимации

```html
<!-- Floating элементы -->
<div class="animate-float">Плавающий элемент</div>

<!-- Hover эффекты -->
<div class="hover-lift hover-glow">Карточка с подъемом</div>

<!-- Stagger анимации -->
<div class="stagger-animation" style="--stagger-delay: 1;">
  Элемент с задержкой
</div>
```

### Современные кнопки

```html
<!-- Glassmorphism -->
<button class="btn btn-glass">Стеклянная кнопка</button>

<!-- Неоновый эффект -->
<button class="btn btn-neon">Неоновая кнопка</button>

<!-- 3D эффект -->
<button class="btn btn-3d">3D кнопка</button>
```

### Утилиты для макета

```html
<!-- Grid layout -->
<div class="grid-auto-fit">Автоматическая сетка</div>

<!-- Flexbox центрирование -->
<div class="flex-center">Центрированный контент</div>

<!-- Glassmorphism контейнер -->
<div class="glass">Стеклянный контейнер</div>
```

## ⚡ Производительность

- **Intersection Observer** для ленивой загрузки анимаций
- **Hardware acceleration** для плавных переходов
- **WebP поддержка** с автоматическим fallback
- **Preloading** критических ресурсов
- **CSS containment** для изоляции стилей
- **RAF throttling** для оптимизации скролла

## 🌐 Поддержка браузеров

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 (ограниченная поддержка)

## 📱 Адаптивность

- **Mobile First** подход
- Поддержка от 320px до 4K
- Touch-friendly интерфейс
- Оптимизированные анимации для мобильных

## ♿ Доступность

- **WCAG 2.1 AA** соответствие
- Screen reader поддержка
- Keyboard navigation
- High contrast режим
- Prefers-reduced-motion поддержка

## 🔧 Настройка

### Цветовая схема

Измените цвета в `css/base/_variables.css`:

```css
:root {
  --primary: #6366f1; /* Основной цвет */
  --secondary: #06b6d4; /* Вторичный цвет */
  --accent: #a855f7; /* Акцентный цвет */
}
```

### Анимации

Управляйте анимациями в `css/base/_animations.css`

### Производительность

Настройки в `js/modules/performanceOptimizer.js`

## 📊 Аналитика

Сайт включает поддержку:

- Google Analytics
- Google Search Console
- Schema.org markup
- Open Graph meta tags

## 🚀 Деплой

### GitHub Pages

```bash
# Настройка для GitHub Pages
npm run build
# Загрузите файлы в ветку gh-pages
```

### Netlify

```bash
# Билд команда
npm run build

# Директория публикации
./
```

### Vercel

```bash
# Автоматический деплой при push в main
```

## 🤝 Вклад в проект

1. Fork проекта
2. Создайте feature ветку (`git checkout -b feature/amazing-feature`)
3. Коммитьте изменения (`git commit -m 'Add amazing feature'`)
4. Push в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📝 Лицензия

MIT License - смотрите [LICENSE](LICENSE) файл

## 👨‍💻 Автор

**Daniel Belik**

- 🌐 Website: [webblock.org](https://webblock.org)
- 📧 Email: daniilbelik@icloud.com
- 💼 LinkedIn: [Daniel Belik](https://www.linkedin.com/in/daniil-belik-74a1982b6/)
- 🐙 GitHub: [@daniilbelik94](https://github.com/daniilbelik94)

## 🙏 Благодарности

- Font Awesome за иконки
- Google Fonts за типографику
- Swiper.js за слайдеры
- Сообщество разработчиков за вдохновение

---

⭐ Поставьте звезду если проект понравился!
