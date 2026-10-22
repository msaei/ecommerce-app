/*
 * Stand-in for photography until real assets exist. Swap each usage for
 * next/image with the same wrapper classes.
 */

const tones = {
  night: "linear-gradient(165deg, #3b3633 0%, #1e1b19 55%, #0e0d0c 100%)",
  forest: "linear-gradient(165deg, #4d5548 0%, #2a3027 60%, #161a15 100%)",
  wine: "linear-gradient(165deg, #5c3330 0%, #351c1b 60%, #1c0f0e 100%)",
  stone: "linear-gradient(165deg, #d9d3c9 0%, #bdb5a8 100%)",
  sand: "linear-gradient(200deg, #ece5d9 0%, #d3c8b6 100%)",
  mist: "linear-gradient(180deg, #efedea 0%, #dedbd5 100%)",
} as const;

export type PlaceholderTone = keyof typeof tones;

type PlaceholderImageProps = {
  tone?: PlaceholderTone;
  /** Accessible description. Omit when the image is decorative. */
  label?: string;
  className?: string;
};

export function PlaceholderImage({
  tone = "mist",
  label,
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`size-full ${className}`}
      style={{ backgroundImage: tones[tone] }}
    />
  );
}

const shots = {
  front: { width: "46%", aspectRatio: "1 / 1", shadow: true },
  side: { width: "58%", aspectRatio: "4 / 3", shadow: true },
  back: { width: "40%", aspectRatio: "3 / 4", shadow: true },
  detail: { width: "88%", aspectRatio: "1 / 1", shadow: false },
} as const;

/* Product stand-in: a soft object on the neutral product ground. */
export function ProductPlaceholder({
  hue,
  shot = "front",
}: {
  hue: string;
  shot?: keyof typeof shots;
}) {
  const { width, aspectRatio, shadow } = shots[shot];

  return (
    <div aria-hidden="true" className="flex size-full items-center justify-center">
      <div className="relative" style={{ width }}>
        <div
          className="w-full"
          style={{
            aspectRatio,
            backgroundImage: `radial-gradient(120% 120% at 30% 25%, ${hue} 0%, color-mix(in srgb, ${hue} 70%, #000) 100%)`,
          }}
        />
        {shadow && (
          <div className="absolute -bottom-4 left-1/2 h-3 w-4/5 -translate-x-1/2 rounded-[50%] bg-black/10 blur-sm" />
        )}
      </div>
    </div>
  );
}
