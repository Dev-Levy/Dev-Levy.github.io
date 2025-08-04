<script lang="ts">
  import { MediaFile, PDF_DTO } from "./lib/Models";
  let pdf: PDF_DTO = $state(new PDF_DTO("name.pdf", new Blob()));
  $inspect(pdf, pdf.filename);
  import Uploads from "./lib/Uploads.svelte";
  import Export from "./lib/Export.svelte";

  function storePdf(createdPdf: PDF_DTO) {
    pdf = createdPdf;
  }
</script>

<h1>Sheet Music Maker</h1>
<h2>Work in progress...</h2>
<main>
  <Uploads {storePdf} />
  <Export {pdf} />
</main>

<style>
  h2 {
    font-size: 3rem;
    font-style: italic;
    margin-bottom: 1em;
  }
  main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 80%;
    height: 600px;
  }

  @media (max-width: 900px) {
    main {
      flex-direction: column;
      width: 100%;
      height: auto;
    }
  }

  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /* border: red 1px solid; */
  }
</style>
