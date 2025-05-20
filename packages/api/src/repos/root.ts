import { UserRepo } from "./user";

export class RootRepo {
  user: UserRepo;
  constructor() {
    this.user = new UserRepo(this);
  }
}
