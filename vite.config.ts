import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
    ],
    base: '/',
    resolve: {
        alias: {
            '@': '/src',
            '@atoms': '/src/components/atoms',
            '@molecules': '/src/components/molecules',
            '@organisms': '/src/components/organisms',
            '@pages': '/src/pages',
            '@layouts': '/src/layouts',
            '@hooks': '/src/hooks',
            '@models': '/src/models/index.ts',
            '@utils': '/src/utils',
            '@fixtures': '/src/assets/fixtures',
            '@images': '/src/assets/images',
        },
    }
});
