// customerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customerName: '',
  mobileNumber: '',
  address: ''
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerData: (state, action) => {
      state.customerName = action.payload.customerName;
      state.mobileNumber = action.payload.mobileNumber;
      state.address = action.payload.address;
    },
    clearCustomerData: (state) => {
      state.customerName = '';
      state.mobileNumber = '';
      state.address = '';
    }
  }
});

export const { setCustomerData, clearCustomerData } = customerSlice.actions;
export default customerSlice.reducer;
