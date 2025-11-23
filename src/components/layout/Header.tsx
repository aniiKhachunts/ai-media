import React from "react";
import ThemeToggle from "./ThemeToggle";
import {Link} from "react-router-dom";
import {useT} from "../../i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle.tsx";

const Header: React.FC = () => {
    const t = useT();

    return (
        <header className="app-header">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-0 lg:py-4">
                <Link to="/" className="hover:text-[var(--color-text-main)]">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div
                            className="
                          flex h-9 w-9 items-center justify-center
                          rounded-2xl
                          bg-[radial-gradient(circle_at_30%_30%,#ff5bfa_0%,#b86cff_40%,#3a1f57_100%)]
                          shadow-[0_0_18px_rgba(204,101,255,0.55)]
                        "
                        >
                            <span className="text-xs font-semibold text-white">AI</span>
                        </div>

                        <div className="flex flex-col leading-tight">
                            <span
                                className="text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-text-main)]">
                              All AIs
                            </span>
                            <div className="text-[11px] text-[var(--color-text-soft)]">
                                {t("nav.logoSubtitle")}
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="flex items-center gap-2">
                    <LanguageToggle/>
                    <ThemeToggle/>
                </div>
            </div>
        </header>
    );
};

export default Header;
