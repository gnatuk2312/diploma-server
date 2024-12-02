import { DriverDetailsInterface } from './driver-details.interface';

export interface DriverDetailsRepositoryInterface {
  create(entity: DriverDetailsInterface): Promise<DriverDetailsInterface>;
  update(entity: DriverDetailsInterface): Promise<DriverDetailsInterface>;
  findById(id: string): Promise<DriverDetailsInterface>;
  findByUserId(userId: string): Promise<DriverDetailsInterface>;
}
