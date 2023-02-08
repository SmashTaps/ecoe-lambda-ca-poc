import { IUser } from "../entities/user";
import { IUserRepository } from "../repositories/userRepository";

export class GetUserByIdUseCase {
  constructor(private userRespository: IUserRepository) {
    this.userRespository = userRespository;
  }

  async execute(id: string): Promise<IUser | undefined> {
    return await this.userRespository.getUserById(id);
  }
}
