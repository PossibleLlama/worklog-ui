import React from "react";

import Details from "@component/Details/Details.component";

import { Work } from "@model/work";

type Props = {
    onClose: () => void,
    detail: Work,
};

const Detail: React.FC<Props> = (props: Props) => {
    return (
        <div className="">
            <Details work={props.detail} onClose={props.onClose} />
        </div>
    );
};

export default Detail;
