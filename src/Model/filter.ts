import { dateEqual, isAfter, isBefore } from "@helper/date";

import { Work } from "@model/work";

export interface Filter {
    startDate: Date,
    endDate?: Date,
    title?: string,
    description?: string,
    tags?: string[],
}

export const isEqual = (value: Filter, compare: Filter): boolean => {
    if (!dateEqual(value.startDate, compare.startDate)) {
        return false;
    }
    if (value.endDate || compare.endDate) {
        if (value.endDate && compare.endDate) {
            if (!dateEqual(value.endDate, compare.endDate)) {
                return false;
            }
        } else {
            return false;
        }
    }
    if (value.title !== compare.title) {
        return false;
    }
    if (value.description !== compare.description) {
        return false;
    }
    if (value.tags || compare.tags) {
        if (value.tags && compare.tags) {
            if (!arrayEquals(value.tags.sort(), compare.tags.sort())) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
};

const arrayEquals = (value: string[], compare: string[]): boolean => {
    return value.length === compare.length &&
        value.every((element, index) => element === compare[index]);
};

export const filter = (wk: Work[], f: Filter): Work[] => {
    return wk.filter((e) => {
        return isAfter(e.When, f.startDate);
    }).filter((e) => {
        if (!f.endDate) return true;
        return isBefore(e.When, f.endDate);
    }).filter((e) => {
        if (!f.title) return true;
        return e.Title.includes(f.title);
    }).filter((e) => {
        if (!f.description) return true;
        if (!e.Description) return false;
        return e.Description.includes(f.description);
    }).filter((e) => {
        if (!f.tags || f.tags.length === 0) return true;
        if (!e.Tags || e.Tags.length === 0) return false;
        return f.tags.every((ft) => {
            if (e.Tags?.includes(ft)) return true;
            return e.Tags?.some(et => et.includes(ft));
        });
    });
};
