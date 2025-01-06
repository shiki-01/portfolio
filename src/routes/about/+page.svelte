<script lang="ts">
	import Icon from '@iconify/svelte';
	import icon from '$lib/img/myicon.png';

	const birthday = new Date(2007, 10, 1);

	function getAge() {
		const today = new Date();
		const thisYear = today.getFullYear();
		const birthYear = birthday.getFullYear();
		let age = thisYear - birthYear;

		const birthMonth = birthday.getMonth();
		const birthDay = birthday.getDate();
		const currentMonth = today.getMonth();
		const currentDay = today.getDate();

		if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
			age--;
		}

		return age;
	}

    type Skill = {
        title: string;
        contents: {
            title: string;
            icon: string;
        }[];
    };

	const skills: Skill[] = [
		{
			title: 'design',
			contents: [
				{
					title: 'Figma',
					icon: 'figma'
				},
				{
					title: 'illustrator',
					icon: 'adobe-illustrator'
				},
				{
					title: 'Photoshop',
					icon: 'adobe-photoshop'
				},
				{
					title: 'After Effects',
					icon: 'adobe-after-effects'
				},
				{
					title: 'Premiere Pro',
					icon: 'adobe-premiere'
				},
				{
					title: 'Blender',
					icon: 'blender'
				}
			]
		},
        {
            title: 'system',
            contents: [
                {
                    title: 'HTML',
                    icon: 'html-5'
                },
                {
                    title: 'CSS',
                    icon: 'css-3'
                },
                {
                    title: 'JavaScript',
                    icon: 'javascript'
                },
                {
                    title: 'TypeScript',
                    icon: 'typescript-icon'
                },
                {
                    title: 'Node.js',
                    icon: 'nodejs-icon'
                },
                {
                    title: 'Vite',
                    icon: 'vitejs'
                },
                {
                    title: 'Svelte',
                    icon: 'svelte-icon'
                },
                {
                    title: 'React',
                    icon: 'react'
                },
                {
                    title: 'electron',
                    icon: 'electron'
                },
                {
                    title: 'Tailwind CSS',
                    icon: 'tailwindcss-icon'
                },
                {
                    title: 'firebase',
                    icon: 'firebase'
                },
                {
                    title: 'cloudflare',
                    icon: 'cloudflare-icon'
                },
                {
                    title: 'Vercel',
                    icon: 'vercel-icon'
                },
                {
                    title: 'AWS',
                    icon: 'aws'
                },
                {
                    title: 'VSCode',
                    icon: 'visual-studio-code'
                },
                {
                    title: 'JetBrains',
                    icon: 'jetbrains'
                },
                {
                    title: 'Docker',
                    icon: 'docker-icon'
                },
                {
                    title: 'GitHub',
                    icon: 'github-icon'
                },
                {
                    title: 'Git',
                    icon: 'git-icon'
                },
                {
                    title: 'Arch Linux',
                    icon: 'archlinux'
                }
            ]
        },
        {
            title: 'etc',
            contents: [
                {
                    title: 'Unity',
                    icon: 'unity'
                },
                {
                    title: 'Unreal Engine',
                    icon: 'unrealengine-icon'
                }
            ]
        }
	];
</script>

<main class="flex h-full w-full flex-col gap-8">
	<div class="flex w-full flex-row gap-8">
		<img src={icon} alt="icon" class="aspect-square w-[150px] rounded-lg" />
		<div class="flex w-full flex-col justify-between py-5">
			<p class="text-xl">name : shiki</p>
			<p class="text-xl">age : {getAge()}</p>
			<p class="text-xl">job : student</p>
		</div>
	</div>
	<div class="flex">
		<p>
			どこにでもいる普通の高校生。
			<br />
			色々浅く広く手を出したせいでなんでもできるみたいに見えるけどそんなことはない。
		</p>
	</div>
	<div class="flex flex-col gap-8">
		<p class="text-2xl">skils</p>
		<div class="flex flex-col gap-8">
			{#each skills as skill}
				<div class="flex flex-col gap-4">
					<p class="text-xl">{skill.title}</p>
					<div class="flex flex-wrap gap-4">
						{#each skill.contents as content}
							<div class="flex flex-col items-center gap-2 w-[80px]">
								<Icon icon={ "logos:" + content.icon} class="h-12 w-12" />
								<p class="w-full text-center">{content.title}</p>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
