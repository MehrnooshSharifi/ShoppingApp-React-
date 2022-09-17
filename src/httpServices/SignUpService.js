import http from "./httpService";

export const signUpUser=(data)=>{
return http.post("/user/register" , data);
}