import { Work } from "@model/work";
import axios, { AxiosResponse } from "axios";

const port = 8080;

export const instance = axios.create({
    baseURL: `http://localhost:${port}/`,
    timeout: 2000,
});

export const responseBody = (response: AxiosResponse) => response.data;

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

export const workResponseToWork = (e: WorkResponse): Work => {
    return {
        ID: e.id,
        Revision: e.revision,
        Title: e.title,
        Description: e.description,
        Author: e.author,
        Duration: e.duration,
        Tags: e.tags,
        When: new Date(e.when),
        CreatedAt: new Date(e.createdAt),
    };
};
