import Fetchmeals from "./Fetchmeals";
import Mealsbutton from "./Mealsbutton";

const Meals = ({ selectedCategory, meals }) => {
  const displayMeals = Fetchmeals(selectedCategory, meals);

  return (
    <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {displayMeals.map((meal) => (
        <div
          key={meal.idMeal}
          className="relative border rounded-lg p-4 shadow-md bg-white flex flex-col"
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-32 object-cover rounded-md mb-2"
          />
          <h2 className="text-lg font-semibold mb-4">{meal.strMeal}</h2>
          <Mealsbutton meal={meal} />
        </div>
      ))}
    </main>
  );
};

export default Meals;
