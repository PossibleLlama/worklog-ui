import React from "react";

import { Badge, Button, Card, CardBody } from "@windmill/react-ui";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import EditIcon from "./Theme/edit.svg";

export const App: React.FC = () => {
    return (
        <Card className="flex">
            <CardBody>
                <p className="font-semibold text-gray-600 dark:test-gray-300">Worklog</p>
                <p className="text-gray-600 dark:test-gray-400">Productivity tool for tracking work done.</p>
                <div className="flex items-end justify-between">
                    <div>
                        <Badge type="primary">#worklog</Badge>
                    </div>
                    <div>
                        <Button size="small" layout="link" aria-label="Like" ><img src={EditIcon} alt="Edit"></img></Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default App;
