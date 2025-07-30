<script lang="ts">
	let { children, height = 80 } = $props();
</script>

<div class="w:100dvw h:calc(100dvh-{height}px) pb:{height}px justify-content:center align-items:center flex">
    {@render children?.()}
</div>
