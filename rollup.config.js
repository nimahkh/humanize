import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import copy from "rollup-plugin-copy";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "es",
  },
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    globals(),
    terser(),
    json(),
    builtins(),
    copy({
      targets: [{ src: "package.json", dest: "dist" }],
    }),
  ],
  external: ["natural"],
};
