<script lang="ts">
	import title from '$lib/components/page/solid/img/logoTitle.svg';
	import symbol from '$lib/components/page/solid/img/logoSymbol_small.svg';
	import { onMount } from 'svelte';

	let isCompact = $state(false);
	let scrollContainer: HTMLDivElement | null = null;
	let handleScroll: (() => void) | null = null;
	let isMenuOpen = $state(false);

	const COMPACT_THRESHOLD = 100;
	const EXPAND_THRESHOLD = 60;

	const links = [
		{ title: 'Home', href: '/' },
		{ title: 'About', href: '/about' },
		{ title: 'Works', href: '/works' },
		{ title: 'Blogs', href: '/blogs' }
	];

	onMount(() => {
		scrollContainer = document.querySelector('.scroll-wrapper');
		if (scrollContainer) {
			handleScroll = () => {
				const y = scrollContainer!.scrollTop;
				if (!isCompact && y >= COMPACT_THRESHOLD) {
					isCompact = true;
				} else if (isCompact && y <= EXPAND_THRESHOLD) {
					isCompact = false;
				}
			};
			scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
		}

		return () => {
			if (scrollContainer && handleScroll) {
				scrollContainer.removeEventListener('scroll', handleScroll);
			}
		};
	});
</script>

<header
	class="site-header flex:row flex:column@<md top:0 z:999 w:100% sticky bg:#153F63 fg:#ffffff bb:1px|#fff|solid"
	data-compact={isCompact}
	data-menu-open={isMenuOpen}
>
	<div class="header-top min-w:100%@<md">
		<a href="/" class="brand-link flex ai:center jc:center flex:row gap:10px">
			<img src={symbol} class="w:50px h:100%" alt="Logo" />
			<img src={title} class="brand-title h:30px" alt="Logo" />
		</a>
		<button
			type="button"
			class="menu-toggle"
			aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
			aria-controls="header-main-nav"
			aria-expanded={isMenuOpen}
			onclick={() => (isMenuOpen = !isMenuOpen)}
		>
			<span class="menu-line menu-line-top"></span>
			<span class="menu-line menu-line-bottom"></span>
		</button>
	</div>
	<nav
		id="header-main-nav"
		class="main-nav min-w:100%@<md gap:32px flex"
		aria-label="Main navigation"
		data-open={isMenuOpen}
	>
		{#each links as link}
			<a class="nav-link" href={link.href} onclick={() => (isMenuOpen = false)}>{link.title}</a>
		{/each}
	</nav>
</header>

<style>
	.site-header {
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		height: 100px;
		padding: 0 30px;
		position: sticky;
		top: 0;
		transition:
			height 0.3s ease,
			padding 0.3s ease;
	}

	.header-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}

	.site-header[data-compact='true'] {
		height: 80px;
	}

	.main-nav {
		align-items: center;
		justify-content: flex-end;
	}

	.menu-toggle {
		display: none;
		width: 34px;
		height: 34px;
		padding: 0;
		background: transparent;
		border: none;
		color: inherit;
		cursor: pointer;
		position: relative;
	}

	.menu-line {
		position: absolute;
		left: 7px;
		width: 20px;
		height: 2px;
		background-color: currentColor;
		transform-origin: center;
		transition:
			transform 0.24s ease,
			top 0.24s ease,
			opacity 0.24s ease;
	}

	.menu-line-top {
		top: 12px;
	}

	.menu-line-bottom {
		top: 20px;
	}

	.nav-link {
		font-size: 0.95rem;
		letter-spacing: 0.02em;
		text-decoration: none;
		color: inherit;
		white-space: nowrap;
	}

	@media (max-width: 64rem) {
		.site-header,
		.site-header[data-compact='true'] {
			height: 100px;
			min-height: 100px;
			padding: 10px 16px 12px;
			overflow: visible;
		}

		.header-top {
			height: 76px;
		}

		.brand-link {
			justify-content: flex-start;
			gap: 8px;
		}

		.brand-link img:first-child {
			width: 38px;
			height: 38px;
		}

		.brand-title {
			height: 24px;
		}

		.menu-toggle {
			display: inline-flex;
		}

		.site-header[data-menu-open='true'] .menu-line-top {
			top: 16px;
			transform: rotate(45deg);
		}

		.site-header[data-menu-open='true'] .menu-line-bottom {
			top: 16px;
			transform: rotate(-45deg);
		}

		.main-nav {
			position: absolute;
			top: calc(100% - 1px);
			left: 0;
			z-index: 1000;
			width: 100%;
			background: #153f63;
			border-bottom: 1px solid #fff;
			padding: 0 16px;
			overflow: hidden;
			max-height: 0;
			opacity: 0;
			gap: 0;
			padding-bottom: 0;
			margin-top: 0;
			flex-direction: column;
			align-items: stretch;
			justify-content: flex-start;
			transition:
				max-height 0.32s ease,
				opacity 0.22s ease 0.1s,
				padding-bottom 0.22s ease,
				margin-top 0.22s ease;
			pointer-events: none;
		}

		.main-nav[data-open='true'] {
			max-height: 220px;
			opacity: 1;
			padding-bottom: 20px;
			transition-delay: 0s, 0s, 0s, 0s;
			pointer-events: auto;
		}

		.nav-link {
			font-size: 0.92rem;
			padding: 10px 0;
			border-top: 1px solid rgba(255, 255, 255, 0.25);
		}
	}
</style>
