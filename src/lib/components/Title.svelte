<script lang="ts">

</script>

<div class="title w-full h-fit text-4xl font-bold {$$props.class}" {...$$props}>
	<slot />
</div>

<style lang="postcss">
    .title {
        color: #ffffff;
        -webkit-text-stroke-width: 3px;
        -webkit-text-stroke-color: var(--color-text);
        paint-order: stroke fill;
        filter: drop-shadow(1px 1px 0 var(--color-accent)) drop-shadow(2px 2px 0 var(--color-accent)) drop-shadow(3px 3px 0 var(--color-accent)) drop-shadow(4px 4px 0 var(--color-accent));
    }
</style>