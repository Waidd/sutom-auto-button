import pluginTypescript from "@rollup/plugin-typescript";

export default {
  input: 'src/sutom.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    pluginTypescript({
      sourceMap: true
    }),
  ]
}
