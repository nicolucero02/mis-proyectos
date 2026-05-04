import clsx from "clsx";

type BrandMarkProps = {
  className?: string;
  mono?: boolean;
};

export function BrandMark({ className, mono: _mono = false }: BrandMarkProps) {
  return (
    <span
      className={clsx(
        "relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-[0.85rem] border border-[rgba(84,56,45,0.08)] bg-[linear-gradient(180deg,#f2dfcd_0%,#cf8d67_52%,#b97657_100%)] shadow-[0_12px_28px_rgba(20,16,13,0.14)]",
        className
      )}
      aria-hidden="true"
    >
      <span className="select-none font-[family-name:var(--font-body)] text-[2rem] font-semibold leading-none tracking-[-0.08em] text-[#1a1514] translate-x-[-0.04em]">
        C
      </span>
    </span>
  );
}
