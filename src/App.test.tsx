import React from "react";
import App from "./App";

import { ThemeProvider } from "@zendeskgarden/react-theming";

import { expect } from "chai";
import { render, screen } from "@testing-library/react";

describe("App", () => {
    beforeEach(() => {
        render(
            <ThemeProvider>
                <App />
            </ThemeProvider>
        );
    });

    it("Has name", () => {
        expect(document.body.contains(screen.getByText(/Worklog/)));
    });
});
