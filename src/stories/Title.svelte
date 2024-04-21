<script lang="ts">
    export let title: string = '';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=M+PLUS+1:wght@100..900&family=Noto+Sans+JP:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div>
    <h1>{title}</h1>
</div>

<style lang="scss">
    div {
        margin-left: 1em;
        display: flex;
        justify-content: start;
        align-items: center;
        h1 {
            font-size: 4em;
            font-family: 'M PLUS 1', 'Noto Sans JP', sans-serif;
            font-weight: 400;
            color: #333;
            letter-spacing: 0.4em;
            position: relative;;
            background:linear-gradient(transparent 30%, #ffec88 30%);
            text-transform: uppercase;

            &::after {
                content: '';
                position: absolute;
                top: 5pt;
                left: -10pt;
                width: 100%;
                height: 80%;
                border: #333 solid .1em;
            }
        }
    }

    @media (max-width: 768px) {
        div {
            h1 {
                margin-left: 2em;
                font-size: 2em;

                &::after {
                top: 5pt;
                left: -5pt;
                width: 100%;
                height: 80%;
            }
            }
        }
    }
</style>