/**
 * @jest-environment jsdom
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Comp from "./CreateModal.view";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const mockClose = jest.fn();

// Note: tests don't make use of tailwind, so the hover directives won't work
// This kind of verification should be done at the integration/e2e test level 
describe("Create Modal", () => {
    beforeEach(() => {
        mockClose.mockReset();
    });

    describe("Renders modal features", () => {
        it("Has heading", () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("Log new work")).toBeInTheDocument();
        });

        it("Has title", () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("Title")).toBeInTheDocument();
        });

        it("Has description", () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("Description")).toBeInTheDocument();
        });

        it("Has tags", () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("Tags")).toBeInTheDocument();
        });

        it("Has author", () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("Author")).toBeInTheDocument();
        });

        it("Has duration", () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("Duration")).toBeInTheDocument();
        });

        it("Has when", () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByText("When")).toBeInTheDocument();
        });

        it("Has cancel button", () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByRole("button", { name: /Cancel/ })).toBeInTheDocument();
        });

        it("Has confirm button", () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );
    
            expect(screen.getByRole("button", { name: /Confirm/ })).toBeInTheDocument();
        });
    });

    describe("Calls close", () => {
        const fakeNow = new Date("2019-10-23T19:38:00Z");

        beforeAll(() => {
            jest.useFakeTimers({doNotFake: ["setTimeout"]}).setSystemTime(fakeNow);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

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
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(undefined);
        });

        it("On confirm - with default fields", async () => {
            const newTitle = "abcd";
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.type(screen.getByLabelText("Title"), newTitle);
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ ID: "" }));
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Revision: -1 }));
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Title: newTitle }));
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Description: undefined }));
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Author: undefined }));
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Duration: undefined }));
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Tags: [] }));
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ When: fakeNow }));
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ CreatedAt: new Date(0) }));
        });
    });

    describe("Fills in fields", () => {
        const fakeNow = new Date("2019-10-23T19:38:00Z");

        beforeAll(() => {
            jest.useFakeTimers({doNotFake: ["setTimeout"]}).setSystemTime(fakeNow);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

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
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Title: newTitle }));
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
            await userEvent.type(screen.getByLabelText("Title"), newTitle + "{enter}");
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Title: newTitle }));
        });

        it("Fills in title - Closes without submitting", async () => {
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
            await userEvent.click(screen.getByRole("button", { name: /Cancel/ }));
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(undefined);
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
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Description: newDesc }));
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
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Author: newAuth }));
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
            await userEvent.type(screen.getByLabelText("Duration"), `${newDur}`);
            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Duration: newDur }));
        });

        it("Fills in duration - Can remove", async () => {
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
            await userEvent.type(screen.getByLabelText("Duration"), `${newDur}`);
            await userEvent.type(screen.getByLabelText("Duration"), "{backspace}{backspace}");
            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ Duration: undefined }));
        });

        // Figure out how to type in the when field correctly
        it.skip("Fills in when via text", async () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(screen.getByText("Title")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("Title"), "required");
            expect(screen.getByText("When")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("When"), "04122022{arrowright}1935");
            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ When: new Date("2022-12-04 19:35") }));
        });

        it("Fills in when with now when clicked", async () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(screen.getByText("Title")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("Title"), "required");
            expect(screen.getByText("When")).toBeInTheDocument();
            await userEvent.click(screen.getByLabelText("When"));
            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ When: fakeNow }));
        });

        it("Can clear when", async () => {
            render(
                <BrowserRouter>
                    <Comp onClose={mockClose} />
                    <ToastContainer />
                </BrowserRouter>
            );

            expect(screen.getByText("Title")).toBeInTheDocument();
            await userEvent.type(screen.getByLabelText("Title"), "required");
            expect(screen.getByText("When")).toBeInTheDocument();
            await userEvent.clear(screen.getByLabelText("When"));
            expect(mockClose).not.toHaveBeenCalled();
            await userEvent.click(screen.getByRole("button", { name: /Confirm/ }));
            expect(mockClose).toHaveBeenCalled();
            expect(mockClose).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalledWith(expect.objectContaining({ When: fakeNow }));
        });
    });
});
