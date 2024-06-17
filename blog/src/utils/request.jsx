import axios from 'axios'
import {MessagePlugin} from "tdesign-react";

const service = axios.create({
    baseURL: "/api",
    withCredentials: true,
    timeout: 10 * 1000,
    headers: {
        Accept: "*",
        "Content-Type": "application/x-www-form-urlencoded",
    },
});
service.interceptors.request.use((config) => {
    return config
})

service.interceptors.response.use((response) => {
    if (response.config.url.startsWith("/manager")) {
        if (response.data.code === 403) {
            MessagePlugin.error(response.data.msg)
        }
    }
    return response.data
})

const http = {
    get(url, params) {
        const config = {
            method: 'GET',
            url: url,
            params: params ? params : {}
        }
        return service(config)
    },
    post(url, data) {
        const config = {
            method: 'POST',
            url: url,
            data: data
        }
        return service(config)
    }
}
export default http
