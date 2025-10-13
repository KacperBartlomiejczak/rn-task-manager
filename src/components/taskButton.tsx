import { Button } from "@/components/ui/button";

interface tasakButtonProps {
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}
export default function taskButton({
  title,
  onClick,
  children,
  className,
}: tasakButtonProps) {
  return (
    <Button
      variant="secondary"
      className={`mt-4 w-full cursor-pointer flex-wrap ${className}`}
      onClick={onClick}
    >
      {children}
      {title}
    </Button>
  );
}
