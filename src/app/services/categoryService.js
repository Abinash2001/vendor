import { httpAxios } from "../libs/axiosHelper";

export async function addCategory(data){
    const result = await httpAxios.post("/api/category",data).then(response=>response.data);
    return result;
}

export async function getCategory(){
    const result = await httpAxios.get("/api/category").then(response=>response.data);
    return result;
}

// export async function removeCategory(id){
//     console.log("service : ",id);
//     const result = await httpAxios.delete(`/api/category/${id}`).then(response=>response.data);
//     console.log("service : ",result);
//     return result;
// }

export async function removeCategory(id) {
    const result = await httpAxios.delete(`/api/category/${id}`).then(response => response.data);
    return result;
}

