import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import Footer from "./components/layout/Footer";
import ToolDetailPage from "./components/ai/ToolDetailPage";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] text-neutral-50">
            <Header/>

            <main className="pb-12">
                <Routes>
                    <Route path="/" element={<Hero/>}/>
                    <Route path="/tool/:id" element={<ToolDetailPage/>}/>
                </Routes>
            </main>

            <Footer/>
        </div>
    );
};

export default App;
