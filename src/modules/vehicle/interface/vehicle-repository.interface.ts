import { VehicleInterface } from './vehicle.interface';

export interface VehicleRepositoryInterface {
  create(entity: VehicleInterface): Promise<VehicleInterface>;
  update(entity: VehicleInterface): Promise<VehicleInterface>;
  getById(id: string): Promise<VehicleInterface>;
  getAllByUserId(userId: string): Promise<VehicleInterface[]>;
}
