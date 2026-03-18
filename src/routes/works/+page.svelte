<script lang="ts">
	import WorksBox from '$lib/components/page/solid/components/WorksBox.svelte';
	import works from '$lib/assets/mocks/works.json';
</script>

<div
	class="w:100% h:100% mt:80px pb:200px flex flex:column gap:100px justify-content:center ai:center"
>
	<h1 class="text:4em font:thin line-h:1em uppercase">Works</h1>
	<div>
		<div class="flex flex:wrap w:100% h:100% px:100px gap:40px ai:center jc:center">
			{#each works.contents as work}
				<WorksBox
					id={work.id}
					title={work.title}
					_description={work.description}
					src={work.image.url}
					tags={work.tags}
				/>
			{/each}
		</div>
	</div>
</div>
