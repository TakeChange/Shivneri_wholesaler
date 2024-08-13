// customerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customerId: '',
  customerName: '',
  mobileNumber: '',
  address: ''
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerData: (state, action) => {
      console.log('Setting Customer Data:', action.payload); // Log the payload
      state.customerId = action.payload.customerId; // Ensure this is correct
      state.customerName = action.payload.customerName;
      state.mobileNumber = action.payload.mobileNumber;
      state.address = action.payload.address;
    },
    clearCustomerData: (state) => {
      state.customerId = '';
      state.customerName = '';
      state.mobileNumber = '';
      state.address = '';
    }
  }
});

export const { setCustomerData, clearCustomerData } = customerSlice.actions;
export default customerSlice.reducer;
