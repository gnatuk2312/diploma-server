import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { LOGIST_DETAILS_SERVICE } from './logist-details.constants';
import { LogistDetailsServiceInterface } from './interface/logist-details-service.interface';
import { CreateLogistDetailsDTO } from './dto/create-logist-details.dto';
import { LogistDetailsInterface } from './interface/logist-details.interface';
import { UpdateLogistDetailsDTO } from './dto/update-logist-details.dto';

@Controller('logist-details')
export class LogistDetailsController {
  constructor(
    @Inject(LOGIST_DETAILS_SERVICE)
    private readonly logistDetailsService: LogistDetailsServiceInterface,
  ) {}

  @Post()
  public async create(
    @Body() dto: CreateLogistDetailsDTO,
  ): Promise<LogistDetailsInterface> {
    return this.logistDetailsService.create(dto);
  }

  @Put()
  public async update(
    @Body() dto: UpdateLogistDetailsDTO,
  ): Promise<LogistDetailsInterface> {
    return this.logistDetailsService.update(dto);
  }

  @Get('user/:userId')
  public async getByUserId(
    @Param('userId') userId: string,
  ): Promise<LogistDetailsInterface> {
    return this.logistDetailsService.findByUserId(userId);
  }
}
