import { useState } from "react";
import CategoriesNav from "./CategoriesNav";
import Meals from "./Meals";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <CategoriesNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Meals selectedCategory={selectedCategory} />
    </>
  );
};

export default Home;
