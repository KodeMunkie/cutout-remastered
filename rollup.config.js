const typescript = require("rollup-plugin-typescript2")
const pkg = require("./package.json")

module.exports = {
  input: 'lib/core/Shapesnap.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    typescript()
  ],
}