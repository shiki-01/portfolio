<script lang="ts">
	import { onMount } from 'svelte';
	import Title from '../../../stories/Title.svelte';
	import Blogtitle from '../../../stories/Blogtitle.svelte';
	export let data;

	onMount(() => {
		console.log('Data on mount:', data);
	});
</script>

<Title title="blogs" />

<div>
	{#each data.blogs.contents as blog}
		<Blogtitle
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
        margin-top: 5em;
        display: grid;
        gap: .5em;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        justify-content: center;
        align-items: start;
    }
</style>