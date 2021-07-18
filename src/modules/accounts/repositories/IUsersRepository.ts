import { ICreateUsersDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User>;
  listByUpdated(date: string): Promise<User[]>;
  listByCreated(date: string): Promise<User[]>;
  listAll(): Promise<User[]>;
}

export { IUsersRepository };
