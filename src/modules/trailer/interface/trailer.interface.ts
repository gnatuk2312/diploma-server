import { VehicleInterface } from 'src/modules/vehicle/interface/vehicle.interface';
import { FileInterface } from 'src/modules/file/interface/file.interface';

export interface TrailerInterface {
  id: string;
  vehicle: VehicleInterface;
  registration: FileInterface;
  height: number; // centimeters
  width: number; // centimeters
  length: number; // centimeters
  weight: number; // kilograms
  loadCapacity: number; // kilograms
}
