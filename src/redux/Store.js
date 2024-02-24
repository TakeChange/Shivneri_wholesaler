import { combineReducers, createStore } from "redux";
import { ProductReducer } from "./product/productReducer";

const routeReducer = combineReducers({
    ProductReducer
});

export const store = createStore(routeReducer);