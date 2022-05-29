import React from "react";
import { subYears, subMonths, subWeeks, subDays, subHours, subMinutes, subSeconds } from "date-fns";

import Comp from "./Details.component";

import { expect } from "chai";
import { render, screen } from "@testing-library/react";

describe("App", () => {
    let onCloseCalled = 0;
    const onCloseFn = () => {
        onCloseCalled++;
    };

    const t = new Date();

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

        it.skip("Has fields", () => {
            expect(screen.getByText(wk.Title));
            expect(screen.getByText(`${formatAbsoluteDateToString(wk.When)}`));
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
        
        it.skip("Has fields", () => {
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

    describe.skip("Minimal fields - Relative date", () => {
        describe("Year ago", () => {
            const wk = {
                ID: "id",
                Revision: 1,
                Title: "title",
                Description: "description",
                Author: "author",
                Duration: 15,
                Tags: ["tag1", "tag2"],
                When: subYears(t, 1),
                CreatedAt: subYears(t, 1),
            };
        
            beforeEach(() => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
            });
            
            it("Relative time", () => {
                expect(screen.getByText(`${formatAbsoluteDateToString(wk.When)} for ${wk.Duration} minutes.`));
            });
        });

        describe("Month ago", () => {
            const wk = {
                ID: "id",
                Revision: 1,
                Title: "title",
                Description: "description",
                Author: "author",
                Duration: 15,
                Tags: ["tag1", "tag2"],
                When: subMonths(t, 1),
                CreatedAt: subMonths(t, 1),
            };
        
            beforeEach(() => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
            });
            
            it("Relative time", () => {
                expect(screen.getByText(`${formatAbsoluteDateToString(wk.When)} for ${wk.Duration} minutes.`));
            });
        });

        describe("Week ago", () => {
            const wk = {
                ID: "id",
                Revision: 1,
                Title: "title",
                Description: "description",
                Author: "author",
                Duration: 15,
                Tags: ["tag1", "tag2"],
                When: subWeeks(t, 1),
                CreatedAt: subWeeks(t, 1),
            };
        
            beforeEach(() => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
            });
            
            it("Relative time", () => {
                expect(screen.getByText(`${formatAbsoluteDateToString(wk.When)} for ${wk.Duration} minutes.`));
            });
        });

        describe("Day ago", () => {
            const wk = {
                ID: "id",
                Revision: 1,
                Title: "title",
                Description: "description",
                Author: "author",
                Duration: 15,
                Tags: ["tag1", "tag2"],
                When: subDays(t, 1),
                CreatedAt: subDays(t, 1),
            };
        
            beforeEach(() => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
            });
            
            it("Relative time", () => {
                expect(screen.getByText(`Yesterday at ${formatTimeToString(wk.When)} for ${wk.Duration} minutes.`));
            });
        });

        describe.skip("Multiple hours ago", () => {
            const wk = {
                ID: "id",
                Revision: 1,
                Title: "title",
                Description: "description",
                Author: "author",
                Duration: 15,
                Tags: ["tag1", "tag2"],
                When: subHours(t, 3),
                CreatedAt: subHours(t, 3),
            };
        
            beforeEach(() => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
            });
            
            it("Relative time", () => {
                expect(screen.getByText(`Several hours ago for ${wk.Duration} minutes.`));
            });
        });

        describe.skip("Single hour ago", () => {
            const wk = {
                ID: "id",
                Revision: 1,
                Title: "title",
                Description: "description",
                Author: "author",
                Duration: 15,
                Tags: ["tag1", "tag2"],
                When: subHours(t, 1),
                CreatedAt: subHours(t, 1),
            };
        
            beforeEach(() => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
            });
            
            it("Relative time", () => {
                expect(screen.getByText(`An hour ago for ${wk.Duration} minutes.`));
            });
        });

        describe.skip("Multiple minutes ago", () => {
            const wk = {
                ID: "id",
                Revision: 1,
                Title: "title",
                Description: "description",
                Author: "author",
                Duration: 15,
                Tags: ["tag1", "tag2"],
                When: subMinutes(t, 3),
                CreatedAt: subMinutes(t, 3),
            };
        
            beforeEach(() => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
            });
            
            it("Relative time", () => {
                expect(screen.getByText(`Several minutes ago for ${wk.Duration} minutes.`));
            });
        });

        describe.skip("Single minute ago", () => {
            const wk = {
                ID: "id",
                Revision: 1,
                Title: "title",
                Description: "description",
                Author: "author",
                Duration: 15,
                Tags: ["tag1", "tag2"],
                When: subMinutes(t, 1),
                CreatedAt: subMinutes(t, 1),
            };
        
            beforeEach(() => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
            });
            
            it("Relative time", () => {
                expect(screen.getByText(`A minute ago for ${wk.Duration} minutes.`));
            });
        });

        describe.skip("Multiple seconds ago", () => {
            const wk = {
                ID: "id",
                Revision: 1,
                Title: "title",
                Description: "description",
                Author: "author",
                Duration: 15,
                Tags: ["tag1", "tag2"],
                When: subSeconds(t, 3),
                CreatedAt: subSeconds(t, 3),
            };
        
            beforeEach(() => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
            });
            
            it("Relative time", () => {
                expect(screen.getByText(`Several seconds ago for ${wk.Duration} minutes.`));
            });
        });

        describe.skip("Single seconds ago", () => {
            const wk = {
                ID: "id",
                Revision: 1,
                Title: "title",
                Description: "description",
                Author: "author",
                Duration: 15,
                Tags: ["tag1", "tag2"],
                When: subSeconds(t, 1),
                CreatedAt: subSeconds(t, 1),
            };
        
            beforeEach(() => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
            });
            
            it("Relative time", () => {
                expect(screen.getByText(`A second ago for ${wk.Duration} minutes.`));
            });
        });
    });
});

const formatAbsoluteDateToString = (d: Date): string => {
    return `${d.getDate()} ${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};

const formatTimeToString = (d: Date): string => {
    return `${d.getHours()}:${d.getMinutes()}`;
};
