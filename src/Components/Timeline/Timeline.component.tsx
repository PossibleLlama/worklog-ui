import React, { useContext } from "react";

import styled, { ThemeContext } from "styled-components";

import Preview from "@component/Preview/Preview.component";

import { Work } from "@model/work";

type Props = {
    worklist: Work[],
};

const Timeline: React.FC<Props> = (props: Props) => {
    const theme = useContext(ThemeContext);

    return (
        <Container>
            <TimelineLine
                BackgroundColor={theme.primaryHue}
                BorderColor={theme.primaryHue} />
            {props.worklist.map((wl) => {
                return (
                    <VerticalTimelineElement
                        key={wl.ID}
                        Work={wl} />
                );
            })}
        </Container>
    );
};

const Container: React.FC = styled.div`
    margin: 40px 0px;

    display: flex;
    flex-direction: column;
    position: relative;
`;

type ThemingProps = {
    BackgroundColor: string;
    BorderColor: string;
};

const TimelineLine = styled.div.attrs((props: ThemingProps) => props)`
    position: absolute;
    left: calc(50% - 2px);
    width: 4px;
    height: 100%;
    background-color: ${props => props.BackgroundColor};
`;

type VerticalTimelineElementProps = {
    Work: Work,
};

const VerticalTimelineElement: React.FC<VerticalTimelineElementProps> = (props: VerticalTimelineElementProps) => {
    const theme = useContext(ThemeContext);

    return (
        <Content>
            <PreviewWrapper>
                <Preview work={props.Work} />
            </PreviewWrapper>
            <Point
                BackgroundColor={theme.primaryHue}
                BorderColor={theme.background} />
        </Content>
    );
};

const Content: React.FC = styled.div`
    display: flex;
    position: relative;
    margin: 10px 0px;
    width: calc(50% - 10px);

    justify-content: flex-end;

    &:nth-child(odd) {
        align-self: flex-end;
        justify-content: flex-start;
    }
`;

const PreviewWrapper: React.FC = styled.div`
    margin: 0 16px;
`;

const Point = styled.circle.attrs((props: ThemingProps) => props)`
    margin: 0 -21px;
    background-color: ${props => props.BackgroundColor};
    border: 3px solid ${props => props.BorderColor};
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 8px);
    width: 16px;
    height: 16px;
`;


export default Timeline;
