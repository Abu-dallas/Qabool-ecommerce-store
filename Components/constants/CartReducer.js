import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const existingLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const itemsInStorage = localStorage.getItem("cart");
      return itemsInStorage
        ? JSON.parse(itemsInStorage)
        : {
            cartItems: [],
            totalAmount: 0,
            totalQuantity: 0,
          };
    } catch (error) {
      console.log("can't load items in local storage", error);
      return {
        cartItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      };
    }
  }
  if (typeof window === "undefined") {
  }
  return {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0,
  };
};

const saveToLocalStorage = (items) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.log("failed to save item in local storage", error);
    }
  }
};

/*const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};*/

const initialState = existingLocalStorage();

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        toast.error("Item is already in cart");
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
        toast.success("Item added to cart");
      }

      state.totalQuantity += 1;
      state.totalAmount += product.price;

      saveToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== product._id
        );
        toast.success("Item removed frrom cart");
      }
      saveToLocalStorage(state);
    },
    increaseQantity: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += existingItem.price;
        state.totalQuantity += 1;
      }
      saveToLocalStorage(state);
    },
    decreaseQuantity: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalAmount -= existingItem.price;
        state.totalQuantity -= 1;
      }
      saveToLocalStorage(state);
    },
    clearCart: (state, action) => {
      (state.cartItems = []),
        (state.totalAmount = 0),
        (state.totalQuantity = 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQantity,
  decreaseQuantity,
  clearCart,
} = cartReducer.actions;
export default cartReducer.reducer;
