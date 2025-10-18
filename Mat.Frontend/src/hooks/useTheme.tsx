import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check saved preference
        return (
            (localStorage.getItem('theme') as Theme) ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light')
        );
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
        } else {
            root.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

    return { theme, toggleTheme };
}
