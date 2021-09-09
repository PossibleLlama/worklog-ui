import React from "react";

import Timeline from "@view/TImeline/Timeline.view";

import { Work } from "@model/work";

type Props = {
    Worklist: Work[],
};

const Worklist: React.FC<Props> = (props: Props) => {
    return (
        <Timeline Worklist={props.Worklist}/>
    );
};

export default Worklist;
