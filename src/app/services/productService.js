import { httpAxios } from "../libs/axiosHelper";

export async function addProduct(product){
    const result = await httpAxios.post("/api/product",product).then(response=>response.data);
    return result;
}
export async function getProductLength(){
    const result = await httpAxios.get("/api/product").then(response=>response.data);
    return result;
}
export async function getProduct(perPage,page,category){
    // if(!perPage && !page && !category){
    //     const result = await httpAxios.get("/api/product").then(response=>response.data);
    //     return result;
    // }
    // else{
        const result = await httpAxios.get(`/api/product?perPage=${perPage}&page=${page}&category=${category}`).then(response=>response.data);
        return result;
    // }
}
export async function getProductById(productId){
    const result = await httpAxios.get(`/api/product/${productId}`).then(response=>response.data);
    return result;
}

export async function updateProduct(productId,product){
    const result = await httpAxios.put(`/api/product/${productId}`,product).then(response=>response.data);
    return result;
}

export async function activeInactiveProduct(productId,data){
    const result = await httpAxios.put(`/api/product/${productId}`,data).then(response=>response.data);
    return result;
}