export function ThemeScript() {
  const script = `
    (() => {
      const storageKey = "comicverse-theme";
      const root = document.documentElement;
      const stored = localStorage.getItem(storageKey);
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = stored === "light" || stored === "dark" ? stored : systemDark ? "dark" : "light";
      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme;
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
