<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import icon from '$lib/assets/img/myicon.png';
	import WorksBox from '$lib/components/page/solid/components/WorksBox.svelte';
	import WorksWindow from '$lib/components/page/solid/components/WorksWindow.svelte';
	import Title from '$lib/components/page/solid/components/Title.svelte';
	import type { PageData } from './$types';
	import { skillsIconRows, getSkillTransform } from '$lib/utils/skills';
	import { icons } from '$lib/utils/const';

	let { data }: { data: PageData } = $props();
	let hoveredSkill: { row: number; col: number } | null = $state(null);
	let tooltipPos: { left: number; top: number; placeBelow: boolean } | null = $state(null);
	let skillsListEl: HTMLDivElement | null = null;
	let isSkillsCompact = $state(false);

	const getHoveredSkillItem = () => {
		if (!hoveredSkill) return null;
		return skillsIconRows[hoveredSkill.row]?.[hoveredSkill.col] ?? null;
	};

	const SKILL_ROW_MAX_WIDTH = 736;
	const TOOLTIP_MAX_WIDTH = 220;
	const TOOLTIP_MARGIN = 12;
	const TOOLTIP_GAP = 8;
	const TOOLTIP_ESTIMATED_HEIGHT = 84;

	const updateSkillsCompactMode = () => {
		if (!skillsListEl) return;
		isSkillsCompact = skillsListEl.clientWidth < SKILL_ROW_MAX_WIDTH;
	};

	const setHoveredSkill = (event: MouseEvent | FocusEvent, row: number, col: number) => {
		hoveredSkill = { row, col };

		if (typeof window === 'undefined') return;
		if (!skillsListEl) return;
		const target = event.currentTarget as HTMLElement | null;
		if (!target) return;

		const rect = target.getBoundingClientRect();
		const containerRect = skillsListEl.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2 - containerRect.left;
		const halfWidth = TOOLTIP_MAX_WIDTH / 2;
		const maxLeft = Math.max(
			TOOLTIP_MARGIN + halfWidth,
			skillsListEl.clientWidth - TOOLTIP_MARGIN - halfWidth
		);
		const left = Math.min(Math.max(centerX, TOOLTIP_MARGIN + halfWidth), maxLeft);
		const placeBelow = rect.top - TOOLTIP_ESTIMATED_HEIGHT - TOOLTIP_MARGIN < 0;

		tooltipPos = {
			left,
			top: placeBelow
				? rect.bottom - containerRect.top + TOOLTIP_GAP
				: rect.top - containerRect.top - TOOLTIP_GAP,
			placeBelow
		};
	};

	const clearHoveredSkill = () => {
		hoveredSkill = null;
		tooltipPos = null;
	};

	onMount(() => {
		if (!skillsListEl) return;
		updateSkillsCompactMode();

		const observer = new ResizeObserver(() => {
			updateSkillsCompactMode();
			if (isSkillsCompact) clearHoveredSkill();
		});
		observer.observe(skillsListEl);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div class="w:100%">
	<Page height={100}>
		<p class="text:3em line-h:1.4em font:thin font-size:clamp(2rem,6vw,3em)">
			好きに、<br />自由に。
		</p>
	</Page>
	<Page>
		<div
			class="w:100% h:100% grid grid-template-columns:1fr|1fr grid-template-columns:1fr@<md grid-template-rows:120px|1fr@<md gap:60px@<md pt:100px@<md px:100px px:40px@<md"
		>
			<div class="w:100% h:100% justify-content:center ai:center flex rel profile-media">
				<span class="circle w:255px w:135px@<md square"></span>
				<span class="circle w:280px w:165px@<md square"></span>
				<img
					src={icon}
					alt="My Icon"
					class="w:240px w:120px@<md square object:cover r:full overflow:hidden"
				/>
			</div>
			<div
				class="w:100% h:100% px:20px px:12px@<md flex:column gap:80px justify-content:center align-items:start flex intro-content"
			>
				<div class="flex flex:column gap:20px">
					<h1 class="text:4em text:3em@<md font:thin line-h:1em uppercase">shiki</h1>
					<div class="flex:row flex:wrap gap:20px gap-y:12px@<md flex">
						{#each icons as { title, icon, link }}
							<a
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								class="mb:10px flex:row ai:center gap:4px gap:2px@<md b:1px|solid|#fff px:16px py:8px pl:10px@<md pr:8px@<md py:4px@<md bg:#fff:hover fg:#153F63:hover transition:background-color|0.3s flex rounded"
							>
								<Icon class="text:24px text:20px@<md mr:10px" {icon} />
								<div class="flex:row gap:2px ai:center flex">
									<span class="text:18px text:12px@<md">
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
			<Title class="f:.8em">skills</Title>
			<div
				bind:this={skillsListEl}
				class="w:100% flex:column ai:center gap:0 flex rel"
				role="list"
				aria-label="skills"
			>
				{#each skillsIconRows as row, rowIndex}
					<div class="flex flex:row flex:wrap jc:center ai:center gap:0 skill-row" role="listitem">
						{#each row as skill, colIndex}
							<span
								class="w:92px w:82px@<md p:20px flex position:relative transform-origin:center transition:transform|0.24s|ease will-change:transform"
								role="button"
								tabindex="0"
								aria-label={`${skill.name} (${skill.id})`}
								onmouseenter={(event) => setHoveredSkill(event, rowIndex, colIndex)}
								onmouseleave={clearHoveredSkill}
								onfocus={(event) => setHoveredSkill(event, rowIndex, colIndex)}
								onblur={clearHoveredSkill}
								style={`transform: ${getSkillTransform(hoveredSkill, rowIndex, colIndex, row.length, isSkillsCompact)}`}
							>
								<Icon icon={skill.icon} width="100%" height="100%" />
							</span>
						{/each}
					</div>
				{/each}
				{#if getHoveredSkillItem() && tooltipPos}
					<span
						class="abs flex flex:column ai:flex-start gap:2px min-w:180px px:12px py:10px r:12px bg:rgba(10,18,30,0.94) b:1px|solid|rgba(255,255,255,0.24) fg:#fff f:12px line-h:1.35 shadow:0|8px|20px|rgba(0,0,0,0.34) z:1000 pointer-events:none"
						style={`left:${tooltipPos.left}px; top:${tooltipPos.top}px; transform:translate(-50%, ${tooltipPos.placeBelow ? '0%' : '-100%'}); max-width:min(${TOOLTIP_MAX_WIDTH}px, calc(100% - ${TOOLTIP_MARGIN * 2}px));`}
					>
						<strong class="f:13px font-weight:600">{getHoveredSkillItem()?.name}</strong>
						<small class="opacity:.8 f:11px ls:0.04em">{getHoveredSkillItem()?.id}</small>
						<span>{getHoveredSkillItem()?.note}</span>
					</span>
				{/if}
			</div>
		</div>
	</Page>
	<Page>
		<div class="w:100% h:100% flex ai:center jc:center flex:column py:100px gap:60px">
			<Title>works</Title>
			<div class="flex w:100% px:160px px:24px@<sm px:60px@<md">
				<WorksWindow title={'/GET/ENTRIES/WORKS'}>
					{#each data.worksList.contents.slice(0, 3) as work}
						<WorksBox
							id={work.id}
							title={work.title}
							_description={work.description || ''}
							src={work.image?.url || ''}
							tags={work.tags}
						/>
					{/each}
					<div class="flex flex:column w:100% ai:center py:20px">
						<a class="f:2em font-weight:100 uppercase" href="/works">more</a>
					</div>
				</WorksWindow>
			</div>
		</div>
	</Page>
	<!-- <Page>
		<Title>blogs</Title>
	</Page> -->
</div>

<style>
	.circle {
		position: absolute;
		border: 1px solid #fff;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	@media (max-width: 1024px) {
		.intro-content {
			gap: 40px;
			padding: 0;
		}
	}

	.skill-row {
		width: min(100%, 736px);
	}
</style>
