import { httpAxios } from "../libs/axiosHelper";

export async function getOrders(perPage,page) {
    // if(!perPage && !page) {
    //     const result = await httpAxios.get("/api/order").then(response => response.data);
    //     return result;
    // }
    // else{
        const result = await httpAxios.get(`/api/order?perPage=${perPage}&page=${page}`).then(response => response.data);
        return result;
    // }
}

export async function getOrdersLength(){
    const result = await httpAxios.get("/api/order").then(response => response.data);
    return result;
}

export async function getOrdersByUserId(userId) {
    const result = await httpAxios.get(`/api/userOrder?userId=${encodeURIComponent(userId)}`).then(response => response.data);
    return result;
}

export async function getOrderById(orderId) {
    const result = await httpAxios.get(`/api/order/${orderId}`).then(response => response.data);
    return result;
}