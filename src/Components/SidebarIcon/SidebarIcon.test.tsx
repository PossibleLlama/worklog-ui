/**
 * @jest-environment jsdom
 */
import React from "react";

import Comp from "./SidebarIcon.component";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const children = "foo";
const tooltip = "bar";

// Note: tests don't make use of tailwind, so the hover directives won't work
// This kind of verification should be done at the integration/e2e test level 
describe("SidebarIcon", () => {
    it("Renders children", () => {
        render(
            <Comp>
                {children}
            </Comp>
        );

        expect(screen.getByText(children)).toBeInTheDocument();
    });

    it("Renders tooltip", () => {
        render(
            <Comp tooltipText={tooltip}>
                {children}
            </Comp>
        );

        expect(screen.getByText(children)).toBeInTheDocument();
        expect(screen.getByText(tooltip)).toBeInTheDocument();
    });
});
