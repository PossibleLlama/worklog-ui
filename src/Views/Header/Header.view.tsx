import React, { useState } from "react";
// import { Link } from "react-router-dom";

import { BookmarkIcon, FilterIcon, GlobeAltIcon } from "@heroicons/react/solid";

import { Button } from "@zendeskgarden/react-buttons";
import { Alert, Close, useToast } from "@zendeskgarden/react-notifications";

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
        <div className="fixed w-screen top-0 flex flex-row border-b-2 border-stone-200 bg-stone-100">
            <div className="basis-1/3">
                <div className="px-2">
                    {/* <Link to="/"> */}
                    <h1 className="text-lg text-gray-800">Worklog</h1>
                    <p className="text-sm text-gray-500">A productivity app</p>
                    {/* </Link> */}
                </div>
            </div>

            <div className="basis-1/3">
                <Button isBasic onClick={openFilterModal}>
                    <FilterIcon className="h-5 w-5 text-gray-600" />
                    &nbsp;<h2 className="text-gray-600">Filter</h2>
                </Button>
            </div>

            <div className="basis-1/3">
                <Button isBasic>
                    {/* <Link to="/timeline"> */}
                    <BookmarkIcon className="h-5 w-5 text-gray-600"/>
                    &nbsp;<h2 className="text-gray-600">Timeline</h2>
                    {/* </Link> */}
                </Button>
                <Button isBasic>
                    {/* <Link to="/discover"> */}
                    <GlobeAltIcon className="h-5 w-5 text-gray-600"/>
                    &nbsp;<h2 className="text-gray-600">Discover</h2>
                    {/* </Link> */}
                </Button>
            </div>
            {openModal &&
                <Modal
                    onClose={closeFilterModal}
                    initalFilters={props.currentFilters}
                />}
        </div>
    );
};

export default Header;
