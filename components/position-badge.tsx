export default function PositionBadge({ position }: { position: string }) {
  const color =
    position === "Full-time"
      ? "bg-[#DCFCE7] text-[#016630]"
      : "bg-[#DBEAFE] text-[#193CB8]";

  return (
    <div className={`rounded-full px-2.75 py-1 w-fit font-semibold ${color}`}>{position}</div>
  );
}
