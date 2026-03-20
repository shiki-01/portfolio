type SkillItem = {
	icon: string;
	name: string;
	id: string;
	note: string;
};

const skillsIconRows: SkillItem[][] = [
	[
		{ icon: 'simple-icons:gsap', name: 'GSAP', id: 'sk-gsap', note: '動きは気持ちよく。' },
		{
			icon: 'simple-icons:firebase',
			name: 'Firebase',
			id: 'sk-firebase',
			note: 'まず速く作る。'
		},
		{
			icon: 'simple-icons:cloudflare',
			name: 'Cloudflare',
			id: 'sk-cloudflare',
			note: '配信を強くする。'
		},
		{ icon: 'mdi:nodejs', name: 'Node.js', id: 'sk-nodejs', note: 'バックエンドの土台。' },
		{
			icon: 'simple-icons:googleanalytics',
			name: 'Google Analytics',
			id: 'sk-ga',
			note: '数字で改善する。'
		},
		{
			icon: 'simple-icons:electron',
			name: 'Electron',
			id: 'sk-electron',
			note: 'デスクトップ化も対応。'
		},
		{ icon: 'simple-icons:tauri', name: 'Tauri', id: 'sk-tauri', note: '軽量アプリが好き。' },
		{ icon: 'simple-icons:espressif', name: 'Espressif', id: 'sk-espressif', note: 'IoTも触る。' }
	],
	[
		{ icon: 'simple-icons:rust', name: 'Rust', id: 'sk-rust', note: '安全に速く書く。' },
		{ icon: 'simple-icons:kotlin', name: 'Kotlin', id: 'sk-kotlin', note: 'Android開発に活用。' },
		{ icon: 'simple-icons:swift', name: 'Swift', id: 'sk-swift', note: 'iOSも作れる。' },
		{ icon: 'simple-icons:python', name: 'Python', id: 'sk-python', note: '自動化の相棒。' },
		{
			icon: 'simple-icons:typescript',
			name: 'TypeScript',
			id: 'sk-typescript',
			note: '型は正義。'
		},
		{ icon: 'simple-icons:svelte', name: 'Svelte', id: 'sk-svelte', note: 'UIを瞬時に作れる。' },
		{ icon: 'simple-icons:react', name: 'React', id: 'sk-react', note: '大規模UIも対応。' },
		{
			icon: 'simple-icons:googleappsscript',
			name: 'Google Apps Script',
			id: 'sk-gas',
			note: '業務改善を早く。'
		}
	],
	[
		{ icon: 'simple-icons:figma', name: 'Figma', id: 'sk-figma', note: '設計から詰める。' },
		{
			icon: 'simple-icons:blender',
			name: 'Blender',
			id: 'sk-blender',
			note: '3Dで表現の幅を広げる。'
		},
		{ icon: 'devicon-plain:fusion', name: 'Autodesk Fusion', id: 'sk-fusion', note: '3Dモデリングも。' },
		{ icon: 'simple-icons:krita', name: 'Krita', id: 'sk-krita', note: 'イラスト制作に使う。' },
		{
			icon: 'simple-icons:adobeillustrator',
			name: 'Illustrator',
			id: 'sk-illustrator',
			note: 'ベクターを整える。'
		},
		{
			icon: 'simple-icons:adobeaftereffects',
			name: 'After Effects',
			id: 'sk-aftereffects',
			note: 'モーショングラフィックス。'
		},
		{
			icon: 'simple-icons:davinciresolve',
			name: 'DaVinci Resolve',
			id: 'sk-davinci',
			note: '映像編集も対応。'
		},
		{ icon: 'devicon-plain:opencv', name: 'OpenCV', id: 'sk-opencv', note: '画像処理も。' }
	],
	[
		{ icon: 'simple-icons:github', name: 'GitHub', id: 'sk-github', note: '開発のハブ。' },
		{
			icon: 'mdi:microsoft-visual-studio-code',
			name: 'VS Code',
			id: 'sk-vscode',
			note: '主戦力エディタ。'
		},
		{ icon: 'simple-icons:unity', name: 'Unity', id: 'sk-unity', note: 'ゲーム制作も経験。' },
		{
			icon: 'devicon-plain:androidstudio',
			name: 'Android Studio',
			id: 'sk-androidstudio',
			note: 'モバイル実装に使用。'
		},
		{
			icon: 'simple-icons:arduino',
			name: 'Arduino',
			id: 'sk-arduino',
			note: 'ハード連携が楽しい。'
		},
		{ icon: 'mdi:aws', name: 'AWS', id: 'sk-aws', note: 'クラウド基盤もさわる。' },
		{ icon: 'simple-icons:docker', name: 'Docker', id: 'sk-docker', note: '環境差分をなくす。' },
		{ icon: 'simple-icons:linux', name: 'Linux', id: 'sk-linux', note: 'CLI作業が得意。' }
	]
];

const SKILL_PUSH = 12;
const SKILL_HOVER_SCALE = 1.38;
const SKILL_OTHER_SCALE = 0.94;

const getSkillTransform = (
	hoveredSkill: { row: number; col: number } | null,
	row: number,
	col: number,
	rowLength: number,
	compactMode = false
): string => {
	if (!hoveredSkill) {
		return 'translate(0, 0) scale(1)';
	}

	const totalRows = skillsIconRows.length;
	const isHovered = hoveredSkill.row === row && hoveredSkill.col === col;

	if (compactMode) {
		if (isHovered) {
			return `translate(0, 0) scale(${SKILL_HOVER_SCALE})`;
		}
		return 'translate(0, 0) scale(1)';
	}

	if (isHovered) {
		let offsetX = 0;
		let offsetY = 0;

		if (col === 0) {
			offsetX = SKILL_PUSH;
		} else if (col === rowLength - 1) {
			offsetX = -SKILL_PUSH;
		}

		if (row === 0) {
			offsetY = SKILL_PUSH;
		} else if (row === totalRows - 1) {
			offsetY = -SKILL_PUSH;
		}

		return `translate(${offsetX}px, ${offsetY}px) scale(${SKILL_HOVER_SCALE})`;
	}

	const dx = col - hoveredSkill.col;
	const dy = row - hoveredSkill.row;

	let offsetX = dx === 0 ? 0 : Math.sign(dx) * SKILL_PUSH;
	let offsetY = dy === 0 ? 0 : Math.sign(dy) * SKILL_PUSH;

	if (col === 0 && offsetX < 0) {
		offsetX = 0;
	}

	if (col === rowLength - 1 && offsetX > 0) {
		offsetX = 0;
	}

	if (row === 0 && offsetY < 0) {
		offsetY = 0;
	}

	if (row === totalRows - 1 && offsetY > 0) {
		offsetY = 0;
	}

	return `translate(${offsetX}px, ${offsetY}px) scale(${SKILL_OTHER_SCALE})`;
};

export {
    skillsIconRows, getSkillTransform
}