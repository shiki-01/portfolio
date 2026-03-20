<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Icon from '@iconify/svelte';
	import icon from '$lib/assets/img/myicon.png';
	import WorksBox from '$lib/components/page/solid/components/WorksBox.svelte';
	import works from '$lib/assets/mocks/works-list.json';
	import WorksWindow from '$lib/components/page/solid/components/WorksWindow.svelte';

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
</script>

<div class="w:100%">
	<Page height={100}>
		<p class="text:3em line-h:1.4em font:thin hero-copy">好きに、<br />自由に。</p>
	</Page>
	<Page>
		<div class="w:100% h:100% grid-template-columns:1fr|1fr grid px:100px intro-grid">
			<div class="w:100% h:100% justify-content:center ai:center flex icon-wrap profile-media">
				<span class="circle"></span>
				<span class="circle circle2"></span>
				<img src={icon} alt="My Icon" class="w:240px h:240px object:cover r:full overflow:hidden" />
			</div>
			<div
				class="w:100% h:100% px:20px flex:column gap:80px justify-content:center align-items:start flex intro-content"
			>
				<div class="flex flex:column gap:20px">
					<h1 class="text:4em font:thin line-h:1em uppercase">shiki</h1>
					<div class="text:20px flex:row flex:wrap gap:20px flex social-list">
						{#each icons as { title, icon, link }}
							<a
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								class="mb:10px flex:row ai:center gap:4px b:1px|solid|#fff px:16px py:8px bg:#fff:hover fg:#153F63:hover transition:background-color|0.3s flex rounded"
							>
								<Icon class="text:24px mr:10px" {icon} />
								<div class="flex:row gap:2px ai:center flex">
									<span class="text:18px">
										{title}
									</span>
									<Icon icon="mdi-light:arrow-up" width="30" height="30" class="rotate(45deg)" />
								</div>
							</a>
						{/each}
					</div>
				</div>
				<p class="text:20px bio-text">
					どこにでもいる普通の大学生<br /><br />
					Web 系を中心としたフルスタックエンジニアを目指している<br />
					デザインの分野にも興味があるためやりたいことの収集がつかなくなっている<br /><br />
					API が完全な型をもって実装できることが最近の幸せ
				</p>
			</div>
		</div>
	</Page>
	<Page>
		<div class="w:100% h:100% flex ai:center jc:center flex:column pt:100px gap:60px works-section">
			<h1 class="text:4em text-align:center font:thin line-h:1em uppercase w:100% section-title">
				works
			</h1>
			<div class="flex w:100% px:100px works-inner">
				<WorksWindow title={'/GET/ENTRIES/WORKS'}>
					{#each works.contents.slice(0, 3) as work}
						<WorksBox
							id={work.id}
							title={work.title}
							_description={work.description}
							src={work.image.url}
							tags={work.tags}
						/>
					{/each}
					<div class="flex flex:column w:100% ai:center py:20px">
						<a class="f:2em font-weight:100 uppercase" href="/works">more</a>
					</div>
				</WorksWindow>
			</div>
		</div>
	</Page>
	<Page>
		<div class="w:100% h:100% flex ai:start jc:center pt:100px simple-heading-wrap">
			<h1 class="text:4em font:thin line-h:1em uppercase section-title">skills</h1>
		</div>
	</Page>
	<Page>
		<div class="w:100% h:100% flex ai:start jc:center pt:100px simple-heading-wrap">
			<h1 class="text:4em font:thin line-h:1em uppercase section-title">blogs</h1>
		</div>
	</Page>
</div>

<style>
	.icon-wrap {
		position: relative;
	}

	.circle {
		position: absolute;
		border: 1px solid #fff;
		border-radius: 50%;
		width: 255px;
		height: 255px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.circle2 {
		width: 280px;
		height: 280px;
	}

	.hero-copy {
		font-size: clamp(2rem, 6vw, 3em);
	}

	.section-title {
		font-size: clamp(2rem, 6.4vw, 4em);
	}

	@media (max-width: 1024px) {
		.intro-grid {
			display: flex;
			flex-direction: column;
			padding: 0 40px;
			gap: 36px;
		}

		.intro-content {
			gap: 40px;
			padding: 0;
		}

		.works-section {
			padding-top: 56px;
			gap: 32px;
		}

		.works-inner {
			padding: 0 32px;
		}
	}

	@media (max-width: 768px) {
		.profile-media img {
			width: 188px;
			height: 188px;
		}

		.circle {
			width: 204px;
			height: 204px;
		}

		.circle2 {
			width: 228px;
			height: 228px;
		}

		.intro-grid {
			padding: 0 20px;
		}

		.social-list {
			gap: 10px;
			font-size: 16px;
		}

		.bio-text {
			font-size: 16px;
			line-height: 1.9;
		}

		.works-inner {
			padding: 0 12px;
		}

		.simple-heading-wrap {
			padding-top: 64px;
		}
	}
</style>
