<script lang="ts">
	import Title from '../../../../stories/Title.svelte';
	import Blogpage from '../../../../stories/Blogpage.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	import { onMount } from 'svelte';

	onMount(() => {
		console.log('Data on mount:', data);
	});
</script>

<Title title="blog" />
<div id="blog-content">
	<Blogpage
		id={data.id}
		title={data.title}
		published={data.publishedAt}
		updated={data.updatedAt}
		eyecatch={data.eyecatch.url}
		category={data.category.name}
		content={data.content}
	/>
</div>

<style lang="scss">
	div {
		width: 100%;
        margin: 0;
        padding: 0 100px;
		margin-top: 5em;
		justify-content: center;
		align-items: start;
	}

    @media (max-width: 768px) {
        div {
            padding: 0 30px;
        }
    }
</style>
