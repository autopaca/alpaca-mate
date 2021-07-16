import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#31c77f'
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    port: 30001
  }
})
