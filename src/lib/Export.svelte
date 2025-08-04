<script lang="ts">
  import { PDF_DTO } from "./Models";
  const { pdf }: { pdf: PDF_DTO | null } = $props();

  function download() {
    if (pdf) {
      const url = window.URL.createObjectURL(pdf.data);

      const a = document.createElement("a");
      a.href = url;
      a.download = pdf.filename;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);

      console.log("downloading PDF!");
    } else {
      alert("No PDF to download!");
    }
  }
</script>

<div class="ExportZone">
  <div id="preview">
    <dir id="PDF_container">
      <div id="PDF">PDF preview</div>
    </dir>
  </div>
  <div id="download">
    <button onclick={download} disabled={pdf === null}>Download</button>
  </div>
</div>

<style>
  .ExportZone {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    width: 40%;
    margin: 2em;
  }

  #preview {
    height: 100%;
    width: 100%;
    max-width: 500px;
  }
  #PDF_container {
    padding: 1em;
    background-color: #415a77;
    border: 2px #e0e1dd solid;
    border-radius: 5px;
    height: 100%;
  }
  #PDF {
    padding: 2em;
    border: 2px #e0e1dd dashed;
    border-radius: 5px;
    background-color: #1b263b;
    height: 100%;
  }

  #download {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2em 0;
  }
</style>
