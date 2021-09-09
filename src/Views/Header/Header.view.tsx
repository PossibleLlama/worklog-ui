import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Paragraph, SM, MD, LG } from "@zendeskgarden/react-typography";

const Header: React.FC = () => {
    return (
        <Wrapper>
            <Name>
                <Link to="/">
                    <LG>Worklog</LG>
                </Link>
                <Paragraph size="small">
                    <SM>A productivity app.</SM>
                </Paragraph>
            </Name>

            <Pages>
                <Link to="/timeline">
                    <MD>Timeline</MD>
                </Link>
                <Link to="/discover">
                    <MD>Discover</MD>
                </Link>
            </Pages>
        </Wrapper>
    );
};

const Wrapper: React.FC = styled.div`
    height: 36px;
    width: 100%;
    display: flex;

    justify-content: space-between;

    a {
        text-decoration: none;
        color: inherit;
    };
`;

const Name: React.FC = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;

    justify-content: flex-start;

    a {
        padding: 8px 16px;
    };

    p {
        margin-top: auto;
        padding: 0px 16px;
    };
`;

const Pages: React.FC = styled.div`
    height: 100%;
    width: 50%;
    display: flex;

    justify-content: flex-end;

    a {
        padding: 8px 16px;
    };
`;

export default Header;
