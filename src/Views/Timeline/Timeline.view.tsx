import React from "react";

import VerticalTimelineElement from "@component/Timeline/VerticalElement.component";

import { Work } from "@model/work";

type Props = {
    Worklist: Work[],
    onLoadDetailed: (detail: Work) => void,
};

const Timeline: React.FC<Props> = (props: Props) => {
    return (
        <div className="">
            {props.Worklist.map((wl) => {
                return (
                    <VerticalTimelineElement
                        key={wl.ID}
                        Work={wl}
                        onLoadDetailed={props.onLoadDetailed} />
                );
            })}
        </div>
    );
};

export default Timeline;
