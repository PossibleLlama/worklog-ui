import React from "react";

import Usage from "@view/Usage/Usage.view";
import Wordcloud from "@view/Wordcloud/Wordcloud.view";

import { Work } from "@model/work";
import { wordDataFrequencyOfTags } from "@helper/array";

type Props = {
    TotalWork: Work[],
    FilteredWork: Work[],
};

const Discover: React.FC<Props> = (props: Props) => {
    return (
        <div className="relative justify-center py-4" >
            <Usage {...props} />
            <Wordcloud words={wordDataFrequencyOfTags(props.FilteredWork)} />
        </div>
    );
};

export default Discover;
