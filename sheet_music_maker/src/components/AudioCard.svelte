<script lang="ts">
    import {Music, Play, Pause, Trash} from "lucide-svelte";
    import {fetchAudioFile, deleteAudioFile, analyzeAudioFile} from "../lib/api";
    import {PdfDTO} from "../lib/models";

    const {
        id,
        name,
        deleteCallBack,
        storePdfCallBack
    }: {
        id: number;
        name: string,
        storePdfCallBack:Function,
        deleteCallBack: Function
    } = $props();

    let audio: HTMLAudioElement | null = null;
    let isPlaying: boolean = $state(false);

    async function analyzeItem() {
        try {
            const res = await analyzeAudioFile(id);
            let pdf:PdfDTO = new PdfDTO(res.filename, res.blob);
            storePdfCallBack(pdf);
        } catch (error) {
            console.error("Fetch error (analyze):", error);
        }
    }

    async function playItem() {
        try {
            let dataBlob = await fetchAudioFile(id);
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
                console.log("Playing recording with id: " + id);
            } else {
                console.warn("No file provided to play.");
            }
        } catch (error) {
            console.error("Fetch error (play):", error);
        }
    }

    async function deleteItem() {
        try {
            await deleteAudioFile(id);
            deleteAudio();
            deleteCallBack(id);
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
    <button onclick={analyzeItem}>
        <Music/>
    </button>
    {#if !isPlaying}
    <button onclick={playItem}>
        <Play/>
    </button>
    {:else}
        <button onclick={() => audio?.pause()}>
            <Pause/>
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