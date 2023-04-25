import React from "react";

import Details from "@component/Details/Details.component";

import { Work } from "@model/work";

type Props = {
    onClose: () => void,
    openEdit: (w: Work) => void,
    detail: Work,
};

const Detail: React.FC<Props> = (props: Props) => {
    return (
        <Details
            work={props.detail}
            onClose={props.onClose}
            openEdit={props.openEdit}
        />
    );
};

export default Detail;
