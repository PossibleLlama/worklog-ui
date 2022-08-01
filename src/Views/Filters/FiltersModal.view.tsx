import React, { useState } from "react";

import Button from "@component/Button/Button.component";
import { DatepickerRange } from "@zendeskgarden/react-datepickers";
import { Field, Label, Input } from "@zendeskgarden/react-forms";
import { Modal as ZenModal, Close } from "@zendeskgarden/react-modals";

import { Filter } from "@model/filter";
import { isBefore } from "@helper/date";

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

    return (
        <ZenModal isLarge onClose={() => props.onClose(props.initalFilters)}>
            <div className="flex w-5/6 mx-12" >
                <form>
                    <h2 className="heading font-semibold mt-4" >
                        Set filters
                    </h2>
                    <DatepickerRange
                        startValue={startDate}
                        endValue={endDate ? endDate : new Date()}
                        maxValue={new Date()}
                        onChange={(event: {
                            startValue?: Date;
                            endValue?: Date;
                        }) => {
                            if (event.startValue) {
                                isBefore(event.startValue, endDate) ? setStartDate(event.startValue) : setEndDate(event.startValue);
                            }
                            if (event.endValue) {
                                isBefore(event.endValue, startDate) ? setStartDate(event.endValue) : setEndDate(event.endValue);
                            }
                        }}
                    >
                        <div className="pt-8">
                            <Field>
                                <Label>Start date</Label>
                                <DatepickerRange.Start>
                                    <Input />
                                </DatepickerRange.Start>
                            </Field>
                        </div>
                        <div className="pt-8">
                            <Field>
                                <Label>End date</Label>
                                <DatepickerRange.End>
                                    <Input />
                                </DatepickerRange.End>
                            </Field>
                        </div>
                        <DatepickerRange.Calendar />
                    </DatepickerRange>
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
