import { DriverDetailsInterface } from './driver-details.interface';
import { CreateDriverDetailsDTO } from '../dto/create-driver-details.dto';
import { UpdateDriverDetailsDTO } from '../dto/update-driver-details.dto';

export interface DriverDetailsServiceInterface {
  create(dto: CreateDriverDetailsDTO): Promise<DriverDetailsInterface>;
  update(dto: UpdateDriverDetailsDTO): Promise<DriverDetailsInterface>;
  findById(id: string): Promise<DriverDetailsInterface>;
  findByUserId(userId: string): Promise<DriverDetailsInterface>;
}
