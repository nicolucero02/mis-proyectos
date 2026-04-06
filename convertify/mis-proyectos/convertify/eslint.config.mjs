import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
});

const config = [
  {
    ignores: [".next/**", "next-env.d.ts", "node_modules/**"]
  },
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript")
];

export default config;
