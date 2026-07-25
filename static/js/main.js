(function () {
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const preference = window.matchMedia('(prefers-color-scheme: dark)');

    function savedTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (error) {
            return null;
        }
    }

    function setTheme(theme, remember) {
        root.dataset.theme = theme;

        if (remember) {
            try {
                localStorage.setItem('theme', theme);
            } catch (error) {
                // The selected theme still applies for the current page.
            }
        }

        if (toggle) {
            const isDark = theme === 'dark';
            const label = isDark ? 'Use light mode' : 'Use dark mode';
            toggle.setAttribute('aria-label', label);
            toggle.setAttribute('title', label);
            toggle.setAttribute('aria-pressed', String(isDark));
        }
    }

    setTheme(root.dataset.theme || (preference.matches ? 'dark' : 'light'), false);

    if (toggle) {
        toggle.addEventListener('click', function () {
            setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
        });
    }

    preference.addEventListener('change', function (event) {
        if (!savedTheme()) {
            setTheme(event.matches ? 'dark' : 'light', false);
        }
    });
}());
