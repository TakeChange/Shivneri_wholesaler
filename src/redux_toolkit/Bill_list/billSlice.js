// redux/billSlice.js
import { createSlice } from '@reduxjs/toolkit';

const billSlice = createSlice({
  name: 'bill',
  initialState: {
    items: [],
    iconColors: {},
    selectedUnitType: null,
  },
  reducers: {
    addToBill: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity = parseInt(existingItem.quantity, 10) + parseInt(item.quantity, 10);
      } else {
        state.items.push({ ...item, quantity: parseInt(item.quantity, 10) });
      }
      state.iconColors[item.id] = 'red';
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = parseInt(quantity, 10);
        item.total = (parseFloat(item.perPrice) * parseInt(quantity, 10)).toFixed(2);
      }
    },
    removeFromBill: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.iconColors[id] = '#23AA49';
    },
    setSelectedUnitType: (state, action) => {
      state.selectedUnitType = action.payload;
    },
    clearBill: (state) => { // Add this action
      state.items = [];
      state.iconColors = {};
    },
  },
});

export const { addToBill, removeFromBill, updateItemQuantity, setSelectedUnitType, clearBill } = billSlice.actions;
export default billSlice.reducer;
