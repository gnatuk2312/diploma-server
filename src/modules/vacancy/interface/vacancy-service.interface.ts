import { CreateVacancyDTO } from '../dto/create-vacancy.dto';
import { VacancyInterface } from './vacancy.interface';

export interface VacancyServiceInterface {
  create(dto: CreateVacancyDTO): Promise<VacancyInterface>;
  getById(id: string): Promise<VacancyInterface>;
  getAll(): Promise<VacancyInterface[]>;
  markAsInProgress(id: string): Promise<VacancyInterface>;
  markAsDelivered(id: string): Promise<VacancyInterface>;
  getStatusNew(): Promise<VacancyInterface[]>;
  getApplied(userId: string): Promise<VacancyInterface[]>;
  getCreated(userId: string): Promise<VacancyInterface[]>;
  getStatusInProgress(userId: string): Promise<VacancyInterface[]>;
  getStatusDelivered(userId: string): Promise<VacancyInterface[]>;
}
