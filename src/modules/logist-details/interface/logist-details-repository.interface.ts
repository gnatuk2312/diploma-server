import { LogistDetailsInterface } from './logist-details.interface';

export interface LogistDetailsRepositoryInterface {
  create(entity: LogistDetailsInterface): Promise<LogistDetailsInterface>;
  update(entity: LogistDetailsInterface): Promise<LogistDetailsInterface>;
  getById(id: string): Promise<LogistDetailsInterface>;
  getByUserId(userId: string): Promise<LogistDetailsInterface>;
}
