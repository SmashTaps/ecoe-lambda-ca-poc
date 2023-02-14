import { UserSavedEvent } from "../../../../../lib/stateless/lambda/src/user/domain/entities/userSavedEvent";

describe("UserSavedEvent", () => {
  it("creates an event object", () => {
    const event = {
      id: "123",
      eventType: "UserSaved",
      data: {
        pk: "USER#123",
        sk: "USER#123",
        firstName: "John",
        lastName: "Doe",
      },
    };

    const userSavedEvent = new UserSavedEvent(event);

    expect(userSavedEvent).toEqual(event);
  });
});
