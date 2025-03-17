import { FileInterface } from './file.interface';

export interface FileServiceInterface {
  upload(file: Express.Multer.File): Promise<FileInterface>;
  getAll(): Promise<FileInterface[]>;
  getById(id: string): Promise<FileInterface>;
}
