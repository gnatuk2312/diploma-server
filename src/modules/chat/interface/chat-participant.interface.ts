import { UserInterface } from 'src/modules/user/interface/user.interface';
import { ChatInterface } from './chat.interface';

export interface ChatParticipantInterface {
  id: string;
  chat: ChatInterface;
  user: UserInterface;
}
