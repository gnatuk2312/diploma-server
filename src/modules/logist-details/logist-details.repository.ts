import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LogistDetailsRepositoryInterface } from './interface/logist-details-repository.interface';
import { LogistDetailsInterface } from './interface/logist-details.interface';
import { LogistDetails } from './entities/logist-details.entity';

export class LogistDetailsRepository
  implements LogistDetailsRepositoryInterface
{
  constructor(
    @InjectRepository(LogistDetails)
    private readonly logistDetailsRepository: Repository<LogistDetails>,
  ) {}

  public async create(
    entity: LogistDetailsInterface,
  ): Promise<LogistDetailsInterface> {
    return await this.logistDetailsRepository.save(entity);
  }

  public async update(
    entity: LogistDetailsInterface,
  ): Promise<LogistDetailsInterface> {
    return await this.logistDetailsRepository.save(entity);
  }

  public async findById(id: string): Promise<LogistDetailsInterface> {
    return await this.logistDetailsRepository.findOne({ where: { id } });
  }

  public async findByUserId(userId: string): Promise<LogistDetailsInterface> {
    return await this.logistDetailsRepository.findOne({
      where: { user: { id: userId } },
    });
  }
}
