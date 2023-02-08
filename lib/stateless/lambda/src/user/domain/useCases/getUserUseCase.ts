import { IUser } from "../entities/user";
import { IUserRepository } from "../repositories/userRepository";

export interface IGetUserByIdUseCase {
  execute(id: string): Promise<IUser | undefined>;
}

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(private userRespository: IUserRepository) {
    this.userRespository = userRespository;
  }

  async execute(id: string): Promise<IUser | undefined> {
    return await this.userRespository.getUserById(id);
  }
}
