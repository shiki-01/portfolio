<script lang="ts">
	import type { PageData } from './$types';
	import '$lib/styles/blog.scss';

	let { data }: { data: PageData } = $props();

	const currentWork = $derived(data.detail);

	const title = $derived(currentWork?.title || 'Untitled Work');
	const description = $derived(currentWork?.description || 'Description is being prepared.');
	const term = $derived(currentWork?.term || 'TBD');
	const role = $derived(currentWork?.role || 'TBD');
	const member = $derived(currentWork?.member ? `${currentWork.member}名` : 'TBD');
	const link = $derived(currentWork?.link || 'TBD');
	const ghRepo = $derived(currentWork?.['gh-repo'] || 'TBD');
	const tags = $derived(currentWork?.tags?.length ? currentWork.tags : ['TBD']);
	const skills = $derived(currentWork?.skills?.length ? currentWork.skills : ['TBD']);
	const imageUrl = $derived(
		Array.isArray(currentWork?.image)
			? currentWork.image[0]?.url || ''
			: (currentWork?.image as { url?: string } | undefined)?.url || ''
	);
	const imageAlt = $derived(`${title} preview`);
</script>

<section
	class="rel w:min(1220px,calc(100%-20px)) mt:70px mb:120px mx:auto @min-900:w:min(1220px,calc(100%-32px)) @min-900:mt:100px @min-900:mb:180px"
>
	<div
		class="abs w:100% h:100% top:10px right:-10px bottom:-10px left:10px z:0 bg:#153f63 b:1px|solid|#fff r:15px @min-900:top:14px @min-900:right:-14px @min-900:bottom:-14px @min-900:left:14px"
		aria-hidden="true"
	></div>
	<div class="rel z:1 overflow:hidden bg:#153f63 b:1px|solid|#fff r:10px">
		<p
			class="h:40px px:12px flex ai:center f:clamp(16px,3.8vw,20px) font:JetBrainsMono ls:0.04em uppercase bb:1px|solid|#fff"
		>
			/GET/ENTRIES<a href="/works">/WORKS</a>/{currentWork?.id}
		</p>
		<div class="grid cols:1 @min-900:cols:2 gap:20px py:24px px:12px @min-900:px:20px">
			<div class="col-span:1 @min-900:col-span:2 b:1px|solid|#ffffff50 r:8px overflow:hidden">
				{#if imageUrl}
					<img src={imageUrl} alt={imageAlt} class="w:100% h:auto d:block" loading="lazy" />
				{:else}
					<div class="w:100% h:220px @min-900:h:300px flex ai:center jc:center f:14px opacity:.75">
						image: TBD
					</div>
				{/if}
			</div>
			<div
				class="b:1px|solid|#ffffff50 r:8px p:14px @min-900:p:18px grid grid-template-cols:1fr|1fr gap:12px"
			>
				<div class="grid cols:1 @min-900:cols:2 gap:8px @min-900:gap:10px f:14px @min-900:f:15px">
					<p><strong>term:</strong> {term}</p>
					<p><strong>role:</strong> {role}</p>
					<p><strong>member:</strong> {member}</p>
					<p>
						<strong>link:</strong>
						{#if link !== 'TBD'}
							<a
								class="c:#9fd3ff text-decoration:underline"
								href={link}
								target="_blank"
								rel="noreferrer">{link}</a
							>
						{:else}
							{link}
						{/if}
					</p>
					<p class="col-span:1 @min-900:col-span:2">
						<strong>gh-repo:</strong>
						{#if ghRepo !== 'TBD'}
							<a
								class="c:#9fd3ff text-decoration:underline"
								href={ghRepo}
								target="_blank"
								rel="noreferrer">{ghRepo}</a
							>
						{:else}
							{ghRepo}
						{/if}
					</p>
				</div>

				<div class="flex flex:column gap:12px">
					<div>
						<p class="f:12px uppercase ls:0.06em opacity:.8 mb:6px">tags</p>
						<div class="flex flex:wrap gap:8px">
							{#each tags as tag}
								<span class="px:10px py:4px r:999px b:1px|solid|#ffffff70 f:12px">{tag}</span>
							{/each}
						</div>
					</div>

					<div>
						<p class="f:12px uppercase ls:0.06em opacity:.8 mb:6px">skills</p>
						<div class="flex flex:wrap gap:8px">
							{#each skills as skill}
								<span class="px:10px py:4px r:999px bg:#ffffff20 f:12px">{skill}</span>
							{/each}
						</div>
					</div>
				</div>
			</div>
			<div class="p:14px @min-900:p:18px">
				<h1 class="f:clamp(24px,4.6vw,40px) font:thin line-h:1.1 mb:14px">{title}</h1>

				<div class="blog f:14px @min-900:f:15px line-h:1.8 mt:2em white-space:pre-wrap">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html description}
				</div>
			</div>
		</div>
	</div>
</section>
