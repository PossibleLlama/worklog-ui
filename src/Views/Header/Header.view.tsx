import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BookmarkIcon, FilterIcon, GlobeAltIcon } from "@heroicons/react/solid";

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
        <div className="fixed top-0 left-0 w-screen h-16 z-10 bg-stone-100 shadow-lg flex px-2 justify-between items-center">
            <Link to="/">
                <h1 className="text-lg text-gray-800">Worklog</h1>
                <p className="text-sm text-gray-500">A productivity app</p>
            </Link>
            <button onClick={openFilterModal}>
                <SidebarIcon tooltipText="Filter">
                    <FilterIcon className="h-5/6" />
                </SidebarIcon>
            </button>
            <nav className="flex">
                <Link to="/timeline" className="px-1">
                    <button>
                        <SidebarIcon tooltipText="Timeline">
                            <BookmarkIcon className="h-5/6" />
                        </SidebarIcon>
                    </button>
                </Link>
                <Link to="/discover" className="px-1">
                    <button>
                        <SidebarIcon tooltipText="Discover">
                            <GlobeAltIcon className="h-5/6" />
                        </SidebarIcon>
                    </button>
                </Link>
            </nav>
            {openModal &&
                <Modal
                    onClose={closeFilterModal}
                    initalFilters={props.currentFilters}
                />}
        </div>
    );
};

export default Header;
