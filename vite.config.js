	import { sveltekit } from '@sveltejs/kit/vite';
	import { defineConfig } from 'vite';
	import path from 'path'

	export default defineConfig({
		plugins: [sveltekit()],
		server: {
			allowedHosts: ['cwvps']
		},
		resolve: {
			alias: {
				'$src': path.resolve(__dirname, 'src'),
				'$cmslib': path.resolve(__dirname, 'src/routes/dashboard/lib'),
			}
		}
	});
