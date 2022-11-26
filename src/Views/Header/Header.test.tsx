/**
 * @jest-environment jsdom
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Comp from "./Header.view";

import { Filter } from "@model/filter";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const updateFilterCallback = jest.fn();
const mockCreate = jest.fn();
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
                <Comp updateFilters={updateFilterCallback} currentFilters={startFilter} createWork={mockCreate} />
                <ToastContainer />
            </BrowserRouter>
        );

        expect(screen.getByText("Worklog")).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Worklog/ })).toBeInTheDocument();
    });

    it("Renders filter", () => {
        render(
            <BrowserRouter>
                <Comp updateFilters={updateFilterCallback} currentFilters={startFilter} createWork={mockCreate} />
                <ToastContainer />
            </BrowserRouter>
        );

        expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument();
        // Check the modal itself isn't visible
        expect(screen.queryByText("Set filters")).toBeNull();
    });

    it("Renders nav", () => {
        render(
            <BrowserRouter>
                <Comp updateFilters={updateFilterCallback} currentFilters={startFilter} createWork={mockCreate} />
                <ToastContainer />
            </BrowserRouter>
        );

        expect(screen.getByRole("button", { name: "Timeline" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Discover" })).toBeInTheDocument();
    });
});
