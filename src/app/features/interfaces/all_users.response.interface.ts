import { UserInterface } from './user.interface';

export interface AllUsersResponseInterface {
  status: string;
  users: UserInterface[] | [];
}
