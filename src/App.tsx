import React, { Fragment, useState } from "react";

import { subDays } from "date-fns";

// import Worklist from "@page/Worklist/Worklist.page";
import Header from "@view/Header/Header.view";

// import getWorklogByRange from "@api/getWorklogByRange/getWorklogByRange";

import { Filter } from "@model/filter";
// import { Work } from "@model/work";

const App: React.FC = () => {
    // Start with filter showing last 7 days
    const [filter, setFilter] = useState<Filter>({
        startDate: subDays(new Date(), 7),
    });

    // const [work, setWork] = useState<Work[]>([]);

    // useEffect(() => {
    //     let mounted = true;
    //     getWorklogByRange(filter)
    //         .then((data) => {
    //             if (mounted) {
    //                 setWork(data);
    //             }
    //         });
    //     return function cleanup() {
    //         mounted = false;
    //     };
    // }, [filter]);

    const updateFilters = (filter: Filter): void => {
        setFilter(filter);
    };

    return (
        <Fragment>
            <Header updateFilters={updateFilters} currentFilters={filter} />
            {/* <Worklist Worklist={work}/> */}
        </Fragment>
    );
};

export default App;
