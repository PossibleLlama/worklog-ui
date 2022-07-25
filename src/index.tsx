import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { ToastProvider } from "@zendeskgarden/react-notifications";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { worklogTheme } from "./Theme/theme";

import getWorklogByRange from "@api/getWorklogByRange/getWorklogByRange";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={{ ...worklogTheme("Light") }}>
            <ToastProvider>
                <BrowserRouter>
                    <App getWorklogs={getWorklogByRange} />
                </BrowserRouter>
            </ToastProvider>
        </ThemeProvider>
    </React.StrictMode>
);
