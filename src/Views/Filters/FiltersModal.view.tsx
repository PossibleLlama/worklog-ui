import React, { useState } from "react";

import { addDays, subSeconds } from "date-fns";

import Button from "@component/Button/Button.component";

import { Filter } from "@model/filter";
import { formatRFC3339Date, isAfter, isBefore } from "@helper/date";

type Props = {
    onClose: (filter: Filter) => void,
    initialFilters: Filter,
};

const Modal: React.FC<Props> = (props: Props) => {
    const [startDate, setStartDate] = useState<Date>(props.initialFilters.startDate);
    const [endDate, setEndDate] = useState<Date>(props.initialFilters.endDate ? props.initialFilters.endDate : new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59));
    const [title, setTitle] = useState<string>(props.initialFilters.title ? props.initialFilters.title : "");
    const [description, setDescription] = useState<string>(props.initialFilters.description ? props.initialFilters.description : "");
    const [tags, setTags] = useState<string>(props.initialFilters.tags ? props.initialFilters.tags.join(", ") : "");

    const updateDateSelection = (preferStartDate: boolean, event: React.FormEvent<HTMLInputElement>) => {
        const d = new Date(event.currentTarget.value);
        d.setHours(0);

        if (preferStartDate) {
            if (isAfter(d, new Date())) {
                const today = new Date();
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                today.setMilliseconds(0);
                setStartDate(today);
                setEndDate(subSeconds(addDays(today, 1), 1));
            } else {
                setStartDate(d);
            }
        } else {
            if (isBefore(d, startDate)) {
                setStartDate(d);
            }
            setEndDate(subSeconds(addDays(d, 1), 1));
        }
    };

    return (
        <div className="bg-opacity-80 w-full h-full fixed top-0 left-0 flex items-center justify-center colour-bg-primary-darker-no-hover" role="none" tabIndex={-1} onClick={(event) => {
            if (event.currentTarget === event.target) {
                props.onClose(props.initialFilters);
            }
        }} >
            <div className="opacity-100 rounded-lg p-10 w-1/2 colour-bg-primary-lighter-no-hover" >
                <div className="flex mx-12" >
                    <form aria-label="form" className="min-w-full">
                        <h2 className="heading-text text-lg mt-4" >
                            Set filters
                        </h2>

                        <div className="flex justify-between my-2 colour-text-primary-no-hover" >
                            <div>
                                <label htmlFor="startDatePicker" className="heading-text" >
                                    Start date
                                </label><br />
                                <input
                                    id="startDatePicker"
                                    type="date"
                                    value={formatRFC3339Date(startDate)}
                                    onChange={(e) => {
                                        updateDateSelection(true, e);
                                    }}
                                    className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 rounded-md my-2 px-2 w-full body-text"
                                />
                            </div>

                            <div>
                                <label htmlFor="endDatePicker" className="heading-text" >
                                    End date
                                </label><br />
                                <input
                                    id="endDatePicker"
                                    type="date"
                                    value={formatRFC3339Date(endDate)}
                                    onChange={(e) => {
                                        updateDateSelection(false, e);
                                    }}
                                    className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 rounded-md my-2 px-2 w-full body-text"
                                />
                            </div>
                        </div>

                        <hr className="border-0 my-4" />

                        <label htmlFor="title" className="heading-text" >
                            Title
                        </label>
                        <input type="text" id="title" placeholder="Title" value={title}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                setTitle(event.currentTarget.value);
                            }}
                            className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 rounded-md my-2 px-2 w-full body-text"
                        />

                        <label htmlFor="description" className="heading-text" >
                            Description
                        </label>
                        <textarea id="description" placeholder="Description" value={description}
                            onChange={(event: React.FormEvent<HTMLTextAreaElement>) => {
                                setDescription(event.currentTarget.value);
                            }}
                            className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 rounded-md my-2 px-2 w-full body-text"
                            rows={2}
                        />

                        <label htmlFor="tags" className="heading-text" >
                            Tags
                        </label>
                        <p className="subheading-text text-sm" >
                            Comma seperated list of values
                        </p>
                        <input type="text" id="tags" placeholder="Tags" value={tags}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                setTags(event.currentTarget.value);
                            }}
                            className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 rounded-md my-2 px-2 w-full body-text"
                        />

                        <hr className="border-0 my-4" />

                        <div className="flex my-4">
                            <Button isBasic onClick={() => props.onClose(props.initialFilters)} label="Cancel" className="mr-2" >
                                Cancel
                            </Button>
                            <Button isPrimary onClick={() => props.onClose({
                                startDate,
                                endDate,
                                title: title.trim(),
                                description: description.trim(),
                                tags: tags.split(",").map(e => e.trim()),
                            })} label="Confirm">
                                Confirm
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
