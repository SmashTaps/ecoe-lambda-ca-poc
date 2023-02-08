import { IUser } from "../entities/user";

export interface IUserRepository {
  getUserById(id: string): Promise<IUser | undefined>;
}
