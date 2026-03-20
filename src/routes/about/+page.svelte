<script lang="ts">
	import { onMount } from 'svelte';
	import Page from '$lib/components/Page.svelte';
	import Title from '$lib/components/page/solid/components/Title.svelte';
	import { icons } from '$lib/utils/const';
	import { skillsIconRows, getSkillTransform } from '$lib/utils/skills';
	import Icon from '@iconify/svelte';
	import icon from '$lib/assets/img/myicon.png';

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

<Page height={100}>
	<div class="w:100% h:100% pt:64px flex flex:column justify-content:center ai:center">
		<Title class="mb:100px@md">about</Title>
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
				<div
					bind:this={skillsListEl}
					class="w:100% flex:column ai:center gap:0 flex rel"
					role="list"
					aria-label="skills"
				>
					{#each skillsIconRows as row, rowIndex}
						<div
							class="flex flex:row flex:wrap jc:center ai:center gap:0 skill-row"
							role="listitem"
						>
							{#each row as skill, colIndex}
								<span
									class="w:92px p:20px flex position:relative transform-origin:center transition:transform|0.24s|ease will-change:transform"
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
	</div>
</Page>

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

	.skill-row {
		width: min(100%, 736px);
	}
</style>
