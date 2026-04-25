import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const text =
    size === "lg" ? "text-[30px]" : size === "sm" ? "text-[20px]" : "text-[24px]";
  const bar =
    size === "lg" ? "w-[44px] h-1" : size === "sm" ? "w-[28px] h-[2px]" : "w-[34px] h-[3px]";
  return (
    <Link href="/" className="flex flex-col leading-none cursor-pointer no-underline">
      <span className={`font-display font-black text-text-1 tracking-[-0.01em] ${text}`}>
        INCOMOLAS
      </span>
      <span
        className={`${bar} mt-[3px] rounded-[2px]`}
        style={{ background: "var(--accent)" }}
      />
    </Link>
  );
}
