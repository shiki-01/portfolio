<script lang="ts">
	export let id: string;
	export let title: string;
	export let published: string;
	export let updated: string;
	export let eyecatch: string;
	export let category: string;
	export let content: string;

	let publishedDate = new Date(published);
	let updatedDate = new Date(updated);
	published = `${publishedDate.getFullYear()}/${publishedDate.getMonth() + 1}/${publishedDate.getDate()}`;
	updated = `${updatedDate.getFullYear()}/${updatedDate.getMonth() + 1}/${updatedDate.getDate()}`;
	id = `#${id}`;
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
	<div id="title">
		<div class="eyecatch">
			<img src={eyecatch} alt="eyecatch" />
		</div>
		<div class="category">
			<p>{category}</p>
			<div class="date">
				<p>公開日: {published}</p>
				<p>更新日: {updated}</p>
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
		#title {
			width: 100%;
			display: grid;
			align-items: center;
			justify-content: center;
			.eyecatch {
				width: 200px;
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
			width: 100%;
			display: grid;
			justify-content: center;
			div {
				width: 600px;
				margin: 0 auto;
				p {
					font-size: 16px;
					line-height: 1.8;
					margin: 10px 0;
				}
				figure {
                    margin: 0;
					img {
						width: 100%;
						height: auto;
						margin: 10px 0;
					}
				}
			}
		}
	}
</style>
