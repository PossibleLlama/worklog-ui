import React from "react";

type Props = {
    children: React.ReactNode,
};

const Tag: React.FC<Props> = (props: Props) => {
    return (
        <div className="h-5 mx-1 rounded-lg inline-flex text-center colour-bg-primary-light colour-text-primary flip-flop" >
            <div className="px-2" >
                {props.children}
            </div>
        </div>
    );
};

export default Tag;
