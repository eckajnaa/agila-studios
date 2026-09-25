interface ZigzagDividerProps {
  topColor: string;
  bottomColor: string;
  flip?: boolean;
}

export default function ZigzagDivider({
  topColor,
  bottomColor,
  flip = false,
}: ZigzagDividerProps) {
  const teeth = 8;
  const segW = 1200 / teeth;
  const height = 40;

  const points = Array.from({ length: teeth }, (_, i) => {
    const x0 = i * segW;
    const x1 = x0 + segW / 2;
    const x2 = x0 + segW;
    return `L ${x0} ${height} L ${x1} 0 L ${x2} ${height}`;
  }).join(" ");

  const d = `M 0 ${height} ${points} L 1200 ${height} Z`;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: topColor,
        height: `${height}px`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 1200 ${height}`}
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-full w-full"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <path d={d} fill={bottomColor} />
      </svg>
    </div>
  );
}
