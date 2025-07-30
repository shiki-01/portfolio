<script lang="ts">
	import src from '$lib/components/page/solid/img/logo.svg';
	import { onMount } from 'svelte';

	let scrollY = $state(0);
	let scrollContainer: HTMLDivElement | null = null;

	const links = [
		{ title: 'Home', href: '/' },
		{ title: 'About', href: '/about' },
		{ title: 'Works', href: '/works' },
		{ title: 'Blogs', href: '/blogs' }
	];

	onMount(() => {
        // 親のスクロールラッパーを取得
        scrollContainer = document.querySelector('.scroll-wrapper');
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', () => {
                scrollY = scrollContainer!.scrollTop;
            });
        }
    });
</script>

<header
	class="top:0 left:0 z:999 w:100% fixed {scrollY >= 100
		? 'h:60px'
		: 'h:80px'} transition:height|0.3s|ease bg:#153F63 fg:#ffffff bb:1px|#fff|solid px:32px justify-content:space-between align-items:center flex"
>
	<a href="/" class="w:80px">
		<img {src} class="w:100% h:100%" alt="Logo" />
	</a>
	<nav class="gap:32px flex">
		{#each links as link}
			<a href={link.href}>{link.title}</a>
		{/each}
	</nav>
</header>
