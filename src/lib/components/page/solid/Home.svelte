<script lang="ts">
	import Header from './components/Header.svelte';
	import Page from '$lib/components/Page.svelte';
	import Icon from '@iconify/svelte';
	import logo from '$lib/components/page/solid/img/logoTitle.svg';
	import ToTop from './components/ToTop.svelte';
	import { onMount } from 'svelte';
	let { children } = $props();

	let position = $state({
		x: 0,
		y: 0
	});
	let isOvered = $state(false);

	const icons = [
		{
			title: '@shiki-01',
			link: 'https://github.com/shiki-01',
			icon: 'simple-icons:github'
		},
		{
			title: '@shiki__01',
			link: 'https://twitter.com/shiki__01',
			icon: 'simple-icons:x'
		},
		{
			title: '@shiki-01',
			link: 'https://www.youtube.com/@shiki-01',
			icon: 'simple-icons:youtube'
		}
	];

	let backEl: HTMLDivElement | null = null;
	let scrollEl: HTMLDivElement | null = null;
	const parallax = {
		scrollFactor: 0.18,
		mouseAmplitude: 80,
		smooth: 0.08
	};

	const target = {
		scrollX: 0,
		lineScrollX: 0,
		mouseX: 0,
		mouseY: 0
	};

	const current = {
		scrollX: 0,
		lineScrollX: 0,
		mouseX: 0,
		mouseY: 0
	};

	let viewport = {
		w: 0,
		h: 0
	};

	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

	const handlePointerMove = (e: PointerEvent) => {
		position.x = e.clientX;
		position.y = e.clientY;

		if (!viewport.w || !viewport.h) return;
		const nx = (e.clientX - viewport.w / 2) / (viewport.w / 2);
		const ny = (e.clientY - viewport.h / 2) / (viewport.h / 2);
		target.mouseX = -nx * parallax.mouseAmplitude;
		target.mouseY = -ny * parallax.mouseAmplitude;
	};

	const handlePointerLeave = () => {
		isOvered = false;
		target.mouseX = 0;
		target.mouseY = 0;
	};

	const handlePointerEnter = () => {
		isOvered = true;
	};

	const getScrollTop = () => {
		const elementScroll = scrollEl?.scrollTop ?? 0;
		const windowScroll = window.scrollY || 0;
		if (scrollEl && scrollEl.scrollHeight > scrollEl.clientHeight) {
			return elementScroll;
		}
		return Math.max(elementScroll, windowScroll);
	};

	const handleScroll = () => {
		const scrollTop = getScrollTop();
		target.scrollX = scrollTop * parallax.scrollFactor;
		target.lineScrollX = scrollTop;
	};

	const handleResize = () => {
		viewport.w = window.innerWidth;
		viewport.h = window.innerHeight;
	};

	onMount(() => {
		handleResize();
		handleScroll();
		window.addEventListener('resize', handleResize);
		scrollEl?.addEventListener('scroll', handleScroll, { passive: true });

		let rafId = 0;
		const tick = (time: number) => {
			const scrollTop = getScrollTop();
			target.scrollX = scrollTop * parallax.scrollFactor;
			target.lineScrollX = scrollTop;

			current.scrollX = lerp(current.scrollX, target.scrollX, parallax.smooth);
			current.lineScrollX = lerp(current.lineScrollX, target.lineScrollX, parallax.smooth);
			current.mouseX = lerp(current.mouseX, target.mouseX, parallax.smooth);
			current.mouseY = lerp(current.mouseY, target.mouseY, parallax.smooth);

			const baseX = current.scrollX + current.mouseX;
			const baseY = current.mouseY;
			const t = time * 0.001;

			const gridX = baseX * 0.4 + Math.sin(t * 0.6) * 6;
			const gridY = baseY * 0.3 + Math.cos(t * 0.5) * 6;
			const lineGridX = (((current.lineScrollX * 1.1 + current.mouseX * 0.6) % 32) + 32) % 32;

			if (backEl) {
				backEl.style.setProperty('--circle-x', `${baseX}px`);
				backEl.style.setProperty('--circle-y', `${baseY}px`);
				backEl.style.setProperty('--line-y', `0px`);
				backEl.style.setProperty('--grid-x', `${gridX}px`);
				backEl.style.setProperty('--grid-y', `${gridY}px`);
				backEl.style.setProperty('--line-grid-x', `${lineGridX}px`);
			}

			rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);

		return () => {
			window.removeEventListener('resize', handleResize);
			scrollEl?.removeEventListener('scroll', handleScroll);
			cancelAnimationFrame(rafId);
		};
	});
</script>

<svelte:window
	onpointermove={handlePointerMove}
	onpointerleave={handlePointerLeave}
	onpointerenter={handlePointerEnter}
/>

