import React, { useState } from "react";

import Details from "@component/Details/Details.component";
import Table from "@view/Table/Table.view";
import Timeline from "@view/Timeline/Timeline.view";

import { Button } from "@zendeskgarden/react-buttons";
import { ViewListIcon } from "@heroicons/react/solid";

import { Work } from "@model/work";

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
        <div className="flex relative justify-center mt-16 min-h-full">
            <div className="absolute top-0 right-0">
                <Button isBasic onClick={toggleTableView}>
                    <ViewListIcon className="h-5 w-5 text-gray-600" />
                </Button>
            </div>
            {!detailedWork && !isTableView &&
                <Timeline Worklist={props.Worklist} onLoadDetailed={loadDetailed} />
            }
            {!detailedWork && isTableView &&
                <Table Worklist={props.Worklist} />
            }

            {detailedWork &&
                <Details work={detailedWork} onClose={removeDetailed} />
            }
        </div>
    );
};

export default Worklist;
