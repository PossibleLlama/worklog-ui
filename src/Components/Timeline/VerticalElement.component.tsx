import React, { useContext } from "react";

import styled, { ThemeContext } from "styled-components";

import Preview from "@component/Preview/Preview.component";

import { Work } from "@model/work";

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

type ThemingProps = {
    BackgroundColor: string;
    BorderColor: string;
};

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

export default VerticalTimelineElement;
