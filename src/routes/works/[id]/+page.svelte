<script lang="ts">
	import type { PageData } from './$types';
	import '$lib/styles/blog.scss';
	import Title from '$lib/components/page/solid/components/Title.svelte';

	let { data }: { data: PageData } = $props();

	const currentWork = $derived(data.detail);

	const title = $derived(currentWork?.title || 'Untitled Work');
	const content = $derived(currentWork?.content || 'Content is being prepared.');
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
	const description = $derived(currentWork?.description);
</script>

<section
	class="rel w:min(1220px,calc(100%-20px)) my:160px mx:auto px:100px px:60px@<md px:20px@<sm"
>
	<Title class="abs top:-6em left:0">works</Title>
	<div
		class="abs w:calc(100%-200px) w:calc(100%-120px)@<md w:calc(100%-40px)@<sm h:100% top:10px left:calc(50%+10px) translateX(-50%) z:0 bg:#153f63 b:1px|solid|#fff r:15px @min-900:top:14px @min-900:right:-14px @min-900:bottom:-14px @min-900:left:14px"
		aria-hidden="true"
	></div>
	<div class="rel z:1 overflow:hidden bg:#153f63 b:1px|solid|#fff r:10px">
		<p
			class="h:40px px:12px flex ai:center f:clamp(6px,3.8vw,16px) white-space:nowrap font:JetBrainsMono ls:0.04em uppercase bb:1px|solid|#fff"
		>
			/GET/ENTRIES<a href="/works">/WORKS</a>/{currentWork?.id}
		</p>
		<div class="grid cols:1 gap:20px p:24px @min-900:px:24px detail-body">
			<h1 class="f:clamp(24px,4.6vw,36px) font:thin line-h:1.2">{title}</h1>
			<div
				class="grid grid-template-cols:1fr|500px @min-900:cols:2 gap:20px @min-900:ai:start detail-grid"
			>
				<div
					class="b:1px|solid|#ffffff50 r:8px w:100% h:100% max-h:340px overflow:hidden detail-image"
				>
					{#if imageUrl}
						<img
							src={imageUrl}
							alt={imageAlt}
							class="w:100% h:100% obj:cover d:block"
							loading="lazy"
						/>
					{:else}
						<div class="w:100% h:100% flex ai:center jc:center f:14px opacity:.75">image: TBD</div>
					{/if}
				</div>

				<div class="flex flex:column gap:18px">
					<div class="b:1px|solid|#ffffff r:4px p:14px @min-900:p:16px flex flex:column gap:16px">
						<div class="grid cols:1 gap:8px f:14px @min-900:f:15px">
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
							<p>
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

					<p class="f:14px @min-900:f:15px line-h:1.8">{description}</p>
				</div>
			</div>

			<div class="blog f:14px @min-900:f:15px line-h:1.8 mt:8px white-space:pre-wrap">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html content}
			</div>
		</div>
	</div>
</section>

<style>
	@media (max-width: 960px) {
		.detail-grid {
			grid-template-columns: 1fr;
		}

		.detail-image {
			max-height: 300px;
		}
	}

	@media (max-width: 768px) {
		.detail-body {
			padding: 14px;
		}
	}
</style>
