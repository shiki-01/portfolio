<script lang="ts">
	import '../app.css';
	import logo from '$lib/image/logo.png';
	import myicon from '$lib/image/myicon.png';
	import Header from '$lib/components/Header.svelte';
	import Icon from '@iconify/svelte';
	import noiz from '$lib/image/noiz.png';
	import Toggle from '$lib/components/Toggle.svelte';
	import { setupViewTransition } from "sveltekit-view-transition";

	setupViewTransition();

	import { fade } from 'svelte/transition';

	let header: Header;
	let headerHeight = 0;
	let headerWidth = 0;

	$: if (header) {
		headerHeight = header.offsetHeight;
		headerWidth = header.offsetWidth;
	}

	let primary = false;
	const handlePrimaryChange = (event: { detail: boolean }) => {
		primary = event.detail;
	};

	import { page } from '$app/stores';
	let title: 'Home' | 'About' | 'Works' | 'Blogs';
	$: {
		switch ($page.route.id) {
			case '/':
				title = 'Home';
				break;
			case '/about':
				title = 'About';
				break;
			case '/works':
				title = 'Works';
				break;
			case '/blogs':
				title = 'Blogs';
				break;
			default:
				title = 'Home';
		}
	}

	import { onMount } from 'svelte';

	onMount(() => {
		const cursor = document.getElementById('cursor');

		if (cursor) {
			document.addEventListener('mousemove', (e) => {
				cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
			});

			const links = document.querySelectorAll('a');
			links.forEach((link) => {
				link.classList.add('custom-class');

				link.addEventListener('mouseover', () => {
					cursor.classList.add('cursor--hover');
				});
				link.addEventListener('mouseout', () => {
					cursor.classList.remove('cursor--hover');
				});
			});
		}
	});

	export let type: 'PC' | 'SP' = 'PC';

	onMount(() => {
		const handleResize = () => {
			type = window.innerWidth >= 1200 ? 'PC' : 'SP';
			primary = type === 'PC';
		};

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	function handleLinkClick() {
		if (type === 'SP') {
			primary = false;
		}
	}
</script>

{#if type === 'PC'}
	<div id="cursor" class="cursor {type.toLowerCase()}"></div>
{/if}
<img
	src={noiz}
	alt="noiz"
	class="fixed w-full h-full object-cover z-[9999] opacity-10 mix-blend-screen pointer-events-none"
/>
<main class="{type.toLowerCase()} w-full h-full">
	<div class="header">
		<div id="logo">
			<a href="/"><img src={logo} alt="Shiki" class="m-8" /></a>
			{#if type === 'SP'}
				<span><Toggle {primary} on:change={handlePrimaryChange} /></span>
			{/if}
		</div>
		{#if primary && type === 'SP'}
			<div id="overlay" transition:fade={{ duration: 500 }}></div>
			<div
				id="header-container"
				style="width: {headerWidth}px; height: {headerHeight}px;"
				transition:fade={{ duration: 500 }}
			>
				<Header bind:container={header} {title} {primary} on:linkclick={handleLinkClick} />
			</div>
		{/if}
		{#if type === 'SP'}
			<div id="content">
				<slot />
			</div>
		{/if}
		<div id="profile" class="grid grid-cols-[80px]">
			<div class="flex justify-center items-center flex-col">
				<img src={myicon} alt="icon" class="rounded-full shadow-lg" />
			</div>
			<ul class="flex justify-center items-start flex-col ml-2 gap-2">
				<li>
					<p>shiki</p>
				</li>
				<li>
					<a href="https://twitter.com/shiki__01">
						<Icon icon="fa6-brands:square-x-twitter" />
						<p>@shiki__01</p>
					</a>
				</li>
				<li>
					<a href="https://github.com/shiki-01">
						<Icon icon="devicon:github" style="cursor:pointer" />
						<p>@shiki-01</p>
					</a>
				</li>
			</ul>
			<span class="text-gray-800"> shiki © 2024 Copyright. </span>
		</div>
	</div>
	{#if type === 'PC'}
		<div id="content">
			<slot />
		</div>
	{/if}
	<div class="header">
		{#if type === 'PC'}
			<Header bind:container={header} {title} {primary} />
		{/if}
	</div>
</main>

<style lang="scss">
	:global(body) {
		font-family: 'M PLUS 1', 'Noto Sans JP', sans-serif;
	}

	main .header #profile ul {
		li {
			display: flex;
			justify-content: center;
			margin: 0;

			p {
				margin: 0.2em;
				cursor: default;
				@apply text-gray-800;
			}

			a {
				display: flex;
				align-items: center;
				text-decoration: none;
				color: #333;
				font-size: 1em;
				margin: 0.2em;

				p {
					margin-left: 0.5em;
					cursor: pointer;
				}
			}
		}
	}

	main[class^='pc'] {
		width: 100vw;
		height: 100vh;
		display: grid;
		grid-template-columns: 300px 1fr 300px;
		grid-template-rows: 1fr;

		.header {
			align-items: center;
			display: flex;
			justify-content: center;
			flex-direction: column;

			#logo {
				width: 100%;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;

				a {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
				}

				img {
					width: 100%;
					min-width: 100px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			#profile {
				div {
					width: 100%;
					margin: 0;

					img {
						margin: 0;
					}
				}
				span {
					grid-column: 1 / 3;
					text-align: center;
				}
			}
		}

		#content {
			overflow: auto;
			margin: 15pt 0;
			padding: 0 15pt;
			width: 100%;

			&::-webkit-scrollbar {
				position: absolute;
				right: 0;
				width: 5px;
				height: 5px;
			}

			&::-webkit-scrollbar-thumb {
				@apply bg-gray-400;
				width: 5px;
				height: 5px;
				border-radius: 5px;
			}
		}
	}

	main[class^='sp'] {
		width: 100%;
		height: calc(100vh + 200px);
		position: relative;

		.header:nth-of-type(1) {
			#logo {
				margin: 0;
				width: 100%;
				height: 100px;
				padding: 1em 0 0 1em;
				position: fixed;
				display: grid;
				grid-template-columns: 200px 1fr;

				a {
					display: flex;
					width: 100%;
					margin: 0;

					img {
						margin: 0;
						display: flex;
						width: 100%;
						object-fit: contain;
						height: auto;
					}
				}

				span {
					display: flex;
					justify-content: end;
					align-items: center;
					margin: 0;
					margin-right: 2em;
				}
			}

			#overlay {
				background: white;
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
				margin: 0;
			}

			#header-container {
				margin: 0;
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 2;
			}

			#logo,
			.storybook-toggle {
				z-index: 2;
			}

			#content {
				width: 100%;
				margin: 0;
				padding-top: 150px;
				margin-bottom: 150px;
			}

			#profile {
				margin: 0;
				width: 100%;
				display: grid;
				grid-template-columns: 0.5fr 80px 150px 0.5fr;

				div {
					grid-column: 2 / 3;
					margin: 0;

					img {
						margin: 0;
					}
				}

				ul {
					li {
						p {
							font-size: 0.8em;
						}
					}
				}

				span {
					grid-column: 1 / 6;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 0.8em;
					margin-top: 1em;
				}
			}
		}
	}
</style>
