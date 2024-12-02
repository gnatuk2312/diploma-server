import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import { VehicleServiceInterface } from './interface/vehicle-service.interface';
import { VehicleInterface } from './interface/vehicle.interface';
import { VEHICLE_REPOSITORY } from './vehicle.constants';
import { VehicleRepositoryInterface } from './interface/vehicle-repository.interface';
import { USER_SERVICE } from '../user/user.constants';
import { UserServiceInterface } from '../user/interface/user-service.interface';
import { UserRole } from '../user/user.enums';
import { Vehicle } from './entities/vehicle.entity';

export class VehicleService implements VehicleServiceInterface {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: VehicleRepositoryInterface,
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceInterface,
  ) {}

  public async create(dto: CreateVehicleDTO): Promise<VehicleInterface> {
    const { driverId, brand, model, kilometrage } = dto;

    const user = await this.userService.findById(driverId);

    if (user.role !== UserRole.DRIVER) {
      throw new BadRequestException(
        'You can create a vehicle only for a DRIVER role',
      );
    }

    const vehicle = new Vehicle();

    vehicle.driver = user;
    vehicle.brand = brand;
    vehicle.model = model;
    vehicle.kilometrage = kilometrage;

    return this.vehicleRepository.create(vehicle);
  }

  public async update(dto: UpdateVehicleDTO): Promise<VehicleInterface> {
    const { id, brand, model, kilometrage } = dto;

    const vehicle = await this.vehicleRepository.findById(id);

    if (!vehicle) throw new NotFoundException();

    vehicle.brand = brand;
    vehicle.model = model;
    vehicle.kilometrage = kilometrage;

    return this.vehicleRepository.update(vehicle);
  }

  public findById(id: string): Promise<VehicleInterface> {
    return this.vehicleRepository.findById(id);
  }

  public findAllByUserId(userId: string): Promise<VehicleInterface[]> {
    return this.vehicleRepository.findAllByUserId(userId);
  }
}
