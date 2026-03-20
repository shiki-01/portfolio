<script lang="ts">
	import Title from '$lib/components/page/solid/components/Title.svelte';
	import WorksBox from '$lib/components/page/solid/components/WorksBox.svelte';
	import WorksWindow from '$lib/components/page/solid/components/WorksWindow.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section
	class="rel w:min(1220px,calc(100%-100px)) my:160px mx:auto @min-900:w:min(1220px,calc(100%-32px)) @min-900:mt:100px @min-900:mb:180px works-page-section"
>
	<Title class="abs top:-6em left:0">works</Title>
	<WorksWindow title={'/GET/ENTRIES/WORKS'}>
		{#if data.worksList}
			{#each data.worksList.contents as work}
				<WorksBox
					id={work.id}
					title={work.title}
					_description={work.description || ''}
					src={work.image?.url || ''}
					tags={work.tags}
				/>
			{/each}
		{/if}
	</WorksWindow>
</section>

<style>
	.works-page-section {
		margin-top: clamp(96px, 12vw, 160px);
		margin-bottom: clamp(120px, 13vw, 180px);
		width: min(1220px, calc(100% - 32px));
	}

	@media (max-width: 768px) {
		.works-page-section {
			width: min(1220px, calc(100% - 16px));
		}
	}
</style>
