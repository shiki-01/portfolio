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
	// Vite の既定 envPrefix は `VITE_` のみ。`PUBLIC_SITE_URL` を
	// import.meta.env 経由で参照している箇所があるため明示的に許可する。
	envPrefix: ['VITE_', 'PUBLIC_'],
	assetsInclude: ['**/*.glb'],
	server: {
		fs: {
			allow: ['./master.css.ts']
		}
	}
});
