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

    let BPM: number = $state(120);
    let beats: number = $state(4);
    let beatType: number = $state(4);
    let audioInfo: AudioInfo = $derived(new AudioInfo(fileId, BPM, beats, beatType));
</script>

<div class="settings_container">
    <label for="bpm">BPM</label>
    <input id="bpm" type="number" bind:value={BPM}/>
    <!--    <label for="beats">Time signature</label>-->
    <!--    <input id="beats" type="number" bind:value={beats}>-->
    <!--    <input id="beatType" type="number" bind:value={beatType}>-->
    <div class="settings_option">
        <button id="bpm" onclick={()=>analyzeCallBack(audioInfo)}>Analyze</button>
        <button id="bpm" onclick={()=>cancellationCallBack()}>Cancel</button>
    </div>
</div>

<style>
    .settings_container {
        display: flex;
        width: 60%;
        flex-direction: column;
    }

    .settings_option {
        margin: 1rem 0;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    input {
        padding: 1em;
        border-radius: 5px;
    }

    button {
        cursor: pointer;
        padding: 1em 2em;
    }
</style>