import React from "react";

import { Work } from "@model/work";

import { formatRelativeDateTime } from "@helper/date";

type Props = {
    Worklist: Work[],
};

const Table: React.FC<Props> = (props: Props) => {
    return (
        <div className="max-w-full my-4">
            <table className="min-w-full shadow-lg text-sm text-left">
                <thead className="border-b colour-bg-primary-lighter-no-hover colour-text-primary-no-hover">
                    <tr>
                        <th scope="col" className="px-6 py-4">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-4">
                            When
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Duration
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Tags
                        </th>
                        <th scope="col" className="px-6 py-4">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.Worklist.map((wl) => {
                        return (
                            <tr
                                className="border-b ease-in-out colour-bg-primary-highlight subheading-text flip-flop"
                                key={wl.ID}
                            >
                                <td className="px-6 py-4">
                                    {wl.Title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {formatRelativeDateTime(wl.When)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {wl.Duration}
                                </td>
                                <td className="px-6 py-4">
                                    {wl.Tags?.join(", ")}
                                </td>
                                <td className="px-6 py-4">
                                    {wl.Description}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
