<script lang="ts">
	import '../app.css';
	import src from '$lib/img/noiz.png';
	import Layout from '$lib/components/Layout.svelte';
	import { page } from '$app/state';
	import { setupViewTransition } from 'sveltekit-view-transition';

	setupViewTransition();

	let { children } = $props();

	const pages = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'About',
			href: '/about'
		},
		{
			title: 'Works',
			href: '/works'
		},
		{
			title: 'Blogs',
			href: '/blogs'
		}
	];

	const link = $derived(page.url.pathname);

</script>

<div
	class="pointer-events-none fixed flex h-[100svh] w-[100svw] items-center justify-center bg-blend-soft-light"
>
	<img {src} alt="noiz" class="h-full w-full object-cover opacity-[0.05] mix-blend-soft-light" />
</div>

<Layout {pages} {link}>
	{@render children()}
</Layout>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1:wght@100..900&display=swap');

	:global(body) {
		font-family: 'M PLUS 1', serif;
		font-optical-sizing: auto;
      font-weight: 400;
		font-style: normal;
	}

  :global(*) {
      cursor: none !important;
  }
</style>
