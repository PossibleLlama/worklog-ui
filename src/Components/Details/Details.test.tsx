/**
 * @jest-environment jsdom
 */
import React from "react";
import { subYears, subMonths, subWeeks, subDays, subHours, subMinutes, subSeconds } from "date-fns";

import Comp from "./Details.component";

import { render, screen } from "@testing-library/react";
import { formatRelativeDateTimeDuration, formatRelativeDateTime } from "@helper/date";

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
                <Comp onClose={onCloseFn} work={wk} />
            );

            expect(screen.getAllByRole("button", { name: /close/i }));
            expect(screen.getByRole("button", { name: /edit/i }));
            expect(onCloseCalled).toEqual(0);
        });

        it("Has fields", () => {
            render(
                <Comp onClose={onCloseFn} work={wk} />
            );

            expect(screen.getByText(wk.Title));
            expect(screen.getByText(`${formatRelativeDateTimeDuration(wk.When)}`));
        });

        it("Does not have fields", () => {
            render(
                <Comp onClose={onCloseFn} work={wk} />
            );

            expect(screen.queryByText(wk.ID, { exact: false })).toBeNull();
            expect(screen.queryByText(wk.Revision, { exact: false })).toBeNull();
            expect(screen.queryByText(formatRelativeDateTime(wk.CreatedAt))).toBeNull();
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
                <Comp onClose={onCloseFn} work={wk} />
            );

            expect(screen.getByText(wk.Description));
            expect(screen.getByText(formatRelativeDateTimeDuration(wk.When, wk.Duration)));
            wk.Tags.forEach(e => {
                expect(screen.getByText(e, { exact: false }));
            });
        });

        it("Does not have fields", () => {
            render(
                <Comp onClose={onCloseFn} work={wk} />
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
                    <Comp onClose={onCloseFn} work={wk} />
                );

                expect(screen.getByText(formatRelativeDateTimeDuration(wk.When, wk.Duration)));
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
                    <Comp onClose={onCloseFn} work={wk} />
                );

                expect(screen.getByText(formatRelativeDateTimeDuration(wk.When, wk.Duration)));
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
                    <Comp onClose={onCloseFn} work={wk} />
                );

                expect(screen.getByText(formatRelativeDateTimeDuration(wk.When, wk.Duration)));
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
                    <Comp onClose={onCloseFn} work={wk} />
                );

                expect(screen.getByText(formatRelativeDateTimeDuration(wk.When, wk.Duration)));
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
                    <Comp onClose={onCloseFn} work={wk} />
                );

                expect(screen.getByText(formatRelativeDateTimeDuration(wk.When, wk.Duration)));
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
                    <Comp onClose={onCloseFn} work={wk} />
                );

                expect(screen.getByText(formatRelativeDateTimeDuration(wk.When, wk.Duration)));
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
                    <Comp onClose={onCloseFn} work={wk} />
                );

                expect(screen.getByText(formatRelativeDateTimeDuration(wk.When, wk.Duration)));
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
                    <Comp onClose={onCloseFn} work={wk} />
                );

                expect(screen.getByText(formatRelativeDateTimeDuration(wk.When, wk.Duration)));
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
                    <Comp onClose={onCloseFn} work={wk} />
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
                    <Comp onClose={onCloseFn} work={wk} />
                );

                expect(screen.getByText(`A few seconds ago for ${wk.Duration} minutes.`));
            });
        });
    });
});
