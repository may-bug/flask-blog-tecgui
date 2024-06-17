import http from "@/utils/request.jsx";

export const commentList = (data) => {
    return http.get("/comment/list", data)
}
export const commentAdd = (data) => {
    return http.post("/comment/add", data)
}
