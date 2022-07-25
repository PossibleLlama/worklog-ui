import React from "react";

import { format, formatRelative, isSameWeek } from "date-fns";

import { Button } from "@zendeskgarden/react-buttons";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Well, Title, Paragraph } from "@zendeskgarden/react-notifications";
import { EyeIcon } from "@heroicons/react/solid";

import { Work } from "@model/work";

type Props = {
    work: Work,
    onLoadDetailed: (detail: Work) => void,
};

const Preview: React.FC<Props> = (props: Props) => {
    return (
        <Well isRecessed isFloating>
            <Grid>
                <Row>
                    <Col sm={5}>
                        <Title>{props.work.Title}</Title>
                    </Col>
                    <Col sm={5}>
                        <Paragraph>{isSameWeek(new Date(), props.work.When) ?
                            formatRelative(props.work.When, new Date()) :
                            format(props.work.When, "d MMMM yyyy")}
                        </Paragraph>
                    </Col>
                    <Col sm={2}>
                        <Button onClick={() => props.onLoadDetailed(props.work)}>
                            <EyeIcon className="h-5 w-5 text-gray-600" />
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </Well>
    );
};

export default Preview;
