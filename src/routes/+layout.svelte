<script lang="ts">
	import logo from '$lib/image/logo.png';
	import myicon from '$lib/image/myicon.png';
	import Header from '../stories/Header.svelte';
	import Icon from '@iconify/svelte';

	import { page } from '$app/stores';
	let title: 'Home' | 'About' | 'Works' | 'Blogs';
	$: {
		switch ($page.route.id) {
			case '/':
				title = 'Home';
				break;
			case '/pages/about':
				title = 'About';
				break;
			case '/pages/works':
				title = 'Works';
				break;
			case '/pages/blogs':
				title = 'Blogs';
				break;
			default:
				title = 'Home';
		}
	}

	import { onMount } from 'svelte';

	onMount(() => {
		const cursor = document.getElementById('cursor');

		if (cursor) {
			document.addEventListener('mousemove', (e) => {
				cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
			});

			const links = document.querySelectorAll('a');
			links.forEach((link) => {
				link.classList.add('custom-class');

				link.addEventListener('mouseover', () => {
					cursor.classList.add('cursor--hover');
				});
				link.addEventListener('mouseout', () => {
					cursor.classList.remove('cursor--hover');
				});
			});
		}
	});
</script>

<div id="cursor" class="cursor"></div>
<main>
	<div class="header">
		<div id="logo">
			<a href="/"><img src={logo} alt="Shiki" /></a>
		</div>
		<div id="profile">
			<div>
				<img src={myicon} alt="icon" />
			</div>
			<ul>
				<li>
					<p>shiki</p>
				</li>
				<li>
					<a href="https://twitter.com/shiki__01">
						<Icon icon="fa6-brands:square-x-twitter" />
						<p>@shiki__01</p>
					</a>
				</li>
				<li>
					<a href="https://github.com/shiki-01">
						<Icon icon="ph:github-logo-fill" style="cursor:pointer" />
						<p>@shiki-01</p>
					</a>
				</li>
			</ul>
		</div>
	</div>
	<div>
		<slot></slot>
	</div>
	<div class="header">
		<Header {title} />
	</div>
</main>

<style lang="scss">
	main {
		width: 100vw;
		height: 100vh;
		display: grid;
		grid-template-columns: 1fr 600px 1fr;
		grid-template-rows: 1fr;

		&::after {
            content: '';
            background-image: url(../lib/image/noiz.png);
            background-size: cover;
            background-position: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.1;
            mix-blend-mode: soft-light;
            z-index: 99;
            pointer-events: none
		}

		.header {
			align-items: center;
			display: flex;
			justify-content: center;
			flex-direction: column;

			#logo {
				width: 100%;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;

				a {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
				}

				img {
					width: calc(100%);
					min-width: 100px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			#profile {
				display: grid;
				grid-template-columns: 80px 1fr;

				div {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					img {
						width: 80px;
						height: 80px;
						border-radius: 50%;
						border: #333 solid 2px;
					}

					p {
						font-size: 1.5em;
						color: #333;
					}
				}

				ul {
					display: flex;
					justify-content: center;
					align-items: start;
					flex-direction: column;
					margin-left: 2em;

					li {
						display: flex;
						justify-content: center;
						margin: 0;

						p {
							margin: 0.2em;
							cursor: default;
						}

						a {
							display: flex;
							align-items: center;
							text-decoration: none;
							color: #333;
							font-size: 1em;
							margin: 0.2em;

							p {
								margin-left: 0.5em;
                                cursor: pointer;
							}
						}
					}
				}
			}
		}

		:not(.header) {
			margin: 1em;
		}
	}
</style>
