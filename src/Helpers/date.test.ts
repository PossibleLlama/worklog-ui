import { format } from "date-fns";
import {
    dateEqual,
    formatRelativeDateTimeDuration,
    formatRelativeDateTime,
    formatRFC3339DateTime,
    subDays,
    isBefore,
    formatRFC3339Date,
    isAfter,
    isEqual,
    formatMinutes
} from "./date";

const fakeNow = new Date("2019-10-23T19:38:28Z");

describe("Format relative date time duration", () => {
    beforeAll(() => {
        jest.useFakeTimers().setSystemTime(fakeNow);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    describe("Without duration", () => {
        // Most cases are covered by the call to format relative date time
        it("Further ago than a week without duration", () => {
            const t = new Date();
            t.setDate(t.getDate() - 10);
            expect(formatRelativeDateTimeDuration(t)).toContain(format(t, "do MMMM yyyy"));
            expect(formatRelativeDateTimeDuration(t)).toContain(format(t, "HH:mm"));
            expect(formatRelativeDateTimeDuration(t)).toEqual(format(t, "do MMMM yyyy HH:mm."));
        });
    });

    describe("With duration", () => {
        it("Further ago than a week with a positive duration", () => {
            const t = new Date();
            const dur = 60;
            t.setDate(t.getDate() - 10);
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "do MMMM yyyy"));
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "HH:mm"));
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(`for ${dur} minutes.`);
            expect(formatRelativeDateTimeDuration(t, dur)).toEqual(`${format(t, "do MMMM yyyy HH:mm")} for ${dur} minutes.`);
        });

        it("Further ago than a week with a zero duration", () => {
            const t = new Date();
            const dur = 0;
            t.setDate(t.getDate() - 10);
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "do MMMM yyyy"));
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "HH:mm"));
            expect(formatRelativeDateTimeDuration(t, dur)).toEqual(`${format(t, "do MMMM yyyy HH:mm")}.`);
        });

        it("Further ago than a week with a negative duration", () => {
            const t = new Date();
            const dur = -10;
            t.setDate(t.getDate() - 10);
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "do MMMM yyyy"));
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "HH:mm"));
            expect(formatRelativeDateTimeDuration(t, dur)).toEqual(`${format(t, "do MMMM yyyy HH:mm")}.`);
        });
    });
});

