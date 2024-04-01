import {createAsyncThunk} from '@reduxjs/toolkit';

export const FetchProduct = createAsyncThunk('FetchProduct', async () => {
  const res = await fetch('https://demo.raviscyber.in/public/productlist.php');
  const final = await res.json();
  return final;
});