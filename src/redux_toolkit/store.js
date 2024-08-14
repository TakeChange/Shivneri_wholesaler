import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './product_list/Productslice';
import billReducer from './Bill_list/billSlice';
import customerReducer from './customer/customerSlice';
import colorReducer from './color/colorSplice'

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    bill: billReducer,
    customer: customerReducer,
    colors: colorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializable state invariant middleware
    }),
});