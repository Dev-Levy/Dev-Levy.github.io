<script lang="ts">
  import { onDestroy } from "svelte";
  import { Play, Trash, Music } from "lucide-svelte";
  import { PDF_DTO } from "./Models";
  const {
    storePdfCallBack,
    deleteCallBack,
    id,
    name,
  }: {
    storePdfCallBack: Function;
    deleteCallBack: Function;
    id: number;
    name: string;
  } = $props();

  let audio: HTMLAudioElement | null = null;
  const url: string = "http://localhost:8080";

  async function analyzeItem() {
    try {
      const response = await fetch(`${url}/analyze/${id}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const blob = await response.blob();

      let filename = "createdPDF.pdf"; // Default
      // const disposition = response.headers.get("Content-Disposition");
      // if (disposition && disposition.indexOf("attachment") !== -1) {
      //   const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      //   const matches = filenameRegex.exec(disposition);
      //   if (matches != null && matches[1]) {
      //     filename = matches[1].replace(/['"]/g, "");
      //   }
      // }

      //NOT WORKING

      storePdfCallBack(new PDF_DTO(filename, blob));
      console.log(`Downloaded: ${filename}`);
    } catch (error) {
      console.error("Failed to download PDF:", error);
      alert("Failed to download PDF. Please try again later.");
    }
  }

  async function playItem() {
    try {
      const response = await fetch(`${url}/recording/${id}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
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
    console.log("Playing recording with id: " + id);
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
  <button onclick={analyzeItem}> <Music /> </button>
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
