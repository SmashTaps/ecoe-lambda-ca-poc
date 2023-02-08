import { IUser } from "../../domain/entities/interfaces/user";

export interface IDataSource {
  getUser: (id: string) => Promise<IUser | undefined>;
}
