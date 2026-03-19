<script lang="ts">
	import WorksBox from '$lib/components/page/solid/components/WorksBox.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
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
			/GET/ENTRIES/WORKS
		</p>
		<div class="flex flex:wrap jc:center gap:20px py:24px px:6px @min-900:px:20px">
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
		</div>
	</div>
</section>
