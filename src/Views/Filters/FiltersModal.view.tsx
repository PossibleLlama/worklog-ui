import React, { useState } from "react";

import { Button } from "@zendeskgarden/react-buttons";
import { DatepickerRange } from "@zendeskgarden/react-datepickers";
import { Field, Label, Input } from "@zendeskgarden/react-forms";
import { Modal as ZenModal, Header, Body, Footer, FooterItem, Close } from "@zendeskgarden/react-modals";

import { Filter } from "@model/filter";

type Props = {
    onClose: (filter: Filter) => void,
    initalFilters: Filter,
};

const Modal: React.FC<Props> = (props: Props) => {
    const [filter, setFilter] = useState<Filter>(props.initalFilters);

    return (
        <ZenModal onClose={() => props.onClose(props.initalFilters)}>
            <Header>Set filters</Header>
            <Body>
                <form>
                    <DatepickerRange
                        startValue={filter.startDate}
                        endValue={filter.endDate ? filter.endDate : new Date()}
                        onChange={(changes: {
                                startValue?: Date;
                                endValue?: Date;
                        }) => {
                            setFilter({
                                ...filter,
                                startDate: changes.startValue? changes.startValue : filter.startDate,
                                endDate: changes.endValue? changes.endValue: filter.endDate,
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
                        <Input placeholder={filter.title ? filter.title : "Title"} />
                    </Field>
                    <Field>
                        <Label>Description</Label>
                        <Input placeholder={filter.description ? filter.description : "Description"} />
                    </Field>
                    <Field>
                        <Label>Tags</Label>
                        <Input placeholder={filter.tags ? filter.tags.join(", ") : "Tags"} />
                    </Field>
                </form>
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
