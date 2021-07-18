import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createUserUseCase = container.resolve(CreateUserCase);

    await createUserUseCase.execute({ name });

    return response.status(201).send();
  }
}

export { CreateUserController };
