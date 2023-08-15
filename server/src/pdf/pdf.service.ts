import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class PdfService {
  private pdfs: any[] = [];

  getAllPdfs() {
    return this.pdfs;
  }

  uploadPdf(pdfFile: Express.Multer.File) {
    // Do something with the uploaded PDF file
    const filePath = `./uploads/${pdfFile.originalname}`;
    fs.writeFileSync(filePath, pdfFile.buffer);

    return { message: 'PDF uploaded successfully' };
  }

  updatePdf(id: string, pdfFile: Express.Multer.File) {
    const existingPdf = this.pdfs.find((pdf) => pdf.id === id);
    if (!existingPdf) {
      return { message: 'PDF not found!' };
    }

    // Do something with the uploaded PDF file
    const filePath = `./uploads/${pdfFile.originalname}`;
    fs.writeFileSync(filePath, pdfFile.buffer);

    existingPdf.path = filePath; // Update the PDF path or any other properties

    return { message: `PDF with ID ${id} updated` };
  }
}
