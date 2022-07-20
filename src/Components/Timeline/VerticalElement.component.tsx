import React from "react";

import Preview from "@component/Preview/Preview.component";

import { Work } from "@model/work";

type VerticalTimelineElementProps = {
    Work: Work,
    onLoadDetailed: (detail: Work) => void,
};

const VerticalTimelineElement: React.FC<VerticalTimelineElementProps> = (props: VerticalTimelineElementProps) => {

    return (
        <div className="">
            <Preview work={props.Work} onLoadDetailed={props.onLoadDetailed} />
        </div>
    );
};

export default VerticalTimelineElement;
