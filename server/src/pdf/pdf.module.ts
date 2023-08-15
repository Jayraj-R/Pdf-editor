import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Destination directory to store uploaded files
    }),
  ],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
