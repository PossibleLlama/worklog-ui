import React from "react";

import { Button } from "@zendeskgarden/react-buttons";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Well, Title, Paragraph } from "@zendeskgarden/react-notifications";
import { Tag } from "@zendeskgarden/react-tags";

import Octicon from "react-component-octicons";

export const App: React.FC = () => {
    return (
        <Well isRecessed isFloating>
            <Grid>
                <Row>
                    <Title>Worklog</Title>
                </Row>
                <Row>
                    <Paragraph>Productivity tool for tracking work done.</Paragraph>
                </Row>
                <Row>
                    <Col sm={10}>
                        <Tag isPill>
                            #worklog
                            <Tag.Close onClick={() => {
                                alert("Tag dismissed via mouse");
                            }} />
                        </Tag>
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

export default App;
