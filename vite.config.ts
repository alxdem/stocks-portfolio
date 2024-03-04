import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    base: '/stocks-portfolio/',
    resolve: {
        alias: {
            '@': '/src',
            '@atoms': '/src/components/atoms',
            '@molecules': '/src/components/molecules',
            '@organisms': '/src/components/organisms',
            '@assets': '/src/assets',
            '@hooks': '/src/hooks',
            '@layouts': '/src/layouts',
            '@models': '/src/models',
            '@pages': '/src/pages',
            '@reducers': '/src/reducers',
            '@utils': '/src/utils',
            '@store': '/src/store',
            '@svg': '/src/assets/svg',
        }
    }
});
