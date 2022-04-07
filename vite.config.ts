import * as path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import solidPlugin from "vite-plugin-solid";
import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@terra-money/terra.js': '@terra-money/terra.js/dist/bundle.js',
      'process': path.resolve(__dirname, 'src/polyfills/process-es6.js'),
      'readable-stream': 'vite-compatible-readable-stream',
    },
  },
  //define: {
  //  'process.env': {},
  //},
  //server: {
  //  https: {
  //    cert: process.env.LOCALHOST_HTTPS_CERT,
  //    key: process.env.LOCALHOST_HTTPS_KEY,
  //    //@ts-ignore
  //    maxSessionMemory: 100,
  //    peerMaxConcurrentStreams: 300,
  //  },
  //},
  plugins: [solidPlugin(), tsconfigPaths(), svgr(), topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    })],
  //build: {
  //  sourcemap: true,
  //  rollupOptions: {
  //    input: {
  //      main: path.resolve(__dirname, 'index.html'),
  //      subpage: path.resolve(__dirname, 'subpage.html'),
  //    },
  //  },
  //},
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        GlobalsPolyfills({
          process: true,
          buffer: true,
        }),
      ],
    },
  }
});
