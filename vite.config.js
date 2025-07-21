import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/SkyCast_FindMyWeather/', // <-- MUST match your repository name
  plugins: [react()],
});