<div class="rel w:100% h:100% flex:column justify-content:center ai:center flex">
	<span
		class="pointer"
		style="top: {position.y}px; left: {position.x}px; opacity: {isOvered ? 0 : 1}"
	>
		<svg width="31" height="42" viewBox="0 0 31 42" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.66037 36.9214L23.75 40.9856L29.7751 22.4214L1.25 2.01443L4.66037 36.9214Z"
				fill="#153F63"
				stroke="white"
			/>
		</svg>
	</span>
	<Header />
	<ToTop />
	<!-- <LogoAnimate /> -->
	<div
		bind:this={backEl}
		class="fixed w:100dvw back top:0 left:0 right:0 bottom:0 z:0 pointer-events:none overflow:hidden flex:column justify-content:center ai:center flex"
	>
		<span class="circle circle1"></span>
		<span class="circle circle2"></span>
		<span class="circle circle3"></span>
		<span class="line"></span>
	</div>
	<div
		bind:this={scrollEl}
		class="w:100% h:100% z:2 flex:column justify-content:center align-items:start flex"
	>
		{@render children()}
		<footer class="w:100% pt:20px bg:#153F63 fg:#ffffff bt:1px|solid|#fff justify-content:center ai:center flex">
			<div
				class="w:100% h:100% p:40px flex:column justify-content:space-between ai:center flex footer-inner"
			>
				<div
					class="w:100% flex:column justify-content:space-between align-items:start gap:40px px:16px flex flex-wrap footer-content"
				>
					<div
						class="w:100% h:60px flex:row justify-content:start ai:center gap:16px footer-logo-wrap"
					>
						<img src={logo} alt="Logo" class="w:auto h:100% object:cover" />
					</div>
					<div class="w:100% px:40px grid-template-columns:1fr|1fr|1fr gap:40px grid footer-grid">
						<div class="flex:column gap:8px flex">
							<h2 class="text:2em font:thin mb:8px uppercase">site map</h2>
							<div class="flex:column pl:12px gap:16px flex">
								<a href="/" class="text:18px fg:#fff:hover underline:hover transition:color|0.2s"
									>Home</a
								>
								<a
									href="/about"
									class="text:18px fg:#fff:hover underline:hover transition:color|0.2s">About</a
								>
								<a
									href="/works"
									class="text:18px fg:#fff:hover underline:hover transition:color|0.2s">Works</a
								>
								<a
									href="/blogs"
									class="text:18px fg:#fff:hover underline:hover transition:color|0.2s">Blogs</a
								>
							</div>
						</div>
						<div class="flex:column gap:8px flex">
							<h2 class="text:2em font:thin mb:8px uppercase">Contact</h2>
							<a
								href="mailto:contact@shiki-01.com"
								class="text:18px pl:12px fg:#fff:hover underline:hover transition:color|0.2s"
								>contact@shiki-01.com</a
							>
						</div>
						<div class="flex:column gap:8px flex">
							<h2 class="text:2em font:thin mb:8px uppercase">Links</h2>
							<div class="flex:column gap:8px pl:12px flex">
								{#each icons as { title, icon, link }}
									<a
										href={link}
										target="_blank"
										rel="noopener noreferrer"
										class="w:fit mb:10px flex:row ai:center gap:4px b:1px|solid|#fff px:16px py:8px bg:#fff:hover fg:#153F63:hover transition:background-color|0.3s flex rounded"
									>
										<Icon class="text:24px mr:10px" {icon} />
										<div class="flex:row gap:2px ai:center flex">
											<span class="text:18px">
												{title}
											</span>
											<Icon
												icon="mdi-light:arrow-up"
												width="30"
												height="30"
												class="rotate(45deg)"
											/>
										</div>
									</a>
								{/each}
							</div>
						</div>
					</div>
				</div>
				<p class="text:14px mt:40px fg:#bbb">© 2024 - 2026 shiki-01</p>
			</div>
		</footer>
	</div>
</div>

<style>
	/* :global(html, body, *, *:hover, *:active, *:focus) {
		cursor: none !important;
	} */

	:global(body) {
		background-color: #153f63;
	}

	.back {
		background-image:
			linear-gradient(0deg, transparent calc(100% - 1px), rgba(80, 108, 122, 40%) calc(100% - 1px)),
			linear-gradient(90deg, transparent calc(100% - 1px), rgba(80, 108, 122, 40%) calc(100% - 1px));
		background-size: 32px 32px;
		background-repeat: repeat;
		background-position: calc(50% + var(--grid-x, 0px)) calc(50% + var(--grid-y, 0px));
	}

	.pointer {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		pointer-events: none;
		display: none;
	}

	.circle {
		position: absolute;
		border: 1px solid #fff;
		border-radius: 50%;
	}

	.circle,
	.line {
		pointer-events: none;
	}

	.circle1 {
		top: calc(50% - 250px);
		left: calc(-200px);
		width: 500px;
		height: 500px;
		transform: translate3d(var(--circle-x, 0px), var(--circle-y, 0px), 0);
	}

	.circle2 {
		top: calc(50% - 864px);
		left: calc(300px);
		width: 1728px;
		height: 1728px;
		transform: translate3d(var(--circle-x, 0px), var(--circle-y, 0px), 0);
	}

	.circle3 {
		top: calc(50% - 700px);
		left: calc(300px);
		width: 1400px;
		height: 1400px;
		transform: translate3d(var(--circle-x, 0px), var(--circle-y, 0px), 0);
	}

	.line {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 1px;
		transform: translate3d(-50%, calc(-50% + var(--line-y, 0px)), 0);
		background-color: #fff;
	}

	.line::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 8px;
		transform: translate(-50%, -50%);
		background-image: linear-gradient(90deg, transparent calc(100% - 1px), #fff calc(100% - 1px));
		background-size: 32px 32px;
		background-repeat: repeat;
		background-position: calc(50% + var(--line-grid-x, 0px)) center;
	}

	.circle,
	.line,
	.back {
		will-change: transform, background-position;
	}

	@media (max-width: 960px) {
		.footer-inner {
			padding: 24px 16px;
		}

		.footer-content {
			gap: 28px;
			padding: 0;
		}

		.footer-grid {
			padding: 0;
			gap: 28px;
			grid-template-columns: 1fr;
		}

		.footer-grid h2 {
			font-size: clamp(1.4rem, 6vw, 2rem);
		}
	}

	@media (max-width: 640px) {
		.footer-logo-wrap {
			height: 42px;
		}

		.footer-grid a {
			font-size: 15px;
		}
	}
</style>
