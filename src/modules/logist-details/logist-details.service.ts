import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

import { CreateLogistDetailsDTO } from './dto/create-logist-details.dto';
import { UpdateLogistDetailsDTO } from './dto/update-logist-details.dto';
import { LogistDetailsServiceInterface } from './interface/logist-details-service.interface';
import { LogistDetailsInterface } from './interface/logist-details.interface';
import { LOGIST_DETAILS_REPOSITORY } from './logist-details.constants';
import { LogistDetailsRepositoryInterface } from './interface/logist-details-repository.interface';
import { USER_SERVICE } from '../user/user.constants';
import { UserServiceInterface } from '../user/interface/user-service.interface';
import { LogistDetails } from './entities/logist-details.entity';
import { UserRole } from '../user/user.enums';

export class LogistDetailsService implements LogistDetailsServiceInterface {
  constructor(
    @Inject(LOGIST_DETAILS_REPOSITORY)
    private readonly logistDetailsRepository: LogistDetailsRepositoryInterface,
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceInterface,
  ) {}

  async create(dto: CreateLogistDetailsDTO): Promise<LogistDetailsInterface> {
    const { userId, description, email, phoneNumber } = dto;

    const user = await this.userService.getById(userId);

    if (user.role !== UserRole.LOGIST) {
      throw new BadRequestException(
        'You can create a logist details only for LOGIST role',
      );
    }

    const logistDetails = new LogistDetails();

    logistDetails.user = user;
    logistDetails.description = description;
    logistDetails.email = email;
    logistDetails.phoneNumber = phoneNumber;

    return this.logistDetailsRepository.create(logistDetails);
  }

  async update(dto: UpdateLogistDetailsDTO): Promise<LogistDetailsInterface> {
    const { id, description, email, phoneNumber } = dto;

    const logistDetails = await this.logistDetailsRepository.getById(id);

    if (!logistDetails) {
      throw new NotFoundException('Logist details does not exist');
    }

    logistDetails.description = description;
    logistDetails.email = email;
    logistDetails.phoneNumber = phoneNumber;

    return this.logistDetailsRepository.update(logistDetails);
  }

  async getById(id: string): Promise<LogistDetailsInterface> {
    const logistDetails = await this.logistDetailsRepository.getById(id);

    if (!logistDetails) throw new NotFoundException();

    return logistDetails;
  }

  async getByUserId(userId: string): Promise<LogistDetailsInterface> {
    const logistDetails =
      await this.logistDetailsRepository.getByUserId(userId);

    if (!logistDetails) throw new NotFoundException();

    return logistDetails;
  }
}
