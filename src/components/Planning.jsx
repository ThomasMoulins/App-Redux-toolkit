import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { useDispatch, useSelector } from "react-redux";
import { removeRecipe, updateRecipeDate } from "../features/recipesSlice";

const Planning = () => {
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const events = recipes.map((recipe) => {
    return {
      title: recipe.name,
      start: recipe.consumptionDate,
      extendedProps: {
        recipeId: recipe.id,
        consumptionDate: recipe.consumptionDate,
      },
    };
  });

  const renderEventContent = (eventInfo) => {
    return (
      <div className="text-xs text-black bg-blue-200 p-1 rounded">
        <p>{eventInfo.event.title}</p>
      </div>
    );
  };

  const handleEventClick = (info) => {
    if (
      window.confirm(
        `Voulez-vous supprimer la recette "${info.event.title}" du planning ?`
      )
    ) {
      const recipeId = info.event.extendedProps.recipeId;
      const consumptionDate = info.event.extendedProps.consumptionDate;

      dispatch(removeRecipe({ id: recipeId, consumptionDate }));
    }
  };

  const handleEventDrop = (info) => {
    const { event } = info;
    const recipeId = event.extendedProps.recipeId;
    const oldDate = event.extendedProps.consumptionDate;
    const newDate = event.startStr;

    dispatch(
      updateRecipeDate({
        id: recipeId,
        oldDate,
        newDate,
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Planning des ingrédients</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={frLocale}
        events={events}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventContent={renderEventContent}
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next today",
        }}
        selectable={true}
        editable={true}
        height="auto"
      />
    </div>
  );
};

export default Planning;
