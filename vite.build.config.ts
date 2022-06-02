import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import packageJson from './package.json'
import visualizer from "rollup-plugin-visualizer/dist/plugin";


// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  build: {
    rollupOptions: {
      external: [
        'vue'
      ],
      output: {
        globals: {vue: 'Vue'}
      },
    },
    outDir: './lib',
    lib: {
      entry: './src/index.js',
      name: packageJson.name, // umd的变量名
      fileName: 'bundle'
    },
    cssCodeSplit: false
  },
  plugins: [
    vue(),
    visualizer({
      open: true
    })
  ]
})
