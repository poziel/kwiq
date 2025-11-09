import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { socketIO } from './vite-plugin-socket-io';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), socketIO()]
});
