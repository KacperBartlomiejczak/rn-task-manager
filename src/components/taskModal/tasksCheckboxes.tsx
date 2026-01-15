import TaskCheckBox from "./taskCheckBox";
import { useCheckBoxContext } from "@/context/checkBoxContext";

export default function TaskCheckBoxes() {
  const {
    selectedRecurrence,
    setSelectedRecurrence,
    selectedDays,
    handleDaysToggle,
  } = useCheckBoxContext();

  return (
    <div className="my-4 space-y-2">
      <TaskCheckBox
        label="One-time task"
        id="one-time"
        checked={selectedRecurrence === "one-time"}
        onChange={() => setSelectedRecurrence("one-time")}
      />
      <TaskCheckBox
        label="Every day"
        id="every-day"
        checked={selectedRecurrence === "every-day"}
        onChange={() => setSelectedRecurrence("every-day")}
      />
      <TaskCheckBox
        label="Specific day"
        id="specific-day"
        checked={selectedRecurrence === "specific-day"}
        onChange={() => setSelectedRecurrence("specific-day")}
      />
      {selectedRecurrence === "specific-day" && (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl space-y-3 mt-4">
          <h4 className="text-sm font-semibold text-gray-300 px-1">
            Select Days
          </h4>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {[
              { id: "monday", label: "Mon" },
              { id: "tuesday", label: "Tue" },
              { id: "wednesday", label: "Wed" },
              { id: "thursday", label: "Thu" },
              { id: "friday", label: "Fri" },
              { id: "saturday", label: "Sat" },
              { id: "sunday", label: "Sun" },
            ].map((day) => {
              const isSelected = selectedDays.includes(day.id);
              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => handleDaysToggle(day.id)}
                  className={`flex flex-col items-center justify-center h-12 rounded-xl transition-all duration-300 border-2 text-xs font-bold ${
                    isSelected
                      ? "bg-violet-600/40 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-105"
                      : "bg-white/5 border-transparent text-gray-500 hover:bg-white/10 hover:border-white/10"
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
