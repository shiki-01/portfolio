<script lang="ts">
	import Title from '../../../stories/Title.svelte';
	import myicon from '$lib/image/myicon.png';
	import Icon from '@iconify/svelte';
	import Skills from '../../../stories/Skills.svelte';

	const birthDate = new Date(2007, 9, 1);

	const currentDate = new Date();

	let age = currentDate.getFullYear() - birthDate.getFullYear();
	const m = currentDate.getMonth() - birthDate.getMonth();

	if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
		age--;
	}

	const design = [
		{ name: 'figma', url: 'logos:figma' },
		{ name: 'adobe after effect', url: 'logos:adobe-after-effects' },
		{ name: 'adobe illustrator', url: 'logos:adobe-illustrator' },
		{ name: 'adobe photoshop', url: 'logos:adobe-photoshop' },
        { name: 'adobe premiere pro', url: 'logos:adobe-premiere' },
        { name: 'blender', url: 'logos:blender' },
        { name: 'inkscape', url: 'devicon:inkscape' },
        { name: 'gimp', url: 'devicon:gimp' }
	];

	const program = [
		{ name: 'HTML', url: 'vscode-icons:file-type-html' },
		{ name: 'CSS', url: 'vscode-icons:file-type-css' },
		{ name: 'SASS', url: 'vscode-icons:file-type-sass' },
		{ name: 'JS', url: 'vscode-icons:file-type-js' },
		{ name: 'TS', url: 'vscode-icons:file-type-typescript' },
		{ name: 'Svelte', url: 'vscode-icons:file-type-svelte' },
		{ name: 'React', url: 'vscode-icons:file-type-reactjs' },
		{ name: 'Vue', url: 'vscode-icons:file-type-vue' },
		{ name: 'storybook', url: 'vscode-icons:file-type-storybook' },
		{ name: 'electron', url: 'devicon:electron' },
		{ name: 'MySQL', url: 'logos:mysql-icon' },
		{ name: 'Python', url: 'logos:python' },
		{ name: 'Firebase', url: 'devicon:firebase' },
		{ name: 'GitHub', url: 'ph:github-logo-fill' }
	];

    const etc = [
        { name: 'unity', url: 'devicon:unity' },
        { name: 'unreal engin', url: 'logos:unrealengine-icon'}
    ]
</script>

<Title title="about" />

<div>
	<div id="profile">
		<img src={myicon} alt="profile" />
		<div>
			<p>name: shiki</p>
			<p>age: {age}</p>
			<p>job: student</p>
		</div>
        <p>
            どこにでもいる普通の高校生。<br />
            色々浅く広く手を出したせいでなんでもできるみたいに見えるけどそんなことはない。<br />
        </p>
	</div>
	<div id="skils">
		<div id="design">
			<Skills title="design" icons={design} />
		</div>
		<div id="program">
			<Skills title="program" icons={program} />
		</div>
        <div id="etc">
            <Skills title="etc" icons={etc} />
        </div>
	</div>
    <div>
        <p>※ちなみに盛った</p>
    </div>
    <div id=""></div>
</div>

<style lang="scss">
	div {
		#profile {
			margin: 4em 0;
			display: grid;
			grid-template-columns: 200px 1fr;
			gap: 2em;

			img {
				width: 200px;
				height: 200px;
				border-radius: 10pt;
			}

			div {
                width: 100%;
                height: 100%;
				display: flex;
				flex-direction: column;
				align-items: stretch;
                justify-content: space-between;

				p {
					font-size: 2em;
				}
			}

            p {
                grid-column: 1 / 3;
            }
		}

        #design, #program, #etc {
            margin: 4em 0;
        }
	}

    @media (max-width: 768px) {
        div {
            #profile {
                grid-template-columns: 100px 1fr;
                margin: 4em 1em;

                img {
                    grid-column: 1 / 2;
                    width: 100px;
                    height: 100px;
                }

                div {
                    p {
                        font-size: 1em;
                    }
                }

                p {
                    font-size: .8em;
                }
            }

            #design, #program, #etc {
                margin: 2em 1em;
            }
        }
    }

    @media (max-width: 1200px) {
        div {
            #profile {
                p {
                    font-size: 1em;
                }
            }
        }
    }
</style>
