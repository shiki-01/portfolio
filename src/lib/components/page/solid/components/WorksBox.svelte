<script lang="ts">
    type Props = {
        id: string;
        title: string;
        src: string;
        _description: string;
        tags: string[];
    }
    let { title, src, id, _description, tags }: Props = $props();
</script>

<section class="w:340px h:250.75px flex flex:column ai:center">
    <table>
        <tbody>
            <tr class="h:20px">
                <td class="w:20px"></td>
                <td></td>
                <td class="w:20px"></td>
            </tr>
            <tr class="h:168.75px">
                <td></td>
                <td class="w:300px">
                    <a href={"/works/" + id} class="w:300px h:168.75px flex">
                        <img {src} alt="works src" class="w:100% h:100% obj:cover"/>
                    </a>
                </td>
                <td></td>
            </tr>
            <tr class="h:42px">
                <td></td>
                <td>
                    <div>
                        <h2>{title}</h2>
                        <!-- <div>
                            {#each tags as tag}
                                <a href={"/" + tag}>{tag}</a>
                            {/each}
                        </div> -->
                    </div>
                </td>
                <td></td>
            </tr>
            <tr class="h:20px">
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</section>

<style>
    table {
        border-collapse: collapse;
        border: none;
    }
    td {
        border: none;
        border-left: 1px solid #ffffff;
        border-top: 1px solid #ffffff;
    }
    td:first-child {
        border-left:none;
    }
    tr:first-child td {
        border-top:none;
    }
</style>
