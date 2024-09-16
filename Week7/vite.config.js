import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    //proxy url to a single word - /api   
    proxy:{
      '/api' : {
        target:"http://localhost:8000",
        changeOrigin:true,
        rewrite: (path)=> path.replace(/^\/api/,''), 
      }
    }
  }
})
