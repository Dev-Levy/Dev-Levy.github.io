<script lang="ts">
    import {Music, Play, Square, Trash, ArrowDownToLine} from "lucide-svelte";
    import {fetchAudioFile, deleteAudioFile} from "../lib/api";

    const {
        fileId,
        name,
        isLoading,
        loadedFileId,

        deleteCallBack,
        analyzeCallBack,
        downloadXMLCallBack,
    }: {
        fileId: number;
        name: string,
        isLoading: boolean,
        loadedFileId: number,

        deleteCallBack: Function,
        analyzeCallBack: Function,
        downloadXMLCallBack: Function,
    } = $props();

    let audio: HTMLAudioElement | null = null;
    let isPlaying: boolean = $state(false);

    async function playItem() {
        try {
            let dataBlob = await fetchAudioFile(fileId);
            if (dataBlob) {
                const blobUrl = URL.createObjectURL(dataBlob);
                if (audio) {
                    audio.pause();
                    URL.revokeObjectURL(audio.src);
                }
                audio = new Audio(blobUrl);

                audio.addEventListener("play", () => isPlaying = true);
                audio.addEventListener("pause", () => isPlaying = false);
                audio.addEventListener("ended", () => isPlaying = false);

                audio.play().catch((e) => console.error("Playback error:", e));
                console.log("Playing recording with id: " + fileId);
            } else {
                console.warn("No file provided to play.");
            }
        } catch (error) {
            console.error("Fetch error (play):", error);
        }
    }

    async function deleteItem() {
        try {
            await deleteAudioFile(fileId);
            deleteAudio();
            deleteCallBack(fileId);
        } catch (error) {
            console.error("Fetch error (delete):", error);
        }
    }

    function deleteAudio() {
        if (audio) {
            audio.pause();
            URL.revokeObjectURL(audio.src);
            audio = null;
        }
    }
</script>

<div id="card" style=" box-shadow: 3px 3px 5px {loadedFileId === fileId ? 'var(--color-accent)' : 'none'}">
    <span id="name">{name}</span>
    <div id="buttons">
        <button onclick={()=>analyzeCallBack(fileId)} disabled={isLoading || loadedFileId === fileId}>
            <Music/>
        </button>
        {#if !isPlaying}
            <button onclick={playItem}>
                <Play/>
            </button>
        {:else}
            <button onclick={() => audio?.pause()}>
                <Square/>
            </button>
        {/if}
        <button onclick={deleteItem}>
            <Trash/>
        </button>
        <button onclick={()=>downloadXMLCallBack(fileId)} disabled={loadedFileId !== fileId}>
            <span>XML</span>
            <ArrowDownToLine/>
        </button>
    </div>
</div>

<style>
    #card {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        background-color: var(--color-primary);
        padding: 1em;
        margin: 0.5em;
    }

    #name {
        font-weight: bold;
        width: 100%;
        margin-bottom: 1em;
    }

    #buttons {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    button {
        margin: 0.2em;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            margin-right: 0.5em;
        }
    }
</style>