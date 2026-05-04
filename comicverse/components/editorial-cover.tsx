import clsx from "clsx";

export type EditorialCoverTone = "soft" | "warm" | "dark";
export type EditorialCoverVariant = "indie" | "novela-grafica" | "guias" | "rankings";

type EditorialCoverProps = {
  variant: EditorialCoverVariant;
  compact?: boolean;
  className?: string;
};

const variantStyles: Record<
  EditorialCoverVariant,
  {
    tone: EditorialCoverTone;
  }
> = {
  indie: {
    tone: "warm"
  },
  "novela-grafica": {
    tone: "soft"
  },
  guias: {
    tone: "soft"
  },
  rankings: {
    tone: "dark"
  }
};

const toneStyles: Record<
  EditorialCoverTone,
  {
    shell: string;
    border: string;
    accent: string;
    line: string;
    frame: string;
  }
> = {
  soft: {
    shell:
      "bg-[linear-gradient(180deg,rgba(255,250,245,0.9),rgba(243,233,223,0.82))] dark:bg-[linear-gradient(180deg,rgba(31,24,23,0.92),rgba(22,17,16,0.92))]",
    border: "border-[rgba(61,40,34,0.08)] dark:border-white/10",
    accent: "bg-[#b67a5a]",
    line: "bg-[rgba(61,40,34,0.14)] dark:bg-white/10",
    frame: "border-[rgba(61,40,34,0.08)] dark:border-white/10"
  },
  warm: {
    shell:
      "bg-[radial-gradient(circle_at_top_left,rgba(182,122,90,0.12),transparent_28%),linear-gradient(180deg,rgba(247,238,229,0.94),rgba(236,223,211,0.88))] dark:bg-[radial-gradient(circle_at_top_left,rgba(182,122,90,0.12),transparent_24%),linear-gradient(180deg,rgba(35,27,25,0.94),rgba(24,18,17,0.94))]",
    border: "border-[rgba(79,53,45,0.08)] dark:border-white/10",
    accent: "bg-[#b67a5a]",
    line: "bg-[rgba(79,53,45,0.14)] dark:bg-white/10",
    frame: "border-[rgba(79,53,45,0.08)] dark:border-white/10"
  },
  dark: {
    shell:
      "bg-[linear-gradient(180deg,rgba(236,228,221,0.94),rgba(224,212,204,0.88))] dark:bg-[linear-gradient(180deg,rgba(31,22,23,0.94),rgba(20,15,16,0.94))]",
    border: "border-[rgba(70,46,42,0.08)] dark:border-white/10",
    accent: "bg-[#4b232b]",
    line: "bg-[rgba(70,46,42,0.14)] dark:bg-white/10",
    frame: "border-[rgba(70,46,42,0.08)] dark:border-white/10"
  }
};

export function resolveEditorialVariant(input: string): EditorialCoverVariant {
  if (input === "indie" || input === "terror" || input === "autores") return "indie";
  if (input === "novela-grafica" || input === "ciencia-ficcion") return "novela-grafica";
  if (input === "guias") return "guias";
  return "rankings";
}

export function EditorialCover({
  variant,
  compact = false,
  className
}: EditorialCoverProps) {
  const tone = toneStyles[variantStyles[variant].tone];

  return (
    <div
      className={clsx(
        "relative overflow-hidden border",
        compact ? "min-h-[168px]" : "min-h-[224px]",
        tone.shell,
        tone.border,
        className
      )}
    >
      <div className="absolute inset-0 opacity-80">
        <div className={clsx("absolute left-6 top-6 h-1.5 w-14 rounded-full", tone.accent)} />
        <div className={clsx("absolute left-6 top-14 h-px w-[42%]", tone.line)} />
        <div className={clsx("absolute left-6 top-[4.4rem] h-px w-[28%]", tone.line)} />
        <div className={clsx("absolute inset-x-6 bottom-6 top-24 rounded-[1.4rem] border", tone.frame)} />
        <div className={clsx("absolute inset-x-10 bottom-10 h-px", tone.line)} />
      </div>
    </div>
  );
}
