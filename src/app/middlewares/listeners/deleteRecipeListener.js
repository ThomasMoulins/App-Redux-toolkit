import { createListenerMiddleware } from "@reduxjs/toolkit";
import { removeRecipe, updateRecipeDate } from "../../../features/recipesSlice";
import {
  removeIngredientsByRecipeId,
  updateIngredientsDateByRecipeId,
} from "../../../features/ingredientsSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: removeRecipe,
  effect: (action, listenerApi) => {
    const { id, consumptionDate } = action.payload;
    // Dispatch l'action pour supprimer les ingrédients associés
    listenerApi.dispatch(
      removeIngredientsByRecipeId({ recipeId: id, consumptionDate })
    );
  },
});

listenerMiddleware.startListening({
  actionCreator: updateRecipeDate,
  effect: (action, listenerApi) => {
    const { id, oldDate, newDate } = action.payload;
    // Dispatch l'action pour mettre à jour les dates des ingrédients associés
    listenerApi.dispatch(
      updateIngredientsDateByRecipeId({
        recipeId: id,
        oldDate,
        newDate,
      })
    );
  },
});

export default listenerMiddleware.middleware;
