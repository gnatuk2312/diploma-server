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
import { FILE_SERVICE } from '../file/file.constants';
import { FileServiceInterface } from '../file/interface/file-service.interface';
import { FileInterface } from '../file/interface/file.interface';

export class DriverDetailsService implements DriverDetailsServiceInterface {
  constructor(
    @Inject(DRIVER_DETAILS_REPOSITORY)
    private readonly driverDetailsRepository: DriverDetailsRepositoryInterface,
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceInterface,
    @Inject(FILE_SERVICE)
    private readonly fileService: FileServiceInterface,
  ) {}

  async create(dto: CreateDriverDetailsDTO): Promise<DriverDetailsInterface> {
    const { userId, description, email, phoneNumber, driverLicenseFileId } =
      dto;

    const user = await this.userService.getById(userId);

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

    driverDetails.driverLicense =
      await this.getDriverLicenseByFileId(driverLicenseFileId);

    return this.driverDetailsRepository.create(driverDetails);
  }

  async update(dto: UpdateDriverDetailsDTO): Promise<DriverDetailsInterface> {
    const { id, description, email, phoneNumber, driverLicenseFileId } = dto;

    const driverDetails = await this.driverDetailsRepository.getById(id);

    if (!driverDetails) {
      throw new NotFoundException('Driver details does not exist');
    }

    driverDetails.description = description;
    driverDetails.email = email;
    driverDetails.phoneNumber = phoneNumber;
    driverDetails.driverLicense =
      await this.getDriverLicenseByFileId(driverLicenseFileId);

    return this.driverDetailsRepository.update(driverDetails);
  }

  private getDriverLicenseByFileId(
    fileId: string | undefined,
  ): Promise<FileInterface> | null {
    if (!fileId) return null;
    return this.fileService.getById(fileId);
  }

  getById(id: string): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.getById(id);
  }

  getByUserId(userId: string): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.getByUserId(userId);
  }
}
