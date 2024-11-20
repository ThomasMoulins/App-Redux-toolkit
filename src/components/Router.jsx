// Externe
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Éléments/pages
import Navbar from "./Navbar";
import Home from "./Home/Home";
import Recipe from "./Recipe/Recipe";
import ShoppingList from "./ShoppingList";
import Planning from "./Planning";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="/planning" element={<Planning />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
