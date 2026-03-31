type NewsletterCTAProps = {
  labels: {
    eyebrow: string;
    title: string;
    description: string;
    placeholder: string;
    button: string;
  };
};

export function NewsletterCTA({ labels }: NewsletterCTAProps) {
  return (
    <section className="surface-border overflow-hidden rounded-[2.5rem] border bg-charcoal px-6 py-12 text-ivory shadow-[0_34px_110px_rgba(20,16,13,0.2)] sm:px-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-copper/75">
            {labels.eyebrow}
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight sm:text-5xl xl:text-6xl">
            {labels.title}
          </h2>
        </div>
        <div>
          <p className="max-w-2xl text-lg leading-8 text-white/78">
            {labels.description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder={labels.placeholder}
              className="newsletter-input h-12 flex-1 rounded-full px-5 text-sm outline-none transition"
            />
            <button className="h-12 rounded-full bg-copper px-6 text-sm font-semibold text-white transition hover:bg-[#a34f2b]">
              {labels.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
