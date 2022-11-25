import { formatRFC3339DateTime } from "@helper/date";

import { Work } from "@model/work";

import axios, { AxiosResponse } from "axios";

const port = 8080;

export const instance = axios.create({
    baseURL: `http://localhost:${port}/`,
    timeout: 2000,
});

export const responseBody = (response: AxiosResponse) => response.data;

export interface WorkRequest {
    title: string;
    description?: string;
    author?: string;
    duration?: number;
    tags?: string[];
    when?: string;
}

export interface WorkResponse {
    id: string;
    revision: number;
    title: string;
    description?: string;
    author?: string;
    duration?: number;
    tags?: string[];
    when: string;
    createdAt: string;
}

export const workResponseToWork = (r: WorkResponse): Work => {
    return {
        ID: r.id,
        Revision: r.revision,
        Title: r.title,
        Description: r.description,
        Author: r.author,
        Duration: r.duration,
        Tags: r.tags,
        When: new Date(r.when),
        CreatedAt: new Date(r.createdAt),
    };
};

export const workToWorkRequest = (w: Work): WorkRequest => {
    return {
        title: w.Title,
        description: w.Description,
        author: w.Author,
        duration: w.Duration,
        tags: w.Tags,
        when: formatRFC3339DateTime(w.When),
    };
};
