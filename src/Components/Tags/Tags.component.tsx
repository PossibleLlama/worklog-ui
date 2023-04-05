import React from "react";

type Props = {
    children: React.ReactNode,
    onClose?: () => void,
};

const Tag: React.FC<Props> = (props: Props) => {
    return (
        <div className="h-5 mx-1 rounded-lg inline-flex text-center bg-stone-200 hover:bg-stone-800 colour-text-primary flip-flop" >
            <div className="px-2" >
                {props.children}
            </div>
        </div>
    );
};

export default Tag;
