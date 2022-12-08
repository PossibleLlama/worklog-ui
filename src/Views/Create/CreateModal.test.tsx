/**
 * @jest-environment jsdom
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Comp from "./CreateModal.view";

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

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
        it("On cancel", () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(mockClose).not.toHaveBeenCalled();
            fireEvent.click(screen.getByRole("button", { name: /Cancel/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(undefined);
        });

        it("On confirm", () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(mockClose).not.toHaveBeenCalled();
            fireEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith({
                ID: "",
                Revision: -1,
                Title: "",
                Description: "",
                Author: "",
                Duration: 15,
                Tags: [],
                When: new Date(0),
                CreatedAt: new Date(0),
            });
        });
    });

    describe("Fills in fields", () => {
        it("Fills in title", () => {
            const newTitle = "abcd";
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("Title")).toBeInTheDocument();
            fireEvent.change(screen.getByLabelText("Title"), { target: { value: newTitle }});
            expect(mockClose).not.toHaveBeenCalled();
            fireEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({Title: newTitle}));
        });

        it("Fills in description", () => {
            const newDesc = "abcd";
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("Description")).toBeInTheDocument();
            fireEvent.change(screen.getByLabelText("Description"), { target: { value: newDesc }});
            expect(mockClose).not.toHaveBeenCalled();
            fireEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({Description: newDesc}));
        });

        it("Fills in author", () => {
            const newAuth = "abcd";
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("Author")).toBeInTheDocument();
            fireEvent.change(screen.getByLabelText("Author"), { target: { value: newAuth }});
            expect(mockClose).not.toHaveBeenCalled();
            fireEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({Author: newAuth}));
        });

        it("Fills in duration", () => {
            const newDur = 20;
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("Duration")).toBeInTheDocument();
            fireEvent.change(screen.getByLabelText("Duration"), { target: { value: `${newDur}` }});
            expect(mockClose).not.toHaveBeenCalled();
            fireEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({Duration: newDur}));
        });

        it("Fills in when via text", () => {
            const newWhen = "2022-12-01 19:35:02";
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("When")).toBeInTheDocument();
            fireEvent.change(screen.getByLabelText("When"), { target: { value: newWhen }});
            expect(mockClose).not.toHaveBeenCalled();
            fireEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({When: new Date(newWhen)}));
        });
    });
});
