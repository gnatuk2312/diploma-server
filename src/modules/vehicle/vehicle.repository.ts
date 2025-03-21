import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VehicleRepositoryInterface } from './interface/vehicle-repository.interface';
import { VehicleInterface } from './interface/vehicle.interface';
import { Vehicle } from './entities/vehicle.entity';

export class VehicleRepository implements VehicleRepositoryInterface {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  create(entity: VehicleInterface): Promise<VehicleInterface> {
    return this.vehicleRepository.save(entity);
  }

  update(entity: VehicleInterface): Promise<VehicleInterface> {
    return this.vehicleRepository.save(entity);
  }

  getById(id: string): Promise<VehicleInterface> {
    return this.vehicleRepository.findOne({
      where: { id },
      relations: ['registration'],
    });
  }

  getAllByUserId(userId: string): Promise<VehicleInterface[]> {
    return this.vehicleRepository.find({
      where: { driver: { id: userId } },
      relations: ['registration'],
    });
  }
}
