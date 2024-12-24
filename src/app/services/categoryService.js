import { httpAxios } from "../libs/axiosHelper";

export async function addCategory(data){
    const result = await httpAxios.post("/api/category",data).then(response=>response.data);
    return result;
}

export async function getCategory(){
    const result = await httpAxios.get("/api/category").then(response=>response.data);
    return result;
}

export async function removeCategory(categoryId) {
    const result = await httpAxios.delete(`api/category?categoryId=${encodeURIComponent(categoryId)}`).then(response => response.data);
    return result;
}

export async function updateCategory(categoryId,data){
    const result = await httpAxios.put(`/api/category/${categoryId}`,data).then(response=>response.data);
    return result;
}

export async function activeInactiveCategory(categoryId,data){
    const result = await httpAxios.put(`/api/category/${categoryId}`,data).then(response=>response.data);
    return result;
}