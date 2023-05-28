import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log(__dirname);

  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    root: 'src',
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/main.jsx'), // Specify the JavaScript entry file here
          
        }
      }
    }
  };
});
