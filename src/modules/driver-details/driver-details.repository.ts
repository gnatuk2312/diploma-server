import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DriverDetailsRepositoryInterface } from './interface/driver-details-repository.interface';
import { DriverDetailsInterface } from './interface/driver-details.interface';
import { DriverDetails } from './entities/driver-details.entity';

export class DriverDetailsRepository
  implements DriverDetailsRepositoryInterface
{
  constructor(
    @InjectRepository(DriverDetails)
    private readonly driverDetailsRepository: Repository<DriverDetails>,
  ) {}

  create(entity: DriverDetailsInterface): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.save(entity);
  }

  update(entity: DriverDetailsInterface): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.save(entity);
  }

  getById(id: string): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.findOne({
      where: { id },
      relations: ['driverLicense'],
    });
  }

  getByUserId(userId: string): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'driverLicense'],
    });
  }
}
