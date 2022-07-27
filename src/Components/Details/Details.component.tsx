import React from "react";

import Button from "@component/Button/Button.component";
import Tag from "@component/Tags/Tags.component";

import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Well, Title, Paragraph } from "@zendeskgarden/react-notifications";
import { PencilIcon, XIcon } from "@heroicons/react/solid";

import { formatRelativeDateTimeDuration } from "@helper/date";
import { Work } from "@model/work";

type Props = {
    work: Work,
    onClose: () => void,
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
                            {formatRelativeDateTimeDuration(props.work.When, props.work.Duration)}
                        </Paragraph>
                    </Col>
                    <Col sm={1}>
                        <Button onClick={props.onClose} label="close">
                            <XIcon className="h-5 w-5" />
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
                            return (<Tag key={index} onClose={() => {
                                alert("TODO, remove tag");
                            }} >
                                {el}
                            </Tag>);
                        })}
                    </Col>
                    <Col sm={1}>
                        <Button onClick={() => {
                            alert("TODO, edit work");
                        }} label="edit">
                            <PencilIcon className="h-5 w-5" />
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </Well>
    );
};

export default Details;
