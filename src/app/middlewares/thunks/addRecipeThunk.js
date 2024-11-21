import { createAsyncThunk } from "@reduxjs/toolkit";
import { addRecipe } from "../../../features/recipesSlice";
import { addIngredients } from "../../../features/ingredientsSlice";

export const addRecipeWithIngredients = createAsyncThunk(
  "recipes/addRecipeWithIngredients",
  async (recipeData, thunkAPI) => {
    try {
      const { recipe, ingredients } = recipeData;

      thunkAPI.dispatch(addRecipe(recipe));
      thunkAPI.dispatch(addIngredients(ingredients));

      return recipe;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
