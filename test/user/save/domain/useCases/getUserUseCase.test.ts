import { IUser } from "../../../../../lib/stateless/lambda/src/user/domain/entities/user";
import { IUserRepository } from "../../../../../lib/stateless/lambda/src/user/domain/repositories/userRepository";
import { GetUserByIdUseCase } from "../../../../../lib/stateless/lambda/src/user/domain/useCases/getUserUseCase";

describe("GetUserByIdUseCase", () => {
  let userRepositoryMock: IUserRepository;
  let useCase: GetUserByIdUseCase;
  const expectedUser: IUser = {
    pk: "pk",
    sk: "sk",
    firstName: "John",
    lastName: "Doe",
  };

  beforeEach(() => {
    userRepositoryMock = {
      getUserById: jest.fn().mockImplementation((id) => {
        if (id === "121") {
          return expectedUser;
        }
        return undefined;
      }),
      saveUser: jest.fn(),
    };

    useCase = new GetUserByIdUseCase(userRepositoryMock);
  });

  it("should return a user if it exists", async () => {
    userRepositoryMock.getUserById("121");
    const result = await useCase.execute("121");
    expect(result).toEqual(expectedUser);
    expect(userRepositoryMock.getUserById).toHaveBeenCalledWith("121");
  });

  it("should return undefined if the user does not exist", async () => {
    userRepositoryMock.getUserById("2");

    const result = await useCase.execute("123");

    expect(result).toBeUndefined();
    expect(userRepositoryMock.getUserById).toHaveBeenCalledWith("123");
  });
});
