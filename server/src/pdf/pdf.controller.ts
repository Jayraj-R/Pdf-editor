import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('list')
  async listPdfNames() {
    const uploadsFolderPath = './uploads'; // Replace with the actual path to the uploads folder

    try {
      const files = await fs.promises.readdir(uploadsFolderPath);
      const pdfFiles = files.filter((file) => path.extname(file) === '.pdf');
      return pdfFiles;
    } catch (error) {
      throw new Error('Error reading PDF files');
    }
  }

  @Get(':name')
  async getPdfByName(@Param('name') name: string, @Res() res: Response) {
    const uploadsFolderPath = './uploads'; // Replace with the actual path to the uploads folder
    const pdfFilePath = path.join(uploadsFolderPath, name);

    try {
      const pdfContent = await fs.promises.readFile(pdfFilePath);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfContent);
    } catch (error) {
      res.status(404).send('PDF not found');
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('pdfFile'))
  uploadPdf(@UploadedFile() pdfFile: Express.Multer.File) {
    return this.pdfService.uploadPdf(pdfFile);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('pdfFile'))
  updatePdf(
    @UploadedFile() pdfFile: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.pdfService.updatePdf(id, pdfFile);
  }
}
