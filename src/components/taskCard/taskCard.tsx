//components
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

//interfaces
interface TaskCardProps {
  title: string;
}

export default function TaskCard({ title }: TaskCardProps) {
  return (
    <Card>
        <CardContent className="flex items-center gap-4">
          <Checkbox />
          <span className="text-left">{title}</span>
        </CardContent>
    </Card>
  );
}
