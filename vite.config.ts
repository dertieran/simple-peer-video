import { fileURLToPath } from 'node:url';

import UnocssPlugin from 'unocss/vite';
import IconPlugin from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import SolidPlugin from 'vite-plugin-solid';

export default defineConfig({
	plugins: [SolidPlugin(), UnocssPlugin(), IconPlugin({ compiler: 'solid' })],
	resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
