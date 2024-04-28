<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import Blogtitle from '$lib/components/BlogTitle.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data);
</script>

<Title title="blogs" />

<div>
		<Blogtitle blogData={data.blogList.contents[0]}/>
</div>

<style lang="scss">
	div {
		width: calc(100vw - 600px - 40pt);
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