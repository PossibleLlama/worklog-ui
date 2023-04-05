import React from "react";

type Props = {
    onClick: () => void,
    label: string,
    children: React.ReactNode,
    isPrimary?: boolean,
    isBasic?: boolean,
    isSubmit?: boolean,
    className?: string,
};

const Button: React.FC<Props> = (props: Props) => {
    return (
        <button
            onClick={props.onClick}
            type={props.isSubmit ? "submit" : "button"}
            aria-label={props.label}
            className={`${props.className} cursor-default border-solid border-2 border-transparent rounded-md p-2 hover:rounded-xl sidebar-item colour-text-primary ${styleFromProps(props)}`}>
            {props.children}
        </button>
    );
};

const styleDefault = "bg-stone-200 hover:bg-stone-800";

// Note: Unable to unit test the styling, as jest doesn't know about tailwind
const styleFromProps = (props: Props): string => {
    return props.isPrimary ?
        "bg-amber-300 hover:bg-orange-700" :
        props.isBasic ?
            "bg-stone-200 hover:bg-stone-600" :
            styleDefault;
};

export default Button;
