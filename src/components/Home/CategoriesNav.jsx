import { useEffect } from "react";
import { useGetCategoriesQuery } from "../../app/apiSlice";

const CategoriesNav = ({ selectedCategory, setSelectedCategory }) => {
  const { data, error, isLoading } = useGetCategoriesQuery();

  // Sélectionne la première catégorie par défaut
  useEffect(() => {
    if (data && data.categories && data.categories.length > 0) {
      setSelectedCategory(data.categories[0].strCategory);
    }
  }, [data, setSelectedCategory]);

  if (isLoading) {
    return <p>Chargement des catégories...</p>;
  }

  if (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return <p>Erreur lors de la récupération des catégories.</p>;
  }

  const categories = data.categories;

  return (
    <nav className="text-white p-4">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-xl flex items-center justify-center h-40 lg:h-16 px-4">
        <div className="flex flex-wrap space-x-4">
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
      </div>
    </nav>
  );
};

export default CategoriesNav;
