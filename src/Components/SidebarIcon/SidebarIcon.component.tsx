import React from "react";

type Props = {
    tooltipText?: string,
    children: React.ReactNode,
};

const SidebarIcon: React.FC<Props> = (props: Props) => {
    return (
        <div className="sidebar-icon group rounded-3xl hover:rounded-xl">
            {props.children}
            {props.tooltipText &&
                <span className="sidebar-tooltip group-hover:scale-100">
                    {props.tooltipText}
                </span>}
        </div>
    );
};

export default SidebarIcon;
