import React from "react";
import App from "./App";

import { ThemeProvider } from "@zendeskgarden/react-theming";
import { ToastProvider } from "@zendeskgarden/react-notifications";

import { expect } from "chai";
import { render, screen } from "@testing-library/react";

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
        expect(screen.getByText(/Worklog/));
        expect(screen.getByText(/A productivity app./));
        expect(screen.getByRole("button", { name: "Filter" }));
        expect(screen.getByRole("button", { name: "Timeline" }));
        expect(screen.getByRole("button", { name: "Discover" }));
    });
});
