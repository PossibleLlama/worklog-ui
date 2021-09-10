import React, { useState } from "react";

import { Button } from "@zendeskgarden/react-buttons";
import { DatepickerRange } from "@zendeskgarden/react-datepickers";
import { Field, Label, Input, Message, Hint } from "@zendeskgarden/react-forms";
import { Modal as ZenModal, Header, Body, Footer, FooterItem, Close } from "@zendeskgarden/react-modals";

import { Filter } from "@model/filter";

type Props = {
    onClose: (filter: Filter) => void,
    initalFilters: Filter,
};

const Modal: React.FC<Props> = (props: Props) => {
    const [filter, setFilter] = useState<Filter>(props.initalFilters);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    return (
        <ZenModal onClose={() => props.onClose(props.initalFilters)}>
            <Header>Set filters</Header>
            <Body>
                <form>
                    <DatepickerRange
                        startValue={filter.startDate}
                        endValue={filter.endDate ? filter.endDate : new Date()}
                        onChange={(event: {
                                startValue?: Date;
                                endValue?: Date;
                        }) => {
                            setFilter({
                                ...filter,
                                startDate: event.startValue? event.startValue : filter.startDate,
                                endDate: event.endValue? event.endValue: filter.endDate,
                            });
                        }}
                        isCompact
                    >
                        <Field>
                            <Label>Start date</Label>
                            <DatepickerRange.Start>
                                <Input isCompact />
                            </DatepickerRange.Start>
                        </Field>
                        <Field>
                            <Label>End date</Label>
                            <DatepickerRange.End>
                                <Input isCompact />
                            </DatepickerRange.End>
                        </Field>
                        <DatepickerRange.Calendar />
                    </DatepickerRange>
                    <Field>
                        <Label>Title</Label>
                        <Input placeholder="Title" value={filter.title}
                        />
                    </Field>
                    <Field>
                        <Label>Description</Label>
                        <Input placeholder="Description" value={filter.description} />
                    </Field>
                    <Field>
                        <Label>Tags</Label>
                        <Hint>Comma seperated list of values</Hint>
                        <Input placeholder="Tags" value={filter.tags?.join(", ")}/>
                    </Field>
                </form>
                {formErrors.map((error) => {
                    return (
                        <React.Fragment key={error} >
                            <Message validation="error">{error}</Message>
                            <br/>
                        </React.Fragment>
                    );
                })}
            </Body>
            <Footer>
                <FooterItem>
                    <Button isBasic onClick={() => props.onClose(props.initalFilters)}>
                        Cancel
                    </Button>
                </FooterItem>
                <FooterItem>
                    <Button isPrimary onClick={() => props.onClose(filter)}>
                        Confirm
                    </Button>
                </FooterItem>
            </Footer>
            <Close aria-label="Close modal" />
        </ZenModal>
    );
};

export default Modal;
