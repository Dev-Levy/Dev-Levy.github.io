<script lang="ts">
    import { onDestroy } from "svelte";
    import { Play, Trash } from "lucide-svelte";
    const {
        deleteCallBack,
        id,
        name,
    }: { deleteCallBack: Function; id: number; name: string } = $props();

    let audio: HTMLAudioElement | null = null;
    const url: string = "http://localhost:8080";

    async function playItem() {
        console.log("Playing recording with id: " + id);

        try {
            const response = await fetch(`${url}/recording/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let dataBlob = await response.blob();

            if (dataBlob) {
                const blobUrl = URL.createObjectURL(dataBlob);

                if (audio) {
                    audio.pause();
                    URL.revokeObjectURL(audio.src);
                }

                audio = new Audio(blobUrl);
                audio.play().catch((e) => console.error("Playback error:", e));
            } else {
                console.warn("No file provided to play.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    async function deleteItem() {
        try {
            const response = await fetch(`${url}/recording/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            deleteCallBack(id);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    onDestroy(() => {
        if (audio) {
            audio.pause();
            URL.revokeObjectURL(audio.src);
            audio = null;
        }
    });
</script>

<div id="card">
    <span id="name">{name}</span>
    <button onclick={playItem}> <Play /> </button>
    <button onclick={deleteItem}> <Trash /> </button>
</div>

<style>
    #card {
        display: flex;
        align-items: center;
        border-radius: 5px;
        background-color: #415a77;
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
