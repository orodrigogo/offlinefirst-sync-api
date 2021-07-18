import { getRepository, Repository } from "typeorm";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { ICreateUsersDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    id,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
    });

    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async save(user: User): Promise<User> {
    await this.repository.save(user);

    return user;
  }

  async listByCreated(lastPulledVersion: string): Promise<User[]> {
    console.log(lastPulledVersion)
    const users = await this.repository
      .createQueryBuilder()
      .where("created_at > :lastPulledVersion",
        { lastPulledVersion })
      .getMany();

    return users;
  }

  async listByUpdated(lastPulledVersion: string): Promise<User[]> {
    const users = await this.repository
      .createQueryBuilder()
      .where("updated_at >= :lastPulledVersion AND updated_at <> created_at",
        { lastPulledVersion })
      .getMany();

    return users;
  }

  async listAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }
}

export { UsersRepository };
