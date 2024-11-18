import { useEffect, useState } from "react";
import axios from "axios";

const CategoriesNav = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  // Récupère les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setCategories(response.data.categories);

        // Sélectionner la première catégorie par défaut
        if (response.data.categories.length > 0) {
          setSelectedCategory(response.data.categories[0].strCategory);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="text-white">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-xl flex items-center justify-center h-16 space-x-4">
        {categories.map((category) => (
          <button
            key={category.idCategory}
            onClick={() => setSelectedCategory(category.strCategory)}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              selectedCategory === category.strCategory
                ? "bg-blue-500 text-white" // Catégorie sélectionnée
                : "hover:bg-gray-700 text-gray-300" // Catégories non sélectionnées
            }`}
          >
            {category.strCategory}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default CategoriesNav;
