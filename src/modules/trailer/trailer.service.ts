import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

import { TRAILER_REPOSITORY } from './trailer.constants';
import { TrailerRepositoryInterface } from './interface/trailer-repository.interface';
import { TrailerServiceInterface } from './interface/trailer-service.interface';
import { CreateTrailerDTO } from './dto/create-trailer.dto';
import { UpdateTrailerDTO } from './dto/update-trailer.dto';
import { TrailerInterface } from './interface/trailer.interface';
import { VEHICLE_SERVICE } from '../vehicle/vehicle.constants';
import { VehicleServiceInterface } from '../vehicle/interface/vehicle-service.interface';
import { Trailer } from './entities/trailer.entity';
import { FILE_SERVICE } from '../file/file.constants';
import { FileServiceInterface } from '../file/interface/file-service.interface';
import { FileInterface } from '../file/interface/file.interface';

export class TrailerService implements TrailerServiceInterface {
  constructor(
    @Inject(TRAILER_REPOSITORY)
    private readonly trailerRepository: TrailerRepositoryInterface,
    @Inject(VEHICLE_SERVICE)
    private readonly vehicleService: VehicleServiceInterface,
    @Inject(FILE_SERVICE)
    private readonly fileService: FileServiceInterface,
  ) {}

  async create(dto: CreateTrailerDTO): Promise<TrailerInterface> {
    const {
      vehicleId,
      registrationFileId,
      height,
      width,
      length,
      weight,
      loadCapacity,
    } = dto;

    const vehicle = await this.vehicleService.findById(vehicleId);

    if (!vehicle) {
      throw new NotFoundException('Vehicle with this id does not exists');
    }

    const isTrailerExists = await this.getByVehicleId(vehicle.id);
    if (isTrailerExists) {
      throw new BadRequestException('This vehicle already has a trailer');
    }

    const trailer = new Trailer();

    trailer.height = height;
    trailer.width = width;
    trailer.length = length;
    trailer.weight = weight;
    trailer.loadCapacity = loadCapacity;
    trailer.vehicle = vehicle;
    trailer.registration =
      await this.getRegistrationByFileId(registrationFileId);

    return this.trailerRepository.create(trailer);
  }

  async update(dto: UpdateTrailerDTO): Promise<TrailerInterface> {
    const {
      id,
      registrationFileId,
      height,
      width,
      length,
      weight,
      loadCapacity,
    } = dto;

    const trailer = await this.trailerRepository.getById(id);

    if (!trailer) throw new NotFoundException();

    trailer.height = height;
    trailer.width = width;
    trailer.length = length;
    trailer.weight = weight;
    trailer.loadCapacity = loadCapacity;
    trailer.registration =
      await this.getRegistrationByFileId(registrationFileId);

    return this.trailerRepository.update(trailer);
  }

  private getRegistrationByFileId(
    fileId: string | undefined,
  ): Promise<FileInterface> | null {
    if (!fileId) return null;
    return this.fileService.getById(fileId);
  }

  getById(id: string): Promise<TrailerInterface> {
    return this.trailerRepository.getById(id);
  }

  getByVehicleId(vehicleId: string): Promise<TrailerInterface> {
    return this.trailerRepository.getByVehicleId(vehicleId);
  }
}
