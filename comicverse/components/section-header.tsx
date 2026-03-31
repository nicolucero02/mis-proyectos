import Link from "next/link";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className="text-label text-[11px] font-semibold uppercase tracking-[0.38em]">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight text-charcoal dark:text-ivory sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="text-muted mt-4 max-w-2xl text-lg leading-8">{description}</p>
        ) : null}
      </div>
      {href && linkLabel ? (
        <Link
          href={href}
          className="border-subtle bg-elevated text-main inline-flex rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:bg-charcoal hover:text-ivory dark:hover:bg-ivory dark:hover:text-charcoal"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
