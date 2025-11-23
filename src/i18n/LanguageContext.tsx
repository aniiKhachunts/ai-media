import React, {createContext, useContext, useEffect, useState} from "react";
import {type Lang, translate} from "./translations";

type LanguageContextValue = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
    undefined
);

const STORAGE_KEY = "ai-media-lang";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                              children
                                                                          }) => {
    const [lang, setLangState] = useState<Lang>("en");

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
        if (stored === "en" || stored === "ru") {
            setLangState(stored);
        }
    }, []);

    const setLang = (next: Lang) => {
        setLangState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
    };

    const t = (key: string) => translate(lang, key);

    return (
        <LanguageContext.Provider value={{lang, setLang, t}}>
            {children}
        </LanguageContext.Provider>
    );
};

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error("useLanguage must be used inside LanguageProvider");
    }
    return ctx;
}

export function useT() {
    const {t} = useLanguage();
    return t;
}
