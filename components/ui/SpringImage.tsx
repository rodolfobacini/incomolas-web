import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

const TONE_BG: Record<Product["imageTone"], string> = {
  steel: "radial-gradient(ellipse at 50% 40%, #232325 0%, #111113 100%)",
  zinc: "radial-gradient(ellipse at 50% 40%, #1a2030 0%, #0d0f14 100%)",
  green: "radial-gradient(ellipse at 50% 40%, #1a2418 0%, #0d1208 100%)",
  chrome: "radial-gradient(ellipse at 50% 40%, #1f1f1f 0%, #0a0a0a 100%)",
  dark: "radial-gradient(ellipse at 50% 40%, #181818 0%, #060606 100%)",
};

const TONE_RING: Record<Product["imageTone"], string> = {
  steel: "from-zinc-700 via-zinc-200 to-zinc-700",
  zinc: "from-blue-900 via-blue-200 to-blue-900",
  green: "from-emerald-900 via-emerald-300 to-emerald-900",
  chrome: "from-zinc-600 via-white to-zinc-600",
  dark: "from-zinc-800 via-zinc-500 to-zinc-800",
};

const SIZE_HEIGHT = { sm: 90, md: 180, lg: 280, xl: 420 } as const;
const SIZE_IMG_RATIO = { sm: 0.85, md: 0.78, lg: 0.78, xl: 0.78 } as const;

export function SpringImage({
  tone = "steel",
  size = "md",
  src,
  label,
  alt,
  className,
  imageFilter,
}: {
  tone?: Product["imageTone"];
  size?: "sm" | "md" | "lg" | "xl";
  src?: string;
  label?: string;
  alt?: string;
  className?: string;
  imageFilter?: string;
}) {
  const h = SIZE_HEIGHT[size];

  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center overflow-hidden",
        className,
      )}
      style={{ background: TONE_BG[tone], height: h }}
    >
      {src ? (
        <div
          className="relative"
          style={{
            width: `${SIZE_IMG_RATIO[size] * 100}%`,
            height: `${SIZE_IMG_RATIO[size] * 100}%`,
            filter: `drop-shadow(0 8px 30px rgba(0,0,0,0.7))${
              imageFilter ? ` ${imageFilter}` : ""
            }`,
            transition: "filter 200ms ease",
          }}
        >
          <Image
            src={src}
            alt={alt ?? label ?? "Mola Incomolas"}
            fill
            sizes={
              size === "xl"
                ? "(max-width: 768px) 90vw, 600px"
                : size === "lg"
                  ? "(max-width: 768px) 90vw, 400px"
                  : size === "md"
                    ? "(max-width: 768px) 50vw, 300px"
                    : "120px"
            }
            style={{ objectFit: "contain" }}
            priority={size === "xl"}
          />
        </div>
      ) : (
        <RingPlaceholder tone={tone} size={size} />
      )}
      {label && (
        <span className="absolute bottom-2 right-2 font-mono text-[9px] text-text-3 bg-bg border border-[var(--border)] px-1.5 py-0.5 rounded-sm">
          {label}
        </span>
      )}
    </div>
  );
}

function RingPlaceholder({
  tone,
  size,
}: {
  tone: Product["imageTone"];
  size: "sm" | "md" | "lg" | "xl";
}) {
  const ringSizes = { sm: 50, md: 110, lg: 170, xl: 240 };
  const r = ringSizes[size];
  return (
    <div
      className={cn(
        "rounded-[50%] bg-gradient-to-r opacity-90",
        TONE_RING[tone],
      )}
      style={{
        width: r,
        height: r * 1.4,
        maskImage:
          "repeating-linear-gradient(0deg, #000 0, #000 6px, transparent 6px, transparent 12px)",
        WebkitMaskImage:
          "repeating-linear-gradient(0deg, #000 0, #000 6px, transparent 6px, transparent 12px)",
        filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.7))",
      }}
      aria-hidden
    />
  );
}
