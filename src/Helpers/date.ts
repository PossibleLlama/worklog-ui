import {
    format,
    isBefore as before,
    isSameDay,
    isSameHour,
    isSameMinute,
    isSameMonth,
    isSameWeek,
    isSameYear,
    subDays as subtract
} from "date-fns";


export const formatRelativeDateTimeDuration = (d: Date, dur?: number): string => {
    return dur && dur > 0 ?
        `${formatRelativeDateTime(d)} for ${dur} minutes.` :
        `${formatRelativeDateTime(d)}.`;
};

export const formatRelativeDateTime = (d: Date): string => {
    const now = new Date();
    if (isSameMinute(d, now)) {
        return "A few seconds ago";
    } else if (isSameHour(d, now)) {
        return `This hour at ${format(d, "HH:mm")}`;
    } else if (isSameDay(d, now)) {
        return `Today at ${format(d, "HH:mm")}`;
    } else if (isSameWeek(d, now)) {
        return `${format(d, "EEEE")} at ${format(d, "HH:mm")}`;
    } else {
        return format(d, "do MMMM yyyy HH:mm");
    }
};

export const dateEqual = (value: Date, compare: Date): boolean => {
    if (!isSameYear(value, compare)) {
        return false;
    } else if (!isSameMonth(value, compare)) {
        return false;
    } else if (!isSameDay(value, compare)) {
        return false;
    } else {
        return true;
    }
};

export const formatRFC3339DateTime = (d: Date): string => {
    return format(d, "yyyy-MM-dd'T'HH:mm:ss");
};

export const subDays = (d: Date, amount: number): Date => {
    return subtract(d, amount);
};

export const isBefore = (d: Date, c: Date): boolean => {
    return before(d, c);
};
