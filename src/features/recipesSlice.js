import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe(state, action) {
      const newRecipe = action.payload;
      // Vérifier si la recette existe déjà à la même date
      const existingRecipe = state.find(
        (recipe) =>
          recipe.id === newRecipe.id &&
          recipe.consumptionDate === newRecipe.consumptionDate
      );
      if (!existingRecipe) {
        state.push(newRecipe);
      }
    },
    removeRecipe(state, action) {
      const { id, consumptionDate } = action.payload;
      return state.filter(
        (recipe) =>
          !(recipe.id === id && recipe.consumptionDate === consumptionDate)
      );
    },
    updateRecipeDate(state, action) {
      const { id, oldDate, newDate } = action.payload;
      const recipe = state.find(
        (recipe) => recipe.id === id && recipe.consumptionDate === oldDate
      );
      if (recipe) {
        recipe.consumptionDate = newDate;
      }
    },
  },
});

export const { addRecipe, removeRecipe, updateRecipeDate } =
  recipesSlice.actions;
export default recipesSlice.reducer;
