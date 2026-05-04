import type { Locale } from "@/lib/i18n";

export type CoverTone = "marvel" | "dc" | "indie" | "novela-grafica" | "ciencia-ficcion" | "terror" | "autores" | "guias" | "default";

function resolveTone(categorySlug: string): CoverTone {
  const map: Record<string, CoverTone> = {
    marvel: "marvel",
    dc: "dc",
    indie: "indie",
    "novela-grafica": "novela-grafica",
    "ciencia-ficcion": "ciencia-ficcion",
    terror: "terror",
    autores: "autores",
    guias: "guias"
  };
  return map[categorySlug] ?? "default";
}

/*
  Fondos abstractos oscuros, limpios, sin texto ni iconos.
  Cada categoría tiene 3 variantes visuales para evitar repetición.
  Las variantes cambian: dirección de gradiente, posición de iluminación, intensidad.
*/

function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

type VariantStyle = {
  bg: string;
  overlay1: string;
  overlay2: string;
  overlay3: string;
  accentGlow: string;
};

const toneVariants: Record<CoverTone, [VariantStyle, VariantStyle, VariantStyle]> = {
  marvel: [
    {
      bg: "bg-[linear-gradient(145deg,#0c1020_0%,#1a1f4b_35%,#2d1b4e_65%,#4a1538_100%)]",
      overlay1: "radial-gradient(ellipse_at_20%_0%,rgba(220,40,80,0.22)_0%,transparent_55%)",
      overlay2: "radial-gradient(ellipse_at_80%_100%,rgba(60,20,120,0.18)_0%,transparent_50%)",
      overlay3: "radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_60%)",
      accentGlow: "rgba(220,40,80,0.35)"
    },
    {
      bg: "bg-[linear-gradient(160deg,#0a0e1c_0%,#15183a_40%,#2a1540_70%,#3d1030_100%)]",
      overlay1: "radial-gradient(ellipse_at_70%_10%,rgba(200,50,100,0.18)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_10%_90%,rgba(80,30,140,0.2)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.015)_0%,transparent_60%)",
      accentGlow: "rgba(200,50,100,0.32)"
    },
    {
      bg: "bg-[linear-gradient(125deg,#080c1a_0%,#12163a_45%,#281040_75%,#3a1028_100%)]",
      overlay1: "radial-gradient(ellipse_at_50%_0%,rgba(180,40,90,0.2)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_80%_80%,rgba(50,20,100,0.16)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.018)_0%,transparent_60%)",
      accentGlow: "rgba(180,40,90,0.3)"
    }
  ],
  dc: [
    {
      bg: "bg-[linear-gradient(145deg,#080a14_0%,#13152e_40%,#1a1a3a_70%,#2a2040_100%)]",
      overlay1: "radial-gradient(ellipse_at_50%_0%,rgba(200,170,60,0.14)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_0%_100%,rgba(40,40,80,0.25)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.015)_0%,transparent_50%)",
      accentGlow: "rgba(200,170,60,0.25)"
    },
    {
      bg: "bg-[linear-gradient(165deg,#060810_0%,#10122a_40%,#181830_65%,#241838_100%)]",
      overlay1: "radial-gradient(ellipse_at_30%_10%,rgba(180,160,50,0.12)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_90%_90%,rgba(30,30,60,0.22)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.012)_0%,transparent_60%)",
      accentGlow: "rgba(180,160,50,0.22)"
    },
    {
      bg: "bg-[linear-gradient(135deg,#0a0c18_0%,#14162e_40%,#1e1e3a_65%,#2c2048_100%)]",
      overlay1: "radial-gradient(ellipse_at_70%_0%,rgba(190,170,70,0.16)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_20%_100%,rgba(35,35,70,0.2)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.015)_0%,transparent_60%)",
      accentGlow: "rgba(190,170,70,0.28)"
    }
  ],
  indie: [
    {
      bg: "bg-[linear-gradient(145deg,#1c1410_0%,#2e2018_35%,#3d2820_65%,#4a3028_100%)]",
      overlay1: "radial-gradient(ellipse_at_30%_0%,rgba(200,140,90,0.16)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_70%_100%,rgba(60,40,30,0.2)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.018)_0%,transparent_60%)",
      accentGlow: "rgba(200,140,90,0.3)"
    },
    {
      bg: "bg-[linear-gradient(155deg,#181210_0%,#281c14_40%,#362418_65%,#442c20_100%)]",
      overlay1: "radial-gradient(ellipse_at_60%_10%,rgba(190,130,80,0.14)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_20%_90%,rgba(50,35,25,0.18)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.015)_0%,transparent_60%)",
      accentGlow: "rgba(190,130,80,0.28)"
    },
    {
      bg: "bg-[linear-gradient(130deg,#201610_0%,#302218_40%,#3e2a20_65%,#4e3428_100%)]",
      overlay1: "radial-gradient(ellipse_at_40%_0%,rgba(210,150,100,0.18)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_80%_90%,rgba(55,40,30,0.16)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_60%_60%,rgba(255,255,255,0.02)_0%,transparent_60%)",
      accentGlow: "rgba(210,150,100,0.32)"
    }
  ],
  "novela-grafica": [
    {
      bg: "bg-[linear-gradient(145deg,#141210_0%,#1e1a16_35%,#28221c_65%,#362d24_100%)]",
      overlay1: "radial-gradient(ellipse_at_80%_0%,rgba(180,130,60,0.12)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_20%_100%,rgba(40,35,28,0.2)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_60%)",
      accentGlow: "rgba(180,130,60,0.25)"
    },
    {
      bg: "bg-[linear-gradient(160deg,#12100e_0%,#1c1814_40%,#262018_65%,#322a22_100%)]",
      overlay1: "radial-gradient(ellipse_at_30%_10%,rgba(170,120,50,0.14)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_70%_90%,rgba(35,30,24,0.18)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_40%_50%,rgba(255,255,255,0.015)_0%,transparent_60%)",
      accentGlow: "rgba(170,120,50,0.22)"
    },
    {
      bg: "bg-[linear-gradient(135deg,#161412_0%,#201c18_40%,#2a241e_65%,#383028_100%)]",
      overlay1: "radial-gradient(ellipse_at_60%_0%,rgba(190,140,70,0.16)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_10%_90%,rgba(38,33,26,0.16)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.018)_0%,transparent_60%)",
      accentGlow: "rgba(190,140,70,0.28)"
    }
  ],
  "ciencia-ficcion": [
    {
      bg: "bg-[linear-gradient(145deg,#080c24_0%,#12143a_35%,#1e1848_65%,#2a0f40_100%)]",
      overlay1: "radial-gradient(ellipse_at_60%_0%,rgba(0,200,220,0.14)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_20%_100%,rgba(80,20,160,0.18)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.02)_0%,transparent_60%)",
      accentGlow: "rgba(0,200,220,0.3)"
    },
    {
      bg: "bg-[linear-gradient(165deg,#060a1e_0%,#0e1030_40%,#181440_65%,#240c38_100%)]",
      overlay1: "radial-gradient(ellipse_at_40%_10%,rgba(20,180,210,0.12)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_80%_90%,rgba(70,15,140,0.2)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_60%_50%,rgba(255,255,255,0.015)_0%,transparent_60%)",
      accentGlow: "rgba(20,180,210,0.28)"
    },
    {
      bg: "bg-[linear-gradient(130deg,#080a20_0%,#101236_45%,#1a1644_70%,#260e3c_100%)]",
      overlay1: "radial-gradient(ellipse_at_50%_0%,rgba(30,190,220,0.16)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_30%_100%,rgba(60,15,130,0.16)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.018)_0%,transparent_60%)",
      accentGlow: "rgba(30,190,220,0.32)"
    }
  ],
  terror: [
    {
      bg: "bg-[linear-gradient(145deg,#0a0808_0%,#1a1010_35%,#2a1814_65%,#3a1e18_100%)]",
      overlay1: "radial-gradient(ellipse_at_50%_0%,rgba(160,30,30,0.18)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_0%_100%,rgba(60,15,15,0.22)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.012)_0%,transparent_60%)",
      accentGlow: "rgba(160,30,30,0.3)"
    },
    {
      bg: "bg-[linear-gradient(155deg,#080606_0%,#160e0c_40%,#261410_65%,#341a14_100%)]",
      overlay1: "radial-gradient(ellipse_at_30%_10%,rgba(140,25,25,0.16)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_80%_90%,rgba(50,12,12,0.18)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.01)_0%,transparent_60%)",
      accentGlow: "rgba(140,25,25,0.28)"
    },
    {
      bg: "bg-[linear-gradient(130deg,#0c0808_0%,#1c1210_40%,#2c1a14_65%,#3c2018_100%)]",
      overlay1: "radial-gradient(ellipse_at_70%_0%,rgba(150,30,30,0.2)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_20%_90%,rgba(55,15,15,0.16)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.015)_0%,transparent_60%)",
      accentGlow: "rgba(150,30,30,0.32)"
    }
  ],
  autores: [
    {
      bg: "bg-[linear-gradient(145deg,#141210_0%,#1e1c18_35%,#282420_65%,#342e28_100%)]",
      overlay1: "radial-gradient(ellipse_at_40%_0%,rgba(160,130,90,0.12)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_80%_100%,rgba(30,28,24,0.18)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.015)_0%,transparent_60%)",
      accentGlow: "rgba(160,130,90,0.25)"
    },
    {
      bg: "bg-[linear-gradient(160deg,#12100e_0%,#1a1814_40%,#242018_65%,#302a24_100%)]",
      overlay1: "radial-gradient(ellipse_at_60%_10%,rgba(150,120,80,0.14)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_20%_90%,rgba(28,26,22,0.16)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_40%_50%,rgba(255,255,255,0.012)_0%,transparent_60%)",
      accentGlow: "rgba(150,120,80,0.22)"
    },
    {
      bg: "bg-[linear-gradient(135deg,#161412_0%,#1e1c18_40%,#282420_65%,#363028_100%)]",
      overlay1: "radial-gradient(ellipse_at_30%_0%,rgba(170,140,100,0.16)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_70%_90%,rgba(32,28,24,0.14)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.018)_0%,transparent_60%)",
      accentGlow: "rgba(170,140,100,0.28)"
    }
  ],
  guias: [
    {
      bg: "bg-[linear-gradient(145deg,#0c1418_0%,#142830_35%,#1e3840_65%,#264850_100%)]",
      overlay1: "radial-gradient(ellipse_at_30%_0%,rgba(120,180,160,0.14)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_70%_100%,rgba(20,40,48,0.2)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_60%)",
      accentGlow: "rgba(120,180,160,0.25)"
    },
    {
      bg: "bg-[linear-gradient(160deg,#0a1216_0%,#12222a_40%,#1a3240_65%,#224048_100%)]",
      overlay1: "radial-gradient(ellipse_at_60%_10%,rgba(100,170,150,0.12)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_20%_90%,rgba(18,35,42,0.18)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_40%_50%,rgba(255,255,255,0.015)_0%,transparent_60%)",
      accentGlow: "rgba(100,170,150,0.22)"
    },
    {
      bg: "bg-[linear-gradient(130deg,#0e1618_0%,#162a32_40%,#203a44_65%,#284c54_100%)]",
      overlay1: "radial-gradient(ellipse_at_50%_0%,rgba(110,180,160,0.16)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_80%_90%,rgba(22,42,50,0.16)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.018)_0%,transparent_60%)",
      accentGlow: "rgba(110,180,160,0.28)"
    }
  ],
  default: [
    {
      bg: "bg-[linear-gradient(145deg,#141210_0%,#1e1a16_35%,#282420_65%,#362e28_100%)]",
      overlay1: "radial-gradient(ellipse_at_50%_0%,rgba(180,120,80,0.14)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_30%_100%,rgba(30,26,22,0.18)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.015)_0%,transparent_60%)",
      accentGlow: "rgba(180,120,80,0.28)"
    },
    {
      bg: "bg-[linear-gradient(165deg,#12100e_0%,#1c1814_40%,#262018_65%,#322a24_100%)]",
      overlay1: "radial-gradient(ellipse_at_40%_10%,rgba(170,110,70,0.12)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_70%_90%,rgba(28,24,20,0.16)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.012)_0%,transparent_60%)",
      accentGlow: "rgba(170,110,70,0.25)"
    },
    {
      bg: "bg-[linear-gradient(130deg,#161412_0%,#201c18_40%,#2a241e_65%,#383028_100%)]",
      overlay1: "radial-gradient(ellipse_at_60%_0%,rgba(190,130,90,0.16)_0%,transparent_50%)",
      overlay2: "radial-gradient(ellipse_at_20%_90%,rgba(32,28,24,0.14)_0%,transparent_55%)",
      overlay3: "radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.018)_0%,transparent_60%)",
      accentGlow: "rgba(190,130,90,0.3)"
    }
  ]
};

