import { format, isSameDay, isSameHour, isSameMinute, isSameWeek } from "date-fns";


export const formatDateTime = (d: Date, dur?: number): string => {
    return dur && dur > 0 ?
        `${formatRelativeDate(d)} for ${dur} minutes.` :
        `${formatRelativeDate(d)}.`;
};

export const formatRelativeDate = (d: Date): string => {
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
