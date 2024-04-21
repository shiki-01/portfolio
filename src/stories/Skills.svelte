<script lang="ts">
    import Icon from "@iconify/svelte";
    export let title: string;
    export let icons: { name: string, url: string }[] = [];
</script>

<p>{title}</p>
<div class="icon-grid">
    {#each icons as icon (icon)}
        <span>
            <span><Icon icon={icon.url} /></span>
            <p>{icon.name}</p>
        </span>
    {/each}
</div>

<style lang="scss">
    p {
        font-size: 4em;
        font-weight: 100;
        text-align: center;
        margin-bottom: .5em;
    }
    .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 1em;
        justify-content: center;
        align-items: center;

        span {
            span {
                font-size: 3em;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            p {
                font-size: 1em;
                font-weight: 400;
                text-align: center;
            }
        }
    }
</style>