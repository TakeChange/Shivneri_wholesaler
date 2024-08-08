import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ToastAndroid } from 'react-native';

export const FetchFilterProduct = createAsyncThunk('FetchFilterProduct', async (categoryId = '') => {
  let url;
  var res;

  if (categoryId!='0') {
    try {
      const CategoryWiseUrl = 'https://demo.raviscyber.in/public/category_wise_productList.php';

      response = await axios.post(CategoryWiseUrl, {
          category_id: categoryId,
      },
       {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

     res = response.data;

     const final = await res;
     return final;
  } catch (error) {
      ToastAndroid.show('category issue', ToastAndroid.SHORT);
  } 
  } else {
    url = 'https://demo.raviscyber.in/public/productlist.php';
    res = await fetch(url);
    const final = await res.json();
    return final;
  }
});
