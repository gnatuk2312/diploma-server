import { VacancyInterface } from 'src/modules/vacancy/interface/vacancy.interface';
import { ChatParticipantInterface } from './chat-participant.interface';

export interface ChatInterface {
  id: string;
  vacancy: VacancyInterface;
  participants: ChatParticipantInterface[];
}
