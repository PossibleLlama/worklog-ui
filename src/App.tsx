import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styled, { ThemeContext } from "styled-components";

import Worklist from "@page/Worklist/Worklist.page";
import Header from "@view/Header/Header.view";

import getWorklogByRange from "@api/getWorklogByRange/getWorklogByRange";

import { Filter } from "@model/filter";
import { Work } from "@model/work";

const App: React.FC = () => {
    const theme = useContext(ThemeContext);

    const [filter, setFilter] = useState<Filter>({
        startDate: new Date(),
    });

    const [work, setWork] = useState<Work[]>([]);

    useEffect(() => {
        getWorklogByRange(filter)
            .then((data) => {
                setWork(data);
            });
    }, [filter]);

    const updateFilters = (filter: Filter): void => {
        setFilter(filter);
    };

    return (
        <Wrapper BackgroundColor={theme.background}>
            <Router>
                <Header updateFilters={updateFilters} currentFilters={filter} />
                <Switch>
                    <Route exact path="/" >
                        <Worklist Worklist={work}/>
                    </Route>
                    <Route path="/timeline" >
                        <Worklist Worklist={work}/>
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
