import { IUser } from "../entities/user";

export interface IUserSavedEvent {
  id: string;
  eventType: string;
  data: IUser;
}

export class UserSavedEvent implements IUserSavedEvent {
  id: string;
  eventType: string;
  data: IUser;

  constructor({ id, eventType, data }: IUserSavedEvent) {
    this.id = id;
    this.eventType = eventType;
    this.data = data;
  }
}
