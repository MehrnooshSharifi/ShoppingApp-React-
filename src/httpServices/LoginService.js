import http from "./httpService"
export const LoginUser=(data)=>{
    return http.post("/user/login" , data)
}