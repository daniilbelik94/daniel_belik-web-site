// test/check-links.js
// Простая проверка ссылок и ресурсов

const fs = require('fs');
const path = require('path');

console.log('🔍 Проверка ссылок и ресурсов сайта...\n');

// Проверяем основные файлы
const requiredFiles = [
    'index.html',
    'css/styles.css',
    'js/main.js',
    'sections/hero.html',
    'sections/leistungen.html',
    'sections/portfolio.html',
    'sections/kontakt.html'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} - найден`);
    } else {
        console.log(`❌ ${file} - НЕ НАЙДЕН`);
        allFilesExist = false;
    }
});

// Проверяем CSS файлы
console.log('\n📁 Проверка CSS файлов:');
const cssFiles = [
    'css/base/_variables.css',
    'css/base/_animations.css',
    'css/components/_buttons.css',
    'css/utilities/_modern.css'
];

cssFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} - найден`);
    } else {
        console.log(`❌ ${file} - НЕ НАЙДЕН`);
        allFilesExist = false;
    }
});

// Проверяем JS модули
console.log('\n📁 Проверка JS модулей:');
const jsFiles = [
    'js/modules/advancedAnimations.js',
    'js/modules/performanceOptimizer.js',
    'js/modules/sectionLoader.js',
    'js/modules/hero.js'
];

jsFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} - найден`);
    } else {
        console.log(`❌ ${file} - НЕ НАЙДЕН`);
        allFilesExist = false;
    }
});

// Проверяем изображения
console.log('\n🖼️ Проверка изображений:');
const imageFiles = [
    'img/placeholder/avatar.png',
    'img/logo.svg',
    'img/projects/money_guard.png'
];

imageFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} - найден`);
    } else {
        console.log(`❌ ${file} - НЕ НАЙДЕН`);
        allFilesExist = false;
    }
});

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
    console.log('🎉 Все проверки пройдены успешно!');
    console.log('✅ Сайт готов к запуску');
    process.exit(0);
} else {
    console.log('⚠️  Обнаружены отсутствующие файлы');
    console.log('❌ Проверьте структуру проекта');
    process.exit(1);
}
