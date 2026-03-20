<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | Not Found</title>
	<meta name="robots" content="noindex, nofollow, noarchive" />
</svelte:head>

<main class="flex h:full w:full flex:column ai:center jc:center">
	<h1 class="f:xl">{page.status} {page.error?.message}</h1>
	<span class="f:xl">
		{#if page.status === 404}
			🤔
		{:else}
			😭
		{/if}
	</span>
</main>
