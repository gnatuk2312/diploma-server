import { VacancyInterface } from './vacancy.interface';

export interface VacancyRepositoryInterface {
  create(entity: VacancyInterface): Promise<VacancyInterface>;
  getById(id: string): Promise<VacancyInterface>;
  getAll(): Promise<VacancyInterface[]>;
}
