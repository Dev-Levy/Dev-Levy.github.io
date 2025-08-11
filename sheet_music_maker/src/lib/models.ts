export class AudioFile {
    constructor(
        public filename: string,
        public id: number,
        public upload_date: string
    ) {}
}

export class PdfDTO {
    constructor(
        public filename: string,
        public blob: Blob,
    ) {}
}