import { Filter, filter, isEqual } from "./filter";

import { Work } from "@model/work";

import { addDays } from "date-fns";

describe("Is equal", () => {
    const startDate = new Date(2021, 1, 1, 8, 35);
    describe("Start Date only", () => {
        const f1 = { startDate };

        it("Same filter", () => {
            expect(isEqual(f1, f1)).toEqual(true);
        });

        describe("With other fields", () => {
            it("Has end date", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2021, 2, 2, 13, 47),
                };
                expect(isEqual(f1, f2)).toEqual(false);
            });

            it("Has title", () => {
                const f2 = {
                    startDate,
                    title: "foo",
                };
                expect(isEqual(f1, f2)).toEqual(false);
            });

            it("Has description", () => {
                const f2 = {
                    startDate,
                    description: "foo",
                };
                expect(isEqual(f1, f2)).toEqual(false);
            });

            it("Has tags", () => {
                const f2 = {
                    startDate,
                    tags: ["foo"],
                };
                expect(isEqual(f1, f2)).toEqual(false);
            });
        });

        describe("Different start date", () => {
            it("Year", () => {
                const f2 = {
                    startDate: new Date(2020, 1, 1, 8, 35),
                };
                expect(isEqual(f1, f2)).toEqual(false);
            });

            it("Month", () => {
                const f2 = {
                    startDate: new Date(2021, 2, 1, 8, 35),
                };
                expect(isEqual(f1, f2)).toEqual(false);
            });

            it("Day", () => {
                const f2 = {
                    startDate: new Date(2021, 1, 2, 8, 35),
                };
                expect(isEqual(f1, f2)).toEqual(false);
            });

            it("Hour", () => {
                const f2 = {
                    startDate: new Date(2021, 1, 1, 5, 35),
                };
                expect(isEqual(f1, f2)).toEqual(true);
            });

            it("Minute", () => {
                const f2 = {
                    startDate: new Date(2021, 1, 1, 8, 22),
                };
                expect(isEqual(f1, f2)).toEqual(true);
            });
        });
    });

    describe("Start and End Date", () => {
        const f1 = {
            startDate,
            endDate: new Date(2021, 2, 2, 13, 47),
        };

        it("Same filter", () => {
            expect(isEqual(f1, f1)).toEqual(true);
        });

        describe("Different end date", () => {
            it("Year", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2022, 2, 2, 13, 47),
                };
                expect(isEqual(f1, f2)).toEqual(false);
            });

            it("Month", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2021, 3, 2, 13, 47),
                };
                expect(isEqual(f1, f2)).toEqual(false);
            });

            it("Day", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2021, 2, 21, 13, 47),
                };
                expect(isEqual(f1, f2)).toEqual(false);
            });

            it("Hour", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2021, 2, 2, 23, 47),
                };
                expect(isEqual(f1, f2)).toEqual(true);
            });

            it("Day", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2021, 2, 2, 13, 18),
                };
                expect(isEqual(f1, f2)).toEqual(true);
            });
        });
    });

    describe("Start and Title", () => {
        const f1 = {
            startDate,
            title: "foo",
        };

        it("Same filter", () => {
            expect(isEqual(f1, f1)).toEqual(true);
        });

        it("Different title", () => {
            const f2 = {
                startDate,
                title: "bar",
            };
            expect(isEqual(f1, f2)).toEqual(false);
        });

        it("With other field", () => {
            const f2 = {
                startDate,
                title: "foo",
                description: "bar",
            };
            expect(isEqual(f1, f2)).toEqual(false);
        });
    });

    describe("Start and Description", () => {
        const f1 = {
            startDate,
            description: "foo",
        };

        it("Same filter", () => {
            expect(isEqual(f1, f1)).toEqual(true);
        });

        it("Different description", () => {
            const f2 = {
                startDate,
                description: "bar",
            };
            expect(isEqual(f1, f2)).toEqual(false);
        });

        it("With other field", () => {
            const f2 = {
                startDate,
                title: "bar",
                description: "foo",
            };
            expect(isEqual(f1, f2)).toEqual(false);
        });
    });

    describe("Start and Tags", () => {
        const f1 = {
            startDate,
            tags: ["foo", "bar"],
        };

        it("Same filter", () => {
            expect(isEqual(f1, f1)).toEqual(true);
        });

        it("Different tag", () => {
            const f2 = {
                startDate,
                tags: ["foo", "buzz"],
            };
            expect(isEqual(f1, f2)).toEqual(false);
        });

        it("Different order of tags", () => {
            const f2 = {
                startDate,
                tags: ["bar", "foo"],
            };
            expect(isEqual(f1, f2)).toEqual(true);
        });

        it("Different number of tags", () => {
            const f2 = {
                startDate,
                tags: ["foo"],
            };
            expect(isEqual(f1, f2)).toEqual(false);
        });

        it("With other field", () => {
            const f2 = {
                startDate,
                title: "bar",
                tags: ["foo", "bar"],
            };
            expect(isEqual(f1, f2)).toEqual(false);
        });
    });
});

