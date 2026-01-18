<script lang="ts">
	import Header from './components/Header.svelte';
	import Page from '$lib/components/Page.svelte';
	import Icon from '@iconify/svelte';
    import logo from '$lib/components/page/solid/img/logoTitle.svg';
    import outline from '$lib/components/page/solid/img/logoSymbol_outline.svg';
	import ToTop from './components/ToTop.svelte';
	let { children } = $props();

	let position = $state({
		x: 0,
		y: 0
	});
	let isOvered = $state(false);

	const icons = [
		{
			title: '@shiki-01',
			link: 'https://github.com/shiki-01',
			icon: 'simple-icons:github'
		},
		{
			title: '@shiki__01',
			link: 'https://twitter.com/shiki__01',
			icon: 'simple-icons:x'
		},
		{
			title: '@shiki-01',
			link: 'https://www.youtube.com/@shiki-01',
			icon: 'simple-icons:youtube'
		}
	];

	const handlePointerMove = (e: PointerEvent) => {
		position.x = e.clientX;
		position.y = e.clientY;
	};

	const handlePointerLeave = () => {
		isOvered = false;
	};

	const handlePointerEnter = () => {
		isOvered = true;
	};
</script>

<svelte:window
	onpointermove={handlePointerMove}
	onpointerleave={handlePointerLeave}
	onpointerenter={handlePointerEnter}
/>

<div class="rel w:100% h:100% flex:column justify-content:center ai:center flex">
	<span
		class="pointer"
		style="top: {position.y}px; left: {position.x}px; opacity: {isOvered ? 0 : 1}"
	>
		<svg width="31" height="42" viewBox="0 0 31 42" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4.66037 36.9214L23.75 40.9856L29.7751 22.4214L1.25 2.01443L4.66037 36.9214Z"
				fill="#153F63"
				stroke="white"
			/>
		</svg>
	</span>
	<Header />
	<ToTop />
	<div
		class="fixed back top:0 left:0 w:100dvw h:100dvh overflow:hidden flex:column justify-content:center ai:center flex"
	>
		<img src={outline} class="w:600px opacity:0.2" alt="logo outline" />
		<span class="circle circle1"></span>
		<span class="circle circle2"></span>
		<span class="circle circle3"></span>
		<span class="line"></span>
	</div>
	<div
		class="w:100% h:100% z:2 mt:80px flex:column justify-content:center align-items:start overflow-y:auto flex"
	>
		{@render children()}
		<footer
			class="bg:#153F63 fg:#ffffff bt:1px|solid|#fff justify-content:center ai:center flex"
		>
			<Page height={60}>
				<div
					class="w:100% h:100% p:40px flex:column justify-content:space-between ai:center flex"
				>
					<div
						class="w:100% flex:column justify-content:space-between align-items:start gap:40px px:16px flex flex-wrap"
					>
						<div class="w:100% h:60px flex:row justify-content:start ai:center gap:16px">
                            <img src={logo} alt="Logo" class="w:auto h:100% object:cover" />
                        </div>
						<div class="w:100% px:40px grid-template-columns:1fr|1fr|1fr gap:40px grid">
							<div class="flex:column gap:8px flex">
								<h2 class="text:2em font:thin mb:8px uppercase">site map</h2>
								<div class="flex:column pl:12px gap:16px flex">
									<a href="/" class="text:18px fg:#fff:hover underline:hover transition:color|0.2s"
										>Home</a
									>
									<a
										href="/about"
										class="text:18px fg:#fff:hover underline:hover transition:color|0.2s">About</a
									>
									<a
										href="/works"
										class="text:18px fg:#fff:hover underline:hover transition:color|0.2s">Works</a
									>
									<a
										href="/blogs"
										class="text:18px fg:#fff:hover underline:hover transition:color|0.2s">Blogs</a
									>
								</div>
							</div>
							<div class="flex:column gap:8px flex">
								<h2 class="text:2em font:thin mb:8px uppercase">Contact</h2>
								<a
									href="mailto:contact@shiki-01.com"
									class="text:18px pl:12px fg:#fff:hover underline:hover transition:color|0.2s"
									>contact@shiki-01.com</a
								>
							</div>
							<div class="flex:column gap:8px flex">
								<h2 class="text:2em font:thin mb:8px uppercase">Links</h2>
								<div class="flex:column gap:8px pl:12px flex">
									{#each icons as { title, icon, link }}
										<a
											href={link}
											target="_blank"
											rel="noopener noreferrer"
											class="w:fit mb:10px flex:row ai:center gap:4px b:1px|solid|#fff px:16px py:8px bg:#fff:hover fg:#153F63:hover transition:background-color|0.3s flex rounded"
										>
											<Icon class="text:24px mr:10px" {icon} />
											<div class="flex:row gap:2px ai:center flex">
												<span class="text:18px">
													{title}
												</span>
												<Icon
													icon="mdi-light:arrow-up"
													width="30"
													height="30"
													class="rotate(45deg)"
												/>
											</div>
										</a>
									{/each}
								</div>
							</div>
						</div>
					</div>
					<p class="text:14px mt:24px fg:#bbb">© 2024 shiki-01</p>
				</div>
			</Page>
		</footer>
	</div>
</div>

<style>
	/* :global(html, body, *, *:hover, *:active, *:focus) {
		cursor: none !important;
	} */

    :global(body) {
        background-color: #153F63;
    }

	.back {
		background-image:
			linear-gradient(0deg, transparent calc(100% - 1px), rgba(80, 108, 122, 40%) calc(100% - 1px)),
			linear-gradient(90deg, transparent calc(100% - 1px), rgba(80, 108, 122, 40%) calc(100% - 1px));
		background-size: 32px 32px;
		background-repeat: repeat;
		background-position: center center;
	}

	.pointer {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		pointer-events: none;
		display: none;
	}

	.circle {
		position: absolute;
		border: 1px solid #fff;
		border-radius: 50%;
	}

	.circle,
	.line {
		pointer-events: none;
	}

	.circle1 {
		top: calc(50% - 250px);
		left: calc(-200px);
		width: 500px;
		height: 500px;
	}

	.circle2 {
		top: calc(50% - 864px);
		left: calc(300px);
		width: 1728px;
		height: 1728px;
	}

	.circle3 {
		top: calc(50% - 700px);
		left: calc(300px);
		width: 1400px;
		height: 1400px;
	}

	.line {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 1px;
		transform: translate(-50%, -50%);
		background-color: #fff;
	}

	.line::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 8px;
		transform: translate(-50%, -50%);
		background-image: linear-gradient(90deg, transparent calc(100% - 1px), #fff calc(100% - 1px));
		background-size: 32px 32px;
		background-repeat: repeat;
		background-position: center center;
	}
</style>
