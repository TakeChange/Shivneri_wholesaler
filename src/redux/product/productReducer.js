import { GET_PRODUCT_LIST } from "../../constant/Constants";

export const ProductReducer = (state = [],action)=>{
    switch(action.type){
        case GET_PRODUCT_LIST:
            return action.payload;

        default:
            return state;
    }
};





