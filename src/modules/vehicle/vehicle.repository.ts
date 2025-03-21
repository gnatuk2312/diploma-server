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

  public create(entity: VehicleInterface): Promise<VehicleInterface> {
    return this.vehicleRepository.save(entity);
  }

  public update(entity: VehicleInterface): Promise<VehicleInterface> {
    return this.vehicleRepository.save(entity);
  }

  public findById(id: string): Promise<VehicleInterface> {
    return this.vehicleRepository.findOne({
      where: { id },
      relations: ['registration'],
    });
  }

  public findAllByUserId(userId: string): Promise<VehicleInterface[]> {
    return this.vehicleRepository.find({
      where: { driver: { id: userId } },
      relations: ['registration'],
    });
  }
}
