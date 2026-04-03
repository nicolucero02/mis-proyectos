import { cn } from "@/lib/utils";

type ResultCardProps = {
  label: string;
  value?: string;
  list?: string[];
  className?: string;
};

export function ResultCard({ label, value, list, className }: ResultCardProps) {
  return (
    <article
      className={cn(
        "glass-panel group relative overflow-hidden rounded-[1.9rem] p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/14 hover:bg-white/[0.08] sm:p-6",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.06] to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
      <p className="text-xs uppercase tracking-[0.2em] text-white/38">{label}</p>

      {list ? (
        <ul className="mt-5 space-y-3 text-base leading-7 text-white/82">
          {list.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 transition-colors duration-300 group-hover:bg-white/[0.05]"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-lg leading-8 text-white/84 sm:text-[1.15rem]">{value}</p>
      )}
    </article>
  );
}
