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

	const scriptOpenTag = '<script type="application/ld+json">';
	const scriptCloseTag = '</scr' + 'ipt>';

	const jsonLdScripts = $derived(
		serializedBlocks
			.map((serialized: string) => `${scriptOpenTag}${serialized}${scriptCloseTag}`)
			.join('')
	);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLdScripts}
</svelte:head>
