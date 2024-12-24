import { httpAxios } from "../libs/axiosHelper";

export async function getOrders() {
    const result = await httpAxios.get("/api/order").then(response => response.data);
    return result;
}

export async function getOrdersByUserId(userId) {
    console.log("userId service",userId);
    const result = await httpAxios.get(`/api/userOrder?userId=${encodeURIComponent(userId)}`).then(response => response.data);
    return result;
}

export async function getOrderById(orderId) {
    const result = await httpAxios.get(`/api/order/${orderId}`).then(response => response.data);
    console.log("order service",result);
    return result;
}