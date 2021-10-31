import React from "react";

import styled from "styled-components";

import Details from "@component/Details/Details.component";

import { Work } from "@model/work";

type Props = {
    onClose: () => void,
    detail: Work,
};

const Detail: React.FC<Props> = (props: Props) => {
    return (
        <Wrapper>
            <Details work={props.detail} onClose={props.onClose}/>
        </Wrapper>
    );
};

const Wrapper: React.FC = styled.div`
    width: 100%;
    display: flex;

    justify-content: center;
`;

export default Detail;
