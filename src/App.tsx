import React from "react";

import { Badge, Card, CardBody } from "@windmill/react-ui";

export const App: React.FC = () => {
    return (
        <Card className="flex">
            <CardBody>
                <p className="font-semibold text-gray-600 dark:test-gray-300">Worklog</p>
                <p className="text-gray-600 dark:test-gray-400">I am testing this out.</p>
                <Badge type="danger">#productivity</Badge>
            </CardBody>
        </Card>
    );
};

export default App;
