<script lang="ts">
	import icon from '$lib/img/myicon.png';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion';
	import { writable } from 'svelte/store';

	export let pages;
	export let link;

	const isHovered = writable(false);
	const displayWidth = writable(0);
	const isLinkHovered = writable(false);

	const linkPosition = new Spring({ x: 0, y: 0 }, {
		stiffness: 0.08,
		damping: 0.5
	});

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
		const linkElement = target.closest('a');
		isHovered.set(true);

		if (linkElement) {
			const rect = linkElement.getBoundingClientRect();
			linkPosition.target = {
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2
			};
			isLinkHovered.set(true);
		} else {
			linkPosition.target = { x: e.clientX, y: e.clientY };
			isLinkHovered.set(false);
		}
	}

	function handlePointerOut() {
		isHovered.set(false);
		isLinkHovered.set(false);
	}

	function handlePointerLeave() {
		console.log('leave');
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
	 class="pointer-events-none fixed z-50 border-2 border-black flex -translate-x-1/2 -translate-y-1/2 rounded-full {$isHovered ? 'opacity-100' : 'opacity-0'}"
	 style="
    top: {linkPosition.current.y}px;
    left: {linkPosition.current.x}px;
    width: {$isLinkHovered ? '40px' : '16px'};
    height: {$isLinkHovered ? '40px' : '16px'};
    transform: translate(-50%, -50%) scale({isLinkHovered ? 1.2 : 1});
    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                height 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  "
 ></span>
{/if}

<div class="main h-[100svh] w-[100svw] select-none">
	{#if $displayWidth > 1280}
		<div class="grid h-full grid-cols-[400px_1fr_400px]">
			<div class="flex flex-col items-center justify-center gap-8">
				<div class="relative h-[150px] w-[150px]">
					<img
						src={icon}
						alt="icon"
						class="pointer-events-none absolute left-0 top-0 z-10 aspect-square w-[148px] rounded-full"
					/>
					<svg
						width="166"
						height="166"
						viewBox="0 0 166 166"
						class="absolute left-0 top-0 z-0"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22.8959 22.8959C52.1853 -6.39343 99.6726 -6.39343 128.962 22.8959L143.104 37.038C172.393 66.3273 172.393 113.815 143.104 143.104V143.104C113.815 172.393 66.3274 172.393 37.0381 143.104L22.8959 128.962C-6.39337 99.6726 -6.39337 52.1852 22.8959 22.8959V22.8959Z"
							fill="var(--color-accent)"
							stroke="var(--color-border)"
							stroke-width="2"
						/>
					</svg>
					<svg
						width="150"
						height="150"
						viewBox="-1 -1 152 152"
						class="absolute left-0 top-0 z-10"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M150 75C150 116.421 116.421 150 75 150C33.5786 150 0 116.421 0 75C0 33.5786 33.5786 0 75 0C116.421 0 150 33.5786 150 75Z"
							stroke="var(--color-border)"
							stroke-width="2"
						/>
					</svg>
				</div>
				<div class="relative h-[120px] w-[200px] px-8">
					<svg
						width="200"
						height="120"
						viewBox="-1 -1 202 122"
						class="absolute left-0 top-0 z-10"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0 16C0 7.16344 7.16344 0 16 0H184C192.837 0 200 7.16344 200 16V104C200 112.837 192.837 120 184 120H16C7.16344 120 0 112.837 0 104V16Z"
							fill="#ffffff"
							stroke="var(--color-border)"
							stroke-width="2"
						/>
					</svg>
					<svg
						width="214"
						height="134"
						viewBox="-1 -1 216 136"
						class="absolute left-0 top-0 z-0"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M16 0C7.16345 0 0 7.16345 0 16V104C0 108.441 1.80914 112.459 4.73053 115.358L18.7305 129.358C21.6224 132.227 25.6042 134 30 134H198C206.837 134 214 126.837 214 118V30C214 25.5593 212.191 21.5411 209.269 18.6422L195.269 4.64221C192.378 1.7727 188.396 0 184 0H16Z"
							fill="var(--color-accent)"
							stroke="var(--color-border)"
							stroke-width="2"
						/>
					</svg>
					<div
						class="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-2"
					>
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
			</div>
			<div class="pages flex max-h-[100svh] w-full p-5">
				<div class="overflow flex h-full w-full overflow-y-auto">
					<div class="flex h-fit w-full min-h-full p-8">
						<slot />
					</div>
				</div>
			</div>
			<div class="flex h-full flex-col items-center justify-center gap-8 px-20">
				{#each pages as page}
					<div class="link relative flex h-[64px] w-[200px] items-center justify-center">
						<svg
							width="200"
							height="64"
							viewBox="-1 -1 202 66"
							class="front absolute left-0 top-0 z-10 {link === page.href ? 'isHere' : ''}"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0 8C0 3.58172 3.58172 0 8 0H192C196.418 0 200 3.58172 200 8V56C200 60.4183 196.418 64 192 64H8C3.58173 64 0 60.4183 0 56V8Z"
								fill="#ffffff"
								stroke="var(--color-border)"
								stroke-width="2"
							/>
						</svg>
						<svg
							width="214"
							height="78"
							viewBox="-1 -1 216 80"
							class="absolute left-0 top-0"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M192 0H8C3.58172 0 0 3.58172 0 8V56C0 58.2143 0.899623 60.2185 2.35331 61.667L16.3346 75.6483C17.783 77.101 19.7865 78 22 78H206C210.418 78 214 74.4183 214 70V22C214 19.7857 213.1 17.7815 211.647 16.333L197.665 2.35171C197.66 2.34599 197.654 2.34027 197.648 2.33456C196.201 0.891889 194.205 0 192 0Z"
								fill="var(--color-accent)"
								stroke="var(--color-border)"
								stroke-width="2"
							/>
						</svg>
						<a
							href={page.href}
							class="absolute left-0 top-0 z-10 flex h-full w-full flex-row items-center justify-center gap-4 px-8 py-6 {link === page.href ? 'isHere' : ''}"
						>
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
        background-color: #ffffff;
        border-left: 2px solid var(--color-border);
        border-right: 2px solid var(--color-border);
    }

    .link {
        &:hover {
            & .front {
                transform: translate(-8px, -8px);
            }

            & a {
                transform: translate(-8px, -8px);
            }
        }

        .front {
            transform: translate(0, 0);
            transition: transform 0.3s;
        }

        & a {
            transform: translate(0, 0);
            transition: transform 0.3s;
        }

        & a.isHere {
            transform: translate(-8px, -8px);
        }

        & svg.isHere {
            transform: translate(-8px, -8px);
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