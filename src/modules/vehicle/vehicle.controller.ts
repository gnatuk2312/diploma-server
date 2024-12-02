import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VEHICLE_SERVICE } from './vehicle.constants';
import { VehicleServiceInterface } from './interface/vehicle-service.interface';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { VehicleInterface } from './interface/vehicle.interface';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(
    @Inject(VEHICLE_SERVICE)
    private readonly vehicleService: VehicleServiceInterface,
  ) {}

  @Post()
  public create(@Body() dto: CreateVehicleDTO): Promise<VehicleInterface> {
    return this.vehicleService.create(dto);
  }

  @Put()
  public update(@Body() dto: UpdateVehicleDTO): Promise<VehicleInterface> {
    return this.vehicleService.update(dto);
  }

  @Get(':id')
  public getById(@Param('id') id: string): Promise<VehicleInterface> {
    return this.vehicleService.findById(id);
  }

  @Get('user/:userId')
  public getAllByUserId(
    @Param('userId') userId: string,
  ): Promise<VehicleInterface[]> {
    return this.vehicleService.findAllByUserId(userId);
  }
}
