import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BookmarkIcon, FilterIcon, GlobeAltIcon } from "@heroicons/react/solid";

import { Button } from "@zendeskgarden/react-buttons";
import { Alert, Close, useToast } from "@zendeskgarden/react-notifications";

import SidebarIcon from "@component/SidebarIcon/SidebarIcon.component";
import Modal from "@view/Filters/FiltersModal.view";

import { Filter, isEqual } from "@model/filter";

type Props = {
    updateFilters: (filters: Filter) => void,
    currentFilters: Filter,
};

const Header: React.FC<Props> = (props: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    
    const { addToast } = useToast();

    const openFilterModal = (): void => {
        setOpenModal(true);
    };

    const closeFilterModal = (filter: Filter): void => {
        setOpenModal(false);
        if (!isEqual(props.currentFilters, filter)) {
            props.updateFilters(filter);
            addToast(({ close }) => (
                <Alert type="success">
                    Successfully updated filter
                    <Close onClick={close} aria-label="Close" />
                </Alert>
            ));
        }
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-20 flex flex-col bg-stone-100 shadow-lg">
            <i>
                <h1 className="text-lg text-gray-800">Worklog</h1>
                <p className="text-sm text-gray-500">A productivity app</p>
            </i>
            <SidebarIcon tooltipText="Filter">
                <FilterIcon />
            </SidebarIcon>
            <SidebarIcon tooltipText="Timeline">
                <BookmarkIcon />
            </SidebarIcon>
            <SidebarIcon tooltipText="Discover">
                <GlobeAltIcon />
            </SidebarIcon>
            {openModal &&
                <Modal
                    onClose={closeFilterModal}
                    initalFilters={props.currentFilters}
                />}
        </div>
    );
};

export default Header;
