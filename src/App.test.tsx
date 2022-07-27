/**
 * @jest-environment jsdom
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { ThemeProvider } from "@zendeskgarden/react-theming";
import { ToastProvider } from "@zendeskgarden/react-notifications";

import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockGetWorklogs = jest.fn();

describe("App", () => {
    it("Has header", async () => {
        mockGetWorklogs.mockResolvedValue([]);
        render(
            <ThemeProvider>
                <ToastProvider>
                    <BrowserRouter>
                        <App getWorklogs={mockGetWorklogs} />
                    </BrowserRouter>
                </ToastProvider>
            </ThemeProvider>
        );

        await waitFor(() => expect(mockGetWorklogs).toHaveBeenCalledTimes(1));

        expect(screen.getByText(/Worklog/)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Timeline" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Discover" })).toBeInTheDocument();
    });
});
