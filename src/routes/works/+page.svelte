<script lang="ts">
	import Title from '$lib/components/page/solid/components/Title.svelte';
	import WorksBox from '$lib/components/page/solid/components/WorksBox.svelte';
	import WorksWindow from '$lib/components/page/solid/components/WorksWindow.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section
	class="rel w:100% px:80px px:60px@<md px:25px@<sm my:160px mx:auto"
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
