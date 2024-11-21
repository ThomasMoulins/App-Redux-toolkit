import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../features/ingredientsSlice";
import recipesReducer from "../features/recipesSlice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
  },
});

export default store;
