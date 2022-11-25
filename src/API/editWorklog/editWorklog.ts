import { instance, responseBody, WorkResponse, workResponseToWork, workToWorkRequest } from "@api/helper";

import { Work } from "@model/work";

const editWorklog = (w: Work): Promise<Work> => {
    return instance.post<WorkResponse>(`worklog/${w.ID}`, workToWorkRequest(w)).
        then(responseBody).
        then(workResponseToWork);
};

export default editWorklog;
