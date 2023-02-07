import { IUser } from "./interfaces/user";

export class UserEntity implements IUser {
  pk: string;
  sk: string;

  constructor(id: string) {
    this.pk = `USER#${id}`;
    this.sk = `USER#${id}`;
  }
}
