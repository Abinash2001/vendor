import { httpAxios } from "../libs/axiosHelper";

export async function getUsers() {
    const result = await httpAxios.get("/api/user").then(response => response.data);
    // console.log(result);
    // console.log("result from getUser function call");
    return result;
}

export async function getUserById(id) {
    const result = await httpAxios.get(`/api/user/${id}`).then(response => response.data);
    // console.log(result);
    // console.log("result from getUser function call");
    return result;
}