describe("Format relative date time", () => {
    beforeAll(() => {
        jest.useFakeTimers().setSystemTime(fakeNow);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it("Same minute", () => {
        const t = new Date();
        t.setSeconds(t.getSeconds() - 1);
        expect(formatRelativeDateTime(t)).toEqual("A few seconds ago");
    });

    it("Same hour", () => {
        const t = new Date();
        t.setMinutes(t.getMinutes() - 1);
        expect(formatRelativeDateTime(t)).toContain("Today at");
        expect(formatRelativeDateTime(t)).toContain(format(t, "HH:mm"));
    });

    it("Same day", () => {
        const t = new Date();
        t.setHours(t.getHours() - 1);
        expect(formatRelativeDateTime(t)).toContain("Today at");
        expect(formatRelativeDateTime(t)).toContain(format(t, "HH:mm"));
    });

    it("Same week", () => {
        const t = new Date();
        // If day of week is a Monday, add day (to stay within the week), otherwise remove
        t.getDay() == 1 ? t.setDate(t.getDate() + 1) : t.setDate(t.getDate() - 1);
        expect(formatRelativeDateTime(t)).toContain(format(t, "EEEE"));
        expect(formatRelativeDateTime(t)).toContain(format(t, "'at' HH:mm"));
    });

    it("Further ago than a week", () => {
        const t = new Date();
        t.setDate(t.getDate() - 10);
        expect(formatRelativeDateTime(t)).toContain(format(t, "do MMMM yyyy"));
        expect(formatRelativeDateTime(t)).toContain(format(t, "HH:mm"));
    });
});

// NOTE: this is equal DATE, not time
describe("Date equal", () => {
    const comparator = new Date("2020-04-16T22:48:31");

    it("Same instance", () => {
        expect(dateEqual(comparator, comparator)).toEqual(true);
    });

    it("Same date time", () => {
        expect(dateEqual(new Date("2020-04-16T22:48:31"), comparator)).toEqual(true);
    });

    it("Different second", () => {
        expect(dateEqual(new Date("2020-04-16T22:48:30"), comparator)).toEqual(true);
        expect(dateEqual(new Date("2020-04-16T22:48:32"), comparator)).toEqual(true);
    });

    it("Different minute", () => {
        expect(dateEqual(new Date("2020-04-16T22:47:31"), comparator)).toEqual(true);
        expect(dateEqual(new Date("2020-04-16T22:49:31"), comparator)).toEqual(true);
    });

    it("Different hour", () => {
        expect(dateEqual(new Date("2020-04-16T21:48:31"), comparator)).toEqual(true);
        expect(dateEqual(new Date("2020-04-16T23:48:31"), comparator)).toEqual(true);
    });

    it("Different day", () => {
        expect(dateEqual(new Date("2020-04-15T22:48:31"), comparator)).toEqual(false);
        expect(dateEqual(new Date("2020-04-17T22:48:31"), comparator)).toEqual(false);
    });

    it("Different month", () => {
        expect(dateEqual(new Date("2020-03-16T22:48:31"), comparator)).toEqual(false);
        expect(dateEqual(new Date("2020-05-16T22:48:31"), comparator)).toEqual(false);
    });

    it("Different year", () => {
        expect(dateEqual(new Date("2019-04-16T22:48:31"), comparator)).toEqual(false);
        expect(dateEqual(new Date("2021-04-16T22:48:31"), comparator)).toEqual(false);
    });
});

describe("Format RFC3339 Date", () => {
    const t = new Date("2020-04-16T22:48:31");

    it("Has year, month, day", () => {
        expect(formatRFC3339Date(t)).toContain("2020-04-16");
    });

    it("Does not have hour, minute, second", () => {
        expect(formatRFC3339Date(t)).not.toContain("22:48:31");
    });

    it("Full string", () => {
        expect(formatRFC3339Date(t)).toEqual("2020-04-16");
    });
});

describe("Format RFC3339 Date time", () => {
    const t = new Date("2020-04-16T22:48:31");

    it("Has year, month, day", () => {
        expect(formatRFC3339DateTime(t)).toContain("2020-04-16");
    });

    it("Has hour, minute, second", () => {
        expect(formatRFC3339DateTime(t)).toContain("22:48:31");
    });

    it("Full string, includes 'T' and 'Z'", () => {
        expect(formatRFC3339DateTime(t)).toEqual("2020-04-16T22:48:31Z");
    });
});

describe("Format Minutes", () => {
    const t = new Date("2020-04-16T22:48:31");

    it("Has year, month, day", () => {
        expect(formatMinutes(t)).toContain("2020-04-16");
    });

    it("Has hour, minute", () => {
        expect(formatMinutes(t)).toContain("22:48");
    });

    it("Full string, includes 'T'", () => {
        expect(formatMinutes(t)).toEqual("2020-04-16T22:48");
    });
});

describe("Sub days", () => {
    const t = new Date("2020-04-16T22:48:31");

    it("Stays the same", () => {
        expect(subDays(t, 0)).toEqual(new Date("2020-04-16T22:48:31"));
    });

    it("Remove day", () => {
        expect(subDays(t, 1)).toEqual(new Date("2020-04-15T22:48:31"));
    });

    it("Remove 7 days", () => {
        expect(subDays(t, 7)).toEqual(new Date("2020-04-09T22:48:31"));
    });

    it("Remove 31 days", () => {
        expect(subDays(t, 31)).toEqual(new Date("2020-03-16T22:48:31"));
    });

    it("Negative day", () => {
        expect(subDays(t, -1)).toEqual(new Date("2020-04-17T22:48:31"));
    });

    it("Negative 7 days", () => {
        expect(subDays(t, -7)).toEqual(new Date("2020-04-23T22:48:31"));
    });

    it("Negative 30 days", () => {
        expect(subDays(t, -30)).toEqual(new Date("2020-05-16T22:48:31"));
    });
});

describe("Is before", () => {
    const t = new Date("2020-04-16T22:48:31");

    it("Same instance", () => {
        expect(isBefore(t, t)).toEqual(false);
    });

    it("Same date time", () => {
        expect(isBefore(new Date("2020-04-16T22:48:31"), t)).toEqual(false);
    });

    it("Different second", () => {
        expect(isBefore(new Date("2020-04-16T22:48:30"), t)).toEqual(true);
        expect(isBefore(new Date("2020-04-16T22:48:32"), t)).toEqual(false);
    });

    it("Different minute", () => {
        expect(isBefore(new Date("2020-04-16T22:47:31"), t)).toEqual(true);
        expect(isBefore(new Date("2020-04-16T22:49:31"), t)).toEqual(false);
    });

    it("Different hour", () => {
        expect(isBefore(new Date("2020-04-16T21:48:31"), t)).toEqual(true);
        expect(isBefore(new Date("2020-04-16T23:48:31"), t)).toEqual(false);
    });

    it("Different day", () => {
        expect(isBefore(new Date("2020-04-15T22:48:31"), t)).toEqual(true);
        expect(isBefore(new Date("2020-04-17T22:48:31"), t)).toEqual(false);
    });

    it("Different month", () => {
        expect(isBefore(new Date("2020-03-16T22:48:31"), t)).toEqual(true);
        expect(isBefore(new Date("2020-05-16T22:48:31"), t)).toEqual(false);
    });

    it("Different year", () => {
        expect(isBefore(new Date("2019-04-16T22:48:31"), t)).toEqual(true);
        expect(isBefore(new Date("2021-04-16T22:48:31"), t)).toEqual(false);
    });
});

describe("Is after", () => {
    const t = new Date("2020-04-16T22:48:31");

    it("Same instance", () => {
        expect(isAfter(t, t)).toEqual(false);
    });

    it("Same date time", () => {
        expect(isAfter(new Date("2020-04-16T22:48:31"), t)).toEqual(false);
    });

    it("Different second", () => {
        expect(isAfter(new Date("2020-04-16T22:48:30"), t)).toEqual(false);
        expect(isAfter(new Date("2020-04-16T22:48:32"), t)).toEqual(true);
    });

    it("Different minute", () => {
        expect(isAfter(new Date("2020-04-16T22:47:31"), t)).toEqual(false);
        expect(isAfter(new Date("2020-04-16T22:49:31"), t)).toEqual(true);
    });

    it("Different hour", () => {
        expect(isAfter(new Date("2020-04-16T21:48:31"), t)).toEqual(false);
        expect(isAfter(new Date("2020-04-16T23:48:31"), t)).toEqual(true);
    });

    it("Different day", () => {
        expect(isAfter(new Date("2020-04-15T22:48:31"), t)).toEqual(false);
        expect(isAfter(new Date("2020-04-17T22:48:31"), t)).toEqual(true);
    });

    it("Different month", () => {
        expect(isAfter(new Date("2020-03-16T22:48:31"), t)).toEqual(false);
        expect(isAfter(new Date("2020-05-16T22:48:31"), t)).toEqual(true);
    });

    it("Different year", () => {
        expect(isAfter(new Date("2019-04-16T22:48:31"), t)).toEqual(false);
        expect(isAfter(new Date("2021-04-16T22:48:31"), t)).toEqual(true);
    });
});

describe("Is equal", () => {
    const t = new Date("2020-04-16T22:48:31");

    it("Same instance", () => {
        expect(isEqual(t, t)).toEqual(true);
    });

    it("Same date time", () => {
        expect(isEqual(new Date("2020-04-16T22:48:31"), t)).toEqual(true);
        expect(isEqual(new Date(2020, 3, 16, 22, 48, 31), t)).toEqual(true);
    });

    it("Different second", () => {
        expect(isEqual(new Date("2020-04-16T22:48:30"), t)).toEqual(false);
        expect(isEqual(new Date("2020-04-16T22:48:32"), t)).toEqual(false);
        expect(isEqual(new Date(2020, 3, 16, 22, 48, 30), t)).toEqual(false);
        expect(isEqual(new Date(2020, 3, 16, 22, 48, 32), t)).toEqual(false);
    });

    it("Different minute", () => {
        expect(isEqual(new Date("2020-04-16T22:47:31"), t)).toEqual(false);
        expect(isEqual(new Date("2020-04-16T22:49:31"), t)).toEqual(false);
        expect(isEqual(new Date(2020, 3, 16, 22, 47, 31), t)).toEqual(false);
        expect(isEqual(new Date(2020, 3, 16, 22, 49, 31), t)).toEqual(false);
    });

    it("Different hour", () => {
        expect(isEqual(new Date("2020-04-16T21:48:31"), t)).toEqual(false);
        expect(isEqual(new Date("2020-04-16T23:48:31"), t)).toEqual(false);
        expect(isEqual(new Date(2020, 3, 16, 21, 48, 31), t)).toEqual(false);
        expect(isEqual(new Date(2020, 3, 16, 23, 48, 31), t)).toEqual(false);
    });

    it("Different day", () => {
        expect(isEqual(new Date("2020-04-15T22:48:31"), t)).toEqual(false);
        expect(isEqual(new Date("2020-04-17T22:48:31"), t)).toEqual(false);
        expect(isEqual(new Date(2020, 3, 15, 22, 48, 31), t)).toEqual(false);
        expect(isEqual(new Date(2020, 3, 17, 22, 48, 31), t)).toEqual(false);
    });

    // Month is zero indexed when building using numbers
    it("Different month", () => {
        expect(isEqual(new Date("2020-03-16T22:48:31"), t)).toEqual(false);
        expect(isEqual(new Date("2020-05-16T22:48:31"), t)).toEqual(false);
        expect(isEqual(new Date(2020, 2, 16, 22, 48, 31), t)).toEqual(false);
        expect(isEqual(new Date(2020, 4, 16, 22, 48, 31), t)).toEqual(false);
    });

    it("Different year", () => {
        expect(isEqual(new Date("2019-04-16T22:48:31"), t)).toEqual(false);
        expect(isEqual(new Date("2021-04-16T22:48:31"), t)).toEqual(false);
        expect(isEqual(new Date(2019, 3, 16, 22, 48, 31), t)).toEqual(false);
        expect(isEqual(new Date(2021, 3, 16, 22, 48, 31), t)).toEqual(false);
    });
});
