import { GET_PRODUCT_LIST ,ADD_TO_BILL} from "../../constant/Constants";

export const getProductMethod = data => ({
    type: GET_PRODUCT_LIST,
    payload: data,
});

export const addToBill = (item) => ({
    type: ADD_TO_BILL,
    payload: item
});
