import React, { useState } from "react";

import Button from "@component/Button/Button.component";
import Details from "@component/Details/Details.component";
import Table from "@view/Table/Table.view";
import Timeline from "@view/Timeline/Timeline.view";

import { Work } from "@model/work";

import { ViewListIcon } from "@heroicons/react/outline";

import { isEqual } from "date-fns";
import { isBefore } from "@helper/date";

const sortedWork = (wk: Work[]): Work[] => {
    return [...wk].sort((a, b): number => {
        if (isEqual(a.When, b.When)) {
            return 0;
        } else {
            return isBefore(a.When, b.When) ? 1 : -1;
        }
    });
};

type Props = {
    Worklist: Work[],
};

const Worklist: React.FC<Props> = (props: Props) => {
    const [detailedWork, setDetailedWork] = useState<Work | undefined>();
    const [isTableView, setTableView] = useState<boolean>(false);

    const loadDetailed = (detail: Work): void => {
        setDetailedWork(detail);
    };

    const removeDetailed = (): void => {
        setDetailedWork(undefined);
        setTableView(false);
    };

    const toggleTableView = (): void => {
        setTableView(!isTableView);
    };

    return (
        <div className="flex relative justify-center min-h-full" >
            <div className="absolute top-0 right-0">
                <Button isBasic onClick={toggleTableView} label="Toggle table and timeline">
                    <ViewListIcon className="h-5 w-5" />
                </Button>
            </div>
            {!detailedWork && !isTableView &&
                <Timeline Worklist={sortedWork(props.Worklist)} onLoadDetailed={loadDetailed} />
            }
            {!detailedWork && isTableView &&
                <Table Worklist={sortedWork(props.Worklist)} />
            }

            {detailedWork &&
                <Details work={detailedWork} onClose={removeDetailed} className="m-4" />
            }
        </div>
    );
};

export default Worklist;
