import { UserEntity } from "../../../lib/stateless/lambda/src/user/domain/entities/userEntity";

describe("UserEntity", () => {
  it("should implement the IUser interface", () => {
    const id = "1234";
    const user = new UserEntity(id);
    expect(user.pk).toBeDefined();
    expect(user.sk).toBeDefined();
  });

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

  it("should return an error if wrong values are passed", () => {
    const id = "";

    //@ts-expect-error
    expect(() => new UserEntity(null)).toThrow();
    //@ts-expect-error
    expect(() => new UserEntity(undefined)).toThrow();
    expect(() => new UserEntity("")).toThrow();
  });
});
