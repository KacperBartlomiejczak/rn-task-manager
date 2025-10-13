import SadEmoji from "@/assets/sadEmoji";

export default function NoTaskAvailable() {
  return (
    <div className="flex flex-col justify-center items-center p-4 mt-4">
      <SadEmoji size={64} color="#9ca3af" />
      <h4 className="font-bold text-lg">No tasks available</h4>
      <p className="font-light">Add your first task to get started</p>
    </div>
  );
}
