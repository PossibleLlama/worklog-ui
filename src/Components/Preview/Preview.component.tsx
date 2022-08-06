import React from "react";

import Button from "@component/Button/Button.component";
import Container from "@component/Container/Container.component";

import { EyeIcon } from "@heroicons/react/solid";

import { Work } from "@model/work";
import { formatRelativeDateTime } from "@helper/date";

type Props = {
    work: Work,
    onLoadDetailed: (detail: Work) => void,
};

const Preview: React.FC<Props> = (props: Props) => {
    return (
        <Container className="flex justify-between items-center">
            <div className="w-1/3" >
                <h3 className="text-sm heading" >{props.work.Title}</h3>
            </div>
            <p className="text-sm subheading" >{formatRelativeDateTime(props.work.When)}</p>
            <Button onClick={() => props.onLoadDetailed(props.work)} label="Open" className="float-right" >
                <EyeIcon className="h-5 w-5" />
            </Button>
        </Container>
    );
};

export default Preview;
