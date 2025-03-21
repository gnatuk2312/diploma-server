import { VacancyStatus } from '../vacancy.enums';
import { VacancyInterface } from './vacancy.interface';

export interface VacancyRepositoryInterface {
  create(entity: VacancyInterface): Promise<VacancyInterface>;
  update(entity: VacancyInterface): Promise<VacancyInterface>;
  getById(id: string): Promise<VacancyInterface>;
  getAll(): Promise<VacancyInterface[]>;
  getByStatus(status: VacancyStatus): Promise<VacancyInterface[]>;
  getForDriver(
    userId: string,
    status?: VacancyStatus,
  ): Promise<VacancyInterface[]>;
  getForLogist(
    userId: string,
    status?: VacancyStatus,
  ): Promise<VacancyInterface[]>;
}
