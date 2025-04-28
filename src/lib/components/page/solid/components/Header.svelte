<script lang="ts">
	import src from '$lib/components/page/solid/img/logo.svg';

    let scrollY = $state(0);

	const links = [
		{ title: 'Home', href: '/' },
		{ title: 'About', href: '/about' },
		{ title: 'Works', href: '/works' },
		{ title: 'Blogs', href: '/blogs' }
	];

    $effect(() => {
        if (typeof window === 'undefined') return;
        scrollY = window.scrollY;
    })
</script>

<header class="fixed top:0 left:0 z:999 w:100% {scrollY >= 100 ? 'h:60px' : 'h:80px'} bg:#153F63 fg:#ffffff bb:1px|#fff|solid flex px:32px justify-content:space-between align-items:center">
	<a href="/" class="w:80px">
		<img {src} class="w:100% h:100%" alt="Logo" />
	</a>
	<nav class="flex gap:32px">
		{#each links as link}
			<a href={link.href}>{link.title}</a>
		{/each}
	</nav>
</header>
