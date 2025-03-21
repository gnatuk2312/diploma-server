import { DriverDetailsInterface } from './driver-details.interface';

export interface DriverDetailsRepositoryInterface {
  create(entity: DriverDetailsInterface): Promise<DriverDetailsInterface>;
  update(entity: DriverDetailsInterface): Promise<DriverDetailsInterface>;
  getById(id: string): Promise<DriverDetailsInterface>;
  getByUserId(userId: string): Promise<DriverDetailsInterface>;
}
