import { cn } from "@/lib/utils";
import { TONE_OPTIONS } from "@/lib/mocks/tone-options";
import { useLanguage } from "@/lib/i18n/language-context";
import type { ToneOption } from "@/types/concept";

type ToneSelectorProps = {
  selectedTone: ToneOption;
  onSelect: (tone: ToneOption) => void;
};

export function ToneSelector({ selectedTone, onSelect }: ToneSelectorProps) {
  const { t } = useLanguage();

  return (
    <div>
      <div className="mb-3 text-sm text-white/50">{t.tone.title}</div>
      <div className="flex flex-wrap gap-2">
        {TONE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn(
              "rounded-full border px-3 py-2 text-sm transition",
              selectedTone === option.value
                ? "border-white/20 bg-white text-black"
                : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10"
            )}
          >
            {t.tone.labels[option.value]}
          </button>
        ))}
      </div>
    </div>
  );
}