type CoverVisualProps = {
  categorySlug: string;
  title?: string;
  locale?: Locale;
  className?: string;
  compact?: boolean;
  children?: React.ReactNode;
  seed?: string;
};

export function CoverVisual({ categorySlug, className = "", children, seed }: CoverVisualProps) {
  const tone = resolveTone(categorySlug);
  const variants = toneVariants[tone];
  
  // Seleccionar variante basada en seed (hash del slug) o aleatoria
  const variantIndex = seed ? (simpleHash(seed) % 3) : 0;
  const visual = variants[variantIndex];

  return (
    <div className={`relative overflow-hidden ${visual.bg} ${className}`}>
      {/* Capa base de iluminación direccional */}
      <div
        className="absolute inset-0"
        style={{ background: visual.overlay1 }}
      />

      {/* Capa de profundidad secundaria */}
      <div
        className="absolute inset-0"
        style={{ background: visual.overlay2 }}
      />

      {/* Capa de grano/ruido editorial sutil */}
      <div
        className="absolute inset-0"
        style={{ background: visual.overlay3 }}
      />

      {/* Vignette sutil para enmarcar */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.25)_100%)]" />

      {/* Línea de acente superior muy fina */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: visual.accentGlow }}
      />

      {/* Children content */}
      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </div>
  );
}

export function getCategoryAccent(categorySlug: string): string {
  const tone = resolveTone(categorySlug);
  return toneVariants[tone][0].accentGlow;
}

export function getCategoryGlow(categorySlug: string, seed?: string): string {
  const tone = resolveTone(categorySlug);
  const variantIndex = seed ? (simpleHash(seed) % 3) : 0;
  return toneVariants[tone][variantIndex].accentGlow;
}
