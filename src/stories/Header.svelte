<script lang="ts">
	import { writable } from 'svelte/store';
	export let title: 'Home' | 'About' | 'Works' | 'Blogs' = 'Home';

	let select = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/pages/about' },
		{ name: 'Works', route: '/pages/works' },
		{ name: 'Blogs', route: '/pages/blogs' }
	];

	let selected = writable(0);
	let selectedItem: number;
	selected.subscribe((value) => {
		selectedItem = value;
	});

	$: {
		selected.set(select.findIndex((item) => item.name === title));
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=M+PLUS+1:wght@100..900&family=Noto+Sans+JP:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<header>
	<ul>
		{#each select as item, index}
			<li>
				<a href="{item.route}" class:selected={index === selectedItem}><span>{item.name}</span></a>
			</li>
		{/each}
	</ul>
</header>

<style lang="scss">
	header {
		ul {
			padding: 1em 2em;
			border-left: #333 solid 2px;

			li {
				list-style: none;
				margin-bottom: 2em;

				a {
					text-decoration: none;
					color: #333;
					text-transform: uppercase;
					letter-spacing: 0.8em;
					font-family:
						noto sans jp,
						sans-serif;
					font-weight: 400;
					font-size: 1.5em;
					padding: 0 0.5em;

					span {
						margin-right: -0.8em;
					}

					&:not(.selected) {
						background: linear-gradient(to right, #ffeb888c 50%, transparent 50%);
						background-size: 200% 100%;
						background-position: right bottom;
						transition: all 1s ease-out;

						&:hover {
							background-position: left bottom;
						}
					}

					&.selected {
						background-color: #ffec88;
					}
				}
			}
		}
	}
</style>
