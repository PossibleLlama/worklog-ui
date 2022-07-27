import React from "react";

import { Button } from "@zendeskgarden/react-buttons";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Well, Title, Paragraph } from "@zendeskgarden/react-notifications";
import { Tag } from "@zendeskgarden/react-tags";
import { PencilIcon, XIcon } from "@heroicons/react/solid";

import { formatDateTime } from "@helper/date";
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
                            return (<Tag isPill key={index} className="m-1">
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

export default Details;
