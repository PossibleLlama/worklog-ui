/**
 * @jest-environment jsdom
 */
import React from "react";

import Comp from "./Container.component";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Button", () => {
    it("Renders", () => {
        render(
            <Comp>
                bar
             </Comp>
        );

        expect(screen.getByText("bar")).toBeInTheDocument();
    });
});
