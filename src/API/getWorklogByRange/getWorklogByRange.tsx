import { Work } from "@model/work";

import { exampleDay1 } from "./example";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getWorklogByRange= (range: Date): Work[]  => {
    return exampleDay1;
};

export default getWorklogByRange;
