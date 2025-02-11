import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrailerRepositoryInterface } from './interface/trailer-repository.interface';
import { TrailerInterface } from './interface/trailer.interface';
import { Trailer } from './entities/trailer.entity';

export class TrailerRepository implements TrailerRepositoryInterface {
  constructor(
    @InjectRepository(Trailer)
    private readonly trailerRepository: Repository<Trailer>,
  ) {}

  create(entity: TrailerInterface): Promise<TrailerInterface> {
    return this.trailerRepository.save(entity);
  }

  update(entity: TrailerInterface): Promise<TrailerInterface> {
    return this.trailerRepository.save(entity);
  }

  getById(id: string): Promise<TrailerInterface> {
    return this.trailerRepository.findOne({ where: { id } });
  }

  getByVehicleId(vehicleId: string): Promise<TrailerInterface> {
    return this.trailerRepository.findOne({
      where: { vehicle: { id: vehicleId } },
    });
  }
}
