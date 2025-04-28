<script lang="ts">
	import '../app.css';
	import SolidHome from '$lib/components/page/solid/Home.svelte';
	import '@fontsource-variable/noto-sans-jp';
	import { page } from '$app/state';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { pageNumber } from '$lib';

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

<main class="w:100dvw h:100dvh flex:column justify-content:center align-items:center flex">
	{#if pageNumber.subscribe((v) => v === 1)}
		<div class="w:100% h:100% bg:#153F63 fg:#ffffff flex:column justify-content:center align-items:center flex">
			<SolidHome>
				{@render children()}
			</SolidHome>
		</div>
	{:else if pageNumber.subscribe((v) => v === 2)}
		{@render children()}
	{:else if pageNumber.subscribe((v) => v === 3)}
		{@render children()}
	{:else if pageNumber.subscribe((v) => v === 4)}
		{@render children()}
	{/if}
</main>

<style>
	:global(body) {
		font-family: 'Noto Sans JP', sans-serif;
	}
</style>
