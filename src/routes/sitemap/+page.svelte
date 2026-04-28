<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Title from '$lib/components/page/solid/components/Title.svelte';
	import Icon from '@iconify/svelte';
	import { icons } from '$lib/utils/const';

	const sections = [
		{
			label: 'Pages',
			items: [
				{ title: 'Home', href: '/', description: 'トップページ。自己紹介・スキル・制作実績のハイライト。' },
				{ title: 'About', href: '/about', description: 'プロフィール・経歴・スキルセット。' },
				{ title: 'Works', href: '/works', description: '制作実績の一覧。' },
				{ title: 'Blogs', href: '/blogs', description: 'ブログ記事の一覧。' }
			]
		},
		{
			label: 'Links',
			items: icons.map(({ title, link, icon }) => ({ title, href: link, description: link, icon, external: true }))
		}
	];
</script>

<Page height={100}>
	<div class="w:100% h:100% pt:64px px:clamp(20px,6vw,100px) flex flex:column ai:start gap:80px pb:80px">
		<Title>sitemap</Title>
		<div class="w:100% flex flex:column gap:60px">
			{#each sections as section}
				<section class="flex flex:column gap:20px">
					<h2 class="text:2em font:thin uppercase opacity:.7 bb:1px|solid|rgba(255,255,255,0.3) pb:12px">
						{section.label}
					</h2>
					<ul class="flex flex:column gap:4px list-style:none p:0 m:0">
						{#each section.items as item}
							<li>
								<a
									href={item.href}
									target={item.external ? '_blank' : undefined}
									rel={item.external ? 'noopener noreferrer' : undefined}
									class="flex flex:row ai:center gap:16px gap:10px@<md px:16px py:14px r:8px transition:background-color|0.2s bg:rgba(255,255,255,0.04):hover group"
								>
									{#if item.icon}
										<Icon icon={item.icon} width="20" height="20" class="opacity:.8 flex-shrink:0" />
									{:else}
										<span class="w:20px h:20px flex ai:center jc:center flex-shrink:0 opacity:.5">
											<Icon icon="mdi-light:arrow-right" width="20" height="20" />
										</span>
									{/if}
									<span class="flex flex:column gap:2px">
										<span class="text:18px text:15px@<md font-weight:500 flex ai:center gap:6px">
											{item.title}
											{#if item.external}
												<Icon icon="mdi-light:arrow-up" width="16" height="16" class="rotate(45deg) opacity:.6" />
											{/if}
										</span>
										<span class="text:13px opacity:.55">{item.description}</span>
									</span>
								</a>
							</li>
						{/each}
					</ul>
				</section>
			{/each}
		</div>
	</div>
</Page>
