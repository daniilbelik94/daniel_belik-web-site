// test/browser-test.js
// Простой тест для проверки в браузере через консоль

console.log('🧪 Запуск тестов браузера...');

// Тест 1: Проверка загрузки основных модулей
function testModuleLoading() {
    console.log('\n📦 Тест загрузки модулей:');
    
    const tests = [
        { name: 'CSS Variables', test: () => getComputedStyle(document.documentElement).getPropertyValue('--primary') },
        { name: 'Main Script', test: () => document.querySelector('script[src*="main.js"]') },
        { name: 'Font Awesome', test: () => document.querySelector('link[href*="font-awesome"]') },
        { name: 'Google Fonts', test: () => document.querySelector('link[href*="fonts.googleapis"]') }
    ];
    
    tests.forEach(({ name, test }) => {
        try {
            const result = test();
            console.log(result ? `✅ ${name}` : `❌ ${name}`);
        } catch (e) {
            console.log(`❌ ${name} - Error: ${e.message}`);
        }
    });
}

// Тест 2: Проверка анимаций
function testAnimations() {
    console.log('\n🎨 Тест анимаций:');
    
    const animatedElements = [
        '.hero-photo',
        '.benefit-item',
        '[data-animation]',
        '.typewriter-container'
    ];
    
    animatedElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            const styles = getComputedStyle(element);
            const hasTransition = styles.transition !== 'all 0s ease 0s';
            const hasAnimation = styles.animation !== 'none';
            console.log(`${hasTransition || hasAnimation ? '✅' : '❌'} ${selector}`);
        } else {
            console.log(`❌ ${selector} - элемент не найден`);
        }
    });
}

// Тест 3: Проверка интерактивности
function testInteractivity() {
    console.log('\n🎯 Тест интерактивности:');
    
    // Проверяем кнопки
    const buttons = document.querySelectorAll('.btn');
    console.log(`${buttons.length > 0 ? '✅' : '❌'} Кнопки найдены: ${buttons.length}`);
    
    // Проверяем hover элементы
    const hoverElements = document.querySelectorAll('[class*="hover-"]');
    console.log(`${hoverElements.length > 0 ? '✅' : '❌'} Hover элементы: ${hoverElements.length}`);
    
    // Проверяем секции
    const sections = document.querySelectorAll('section');
    console.log(`${sections.length > 0 ? '✅' : '❌'} Секции загружены: ${sections.length}`);
}

// Тест 4: Проверка производительности
function testPerformance() {
    console.log('\n⚡ Тест производительности:');
    
    // Проверяем will-change
    const optimizedElements = document.querySelectorAll('.performance-optimized, .gpu-accelerated');
    console.log(`${optimizedElements.length > 0 ? '✅' : '❌'} Оптимизированные элементы: ${optimizedElements.length}`);
    
    // Проверяем Intersection Observer
    console.log(`${'IntersectionObserver' in window ? '✅' : '❌'} Intersection Observer поддерживается`);
    
    // Проверяем requestAnimationFrame
    console.log(`${'requestAnimationFrame' in window ? '✅' : '❌'} RAF поддерживается`);
}

// Тест 5: Проверка адаптивности
function testResponsiveness() {
    console.log('\n📱 Тест адаптивности:');
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    console.log(`📏 Размер viewport: ${width}x${height}`);
    
    if (width >= 1280) {
        console.log('🖥️ Desktop Large');
    } else if (width >= 1024) {
        console.log('🖥️ Desktop');
    } else if (width >= 768) {
        console.log('📱 Tablet');
    } else {
        console.log('📱 Mobile');
    }
    
    // Проверяем meta viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    console.log(`${viewport ? '✅' : '❌'} Meta viewport`);
}

// Запуск всех тестов
function runAllTests() {
    console.log('🚀 Запуск полной проверки сайта\n');
    
    testModuleLoading();
    testAnimations();
    testInteractivity();
    testPerformance();
    testResponsiveness();
    testNavigation();
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 Тестирование завершено!');
    console.log('💡 Доступные тесты:');
    console.log('   - siteTests.runAllTests() - полный тест');
    console.log('   - siteTests.testNavigation() - тест навигации');
    console.log('   - siteTests.testQuickNavigation() - быстрый тест прокрутки');
    console.log('🌐 Сайт доступен на: ' + window.location.href);
}

// Автозапуск через 2 секунды после загрузки
setTimeout(runAllTests, 2000);

// Тест навигации
function testNavigation() {
    console.log('\n🧭 Тест навигации:');
    
    const sections = ['hero', 'ueber-mich', 'leistungen', 'portfolio', 'testimonials', 'faq', 'kontakt'];
    
    sections.forEach(sectionId => {
        const section = document.querySelector(`#${sectionId}`);
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (section && navLink) {
            console.log(`✅ ${sectionId} - секция и ссылка найдены`);
        } else if (!section) {
            console.log(`❌ ${sectionId} - секция не найдена`);
        } else if (!navLink) {
            console.log(`❌ ${sectionId} - ссылка не найдена`);
        }
    });
    
    // Тест функции навигации
    if (window.reinitNavigation) {
        console.log('✅ Функция reinitNavigation доступна');
    } else {
        console.log('❌ Функция reinitNavigation не найдена');
    }
}

// Функция для быстрого тестирования навигации
function testQuickNavigation() {
    console.log('🚀 Быстрый тест навигации...');
    
    const testSections = ['#testimonials', '#faq', '#kontakt'];
    
    testSections.forEach((href, index) => {
        setTimeout(() => {
            console.log(`Тестируем переход к ${href}`);
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.warn(`Секция ${href} не найдена`);
            }
        }, index * 2000);
    });
}

// Экспортируем функции для ручного вызова
window.siteTests = {
    runAllTests,
    testModuleLoading,
    testAnimations,
    testInteractivity,
    testPerformance,
    testResponsiveness,
    testNavigation,
    testQuickNavigation
};
