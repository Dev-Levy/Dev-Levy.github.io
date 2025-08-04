export class MediaFile {
    filename: string;
    id: number;
    upload_date: string;

    constructor(filename: string, id: number, upload_date: string) {
      this.filename = filename;
      this.id = id;
      this.upload_date = upload_date;
    }
};

export class PDF_DTO {
  filename: string;
  data:Blob;

  constructor(filename: string, data: Blob) {
      this.filename = filename;
      this.data = data;
    }
} 
