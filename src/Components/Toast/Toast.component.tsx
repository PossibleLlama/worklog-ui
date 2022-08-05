// Based off https://dayanpetrow.medium.com/super-easy-custom-toast-message-manager-with-react-and-typescript-c9b8bfb714af
import React, { useEffect } from "react";

import Button from "@component/Button/Button.component";

import { XIcon } from "@heroicons/react/solid";

export interface Props {
    title: string;
    body: string;
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<Props> = (props: Props) => {
    const {title, body, onClose, duration = 0} = props;

    useEffect(() => {
        if (!duration) {
            return;
        }

        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <div className="heading" >{title}</div>
                <div className="w-3 h-3" >
                    <Button onClick={onClose} label="close" >
                        <XIcon className="h-3 w-3" />
                    </Button>
                </div>
            </div>
            <div className={"toast-body"}>{body}</div>
        </div>
    );
};

export default Toast;
