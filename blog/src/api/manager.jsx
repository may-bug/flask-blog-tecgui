import http from "@/utils/request.jsx";

export const personList = () => {
    return http.get("/manager/personlist")
}
export const personRemove = (data) => {
    return http.post("/manager/personremove", data)
}
export const pageList = () => {
    return http.get("/manager/pagelist")
}
export const pageRemove = (data) => {
    return http.post("/manager/pagedel", data)
}

export const commentList = () => {
    return http.get("/manager/comments")
}

export const commentDelete = (data) => {
    return http.post("/manager/commentdel", data)
}
