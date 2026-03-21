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

	const jsonLdScripts = $derived(
		serializedBlocks
			.map((serialized: string) => `<script type="application/ld+json">${serialized}<\\/script>`)
			.join('')
	);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLdScripts}
</svelte:head>
