<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Icon from '@iconify/svelte';
	import icon from '$lib/img/myicon.png';

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
	<Page>
		<p class="text:3em line-h:1.4em font:thin">好きに、<br />自由に。</p>
	</Page>
	<Page>
		<div class="w:100% h:100% grid-template-columns:1fr|1fr grid">
			<div class="w:100% h:100% rel justify-content:center align-items:center flex">
				<span class="circle"></span>
				<span class="circle circle2"></span>
				<img src={icon} alt="My Icon" class="w:240px h:240px object:cover r:full overflow:hidden" />
			</div>
			<div
				class="w:100% h:100% px:20px flex:column gap:80px justify-content:center align-items:start flex"
			>
				<div class="flex flex:column gap:20px">
					<h1 class="text:4em font:thin line-h:1em uppercase">shiki</h1>
					<div class="text:20px flex:row flex:wrap gap:20px flex">
						{#each icons as { title, icon, link }}
							<a
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								class="mb:10px flex:row align-items:center gap:4px b:1px|solid|#fff px:16px py:8px bg:#fff:hover fg:#153F63:hover transition:background-color|0.3s flex rounded"
							>
								<Icon class="text:24px mr:10px" {icon} />
								<div class="flex:row gap:2px align-items:center flex">
									<span class="text:18px">
										{title}
									</span>
									<Icon icon="mdi-light:arrow-up" width="30" height="30" class="rotate(45deg)" />
								</div>
							</a>
						{/each}
					</div>
				</div>
				<p class="text:20px">
					どこにでもいる普通の高校生<br /><br />
					Web 系を中心としたフルスタックエンジニアを目指している<br />
					デザインの分野にも興味があるためやりたいことの収集がつかなくなっている<br /><br />
                    API が完全な型をもって実装できることが最近の幸せ
				</p>
			</div>
		</div>
	</Page>
</div>

<style>
	.circle {
		position: absolute;
		border: 1px solid #fff;
		border-radius: 50%;
		width: 255px;
		height: 255px;
		top: calc(0);
		left: calc(0);
	}

	.circle2 {
		width: 280px;
		height: 280px;
	}
</style>
