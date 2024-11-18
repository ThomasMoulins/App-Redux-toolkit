const Modal = ({ onClose, meal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-w-lg p-6">
        <h3 className="text-lg mb-4">
          Ajouter <strong>{meal.strMeal}</strong> au calendrier
        </h3>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};
export default Modal;
