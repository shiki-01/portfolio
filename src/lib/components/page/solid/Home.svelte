<script lang="ts">
    import Header from "./components/Header.svelte";
	let { children } = $props();
</script>

<div class="back rel w:100% h:100% flex flex:column justify-content:center align-items:center overflow:hidden">
    <Header />
    <span class="circle circle1"></span>
    <span class="circle circle2"></span>
    <span class="circle circle3"></span>
    <span class="line"></span>
	<div class="w:100% h:100% mt:80px flex flex:column justify-content:center align-items:start overflow-y:auto">
        {@render children()}
    </div>
</div>

<style>
	.back {
		background-image:
			linear-gradient(0deg, transparent calc(100% - 1px), rgba(80, 108, 122, 40%) calc(100% - 1px)),
			linear-gradient(90deg, transparent calc(100% - 1px), rgba(80, 108, 122, 40%) calc(100% - 1px));
		background-size: 32px 32px;
		background-repeat: repeat;
		background-position: center center;
	}

    .circle {
        position: absolute;
        border: 1px solid #fff;
        border-radius: 50%;
    }

    .circle, .line {
        pointer-events: none;
    }

    .circle1 {
        top: calc(50% - 250px);
        left: calc(-200px);
        width: 500px;
        height: 500px;
    }

    .circle2 {
        top: calc(50% - 864px);
        left: calc(300px);
        width: 1728px;
        height: 1728px;
    }

    .circle3 {
        top: calc(50% - 700px);
        left: calc(300px);
        width: 1400px;
        height: 1400px;
    }

    .line {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 1px;
        transform: translate(-50%, -50%);
        background-color: #fff;
    }

    .line::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 8px;
        transform: translate(-50%, -50%);
        background-image: linear-gradient(90deg, transparent calc(100% - 1px), #fff calc(100% - 1px));
        background-size: 32px 32px;
		background-repeat: repeat;
		background-position: center center;
    }
</style>
