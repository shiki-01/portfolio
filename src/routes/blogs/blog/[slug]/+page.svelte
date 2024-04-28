<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import BlogPage from '$lib/components/BlogPage.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	import { onMount } from 'svelte';

	onMount(() => {
		console.log('Data on mount:', data);
	});
</script>

<Title title="blog" />
<div id="blog-content">
	<BlogPage blogData={data.detail} />
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