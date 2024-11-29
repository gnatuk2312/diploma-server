import { LogistDetailsInterface } from './logist-details.interface';

export interface LogistDetailsRepositoryInterface {
  create(entity: LogistDetailsInterface): Promise<LogistDetailsInterface>;
  update(entity: LogistDetailsInterface): Promise<LogistDetailsInterface>;
  findById(id: string): Promise<LogistDetailsInterface>;
  findByUserId(userId: string): Promise<LogistDetailsInterface>;
}
