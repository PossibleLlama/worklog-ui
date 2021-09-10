// import request from "@api/helper";

// import { format } from "date-fns";

import { Filter } from "@model/filter";
import { Work } from "@model/work";

import { exampleDay1 } from "./example";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getWorklogByRange= (f: Filter): Promise<Work[]>  => {
    // return request.get(`work/${format(f.startDate, "yyyy/MM/ddTHHmm")}`);
    return Promise.resolve(exampleDay1);
};

export default getWorklogByRange;
