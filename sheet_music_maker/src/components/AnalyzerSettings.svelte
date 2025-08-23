<script lang="ts">
    import {AudioInfo} from "../lib/models";

    let {
        fileId,
        analyzeCallBack,
        cancellationCallBack,
    }: {
        fileId: number;
        analyzeCallBack: Function;
        cancellationCallBack: Function;
    } = $props();

    let title: string = $state("Piano scales");
    let composer: string = $state("Oláh Levente");

    let bpm: number = $state(120);
    let beats: number = $state(4);
    let beatType: number = $state(4);
    let audioInfo: AudioInfo = $derived(new AudioInfo(fileId, title, composer, bpm, beats, beatType));
</script>

<div class="settings_container">
    <div class="bpm_time_signature">
        <label for="bpm">BPM</label>
        <input id="bpm" type="number" bind:value={bpm}/>
        <label for="beats">Time signature</label>
        <input id="beats" type="number" bind:value={beats}>
        <input id="beatType" type="number" bind:value={beatType}>
    </div>
    <div class="title_composer">
        <div>
            <label for="title">Title</label>
            <input id="title" type="text" bind:value={title}/>
        </div>
        <div>
            <label for="composer">Composer</label>
            <input id="composer" type="text" bind:value={composer}/>
        </div>
    </div>
</div>
<div class="settings_option">
    <button onclick={()=>analyzeCallBack(audioInfo)}>Analyze</button>
    <button onclick={()=>cancellationCallBack()}>Cancel</button>
</div>

<style>
    .settings_container {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
    }

    .title_composer {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 48%;
    }

    .bpm_time_signature {
        display: flex;
        flex-direction: column;
        width: 48%;
    }

    .settings_option {
        margin: 1em 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }

    input {
        width: 100%;
        padding: 1em;
        margin-bottom: 1em;
        border-radius: 5px;
    }

    button {
        cursor: pointer;
        padding: 1em 2em;
        width: 48%;
    }
</style>