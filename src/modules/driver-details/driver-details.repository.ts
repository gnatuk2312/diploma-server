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

  public create(
    entity: DriverDetailsInterface,
  ): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.save(entity);
  }

  public update(
    entity: DriverDetailsInterface,
  ): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.save(entity);
  }

  public findById(id: string): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.findOne({ where: { id } });
  }

  public findByUserId(userId: string): Promise<DriverDetailsInterface> {
    return this.driverDetailsRepository.findOne({
      where: { user: { id: userId } },
    });
  }
}
