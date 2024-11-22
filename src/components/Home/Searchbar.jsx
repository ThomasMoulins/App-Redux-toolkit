import { useState, useEffect } from "react";
import { useSearchRecipesQuery } from "../../app/apiSlice";
import useDebounce from "./useDebounce";

const Searchbar = ({ onSearchResults }) => {
  const [query, setQuery] = useState(""); // État pour la valeur de saisie
  const debouncedQuery = useDebounce(query, 500); // Délai de 500ms

  const { data, error, isLoading } = useSearchRecipesQuery(debouncedQuery, {
    skip: !debouncedQuery, // Ne pas exécuter la requête si le terme de recherche est vide
  });

  useEffect(() => {
    if (debouncedQuery === "") {
      onSearchResults([]);
    } else if (data && data.meals) {
      onSearchResults(data.meals);
    } else {
      onSearchResults([]);
    }
  }, [data, debouncedQuery, onSearchResults]);

  useEffect(() => {
    if (error) {
      console.error("Erreur lors de la recherche :", error);
      onSearchResults([]);
    }
  }, [error, onSearchResults]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Rechercher un repas..."
        className="w-full p-2 rounded-md text-black border-2 border-gray-300"
      />
      {isLoading && <p>Chargement des résultats...</p>}
      {error && (
        <p className="text-red-500">
          Une erreur est survenue : {error.message}
        </p>
      )}
    </div>
  );
};

export default Searchbar;
