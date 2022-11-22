import axios, { AxiosResponse } from "axios";

import { Work } from "@model/work";

const port = 8080;

const instance = axios.create({
    baseURL: `http://localhost:${port}/`,
    timeout: 2000,
});

const request = {
    get: (url: string): Promise<Work[]> => instance.get(url).then((res: AxiosResponse) => res.data),
    post: (url: string, body: Work): Promise<null> => instance.post(url, body).then((res: AxiosResponse) => res.data),
    put: (url: string, body: Work): Promise<null> => instance.put(url, body).then((res: AxiosResponse) => res.data),
};

export default request;
