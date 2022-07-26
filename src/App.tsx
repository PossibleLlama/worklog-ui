import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { subDays } from "date-fns";

import Worklist from "@page/Worklist/Worklist.page";
import Header from "@view/Header/Header.view";

import { Filter } from "@model/filter";
import { Work } from "@model/work";

type Props = {
    getWorklogs: (f: Filter) => Promise<Work[]>;
};

const App: React.FC<Props> = (props: Props) => {
    // Start with filter showing last 7 days
    const [filter, setFilter] = useState<Filter>({
        startDate: subDays(new Date(), 7),
    });

    const [work, setWork] = useState<Work[]>([]);

    useEffect(() => {
        let mounted = true;
        props.getWorklogs(filter)
            .then((data) => {
                if (mounted) {
                    setWork(data);
                }
            });
        return () => {
            mounted = false;
        };
        // Props is used to enable testing with the passed function, and should not change dynamically
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const updateFilters = (filter: Filter): void => {
        setFilter(filter);
    };

    return (
        <Fragment>
            <Header updateFilters={updateFilters} currentFilters={filter} />
            <Routes>
                <Route path="/" element={<Worklist Worklist={work} />} />
                <Route path="/timeline" element={<Worklist Worklist={work} />} />
                <Route path="/discover" element={<h1>Coming soon</h1>} />
            </Routes>
        </Fragment>
    );
};

export default App;
