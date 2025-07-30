<script lang="ts">
	import '../app.css';
	import SolidHome from '$lib/components/page/solid/Home.svelte';
	import '@fontsource-variable/noto-sans-jp';
	import { page } from '$app/state';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { pageNumber } from '$lib';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	setupViewTransition();

	let { children } = $props();
	let scrollContainer: HTMLDivElement | null = null;

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

	let mainContainer: HTMLElement | null = null;

	onMount(() => {
		afterNavigate(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	});
</script>

<svelte:window
	oncontextmenu={(e) => {
		e.preventDefault();
	}}
/>

<div
	bind:this={scrollContainer}
	class="scroll-wrapper w:100vw h:100vh overflow-y:auto overflow-x:hidden"
	style="position: fixed; inset: 0;"
>
	<main class="w:100dvw h:auto flex:column justify-content:center align-items:center flex">
		{#if pageNumber.subscribe((v) => v === 1)}
			<div
				class="w:100% h:100% bg:#153F63 fg:#ffffff flex:column justify-content:center align-items:center flex"
			>
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
</div>

<style>
	:global(html),
	:global(body) {
		overscroll-behavior-y: none;
		overflow-x: hidden;
		overscroll-behavior-x: none;
		height: 100%;
		width: 100%;
	}
	:global(body) {
		font-family: 'Noto Sans JP', sans-serif;
		touch-action: pan-y;
	}
	:global(*) {
		user-select: none;
	}
</style>
