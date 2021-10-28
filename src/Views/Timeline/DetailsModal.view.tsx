import React from "react";

import { Modal as ZenModal, Body } from "@zendeskgarden/react-modals";

import Details from "@component/Details/Details.component";

import { Work } from "@model/work";

type Props = {
    onClose: () => void,
    detail: Work,
};

const Modal: React.FC<Props> = (props: Props) => {
    return (
        <ZenModal isLarge onClose={() => props.onClose}>
            <Body>
                <Details work={props.detail} onClose={props.onClose}/>
            </Body>
        </ZenModal>
    );
};

export default Modal;
