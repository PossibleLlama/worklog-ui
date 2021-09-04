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
};

const Details: React.FC<Props> = (props: Props) => {
    return (
        <Well isRecessed isFloating>
            <Grid>
                <Row>
                    <Col sm={8}>
                        <Title>{props.work.Title}</Title>
                    </Col>
                    <Col sm={4}>
                        <Paragraph>{isSameWeek(new Date(), props.work.When) ?
                            formatRelative(props.work.When, new Date()) :
                            format(props.work.When, "d MMMM yyyy HHmm")}
                        {props.work.Duration && ` for ${props.work.Duration} minutes.`}
                        </Paragraph>
                    </Col>
                </Row>
                {props.work.Description &&
                <Row>
                    <Paragraph>{props.work.Description}</Paragraph>
                </Row>
                }
                <Row>
                    <Col sm={10}>
                        {props.work.Tags && props.work.Tags.map((el, index) => {
                            return (<Tag isPill key={index}>
                                {el}
                                <Tag.Close onClick={() => {
                                    alert("TODO, remove tag");
                                }} />
                            </Tag>);
                        })}
                    </Col>
                    <Col sm={2}>
                        <Button>
                            <Octicon name="pencil" />
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </Well>
    );
};

export default Details;
