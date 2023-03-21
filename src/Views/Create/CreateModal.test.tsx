/**
 * @jest-environment jsdom
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Comp from "./CreateModal.view";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const mockClose = jest.fn();

// Note: tests don't make use of tailwind, so the hover directives won't work
// This kind of verification should be done at the integration/e2e test level 
describe("Create Modal", () => {
    beforeEach(() => {
        mockClose.mockReset();
    });

    it("Renders modal features", () => {
        render(
            <BrowserRouter>
                <Comp onClose={mockClose} />
                <ToastContainer />
            </BrowserRouter>
        );

        expect(screen.getByText("Log new work")).toBeInTheDocument();
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Author")).toBeInTheDocument();
        expect(screen.getByText("Duration")).toBeInTheDocument();
        expect(screen.getByText("When")).toBeInTheDocument();
        expect(screen.getByText("Tags")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Cancel/ })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Confirm/ })).toBeInTheDocument();
    });

    describe("Calls close", () => {
        it("On cancel", async () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Cancel/ }));
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(undefined);
        });

        it("On confirm - without filling in fields", async () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Cancel/ }));
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(undefined);
        });
    });

    describe("Fills in fields", () => {
        it("Fills in title", async () => {
            const newTitle = "abcd";
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(screen.getByText("Title")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("Title"), newTitle);
            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({Title: newTitle}));
        });

        it("Fills in title - Submit via enter", async () => {
            const newTitle = "abcd";
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(screen.getByText("Title")).toBeInTheDocument();
            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.type(screen.getByLabelText("Title"), newTitle+"{enter}");
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({Title: newTitle}));
        });

        it("Fills in description", async () => {
            const newDesc = "abcd";
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(screen.getByText("Title")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("Title"), "required");
            expect(screen.getByText("Description")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("Description"), newDesc);
            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({Description: newDesc}));
        });

        it("Fills in author", async () => {
            const newAuth = "abcd";
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(screen.getByText("Title")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("Title"), "required");
            expect(screen.getByText("Author")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("Author"), newAuth);
            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({Author: newAuth}));
        });

        it("Fills in duration", async () => {
            const newDur = 20;
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(screen.getByText("Title")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("Title"), "required");
            expect(screen.getByText("Duration")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("Duration"), `{backspace}${newDur}`, { initialSelectionStart: 0, initialSelectionEnd: 100});
            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({Duration: newDur}));
        });

        // TODO fix filling in the date field
        it.skip("Fills in when via text", async () => {
            const newWhen = "2022-12-01 19:35:02";
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(screen.getByText("Title")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("Title"), "required");
            expect(screen.getByText("When")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("When"), `{backspace}${newWhen}`, { initialSelectionStart: 0, initialSelectionEnd: 100});
            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({When: new Date(newWhen)}));
        });
    });
});
