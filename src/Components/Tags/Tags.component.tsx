import React from "react";

import Button from "@component/Button/Button.component";

import { XIcon } from "@heroicons/react/outline";

type Props = {
    children: React.ReactNode,
    onClose?: () => void,
};

const Tag: React.FC<Props> = (props: Props) => {
    return (
        <div className="h-5 m-1 ml-0 rounded-lg inline-flex text-center bg-stone-200 hover:bg-stone-800 text-gray-800 hover:text-gray-200 group" >
            <div className="pl-2" >
                {props.children}
            </div>
            {props.onClose &&
                <Button onClick={props.onClose} label="Remove" className="border-0 py-0 group-hover:bg-stone-800 group-hover:text-gray-200 items-center" >
                    <XIcon className="h-3 w-3" />
                </Button>
            }
        </div>
    );
};

export default Tag;
