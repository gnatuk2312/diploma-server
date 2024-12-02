import { VehicleInterface } from './vehicle.interface';

export interface VehicleRepositoryInterface {
  create(entity: VehicleInterface): Promise<VehicleInterface>;
  update(entity: VehicleInterface): Promise<VehicleInterface>;
  findById(id: string): Promise<VehicleInterface>;
  findAllByUserId(userId: string): Promise<VehicleInterface[]>;
}
