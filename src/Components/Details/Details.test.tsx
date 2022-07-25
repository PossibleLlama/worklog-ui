/**
 * @jest-environment jsdom
 */
import React from "react";
import { subYears, subMonths, subWeeks, subDays, subHours, subMinutes, subSeconds, format } from "date-fns";

import Comp, { formatDateTime, formatRelativeDate } from "./Details.component";

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

        it("Has buttons", () => {
            render(
                <Comp onClose={onCloseFn} work={wk}/>
            );

            expect(screen.getAllByRole("button", { name: /close/i }));
            expect(screen.getByRole("button", { name: /edit/i }));
            expect(onCloseCalled).toEqual(0);
        });

        it("Has fields", () => {
            render(
                <Comp onClose={onCloseFn} work={wk}/>
            );

            expect(screen.getByText(wk.Title));
            expect(screen.getByText(`${formatDateTime(wk.When)}`));
        });

        it("Does not have fields", () => {
            render(
                <Comp onClose={onCloseFn} work={wk}/>
            );

            expect(screen.queryByText(wk.ID, { exact: false })).toBeNull();
            expect(screen.queryByText(wk.Revision, { exact: false })).toBeNull();
            expect(screen.queryByText(formatRelativeDate(wk.CreatedAt))).toBeNull();
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

        it("Has fields", () => {
            render(
                <Comp onClose={onCloseFn} work={wk}/>
            );

            expect(screen.getByText(wk.Description));
            expect(screen.getByText(formatDateTime(wk.When, wk.Duration)));
            wk.Tags.forEach(e => {
                expect(screen.getByText(e, { exact: false }));
            });
        });

        it("Does not have fields", () => {
            render(
                <Comp onClose={onCloseFn} work={wk}/>
            );

            expect(screen.queryByText(wk.Author, { exact: false })).toBeNull();
        });
    });

    describe("Minimal fields - Relative date", () => {
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

            it("Relative time", () => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );

                expect(screen.getByText(formatDateTime(wk.When, wk.Duration)));
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

            it("Relative time", () => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );

                expect(screen.getByText(formatDateTime(wk.When, wk.Duration)));
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

            it("Relative time", () => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );

                expect(screen.getByText(formatDateTime(wk.When, wk.Duration)));
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

            it("Relative time", () => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );

                expect(screen.getByText(formatDateTime(wk.When, wk.Duration)));
            });
        });

        describe("Multiple hours ago", () => {
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

            it("Relative time", () => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );

                expect(screen.getByText(formatDateTime(wk.When, wk.Duration)));
            });
        });

        describe("Single hour ago", () => {
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

            it("Relative time", () => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );

                expect(screen.getByText(formatDateTime(wk.When, wk.Duration)));
            });
        });

        describe("Multiple minutes ago", () => {
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

            it("Relative time", () => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );

                expect(screen.getByText(formatDateTime(wk.When, wk.Duration)));
            });
        });

        describe("Single minute ago", () => {
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

            it("Relative time", () => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
    
                expect(screen.getByText(formatDateTime(wk.When, wk.Duration)));
            });
        });

        describe("Multiple seconds ago", () => {
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

            it("Relative time", () => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );

                expect(screen.getByText(`A few seconds ago for ${wk.Duration} minutes.`));
            });
        });

        describe("Single seconds ago", () => {
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

            it("Relative time", () => {
                render(
                    <Comp onClose={onCloseFn} work={wk}/>
                );
    
                expect(screen.getByText(`A few seconds ago for ${wk.Duration} minutes.`));
            });
        });
    });
});

describe("Format date time", () => {
    const now = new Date();

    it("Further ago than a week without duration", () => {
        const t = new Date(now);
        t.setDate(t.getDate() - 10);
        expect(formatDateTime(t)).toContain(format(t, "do MMMM yyyy"));
        expect(formatDateTime(t)).toContain(format(t, "HH:mm"));
        expect(formatDateTime(t)).toEqual(format(t, "do MMMM yyyy HH:mm."));
    });

    describe("Including duration", () => {
        it("Further ago than a week with a positive duration", () => {
            const t = new Date(now);
            const dur = 60;
            t.setDate(t.getDate() - 10);
            expect(formatDateTime(t, dur)).toContain(format(t, "do MMMM yyyy"));
            expect(formatDateTime(t, dur)).toContain(format(t, "HH:mm"));
            expect(formatDateTime(t, dur)).toContain(`for ${dur} minutes.`);
            expect(formatDateTime(t, dur)).toEqual(`${format(t, "do MMMM yyyy HH:mm")} for ${dur} minutes.`);
        });

        it("Further ago than a week with a zero duration", () => {
            const t = new Date(now);
            const dur = 0;
            t.setDate(t.getDate() - 10);
            expect(formatDateTime(t, dur)).toContain(format(t, "do MMMM yyyy"));
            expect(formatDateTime(t, dur)).toContain(format(t, "HH:mm"));
            expect(formatDateTime(t, dur)).toEqual(`${format(t, "do MMMM yyyy HH:mm")}.`);
        });

        it("Further ago than a week with a negative duration", () => {
            const t = new Date(now);
            const dur = -10;
            t.setDate(t.getDate() - 10);
            expect(formatDateTime(t, dur)).toContain(format(t, "do MMMM yyyy"));
            expect(formatDateTime(t, dur)).toContain(format(t, "HH:mm"));
            expect(formatDateTime(t, dur)).toEqual(`${format(t, "do MMMM yyyy HH:mm")}.`);
        });
    });
    
});

describe("Format relative date", () => {
    const now = new Date();

    it("Same minute", () => {
        const t = new Date(now);
        t.setSeconds(t.getSeconds() - 1);
        expect(formatRelativeDate(t)).toEqual("A few seconds ago");
    });

    it("Same hour", () => {
        const t = new Date(now);
        t.setMinutes(t.getMinutes() - 1);
        expect(formatRelativeDate(t)).toContain("This hour at");
        expect(formatRelativeDate(t)).toContain(format(t, "HH:mm"));
    });

    it("Same day", () => {
        const t = new Date(now);
        t.setHours(t.getHours() - 1);
        expect(formatRelativeDate(t)).toContain("Today at");
        expect(formatRelativeDate(t)).toContain(format(t, "HH:mm"));
    });

    it("Same week", () => {
        const t = new Date(now);
        t.setDate(t.getDate() - 1);
        expect(formatRelativeDate(t)).toContain(format(t, "EEEE"));
        expect(formatRelativeDate(t)).toContain(format(t, "'at' HH:mm"));
    });

    it("Further ago than a week", () => {
        const t = new Date(now);
        t.setDate(t.getDate() - 10);
        expect(formatRelativeDate(t)).toContain(format(t, "do MMMM yyyy"));
        expect(formatRelativeDate(t)).toContain(format(t, "HH:mm"));
    });

    it("With leading zeros", () => {
        const t = new Date("01 Jan 2000 00:00:00 GMT");
        expect(formatRelativeDate(t)).toContain(format(t, "do MMMM yyyy"));
        expect(formatRelativeDate(t)).toContain(format(t, "HH:mm"));
    });
});
