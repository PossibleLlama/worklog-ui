import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

import getWorklogs from "@api/getWorklogs/getWorklogs";
import createWorklog from "@api/createWorklog/createWorklog";
import editWorklog from "@api/editWorklog/editWorklog";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App getWorklogs={getWorklogs} createWork={createWorklog} editWork={editWorklog} />
        </BrowserRouter>
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
        />
    </React.StrictMode>
);
