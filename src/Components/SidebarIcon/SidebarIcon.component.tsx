import React from "react";

type Props = {
    tooltipText: string,
    children: React.ReactNode,
};

const SidebarIcon: React.FC<Props> = (props: Props) => {
    return (
        <div className="relative flex items-center justify-center h-12 w-12 m-auto bg-stone-200 hover:bg-stone-600 text-gray-800 hover:text-gray-200 rounded-3xl hover:rounded-xl transition-all ease-linear cursor-default group">
            {props.children}
            <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md bg-stone-600 text-gray-200 text-xs font-bold transition-all duration-100 origin-left scale-0 group-hover:scale-100">
                {props.tooltipText}
            </span>
        </div>
    );
};

export default SidebarIcon;
