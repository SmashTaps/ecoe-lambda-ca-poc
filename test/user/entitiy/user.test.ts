import { UserEntity } from "../../../lib/stateless/lambda/src/user/domain/entities/userEntity";

describe("UserEntity", () => {
  it("should set the pk and sk correctly", () => {
    const id1 = "1234";
    const id2 = "1235";

    const user1 = new UserEntity(id1);
    const user2 = new UserEntity(id2);
    expect(user1.pk).toBe("USER#1234");
    expect(user1.sk).toBe("USER#1234");
    expect(user2.pk).toBe("USER#1235");
    expect(user2.sk).toBe("USER#1235");
  });

  it("should return an error if an empty string is passed", () => {
    const id = "";

    expect(() => new UserEntity(id)).toThrow();
  });
});
