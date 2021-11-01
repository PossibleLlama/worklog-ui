import React from "react";
import App from "./App";

import { ThemeProvider } from "@zendeskgarden/react-theming";

import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import { ToastProvider } from "@zendeskgarden/react-notifications";

describe("App", () => {
    beforeEach(() => {
        render(
            <ThemeProvider>
                <ToastProvider>
                    <App />
                </ToastProvider>
            </ThemeProvider>
        );
    });

    it("Has header", () => {
        expect(document.body.contains(screen.getByText(/Worklog/)));
        expect(document.body.contains(screen.getByText(/A productivity app./)));
        expect(document.body.contains(screen.getByRole("button", { name: "Filter" })));
        expect(document.body.contains(screen.getByRole("button", { name: "Timeline" })));
        expect(document.body.contains(screen.getByRole("button", { name: "Discover" })));
    });
});
