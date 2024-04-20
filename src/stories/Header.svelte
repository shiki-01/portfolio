<script lang="ts">
	import { writable } from 'svelte/store';
	export let title: 'Home' | 'About' | 'Blogs' = 'Home';

	let select = ['Home', 'About', 'Blogs'];

	let selected = writable(0);
	let selectedItem: number;
	selected.subscribe((value) => {
		selectedItem = value;
	});

	$: {
		selected.set(select.indexOf(title));
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
				<a href="/" class:selected={index === selectedItem}><span>{item}</span></a>
			</li>
		{/each}
	</ul>
</header>

<style lang="scss">
	header {
		ul {
      padding: 1em 2em;
			border-left: #333 solid 1px;

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
					font-weight: 100;
					font-size: 1.5em;
					padding: 0 0.5em;

					span {
						margin-right: -0.8em;
					}

					&:not(.selected) {
						background-color: transparent;
					}

					&.selected {
						background-color: #ffec88;
					}
				}
			}
		}
	}
</style>
