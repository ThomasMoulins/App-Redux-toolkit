import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../features/ingredientsSlice";
import recipesReducer from "../features/recipesSlice";
import { recipeApi } from "./apiSlice";
import deleteRecipeListener from "./middlewares/listeners/deleteRecipeListener";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(deleteRecipeListener)
      .concat(recipeApi.middleware),
});

export default store;
