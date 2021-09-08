import React, { useContext } from "react";

import { Title, Paragraph } from "@zendeskgarden/react-notifications";
import Worklist from "@page/Worklist.page";

import getWorklogByRange from "@api/getWorklogByRange/getWorklogByRange";
import styled, { ThemeContext } from "styled-components";

const App: React.FC = () => {
    const theme = useContext(ThemeContext);

    return (
        <Wrapper BackgroundColor={theme.background}>
            <Title>Worklog</Title>
            <Paragraph>A productivity app.</Paragraph>

            <Worklist Worklist={getWorklogByRange(new Date())}/>
        </Wrapper>
    );
};

type ThemingProps = {
    BackgroundColor: string;
};

const Wrapper = styled.div.attrs((props: ThemingProps) => props)`
    height: 100%;
    width: 100%;
    background-color: ${props => props.BackgroundColor};
`;

export default App;
