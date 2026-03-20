<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		class?: string;
	};

	let { children, class: className }: Props = $props();
</script>

<div class="w:100% h:100% flex ai:start jc:center {className}">
	<h1 class="text:4em font:thin line-h:1em uppercase section-title">{@render children()}</h1>
</div>
