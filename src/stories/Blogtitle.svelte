<script lang="ts">
    export let id: string;
	export let title: string;
	export let published: string;
	export let updated: string;
	export let eyecatch: string;
	export let category: string;

    let publishedDate = new Date(published);
    let updatedDate = new Date(updated);
    published = `${publishedDate.getFullYear()}/${publishedDate.getMonth()+1}/${publishedDate.getDate()}`;
    updated = `${updatedDate.getFullYear()}/${updatedDate.getMonth()+1}/${updatedDate.getDate()}`;
    id = `${id}`;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=M+PLUS+1:wght@100..900&family=Noto+Sans+JP:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div>
	<div class="eyecatch">
		<a href="/pages/blog/{id}"><img src={eyecatch} alt="eyecatch" /></a>
	</div>
	<div class="category">
		<a href={id}><p>{category}</p></a>
        <div class="date">
			<p>公開日: {published}</p>
		</div>
	</div>
	<div class="title">
		<a href={id}><h1>{title}</h1></a>
	</div>
</div>

<style lang="scss">
    div {
        font-family: 'M PLUS 1', 'Noto Sans JP', sans-serif;
        width: 100%;
        display: grid;
        align-items: center;
        justify-content: center;

        .eyecatch {
            width: 200px;

            a {
                display: inline-block;
            }

            img {
                width: 200px;
                height: 120px;
                object-fit: cover;
                border-radius: 10px;
                cursor: pointer;
                transition: .3s;

                &:hover {
                    opacity: .8;
                }
            }
        }

        .category {
            width: 200px;
            display: grid;
            grid-template-columns: 1.5fr 2fr;
            margin-top: .2em;

            a {
                text-decoration: none;
            }

            p {
                font-size: .8em;
                color: #ffffff;
                background-color: #4ecaf0;
                padding: 5px;
                border-radius: 2pt;
                cursor: pointer;
                width: fit-content;
                margin: 0;
                display: flex;
                align-items: center;
            }

            .date {
                display: grid;

                p {
                    background-color: #4ecaf000;
                    font-size: .7em;
                    font-weight: 500;
                    color: #666;
                    margin: 0;
                    display: flex;
                    justify-self: end;
                    align-items: center;
                    cursor: default;
                }
            }
        }
        .title {
            width: 200px;

            a {
                text-decoration: none;
                color: #333;
            }

            h1 {
                font-size: 1.2em;
                font-weight: 500;
                margin: .5em 0;
                width: 200px;
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>