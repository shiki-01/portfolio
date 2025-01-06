<script lang="ts">
	import icon from '$lib/img/myicon.png';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let pages;
	export let link;

	const isHovered = writable(false);
	const displayWidth = writable(0);
	const pointer = writable({ x: 0, y: 0 });
	const isLinkHovered = writable(false);

	onMount(() => {
		if (typeof window === 'undefined') return;
		displayWidth.set(window.innerWidth);
		window.addEventListener('resize', () => {
			displayWidth.set(window.innerWidth);
		});
	});

	function handlePointerMove(e: PointerEvent) {
		if (typeof window === 'undefined') return;
		const target = e.target as HTMLElement;
		isHovered.set(true);
		pointer.set({ x: e.clientX, y: e.clientY });
		isLinkHovered.set(target instanceof HTMLAnchorElement || target.closest('a') !== null);
	}

	function handlePointerOut() {
		isHovered.set(false);
		isLinkHovered.set(false);
	}

	function handlePointerLeave() {
		isHovered.set(false);
		isLinkHovered.set(false);
	}
</script>

<svelte:window
	on:pointermove={handlePointerMove}
	on:pointerout={handlePointerOut}
	on:pointerleave={handlePointerLeave}
/>

{#if $displayWidth > 1280}
	<span
		class="pointer-events-none fixed z-50 flex -translate-x-1/2 -translate-y-1/2 rounded-full transition-[background,width,height] duration-300 {$isLinkHovered
			? 'h-8 w-8 bg-red-400/50'
			: 'h-2 w-2 bg-black'} {$isHovered ? 'opacity-100' : 'opacity-0'}"
		style="top: {$pointer.y}px; left: {$pointer.x}px;"
	></span>
{/if}

<div class="main h-[100svh] w-[100svw] select-none">
	{#if $displayWidth > 1280}
		<div class="grid h-full grid-cols-[400px_1fr_400px]">
			<div class="flex flex-col items-center justify-center gap-8">
				<img
					src={icon}
					alt="icon"
					class="pointer-events-none aspect-square w-[150px] rounded-full shadow-lg"
				/>
				<div class="flex w-full flex-col items-center justify-center gap-4 px-10">
					<p class="text-lg">shiki</p>
					<div class="flex flex-col gap-2">
						<a
							href="https://x.com/shiki__01"
							target="_blank"
							rel="noopener noreferrer"
							class="text-md flex flex-row items-center gap-2"
						>
							<Icon icon="simple-icons:x" class="mt-1 h-4 w-4" />
							<p>@shiki__01</p>
						</a>
						<a
							href="https://github.com/shiki-01"
							target="_blank"
							rel="noopener noreferrer"
							class="text-md flex flex-row items-center gap-2"
						>
							<Icon icon="simple-icons:github" class="mt-1 h-4 w-4" />
							<p>@shiki-01</p>
						</a>
					</div>
				</div>
			</div>
			<div class="pages flex max-h-[100svh] w-full p-5">
				<div class="overflow flex h-full w-full overflow-y-auto">
					<div class="flex h-full w-full p-8">
						<slot />
					</div>
				</div>
			</div>
			<div class="flex h-full flex-col items-center justify-center gap-2 px-20">
				{#each pages as page}
					<div
						class="link flex w-full items-center justify-center"
						data-is-here={link === page.href}
					>
						<a href={page.href} class="flex flex-row items-center justify-center gap-4 px-8 py-6">
							<p class="text-xl">{page.title}</p>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.main {
		background-color: var(--color-bg);
	}

	.pages {
		background-color: var(--color-bg-accent);
		box-shadow: 0px 0px 20px 0px var(--color-shadow);
	}

	.link {
		position: relative;

		&::before {
			content: '';
			position: absolute;
			display: block;
			bottom: 0;
			left: 0;
			width: 0;
			height: 2px;
			background-color: var(--color-accent);
			transition: width 0.3s ease;
		}

		&:hover::before {
			width: 100%;
		}

		&[data-is-here='true']::before {
			width: 100%;
		}
	}

	.overflow {
		&::-webkit-scrollbar {
			position: absolute;
			right: 0;
			width: 5px;
			height: 5px;
		}

		&::-webkit-scrollbar-thumb {
            background-color: var(--color-bg);
			width: 5px;
			height: 5px;
			border-radius: 5px;
		}
	}
</style>
