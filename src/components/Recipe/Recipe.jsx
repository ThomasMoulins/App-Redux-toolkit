import { useParams } from "react-router-dom";
import { useGetRecipeByIdQuery } from "../../app/apiSlice";
import Ingredientpicture from "./Ingredientpicture";

const Recipe = () => {
  const { id } = useParams(); // Récupère l'ID depuis les paramètres de l'URL

  const { data, error, isLoading } = useGetRecipeByIdQuery(id);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">Chargement des détails...</p>
    );
  }

  if (error || !data || !data.meals) {
    return (
      <p className="text-center text-red-500">
        Erreur :{" "}
        {error?.message || "Impossible de charger les détails du repas."}
      </p>
    );
  }

  const meal = data.meals[0];

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        ⟵ Retour
      </button>
      <div className="flex">
        <h1 className="text-3xl font-bold mb-4 mx-auto md:mx-10">
          {meal.strMeal}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6 mb-10">
        {/* Image principale du plat */}
        <div className="md:w-1/4 md:max-w-full max-w-60 mx-auto">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-auto object-cover shadow-lg rounded-3xl mb-4"
          />
        </div>
        {/* Ingrédients avec images */}
        <div className="md:w-3/4">
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-4">
            <Ingredientpicture meal={meal} />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-2">Recette</h2>
      <p className="mb-4">{meal.strInstructions}</p>
    </div>
  );
};

export default Recipe;
