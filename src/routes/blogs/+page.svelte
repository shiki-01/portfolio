<script lang="ts">
	import Page from '$lib/components/Page.svelte';
</script>

<Page>
	<div class="w:100% h:100% flex flex:column justify-content:center ai:center page-shell">
		<h1 class="text:4em font:thin line-h:1em uppercase page-title">Blogs</h1>
		<p class="text:2em font:thin page-subtitle">Now Loading...</p>
	</div>
</Page>

<style>
	.page-shell {
		padding: 0 16px;
		text-align: center;
	}

	.page-title {
		font-size: clamp(2rem, 8vw, 4em);
	}

	.page-subtitle {
		font-size: clamp(1.1rem, 4.8vw, 2em);
	}
</style>
