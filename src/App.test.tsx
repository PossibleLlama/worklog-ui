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

    it("Has name", () => {
        expect(document.body.contains(screen.getByText(/Worklog/)));
    });
});
