import React from "react";

import { Work } from "@model/work";

import { format } from "date-fns";

type Props = {
    Worklist: Work[],
};

const Table: React.FC<Props> = (props: Props) => {
    return (
        <div className="max-w-full">
            <table className="min-w-full shadow-lg text-sm text-left">
                <thead className="bg-stone-100 border-b">
                    <tr>
                        <th scope="col" className="text-gray-900 px-6 py-4">
                            Title
                        </th>
                        <th scope="col" className="text-gray-900 px-6 py-4">
                            When
                        </th>
                        <th scope="col" className="text-gray-900 px-6 py-4">
                            Duration
                        </th>
                        <th scope="col" className="text-gray-900 px-6 py-4">
                            Tags
                        </th>
                        <th scope="col" className="text-gray-900 px-6 py-4">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.Worklist.map((wl) => {
                        return (
                            <tr
                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-stone-100 font-light"
                                key={wl.ID}
                            >
                                <td className="text-gray-900 px-6 py-4">
                                    {wl.Title}
                                </td>
                                <td className="text-gray-900 px-6 py-4 whitespace-nowrap">
                                    {format(wl.When, "do MMMM yyyy HH:mm")}
                                </td>
                                <td className="text-gray-900 px-6 py-4 whitespace-nowrap">
                                    {wl.Duration}
                                </td>
                                <td className="text-gray-900 px-6 py-4">
                                    {wl.Tags?.join(", ")}
                                </td>
                                <td className="text-gray-900 px-6 py-4">
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
