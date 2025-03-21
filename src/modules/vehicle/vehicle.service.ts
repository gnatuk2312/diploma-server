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
import { FILE_SERVICE } from '../file/file.constants';
import { FileService } from '../file/file.service';
import { FileInterface } from '../file/interface/file.interface';

export class VehicleService implements VehicleServiceInterface {
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly vehicleRepository: VehicleRepositoryInterface,
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceInterface,
    @Inject(FILE_SERVICE)
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateVehicleDTO): Promise<VehicleInterface> {
    const { driverId, registrationFileId, brand, model, kilometrage } = dto;

    const user = await this.userService.getById(driverId);

    if (user.role !== UserRole.DRIVER) {
      throw new BadRequestException(
        'You can create a vehicle only for a DRIVER role',
      );
    }

    const vehicle = new Vehicle();

    vehicle.driver = user;
    vehicle.registration =
      await this.getRegistrationByFileId(registrationFileId);
    vehicle.brand = brand;
    vehicle.model = model;
    vehicle.kilometrage = kilometrage;

    return this.vehicleRepository.create(vehicle);
  }

  async update(dto: UpdateVehicleDTO): Promise<VehicleInterface> {
    const { id, registrationFileId, brand, model, kilometrage } = dto;

    const vehicle = await this.vehicleRepository.getById(id);

    if (!vehicle) throw new NotFoundException();

    vehicle.registration =
      await this.getRegistrationByFileId(registrationFileId);
    vehicle.brand = brand;
    vehicle.model = model;
    vehicle.kilometrage = kilometrage;

    return this.vehicleRepository.update(vehicle);
  }

  private getRegistrationByFileId(
    fileId: string | undefined,
  ): Promise<FileInterface> | null {
    if (!fileId) return null;
    return this.fileService.getById(fileId);
  }

  getById(id: string): Promise<VehicleInterface> {
    return this.vehicleRepository.getById(id);
  }

  getAllByUserId(userId: string): Promise<VehicleInterface[]> {
    return this.vehicleRepository.getAllByUserId(userId);
  }
}
