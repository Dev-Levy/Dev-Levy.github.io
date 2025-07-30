<script lang="ts">
  import { Play, Trash } from "lucide-svelte";
  const {
    deleteCallBack,
    id,
    name,
  }: { deleteCallBack: Function; id: number; name: string } = $props();

  const url: string = "http://localhost:8080";

  function playItem() {
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
