import {
  IUserSavedEvent,
  UserSavedEvent,
} from "../../../../../lib/stateless/lambda/src/user/domain/entities/userSavedEvent";
import { IMessagingRepository } from "../../../../../lib/stateless/lambda/src/user/domain/repositories/messagingRepository";
import { SendUserSavedEventUseCase } from "../../../../../lib/stateless/lambda/src/user/domain/useCases/sendUserSavedEventUseCase";

describe("SendUserSavedEventUseCase", () => {
  let messagingRepositoryMock: IMessagingRepository;
  let useCase: SendUserSavedEventUseCase;

  beforeEach(() => {
    messagingRepositoryMock = {
      sendUserSavedEvent: jest.fn().mockImplementation((userSavedEvent) => {
        if (userSavedEvent.id === "123") {
          return true;
        }
        return false;
      }),
    };

    useCase = new SendUserSavedEventUseCase(messagingRepositoryMock);
  });

  it("should send a user saved event", async () => {
    const userSavedEvent: IUserSavedEvent = new UserSavedEvent({
      id: "123",
      eventType: "UserSaved",
      data: {
        firstName: "John",
        lastName: "Doe",
        pk: "pk",
        sk: "sk",
      },
    });

    const result = await useCase.execute(userSavedEvent);
    expect(result).toBe(true);
  });
});
