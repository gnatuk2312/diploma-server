import { LogistDetailsInterface } from './logist-details.interface';
import { CreateLogistDetailsDTO } from '../dto/create-logist-details.dto';
import { UpdateLogistDetailsDTO } from '../dto/update-logist-details.dto';

export interface LogistDetailsServiceInterface {
  create(dto: CreateLogistDetailsDTO): Promise<LogistDetailsInterface>;
  update(dto: UpdateLogistDetailsDTO): Promise<LogistDetailsInterface>;
  findById(id: string): Promise<LogistDetailsInterface>;
  findByUserId(userId: string): Promise<LogistDetailsInterface>;
}
