import React, { useState } from "react";

import Button from "@component/Button/Button.component";

import { Work } from "@model/work";
import { formatMinutes } from "@helper/date";

type Props = {
    onClose: (w: Work | undefined) => void,
};

const Modal: React.FC<Props> = (props: Props) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [duration, setDuration] = useState<number>(-1);
    const [author, setAuthor] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [when, setWhen] = useState<Date | undefined>(undefined);

    const cancelModal = () => {
        props.onClose(undefined);
    };

    const closeModal = () => {
        title.trim().length > 0 ?
            props.onClose({
                ID: "",
                Revision: -1,
                Title: title.trim(),
                Description: description.trim() === "" ? undefined : description.trim(),
                Author: author.trim() === "" ? undefined : author.trim(),
                Duration: duration === -1 ? undefined : duration,
                Tags: tags.split(",").map(e => e.trim()).filter(e => e.length > 0),
                When: when === undefined ? new Date() : when,
                CreatedAt: new Date(0),
            }) : props.onClose(undefined);
    };

    return (
        <div className="bg-opacity-80 w-full h-full fixed top-0 left-0 flex items-center justify-center bg-stone-800" role="none" tabIndex={-1} onClick={(event) => {
            if (event.currentTarget === event.target) {
                props.onClose(undefined);
            }
        }} >
            <div className="bg-stone-100 opacity-100 rounded-lg p-10" >
                <div className="flex w-5/6 mx-12" >
                    <form onSubmit={(e) => e.preventDefault()} aria-label="form">
                        <div className="border-0 my-4">
                            <h2 className="heading-text text-xl" >
                                Log new work
                            </h2>
                        </div>

                        <div>
                            <label htmlFor="title" className="heading-text" >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Title"
                                value={title}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                    setTitle(event.currentTarget.value);
                                }}
                                className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 text-gray-800 rounded-md my-2 px-2 w-full body-text"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="heading-text" >
                                Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Description"
                                value={description}
                                onChange={(event: React.FormEvent<HTMLTextAreaElement>) => {
                                    setDescription(event.currentTarget.value);
                                }}
                                className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 text-gray-800 rounded-md my-2 px-2 w-full body-text"
                                rows={2}
                            />
                        </div>

                        <div>
                            <label htmlFor="tags" className="heading-text" >
                                Tags
                            </label>
                            <p className="subheading-text text-sm" >
                                Comma separated list of values
                            </p>
                            <input
                                type="text"
                                id="tags"
                                placeholder="Tags"
                                value={tags}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                    setTags(event.currentTarget.value);
                                }}
                                className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 text-gray-800 rounded-md my-2 px-2 w-full body-text"
                            />
                        </div>

                        <div>
                            <label htmlFor="author" className="heading-text" >
                                Author
                            </label>
                            <p className="subheading-text text-sm" >
                                Will default to value in config file if not specified
                            </p>
                            <input
                                type="text"
                                id="author"
                                placeholder="Author"
                                value={author}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                    setAuthor(event.currentTarget.value);
                                }}
                                className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 text-gray-800 rounded-md my-2 px-2 w-full body-text"
                            />
                        </div>

                        <div>
                            <label htmlFor="duration" className="heading-text" >
                                Duration
                            </label>
                            <p className="subheading-text text-sm" >
                                Will default to value in config file if not specified
                            </p>
                            <input
                                type="number"
                                id="duration"
                                placeholder="30"
                                value={duration > 0 ? duration : ""}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                    try {
                                        const dur = parseInt(event.currentTarget.value, 10);
                                        if (dur > 0) {
                                            setDuration(dur);
                                        }
                                    } catch(error) {
                                        console.log("oops");
                                    }
                                }}
                                className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 text-gray-800 rounded-md my-2 px-2 w-full body-text"
                            />
                        </div>

                        <div>
                            <label htmlFor="dateTimePicker" className="heading-text" >
                                When
                            </label><br />
                            <p className="subheading-text text-sm" >
                                Will default to now if not specified
                            </p>
                            <input
                                id="dateTimePicker"
                                type="datetime-local"
                                value={when === undefined ? "" : formatMinutes(when)}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    try {
                                        if (e.currentTarget.value !== "") {
                                            setWhen(new Date(e.currentTarget.value));
                                        } else {
                                            setWhen(undefined);
                                        }
                                    } catch (error) {
                                        setWhen(undefined);
                                    }
                                }}
                                onClick={() => {
                                    if (when === undefined) {
                                        setWhen(new Date());
                                    }
                                }}
                                className="border-2 border-stone-200 focus:outline-none focus:border-stone-600 text-gray-800 rounded-md my-2 px-2 w-full body-text"
                            />
                        </div>

                        <div className="flex my-4">
                            <Button isBasic onClick={cancelModal} label="Cancel" className="mr-2" >
                                Cancel
                            </Button>
                            <Button isPrimary isSubmit onClick={closeModal} label="Confirm">
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
