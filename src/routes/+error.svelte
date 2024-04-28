<script>
	import { page } from '$app/stores';
</script>

<h1>{$page.status} {$page.error?.message}</h1>
<span style="font-size: 10em">
    {#if $page.status === 404}
        🤔
    {:else}
        😭
    {/if}
</span>