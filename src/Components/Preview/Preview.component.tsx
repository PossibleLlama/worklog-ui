import React from "react";

import Button from "@component/Button/Button.component";

import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Well, Title, Paragraph } from "@zendeskgarden/react-notifications";
import { EyeIcon } from "@heroicons/react/solid";

import { Work } from "@model/work";
import { formatRelativeDateTime } from "@helper/date";

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
                        <Paragraph>{formatRelativeDateTime(props.work.When)}
                        </Paragraph>
                    </Col>
                    <Col sm={2}>
                        <Button onClick={() => props.onLoadDetailed(props.work)} label="Open">
                            <EyeIcon className="h-5 w-5" />
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </Well>
    );
};

export default Preview;
