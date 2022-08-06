import React from "react";

import Container from "@component/Container/Container.component";

import { Work } from "@model/work";

type Props = {
    TotalWork: Work[],
    FilteredWork: Work[],
};

const Discover: React.FC<Props> = (props: Props) => {
    return (
        <div className="flex relative justify-center py-4" >
            <Container className="m-2" >
                <h2 className="heading" >Total logs</h2>
                <p className="subheading" >{props.TotalWork.length}</p>
            </Container>
            <Container className="m-2" >
                <h2 className="heading" >Logs in filter</h2>
                <p className="subheading" >{props.FilteredWork.length}</p>
            </Container>
        </div>
    );
};

export default Discover;
