import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface Data {
  id: string;
  name: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ id, name }: Data): Promise<User> {
    const user = await this.usersRepository.findById(id);


    if (!user) {
      throw new AppError('User not found');
    }

    user.name = name;
    return this.usersRepository.save(user);
  }
}

export { UpdateUserUseCase };
