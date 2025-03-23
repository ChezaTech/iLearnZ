import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react({
            // Add this configuration to fix the preamble issue
            babel: {
                plugins: [
                    'babel-plugin-macros',
                    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
