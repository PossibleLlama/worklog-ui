import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Windmill } from "@windmill/react-ui";
import { worklogTheme } from "./Theme/theme";

ReactDOM.render(
    <React.StrictMode>
        <Windmill theme={worklogTheme} usePreferences>
            <App />
        </Windmill>
    </React.StrictMode>,
    document.getElementById("root")
);
