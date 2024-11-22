import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addIngredients(state, action) {
      const newIngredients = action.payload;
      newIngredients.forEach((newIngredient) => {
        // Trouver un ingrédient existant avec le même nom et la même unité
        const existingIngredient = state.find(
          (ingredient) =>
            ingredient.name === newIngredient.name &&
            ingredient.unit === newIngredient.unit
        );

        if (existingIngredient) {
          existingIngredient.quantity += newIngredient.quantity;

          // Mettre à jour la date de consommation si elle est plus proche
          if (
            new Date(newIngredient.consumptionDate) <
            new Date(existingIngredient.consumptionDate)
          ) {
            existingIngredient.consumptionDate = newIngredient.consumptionDate;
          }

          // Ajouter l'ID et le nom de la recette s'ils ne sont pas déjà présents
          if (!existingIngredient.recipeIds.includes(newIngredient.recipeId)) {
            existingIngredient.recipeIds.push(newIngredient.recipeId);
            existingIngredient.recipeNames.push(newIngredient.recipeName);
          }
        } else {
          // Ajouter le nouvel ingrédient
          state.push({
            ...newIngredient,
            recipeIds: [newIngredient.recipeId],
            recipeNames: [newIngredient.recipeName],
          });
        }
      });
    },
    updateIngredient(state, action) {
      const { name, unit, recipeId, updates } = action.payload;
      const ingredient = state.find(
        (ing) =>
          ing.name === name && ing.unit === unit && ing.recipeId === recipeId
      );
      if (ingredient) {
        Object.assign(ingredient, updates);
      }
    },
    removeIngredient(state, action) {
      const { name, unit } = action.payload;
      return state.filter(
        (ingredient) => ingredient.name !== name || ingredient.unit !== unit
      );
    },
    removeIngredientsByRecipeId(state, action) {
      return state.filter(
        (ingredient) => ingredient.recipeId !== action.payload.recipeId
      );
    },
    updateIngredientsDateByRecipeId(state, action) {
      const { recipeId, newDate } = action.payload;
      state.forEach((ingredient) => {
        if (ingredient.recipeId === recipeId) {
          ingredient.consumptionDate = newDate;
        }
      });
    },
  },
});

export const {
  addIngredients,
  updateIngredient,
  removeIngredient,
  removeIngredientsByRecipeId,
  updateIngredientsDateByRecipeId,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
