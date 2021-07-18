import { Request, Response } from "express";
import { container } from "tsyringe";
import { PullSyncUserUseCase } from "./PullSyncUserUseCase";

class PullSyncUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { lastPulledVersion } = request.query;

    const pullSyncUserUseCase = container.resolve(PullSyncUserUseCase);
    const users = await pullSyncUserUseCase.execute(Number(lastPulledVersion));

    const latestVersion = Date.now(); // to milliseconds timestamp.    

    return response.status(200).json({
      latestVersion,
      changes: {
        users
      }
    });
  }
}

export { PullSyncUserController };
