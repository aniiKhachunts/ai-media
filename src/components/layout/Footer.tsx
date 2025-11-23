import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="app-footer">
            <div className="mx-auto max-w-6xl px-4 py-10 lg:px-0 lg:py-12">
                <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                    <div className="max-w-sm space-y-3">
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                  flex h-9 w-9 items-center justify-center
                                  rounded-2xl
                                  bg-[radial-gradient(circle_at_30%_30%,#ff5bfa_0%,#b86cff_40%,#3a1f57_100%)]
                                  shadow-[0_0_18px_rgba(184,108,255,0.6)]
                                "
                            >
                                <span className="text-xs font-semibold text-white">AI</span>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-sm font-semibold tracking-[0.18em] uppercase">
                                  All AIs
                                </span>
                                <span className="text-[11px] text-[var(--color-text-soft)]">
                                  Curated catalog of AI tools, systems and real-world use cases.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="mt-8 border-t border-[var(--color-border-soft)] pt-4 text-[11px] text-[var(--color-text-soft)] flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>© {new Date().getFullYear()} All AIs. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
