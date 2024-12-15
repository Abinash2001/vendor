import { httpAxios } from "../libs/axiosHelper";

export async function getOrders() {
    const result = await httpAxios.get("/api/order").then(response => response.data);
    return result;
}