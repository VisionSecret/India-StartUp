import { createSlice } from "@reduxjs/toolkit";

// Initial state of the cart
const initialState = {
  items: [], // Array to hold cart items
  totalQuantity: 0, // Total number of items in the cart
  totalAmount: 0, // Total price of all items in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add an item to the cart
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
          image: newItem.thumbnail,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },

    // Remove an item from the cart
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
    },

    // Update the quantity of an item
    updateQuantity(state, action) {
      const { id, quantity } = action.payload; // Get id and new quantity
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        // Calculate the difference in quantity
        const quantityDiff = quantity - existingItem.quantity;
        state.totalQuantity += quantityDiff; // Update total quantity
        if (quantity <= 0) {
          // If quantity is 0 or less, remove the item
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          // Update the item's quantity and total price
          existingItem.quantity = quantity;
          existingItem.totalPrice = existingItem.price * quantity;
        }
        // Recalculate total amount
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
    },

    // Clear the cart
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// Export reducer
export default cartSlice.reducer;