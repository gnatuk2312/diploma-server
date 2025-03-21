import { VehicleInterface } from './vehicle.interface';
import { CreateVehicleDTO } from '../dto/create-vehicle.dto';
import { UpdateVehicleDTO } from '../dto/update-vehicle.dto';

export interface VehicleServiceInterface {
  create(dto: CreateVehicleDTO): Promise<VehicleInterface>;
  update(dto: UpdateVehicleDTO): Promise<VehicleInterface>;
  getById(id: string): Promise<VehicleInterface>;
  getAllByUserId(userId: string): Promise<VehicleInterface[]>;
}
