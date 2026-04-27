type GetsType<T> = {
	contents: T[];
	totalCount: number;
	offset: number;
	limit: number;
};

type DateType = {
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
};

type Image = {
	url: string;
	width: number;
	height: number;
};

type Structure<T, P> = T extends 'get'
	? { id: string } & DateType & P
	: T extends 'gets'
		? GetsType<{ id: string } & DateType & P>
		: Partial<DateType> & (T extends 'patch' ? Partial<P> : P);

export type Blogs<T = 'get'> = Structure<
	T,
	{
		/**
		 * タイトル
		 */
		title: string;
		/**
		 * 説明
		 */
		description?: string;
		/**
		 * 本文
		 */
		content?: string;
		/**
		 * 期間
		 */
		term?: string;
		/**
		 * 担当
		 */
		role?: string;
		/**
		 * 人数
		 */
		member?: number;
		/**
		 * リンク
		 */
		link?: string;
		/**
		 * GitHub
		 */
		'gh-repo'?: string;
		/**
		 * タグ
		 */
		tags: ('system' | 'design' | 'plan')[];
		/**
		 * スキル
		 */
		skills: (
			| 'Illustrator'
			| 'AfterEffects'
			| 'Blender'
			| 'Figma'
			| 'TypeScript'
			| 'Svelte'
			| 'React'
			| 'Electron'
			| 'Tauri'
		)[];
		/**
		 * 表示画像
		 */
		image?: Image;
		/**
		 * スナップショット
		 */
		snapshots?: Image[];
	}
>;

export type EndPoints = {
	get: {
		works: Blogs<'get'>;
	};
	gets: {
		works: Blogs<'gets'>;
	};
	post: {
		works: Blogs<'post'>;
	};
	put: {
		works: Blogs<'put'>;
	};
	patch: {
		works: Blogs<'patch'>;
	};
};

export type Tag = {
	title: Blogs['tags'][number];
	icon: string;
};

export type Tags = {
	[key: string]: Tag;
};

// export const tags: Tags = {
// 	info: { title: 'お知らせ', icon: 'mdi:bell' },
// 	blogs: { title: 'ブログ', icon: 'mdi:book' }
// };
