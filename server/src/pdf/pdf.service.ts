import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { Pdf } from '../entities/pdf.entity';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(Pdf)
    private pdfRepository: Repository<Pdf>,
  ) {}

  async getAllPdfNames(): Promise<{ id: number; name: string }[]> {
    const pdfs = await this.pdfRepository
      .createQueryBuilder('pdf')
      .select('pdf.id', 'id')
      .addSelect('pdf.name', 'name')
      .getRawMany();

    return pdfs;
  }

  async getPdfByName(id: number): Promise<any> {
    const existingPdf = await this.pdfRepository.findOne({ where: { id } });
    if (!existingPdf) {
      throw Error(`No existing pdf found for the given request`);
    }

    return existingPdf.fileData;
  }

  async uploadPdf(): Promise<any> {
    const uploadsFolderPath = './uploads';
    const pdfFilePath = path.join(uploadsFolderPath, 'example.pdf');
    const pdfContent = await fs.promises.readFile(pdfFilePath);

    const pdf = new Pdf();
    pdf.name = `example${Math.floor(Math.random() * 100)}.pdf`;
    pdf.fileData = pdfContent;

    await this.pdfRepository.save(pdf);
  }

  async updatePdf(id: number, fileData: Buffer): Promise<any> {
    const existingPdf = await this.pdfRepository.findOne({ where: { id } });

    if (!existingPdf) {
      throw Error('PDF not found!');
    }

    existingPdf.name = 'jayraj'; // Adding this line just for demo
    existingPdf.fileData = fileData;
    await this.pdfRepository.save(existingPdf);
  }

  async saveFile(name: string, fileData: Buffer) {
    const data = new Pdf();
    data.name = name;
    data.fileData = fileData;

    await this.pdfRepository.save(data);
  }
}
