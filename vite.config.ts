import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [WindiCSS(), reactRefresh()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#31c77f',
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      assert: 'assert',
      process: 'process/browser',
      Src: path.resolve('./src'),
      Calculator: path.resolve('./src/Calculator'),
      Store: path.resolve('./src/Store'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 30001,
    proxy: {
      '/v2/positions': 'https://api.alpacafinance.org',
    },
  },
});
