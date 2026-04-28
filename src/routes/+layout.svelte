<script lang="ts">
	import '../app.css';
	import '@master/normal.css';
	import { initCSSRuntime } from '@master/css-runtime';
	import masterCssConfig from 'virtual:master-css-config';
	import SolidHome from '$lib/components/page/solid/Home.svelte';
	import SeoJsonLd from '$lib/components/SeoJsonLd.svelte';
	import { page } from '$app/state';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { lenis as lenisStore, pageNumber } from '$lib';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import {
		DEFAULT_LOCALE,
		DEFAULT_SEO_IMAGE,
		SITE_NAME,
		toAbsoluteUrl,
		type SeoData
	} from '$lib/utils/seo';

	if (typeof window !== 'undefined') {
		const win = window as Window & { __MASTER_CSS_RUNTIME_INITIALIZED__?: boolean };
		if (!win.__MASTER_CSS_RUNTIME_INITIALIZED__) {
			initCSSRuntime(masterCssConfig);
			win.__MASTER_CSS_RUNTIME_INITIALIZED__ = true;
		}
	}

	setupViewTransition();

	let { children } = $props();
	let scrollContainer: HTMLDivElement | null = null;

	const _link = $derived(page.url.pathname);
	const computerModelPath = '/computer.glb';
	const defaultDescription =
		'shikiのポートフォリオサイト。制作実績・スキル・プロフィールを掲載しています。';
	const defaultKeywords = ['portfolio', 'ポートフォリオ', 'SvelteKit', 'TypeScript', 'Web制作'];

	const seo = $derived(((page.data as { seo?: SeoData } | undefined)?.seo ?? {}) as SeoData);
	const resolvedTitle = $derived(seo.title ? `${seo.title} | ${SITE_NAME}` : SITE_NAME);
	const resolvedDescription = $derived(seo.description || defaultDescription);
	const resolvedCanonical = $derived(toAbsoluteUrl(seo.path || page.url.pathname));
	const resolvedImage = $derived(toAbsoluteUrl(seo.image || DEFAULT_SEO_IMAGE));
	const resolvedType = $derived(seo.type || 'website');
	const resolvedKeywords = $derived(
		(seo.keywords?.length ? seo.keywords : defaultKeywords).join(', ')
	);
	const robotsContent = $derived(
		seo.noindex ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large'
	);
	const jsonLdBlocks = $derived(
		Array.isArray(seo.jsonLd) ? seo.jsonLd : seo.jsonLd ? [seo.jsonLd] : []
	);

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

<svelte:head>
	<title>{resolvedTitle}</title>
	<meta name="description" content={resolvedDescription} />
	<meta name="keywords" content={resolvedKeywords} />
	<meta name="robots" content={robotsContent} />
	<link rel="canonical" href={resolvedCanonical} />

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content={DEFAULT_LOCALE} />
	<meta property="og:type" content={resolvedType} />
	<meta property="og:title" content={resolvedTitle} />
	<meta property="og:description" content={resolvedDescription} />
	<meta property="og:url" content={resolvedCanonical} />
	<meta property="og:image" content={resolvedImage} />
	<meta property="og:image:alt" content={resolvedTitle} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={resolvedTitle} />
	<meta name="twitter:description" content={resolvedDescription} />
	<meta name="twitter:image" content={resolvedImage} />

	{#if seo.publishedTime}
		<meta property="article:published_time" content={seo.publishedTime} />
	{/if}
	{#if seo.modifiedTime}
		<meta property="article:modified_time" content={seo.modifiedTime} />
	{/if}

</svelte:head>

<SeoJsonLd blocks={jsonLdBlocks} />

<svelte:window
	oncontextmenu={(e) => {
		e.preventDefault();
	}}
/>

<div
	id="scroll-container"
	bind:this={scrollContainer}
	class="scroll-wrapper w:100% min-h:100dvh overflow-y:auto overflow-x:hidden"
	style="position: fixed; inset: 0;"
>
	<main
		bind:this={mainContainer}
		class="w:100% h:auto flex:column justify-content:center ai:center flex"
	>
		{#if $pageNumber === 1}
			<div
				class="w:100% h:100% bg:#153F63 fg:#ffffff flex:column justify-content:center ai:center flex"
			>
				<SolidHome>
					{@render children()}
				</SolidHome>
			</div>
		{:else if $pageNumber === 2}
			<div class="w:100% h:100dvh flex flex:column ai:center jc:center overflow:hidden">
				{#await import('$lib/components/ThreeModelViewer.svelte') then module}
					{@const ThreeModelViewer = module.default}
					<ThreeModelViewer
						modelSrc={computerModelPath}
						noiseStrength={0.2}
						chromaticAberration={0.004}
						distortionStrength={0.08}
						vignetteStrength={0.6}
						exposure={1}
					>
						<div
							style="width:100%;height:100%;display:flex;flex-direction:column;padding:28px;box-sizing:border-box;background:#0f172a;color:#fff;font-family:'LINE Seed JP',sans-serif;"
						>
							<h2 style="margin:0 0 10px;font-size:56px;line-height:1.1;">Shiki</h2>
							{@render children()}
						</div>
					</ThreeModelViewer>
				{:catch _error}
					<div
						style="width:100%;height:100%;display:flex;flex-direction:column;padding:28px;box-sizing:border-box;background:#0f172a;color:#fff;font-family:'LINE Seed JP',sans-serif;"
					>
						<h2 style="margin:0 0 10px;font-size:56px;line-height:1.1;">Shiki</h2>
						{@render children()}
					</div>
				{/await}
			</div>
		{:else if $pageNumber === 3}
			{@render children()}
		{:else if $pageNumber === 4}
			<div
				class="w:100% h:100% bg:#153F63 fg:#ffffff flex:column justify-content:center ai:center flex"
			>
				<SolidHome>
					{@render children()}
				</SolidHome>
			</div>
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
		font-family: 'LINE Seed JP', 'Noto Sans JP', sans-serif;
		touch-action: pan-y;
	}
	:global(*) {
		user-select: none;
	}

	.scroll-wrapper {
		scrollbar-gutter: stable;
	}
</style>
