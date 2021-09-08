import styled from "styled-components";

type ThemingProps = {
    BackgroundColor: string;
};

const TimelineLine = styled.div.attrs((props: ThemingProps) => props)`
    position: absolute;
    left: calc(50% - 2px);
    width: 4px;
    height: 100%;
    background-color: ${props => props.BackgroundColor};
`;

export default TimelineLine;
