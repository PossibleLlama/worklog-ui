import { format } from "date-fns";
import { formatDateTime, formatRelativeDate } from "./date";

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
