import { ChatInterface } from 'src/modules/chat/interface/chat.interface';
import { UserInterface } from 'src/modules/user/interface/user.interface';

export interface MessageInterface {
  id: string;
  createdAt: Date;
  content: string;
  chat: ChatInterface;
  creator: UserInterface;
}
