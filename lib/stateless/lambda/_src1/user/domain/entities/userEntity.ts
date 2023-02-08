import { IUser } from "./interfaces/user";

export class UserEntity implements IUser {
  pk: string;
  sk: string;

  constructor(id: string) {
    if (id.length === 0) {
      throw new Error("id cannot be empty");
    }
    this.pk = `USER#${id}`;
    this.sk = `USER#${id}`;
  }
}
