import { instance, responseBody, WorkResponse, workResponseToWork, workToWorkRequest } from "@api/helper";

import { Work } from "@model/work";

const createWorklog = (w: Work): Promise<Work> => {
    return instance.post<WorkResponse>("worklog", workToWorkRequest(w)).
        then(responseBody).
        then(workResponseToWork);
};

export default createWorklog;
