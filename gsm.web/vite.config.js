import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin(), basicSsl()],
    server: {
        port: 56095,
        allowedHosts: true
    }
})