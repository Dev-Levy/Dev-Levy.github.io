<script lang="ts">
    import {onMount} from "svelte";
    import {AudioFile} from "../lib/models.js";
    import {fetchAudioFiles, uploadAudioFile} from "../lib/api.js";
    import AudioCard from "./AudioCard.svelte";
    const {status, storePdfCallBack}: {status:string,storePdfCallBack : Function} = $props();

    let recordings: AudioFile[] = $state([]);

    let selectedFiles: FileList|null = $state(null);
    let selectedFile:File | null = $state(null);
    let fileInput: HTMLInputElement | null = null;

    $effect(() => {if (selectedFiles) selectedFile = selectedFiles[0]});
    $effect(() => {
       if (status === "UP") {
           loadAudioFiles()
       }
       else if (status === "DOWN") {
           recordings = [];
       }
    });
    $inspect("selected",selectedFile);

    onMount(loadAudioFiles)

    async function loadAudioFiles(): Promise<void> {
        try {
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
    async function upload(): Promise<void> {
        try {
            if (selectedFile !== null) {
                const responseJson = await uploadAudioFile(selectedFile)
                console.log("Upload successful:", responseJson);

                await loadAudioFiles();

                clearFileInput()
            } else {
                alert("No file selected!");
            }
        } catch (err) {
            console.error("Upload error:", err);
        }
    }

    function clearFileInput() {
        if (fileInput) {
            fileInput.value = "";   // Clears the file input UI
        }
        selectedFiles = null;
        selectedFile = null;
    }

    function filterRec(id: number): void {
        recordings = recordings.filter((rec) => rec.id !== id);
        console.log("File deleted with id: " + id);
    }
</script>

<div class="UploadsZone">
    <h2>Uploaded recordings</h2>

    <div id="upload">
        <input type="file" bind:files={selectedFiles} bind:this={fileInput}/>
        <button onclick={upload} disabled={selectedFile === null}>Upload</button>
    </div>

    <div id="list-items">
        {#each recordings as recording}
            <AudioCard
                    id={recording.id}
                    name={recording.filename}
                    deleteCallBack={filterRec}
                    storePdfCallBack={storePdfCallBack}/>
        {/each}
    </div>
</div>

<style>
    .UploadsZone {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 40%;
        margin: 2em;
    }

    h2{
        padding-bottom: 1em;
    }

    #upload {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        max-width: 500px;

        margin-bottom: 0.5em;
        padding: 2em;

        border-radius: 5px;
        border: 2px solid var(--color-accent);

    }

    #list-items {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        scrollbar-width: none;
        max-width: 500px;

        border-radius: 5px;
        border: 2px solid var(--color-accent);
    }
</style>