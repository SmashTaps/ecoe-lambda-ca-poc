import { IUserRepository } from "../domain/repositories/interfaces/userRepository";

export const getUser = async <T>(
  id: string,
  repository: IUserRepository<T>
) => {
  return repository.getUser(id);
};
