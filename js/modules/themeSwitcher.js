// js/modules/themeSwitcher.js
export function initThemeSwitcher() {
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    if (!themeToggleButton) {
        console.warn('Theme toggle button #theme-toggle-btn not found.'); // Warn if button is missing
        return;
    }

    const STORAGE_KEY = 'themePreference';

    // Function to apply the theme to the body and save preference
    function applyTheme(theme) {
        // console.log(`Applying theme: ${theme}`); // For debugging
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
        localStorage.setItem(STORAGE_KEY, theme);
        updateToggleButtonAria(theme);
        // Canvas colors will update automatically as backgroundAnimation.js reads CSS variables.
    }

    // Function to update ARIA label for accessibility
    function updateToggleButtonAria(theme) {
        if (theme === 'light') {
            themeToggleButton.setAttribute('aria-label', 'Switch to dark theme');
        } else {
            themeToggleButton.setAttribute('aria-label', 'Switch to light theme');
        }
    }

    // Event listener for the theme toggle button
    themeToggleButton.addEventListener('click', () => {
        const isCurrentlyLight = document.body.classList.contains('light-theme');
        const newTheme = isCurrentlyLight ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    // Determine and apply initial theme on page load
    let currentTheme = localStorage.getItem(STORAGE_KEY);
    if (!currentTheme) {
        // If no preference stored, check system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme = prefersDark ? 'dark' : 'light';
        // console.log(`No stored theme. Using system preference: ${currentTheme}`); // For debugging
    } else {
        // console.log(`Using stored theme: ${currentTheme}`); // For debugging
    }
    applyTheme(currentTheme); // Apply the determined theme
}