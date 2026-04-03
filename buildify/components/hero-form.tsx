import { Sparkles, Wand2 } from "lucide-react";
import { ToneSelector } from "@/components/tone-selector";
import { useLanguage } from "@/lib/i18n/language-context";
import type { ToneOption } from "@/types/concept";

type HeroFormProps = {
  idea: string;
  tone: ToneOption;
  isLoading: boolean;
  canGenerate: boolean;
  exampleIdeas: string[];
  onIdeaChange: (value: string) => void;
  onToneChange: (value: ToneOption) => void;
  onExampleSelect: (value: string) => void;
  onGenerate: () => void;
};

export function HeroForm({
  idea,
  tone,
  isLoading,
  canGenerate,
  exampleIdeas,
  onIdeaChange,
  onToneChange,
  onExampleSelect,
  onGenerate,
}: HeroFormProps) {
  const { t } = useLanguage();

  return (
    <div className="glass-panel rounded-4xl p-3 shadow-glow transition-all duration-500 sm:p-5">
      <div className="rounded-[1.75rem] border border-white/8 bg-black/30 p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-2 text-sm text-white/45">
          <Sparkles className="h-4 w-4 text-violet-300" />
          {t.hero.helper}
        </div>

        <textarea
          value={idea}
          onChange={(event) => onIdeaChange(event.target.value)}
          className="min-h-[180px] w-full resize-none border-0 bg-transparent text-lg leading-8 text-white outline-none transition-all duration-300 sm:min-h-[220px] sm:text-2xl"
          placeholder={t.hero.placeholder}
        />

        <div className="mt-6 border-t border-white/8 pt-5">
          <div className="mb-5">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/36">
              {t.hero.examplesLabel}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {exampleIdeas.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => onExampleSelect(example)}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-sm leading-5 text-white/68 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <ToneSelector selectedTone={tone} onSelect={onToneChange} />

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-white/42">
              {t.hero.toneHelper}
            </p>

            <button
              type="button"
              onClick={onGenerate}
              disabled={!canGenerate}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black shadow-[0_12px_40px_rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_18px_55px_rgba(255,255,255,0.2)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/40 disabled:shadow-none"
            >
              <Wand2 className="h-4 w-4" />
              {isLoading ? t.hero.generating : t.hero.generate}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
