import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserCase } from "./CreateUserUseCase";

class PushSyncUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body.created;

    const createUserUseCase = container.resolve(CreateUserCase);

    await data.forEach(async ({ name }) => {
      await createUserUseCase.execute({ name });
    });

    return response.status(200).send();
  }
}

export { PushSyncUserController };