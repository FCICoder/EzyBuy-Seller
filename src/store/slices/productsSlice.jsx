import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const productsAction = createAsyncThunk("products/retailer",async () => {
    try {
      console.log('ew');
      const res = await axios.get(`https://nodee-f764.onrender.com/product`,{
        headers: {
          'authorization': localStorage.getItem('retailerToken')
        }
      });
      console.log(res);
      let arr = res.data?.map((prd) => JSON.parse(JSON.stringify(prd)));
        console.log(arr);
      return arr;
    } catch (err) {
      console.log(err.message);
      return err.message
    }
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: true,
    error: "",
  },
  extraReducers:(builder)=>{
    return builder.addCase(productsAction.fulfilled,(state , action)=>{
      console.log('wqe');
      state.products = action.payload;
      console.log(action.payload);
      state.isLoading = false;
    })
  }
  // extraReducers :(builder)=>{
  //     builder.addCase(productsAction.fulfilled, (state,action)=>{
  //         state.products = action.payload
  //         console.log(action.payload,'ewewq');
  //         state.isLoading = false;
  //     }),
  //     builder.addCase(productsAction.pending, (state,action)=>{
  //         state.isLoading = true;
  //     }),
  //     builder.addCase(productsAction.rejected, (state,action)=>{
  //         state.error = action.payload
  //     })
  // }

      //   [productsAction.pending]:(state , action)=>{
      //       state.isLoading = true;
      //   },
      //   [productsAction.fulfilled]:(state , action)=>{
      //       state.products = action.payload;
      //       state.isLoading = false;
      //   },
      //   [productsAction.rejected]:(state , action)=>{
      //       state.error = action.payload;
      //       state.isLoading = false;
      //   }
      // }
});
export default ProductsSlice.reducer;
