import React, { useState } from "react";

import Timeline from "@view/Timeline/Timeline.view";

import Details from "@component/Details/Details.component";

import { Work } from "@model/work";

type Props = {
    Worklist: Work[],
};

const Worklist: React.FC<Props> = (props: Props) => {
    const [detailedWork, setDetailedWork] = useState<Work | undefined>();
    const loadDetailed = (detail: Work): void => {
        setDetailedWork(detail);
    };

    return (
        <React.Fragment>
            <Timeline Worklist={props.Worklist} onLoadDetailed={loadDetailed}/>
            {detailedWork &&
                <Details work={detailedWork}/>
            }
        </React.Fragment>
    );
};

export default Worklist;
