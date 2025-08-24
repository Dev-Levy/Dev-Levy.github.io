import type {AudioInfo} from "./models";

const API_BASE: string = 'http://localhost:8080';
const FILE_CONTROLLER: string = 'MediaFile';

export async function fetchBackendHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
}

export async function fetchAudioFiles() {
    const res = await fetch(`${API_BASE}/${FILE_CONTROLLER}/audio`);

    if (!res.ok) {
        throw new Error('Failed to fetch audio files');
    }

    return await res.json();
}

export async function fetchAudioFile(id: number) {
    const res = await fetch(`${API_BASE}/${FILE_CONTROLLER}/audio/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch audio files');
    }

    return await res.blob();
}

export async function uploadAudioFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/${FILE_CONTROLLER}/audio`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) throw new Error('Failed to upload file');
    return await res.text();
}

export async function deleteAudioFile(id: number) {
    const res = await fetch(`${API_BASE}/${FILE_CONTROLLER}/audio/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) throw new Error('Failed to delete file');
}

export async function analyzeAudioFile(audioInfo: AudioInfo) {
    const res = await fetch(`${API_BASE}/${FILE_CONTROLLER}/analyze`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"  // ✅ tell backend it's JSON
        },
        body: JSON.stringify(audioInfo)
    });

    if (!res.ok) throw new Error('Failed to analyze file');
    const blob: Blob = await res.blob();
    const filename: string = extractFileNameFromContentDisposition(res);

    return {blob, filename};
}

function extractFileNameFromContentDisposition(res: Response) {

    const contentDisposition = res.headers.get('Content-Disposition') || res.headers.get('content-disposition');
    const parts = contentDisposition?.split(';').map(part => part.trim());
    const filenamePart = parts?.find(part => part.toLowerCase().startsWith('filename='));
    let filename = filenamePart?.substring(filenamePart.indexOf('=') + 1).trim();
    if (filename?.startsWith('"') && filename.endsWith('"')) {
        filename = filename.slice(1, -1);
    }
    if (filename === undefined) {
        filename = "NO_FILENAME";
    }
    return filename;
}
