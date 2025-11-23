import React from "react";
import AiGrid from "../ai/AiGrid";

const Hero: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-[var(--bg-main)]">
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[var(--accent-pink-soft)] blur-3xl"/>
                <div
                    className="absolute right-[-8rem] top-16 h-80 w-80 rounded-full bg-[rgba(96,165,250,0.22)] blur-3xl"/>
                <div
                    className="absolute bottom-[-7rem] left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-[50%] bg-[var(--bg-soft)] opacity-80 blur-3xl"/>
            </div>

            <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 lg:px-0 lg:pt-20 lg:pb-16">
                <AiGrid/>
            </div>
        </section>
    );
};

export default Hero;