describe("Filter work", () => {
    const t = new Date(2000, 4, 18, 15, 42, 0);
    const work: Work[] = [
        {
            ID: (Math.random() + 1).toString(36).substring(7),
            Revision: Math.random() + 1,
            Title: "foo",
            When: addDays(t, 1),
            CreatedAt: addDays(t, 1),
        },
        {
            ID: (Math.random() + 1).toString(36).substring(7),
            Revision: Math.random() + 1,
            Title: "bar",
            Description: "I am a description.",
            Author: "Alice",
            Tags: ["a", "b"],
            When: addDays(t, 3),
            CreatedAt: addDays(t, 3),
        },
        {
            ID: (Math.random() + 1).toString(36).substring(7),
            Revision: Math.random() + 1,
            Title: "buzz",
            Description: "I am another description.",
            Author: "Bob",
            Tags: ["a", "c"],
            When: addDays(t, 3),
            CreatedAt: addDays(t, 3),
        },
        {
            ID: (Math.random() + 1).toString(36).substring(7),
            Revision: Math.random() + 1,
            Title: "bang",
            Description: "I am a different description.",
            Author: "Alice",
            Tags: ["d"],
            When: addDays(t, 3),
            CreatedAt: addDays(t, 3),
        },
        {
            ID: (Math.random() + 1).toString(36).substring(7),
            Revision: Math.random() + 1,
            Title: "sploosh",
            Description: "I am a yet another description.",
            Author: "Alice",
            Tags: ["ac"],
            When: addDays(t, 5),
            CreatedAt: addDays(t, 5),
        },
    ];

    it("Empty filter with earlier start date returns all work", () => {
        const f: Filter = {
            startDate: t,
        };

        expect(filter(work, f)).toHaveLength(work.length);
        expect(filter(work, f)).toEqual(work);
    });

    it("Empty filter with start date in middle returns some work", () => {
        const f: Filter = {
            startDate: addDays(t, 2),
        };

        expect(filter(work, f)).toHaveLength(work.length - 1);
        work.forEach((e, i) => {
            if (i === 0) {
                return;
            }
            expect(filter(work, f)).toEqual(expect.arrayContaining([e]));
        });
    });

    it("Start date and end date in middle returns some work", () => {
        const f: Filter = {
            startDate: addDays(t, 2),
            endDate: addDays(t, 4),
        };

        expect(filter(work, f)).toHaveLength(work.length - 2);
        work.forEach((e, i) => {
            if (i === 0 || i === work.length-1) {
                return;
            }
            expect(filter(work, f)).toEqual(expect.arrayContaining([e]));
        });
    });

    it("Start date and full title returns one", () => {
        const f: Filter = {
            startDate: t,
            title: "bang",
        };

        expect(filter(work, f)).toHaveLength(1);
        expect(filter(work, f)).toEqual([work[3]]);
    });

    it("Start date and partial title returns some work", () => {
        const f: Filter = {
            startDate: t,
            title: "b",
        };

        expect(filter(work, f)).toHaveLength(3);
        expect(filter(work, f)).toEqual(expect.arrayContaining([work[1], work[2], work[3]]));
    });

    it("Start date and full description returns one", () => {
        const f: Filter = {
            startDate: t,
            description: "I am a yet another description.",
        };

        expect(filter(work, f)).toHaveLength(1);
        expect(filter(work, f)).toEqual(expect.arrayContaining([work[4]]));
    });

    it("Start date and partial description returns one", () => {
        const f: Filter = {
            startDate: t,
            description: "description",
        };

        expect(filter(work, f)).toHaveLength(4);
        expect(filter(work, f)).toEqual(expect.arrayContaining([work[1], work[2], work[3], work[4]]));
    });

    it("Start date and empty tags returns same as without tags filter", () => {
        const f: Filter = {
            startDate: t,
            tags: [],
        };

        expect(filter(work, f)).toHaveLength(work.length);
        expect(filter(work, f)).toEqual(work);
    });

    it("Start date and full and all tags returns one", () => {
        const f: Filter = {
            startDate: t,
            tags: ["a", "b"],
        };

        expect(filter(work, f)).toHaveLength(1);
        expect(filter(work, f)).toEqual(expect.arrayContaining([work[1]]));
    });

    it("Start date and partial tags returns two", () => {
        const f: Filter = {
            startDate: t,
            tags: ["c"],
        };

        expect(filter(work, f)).toHaveLength(2);
        expect(filter(work, f)).toEqual(expect.arrayContaining([work[2], work[4]]));
    });
});
