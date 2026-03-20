<script lang="ts">
	import WorksBox from '$lib/components/page/solid/components/WorksBox.svelte';
	import WorksWindow from '$lib/components/page/solid/components/WorksWindow.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section
	class="rel w:min(1220px,calc(100%-100px)) my:160px mx:auto @min-900:w:min(1220px,calc(100%-32px)) @min-900:mt:100px @min-900:mb:180px"
>
	<h1
		class="abs top:-1.4em left:0 text:4em text-align:center font:thin line-h:1em uppercase w:100%"
	>
		works
	</h1>
	<WorksWindow title={"/GET/ENTRIES/WORKS"}>
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
