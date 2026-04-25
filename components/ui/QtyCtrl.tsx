"use client";

export function QtyCtrl({
  value,
  onChange,
  min = 1,
  max = 9999,
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "lg" ? "w-10 h-12" : size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const valDim = size === "lg" ? "w-12 h-12 text-[18px]" : size === "sm" ? "w-9 h-7 text-[13px]" : "w-10 h-9 text-[14px]";

  return (
    <div className="inline-flex items-center bg-bg-3 border-[1.5px] border-[var(--border)] rounded-md overflow-hidden">
      <button
        type="button"
        className={`${dim} grid place-items-center text-text-2 hover:bg-bg-4 hover:text-text-1 transition-colors`}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <div
        className={`${valDim} grid place-items-center font-display font-bold text-text-1 border-x border-[var(--border)]`}
      >
        {value}
      </div>
      <button
        type="button"
        className={`${dim} grid place-items-center text-text-2 hover:bg-bg-4 hover:text-text-1 transition-colors`}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
