import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserUseCase } from "./ListUserUseCase";

class ListUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUserUseCase = container.resolve(ListUserUseCase);

    const users = await listUserUseCase.execute();
    return response.status(200).json(users);
  }
}

export { ListUserController };
