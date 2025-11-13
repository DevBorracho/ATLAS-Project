import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json", // 🧠 necesario para las reglas que usan type-checking
        tsconfigRootDir: import.meta.dirname, // asegura la ruta correcta
      },
    },
    plugins: { js },
    extends: [
      "js/recommended",
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked, // ✅ activa las reglas de análisis de tipos
    ],
  },
  {
    rules: {
      // 🧠 Buenas prácticas generales
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": [
        "off",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "off",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      // --- Promesas seguras ---
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
    },
  },
]);
