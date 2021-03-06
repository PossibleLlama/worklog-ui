import React, { useState } from "react";

import Timeline from "@view/Timeline/Timeline.view";

import Detail from "@view/Timeline/Details.view";

import { Work } from "@model/work";

type Props = {
    Worklist: Work[],
};

const Worklist: React.FC<Props> = (props: Props) => {
    const [detailedWork, setDetailedWork] = useState<Work | undefined>();

    const loadDetailed = (detail: Work): void => {
        setDetailedWork(detail);
    };
    const removeDetailed = (): void => {
        setDetailedWork(undefined);
    };

    return (
        <React.Fragment>
            {!detailedWork &&
                <Timeline Worklist={props.Worklist} onLoadDetailed={loadDetailed}/>
            }

            {detailedWork &&
                <Detail detail={detailedWork} onClose={removeDetailed}/>
            }
        </React.Fragment>
    );
};

export default Worklist;
