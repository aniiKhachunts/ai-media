// src/App.tsx
import React from "react";
import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import StatsSection from "./components/home/StatsSection";
import AiGrid from "./components/ai/AiGrid";
import Footer from "./components/layout/Footer";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-50">
            <Header />
            <main>
                <Hero />
                <StatsSection />
                <AiGrid />
                {/* Later: Reviews, clients, cases, webinar, big CTA, etc. */}
            </main>
            <Footer />
        </div>
    );
};

export default App;
