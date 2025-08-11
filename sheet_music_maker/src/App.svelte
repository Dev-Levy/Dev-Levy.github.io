<script lang="ts">
    import UploadZone from "./components/UploadZone.svelte";
    import PdfZone from "./components/PdfZone.svelte";
    import type {PdfDTO} from "./lib/models";
    let pdf: PdfDTO | null = $state(null);
    $inspect("pdf",pdf);

    function storePdf(pdf_dto:PdfDTO):void {
        pdf = pdf_dto;
    }

</script>

<h1>Sheet Music Maker</h1>
<h2>Work in progress...</h2>
<main>
    <UploadZone storePdfCallBack={storePdf}/>
    <PdfZone pdf={pdf}/>
</main>

<style>
    h2 {
        font-size: 3rem;
        font-style: italic;
        margin-bottom: 1em;
    }
    main {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content:center;
        width: 80%;
        height: 800px;
    }

    @media (max-width: 900px) {
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
    }
</style>