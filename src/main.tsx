import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import {LanguageProvider} from "./i18n/LanguageContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <LanguageProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </LanguageProvider>
    </React.StrictMode>
);