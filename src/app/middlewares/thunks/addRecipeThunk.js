import { createAsyncThunk } from "@reduxjs/toolkit";
import { addRecipe } from "../../../features/recipesSlice";
import { addIngredients } from "../../../features/ingredientsSlice";
import { recipeApi } from "../../apiSlice";
import parseMeasure from "./parseMeasure";

export const addRecipeWithIngredients = createAsyncThunk(
  "recipes/addRecipeWithIngredients",
  async (recipeData, thunkAPI) => {
    try {
      const { mealId, consumptionDate } = recipeData;

      const result = await thunkAPI
        .dispatch(recipeApi.endpoints.getRecipeById.initiate(mealId))
        .unwrap();

      if (result.meals && result.meals.length > 0) {
        const mealDetails = result.meals[0];

        // Prépare la recette
        const recipe = {
          id: mealDetails.idMeal,
          name: mealDetails.strMeal,
          consumptionDate,
        };

        // Extrait les ingrédients et mesures
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
          const ingredientName = mealDetails[`strIngredient${i}`];
          const measure = mealDetails[`strMeasure${i}`];

          if (ingredientName && ingredientName.trim() !== "") {
            const { quantity, unit } = parseMeasure(measure);

            ingredients.push({
              name: ingredientName.trim(),
              quantity,
              unit,
              consumptionDate,
              recipeId: mealDetails.idMeal,
              recipeName: mealDetails.strMeal,
            });
          }
        }

        thunkAPI.dispatch(addRecipe(recipe));
        thunkAPI.dispatch(addIngredients(ingredients));

        return recipe;
      } else {
        return thunkAPI.rejectWithValue("Recette non trouvée");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Erreur inconnue");
    }
  }
);
