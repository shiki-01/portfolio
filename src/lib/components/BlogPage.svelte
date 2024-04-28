<script lang="ts">
	import type { EndPoints } from '$lib/types/microcms';
	export let blogData: EndPoints['get']['blogs'];
	let { id, title, ogpImg, tags, publishedAt, updatedAt, content } = blogData;

	let publishedDate = new Date(publishedAt);
	let updatedDate = new Date(updatedAt);
	publishedAt = `${publishedDate.getFullYear()}/${publishedDate.getMonth() + 1}/${publishedDate.getDate()}`;
	updatedAt = `${updatedDate.getFullYear()}/${updatedDate.getMonth() + 1}/${updatedDate.getDate()}`;
	id = `#${id}`;
</script>

<div>
	<div id="title">
		<div class="eyecatch">
			<img src={ogpImg.url} alt="eyecatch" />
		</div>
		<div class="category">
			<p>{tags}</p>
			<div class="date">
				<p>公開日: {publishedAt}</p>
				<p>更新日: {updatedAt}</p>
			</div>
		</div>
		<div class="title">
			<h1>{title}</h1>
		</div>
	</div>
	<div id="content">
		<div>{@html content}</div>
	</div>
</div>

<style lang="scss">
	div {
		font-family: 'M PLUS 1', 'Noto Sans JP', sans-serif;
		width: 100%;
		padding: 0;

		#title {
			padding: 0;
			margin: 0;
			width: 100%;
			display: grid;
			align-items: center;
			justify-content: center;

			.eyecatch {
				width: 200px;
				padding: 0;

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
				p {
					font-size: 12px;
					color: #666;
				}

				.date {
					display: flex;
					justify-content: space-between;
					font-size: 12px;
				}
			}

			.title {
				h1 {
					font-size: 24px;
					margin: 10px 0;
				}
			}
		}

		#content {
			:global(img) {
				width: 100% !important;
				height: auto;
			}
		}

		@media (max-width: 768px) {
			#content {
				:global(img) {
					width: 200px !important;
					height: auto;
				}
			}
		}
	}

	:global(#content) {
		width: 100%;
		display: grid;
		justify-content: center;

		div {
			margin: 0;
			padding: 0;
			width: 100%;

			p {
				font-size: 16px;
				line-height: 1.8;
				margin: 10px 0;
			}

			figure {
				margin: 0;

				img {
					width: 100px;
					height: auto;
					margin: 10px 0;
				}
			}
		}
	}
</style>
