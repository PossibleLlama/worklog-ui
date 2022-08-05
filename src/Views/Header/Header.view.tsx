import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { BookmarkIcon, FilterIcon, GlobeAltIcon } from "@heroicons/react/solid";

import SidebarIcon from "@component/SidebarIcon/SidebarIcon.component";
import Modal from "@view/Filters/FiltersModal.view";

import { Filter, isEqual } from "@model/filter";

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
        if (!isEqual(props.currentFilters, filter)) {
            props.updateFilters(filter);
            toast.success("Successfully updated filter");
            console.log("updated filter");
        }
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-16 z-10 bg-stone-100 shadow-lg flex px-2 justify-between items-center">
            <Link to="/" className="sidebar-item ml-4 px-4 rounded-3xl hover:rounded-xl group">
                <button className="cursor-default">
                    <div className="text-lg font-bold">Worklog</div>
                    <span className="sidebar-tooltip group-hover:scale-100 top-14">
                        Home
                    </span>
                </button>
            </Link>
            <button onClick={openFilterModal}>
                <SidebarIcon tooltipText="Filter">
                    <FilterIcon className="h-5/6" />
                </SidebarIcon>
            </button>
            <nav className="flex mr-4">
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
