import { httpAxios } from "../libs/axiosHelper";

export async function addProduct(product){
    const result = await httpAxios.post("/api/product",product).then(response=>response.data);
    // console.log(result);
    // console.log("result from addProduct function call post");
    return result;
}

export async function getProduct(){
    const result = await httpAxios.get("/api/product").then(response=>response.data);
    // console.log(result);
    // console.log("result from getProduct function call");
    return result;
}
export async function getProductById(productId){
    // console.log(productId);
    const result = await httpAxios.get(`/api/product/${productId}`).then(response=>response.data);
    console.log(result);
    // console.log("result from getProductById function call");
    return result;
}