
import { rollup } from "npm:rollup";
import { minify } from "npm:terser";

let bundle = await rollup({
  input: "mod.js",
});

let { output } = await bundle.generate({
  format: "umd",
  name: "tinycolor",
});
let minified = await minify(output[0].code);
const preamble = `// This file is autogenerated.
// Ideally it wouldn't exist, but it's here for backwards compatibility for people
// using it directly from a CDN. Please use the npm package which exports both CJS and ESM.
`;

Deno.writeTextFileSync("tinycolor.js", preamble + output[0].code);
Deno.writeTextFileSync("dist/tinycolor-min.js", preamble + minified.code);
