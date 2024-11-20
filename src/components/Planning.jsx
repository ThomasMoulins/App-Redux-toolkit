import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { useDispatch, useSelector } from "react-redux";
import { updateIngredientDate } from "../features/ingredientsSlice";

const Planning = () => {
  const ingredients = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  const events = ingredients.map((ingredient) => {
    return {
      title: `${ingredient.name} (${ingredient.quantity} ${ingredient.unit})`,
      start: ingredient.consumptionDate,
      extendedProps: {
        ingredientName: ingredient.name,
        unit: ingredient.unit,
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

  const handleEventDrop = (info) => {
    const { event } = info;
    // Récupére les propriétés définies dans l'événement
    const ingredientName = event.extendedProps.ingredientName;
    const unit = event.extendedProps.unit;
    const newDate = event.startStr; // Format ISO string

    dispatch(
      updateIngredientDate({
        name: ingredientName,
        unit: unit,
        newDate: newDate,
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
