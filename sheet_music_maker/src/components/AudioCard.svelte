<script lang="ts">
    import {Music, Play, Square, Trash} from "lucide-svelte";
    import {fetchAudioFile, deleteAudioFile} from "../lib/api";

    const {
        fileId,
        name,
        isLoading,

        deleteCallBack,
        analyzeCallBack,
    }: {
        fileId: number;
        name: string,
        isLoading: boolean,

        deleteCallBack: Function,
        analyzeCallBack: Function,
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

<div id="card">
    <span id="name">{name}</span>
    <button onclick={()=>analyzeCallBack(fileId)} disabled={isLoading}>
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
</div>

<style>
    #card {
        display: flex;
        align-items: center;
        border-radius: 5px;
        background-color: var(--color-primary);
        padding: 1em;
        margin: 0.5em;
    }

    #name {
        font-weight: bold;
        width: 100%;
    }

    button {
        margin: 0.2em;
    }
</style>