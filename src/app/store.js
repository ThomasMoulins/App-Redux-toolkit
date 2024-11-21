import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../features/ingredientsSlice";
import recipesReducer from "../features/recipesSlice";
import deleteRecipeListener from "./middlewares/listeners/deleteRecipeListener";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(deleteRecipeListener),
});

export default store;
