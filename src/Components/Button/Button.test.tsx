/**
 * @jest-environment jsdom
 */
import React from "react";

import Comp from "./Button.component";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Button", () => {
    const label = "foo";
    const mockClick = jest.fn();

    beforeEach(() => {
        mockClick.mockReset();
    });

    it("Renders", () => {
        render(
            <Comp onClick={mockClick} label={label}>
                bar
            </Comp>
        );

        expect(screen.getByText("bar")).toBeInTheDocument();
        expect(screen.getByLabelText("foo")).toBeInTheDocument();
    });
});
