import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import Modal from "./Modal";
import useToggle from "./useToggle";

const Mealsbutton = ({ meal }) => {
  const [selectedMeal, setSelectedMeal] = useState(null); // Repas sélectionné pour la modale

  const handleOpenModal = (meal) => {
    setSelectedMeal(meal);
    toggleModal(); // Ouvre la modale
  };
  const [isModalOpen, toggleModal] = useToggle(false);

  return (
    <>
      {/* Lien avec loupe en haut à droite */}
      <Link
        to={`/recipe/${meal.idMeal}`}
        className="absolute top-6 right-6 p-2 bg-gray-200 bg-opacity-70 text-gray-800 rounded-full hover:bg-gray-300 flex items-center justify-center"
      >
        <FaPlus />
      </Link>
      <button
        onClick={() => handleOpenModal(meal)}
        className="mt-auto h-10 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
      >
        <FaBasketShopping />
      </button>
      {isModalOpen && <Modal onClose={toggleModal} meal={selectedMeal} />}
    </>
  );
};

export default Mealsbutton;
