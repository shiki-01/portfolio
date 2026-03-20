import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import masterCSS from '@master/css.vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		masterCSS({
			config: 'master.css.ts',
			injectRuntime: false,
			injectNormalCSS: false
		})
	],
	assetsInclude: ['**/*.glb'],
	server: {
		fs: {
			allow: ['./master.css.ts']
		}
	}
});
