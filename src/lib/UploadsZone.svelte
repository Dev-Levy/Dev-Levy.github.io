<script lang="ts">
  import { onMount } from "svelte";
  import FileCard from "./FileCard.svelte";

  const url = "http://localhost:8080";
  let recordings: AudioFile[] = $state([]);

  let selectedFile: File | null = $state(null);
  $inspect("selectedFile:", selectedFile);

  class AudioFile {
    filename: string;
    id: number;
    upload_date: string;
    data: number[];

    constructor(data: any) {
      this.filename = data.filename;
      this.id = data.id;
      this.upload_date = data.upload_date;
      this.data = data.data;
    }
  }
  interface FetchResponse {
    files: {
      filename: string;
      id: number;
      upload_date: string;
      data: number[];
    }[];
  }

  onMount(async () => {
    try {
      const response = await fetch(`${url}/recording`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json: FetchResponse = await response.json();
      console.log("Fetched JSON:", json);

      if (Array.isArray(json.files)) {
        recordings = json.files.map((item) => new AudioFile(item));
        console.log("Recordings:", recordings);
      } else {
        console.error("Expected an array in json.files but got:", json.files);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  });

  async function upload() {
    try {
      if (!selectedFile) {
        alert("Please select a file first.");
        return;
      }

      const formData = new FormData();
      formData.append("filename", selectedFile.name);
      formData.append("mime_type", selectedFile.type);
      formData.append("file", selectedFile);

      const response = await fetch(`${url}/recording`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("File uploaded!");
    } catch (error) {
      console.error("Fetch error:", error);
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
