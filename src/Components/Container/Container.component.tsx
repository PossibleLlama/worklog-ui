import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

const Container: React.FC<Props> = (props: Props) => {
    return (
        <div className={`p-5 outline-1 outline-gray-200 rounded-lg drop-shadow-lg colour-bg-primary-lighter-no-hover ${props.className}`} >
            {props.children}
        </div>
    );
};

export default Container;
