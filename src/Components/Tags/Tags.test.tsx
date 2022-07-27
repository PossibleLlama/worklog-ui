/**
 * @jest-environment jsdom
 */
import React from "react";

import Comp from "./Tags.component";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Tags", () => {
    const mockClick = jest.fn();

    beforeEach(() => {
        mockClick.mockReset();
    });

    it("Renders without close button", () => {
        render(
            <Comp>
                foo
            </Comp>
        );

        expect(screen.getByText("foo")).toBeInTheDocument();
        expect(screen.queryByLabelText("Remove", { selector: "button" })).toBeNull();
    });

    it("Renders with close button", () => {
        render(
            <Comp onClose={mockClick}>
                foo
            </Comp>
        );

        expect(screen.getByText("foo")).toBeInTheDocument();
        expect(screen.getByLabelText("Remove", { selector: "button" })).toBeInTheDocument();
    });
});
