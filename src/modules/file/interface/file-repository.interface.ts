import { FileInterface } from './file.interface';

export interface FileRepositoryInterface {
  create(entity: FileInterface): Promise<FileInterface>;
  getAll(): Promise<FileInterface[]>;
}
