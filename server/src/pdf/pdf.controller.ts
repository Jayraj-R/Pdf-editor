import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
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
      this.handleError(res, error);
    }
  }

  @Get(':name')
  async getPdfByName(@Param('name') name: string, @Res() res: Response) {
    try {
      const pdfContent = await this.pdfService.getPdfByName(name);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfContent);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  @Post('upload')
  async uploadPdf(@Res() res: Response): Promise<any> {
    try {
      await this.pdfService.uploadPdf();
      res.status(HttpStatus.OK).send('PDF successfully uploaded!');
    } catch (error) {
      this.handleError(res, error);
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
      res.status(HttpStatus.OK).send('PDF successfully updated!');
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: Error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Something went wrong!',
      message: error.message,
    });
  }
}
