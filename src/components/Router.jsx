// Externe
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Éléments/pages
import Navbar from "./Navbar";
import Home from "./Home/Home";
import Recipe from "./Recipe";
import Checklist from "./Checklist";
import Planning from "./Planning";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/planning" element={<Planning />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;