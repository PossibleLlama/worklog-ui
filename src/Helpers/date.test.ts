import { format } from "date-fns";
import { formatRelativeDateTimeDuration, formatRelativeDateTime } from "./date";

describe("Format date time", () => {
    const now = new Date();

    it("Further ago than a week without duration", () => {
        const t = new Date(now);
        t.setDate(t.getDate() - 10);
        expect(formatRelativeDateTimeDuration(t)).toContain(format(t, "do MMMM yyyy"));
        expect(formatRelativeDateTimeDuration(t)).toContain(format(t, "HH:mm"));
        expect(formatRelativeDateTimeDuration(t)).toEqual(format(t, "do MMMM yyyy HH:mm."));
    });

    describe("Including duration", () => {
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

describe("Format relative date", () => {
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

    it("With leading zeros", () => {
        const t = new Date("01 Jan 2000 00:00:00 GMT");
        expect(formatRelativeDateTime(t)).toContain(format(t, "do MMMM yyyy"));
        expect(formatRelativeDateTime(t)).toContain(format(t, "HH:mm"));
    });
});
