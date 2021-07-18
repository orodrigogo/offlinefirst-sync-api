import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { format } from "date-fns";

interface ResponseData {
  created: User[],
  updated: User[],
  deleted: [],
}

@injectable()
class PullSyncUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(lastPulledVersion: number): Promise<ResponseData> {
    const date = new Date(lastPulledVersion);
    const formattedDate = format(date.setHours(date.getHours() + 3), 'yyyy-MM-dd HH:mm:ss');

    const updated = await this.usersRepository.listByUpdated(formattedDate);
    const created = await this.usersRepository.listByCreated(formattedDate);

    return {
      created,
      updated,
      deleted: [],
    }
  }
}

export { PullSyncUserUseCase };
