import { useState } from "react";
import CategoriesNav from "./CategoriesNav";
import Meals from "./Meals";
import Searchbar from "./Searchbar";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <Searchbar onSearchResults={setSearchResults} />
      <CategoriesNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Affichage des résultats de recherche ou des repas de la catégorie */}
      {searchResults.length > 0 ? (
        <Meals selectedCategory={null} meals={searchResults} />
      ) : (
        <Meals selectedCategory={selectedCategory} />
      )}
    </>
  );
};

export default Home;
