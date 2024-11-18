import axios from "axios";
import { useEffect, useState } from "react";

const Meals = ({ selectedCategory }) => {
  const [meals, setMeals] = useState([]);

  // Récupérer les repas de la catégorie choisie
  useEffect(() => {
    const fetchMeals = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
          );
          setMeals(response.data.meals);
        } catch (error) {
          console.error("Erreur lors de la récupération des repas :", error);
        }
      }
    };

    fetchMeals();
  }, [selectedCategory]);

  return (
    <main className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Meals;
