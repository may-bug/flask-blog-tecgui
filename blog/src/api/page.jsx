import http from "@/utils/request.jsx";

export const list = async () => {
    return http.get("/page/list")
}
export const myList = async () => {
    return http.post("/page/mylist")
}
export const onePage = async (data) => {
    return http.get("/page/one", data)
}

export const addPage = async (data) => {
    return http.post("/page/add", data)
}

export const delPage = async (data) => {
    return http.post("/page/del", data)
}
export const starPage = async (data) => {
    return http.post("/page/star", data)
}
export const updatePage = async (data) => {
    return http.post("/page/update", data)
}
