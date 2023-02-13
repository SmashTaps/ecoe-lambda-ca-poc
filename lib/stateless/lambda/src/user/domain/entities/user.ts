export interface IUser {
  pk: string;
  sk: string;
  firstName: string;
  lastName: string;
}

export class User implements IUser {
  pk: string;
  sk: string;
  firstName: string;
  lastName: string;

  constructor(data: IUser) {
    this.pk = data.pk;
    this.sk = data.sk;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }
}
