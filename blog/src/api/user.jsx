import http from "../utils/request.jsx";

export const login = async (data) => {
    return http.post('/user/login', data);
}
export const sign = async (data) => {
    return http.post('/user/sign', data);
}

export const logout = async () => {
    return http.post('/user/logout')
}

export const check = async () => {
    return http.post('/user/check')
}

export const pageInfo = async () => {
    return http.post('/user/sta')
}

export const userInformation = () => {
    return http.post("/user/info")
}
export const updatePwd = (data) => {
    return http.post("/user/updatepwd", data)
}

export const updateInfo = (data) => {
    return http.post("/user/updateinfo", data)
}

export const getUrl = () => {
    return http.get("/user/avatar")
}

export const commentList = () => {
    return http.get("/user/comments")
}

export const commentDelete = (data) => {
    return http.post("/user/commentdel", data)
}
