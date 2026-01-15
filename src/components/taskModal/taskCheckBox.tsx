import { Checkbox } from "@/components/ui/checkbox";

interface TaskCheckBoxProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: () => void;
}

export default function TaskCheckBox({
  label,
  id,
  checked,
  onChange,
}: TaskCheckBoxProps) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox
        className="rounded-full"
        id={id}
        checked={checked}
        onCheckedChange={onChange}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-200"
      >
        {label}
      </label>
    </div>
  );
}
