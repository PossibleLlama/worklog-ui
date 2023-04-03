/**
 * @jest-environment jsdom
 */
import React from "react";

import Comp from "./Tags.component";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Tags", () => {
    it("Renders", () => {
        render(
            <Comp>
                foo
            </Comp>
        );

        expect(screen.getByText("foo")).toBeInTheDocument();
    });
});
