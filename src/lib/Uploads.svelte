<script lang="ts">
  import { onMount } from "svelte";
  import { MediaFile, PDF_DTO } from "./Models";
  import FileCard from "./FileCard.svelte";
  const { storePdf }: { storePdf: Function } = $props();
  const url = "http://localhost:8080";

  let recordings: MediaFile[] = $state([]);

  let selectedFile: File | null = $state(null);
  $inspect("selectedFile:", selectedFile);

  onMount(async () => {
    try {
      const response = await fetch(`${url}/recording`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      const fileList = json.files;

      recordings.length = 0;
      for (const file of fileList) {
        const filename = file.filename;
        const fileId = file.id;
        const uploadDate = file.upload_date;

        recordings.push(new MediaFile(filename, fileId, uploadDate));
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  });

  async function upload() {
    try {
      const response = await fetch("http://localhost:8080/recording", {
        method: "POST",
        headers: {
          "Content-Type": selectedFile!.type,
          "File-Name": selectedFile!.name,
          "Upload-Date": new Date().toISOString(),
        },
        body: selectedFile,
      });

      if (!response.ok) throw new Error(`Upload failed: ${response.status}`);

      console.log("Upload successful:", await response.text());
    } catch (err) {
      console.error("Upload error:", err);
    }
  }

  function deleteRec(id: number) {
    recordings = recordings.filter((rec) => rec.id !== id);
    console.log("File deleted with id: " + id);
  }
</script>

<div class="UploadsZone">
  <div id="list-items">
    {#each recordings as recording}
      <FileCard
        id={recording.id}
        name={recording.filename}
        storePdfCallBack={storePdf}
        deleteCallBack={deleteRec}
      />
    {/each}
  </div>

  <div id="upload">
    <input type="file" bind:value={selectedFile} />
    <button onclick={upload} disabled={selectedFile === null}>Upload </button>
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
  #list-items {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    max-width: 500px;

    border-radius: 5px;
    border: 2px #e0e1dd solid;
  }
  #upload {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2em 0;
  }
</style>
