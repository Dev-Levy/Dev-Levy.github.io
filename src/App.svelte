<script lang="ts">
    import UploadsZone from "./lib/UploadsZone.svelte";
    import AnalyzeZone from "./lib/AnalyzeZone.svelte";
    import ExportZone from "./lib/ExportZone.svelte";
</script>

<h1>Sheet Music Maker</h1>
<h2>Work in progress...</h2>
<main>
    <UploadsZone />
    <AnalyzeZone />
    <ExportZone />
</main>

<style>
    h2{
        font-size: 3rem;
        font-style: italic;
        margin-bottom: 1em;
    }
    main {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        width: 80%;
        height: 600px;
    }

    @media(max-width: 900px) {
        main {
            flex-direction: column;
            width: 100%;
            height: auto;
        }
    }

    :global(*) {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        /* border: red 1px solid; */
    }
</style>
