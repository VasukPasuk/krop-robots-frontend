import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IColor, IProduct, IVariant, VariantType} from "@/types";
import { PlasticType } from "@/constants/plastic";
import {ResponseItem} from "@/types/api-response.type";

export interface ICartItem {
  product: ResponseItem<IProduct>;
  type: VariantType;
  quantity: number;
  price: number;
  color: ResponseItem<IColor>;
  plastic: PlasticType;
  key: string;
  variant: ResponseItem<IVariant>;
}

export interface ISliceState {
  items: ICartItem[];
  amount: number;  // Total quantity of items
  price: number;   // Total price of all items
  opened: boolean;
}

const initialState: ISliceState = {
  amount: 0,
  price: 0,
  items: [],
  opened: false,
};

/* CONSTANTS */
const MAX_AMOUNT_OF_ITEM = 999;
const MIN_AMOUNT_OF_ITEM = 1;

const calculateTotalPrice = (items: ICartItem[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const calculateTotalAmount = (items: ICartItem[]) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    deleteItem: (state, action: PayloadAction<{ key: string }>) => {
      state.items = state.items.filter((item) => item.key !== action.payload.key);
      state.amount = calculateTotalAmount(state.items);
      state.price = calculateTotalPrice(state.items);
    },
    addItem: (state, action: PayloadAction<Omit<ICartItem, 'key'>>) => {
      const { type, plastic, color, product, quantity } = action.payload;
      const key = type + plastic + color.attributes.name + product.attributes.name;

      const existingItem = state.items.find((it) => it.key === key);
      if (!existingItem) {
        state.items.push({
          ...action.payload,
          key,
        });
      } else {
        existingItem.quantity += quantity;
      }

      state.amount = calculateTotalAmount(state.items);
      state.price = calculateTotalPrice(state.items);
    },
    deleteAllItems: (state) => {
      return initialState;
    },
    increaseItemAmount: (state, action: PayloadAction<{ key: string }>) => {
      state.items = state.items.map((item) => {
        if (item.key === action.payload.key && item.quantity < MAX_AMOUNT_OF_ITEM) {
          item.quantity += 1;
        }
        return item;
      });

      state.amount = calculateTotalAmount(state.items);
      state.price = calculateTotalPrice(state.items);
    },
    decreaseItemAmount: (state, action: PayloadAction<{ key: string }>) => {
      state.items = state.items.map((item) => {
        if (item.key === action.payload.key && item.quantity > MIN_AMOUNT_OF_ITEM) {
          item.quantity -= 1;
        }
        return item;
      });

      state.amount = calculateTotalAmount(state.items);
      state.price = calculateTotalPrice(state.items);
    },
    openCart: (state) => {
      state.opened = true;
    },
    closeCart: (state) => {
      state.opened = false;
    },
    setItemAmount: (state, action: PayloadAction<{ key: string; quantity: number }>) => {
      state.items = state.items.map((item) => {
        if (item.key === action.payload.key) {
          const newQuantity = Math.min(Math.max(action.payload.quantity, MIN_AMOUNT_OF_ITEM), MAX_AMOUNT_OF_ITEM);
          state.amount = state.amount - item.quantity + newQuantity;
          item.quantity = newQuantity;
        }
        return item;
      });

      state.price = calculateTotalPrice(state.items);
    },
  },
});

export const {
  addItem,
  closeCart,
  decreaseItemAmount,
  deleteAllItems,
  deleteItem,
  increaseItemAmount,
  openCart,
  setItemAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
