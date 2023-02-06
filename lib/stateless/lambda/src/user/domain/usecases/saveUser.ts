import { IUser } from "../entities/user";

export interface ISaveUser {
  save(user: IUser): Promise<void>;
}
