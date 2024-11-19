import { useEffect, useState } from "react";
import axios from "axios";

const FetchIngredients = (id) => {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (response.data.meals && response.data.meals.length > 0) {
          setMeal(response.data.meals[0]);
        } else {
          setMeal(undefined); // Aucun repas trouvé
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du plat :",
          error
        );
        setMeal(undefined); // En cas d'erreur, définir à undefined
      }
    };

    if (id) {
      fetchMealDetails();
    }
  }, [id]);

  return meal;
};

export default FetchIngredients;
