import { combineReducers, createStore } from "redux";
import { ProductReducer } from "./product/productReducer";
import { billReducer } from "./product/BillReducer";
const routeReducer = combineReducers({
    ProductReducer,
    billState: billReducer,
});

export const store = createStore(routeReducer);