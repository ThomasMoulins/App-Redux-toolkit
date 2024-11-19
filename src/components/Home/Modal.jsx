const Modal = ({ onClose, meal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-w-lg p-6">
        <h3 className="text-lg mb-4">
          Ajouter <strong>{meal.strMeal}</strong> au calendrier
        </h3>
        <div className="flex mt-4">
          <button
            onClick={onClose}
            className="px-6 py-4 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Fermer
          </button>
          <button
            onClick={onClose}
            className="ml-auto px-6 py-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
