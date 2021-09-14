import { isSameDay, isSameMonth, isSameYear } from "date-fns";

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

const dateEqual = (value: Date, compare: Date): boolean => {
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

const arrayEquals = (value: string[], compare: string[]): boolean => {
    return value.length === compare.length &&
        value.every((element, index) => element === compare[index]);
};
