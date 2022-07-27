import React from "react";

type Props = {
    onClick: () => void,
    label: string,
    children: React.ReactNode,
    isPrimary?: boolean,
    isBasic?: boolean,
};

const Button: React.FC<Props> = (props: Props) => {
    return (
        <button onClick={props.onClick} aria-label={props.label} className={`border-solid border-2 rounded-md p-2 ${styleFromProps(props)}`}>
            {props.children}
        </button>
    );
};

const styleDefault = "bg-stone-200 hover:bg-stone-800 text-gray-800 hover:text-gray-200";

// Note: Unable to unit test the styling, as jest doesn't know about tailwind
const styleFromProps = (props: Props): string => {
    return props.isPrimary ?
        "bg-amber-300 hover:bg-orange-700 text-gray-800 hover:text-gray-200" :
        props.isBasic ?
            "hover:bg-stone-200 text-gray-800" :
            styleDefault;
};

export default Button;
