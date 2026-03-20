<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Title from '$lib/components/page/solid/components/Title.svelte';
</script>

<Page height={100}>
	<div class="w:100% h:100% flex flex:column justify-content:center ai:center page-shell">
		<Title>about</Title>
		<p class="text:2em font:thin page-subtitle">Now Loading...</p>
	</div>
</Page>

<style>
	.page-shell {
		padding: 0 16px;
		text-align: center;
	}

	.page-subtitle {
		font-size: clamp(1.1rem, 4.8vw, 2em);
	}
</style>
