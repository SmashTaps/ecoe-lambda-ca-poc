import { IUserSavedEvent } from "../entities/userSavedEvent";
import { IMessagingRepository } from "../repositories/messagingRepository";

export interface SendUserSavedEventUseCase {
  execute(userSavedEvent: IUserSavedEvent): Promise<boolean>;
}

export class SendUserSavedEventUseCase implements SendUserSavedEventUseCase {
  constructor(private readonly messagingRepository: IMessagingRepository) {}

  async execute(userSavedEvent: IUserSavedEvent): Promise<boolean> {
    const result = await this.messagingRepository.sendUserSavedEvent(
      userSavedEvent
    );

    console.log(result);
    return result;
  }
}
