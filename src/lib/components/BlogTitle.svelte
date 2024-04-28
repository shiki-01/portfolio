<script lang="ts">
	import type { EndPoints } from '$lib/types/microcms';
	export let blogData: EndPoints['get']['blogs'];
	let { id, title, ogpImg, tags, publishedAt } = blogData;

	let publishedDate = new Date(publishedAt);
	publishedAt = `${publishedDate.getFullYear()}/${publishedDate.getMonth() + 1}/${publishedDate.getDate()}`;
</script>

<div>
	<div class="eyecatch">
		<a href="/blogs/blog/{id}">
			{#if ogpImg}
				<img src={ogpImg.url} alt={title} height={ogpImg.height} width={ogpImg.width} />
			{:else}
				<img src="https://placehold.jp/1200x630.png" alt="thumbnail" />
			{/if}
		</a>
	</div>
	<div class="category">
		{#if Array.isArray(tags)}
			{#each tags as tag}
				<p>{tag}</p>
			{/each}
		{:else}
			<p>{tags}</p>
		{/if}
		<div class="date">
			<p>公開日: {publishedAt}</p>
		</div>
	</div>
	<div class="title">
		<a href="/blogs/blog/{id}"><h1>{title}</h1></a>
	</div>
</div>

<style lang="scss">
	div {
		width: 100%;
		display: grid;
		align-items: center;
		justify-content: center;

		.eyecatch {
			width: 200px;

			a {
				display: inline-block;
			}

			img {
				width: 200px;
				height: 120px;
				object-fit: cover;
				border-radius: 10px;
				cursor: pointer;
				transition: 0.3s;

				&:hover {
					opacity: 0.8;
				}
			}
		}

		.category {
			width: 200px;
			display: grid;
			grid-template-columns: 1.5fr 2fr;
			margin-top: 0.2em;

			a {
				text-decoration: none;
			}

			p {
				font-size: 0.8em;
				color: #ffffff;
				background-color: #4ecaf0;
				padding: 5px;
				border-radius: 2pt;
				cursor: pointer;
				width: fit-content;
				margin: 0;
				display: flex;
				align-items: center;
			}

			.date {
				display: grid;

				p {
					background-color: #4ecaf000;
					font-size: 0.7em;
					font-weight: 500;
					color: #666;
					margin: 0;
					display: flex;
					justify-self: end;
					align-items: center;
					cursor: default;
				}
			}
		}
		.title {
			width: 200px;

			a {
				text-decoration: none;
				color: #333;
			}

			h1 {
				font-size: 1.2em;
				font-weight: 500;
				margin: 0.5em 0;
				width: 200px;
				cursor: pointer;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>
