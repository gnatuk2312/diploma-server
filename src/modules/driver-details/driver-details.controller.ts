import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { DRIVER_DETAILS_SERVICE } from './driver-details.constants';
import { DriverDetailsService } from './driver-details.service';
import { CreateDriverDetailsDTO } from './dto/create-driver-details.dto';
import { DriverDetailsInterface } from './interface/driver-details.interface';
import { UpdateDriverDetailsDTO } from './dto/update-driver-details.dto';

@Controller('driver-details')
export class DriverDetailsController {
  constructor(
    @Inject(DRIVER_DETAILS_SERVICE)
    private readonly driverDetailsService: DriverDetailsService,
  ) {}

  @Post()
  create(@Body() dto: CreateDriverDetailsDTO): Promise<DriverDetailsInterface> {
    return this.driverDetailsService.create(dto);
  }

  @Put()
  update(@Body() dto: UpdateDriverDetailsDTO): Promise<DriverDetailsInterface> {
    return this.driverDetailsService.update(dto);
  }

  @Get('user/:userId')
  getByUserId(
    @Param('userId') userId: string,
  ): Promise<DriverDetailsInterface> {
    return this.driverDetailsService.findByUserId(userId);
  }
}
