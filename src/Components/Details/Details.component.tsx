import React from "react";

import { format, formatRelative, isSameWeek } from "date-fns";

import { Button } from "@zendeskgarden/react-buttons";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Well, Title, Paragraph } from "@zendeskgarden/react-notifications";
import { Tag } from "@zendeskgarden/react-tags";

import Octicon from "react-component-octicons";

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
                        <Paragraph>{isSameWeek(new Date(), props.work.When) ?
                            formatRelative(props.work.When, new Date()) :
                            format(props.work.When, "d MMMM yyyy HH:mm")}
                        {props.work.Duration && ` for ${props.work.Duration} minutes.`}
                        </Paragraph>
                    </Col>
                    <Col sm={1}>
                        <Button onClick={props.onClose} aria-label="close">
                            <Octicon name="x" />
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
                            <Octicon name="pencil" />
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </Well>
    );
};

export default Details;
