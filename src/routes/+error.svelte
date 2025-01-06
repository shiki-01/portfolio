<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="flex h-full w-full flex-col items-center justify-center">
	<h1 class="text-xl">{page.status} {page.error?.message}</h1>
	<span class="text-xl">
		{#if page.status === 404}
			🤔
		{:else}
			😭
		{/if}
	</span>
</main>
