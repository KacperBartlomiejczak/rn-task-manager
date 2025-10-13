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
        <div className="bg-gray-200 p-4 rounded-xl">
          <h4>Select Days</h4>
          <div className=" flex  flex-wrap  gap-5 m-4 ">
            <TaskCheckBox
              label="Monday"
              id="monday"
              checked={selectedDays.includes("monday")}
              onChange={() => handleDaysToggle("monday")}
            />
            <TaskCheckBox
              label="Tuesday"
              id="tuesday"
              checked={selectedDays.includes("tuesday")}
              onChange={() => handleDaysToggle("tuesday")}
            />
            <TaskCheckBox
              label="Wednesday"
              id="wednesday"
              checked={selectedDays.includes("wednesday")}
              onChange={() => handleDaysToggle("wednesday")}
            />
            <TaskCheckBox
              label="Thursday"
              id="thursday"
              checked={selectedDays.includes("thursday")}
              onChange={() => handleDaysToggle("thursday")}
            />
            <TaskCheckBox
              label="Friday"
              id="friday"
              checked={selectedDays.includes("friday")}
              onChange={() => handleDaysToggle("friday")}
            />
            <TaskCheckBox
              label="Saturday"
              id="saturday"
              checked={selectedDays.includes("saturday")}
              onChange={() => handleDaysToggle("saturday")}
            />
            <TaskCheckBox
              label="Sunday"
              id="sunday"
              checked={selectedDays.includes("sunday")}
              onChange={() => handleDaysToggle("sunday")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
