import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "./useDebounce";

const Searchbar = ({ onSearchResults }) => {
  const [query, setQuery] = useState(""); // État pour la valeur de saisie
  const debouncedQuery = useDebounce(query, 500); // Délai de 500ms

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery) {
        try {
          const response = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
              debouncedQuery
          );
          onSearchResults(response.data.meals || []); // Transmet les résultats au parent
        } catch (error) {
          console.error("Erreur lors de la recherche :", error);
          onSearchResults([]); // Transmet un tableau vide en cas d'erreur
        }
      } else {
        onSearchResults([]); // Vide les résultats si la recherche est annulée
      }
    };

    performSearch();
  }, [debouncedQuery, onSearchResults]); // Effectuer la recherche uniquement sur la valeur "debounced"

  const handleSearch = (e) => {
    setQuery(e.target.value); // Met à jour la valeur en temps réel
  };

  return (
    <div className=" max-w-xl mx-auto p-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Rechercher un repas..."
        className="w-full p-2 rounded-md text-black border-2 border-gray-300"
      />
    </div>
  );
};

export default Searchbar;
