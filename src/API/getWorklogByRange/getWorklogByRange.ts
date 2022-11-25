import { instance, responseBody, workResponseToWork } from "@api/helper";

import { formatRFC3339DateTime } from "@helper/date";

import { Filter } from "@model/filter";
import { Work } from "@model/work";

export interface WorkResponse {
    id: string;
    revision: number;
    title: string;
    description?: string;
    author?: string;
    duration?: number;
    tags?: string[];
    when: string;
    createdAt: string;
}

const generateFilter = (f: Filter): string => {
    let filter = `startDate=${formatRFC3339DateTime(f.startDate)}`;
    if (f.endDate) {
        filter = `${filter}&endDate=${formatRFC3339DateTime(f.endDate)}`;
    }
    if (f.title) {
        filter = `${filter}&title=${f.title}`;
    }
    if (f.description) {
        filter = `${filter}&description=${f.description}`;
    }
    if (f.tags) {
        filter = `${filter}&tags=${f.tags.join(",")}`;
    }
    return filter;
};

const getWorklogs = (f: Filter): Promise<Work[]> => {
    return instance.get<WorkResponse[]>(`worklog?${generateFilter(f)}`).
        then(responseBody).
        then((w: WorkResponse[]) => w.map(workResponseToWork));
};

export default getWorklogs;
