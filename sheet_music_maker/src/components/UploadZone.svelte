<script lang="ts">
    import {AudioFile} from "../lib/models.js";
    import AudioCard from "./AudioCard.svelte";

    let selectedFiles: FileList | null = $state(null);

    let {
        recordings,
        isLoading,
        loadedFileId,
        serverStatus,

        setSelectedFilesCallBack,
        deleteCallBack,
        uploadCallBack,
        analyzeCallBack,
        downloadXMLCallBack
    }: {
        recordings: AudioFile[],
        isLoading: boolean,
        loadedFileId: number,
        serverStatus: string,

        setSelectedFilesCallBack: Function,
        deleteCallBack: Function,
        uploadCallBack: Function,
        analyzeCallBack: Function,
        downloadXMLCallBack: Function,
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
        <label class="upload_button" for="upload_input">Select file</label>
        <input
                id="upload_input"
                type="file"
                accept=".wav,.mp3,.ogg"
                bind:files={selectedFiles}
                bind:this={fileInput}
                style="display: none"/>

        {#if selectedFiles && selectedFiles.length > 0}
            <span class="file_name">{selectedFiles[0].name}</span>
        {:else}
            <span class="file_name">No file selected</span>
        {/if}

        <button onclick={upload} disabled={selectedFiles === null || serverStatus === 'DOWN'}>Upload</button>
    </div>

    <div id="list-items">
        {#each recordings as recording}
            <AudioCard
                    fileId={recording.id}
                    name={recording.filename}
                    {isLoading}
                    {loadedFileId}
                    {deleteCallBack}
                    {analyzeCallBack}
                    {downloadXMLCallBack}/>
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

    .upload_button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
    }

    .upload_button:hover {
        border-color: #646cff;
    }

    .file_name {
        margin: 0 1em;
        font-weight: bold;
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