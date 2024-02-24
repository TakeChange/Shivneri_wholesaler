import { GET_PRODUCT_LIST } from "../../constant/Constants";

export const getProductMethod = data => ({
    type: GET_PRODUCT_LIST,
    payload: data,
});