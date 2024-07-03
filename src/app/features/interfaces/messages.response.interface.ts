import { MessageInterface } from './message.interface';

export interface MessageResponseInterface {
  status: string;
  messages: MessageInterface[];
}
