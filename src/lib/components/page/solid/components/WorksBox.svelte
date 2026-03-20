<script lang="ts">
	type WorkTag = 'system' | 'design' | 'plan';

	type Props = {
		id: string;
		title: string;
		src: string;
		_description: string;
		tags: WorkTag[];
	};
	let { title, src, id, _description, tags }: Props = $props();

	const hasTag = (tag: WorkTag) => tags.includes(tag);
</script>

<section class="works-box flex flex:column ai:center">
	<table class="works-table">
		<tbody>
			<tr class="top-row">
				<td class="side-cell"></td>
				<td class="image-cell">
					<div class="width width-indicator">
						<p>Width</p>
						<div class="arrow">
							<span></span>
							<span></span>
						</div>
					</div>
				</td>
				<td class="side-cell"></td>
			</tr>
			<tr>
				<td class="side-cell vertical-cell">
					<div class="height height-indicator">
						<p>Height</p>
						<div class="arrow">
							<span></span>
							<span></span>
						</div>
					</div>
				</td>
				<td class="image-cell">
					<a href={'/works/' + id} class="preview-link flex overflow:hidden">
						<img {src} alt="works src" class="w:100% h:100% obj:cover" />
					</a>
				</td>
				<td class="side-cell"></td>
			</tr>
			<tr class="spacer-row">
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr class="meta-row">
				<td></td>
				<td>
					<div class="h:100% grid grid-template-cols:1fr|80px grid-template-cols:1fr|60px@<md gap:8px ai:center jc:space-between">
						<a
							href={'/works/' + id}
							class="f:clamp(1em,1vw,1.2em) line-h:1 c:#fff text-decoration:none text-transform:capitalize"
						>
							{title}
						</a>
						<div class="meta-actions w:100% flex ai:center">
							<div class="tag-icons w:100% flex flex:row flex:wrap@<md ai:center jc:end gap:8px" aria-label="work tags">
								{#if hasTag('system')}
									<span class="tag-icon" title="system" aria-label="system">
										<svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M7.49023 1.09766L5.49023 11.0977L4.50977 10.9023L6.50977 0.902344L7.49023 1.09766Z" fill="currentColor" />
											<path d="M11.4004 5.7002C11.5334 5.87784 11.5334 6.12216 11.4004 6.2998L8.40039 10.2998L7.59961 9.7002L10.374 6L7.59961 2.2998L8.40039 1.7002L11.4004 5.7002Z" fill="currentColor" />
											<path d="M0.599609 5.7002C0.466588 5.87784 0.466588 6.12216 0.599609 6.2998L3.59961 10.2998L4.40039 9.7002L1.62598 6L4.40039 2.2998L3.59961 1.7002L0.599609 5.7002Z" fill="currentColor" />
										</svg>
									</span>
								{/if}
								{#if hasTag('design')}
									<span class="tag-icon" title="design" aria-label="design">
										<svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M7.72471 0.581815C7.91866 0.453687 8.1827 0.475539 8.35363 0.646268L11.3536 3.64627C11.5488 3.84152 11.5488 4.15804 11.3536 4.3533L9.42187 6.28396L7.95996 9.69705C7.8972 9.84355 7.76765 9.95124 7.61239 9.98709L1.11239 11.4871C0.944356 11.5258 0.768435 11.4751 0.646484 11.3533C0.524779 11.2314 0.474082 11.0553 0.512695 10.8875L2.0127 4.38748L2.05277 4.27615C2.10511 4.17158 2.193 4.0869 2.30277 4.03982L5.71485 2.57693L7.64648 0.646268L7.72471 0.581815ZM2.92969 4.85916L1.87797 9.41385L4.00005 7.29275L5.35356 8.64627L4.64648 9.3533L4.00005 8.70681L2.587 10.1189L7.1397 9.06912L8.40625 6.11306L5.88577 3.59256L2.92969 4.85916ZM6.70708 2.99978L9.00005 5.29275L10.293 3.99978L8.00005 1.70681L6.70708 2.99978Z" fill="currentColor" />
										</svg>
									</span>
								{/if}
								{#if hasTag('plan')}
									<span class="tag-icon" title="plan" aria-label="plan">
										<svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M10 1.5C10.2761 1.5 10.5 1.72386 10.5 2V10C10.5 10.2761 10.2761 10.5 10 10.5H2C1.72386 10.5 1.5 10.2761 1.5 10V2C1.5 1.72386 1.72386 1.5 2 1.5H10ZM2.5 9.5H9.5V2.5H2.5V9.5Z" fill="currentColor" />
											<path d="M8.90039 4.2998L5.90039 8.2998C5.80761 8.42351 5.66243 8.49758 5.50781 8.5C5.3532 8.50242 5.20595 8.43325 5.10938 8.3125L3.10938 5.8125L3.89062 5.1875L5.48633 7.18262L8.09961 3.7002L8.90039 4.2998Z" fill="currentColor" />
										</svg>
									</span>
								{/if}
							</div>
						</div>
					</div>
				</td>
				<td></td>
			</tr>
			<tr class="bottom-row">
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</tbody>
	</table>
</section>

<style>
	.works-box {
		--box-width: clamp(220px, 62vw, 300px);
		--side: 36px;
		--box-height: calc(var(--box-width) * 0.5625);
		width: calc(var(--box-width) + var(--side) * 2);
	}

	.meta-actions {
		color: #fff;
	}

	.tag-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		opacity: 0.9;
	}

	.works-table {
		border-collapse: collapse;
		border: none;
		width: 100%;
	}

	.side-cell {
		width: var(--side);
	}

	.image-cell {
		width: var(--box-width);
	}

	.top-row {
		height: 36px;
	}

	.spacer-row {
		height: 20px;
	}

	.meta-row {
		height: 2.4em;
	}

	.bottom-row {
		height: 36px;
	}

	.preview-link {
		height: var(--box-height);
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
		font-size: 12px;
		color: #ffffff50;
		border-bottom: 1px solid #ffffff50;
	}

	.width-indicator {
		width: 100%;
	}

	.height-indicator {
		width: var(--box-height);
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
		top: 8px;
		left: 0;
		display: flex;
		justify-content: space-between;
	}

	.arrow span {
		position: relative;
		display: inline-block;
		padding: 0 0 0 16px;
		vertical-align: middle;
		text-decoration: none;
	}
	.arrow span:first-child {
		rotate: 180deg;
	}
	.arrow span::before {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		content: '';
		vertical-align: middle;
	}
	.arrow span::before {
		left: 4px;
		width: 4px;
		height: 4px;
		border-top: 1px solid #ffffff50;
		border-right: 1px solid #ffffff50;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	@media (max-width: 480px) {
		.works-box {
			--box-width: min(260px, calc(100vw - 88px));
			--side: 24px;
		}

		.top-row,
		.bottom-row {
			height: 28px;
		}
	}
</style>
