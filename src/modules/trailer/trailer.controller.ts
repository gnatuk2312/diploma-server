import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TRAILER_SERVICE } from './trailer.constants';
import { TrailerServiceInterface } from './interface/trailer-service.interface';
import { CreateTrailerDTO } from './dto/create-trailer.dto';
import { TrailerInterface } from './interface/trailer.interface';
import { UpdateTrailerDTO } from './dto/update-trailer.dto';

@Controller('trailer')
export class TrailerController {
  constructor(
    @Inject(TRAILER_SERVICE)
    private readonly trailerService: TrailerServiceInterface,
  ) {}

  @Post()
  create(@Body() dto: CreateTrailerDTO): Promise<TrailerInterface> {
    return this.trailerService.create(dto);
  }

  @Put()
  update(@Body() dto: UpdateTrailerDTO): Promise<TrailerInterface> {
    return this.trailerService.update(dto);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<TrailerInterface> {
    return this.trailerService.getById(id);
  }

  @Get('vehicle/:vehicleId')
  getByVehicleId(
    @Param('vehicleId') vehicleId: string,
  ): Promise<TrailerInterface> {
    return this.trailerService.getByVehicleId(vehicleId);
  }
}
