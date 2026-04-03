export function SkeletonCard() {
  return (
    <div className="glass-panel overflow-hidden rounded-[1.9rem] p-5 sm:p-6">
      <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
      <div className="mt-5 space-y-3">
        <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" />
      </div>
    </div>
  );
}
