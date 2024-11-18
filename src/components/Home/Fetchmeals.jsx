import axios from "axios";
import { useEffect, useState } from "react";

const Fetchmeals = (selectedCategory, meals) => {
  const [categoryMeals, setCategoryMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
          );
          setCategoryMeals(response.data.meals);
        } catch (error) {
          console.error("Erreur lors de la récupération des repas :", error);
        }
      }
    };
    if (!meals) {
      fetchMeals();
    }
  }, [selectedCategory, meals]);

  const displayMeals = meals || categoryMeals; // Affiche les repas de recherche ou de catégorie

  return displayMeals;
};

export default Fetchmeals;
