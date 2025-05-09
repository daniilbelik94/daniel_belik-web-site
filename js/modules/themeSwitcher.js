// js/modules/themeSwitcher.js
export function initThemeSwitcher() {
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    if (!themeToggleButton) {
        console.warn('Theme toggle button #theme-toggle-btn not found.');
        return;
    }

    const STORAGE_KEY = 'themePreference';
    const prefersDarkScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
        updateToggleButtonAria(theme);
    }

    function updateToggleButtonAria(theme) {
        if (theme === 'light') {
            themeToggleButton.setAttribute('aria-label', 'Switch to dark theme');
        } else {
            themeToggleButton.setAttribute('aria-label', 'Switch to light theme');
        }
    }

    themeToggleButton.addEventListener('click', () => {
        const isCurrentlyLight = document.body.classList.contains('light-theme');
        const newTheme = isCurrentlyLight ? 'dark' : 'light';
        localStorage.setItem(STORAGE_KEY, newTheme); 
        applyTheme(newTheme);
    });

    let initialTheme = localStorage.getItem(STORAGE_KEY);
    if (!initialTheme) {
        initialTheme = prefersDarkScheme.matches ? 'dark' : 'light';

    }
    applyTheme(initialTheme);
    if (prefersDarkScheme) {
        prefersDarkScheme.addEventListener('change', (event) => {

            if (!localStorage.getItem(STORAGE_KEY)) {
                const newSystemTheme = event.matches ? 'dark' : 'light';
                applyTheme(newSystemTheme);
            }
        });
    }
}