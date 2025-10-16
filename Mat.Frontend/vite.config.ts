import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'), // 👈 match autocomplete behavior
        },
    },
    server: {
        port: 5001,
        open: true,
        proxy: {
            '/api': 'http://localhost:5000',
        },
    },
});
