import { expect } from "chai";

import { isEqual } from "./filter";

describe("Filter equals", () => {
    const startDate = new Date(2021, 1, 1, 8, 35);
    describe("Start Date only", () => {
        const f1 = { startDate };

        it("Same filter", () => {
            expect(isEqual(f1, f1)).true;
        });

        describe("With other fields", () => {
            it("Has end date", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2021, 2, 2, 13, 47),
                };
                expect(isEqual(f1, f2)).false;
            });
    
            it("Has title", () => {
                const f2 = {
                    startDate,
                    title: "foo",
                };
                expect(isEqual(f1, f2)).false;
            });
    
            it("Has description", () => {
                const f2 = {
                    startDate,
                    description: "foo",
                };
                expect(isEqual(f1, f2)).false;
            });
    
            it("Has tags", () => {
                const f2 = {
                    startDate,
                    tags: ["foo"],
                };
                expect(isEqual(f1, f2)).false;
            });
        });

        describe("Different start date", () => {
            it("Year", () => {
                const f2 = {
                    startDate: new Date(2020, 1, 1, 8, 35),
                };
                expect(isEqual(f1, f2)).false;
            });

            it("Month", () => {
                const f2 = {
                    startDate: new Date(2021, 2, 1, 8, 35),
                };
                expect(isEqual(f1, f2)).false;
            });

            it("Day", () => {
                const f2 = {
                    startDate: new Date(2021, 1, 2, 8, 35),
                };
                expect(isEqual(f1, f2)).false;
            });

            it("Hour", () => {
                const f2 = {
                    startDate: new Date(2021, 1, 1, 5, 35),
                };
                expect(isEqual(f1, f2)).true;
            });

            it("Minute", () => {
                const f2 = {
                    startDate: new Date(2021, 1, 1, 8, 22),
                };
                expect(isEqual(f1, f2)).true;
            });
        });
    });

    describe("Start and End Date", () => {
        const f1 = {
            startDate,
            endDate: new Date(2021, 2, 2, 13, 47),
        };

        it("Same filter", () => {
            expect(isEqual(f1, f1)).true;
        });

        describe("Different end date", () => {
            it("Year", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2022, 2, 2, 13, 47),
                };
                expect(isEqual(f1, f2)).false;
            });

            it("Month", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2021, 3, 2, 13, 47),
                };
                expect(isEqual(f1, f2)).false;
            });

            it("Day", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2021, 2, 21, 13, 47),
                };
                expect(isEqual(f1, f2)).false;
            });

            it("Hour", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2021, 2, 2, 23, 47),
                };
                expect(isEqual(f1, f2)).true;
            });

            it("Day", () => {
                const f2 = {
                    startDate,
                    endDate: new Date(2021, 2, 2, 13, 18),
                };
                expect(isEqual(f1, f2)).true;
            });
        });
    });

    describe("Start and Title", () => {
        const f1 = {
            startDate,
            title: "foo",
        };

        it("Same filter", () => {
            expect(isEqual(f1, f1)).true;
        });

        it("Different title", () => {
            const f2 = {
                startDate,
                title: "bar",
            };
            expect(isEqual(f1, f2)).false;
        });

        it("With other field", () => {
            const f2 = {
                startDate,
                title: "foo",
                description: "bar",
            };
            expect(isEqual(f1, f2)).false;
        });
    });

    describe("Start and Description", () => {
        const f1 = {
            startDate,
            description: "foo",
        };

        it("Same filter", () => {
            expect(isEqual(f1, f1)).true;
        });

        it("Different description", () => {
            const f2 = {
                startDate,
                description: "bar",
            };
            expect(isEqual(f1, f2)).false;
        });

        it("With other field", () => {
            const f2 = {
                startDate,
                title: "bar",
                description: "foo",
            };
            expect(isEqual(f1, f2)).false;
        });
    });

    describe("Start and Tags", () => {
        const f1 = {
            startDate,
            tags: ["foo", "bar"],
        };

        it("Same filter", () => {
            expect(isEqual(f1, f1)).true;
        });

        it("Different tag", () => {
            const f2 = {
                startDate,
                tags: ["foo", "buzz"],
            };
            expect(isEqual(f1, f2)).false;
        });

        it("Different order of tags", () => {
            const f2 = {
                startDate,
                tags: ["bar", "foo"],
            };
            expect(isEqual(f1, f2)).true;
        });

        it("Different number of tags", () => {
            const f2 = {
                startDate,
                tags: ["foo"],
            };
            expect(isEqual(f1, f2)).false;
        });

        it("With other field", () => {
            const f2 = {
                startDate,
                title: "bar",
                tags: ["foo", "bar"],
            };
            expect(isEqual(f1, f2)).false;
        });
    });
});
