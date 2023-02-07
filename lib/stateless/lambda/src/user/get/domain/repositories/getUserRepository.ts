import { IUser } from "../entities/interfaces/user";

export interface IGetUserRepository {
  getUser(id: string): Promise<IUser | undefined>;
}
