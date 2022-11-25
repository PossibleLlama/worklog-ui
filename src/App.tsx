import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { subDays } from "@helper/date";

import Header from "@view/Header/Header.view";
import Worklist from "@page/Worklist/Worklist.page";
import Discover from "@page/Discover/Discover.page";

import { Filter } from "@model/filter";
import { Work } from "@model/work";

import { toast } from "react-toastify";

const getLastMonday = (): Date => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), subDays(t, (t.getDay() + 6) % 7).getDate());
};

type Props = {
    getWorklogs: (f: Filter) => Promise<Work[]>;
    createWork: (w: Work) => Promise<Work>;
    editWork: (w: Work) => Promise<Work>;
};

const App: React.FC<Props> = (props: Props) => {
    // Start with filter showing this week (starting from the latest Monday)
    const [filter, setFilter] = useState<Filter>({
        startDate: getLastMonday(),
    });

    const [allWork, setAllWork] = useState<Work[]>([]);
    const [filteredWork, setFilteredWork] = useState<Work[]>([]);

    useEffect(() => {
        let mounted = true;
        props.getWorklogs({ startDate: new Date("2000-01-01") })
            .then((data: React.SetStateAction<Work[]>) => {
                if (mounted) {
                    setAllWork(data);
                    mounted = false;
                    toast.success("Updated all work items");
                }
            }).catch(() => {
                toast.error("Failed to get all work items");
            });
    }, [props]);

    useEffect(() => {
        if (allWork.length == 0) {
            return;
        }
        let mounted = true;
        props.getWorklogs(filter)
            .then((data: React.SetStateAction<Work[]>) => {
                if (mounted) {
                    setFilteredWork(data);
                    mounted = false;
                }
            });
        // Props is used to enable testing with the passed function, and should not change dynamically
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allWork, filter]);

    const updateFilters = (newFilter: Filter): void => {
        setFilter(newFilter);
    };

    return (
        <Fragment>
            <Header updateFilters={updateFilters} currentFilters={filter} />
            <Routes>
                <Route path="/" element={<Worklist Worklist={filteredWork} />} />
                <Route path="/timeline" element={<Worklist Worklist={filteredWork} />} />
                <Route path="/discover" element={<Discover TotalWork={allWork} FilteredWork={filteredWork} />} />
            </Routes>
        </Fragment>
    );
};

export default App;
