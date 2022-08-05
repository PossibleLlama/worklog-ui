import React, { useState } from "react";

import Button from "@component/Button/Button.component";
import { Modal as ZenModal, Close } from "@zendeskgarden/react-modals";

import { Filter } from "@model/filter";
import { formatRFC3339Date, isAfter , isBefore } from "@helper/date";

type Props = {
    onClose: (filter: Filter) => void,
    initalFilters: Filter,
};

const Modal: React.FC<Props> = (props: Props) => {
    const [startDate, setStartDate] = useState<Date>(props.initalFilters.startDate);
    const [endDate, setEndDate] = useState<Date>(props.initalFilters.endDate ? props.initalFilters.endDate : new Date());
    const [title, setTitle] = useState<string>(props.initalFilters.title ? props.initalFilters.title : "");
    const [description, setDescription] = useState<string>(props.initalFilters.description ? props.initalFilters.description : "");
    const [tags, setTags] = useState<string>(props.initalFilters.tags ? props.initalFilters.tags.join(", ") : "");

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
                setEndDate(today);
            } else {
                setStartDate(d);
            }
        } else {
            if (isBefore(d, startDate)) {
                setStartDate(d);
            }
            setEndDate(d);
        }
    };

    return (
        <ZenModal isLarge onClose={() => props.onClose(props.initalFilters)}>
            <div className="flex w-5/6 mx-12" >
                <form>
                    <h2 className="heading font-semibold text-lg mt-4" >
                        Set filters
                    </h2>

                    <div className="flex justify-between my-2" >
                        <div>
                            <label htmlFor="startDatePicker" className="heading font-semibold" >
                                Start date
                            </label><br />
                            <input id="startDatePicker" type="date" value={formatRFC3339Date(startDate)} onChange={(e) => {
                                updateDateSelection(true, e);
                            }} />
                        </div>

                        <div>
                            <label htmlFor="endDatePicker" className="heading font-semibold" >
                                End date
                            </label><br />
                            <input id="endDatePicker" type="date" value={formatRFC3339Date(endDate)} onChange={(e) => {
                                updateDateSelection(false, e);
                            }} />
                        </div>
                    </div>

                    <hr className="border-0 my-4" />

                    <label htmlFor="title" className="heading font-semibold" >
                        Title
                    </label>
                    <input type="text" id="title" placeholder="Title" value={title}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            setTitle(event.currentTarget.value);
                        }}
                        className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 text-gray-800 rounded-md my-2 px-2 font-medium text-base w-full"
                    />

                    <label htmlFor="description" className="heading font-semibold" >
                        Description
                    </label>
                    <textarea id="description" placeholder="Description" value={description}
                        onChange={(event: React.FormEvent<HTMLTextAreaElement>) => {
                            setDescription(event.currentTarget.value);
                        }}
                        className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 text-gray-800 rounded-md my-2 px-2 font-medium text-base w-full"
                        rows={2}
                    />

                    <label htmlFor="tags" className="heading font-semibold" >
                        Tags
                    </label>
                    <p className="subheading text-sm" >
                        Comma seperated list of values
                    </p>
                    <input type="text" id="tags" placeholder="Tags" value={tags}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            setTags(event.currentTarget.value);
                        }}
                        className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 text-gray-800 rounded-md my-2 px-2 font-medium text-base w-full"
                    />

                    <hr className="border-0 my-4" />

                    <div className="flex my-4">
                        <Button isBasic onClick={() => props.onClose(props.initalFilters)} label="Cancel" className="mr-2" >
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
                <Close aria-label="Close modal" />
            </div>
        </ZenModal>
    );
};

export default Modal;
