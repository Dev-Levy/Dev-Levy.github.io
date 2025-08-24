<script lang="ts">
    import {AudioFile} from "../lib/models.js";
    import AudioCard from "./AudioCard.svelte";

    let selectedFiles: FileList | null = $state(null);

    let {
        recordings,
        isLoading,

        setSelectedFilesCallBack,
        deleteCallBack,
        uploadCallBack,
        analyzeCallBack,
    }: {
        recordings: AudioFile[],
        isLoading: boolean,

        setSelectedFilesCallBack: Function,
        deleteCallBack: Function,
        uploadCallBack: Function,
        analyzeCallBack: Function,
    } = $props();

    let fileInput: HTMLInputElement | null = null;

    $effect(() => {
        if (selectedFiles) {
            setSelectedFilesCallBack(selectedFiles);
        }
    })

    function upload() {
        uploadCallBack();
        selectedFiles = null;
        if (fileInput)
            fileInput.value = "";   // Clears the file input UI
    }

</script>

<div class="UploadsZone">
    <h2>Uploaded recordings</h2>

    <div id="upload">
        <input type="file" bind:files={selectedFiles} bind:this={fileInput}/>
        <button onclick={upload} disabled={selectedFiles === null}>Upload</button>
    </div>

    <div id="list-items">
        {#each recordings as recording}
            <AudioCard
                    fileId={recording.id}
                    name={recording.filename}
                    {deleteCallBack}
                    {analyzeCallBack}
                    {isLoading}/>
        {/each}
    </div>
</div>

<style>
    .UploadsZone {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 80%;
        margin: 2em;
    }

    h2 {
        padding-bottom: 1em;
    }

    #upload {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        /*max-width: 500px;*/

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
        /*max-width: 500px;*/

        border-radius: 5px;
        border: 2px solid var(--color-accent);
    }
</style>