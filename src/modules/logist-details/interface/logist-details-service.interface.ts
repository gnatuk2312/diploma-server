import { LogistDetailsInterface } from './logist-details.interface';
import { CreateLogistDetailsDTO } from '../dto/create-logist-details.dto';
import { UpdateLogistDetailsDTO } from '../dto/update-logist-details.dto';

export interface LogistDetailsServiceInterface {
  create(dto: CreateLogistDetailsDTO): Promise<LogistDetailsInterface>;
  update(dto: UpdateLogistDetailsDTO): Promise<LogistDetailsInterface>;
  getById(id: string): Promise<LogistDetailsInterface>;
  getByUserId(userId: string): Promise<LogistDetailsInterface>;
}
