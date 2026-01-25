// ==============================================
// COPYRIGHT YEAR UPDATER
// ==============================================

function updateCurrentYear() {
    const yearElement = document.getElementById('footer-current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateCurrentYear();
});

const themeNames = {
    'light': 'Light',
    'dark': 'Dark',
    'system': 'System'
};

// ==============================================
// THEME TOGGLE FUNCTIONALITY
// ==============================================

function initializeTheme() {
    const themeDropdown = document.getElementById('footer-theme-dropdown');
    if (!themeDropdown) return;

    const themeOptions = themeDropdown.querySelectorAll('a[data-theme-value]');
    if (!themeOptions.length) return;

    // Get saved theme preference or default to 'system'
    const savedTheme = localStorage.getItem('theme-preference') || 'system';

    // Apply initial theme
    applyTheme(savedTheme);
    updateThemeDropdown(savedTheme);

    // Handle theme selection (use event delegation for better performance)
    themeDropdown.addEventListener('click', (e) => {
        const option = e.target.closest('a[data-theme-value]');
        if (option) {
            e.preventDefault();
            const selectedTheme = option.dataset.themeValue;
            localStorage.setItem('theme-preference', selectedTheme);
            applyTheme(selectedTheme);
            updateThemeDropdown(selectedTheme);
        }
    });
}

function applyTheme(theme) {
    const html = document.documentElement;
    if (!html) return;

    if (theme === 'system') {
        // Respect OS preference for system theme
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        html.setAttribute('data-theme', systemTheme);
    } else {
        html.setAttribute('data-theme', theme);
    }
}

function updateThemeDropdown(selectedTheme) {
    const themeDropdown = document.getElementById('footer-theme-dropdown');
    if (!themeDropdown) return;

    const currentThemeText = themeDropdown.querySelector('summary #footer-theme-current');
    const themeOptions = themeDropdown.querySelectorAll('a[data-theme-value]');
    const sunIcon = document.getElementById('footer-theme-icon-sun');
    const moonIcon = document.getElementById('footer-theme-icon-moon');

    if (!currentThemeText || !themeOptions.length) return;

    // Update current theme text
    currentThemeText.textContent = themeNames[selectedTheme] || 'System';

    // Update icon visibility
    if (sunIcon && moonIcon) {
        if (selectedTheme === 'light') {
            sunIcon.style.display = 'inline-flex';
            moonIcon.style.display = 'none';
        } else if (selectedTheme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-flex';
        } else {
            // For system theme, show icon based on system preference
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            if (systemTheme === 'dark') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline-flex';
            } else {
                sunIcon.style.display = 'inline-flex';
                moonIcon.style.display = 'none';
            }
        }
    }

    // Update active state for options
    themeOptions.forEach(option => {
        if (option.dataset.themeValue === selectedTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Listen for system theme changes
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
systemThemeQuery.addEventListener('change', () => {
    const savedTheme = localStorage.getItem('theme-preference') || 'system';
    if (savedTheme === 'system') {
        applyTheme('system');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
});

// ==============================================
// LANGUAGE SWITCHER HINT FUNCTIONALITY
// ==============================================

function initializeLanguageHint() {
    const currentLang = document.documentElement.lang;
    const browserLang = (navigator.language || navigator.languages[0] || '').split('-')[0];

    // Don't show hint if languages match or no browser language detected
    if (!browserLang || currentLang === browserLang) {
        return;
    }

    // Check if user has dismissed this hint before
    const dismissKey = `lang-hint-dismissed-${currentLang}-${browserLang}`;
    if (localStorage.getItem(dismissKey)) {
        return;
    }

    // Find matching language in switcher options
    const languageContainer = document.getElementById('header-language-switcher-options');
    const languageLinks = languageContainer.querySelectorAll('a[data-lang]');
    let matchedLink = null;

    for (const link of languageLinks) {
        if (link.dataset.lang === browserLang) {
            matchedLink = link;
            break;
        }
    }

    if (!matchedLink) {
        return; // No matching language available
    }

    // Show the hint
    const hint = document.getElementById('header-language-hint');
    const hintText = document.getElementById('header-language-hint-text');
    const hintLink = document.getElementById('header-language-hint-link');
    const dismissBtn = document.getElementById('header-language-hint-dismiss');

    hintText.textContent = 'This page is available in your language:';
    hintLink.textContent = matchedLink.textContent;
    hintLink.href = matchedLink.href;

    hint.style.display = 'block';

    // Handle dismiss
    dismissBtn.addEventListener('click', () => {
        hint.style.display = 'none';
        localStorage.setItem(dismissKey, 'true');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeLanguageHint();
});
