import React from "react";

import Usage from "@view/Usage/Usage.view";
import Wordcloud from "@view/Wordcloud/Wordcloud.view";

import { Work } from "@model/work";

type Props = {
    TotalWork: Work[],
    FilteredWork: Work[],
};

const Discover: React.FC<Props> = (props: Props) => {
    return (
        <div className="relative justify-center py-4" >
            <Usage {...props} />
            {/* TODO, update to use frequency of tags */}
            <Wordcloud words={props.FilteredWork.map((wk) => {
                return {text: wk.Title, value: wk.Duration ?? 10};
            })} />
        </div>
    );
};

export default Discover;
