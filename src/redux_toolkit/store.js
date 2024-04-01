import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from './product_list/Productslice';
export const store = configureStore({
  reducer: {
    product: ProductReducer,
  },
});