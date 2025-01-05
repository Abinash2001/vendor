import { httpAxios } from "../libs/axiosHelper";

export async function addProduct(product){
    // console.log("productService",product);
    const result = await httpAxios.post("/api/product",product).then(response=>response.data);
    // console.log(result);
    // console.log("result from addProduct function call post");
    return result;
}

export async function getProduct(perPage,page){
    const result = await httpAxios.get(`/api/product?perPage=${perPage}&page=${page}`).then(response=>response.data);
    // console.log(result);
    // console.log("result from getProduct function call");
    return result;
}
export async function getProductById(productId){
    // console.log("product servce: ",productId);
    const result = await httpAxios.get(`/api/product/${productId}`).then(response=>response.data);
    // console.log(result);
    // console.log("result from getProductById function call");
    return result;
}

export async function updateProduct(productId,product){
    // console.log("productService",product);
    const result = await httpAxios.put(`/api/product/${productId}`,product).then(response=>response.data);
    // console.log(result);
    // console.log("result from updateProduct function call put");
    return result;
}

export async function activeInactiveProduct(productId,data){
    const result = await httpAxios.put(`/api/product/${productId}`,data).then(response=>response.data);
    return result;
}