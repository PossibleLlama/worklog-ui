import React, { useContext } from "react";

import { ThemeContext } from "styled-components";

import Container from "@component/Timeline/Container.component";
import TimelineLine from "@component/Timeline/TimelineLine.component";
import VerticalTimelineElement from "@component/Timeline/VerticalElement.component";

import { Work } from "@model/work";

type Props = {
    Worklist: Work[],
    onLoadDetailed: (detail: Work) => void,
};

const Timeline: React.FC<Props> = (props: Props) => {
    const theme = useContext(ThemeContext);

    return (
        <Container>
            <TimelineLine BackgroundColor={theme.primaryHue} />
            {props.Worklist.map((wl) => {
                return (
                    <VerticalTimelineElement
                        key={wl.ID}
                        Work={wl}
                        onLoadDetailed={props.onLoadDetailed} />
                );
            })}
        </Container>
    );
};

export default Timeline;
