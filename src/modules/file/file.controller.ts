import {
  Controller,
  Get,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FILE_SERVICE } from './file.constants';
import { FileServiceInterface } from './interface/file-service.interface';
import { FileInterface } from './interface/file.interface';

@Controller('files')
export class FileController {
  constructor(
    @Inject(FILE_SERVICE)
    private readonly fileService: FileServiceInterface,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File): Promise<FileInterface> {
    return this.fileService.upload(file);
  }

  @Get()
  getAll(): Promise<FileInterface[]> {
    return this.fileService.getAll();
  }
}
