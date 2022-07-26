/**
 * @jest-environment jsdom
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ToastProvider } from "@zendeskgarden/react-notifications";

import Comp from "./Header.view";

import { Filter } from "@model/filter";

import { fireEvent, render, screen } from "@testing-library/react";

const updateFilterCallback = jest.fn();
const startFilter: Filter = {
    startDate: new Date("2000/01/20"),
};

describe("Header", () => {
    beforeEach(() => {
        updateFilterCallback.mockReset();
    });

    it("Renders title", () => {
        render(
            <BrowserRouter>
                <ToastProvider>
                    <Comp updateFilters={updateFilterCallback} currentFilters={startFilter}/>
                </ToastProvider>
            </BrowserRouter>
        );

        expect(screen.getByText("Worklog"));
        fireEvent.mouseOver(screen.getByText("Worklog"));
        expect(screen.getByText("Home"));
    });

    it("Renders filter", () => {
        render(
            <BrowserRouter>
                <ToastProvider>
                    <Comp updateFilters={updateFilterCallback} currentFilters={startFilter}/>
                </ToastProvider>
            </BrowserRouter>
        );

        expect(screen.getByText("Filter"));
    });

    it("Renders nav", () => {
        render(
            <BrowserRouter>
                <ToastProvider>
                    <Comp updateFilters={updateFilterCallback} currentFilters={startFilter}/>
                </ToastProvider>
            </BrowserRouter>
        );

        expect(screen.getByText("Timeline"));
        expect(screen.getByText("Discover"));
    });
});
