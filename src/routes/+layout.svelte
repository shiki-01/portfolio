<script lang="ts">
	import '../app.css';
	import SolidHome from '$lib/components/page/solid/Home.svelte';
	import '@fontsource-variable/noto-sans-jp';
	import { page } from '$app/state';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { lenis as lenisStore, pageNumber } from '$lib';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Lenis from 'lenis';

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
		const prefersReducedMotion =
			window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

		let lenis: Lenis | null = null;
		let rafId = 0;

		if (!prefersReducedMotion && scrollContainer && mainContainer) {
			lenis = new Lenis({
				wrapper: scrollContainer,
				content: mainContainer,
				lerp: 0.12,
				smoothWheel: true
			});
			lenisStore.set(lenis);

			const raf = (time: number) => {
				lenis?.raf(time);
				rafId = window.requestAnimationFrame(raf);
			};
			rafId = window.requestAnimationFrame(raf);
		}

		const scrollToTop = () => {
			if (lenis) {
				lenis.scrollTo(0, { immediate: prefersReducedMotion });
				return;
			}
			scrollContainer?.scrollTo({
				top: 0,
				behavior: prefersReducedMotion ? 'auto' : 'smooth'
			});
		};

		const scrollToHash = (hash: string) => {
			if (!hash || hash === '#') return false;
			const id = decodeURIComponent(hash.startsWith('#') ? hash.slice(1) : hash);
			const el = document.getElementById(id);
			if (!el) return false;

			if (lenis) {
				lenis.scrollTo(el, { immediate: prefersReducedMotion });
				return true;
			}

			if (!scrollContainer) return false;
			const containerRect = scrollContainer.getBoundingClientRect();
			const elRect = el.getBoundingClientRect();
			const top = scrollContainer.scrollTop + (elRect.top - containerRect.top);
			scrollContainer.scrollTo({
				top,
				behavior: prefersReducedMotion ? 'auto' : 'smooth'
			});
			return true;
		};

		afterNavigate(() => {
			const hash = window.location.hash;
			if (hash) {
				window.requestAnimationFrame(() => {
					if (!scrollToHash(hash)) scrollToTop();
				});
				return;
			}
			scrollToTop();
		});

		const onDocumentClick = (event: MouseEvent) => {
			const target = event.target as Element | null;
			const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
			if (!anchor) return;

			const href = anchor.getAttribute('href');
			if (!href || !href.includes('#')) return;

			let url: URL;
			try {
				url = new URL(href, window.location.href);
			} catch {
				return;
			}

			if (url.origin !== window.location.origin) return;
			if (url.pathname !== window.location.pathname) return;
			if (!url.hash || url.hash === '#') return;

			event.preventDefault();
			window.history.pushState({}, '', url.pathname + url.search + url.hash);
			scrollToHash(url.hash);
		};

		const onHashChange = () => {
			const hash = window.location.hash;
			if (!hash) return;
			window.requestAnimationFrame(() => scrollToHash(hash));
		};

		document.addEventListener('click', onDocumentClick, true);
		window.addEventListener('hashchange', onHashChange);

		// 初期表示が /path#hash の場合
		if (window.location.hash) {
			window.requestAnimationFrame(() => scrollToHash(window.location.hash));
		}

		return () => {
			document.removeEventListener('click', onDocumentClick, true);
			window.removeEventListener('hashchange', onHashChange);
			if (rafId) window.cancelAnimationFrame(rafId);
			lenis?.destroy();
			lenisStore.set(null);
		};
	});
</script>

<svelte:window
	oncontextmenu={(e) => {
		e.preventDefault();
	}}
/>

<div
	id="scroll-container"
	bind:this={scrollContainer}
	class="scroll-wrapper w:100vw h:100vh overflow-y:auto overflow-x:hidden"
	style="position: fixed; inset: 0;"
>
	<main bind:this={mainContainer} class="w:100dvw h:auto flex:column justify-content:center ai:center flex">
		{#if pageNumber.subscribe((v) => v === 1)}
			<div
				class="w:100% h:100% bg:#153F63 fg:#ffffff flex:column justify-content:center ai:center flex"
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
