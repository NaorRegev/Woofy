import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/lab', '@mui/x-date-pickers', '@emotion/react', '@emotion/styled', 'date-fns'],
  },
});