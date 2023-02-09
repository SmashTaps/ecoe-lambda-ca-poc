import { IUser } from "../entities/user";
import { IUserRepository } from "../repositories/userRepository";

interface ISaveUserUseCase {
  execute(user: IUser): Promise<IUser>;
}

export class SaveUserUseCase implements ISaveUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: IUser): Promise<IUser> {
    return this.userRepository.saveUser(user);
  }
}
