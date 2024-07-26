import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './product_list/Productslice';
import billReducer from './Bill_list/billSlice';
import customerReducer from './customer/customerSlice';

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    bill: billReducer,
    customer: customerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializable state invariant middleware
    }),
});