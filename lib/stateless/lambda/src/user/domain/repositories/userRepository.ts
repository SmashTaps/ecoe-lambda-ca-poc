import { IUser } from "../entities";

export interface IUserRepository {
  save(user: IUser, tableName: string): Promise<void>;
}
