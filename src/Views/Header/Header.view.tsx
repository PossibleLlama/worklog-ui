import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Button } from "@zendeskgarden/react-buttons";
import { Paragraph, SM, LG } from "@zendeskgarden/react-typography";

import Modal from "@view/Filters/FiltersModal.view";

import { Filter } from "@model/filter";

type Props = {
    updateFilters: (filters: Filter) => void,
    currentFilters: Filter,
};

const Header: React.FC<Props> = (props: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const openFilterModal = (): void => {
        setOpenModal(true);
    };

    const closeFilterModal = (filter: Filter): void => {
        setOpenModal(false);
        if (props.currentFilters !== filter) {
            props.updateFilters(filter);
        }
    };

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

            <FilterButton>
                <Button isBasic onClick={openFilterModal}>
                    Filter
                </Button>
            </FilterButton>

            <NavButtons>
                <Button isBasic>
                    <Link to="/timeline">
                        Timeline
                    </Link>
                </Button>
                <Button isBasic>
                    <Link to="/discover">
                        Discover
                    </Link>
                </Button>
            </NavButtons>
            {openModal &&
                <Modal
                    onClose={closeFilterModal}
                    initalFilters={props.currentFilters}
                />}
        </Wrapper>
    );
};

const Wrapper: React.FC = styled.div`
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
    width: 30%;
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

const FilterButton: React.FC = styled.div`
    height: 100%;
    width: 30%;
    display: flex;
`;

const NavButtons: React.FC = styled.div`
    height: 100%;
    width: 40%;
    display: flex;

    justify-content: flex-end;

    a {
        padding: 8px 16px;
    };
`;

export default Header;
