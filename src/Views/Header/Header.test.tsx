/**
 * @jest-environment jsdom
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ToastProvider } from "@zendeskgarden/react-notifications";

import Comp from "./Header.view";

import { Filter } from "@model/filter";

import { render, screen } from "@testing-library/react";

const updateFilterCallback = jest.fn();
const startFilter: Filter = {
    startDate: new Date("2000/01/20"),
};

// Note: tests don't make use of tailwind, so the hover directives won't work
// This kind of verification should be done at the integration/e2e test level 
describe("Header", () => {
    beforeEach(() => {
        updateFilterCallback.mockReset();
    });

    it("Renders title", () => {
        render(
            <BrowserRouter>
                <ToastProvider>
                    <Comp updateFilters={updateFilterCallback} currentFilters={startFilter} />
                </ToastProvider>
            </BrowserRouter>
        );

        expect(screen.getByText("Worklog"));
        expect(screen.getByText("Home"));
        expect(screen.getByRole("button", { name: /Worklog/ }));
    });

    it("Renders filter", () => {
        render(
            <BrowserRouter>
                <ToastProvider>
                    <Comp updateFilters={updateFilterCallback} currentFilters={startFilter} />
                </ToastProvider>
            </BrowserRouter>
        );

        expect(screen.getByRole("button", { name: "Filter" }));
        // Check the modal itself isn't visible
        expect(screen.queryByText("Set filters")).toBeNull();
    });

    it("Renders nav", () => {
        render(
            <BrowserRouter>
                <ToastProvider>
                    <Comp updateFilters={updateFilterCallback} currentFilters={startFilter} />
                </ToastProvider>
            </BrowserRouter>
        );

        expect(screen.getByRole("button", { name: "Timeline" }));
        expect(screen.getByRole("button", { name: "Discover" }));
    });
});
