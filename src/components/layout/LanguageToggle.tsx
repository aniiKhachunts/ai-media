// src/components/layout/LanguageToggle.tsx
import React from "react";
import {useLanguage} from "../../i18n/LanguageContext";

const LanguageToggle: React.FC = () => {
    const {lang, setLang, t} = useLanguage();

    return (
        <div
            className="flex items-center gap-1 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-grid-soft)] px-1 py-0.5">
            <button
                type="button"
                onClick={() => setLang("en")}
                className={[
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold cursor-pointer",
                    lang === "en"
                        ? "bg-[var(--color-bg-card)] text-[var(--color-primary)]"
                        : "text-[var(--color-text-soft)]"
                ].join(" ")}
            >
                {t("lang.en")}
            </button>
            <button
                type="button"
                onClick={() => setLang("ru")}
                className={[
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold cursor-pointer",
                    lang === "ru"
                        ? "bg-[var(--color-bg-card)] text-[var(--color-primary)]"
                        : "text-[var(--color-text-soft)]"
                ].join(" ")}
            >
                {t("lang.ru")}
            </button>
        </div>
    );
};

export default LanguageToggle;
