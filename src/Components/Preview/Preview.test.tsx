/**
 * @jest-environment jsdom
 */
import React from "react";

import Comp from "./Preview.component";

import { formatRelativeDateTime } from "@helper/date";

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("App", () => {
    const onLoadDetailedFn = jest.fn();

    beforeEach(() => {
        onLoadDetailedFn.mockReset();
    });

    const wk = {
        ID: "id",
        Revision: 642,
        Title: "title",
        // Changing these values, changes the regex that queryBy is doing
        // which in turn alters the time the tests take.
        When: new Date(2000, 4, 4, 18, 20, 35, 177),
        CreatedAt: new Date(2001, 3, 4, 11, 42, 38, 274),
    };

    it("Has button", () => {
        render(
            <Comp onLoadDetailed={onLoadDetailedFn} work={wk} />
        );

        expect(screen.getByLabelText("Open", { selector: "button" })).toBeInTheDocument();
        expect(onLoadDetailedFn).not.toHaveBeenCalled();
    });

    it("Has fields", () => {
        render(
            <Comp onLoadDetailed={onLoadDetailedFn} work={wk} />
        );

        expect(screen.getByText(wk.Title)).toBeInTheDocument();
        expect(screen.getByText(`${formatRelativeDateTime(wk.When)}`)).toBeInTheDocument();
    });

    it("Does not have fields", () => {
        render(
            <Comp onLoadDetailed={onLoadDetailedFn} work={wk} />
        );

        expect(screen.queryByText(wk.ID, { exact: false })).toBeNull();
        expect(screen.queryByText(wk.Revision, { exact: false })).toBeNull();
        expect(screen.queryByText(formatRelativeDateTime(wk.CreatedAt))).toBeNull();
    });

    it("Button calls function", () => {
        render(
            <Comp onLoadDetailed={onLoadDetailedFn} work={wk} />
        );

        expect(screen.getByLabelText("Open", { selector: "button" })).toBeInTheDocument();
        expect(onLoadDetailedFn).not.toHaveBeenCalled();
        fireEvent.click(screen.getByLabelText("Open", { selector: "button" }));
        expect(onLoadDetailedFn).toHaveBeenCalled();
        expect(onLoadDetailedFn).toHaveBeenCalledTimes(1);
        expect(onLoadDetailedFn).toHaveBeenCalledWith(wk);
    });
});
