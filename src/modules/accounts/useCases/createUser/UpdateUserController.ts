import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const updatedUserUseCase = container.resolve(UpdateUserUseCase);
    await updatedUserUseCase.execute({ id, name });

    return response.status(200).send();
  }
}

export { UpdateUserController };
