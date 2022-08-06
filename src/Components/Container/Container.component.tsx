import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

const Container: React.FC<Props> = (props: Props) => {
    return (
        <div className={`p-5 bg-stone-100 outline-1 outline-gray-200 drop-shadow-lg ${props.className}`} >
            {props.children}
        </div>
    );
};

export default Container;
