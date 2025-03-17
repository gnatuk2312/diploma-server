import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileRepositoryInterface } from './interface/file-repository.interface';
import { FileInterface } from './interface/file.interface';
import { File } from './entities/file.entity';

export class FileRepository implements FileRepositoryInterface {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  create(entity: FileInterface): Promise<FileInterface> {
    return this.fileRepository.save(entity);
  }

  getAll(): Promise<FileInterface[]> {
    return this.fileRepository.find();
  }
}
