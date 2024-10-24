import { configureStore } from '@reduxjs/toolkit';
import {themeSlice} from "@/store/slices/theme.slice";
import {cartSlice} from "@/store/slices/cart.slice";

export const store = configureStore({
  reducer: {
    // Slices
    theme: themeSlice.reducer,
    cart: cartSlice.reducer
  },
});


