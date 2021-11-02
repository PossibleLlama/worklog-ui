import React from "react";

import Comp from "./Details.component";

import { expect } from "chai";
import { render, screen } from "@testing-library/react";

describe("App", () => {
    let onCloseCalled = 0;
    const onCloseFn = () => {
        onCloseCalled++;
    };

    // const t = new Date();

    beforeEach(() => {
        onCloseCalled = 0;
    });

    describe("Minimal fields - Absolute date", () => {
        const wk = {
            ID: "id",
            Revision: 642,
            Title: "title",
            // Changing these values, changes the regex that queryBy is doing
            // which in turn alters the time the tests take.
            When: new Date(2000, 4, 4, 18, 20, 35, 177),
            CreatedAt: new Date(2001, 3, 4, 11, 42, 38, 274),
        };
    
        beforeEach(() => {
            render(
                <Comp onClose={onCloseFn} work={wk}/>
            );
        });

        it("Has buttons", () => {
            expect(screen.getAllByRole("button", { name: /close/i }));
            expect(screen.getByRole("button", { name: /edit/i }));
            expect(onCloseCalled).to.be.equal(0);
        });

        it("Has fields", () => {
            expect(screen.getByText(wk.Title));
            expect(screen.getByText(formatAbsoluteDateToString(wk.When)));
        });

        it("Does not have fields", () => {
            expect(screen.queryByText(wk.ID, { exact: false })).to.be.null;
            expect(screen.queryByText(wk.Revision, { exact: false })).to.be.null;
            expect(screen.queryByText(formatAbsoluteDateToString(wk.CreatedAt))).to.be.null;
        });
    });
    
    describe("All fields - Absolute date", () => {
        const wk = {
            ID: "id",
            Revision: 1,
            Title: "title",
            Description: "description",
            Author: "author",
            Duration: 15,
            Tags: ["tag1", "tag2"],
            When: new Date(2000, 4, 4, 18, 20, 35, 177),
            CreatedAt: new Date(2001, 3, 4, 11, 42, 38, 274),
        };
    
        beforeEach(() => {
            render(
                <Comp onClose={onCloseFn} work={wk}/>
            );
        });
        
        it("Has fields", () => {
            expect(screen.getByText(wk.Description));
            expect(screen.getByText(`${formatAbsoluteDateToString(wk.When)} for ${wk.Duration} minutes.`));
            wk.Tags.forEach(e => {
                expect(screen.getByText(e, { exact: false }));
            });
        });

        it("Does not have fields", () => {
            expect(screen.queryByText(wk.Author, { exact: false })).to.be.null;
        });
    });
});

const formatAbsoluteDateToString = (d: Date): string => {
    return `${d.getDay()} ${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};
