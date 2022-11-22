import request from "@api/helper";

import { formatRFC3339DateTime } from "@helper/date";

import { Filter } from "@model/filter";
import { Work } from "@model/work";

import { exampleDay1, exampleDay2, exampleDayLastMonth, exampleDayToday } from "./example";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getWorklogByRange = (f: Filter): Promise<Work[]> => {
    return request.get(`worklog`);
    // return request.get(`worklog/${formatRFC3339DateTime(f.startDate)}`);
    // return Promise.resolve([...exampleDay1, ...exampleDay2, ...exampleDayToday, ...exampleDayLastMonth]);
};

export default getWorklogByRange;
