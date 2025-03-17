import { Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { FileServiceInterface } from './interface/file-service.interface';
import { FileInterface } from './interface/file.interface';
import { FileRepositoryInterface } from './interface/file-repository.interface';
import { FILE_REPOSITORY } from './file.constants';
import { File } from './entities/file.entity';

export class FileService implements FileServiceInterface {
  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: FileRepositoryInterface,
  ) {}

  upload(file: Express.Multer.File): Promise<FileInterface> {
    const { originalname, mimetype, buffer } = file;

    const extension = path.extname(originalname);
    const baseName = path.basename(originalname, extension);
    const uniqueFileName = `${baseName}-${uuidv4()}${extension}`;

    const filePath = path.join(this.getFileDir(), uniqueFileName);
    fs.writeFileSync(filePath, buffer);

    const fileEntity = new File();

    fileEntity.fileName = uniqueFileName;
    fileEntity.mimeType = mimetype;
    fileEntity.extension = extension;
    fileEntity.publicPath = path.join(this.getFilePublicDir(), uniqueFileName);

    return this.fileRepository.create(fileEntity);
  }

  private getFileDir = (): string => {
    return path.join(__dirname, '../../../public/files');
  };

  private getFilePublicDir = (): string => {
    return path.join('public', 'files');
  };

  getAll(): Promise<FileInterface[]> {
    return this.fileRepository.getAll();
  }

  getById(id: string): Promise<FileInterface> {
    return this.fileRepository.getById(id);
  }
}
