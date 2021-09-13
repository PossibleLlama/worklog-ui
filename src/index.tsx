import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ToastProvider } from "@zendeskgarden/react-notifications";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { worklogTheme } from "./Theme/theme";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={{ ...worklogTheme("Light") }}>
            <ToastProvider>
                <App />
            </ToastProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
