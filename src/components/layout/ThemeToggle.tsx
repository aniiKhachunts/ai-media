import React, {useEffect, useState} from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "ai-media-theme";

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
        let next: Theme = "dark";

        if (stored === "dark" || stored === "light") {
            next = stored;
        } else {
            const prefersDark = window.matchMedia?.(
                "(prefers-color-scheme: dark)"
            ).matches;
            next = prefersDark ? "dark" : "light";
        }

        setTheme(next);
        document.documentElement.dataset.theme = next;
    }, []);

    const toggleTheme = () => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.dataset.theme = next;
        window.localStorage.setItem(STORAGE_KEY, next);
    };

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="
                flex items-center gap-2
                rounded-full border border-[var(--color-border-soft)]
                bg-[var(--color-surface-grid-soft)]
                px-3 py-1.5
                text-[11px] font-medium
                text-[var(--color-text-main)]
                shadow-sm
                transition
                hover:border-[var(--color-primary)]
                hover:bg-[var(--color-chip-bg)]
                cursor-pointer
            "
        >
          <span
              className="
                  flex h-6 w-6 items-center justify-center
                  rounded-full
                  bg-[var(--color-bg-card)]
                  text-xs
              "
          >
            {isDark ? "🌙" : "☀️"}
          </span>
        </button>
    );
};

export default ThemeToggle;
