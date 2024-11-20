import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../features/ingredientsSlice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
});

export default store;
