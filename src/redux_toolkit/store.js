import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from './product_list/Productslice';
import billReducer from './Bill_list/billSlice';

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    bill: billReducer,
  },
});