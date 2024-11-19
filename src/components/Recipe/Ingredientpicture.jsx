const Ingredientpicture = ({ meal }) => {
  Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
    const ingredient = meal[`strIngredient${index}`];
    const measure = meal[`strMeasure${index}`];

    if (ingredient && ingredient.trim() !== "") {
      const ingredientImageUrl = `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;

      return (
        <div key={index} className="flex flex-col items-center text-center">
          <img
            src={ingredientImageUrl}
            alt={ingredient}
            className="w-16 h-16 object-cover mb-2"
          />
          <p className="font-semibold">{ingredient}</p>
          <p className="text-sm text-gray-600">{measure}</p>
        </div>
      );
    } else {
      return null;
    }
  });
};

export default Ingredientpicture;
