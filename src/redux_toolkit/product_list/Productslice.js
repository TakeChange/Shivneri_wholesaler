import { FetchProduct } from '../../api/FetchProduct';

const {createSlice} = require('@reduxjs/toolkit');

const Productslice = createSlice({
  name: 'products',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(FetchProduct.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(FetchProduct.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(FetchProduct.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default Productslice.reducer;