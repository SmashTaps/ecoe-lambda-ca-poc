import { IUserSavedEvent } from "../entities/userSavedEvent";

export interface IMessagingRepository {
  sendUserSavedEvent(userSavedEvent: IUserSavedEvent): Promise<boolean>;
}
