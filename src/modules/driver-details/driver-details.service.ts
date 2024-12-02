import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

import { CreateDriverDetailsDTO } from './dto/create-driver-details.dto';
import { UpdateDriverDetailsDTO } from './dto/update-driver-details.dto';
import { DriverDetailsServiceInterface } from './interface/driver-details-service.interface';
import { DriverDetailsInterface } from './interface/driver-details.interface';
import { DRIVER_DETAILS_REPOSITORY } from './driver-details.constants';
import { DriverDetailsRepositoryInterface } from './interface/driver-details-repository.interface';
import { USER_SERVICE } from '../user/user.constants';
import { UserServiceInterface } from '../user/interface/user-service.interface';
import { UserRole } from '../user/user.enums';
import { DriverDetails } from './entities/driver-details.entity';

export class DriverDetailsService implements DriverDetailsServiceInterface {
  constructor(
    @Inject(DRIVER_DETAILS_REPOSITORY)
    private readonly driverDetailsRepository: DriverDetailsRepositoryInterface,
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceInterface,
  ) {}

  public async create(
    dto: CreateDriverDetailsDTO,
  ): Promise<DriverDetailsInterface> {
    const { userId, description, email, phoneNumber } = dto;

    const user = await this.userService.findById(userId);

    if (user.role !== UserRole.DRIVER) {
      throw new BadRequestException(
        'You can create a driver details only for DRIVER role',
      );
    }

    const driverDetails = new DriverDetails();

    driverDetails.user = user;
    driverDetails.description = description;
    driverDetails.email = email;
    driverDetails.phoneNumber = phoneNumber;

    return this.driverDetailsRepository.create(driverDetails);
  }

  public async update(
    dto: UpdateDriverDetailsDTO,
  ): Promise<DriverDetailsInterface> {
    const { id, description, email, phoneNumber } = dto;

    const driverDetails = await this.driverDetailsRepository.findById(id);

    if (!driverDetails) {
      throw new NotFoundException('Driver details does not exist');
    }

    driverDetails.description = description;
    driverDetails.email = email;
    driverDetails.phoneNumber = phoneNumber;

    return this.driverDetailsRepository.update(driverDetails);
  }

  public findById(id: string): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.findById(id);
  }

  public findByUserId(userId: string): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.findByUserId(userId);
  }
}
