<script lang="ts">
    import {PdfDTO} from "../lib/models";
    const {pdf}: {pdf : PdfDTO | null} = $props();
    let pdfUrl: string | null = $state(null);

    $effect(() => {
        if (pdf && pdf.blob){
            pdfUrl = URL.createObjectURL(pdf.blob)
        }
    })
</script>

<div class="PdfZone">
    <h2>Created PDF</h2>
    <div class="pdf-container">
        {#if pdfUrl}
            <iframe
                    title="PDF Preview"
                    src={pdfUrl}
                    class="pdf-frame">
            </iframe>
        {:else}
            <div class="pdf-placeholder">
                <span>📄 No PDF available</span>
            </div>
        {/if}
    </div>
</div>

<style>
    .PdfZone {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 40%;
        margin: 2em
    }

    .PdfZone h2 {
        margin-bottom: 1em;
    }

    .pdf-container {
        padding: 1em;
        height: 100%;
        aspect-ratio: 8.27 / 11.7; /* A4 paper ratio */
        background: var(--color-primary);
        border: 2px solid var(--color-accent);
        border-radius: 5px;
    }

    .pdf-frame {
        width: 100%;
        height: 100%;
        border: none;
    }

    .pdf-placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 1.2rem;
        color: var(--color-accent);
        font-weight: bold;
        background: repeating-linear-gradient(
                45deg,
                var(--color-light-green),
                var(--color-light-green) 10px,
                var(--color-pastel-green) 10px,
                var(--color-pastel-green) 20px
        );
    }
</style>