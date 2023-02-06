import { IUser } from "../entities";

export interface ISaveUser {
  save(user: IUser): Promise<void>;
}
