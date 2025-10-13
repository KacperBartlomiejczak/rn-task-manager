import { useState, createContext, useContext } from "react";

type RecurrenceType = "one-time" | "every-day" | "specific-day";

interface CheckBoxContextType {
  selectedRecurrence: RecurrenceType;
  setSelectedRecurrence: (type: RecurrenceType) => void;
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
  handleDaysToggle: (day: string) => void;
}

const CheckBoxContext = createContext<CheckBoxContextType | undefined>(
  undefined
);

export function CheckBoxProvider({ children }: { children: React.ReactNode }) {
  const [selectedRecurrence, setSelectedRecurrence] = useState<RecurrenceType>("one-time");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleDaysToggle = (day: string) => {
    setSelectedDays(prevDays => {
        return prevDays.includes(day) 
            ? prevDays.filter(d => d !== day)  
            : [...prevDays, day]               
    })
}

  return (
    <CheckBoxContext.Provider
      value={{
        selectedRecurrence,
        setSelectedRecurrence,
        selectedDays,
        setSelectedDays,
        handleDaysToggle
      }}
    >
      {children}
    </CheckBoxContext.Provider>
  );
}

export function useCheckBoxContext() {
  const context = useContext(CheckBoxContext);
  if (!context) {
    throw new Error(
      "useCheckBoxContext must be used within a CheckBoxProvider"
    );
  }
  return context;
}
