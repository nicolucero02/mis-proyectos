import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", centered && "mx-auto max-w-3xl text-center")}>
      <span className="inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-sky-200">
        {eyebrow}
      </span>
      <div className="space-y-3">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
      </div>
    </div>
  );
}
