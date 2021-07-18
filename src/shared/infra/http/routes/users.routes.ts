import { Router } from "express";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserController } from "../../../../modules/accounts/useCases/createUser/UpdateUserController";
import { ListUserController } from "../../../../modules/accounts/useCases/createUser/ListUserController";

import { PullSyncUserController } from "../../../../modules/accounts/useCases/createUser/PullSyncUserController";
import { PushSyncUserController } from "../../../../modules/accounts/useCases/createUser/PushSyncUserController";

const usersRoutes = Router();
const listUserController = new ListUserController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const pullSyncUserController = new PullSyncUserController();
const pushSyncUserController = new PushSyncUserController();


usersRoutes.get("/", listUserController.handle);
usersRoutes.post("/", createUserController.handle);
usersRoutes.put("/:id", updateUserController.handle);

usersRoutes.get("/sync", pullSyncUserController.handle);
usersRoutes.post("/sync", pushSyncUserController.handle);

export { usersRoutes };
