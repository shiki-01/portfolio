<script lang="ts">
	export let container;
    export let title: 'Home' | 'About' | 'Works' | 'Blogs' = 'Home';
	export let primary = false;


	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();

	function handleClick(event: { currentTarget: { href: string | URL } }) {
		dispatch('linkclick');
		goto(event.currentTarget.href);
	}

	let select = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'Works', route: '/works' },
		{ name: 'Blogs', route: '/blogs' }
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

<header class={primary ? 'show' : 'hide'} bind:this={container}>
	<ul>
		{#each select as item, index}
			<li>
				<a
					href={item.route}
					class:selected={index === selectedItem}
					on:click|preventDefault={handleClick}><span>{item.name}</span></a
				>
			</li>
		{/each}
	</ul>
</header>

<style lang="scss">
	.show {
		opacity: 1;
		transition: opacity 0.5s ease-in-out;
	}

	.hide {
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
	}
	header {
		position: fixed;
		z-index: 1000;

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
