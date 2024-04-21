<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	export let primary: boolean = false;

	$: mode = primary ? 'storybook-toggle--primary' : 'storybook-toggle--secondary';

    const dispatch = createEventDispatcher();

	const togglePrimary = () => {
		primary = !primary;
        dispatch('change', primary);
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			togglePrimary();
		}
	};
</script>

<input type="checkbox" bind:checked={primary} />
<button class="storybook-toggle {mode}" on:click={togglePrimary} on:keydown={handleKeydown}>
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
</button>


<style lang="scss">
    input {
        display: none;
    }
    .storybook-toggle {
        position: relative;
        border: none;
        background: transparent;
    }

    .storybook-toggle div {
        width: 30px;
        height: 3px;
        background-color: #333;
        margin: 6px 0;
        transition: 0.4s;
    }

    .storybook-toggle--primary .bar1 {
        -webkit-transform: rotate(-45deg) translate(-6.5px, 6.5px);
        transform: rotate(-45deg) translate(-6.5px, 6.5px);
    }

    .storybook-toggle--primary .bar2 {
        opacity: 0;
    }

    .storybook-toggle--primary .bar3 {
        -webkit-transform: rotate(45deg) translate(-6.5px, -6.5px);
        transform: rotate(45deg) translate(-6.5px, -6.5px);
    }
</style>
