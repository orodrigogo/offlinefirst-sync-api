import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class ListUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.listAll();

    return users;
  }
}

export { ListUserUseCase };
