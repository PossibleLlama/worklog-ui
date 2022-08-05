import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

import getWorklogByRange from "@api/getWorklogByRange/getWorklogByRange";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App getWorklogs={getWorklogByRange} />
        </BrowserRouter>
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
        />
    </React.StrictMode>
);
