import { useState } from "react";
import { useDispatch } from "react-redux";
import { addIngredients } from "../../features/ingredientsSlice";
import { addRecipe } from "../../features/recipesSlice";
import useFetchIngredients from "../Recipe/useFetchIngredients";
import { parseMeasure } from "./parseMeasure";
import Ingredientpicture from "../Recipe/Ingredientpicture";

const Modal = ({ onClose, meal }) => {
  const dispatch = useDispatch();
  const [consumptionDate, setConsumptionDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const mealDetails = useFetchIngredients(meal.idMeal);

  if (mealDetails === null) {
    return <p>Chargement...</p>;
  } else if (mealDetails === undefined) {
    return (
      <p className="text-center text-red-500">
        Erreur lors du chargement des détails du repas.
      </p>
    );
  }

  const handleAddToCalendar = () => {
    if (!consumptionDate) {
      setErrorMessage(
        "Veuillez sélectionner une date de réalisation de la recette."
      );
      return;
    }
    setErrorMessage("");
    const ingredients = [];

    // Récupérer les ingrédients et mesures
    for (let i = 1; i <= 20; i++) {
      const ingredientName = mealDetails[`strIngredient${i}`];
      const measure = mealDetails[`strMeasure${i}`];

      if (ingredientName && ingredientName.trim() !== "") {
        // Utiliser la fonction parseMeasure pour extraire quantité et unité
        const { quantity, unit } = parseMeasure(measure);

        ingredients.push({
          name: ingredientName.trim(),
          quantity,
          unit,
          consumptionDate,
          recipeId: meal.idMeal,
          recipeName: meal.strMeal,
        });
      }
    }
    dispatch(
      addRecipe({
        id: meal.idMeal,
        name: meal.strMeal,
        consumptionDate,
      })
    );
    dispatch(addIngredients(ingredients));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-55 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-w-xl p-6 m-4">
        <h3 className="text-lg mb-4">
          Ajouter <strong>{meal.strMeal}</strong> au calendrier
        </h3>
        <div className="grid grid-cols-6 gap-2 mb-10">
          <Ingredientpicture meal={mealDetails} />
        </div>
        <label className="block mb-2">
          Date de réalisation de la recette :
          <input
            type="date"
            value={consumptionDate}
            onChange={(e) => setConsumptionDate(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </label>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="flex mt-4">
          <button
            onClick={onClose}
            className="px-6 py-4 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Fermer
          </button>
          <button
            onClick={handleAddToCalendar}
            className="ml-auto px-6 py-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
