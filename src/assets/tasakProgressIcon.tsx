export default function TaskProgressIcon({
  color,
  size,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 200}
      height={size || 200}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke={color || "#000000"}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="m22 7l-7.38 7.335c-.997.991-1.496 1.487-2.115 1.487c-.619 0-1.117-.496-2.115-1.488l-.24-.238c-.997-.992-1.497-1.489-2.116-1.489s-1.118.497-2.115 1.49L2 18M22 7v5.546M22 7h-5.582"
      />
    </svg>
  );
}
