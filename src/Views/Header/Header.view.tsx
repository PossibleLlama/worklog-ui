import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { BookmarkIcon, FunnelIcon, GlobeAltIcon, PlusIcon } from "@heroicons/react/24/outline";

import SidebarIcon from "@component/SidebarIcon/SidebarIcon.component";
import FilterModal from "@view/Filters/FiltersModal.view";
import CreateModal from "@view/Create/CreateModal.view";

import { Filter, isEqual } from "@model/filter";
import { Work } from "@model/work";

type Props = {
    updateFilters: (filters: Filter) => void,
    currentFilters: Filter,
    createWork: (w: Work | undefined) => Promise<Work | void>;
};

const Header: React.FC<Props> = (props: Props) => {
    const [filterModal, setFilterModal] = useState<boolean>(false);
    const [createModal, setCreateModal] = useState<boolean>(false);

    const openFilterModal = (): void => {
        setFilterModal(true);
    };

    const openCreateModal = (): void => {
        setCreateModal(true);
    };

    const closeFilterModal = (filter: Filter): void => {
        setFilterModal(false);
        if (!isEqual(props.currentFilters, filter)) {
            props.updateFilters(filter);
            toast.success("Successfully updated filter");
        }
    };

    const closeCreateModal = (w: Work | undefined): void => {
        setCreateModal(false);
        if (w !== undefined) {
            props.createWork(w);
        }
    };

    return (
        <div>
            <div className="mb-16" />
            <div className="fixed top-0 left-0 w-screen h-16 z-10 bg-stone-100 shadow-lg flex px-2 justify-between items-center">
                <Link to="/" className="sidebar-item ml-4 px-4 rounded-3xl hover:rounded-xl group">
                    <button className="cursor-default">
                        <div className="heading-text text-lg colour-text-primary">Worklog</div>
                        <span className="sidebar-tooltip group-hover:scale-100 top-14">
                            Home
                        </span>
                    </button>
                </Link>
                <button onClick={openFilterModal}>
                    <SidebarIcon tooltipText="Filter">
                        <FunnelIcon className="h-5/6 colour-text-primary" />
                    </SidebarIcon>
                </button>
                <button onClick={openCreateModal}>
                    <SidebarIcon tooltipText="New">
                        <PlusIcon className="h-5/6 colour-text-primary" />
                    </SidebarIcon>
                </button>
                <nav className="flex mr-4">
                    <Link to="/timeline" className="px-1">
                        <button>
                            <SidebarIcon tooltipText="Timeline">
                                <BookmarkIcon className="h-5/6 colour-text-primary" />
                            </SidebarIcon>
                        </button>
                    </Link>
                    <Link to="/discover" className="px-1">
                        <button>
                            <SidebarIcon tooltipText="Discover">
                                <GlobeAltIcon className="h-5/6 colour-text-primary" />
                            </SidebarIcon>
                        </button>
                    </Link>
                </nav>
                {filterModal &&
                    <FilterModal
                        onClose={closeFilterModal}
                        initialFilters={props.currentFilters}
                    />}
                {createModal &&
                    <CreateModal
                        onClose={closeCreateModal}
                    />
                }
            </div>
        </div>
    );
};

export default Header;
