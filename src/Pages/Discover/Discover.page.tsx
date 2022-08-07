import React from "react";

import Usage from "@view/Usage/Usage.view";

import { Work } from "@model/work";

type Props = {
    TotalWork: Work[],
    FilteredWork: Work[],
};

const Discover: React.FC<Props> = (props: Props) => {
    return (
        <div className="flex relative justify-center py-4" >
            <Usage {...props} />
        </div>
    );
};

export default Discover;
