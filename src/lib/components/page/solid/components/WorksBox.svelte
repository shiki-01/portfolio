<script lang="ts">
	type Props = {
		id: string;
		title: string;
		src: string;
		_description: string;
		tags: string[];
	};
	let { title, src, id, _description, tags }: Props = $props();
	let height = 168.75;
</script>

<section class="w:calc(300px+36px*2) flex flex:column ai:center">
	<table>
		<tbody>
			<tr class="h:36px">
				<td class="w:36px"></td>
				<td class="w:300px">
					<div class="width w:300px">
						<p>Width</p>
						<div class="arrow">
							<span></span>
							<span></span>
						</div>
					</div>
				</td>
				<td class="w:36px"></td>
			</tr>
			<tr>
				<td>
					<div class="height w:{height}">
						<p>Height</p>
						<div class="arrow">
							<span></span>
							<span></span>
						</div>
					</div>
				</td>
				<td>
					<a href={'/works/' + id} class="h:{height} flex overflow:hidden">
						<img {src} alt="works src" class="w:100% h:100% obj:cover" />
					</a>
				</td>
				<td></td>
			</tr>
			<tr class="h:20px">
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr class="h:2em">
				<td></td>
				<td class="flex h:2em">
					<div class="bg:#153F63 flex ai:center w:100%">
						<h2 class="f:1em">{title}</h2>
						<!-- <div>
                            {#each tags as tag}
                                <a href={"/" + tag}>{tag}</a>
                            {/each}
                        </div> -->
					</div>
				</td>
				<td></td>
			</tr>
			<tr class="h:36px">
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</tbody>
	</table>
</section>

<style>
	table {
		border-collapse: collapse;
		border: none;
	}
	td {
		position: relative;
		border: none;
		border-left: 1px solid #ffffff50;
		border-top: 1px solid #ffffff50;
	}
	td:first-child {
		border-left: none;
	}
	tr:first-child td {
		border-top: none;
	}

	tr:not(:last-child) td:not(:last-child)::after {
		content: '';
		width: 4px;
		height: 4px;
		background-color: #ffffff50;
		display: flex;
		position: absolute;
		bottom: -2px;
		right: -2px;
		z-index: 1;
	}

	img {
		transform: scale(1);
		transition: transform 400ms ease-out;
	}

	img:hover {
		transform: scale(1.1);
	}

	.width,
	.height {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		color: #ffffff50;
		border-bottom: 1px solid #ffffff50;
	}

	.width {
		top: 50%;
		left: calc(50%);
		transform: translate(-50%, -100%);
	}

	.height {
		top: 50%;
		left: calc(50% - 72px);
		transform: rotate(-90deg) translate(8px, -100%);
	}

	.arrow {
		width: 100%;
		height: 12px;
		position: absolute;
		top: 6px;
		left: 0;
		display: flex;
		justify-content: space-between;
	}

	span {
		position: relative;
		display: inline-block;
		padding: 0 0 0 16px;
		vertical-align: middle;
		text-decoration: none;
	}
	span:first-child {
		rotate: 180deg;
	}
	span::before {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		content: '';
		vertical-align: middle;
	}
	span::before {
		left: 3px;
		width: 4px;
		height: 4px;
		border-top: 1px solid #ffffff50;
		border-right: 1px solid #ffffff50;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>
