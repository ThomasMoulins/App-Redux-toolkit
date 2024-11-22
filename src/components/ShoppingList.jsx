import { useSelector, useDispatch } from "react-redux";
import {
  updateIngredient,
  removeIngredient,
} from "../features/ingredientsSlice";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);

  // Trier les ingrédients par date de consommation croissante
  const sortedIngredients = [...ingredients].sort(
    (a, b) => new Date(a.consumptionDate) - new Date(b.consumptionDate)
  );

  const handleUpdate = (name, unit, recipeId, updates) => {
    dispatch(updateIngredient({ name, unit, recipeId, updates }));
  };

  const handleRemove = (name, unit) => {
    dispatch(removeIngredient({ name, unit }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Liste des ingrédients à acheter
      </h1>
      {sortedIngredients.length === 0 ? (
        <p>Aucun ingrédient dans la liste.</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 my-10">
          {sortedIngredients.map((ingredient) => (
            <div
              key={`${ingredient.name}-${ingredient.unit}-${ingredient.recipeId}`}
              className="flex flex-col items-center text-center mb-10"
            >
              <img
                src={`https://www.themealdb.com/images/ingredients/${ingredient.name}-Small.png`}
                alt={ingredient.name}
                className="w-full h-16 object-contain mb-2"
              />
              <p className="font-semibold">{ingredient.name}</p>
              <div className="flex align-middle items-center">
                <button
                  onClick={() =>
                    handleUpdate(
                      ingredient.name,
                      ingredient.unit,
                      ingredient.recipeId,
                      { quantity: parseFloat(ingredient.quantity - 1) }
                    )
                  }
                  className="ms-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  disabled={ingredient.quantity <= 1}
                >
                  -
                </button>
                <p className="mx-2 text-sm text-gray-600">
                  {ingredient.quantity} {ingredient.unit}
                </p>
                <button
                  onClick={() =>
                    handleUpdate(
                      ingredient.name,
                      ingredient.unit,
                      ingredient.recipeId,
                      { quantity: parseFloat(ingredient.quantity + 1) }
                    )
                  }
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
              <input
                type="date"
                value={ingredient.consumptionDate}
                onChange={(e) =>
                  handleUpdate(
                    ingredient.name,
                    ingredient.unit,
                    ingredient.recipeId,
                    { consumptionDate: e.target.value }
                  )
                }
                className="p-1 my-2 border rounded"
              />
              <button
                onClick={() => handleRemove(ingredient.name, ingredient.unit)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
