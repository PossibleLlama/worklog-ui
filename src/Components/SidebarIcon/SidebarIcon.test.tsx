/**
 * @jest-environment jsdom
 */
import React from "react";

import Comp from "./SidebarIcon.component";

import { fireEvent, render, screen } from "@testing-library/react";

const children = "foo";
const tooltip = "bar";

describe("SidebarIcon", () => {
    it("Renders children", () => {
        render(
            <Comp>
                {children}
            </Comp>
        );

        expect(screen.getByText(children));
        expect(screen.queryByText(tooltip, { exact: false })).toBeNull();
        
        fireEvent.mouseOver(screen.getByText(children));
        expect(screen.queryByText(tooltip, { exact: false })).toBeNull();
    });

    it("Renders tooltip on hover", () => {
        render(
            <Comp tooltipText={tooltip}>
                {children}
            </Comp>
        );

        expect(screen.getByText(children));
        fireEvent.mouseOver(screen.getByText(children));
        expect(screen.getByText(tooltip, { exact: false }));
    });
});
