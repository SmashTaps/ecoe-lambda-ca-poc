import { IUser } from "../../lib/stateless/lambda/src/user/domain/entities/user";

describe("IUser", () => {
  it("can be implemented", () => {
    class MockUser implements IUser {
      pk: string;
      sk: string;
      constructor(id: string) {
        this.pk = `USER#${id}`;
        this.sk = `USER#${id}`;
      }
    }

    const mockUser = new MockUser("123");

    expect(mockUser.pk).toEqual("USER#123");
  });
});
