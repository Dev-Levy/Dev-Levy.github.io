<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {fetchBackendHealth} from "./lib/api";
    import UploadZone from "./components/UploadZone.svelte";
    import PdfZone from "./components/PdfZone.svelte";
    import type {PdfDTO} from "./lib/models";
    let pdf: PdfDTO | null = $state(null);
    $inspect("pdf",pdf);

    let serverStatus:string = $state("DOWN");
    let intervalId: ReturnType<typeof setInterval>;

    function storePdf(pdf_dto:PdfDTO):void {
        pdf = pdf_dto;
    }

    async function checkBackend() {
        try {
            if (await fetchBackendHealth())
                serverStatus = "UP";
        } catch {
            serverStatus = "DOWN";
        }
    }

    onMount(() => {
        checkBackend();
        intervalId = setInterval(checkBackend, 5000);
    });

    onDestroy(() => {
        clearInterval(intervalId);
    });
</script>

<h1>Sheet Music Maker</h1>
<h2>Work in progress...</h2>
<h3>The server is
    <span style="color: {serverStatus === 'UP'?'green':'red'}">{serverStatus}</span>
</h3>
<main>
    <UploadZone status={serverStatus} storePdfCallBack={storePdf}/>
    <PdfZone status={serverStatus} pdf={pdf}/>
</main>

<style>
    h2 {
        font-size: 3rem;
        font-style: italic;
    }
    h3{
        margin: 1em 0;
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