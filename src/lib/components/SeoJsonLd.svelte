<script lang="ts">
	let { blocks = [] } = $props<{ blocks?: unknown[] }>();

	const serializedBlocks = $derived(
		blocks.map((block: unknown) => {
			const scriptClosePattern = new RegExp('</script', 'gi');
			return JSON.stringify(block)
				.replace(/</g, '\\u003c')
				.replace(/>/g, '\\u003e')
				.replace(/&/g, '\\u0026')
				.replace(scriptClosePattern, '<\\/script');
		})
	);
</script>

<svelte:head>
	{#each serializedBlocks as serialized}
		<script type="application/ld+json">{serialized}</script>
	{/each}
</svelte:head>
