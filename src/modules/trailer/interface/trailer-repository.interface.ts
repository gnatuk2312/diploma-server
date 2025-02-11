import { TrailerInterface } from './trailer.interface';

export interface TrailerRepositoryInterface {
  create(entity: TrailerInterface): Promise<TrailerInterface>;
  update(entity: TrailerInterface): Promise<TrailerInterface>;
  getById(id: string): Promise<TrailerInterface>;
  getByVehicleId(vehicleId: string): Promise<TrailerInterface>;
}
