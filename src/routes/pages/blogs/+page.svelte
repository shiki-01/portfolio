<script lang="ts">
	import { onMount } from 'svelte';
	import Title from '../../../stories/Title.svelte';
	import Blogtitle from '../../../stories/Blogtitle.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	onMount(() => {
		console.log('Data on mount:', data);
	});
</script>

<Title title="blogs" />

<div>
	{#each data.contents as blog}
		<Blogtitle
			id={blog.id}
			title={blog.title}
			published={blog.publishedAt}
			updated={blog.updatedAt}
			eyecatch={blog.eyecatch.url}
			category={blog.category.name}
		/>
	{/each}
</div>

<style lang="scss">
	div {
		width: calc(100vw - 600px - 30pt);
		margin-top: 3em;
		display: grid;
		gap: .5em;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		justify-content: center;
		align-items: start;
	}

	@media (max-width: 1200px) {
		div {
			width: calc(100vw - 100pt);
		}
	}
</style>
