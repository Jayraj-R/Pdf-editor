import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
  async listPdfNames(@Res() res: Response) {
    try {
      const pdfNames = await this.pdfService.getAllPdfNames();
      res.send(pdfNames);
    } catch (error) {
      res.status(500).send({
        error: 'Something went wrong while getting PDF names',
        message: error.message,
      });
    }
  }

  @Get(':name')
  async getPdfByName(@Param('name') name: string, @Res() res: Response) {
    try {
      const pdfContent = await this.pdfService.getPdfByName(name);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfContent);
    } catch (error) {
      res.status(500).send({
        error: 'Something went wrong while updating the PDF',
        message: error.message,
      });
    }
  }

  @Post('upload')
  async uploadPdf(@Res() res: Response): Promise<any> {
    const uploadsFolderPath = './uploads';
    const pdfFilePath = path.join(uploadsFolderPath, 'example.pdf');

    try {
      const pdfContent = await fs.promises.readFile(pdfFilePath);
      this.pdfService.uploadPdf(pdfContent);
      res.status(200).send('PDF successfully uploaded!');
    } catch (error) {
      res.status(500).send({
        error: 'Something went wrong while uploading the PDF',
        message: error.message,
      });
    }
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('fileData'))
  async uploadData(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Res() res: Response,
  ) {
    try {
      await this.pdfService.updatePdf(name, file.buffer);
      res.status(200).send('PDF successfully updated!');
    } catch (error) {
      res.status(500).send({
        error: 'Something went wrong while updating the PDF',
        message: error.message,
      });
    }
  }
}
