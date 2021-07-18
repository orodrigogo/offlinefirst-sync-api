import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface Payload {
  data: {
    id: string;
    name: string;
  }[]
}

@injectable()
class PushSyncUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ data }: Payload): Promise<void> {

    data.forEach(async (item) => {
      const user = await this.usersRepository.findById(item.id);
      if (user) {
        user.name = item.name;
        this.usersRepository.save(user);
      }
    });
  }
}

export { PushSyncUserUseCase };