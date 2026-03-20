<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, title }: { children: Snippet; title: string } = $props();
</script>

<div class="rel w:100% h:100%">
	<div
		class="abs z:0 w:100% h:100% top:10px right:-10px bottom:-10px left:10px bg:#153f63 b:1px|solid|#fff r:15px @min-900:top:14px @min-900:right:-14px @min-900:bottom:-14px @min-900:left:14px"
		aria-hidden="true"
	></div>
	<div class="rel bg:#153f63 w:100% h:100% flex flex:column r:10px z:1 b:1px|solid|#fff">
		<p
			class="h:40px px:12px flex ai:center f:clamp(12px,3.8vw,16px) font:JetBrainsMono ls:0.04em uppercase bb:1px|solid|#fff"
		>
			{title}
		</p>
		<div class="flex flex:wrap jc:center gap:20px px:24px py:30px @min-900:px:20px">
			{@render children?.()}
		</div>
	</div>
</div>
