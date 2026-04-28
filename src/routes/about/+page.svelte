<script lang="ts">
	import { onMount } from 'svelte';
	import Page from '$lib/components/Page.svelte';
	import Title from '$lib/components/page/solid/components/Title.svelte';
	import { icons } from '$lib/utils/const';
	import { skillsIconRows, getSkillTransform } from '$lib/utils/skills';
	import Icon from '@iconify/svelte';
	import icon from '$lib/assets/img/myicon.png';

	type ProfileEntry = {
		year: string;
		title: string;
		description: string;
		link?: string;
	};

	const profileEntries: ProfileEntry[] = [
		{
			year: '2023.04',
			title: '名電高校 入学',
			description: '情報科学科。'
		},
		{
			year: '2023.04',
			title: '情報システム部入部',
			description: 'コンテスト参加や自主制作を行い、三年次には部長として活動。',
			link: 'https://misc-mdn.dev/'
		},
		{
			year: '2025.11',
			title: '3D プリンター活用推進会 システム部 所属',
			description:
				'ホームページ兼予約サイトの制作を機に所属。各イベントにて、ゲーム制作や印刷データのモデリングの支援を行う。',
			link: 'https://mdn-3dprinter.f5.si/'
		},
		{
			year: '2025.08',
			title: 'PALETTE 所属',
			description: 'エンジニアとして、公式サイトの制作や外部依頼を中心に活動している。',
			link: 'https://palette-sync.com/'
		},
		{
			year: '2026.04',
			title: '愛知工業大学 入学',
			description: '情報科学部 メディア情報専攻。'
		},
		{
			year: 'Now',
			title: '大学生として色々なことに挑戦中...',
			description: 'システムに留まらず、デザインや企画など幅広い分野に挑戦。'
		}
	];

	let hoveredSkill: { row: number; col: number } | null = $state(null);
	let tooltipPos: { left: number; top: number; placeBelow: boolean } | null = $state(null);
	let skillsListEl: HTMLDivElement | null = null;
	let profileSectionEl: HTMLElement | null = null;
	let profileObserver: IntersectionObserver | null = null;
	let isProfileVisible = $state(false);
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

	const revealProfile = () => {
		isProfileVisible = true;
		profileObserver?.disconnect();
		profileObserver = null;
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			const prefersReducedMotion =
				window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
			if (prefersReducedMotion) {
				isProfileVisible = true;
			} else if (profileSectionEl && 'IntersectionObserver' in window) {
				profileObserver = new IntersectionObserver(
					(entries) => {
						if (entries.some((entry) => entry.isIntersecting)) {
							revealProfile();
						}
					},
					{
						threshold: 0.3,
						rootMargin: '0px 0px -12% 0px'
					}
				);
				profileObserver.observe(profileSectionEl);
			} else {
				isProfileVisible = true;
			}
		}

		let observer: ResizeObserver | null = null;
		if (skillsListEl) {
			updateSkillsCompactMode();

			observer = new ResizeObserver(() => {
				updateSkillsCompactMode();
				if (isSkillsCompact) clearHoveredSkill();
			});
			observer.observe(skillsListEl);
		}

		return () => {
			profileObserver?.disconnect();
			observer?.disconnect();
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
						<h1 class="text:3em font:thin line-h:1em uppercase">shiki</h1>
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
			<section
				bind:this={profileSectionEl}
				class={`w:100% h:100% flex flex:column ai:center pt:100px gap:56px profile-section ${
					isProfileVisible ? 'is-visible' : ''
				}`}
			>
				<Title class="f:.8em">profile</Title>
				<div class="profile-timeline w:100%">
					{#each profileEntries as entry, index}
						<article class="timeline-item" style={`--delay:${index * 120}ms`}>
							<div class="timeline-rail" aria-hidden="true">
								<span class="timeline-dot"></span>
								{#if index < profileEntries.length - 1}
									<span class="timeline-line"></span>
								{/if}
							</div>
							<div class="timeline-card">
								<p class="timeline-year">{entry.year}</p>
								<h3 class="timeline-title">{entry.title}</h3>
								<p class="timeline-description">{entry.description}</p>
								{#if entry.link}
									<a target="_blank" class="w:full flex jc:start text-decoration:underline mt:14px f:.8em" href={entry.link}>{entry.link}</a>
								{/if}
							</div>
						</article>
					{/each}
				</div>
			</section>
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
						<div
							class="flex flex:row flex:wrap jc:center ai:center gap:0 skill-row"
							role="listitem"
						>
							{#each row as skill, colIndex}
								<span
									class="w:92px p:20px w:82px@<md flex position:relative transform-origin:center transition:transform|0.24s|ease will-change:transform"
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

	.profile-section {
		padding-inline: clamp(20px, 6vw, 100px);
	}

	.profile-timeline {
		display: flex;
		flex-direction: column;
		gap: 24px;
		max-width: 880px;
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 36px minmax(0, 1fr);
		column-gap: 18px;
		align-items: start;
		opacity: 0;
		transform: translate3d(0, 24px, 0);
		filter: blur(8px);
		transition:
			opacity 0.6s ease,
			transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			filter 0.6s ease;
		transition-delay: var(--delay);
		will-change: opacity, transform, filter;
	}

	.profile-section.is-visible .timeline-item {
		opacity: 1;
		transform: translate3d(0, 0, 0);
		filter: blur(0);
	}

	.timeline-rail {
		position: relative;
		display: flex;
		justify-content: center;
		min-height: 100%;
	}

	.timeline-dot {
		width: 14px;
		height: 14px;
		margin-top: 18px;
		border-radius: 999px;
		border: 2px solid rgba(255, 255, 255, 0.95);
		background: #153f63;
		z-index: 1;
	}

	.timeline-line {
		position: absolute;
		top: 32px;
		bottom: -12px;
		left: 50%;
		width: 2px;
		background: #fff;
		transform: translateX(-50%);
	}

	.timeline-card {
		padding: 24px 26px;
		border: 1px solid rgba(255, 255, 255, 1);
		background-color: #153f63;
		border-radius: 12px;
	}

	.timeline-year {
		margin-bottom: 8px;
		font-size: 0.8rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.72;
	}

	.timeline-title {
		margin: 0;
		font-size: clamp(1.15rem, 1.8vw, 1.45rem);
		font-weight: 600;
		line-height: 1.4;
	}

	.timeline-description {
		margin-top: 4px;
		font-size: 1rem;
		line-height: 1.85;
		opacity: 0.92;
	}

	@media (max-width: 767px) {
		.timeline-item {
			grid-template-columns: 24px minmax(0, 1fr);
			column-gap: 12px;
		}

		.timeline-card {
			padding: 20px 18px;
			border-radius: 20px;
		}

		.timeline-dot {
			margin-top: 16px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.timeline-item {
			opacity: 1;
			transform: none;
			filter: none;
			transition: none;
		}
	}
</style>
