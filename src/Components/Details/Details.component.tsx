import React from "react";

import {
    format,
    isSameWeek,
    isSameDay,
    isSameHour,
    isSameMinute,
} from "date-fns";

import { Button } from "@zendeskgarden/react-buttons";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Well, Title, Paragraph } from "@zendeskgarden/react-notifications";
import { Tag } from "@zendeskgarden/react-tags";
import { PencilIcon, StopIcon, UserRemoveIcon, XCircleIcon, XIcon } from "@heroicons/react/solid";

import { Work } from "@model/work";

type Props = {
    work: Work,
    onClose: () => void;
};

const Details: React.FC<Props> = (props: Props) => {
    return (
        <Well isRecessed isFloating>
            <Grid>
                <Row>
                    <Col sm={7}>
                        <Title>{props.work.Title}</Title>
                    </Col>
                    <Col sm={4}>
                        <Paragraph>
                            {formatDateTime(props.work.When, props.work.Duration)}
                        </Paragraph>
                    </Col>
                    <Col sm={1}>
                        <Button onClick={props.onClose} aria-label="close">
                            <StopIcon className="h-5 w-5 text-gray-600" />
                            <UserRemoveIcon className="h-5 w-5 text-gray-600" />
                            <XCircleIcon className="h-5 w-5 text-gray-600" />
                            <XIcon className="h-5 w-5 text-gray-600" />
                        </Button>
                    </Col>
                </Row>
                {props.work.Description &&
                <Row>
                    <Col sm={11}>
                        <Paragraph>{props.work.Description}</Paragraph>
                    </Col>
                </Row>
                }
                <Row>
                    <Col sm={11}>
                        {props.work.Tags && props.work.Tags.map((el, index) => {
                            return (<Tag isPill key={index}>
                                {el}
                                <Tag.Close onClick={() => {
                                    alert("TODO, remove tag");
                                }} />
                            </Tag>);
                        })}
                    </Col>
                    <Col sm={1}>
                        <Button aria-label="edit">
                            <PencilIcon className="h-5 w-5 text-gray-600" />
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </Well>
    );
};

const formatDateTime = (d: Date, dur?: number): string => {
    return dur?
        `${formatRelativeDate(d)}` :
        `${formatRelativeDate(d)} for ${dur} minutes.`;
};

const formatRelativeDate = (d: Date): string => {
    const now = new Date();
    if (isSameMinute(d, now)) {
        return "A few seconds ago";
    } else if (isSameHour(d, now)) {
        return `This hour at ${d.getHours()}:${d.getMinutes()}`;
    } else if (isSameDay(d, now)) {
        return `Today at ${d.getHours()}:${d.getMinutes()}`;
    } else if (isSameWeek(d, now)) {
        return `${format(d, "EEEE")} at ${d.getHours()}:${d.getMinutes()}`;
    } else {
        return format(d, "d MMMM yyyy HH:mm");
    }
};

export default Details;
