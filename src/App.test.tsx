/**
 * @jest-environment jsdom
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockGetWorklogs = jest.fn();
const mockCreateWorklogs = jest.fn();
const mockEditWorklogs = jest.fn();

describe("App", () => {
    it("Has header", async () => {
        mockGetWorklogs.mockResolvedValue([]);
        render(
            <BrowserRouter>
                <App getWorklogs={mockGetWorklogs} createWork={mockCreateWorklogs} editWork={mockEditWorklogs} />
            </BrowserRouter>
        );

        await waitFor(() => expect(mockGetWorklogs).toHaveBeenCalledTimes(1));

        expect(screen.getByText(/Worklog/)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Timeline" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Discover" })).toBeInTheDocument();
    });
});
