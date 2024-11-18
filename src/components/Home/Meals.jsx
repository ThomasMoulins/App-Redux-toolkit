import { useState } from "react";
import useToggle from "./useToggle";
import Modal from "./Modal";
import Fetchmeals from "./Fetchmeals";

const Meals = ({ selectedCategory, meals }) => {
  const [selectedMeal, setSelectedMeal] = useState(null); // Repas sélectionné pour la modale
  const [isModalOpen, toggleModal] = useToggle(false);
  const displayMeals = Fetchmeals(selectedCategory, meals);

  const handleOpenModal = (meal) => {
    setSelectedMeal(meal);
    toggleModal(); // Ouvre la modale
  };

  return (
    <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {displayMeals.map((meal) => (
        <div
          key={meal.idMeal}
          className="border rounded-lg p-4 shadow-md bg-white flex flex-col"
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-32 object-cover rounded-md mb-2"
          />
          <h2 className="text-lg font-semibold mb-4">{meal.strMeal}</h2>
          <button
            onClick={() => handleOpenModal(meal)}
            className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Ajouter au calendrier
          </button>
          {isModalOpen && <Modal onClose={toggleModal} meal={selectedMeal} />}
        </div>
      ))}
    </main>
  );
};

export default Meals;
