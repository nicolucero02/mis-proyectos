import clsx from "clsx";

type LogoProps = {
  className?: string;
  size?: number;
};

export function Logo({ className, size = 44 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-bg" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F2DFCD" />
          <stop offset="0.52" stopColor="#CF8D67" />
          <stop offset="1" stopColor="#B97657" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#logo-bg)" />
      <rect x="4.5" y="4.5" width="55" height="55" rx="13.5" stroke="#1A1514" strokeOpacity="0.08" />
      <text
        x="29.5"
        y="42"
        textAnchor="middle"
        fontFamily="Iowan Old Style, Palatino Linotype, Book Antiqua, Georgia, serif"
        fontSize="34"
        fontWeight="700"
        letterSpacing="-2.4"
        fill="#1A1514"
      >
        C
      </text>
    </svg>
  );
}

/* Logo para uso en dark mode - misma forma pero con colores invertidos/adaptados */
export function LogoDark({ className, size = 44 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-bg-dark" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f6ede2" />
          <stop offset="0.52" stopColor="#c2794f" />
          <stop offset="1" stopColor="#a06040" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#logo-bg-dark)" />
      <rect x="4.5" y="4.5" width="55" height="55" rx="13.5" stroke="rgba(255,255,255,0.12)" />
      <text
        x="29.5"
        y="42"
        textAnchor="middle"
        fontFamily="Iowan Old Style, Palatino Linotype, Book Antiqua, Georgia, serif"
        fontSize="34"
        fontWeight="700"
        letterSpacing="-2.4"
        fill="#1A1514"
      >
        C
      </text>
    </svg>
  );
}

/* Logo con soporte automático dark/light via clase dark: */
export function LogoAuto({ className, size = 44 }: LogoProps) {
  return (
    <span className={clsx("relative inline-flex", className)}>
      {/* Light mode logo */}
      <Logo size={size} className="dark:hidden" />
      {/* Dark mode logo */}
      <LogoDark size={size} className="hidden dark:block" />
    </span>
  );
}
