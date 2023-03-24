import { formatMinutes, isEqual as isDateEqual } from "@helper/date";

export interface Work {
    ID: string;
    Revision: number;
    Title: string;
    Description?: string;
    Author?: string;
    Duration?: number;
    Tags?: string[];
    When: Date;
    CreatedAt: Date;
}

export const isEqual = (w: Work, c: Work): boolean => {
    return w.ID === c.ID &&
        w.Revision === c.Revision &&
        w.Title === c.Title &&
        w.Description === c.Description &&
        w.Author === c.Author &&
        w.Duration === c.Duration &&
        ((w.Tags === undefined && c.Tags === undefined) ||
        (w.Tags !== undefined && c.Tags !== undefined &&
        w.Tags?.length === c.Tags?.length &&
        w.Tags?.every((e: string) => c.Tags?.includes(e)))) &&
        isDateEqual(w.When, c.When) &&
        isDateEqual(w.CreatedAt, c.CreatedAt);
};

export const generateCreateCommand = (w: Work): string => {
    return "worklog create" +
        ` --title "${w.Title}"` +
        (isDateEqual(w.When, new Date(0)) ? "" : " --when \"" + formatMinutes(w.When).replace("T", " ") + "\"") +
        (w.Description === undefined || w.Description === "" ? "" : " --description \"" + w.Description + "\"") +
        (w.Author === undefined || w.Author === "" ? "" : " --author \"" + w.Author + "\"") +
        (w.Duration === undefined || w.Duration <= 0 ? "" : ` --duration ${w.Duration}`) +
        (w.Tags === undefined || w.Tags.length === 0 ? "" : ` --tags "${w.Tags.join(", ")}"`) +
        "".trim();
};
