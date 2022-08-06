import React from "react";

import Button from "@component/Button/Button.component";
import Container from "@component/Container/Container.component";
import Tag from "@component/Tags/Tags.component";

import { PencilIcon, XIcon } from "@heroicons/react/solid";

import { formatRelativeDateTimeDuration } from "@helper/date";
import { Work } from "@model/work";

type Props = {
    work: Work,
    onClose: () => void,
    className?: string,
};

const Details: React.FC<Props> = (props: Props) => {
    return (
        <Container className={`${props.className}`} >
            <div className="p-6 px-8" >
                <div className="flex justify-between my-1">
                    <h2 className="w-1/2 text-lg heading" >
                        {props.work.Title}
                    </h2>
                    <p className="text-base subheading w-1/3" >
                        {formatRelativeDateTimeDuration(props.work.When, props.work.Duration)}
                    </p>
                    <div className="w-5 h-5" >
                        <Button onClick={props.onClose} label="Close" >
                            <XIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                {props.work.Description &&
                    <p className="max-w-prose text-base bodytext">{props.work.Description}</p>
                }
                <div className="flex justify-between my-1">
                    <div className="w-5/6">
                        {props.work.Tags && props.work.Tags.map((el, index) => {
                            return (<Tag key={index} onClose={() => {
                                alert("TODO, remove tag");
                            }} >
                                <p className="text-sm" >{el}</p>
                            </Tag>);
                        })}
                    </div>
                    <div className="w-5 h-5" >
                        <Button onClick={() => {
                            alert("TODO, edit work");
                        }} label="Edit" >
                            <PencilIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Details;
