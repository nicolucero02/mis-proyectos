import { useLanguage } from "@/lib/i18n/language-context";
import { LoaderCircle } from "lucide-react";

type StatusBannerProps = {
  status: string;
  isLoading: boolean;
  generatedAt: string | null;
};

export function StatusBanner({
  status,
  isLoading,
  generatedAt,
}: StatusBannerProps) {
  const { t } = useLanguage();

  return (
    <div className="glass-panel flex flex-col gap-3 rounded-3xl px-4 py-3 text-sm text-white/60 transition-all duration-500 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex items-center gap-2">
        {isLoading ? (
          <LoaderCircle className="h-4 w-4 animate-spin text-violet-300" />
        ) : (
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        )}
        <span>{status}</span>
      </div>
      <div className="text-white/40">
        {generatedAt ? `${t.status.lastGenerated} ${generatedAt}` : t.status.notGenerated}
      </div>
    </div>
  );
}
