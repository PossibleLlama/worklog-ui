import React, { useState } from "react";

import Button from "@component/Button/Button.component";
import { DatepickerRange } from "@zendeskgarden/react-datepickers";
import { Field, Label, Input, Hint, Textarea } from "@zendeskgarden/react-forms";
import { Modal as ZenModal, Header, Body, Footer, FooterItem, Close } from "@zendeskgarden/react-modals";

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
            <Header>Set filters</Header>
            <Body>
                <form>
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
                    <div className="pt-8">
                        <Field>
                            <Label>Title</Label>
                            <Input placeholder="Title" value={title}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                    setTitle(event.currentTarget.value);
                                }}
                            />
                        </Field>
                    </div>
                    <div className="pt-8">
                        <Field>
                            <Label>Description</Label>
                            <Textarea
                                minRows={2}
                                maxRows={12}
                                placeholder="Description"
                                value={description}
                                onChange={(event: React.FormEvent<HTMLTextAreaElement>) => {
                                    setDescription(event.currentTarget.value);
                                }}
                            />
                        </Field>
                    </div>
                    <div className="pt-8">
                        <Field>
                            <Label>Tags</Label>
                            <Hint>Comma seperated list of values</Hint>
                            <Input placeholder="Tags" value={tags}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                    setTags(event.currentTarget.value);
                                }}
                            />
                        </Field>
                    </div>
                </form>
            </Body>
            <Footer>
                <FooterItem>
                    <Button isBasic onClick={() => props.onClose(props.initalFilters)} label="Cancel">
                        Cancel
                    </Button>
                </FooterItem>
                <FooterItem>
                    <Button isPrimary onClick={() => props.onClose({
                        startDate,
                        endDate,
                        title: title.trim(),
                        description: description.trim(),
                        tags: tags.split(",").map(e => e.trim()),
                    })} label="Confirm">
                        Confirm
                    </Button>
                </FooterItem>
            </Footer>
            <Close aria-label="Close modal" />
        </ZenModal>
    );
};

export default Modal;
