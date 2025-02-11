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

export class TrailerService implements TrailerServiceInterface {
  constructor(
    @Inject(TRAILER_REPOSITORY)
    private readonly trailerRepository: TrailerRepositoryInterface,
    @Inject(VEHICLE_SERVICE)
    private readonly vehicleService: VehicleServiceInterface,
  ) {}

  async create(dto: CreateTrailerDTO): Promise<TrailerInterface> {
    const { vehicleId, height, width, length, weight, loadCapacity } = dto;

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

    return this.trailerRepository.create(trailer);
  }

  async update(dto: UpdateTrailerDTO): Promise<TrailerInterface> {
    const { id, height, width, length, weight, loadCapacity } = dto;

    const trailer = await this.trailerRepository.getById(id);

    if (!trailer) throw new NotFoundException();

    trailer.height = height;
    trailer.width = width;
    trailer.length = length;
    trailer.weight = weight;
    trailer.loadCapacity = loadCapacity;

    return this.trailerRepository.update(trailer);
  }

  getById(id: string): Promise<TrailerInterface> {
    return this.trailerRepository.getById(id);
  }

  getByVehicleId(vehicleId: string): Promise<TrailerInterface> {
    return this.trailerRepository.getByVehicleId(vehicleId);
  }
}
