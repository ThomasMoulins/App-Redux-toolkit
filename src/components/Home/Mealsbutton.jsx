import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaCalendarPlus } from "react-icons/fa6";
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
      <div className="mt-auto flex">
        <button
          onClick={() => handleOpenModal(meal)}
          className="h-10 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
        >
          <FaCalendarPlus />
        </button>
        <Link
          to={``}
          className="h-10 px-4 ms-auto bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
        >
          <FaCartArrowDown />
        </Link>
      </div>
      {isModalOpen && <Modal onClose={toggleModal} meal={selectedMeal} />}
    </>
  );
};

export default Mealsbutton;
