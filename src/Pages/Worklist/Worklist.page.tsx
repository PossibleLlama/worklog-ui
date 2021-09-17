import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import Timeline from "@view/Timeline/Timeline.view";

import Details from "@component/Details/Details.component";

import { Work } from "@model/work";

type Props = {
    Worklist: Work[],
};

const slideIn = {
    hidden: {
        x: "100vw",
    },
    visible: {
        x: "0",
        transition: {
            duration: 0.2,
            type: "spring",
            damping: 50,
            stiffness: 500,
        },
    },
    exit: {
        x: "-100vw",
    },
};

const Worklist: React.FC<Props> = (props: Props) => {
    const [detailedWork, setDetailedWork] = useState<Work | undefined>();

    const loadDetailed = (detail: Work): void => {
        setDetailedWork(detail);
    };
    const removeDetailed = (): void => {
        setDetailedWork(undefined);
    };

    return (
        <React.Fragment>
            <Timeline Worklist={props.Worklist} onLoadDetailed={loadDetailed}/>
            
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
            >
                {detailedWork &&
                    <motion.div
                        initial="hidden"
                        exit="exit"
                        animate="visible"
                        variants={slideIn}
                    >
                        <Details work={detailedWork} onClose={removeDetailed}/>
                    </motion.div>
                }
            </AnimatePresence>
        </React.Fragment>
    );
};

export default Worklist;
