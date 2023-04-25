import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { subDays } from "@helper/date";

import DraftWorklog, { Usage } from "@view/DraftWorklog/DraftWorklog.view";
import Header from "@view/Header/Header.view";
import Worklist from "@page/Worklist/Worklist.page";
import Discover from "@page/Discover/Discover.page";

import { Filter, filter as filterFunc } from "@model/filter";
import { Work, isEqual, generateCreateCommand } from "@model/work";

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

    const [modal, setModal] = useState<Usage | undefined>(undefined);
    const [modalWork, setModalWork] = useState<Work | undefined>(undefined);

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

    const createWork = (newWork: Work | undefined): Promise<Work | void> => {
        if (newWork === undefined) {
            return Promise.resolve(undefined);
        }
        return props.createWork(newWork).then((e: Work) => {
            setAllWork(allWork.concat(e));
            if (filterFunc([e], filter).length > 0) {
                setFilteredWork(filteredWork.concat(e));
            }
            toast.success("Created new work");
        }).catch(() => {
            toast.error("Failed to create new work - view CLI command in console");
            console.log(generateCreateCommand(newWork));
            console.log(newWork);
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const editWork = (newWork: Work): Promise<Work | void> => {
        if (allWork.filter((e: Work) => e.ID === newWork.ID).every((e: Work) => isEqual(newWork, e))) {
            return Promise.resolve(undefined);
        }
        return props.editWork(newWork).then((e: Work) => {
            setAllWork(allWork.filter((e: Work) => e.ID === newWork.ID).map((e: Work) => e = newWork));
            if (filterFunc([e], filter).length > 0) {
                setFilteredWork(filteredWork.filter((e: Work) => e.ID === newWork.ID).map((e: Work) => e = newWork));
            }
            toast.success("Edited work");
        }).catch(() => {
            toast.error("Failed to edit work");
        });
    };

    return (
        <Fragment>
            <Header updateFilters={updateFilters} currentFilters={filter} createWork={createWork} />
            {modal === Usage.Edit && modalWork &&
                <DraftWorklog
                    usage={modal}
                    onClose={(w: Work | undefined) => {
                        if (w !== undefined) {
                            editWork(w);
                        }
                        setModal(undefined);
                    }}
                    pastWork={modalWork}
                />
            }
            <Routes>
                <Route path="/" element={<Worklist
                    Worklist={filteredWork}
                    openEdit={async (w: Work) => {
                        await setModalWork(w);
                        await setModal(Usage.Edit);
                    }} />} />
                <Route path="/timeline" element={<Worklist Worklist={filteredWork} openEdit={() => {setModal(Usage.Edit)}} />} />
                <Route path="/discover" element={<Discover TotalWork={allWork} FilteredWork={filteredWork} />} />
            </Routes>
        </Fragment>
    );
};

export default App;
