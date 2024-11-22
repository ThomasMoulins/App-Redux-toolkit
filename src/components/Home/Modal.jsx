import { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetRecipeByIdQuery } from "../../app/apiSlice";
import { addRecipeWithIngredients } from "../../app/middlewares/thunks/addRecipeThunk";
import Ingredientpicture from "../Recipe/Ingredientpicture";

const Modal = ({ onClose, meal }) => {
  const dispatch = useDispatch();
  const [consumptionDate, setConsumptionDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data, error, isLoading } = useGetRecipeByIdQuery(meal.idMeal);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-55 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6">
          <p>Chargement...</p>
        </div>
      </div>
    );
  } else if (error) {
    console.log(error);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-55 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6">
          <p className="text-center text-red-500">
            Erreur lors du chargement des détails du repas.
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  const mealDetails = data.meals[0];

  const handleAddToCalendar = () => {
    if (!consumptionDate) {
      setErrorMessage(
        "Veuillez sélectionner une date de réalisation de la recette."
      );
      return;
    }
    setErrorMessage("");
    const recipeData = {
      mealId: meal.idMeal,
      consumptionDate,
    };

    // Dispatch le thunk pour ajouter la recette et les ingrédients
    dispatch(addRecipeWithIngredients(recipeData))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((error) => {
        setErrorMessage(error || "Erreur inconnue lors de l'ajout.");
      });
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
