import React, { useEffect, useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

import Container from "@component/Container/Container.component";

import { Work } from "@model/work";

import { isToday, subMonths } from "date-fns";
import { isAfter } from "@helper/date";

const innerContainerStyling = "mx-2 p-2 bg-stone-200 bg-opacity-40 rounded-lg shadow-lg";
const infographicStyling = "mx-2 p-2 bg-stone-200 rounded-lg";
const positiveArrowStyling = "h-5 w-5 mx-1 text-green-500 bg-stone-300 hover:text-green-300 hover:bg-gray-800 rounded-3xl transition-all";
const negativeArrowStyling = "h-5 w-5 mx-1 text-red-600 bg-stone-300 hover:text-red-300 hover:bg-gray-800 rounded-3xl transition-all";

const averagePerDay = (wk: Work[]): number => {
    return wk.length;
};

type Props = {
    TotalWork: Work[],
    FilteredWork: Work[],
};

const Usage: React.FC<Props> = (props: Props) => {
    const [logsWithinAMonth, setLogsWithinAMonth] = useState<Work[]>([]);
    const [logsToday, setLogsToday] = useState<Work[]>([]);

    useEffect(() => {
        const now = new Date();
        setLogsWithinAMonth(props.TotalWork.filter((e) => {
            return isAfter(e.When, subMonths(now, 1));
        }));

        setLogsToday(props.TotalWork.filter((e) => {
            return isToday(e.When);
        }));
    }, [props.TotalWork]);

    return (
        <Container className="m-2" >
            <h2 className="heading mb-2" >Usage</h2>

            <div className="flex" >
                    <div className={`flex ${innerContainerStyling}`} >
                        <div className={`${infographicStyling}`} >
                            <h3 className="subheading" >All time</h3>
                            <p className="bodytext" >{props.TotalWork.length}</p>
                        </div>

                        <div className={`${infographicStyling}`} >
                            <h3 className="subheading" >In filter</h3>
                            <p className="bodytext" >{props.FilteredWork.length}</p>
                        </div>

                        <div className={`${infographicStyling}`} >
                            <h3 className="subheading" >This month</h3>
                            <p className="bodytext" >{logsWithinAMonth.length}</p>
                        </div>

                        <div className={`${infographicStyling}`} >
                            <h3 className="subheading" >Today</h3>
                            <p className="bodytext" >{logsToday.length}</p>
                        </div>
                    </div>

                    <div className={`${innerContainerStyling}`} >
                        <h3 className="subheading p-2" >Average per day</h3>
                        <div className="flex" >
                            <div className={`${infographicStyling}`} >
                                <h4 className="subheading" >All time</h4>
                                <div className="flex" >
                                    <p className="bodytext" >{averagePerDay(props.TotalWork)}</p>
                                    {averagePerDay(props.TotalWork) > logsToday.length &&
                                        <ChevronUpIcon className={`${positiveArrowStyling}`} />
                                    }
                                    {averagePerDay(props.TotalWork) < logsToday.length &&
                                        <ChevronDownIcon className={`${negativeArrowStyling}`} />
                                    }
                                </div>
                            </div>

                            <div className={`${infographicStyling}`} >
                                <h4 className="subheading" >This month</h4>
                                <div className="flex" >
                                    <p className="bodytext" >{averagePerDay(logsWithinAMonth)}</p>
                                    {averagePerDay(logsWithinAMonth) > logsToday.length &&
                                        <ChevronUpIcon className={`${positiveArrowStyling}`} />
                                    }
                                    {averagePerDay(logsWithinAMonth) < logsToday.length &&
                                        <ChevronDownIcon className={`${negativeArrowStyling}`} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Container>
    );
};

export default Usage;
