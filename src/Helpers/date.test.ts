import { format } from "date-fns";
import {
    dateEqual,
    formatRelativeDateTimeDuration,
    formatRelativeDateTime,
    formatRFC3339DateTime,
    subDays,
    isBefore,
    formatRFC3339Date,
    isAfter
} from "./date";

describe("Format relative date time duration", () => {
    const now = new Date();

    describe("Without duration", () => {
        // Most cases are covered by the call to format relative date time
        it("Further ago than a week without duration", () => {
            const t = new Date(now);
            t.setDate(t.getDate() - 10);
            expect(formatRelativeDateTimeDuration(t)).toContain(format(t, "do MMMM yyyy"));
            expect(formatRelativeDateTimeDuration(t)).toContain(format(t, "HH:mm"));
            expect(formatRelativeDateTimeDuration(t)).toEqual(format(t, "do MMMM yyyy HH:mm."));
        });
    });

    describe("With duration", () => {
        it("Further ago than a week with a positive duration", () => {
            const t = new Date(now);
            const dur = 60;
            t.setDate(t.getDate() - 10);
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "do MMMM yyyy"));
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "HH:mm"));
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(`for ${dur} minutes.`);
            expect(formatRelativeDateTimeDuration(t, dur)).toEqual(`${format(t, "do MMMM yyyy HH:mm")} for ${dur} minutes.`);
        });

        it("Further ago than a week with a zero duration", () => {
            const t = new Date(now);
            const dur = 0;
            t.setDate(t.getDate() - 10);
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "do MMMM yyyy"));
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "HH:mm"));
            expect(formatRelativeDateTimeDuration(t, dur)).toEqual(`${format(t, "do MMMM yyyy HH:mm")}.`);
        });

        it("Further ago than a week with a negative duration", () => {
            const t = new Date(now);
            const dur = -10;
            t.setDate(t.getDate() - 10);
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "do MMMM yyyy"));
            expect(formatRelativeDateTimeDuration(t, dur)).toContain(format(t, "HH:mm"));
            expect(formatRelativeDateTimeDuration(t, dur)).toEqual(`${format(t, "do MMMM yyyy HH:mm")}.`);
        });
    });
});

describe("Format relative date time", () => {
    const now = new Date();

    it("Same minute", () => {
        const t = new Date(now);
        t.setSeconds(t.getSeconds() - 1);
        expect(formatRelativeDateTime(t)).toEqual("A few seconds ago");
    });

    it("Same hour", () => {
        const t = new Date(now);
        t.setMinutes(t.getMinutes() - 1);
        expect(formatRelativeDateTime(t)).toContain("This hour at");
        expect(formatRelativeDateTime(t)).toContain(format(t, "HH:mm"));
    });

    it("Same day", () => {
        const t = new Date(now);
        t.setHours(t.getHours() - 1);
        expect(formatRelativeDateTime(t)).toContain("Today at");
        expect(formatRelativeDateTime(t)).toContain(format(t, "HH:mm"));
    });

    it("Same week", () => {
        const t = new Date(now);
        t.setDate(t.getDate() - 1);
        expect(formatRelativeDateTime(t)).toContain(format(t, "EEEE"));
        expect(formatRelativeDateTime(t)).toContain(format(t, "'at' HH:mm"));
    });

    it("Further ago than a week", () => {
        const t = new Date(now);
        t.setDate(t.getDate() - 10);
        expect(formatRelativeDateTime(t)).toContain(format(t, "do MMMM yyyy"));
        expect(formatRelativeDateTime(t)).toContain(format(t, "HH:mm"));
    });
});

// NOTE: this is equal DATE, not time
describe("Date equal", () => {
    const comparitor = new Date("2020-04-16T22:48:31");

    it("Same instance", () => {
        expect(dateEqual(comparitor, comparitor)).toEqual(true);
    });

    it("Same date time", () => {
        expect(dateEqual(new Date("2020-04-16T22:48:31"), comparitor)).toEqual(true);
    });

    it("Different second", () => {
        expect(dateEqual(new Date("2020-04-16T22:48:30"), comparitor)).toEqual(true);
        expect(dateEqual(new Date("2020-04-16T22:48:32"), comparitor)).toEqual(true);
    });

    it("Different minute", () => {
        expect(dateEqual(new Date("2020-04-16T22:47:31"), comparitor)).toEqual(true);
        expect(dateEqual(new Date("2020-04-16T22:49:31"), comparitor)).toEqual(true);
    });

    it("Different hour", () => {
        expect(dateEqual(new Date("2020-04-16T21:48:31"), comparitor)).toEqual(true);
        expect(dateEqual(new Date("2020-04-16T23:48:31"), comparitor)).toEqual(true);
    });

    it("Different day", () => {
        expect(dateEqual(new Date("2020-04-15T22:48:31"), comparitor)).toEqual(false);
        expect(dateEqual(new Date("2020-04-17T22:48:31"), comparitor)).toEqual(false);
    });

    it("Different month", () => {
        expect(dateEqual(new Date("2020-03-16T22:48:31"), comparitor)).toEqual(false);
        expect(dateEqual(new Date("2020-05-16T22:48:31"), comparitor)).toEqual(false);
    });

    it("Different year", () => {
        expect(dateEqual(new Date("2019-04-16T22:48:31"), comparitor)).toEqual(false);
        expect(dateEqual(new Date("2021-04-16T22:48:31"), comparitor)).toEqual(false);
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

    it("Full string, includes 'T'", () => {
        expect(formatRFC3339DateTime(t)).toEqual("2020-04-16T22:48:31");
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

