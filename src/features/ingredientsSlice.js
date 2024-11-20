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
      const { name, unit, updates } = action.payload;
      const ingredient = state.find(
        (ing) => ing.name === name && ing.unit === unit
      );
      if (ingredient) {
        Object.assign(ingredient, updates);
      }
    },
    removeIngredient(state, action) {
      return state.filter(
        (ingredient) =>
          ingredient.name !== action.payload.name ||
          ingredient.unit !== action.payload.unit
      );
    },
    updateIngredientDate(state, action) {
      const { name, unit, newDate } = action.payload;
      const ingredient = state.find(
        (ing) => ing.name === name && ing.unit === unit
      );
      if (ingredient) {
        ingredient.consumptionDate = newDate;
      }
    },
  },
});

export const {
  addIngredients,
  updateIngredient,
  removeIngredient,
  updateIngredientDate,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
