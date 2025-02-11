import { CreateTrailerDTO } from '../dto/create-trailer.dto';
import { UpdateTrailerDTO } from '../dto/update-trailer.dto';
import { TrailerInterface } from './trailer.interface';

export interface TrailerServiceInterface {
  create(dto: CreateTrailerDTO): Promise<TrailerInterface>;
  update(dto: UpdateTrailerDTO): Promise<TrailerInterface>;
  getById(id: string): Promise<TrailerInterface>;
  getByVehicleId(vehicleId: string): Promise<TrailerInterface>;
}
