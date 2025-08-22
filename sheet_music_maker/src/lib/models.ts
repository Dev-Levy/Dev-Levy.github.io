export class AudioFile {
    constructor(
        public filename: string,
        public id: number,
        public upload_date: string
    ) {}
}

export class AudioInfo {
    constructor(
        public id: number,
        public bpm: number,
        public beats: number,
        public beatType: number,
    ) {}
}

export class PdfDTO {
    constructor(
        public filename: string,
        public blob: Blob,
    ) {}
}