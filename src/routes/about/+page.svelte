<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Title from '$lib/components/page/solid/components/Title.svelte';
	import { icons } from '$lib/utils/const';
	import { skillsIconRows, getSkillTransform } from '$lib/utils/skills';
	import Icon from '@iconify/svelte';
	import icon from '$lib/assets/img/myicon.png';

	let hoveredSkill: { row: number; col: number } | null = $state(null);
</script>

<Page height={100}>
	<div class="w:100% h:100% pt:68px flex flex:column justify-content:center ai:center">
		<Title>about</Title>
		<Page>
		<div class="w:100% h:100% grid-template-columns:1fr|1fr grid px:100px intro-grid">
			<div class="w:100% h:100% justify-content:center ai:center flex icon-wrap profile-media">
				<span class="circle"></span>
				<span class="circle circle2"></span>
				<img src={icon} alt="My Icon" class="w:240px h:240px object:cover r:full overflow:hidden" />
			</div>
			<div
				class="w:100% h:100% px:20px flex:column gap:80px justify-content:center align-items:start flex intro-content"
			>
				<div class="flex flex:column gap:20px">
					<h1 class="text:4em font:thin line-h:1em uppercase">shiki</h1>
					<div class="text:20px flex:row flex:wrap gap:20px flex social-list">
						{#each icons as { title, icon, link }}
							<a
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								class="mb:10px flex:row ai:center gap:4px b:1px|solid|#fff px:16px py:8px bg:#fff:hover fg:#153F63:hover transition:background-color|0.3s flex rounded"
							>
								<Icon class="text:24px mr:10px" {icon} />
								<div class="flex:row gap:2px ai:center flex">
									<span class="text:18px">
										{title}
									</span>
									<Icon icon="mdi-light:arrow-up" width="30" height="30" class="rotate(45deg)" />
								</div>
							</a>
						{/each}
					</div>
				</div>
				<p class="text:20px bio-text">
					どこにでもいる普通の大学生<br /><br />
					Web 系を中心としたフルスタックエンジニアを目指している<br />
					デザインの分野にも興味があるためやりたいことの収集がつかなくなっている<br /><br />
					API が完全な型をもって実装できることが最近の幸せ
				</p>
			</div>
		</div>
	</Page>
	<Page>
		<div class="w:100% h:100% flex:column ai:center pt:100px gap:80px flex">
			<Title>skills</Title>
			<div class="w:100% flex:column ai:center gap:0 flex" role="list" aria-label="skills">
				{#each skillsIconRows as row, rowIndex}
					<div class="flex flex:row jc:center ai:center gap:0 skill-row" role="listitem">
						{#each row as skill, colIndex}
							<span
								class="w:92px p:20px flex position:relative transform-origin:center transition:transform|0.24s|ease will-change:transform"
								role="button"
								tabindex="0"
								aria-label={`${skill.name} (${skill.id})`}
								onmouseenter={() => (hoveredSkill = { row: rowIndex, col: colIndex })}
								onmouseleave={() => (hoveredSkill = null)}
								onfocus={() => (hoveredSkill = { row: rowIndex, col: colIndex })}
								onblur={() => (hoveredSkill = null)}
								style={`transform: ${getSkillTransform(hoveredSkill, rowIndex, colIndex, row.length)}`}
							>
								<Icon icon={skill.icon} width="100%" height="100%" />
								{#if hoveredSkill?.row === rowIndex && hoveredSkill?.col === colIndex}
									<span
										class="abs left:50% bottom:calc(100%+4px) translateX(-50%) flex flex:column ai:flex-start gap:2px min-w:180px h:100% px:12px py:10px r:12px bg:rgba(10,18,30,0.94) b:1px|solid|rgba(255,255,255,0.24) fg:#fff f:12px line-h:1.35 shadow:0|8px|20px|rgba(0,0,0,0.34) z:5 pointer-events:none"
									>
										<strong class="f:13px font-weight:600">{skill.name}</strong>
										<small class="opacity:.8 f:11px ls:0.04em">{skill.id}</small>
										<span>{skill.note}</span>
									</span>
								{/if}
							</span>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</Page>
	</div>
</Page>
