import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Worklist from "@page/Worklist/Worklist.page";
import Header from "@view/Header/Header.view";

import getWorklogByRange from "@api/getWorklogByRange/getWorklogByRange";
import styled, { ThemeContext } from "styled-components";

const App: React.FC = () => {
    const theme = useContext(ThemeContext);

    return (
        <Wrapper BackgroundColor={theme.background}>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" >
                        <Worklist Worklist={getWorklogByRange(new Date())}/>
                    </Route>
                    <Route path="/timeline" >
                        <Worklist Worklist={getWorklogByRange(new Date())}/>
                    </Route>
                    <Route path="/discover" >
                        <h1>Coming soon</h1>
                    </Route>
                </Switch>
            </Router>
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
