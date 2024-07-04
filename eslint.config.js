import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    plugins: { jsdoc },
    rules: {
      "no-unused-vars": "warn",
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
