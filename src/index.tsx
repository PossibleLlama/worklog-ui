import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ToastProvider } from "@zendeskgarden/react-notifications";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { worklogTheme } from "./Theme/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={{ ...worklogTheme("Light") }}>
            <ToastProvider>
                <App />
            </ToastProvider>
        </ThemeProvider>
    </React.StrictMode>
);
