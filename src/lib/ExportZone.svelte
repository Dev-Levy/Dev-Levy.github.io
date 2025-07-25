<script>
  const url = "http://localhost:8080/";

  async function download() {
    console.log("dowloading PDF!");

    try {
      const response = await fetch(url.concat("recording/1"), {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
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
    <button onclick={download}>Download</button>
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
