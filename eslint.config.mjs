import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend from Next.js configurations
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Add custom rules configuration
  {
    rules: {
      // Disable the rule causing errors with apostrophes
      "react/no-unescaped-entities": "off"
    }
  }
];

export default eslintConfig;