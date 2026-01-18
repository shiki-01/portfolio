<script lang="ts">
	import title from '$lib/components/page/solid/img/logoTitle.svg';
	import symbol from '$lib/components/page/solid/img/logoSymbol_small.svg';
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
		? 'h:80px'
		: 'h:100px'} transition:height|0.3s|ease bg:#153F63 fg:#ffffff bb:1px|#fff|solid px:30px justify-content:space-between ai:center flex"
>
	<a href="/" class="flex ai:center jc:center flex:row gap:10px">
		<img src={symbol} class="w:50px h:100%" alt="Logo" />
		<img src={title} class="h:30px" alt="Logo" />
	</a>
	<nav class="gap:32px flex">
		{#each links as link}
			<a href={link.href}>{link.title}</a>
		{/each}
	</nav>
</header>
