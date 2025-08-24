<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {analyzeAudioFile, fetchAudioFiles, fetchBackendHealth, uploadAudioFile} from "./lib/api";
    import AnalyzerSettings from "./components/AnalyzerSettings.svelte";
    import UploadZone from "./components/UploadZone.svelte";
    import PdfZone from "./components/PdfZone.svelte";
    import {AudioFile, AudioInfo, PdfDTO} from "./lib/models";

    onMount(() => {
        checkBackend();
        intervalId = setInterval(checkBackend, 5000);
    });
    onDestroy(() => {
        clearInterval(intervalId);
    });

    //region variables

    let recordings: AudioFile[] = $state([]);
    let selectedFiles: FileList|null = $state(null);
    let selectedFile:File | null = $state(null);
    let pdf: PdfDTO | null = $state(null);

    let serverStatus:string = $state("DOWN");
    let intervalId: ReturnType<typeof setInterval>;
    let isSetting:boolean = $state(false);
    let isLoading: boolean = $state(false);

    let fileIdReturned: number = $state(0);
    //endregion

    //region runes

    $effect(() => {
        if (selectedFiles) selectedFile = selectedFiles[0]
    }); //setting selectedFile
    $effect(() => {
        if (serverStatus === "UP") {
            loadAudioFiles()
        } else if (serverStatus === "DOWN") {
            recordings = [];
            selectedFiles = null;
            selectedFile = null;
            isSetting = false;
            isLoading = false;
        }
    }); //server status
    $inspect("pdf",pdf);
    $inspect("selected", selectedFile);

    //endregion

    //region functions

    async function loadAudioFiles(): Promise<void> {
        try {
            console.log("Loading audio files...");
            const audioFiles = await fetchAudioFiles();
            recordings.length = 0;

            for (const file of audioFiles) {
                const fileId = file.id;
                const filename = file.fileName;
                const uploadDate = file.uploadDate;

                recordings.push(new AudioFile(filename, fileId, uploadDate));
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    function setSelectedFiles(files: FileList) {
        selectedFiles = files;
    }
    async function upload(): Promise<void> {
        try {
            if (selectedFile !== null) {
                const responseJson = await uploadAudioFile(selectedFile)
                console.log("Upload successful:", responseJson);

                await loadAudioFiles();
            } else {
                alert("No file selected!");
            }
        } catch (err) {
            console.error("Upload error:", err);
        }
    }
    function deleteFromList(id: number): void {
        recordings = recordings.filter((rec) => rec.id !== id);
        console.log("File deleted with id: " + id);
    }
    function showAnalyzeSettings(id:number): void {
        isLoading = true;
        isSetting = true;
        fileIdReturned = id;
    }
    async function analyzeItem(audioInfo:AudioInfo) {
        try {
            const res = await analyzeAudioFile(audioInfo);
            isLoading = false;
            pdf = new PdfDTO(res.filename, res.blob);

            isSetting = false;
        } catch (error) {
            console.error("Fetch error (analyze):", error);
            isLoading = false;
            isSetting = false;
        }
    }
    function cancellation(): void {
        isLoading = false;
        isSetting = false;
    }

    async function checkBackend() {
        try {
            if (await fetchBackendHealth())
                serverStatus = "UP";
        } catch {
            serverStatus = "DOWN";
        }
    }

    //endregion
</script>

<main>
    <header>
        <h1>Sheet Music Maker</h1>
        <h2>Work in progress...</h2>
        <h3>The server is <span style="color: {serverStatus === 'UP'?'green':'red'}">{serverStatus}</span></h3>
        {#if isSetting}
            <AnalyzerSettings
                    fileId={fileIdReturned}
                    analyzeCallBack={analyzeItem}
                    cancellationCallBack={cancellation}/>
        {/if}
    </header>
    <UploadZone
            {recordings}
            {isLoading}
            setSelectedFilesCallBack={setSelectedFiles}
            deleteCallBack={deleteFromList}
            uploadCallBack={upload}
            analyzeCallBack={showAnalyzeSettings}/>
    <PdfZone status={serverStatus} pdf={pdf}/>
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        justify-content:space-evenly;
        align-items: center;
        height: 90vh;
        width: 100%;
    }

    header {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        border-right: 2px solid var(--color-accent);
        padding: 2rem;
        width: 50%;
        height: 80%;
    }

    h1 {
        font-size: 4rem;
    }

    h2 {
        font-size: 3rem;
        font-style: italic;
    }

    h3{
        font-size: 2rem;
        margin: 1em 0;
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